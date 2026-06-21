interface ContributionDay {
  date: string
  count: number
  level: number
}

interface GitHubUser {
  created_at?: string
}

const usernamePattern = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i
const oneDay = 24 * 60 * 60 * 1000

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const username = String(query.username || '')
  const year = Number(query.year || new Date().getFullYear())
  const currentYear = new Date().getFullYear()

  if (!usernamePattern.test(username)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid GitHub username'
    })
  }

  if (!Number.isInteger(year) || year < 2008 || year > currentYear) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid contribution year'
    })
  }

  const today = stripTime(new Date())
  const rangeEnd = year === currentYear ? today : new Date(Date.UTC(year, 11, 31))
  const rangeStart = year === currentYear
    ? new Date(rangeEnd.getTime() - 364 * oneDay)
    : new Date(Date.UTC(year, 0, 1))

  const [contributionMap, years] = await Promise.all([
    fetchContributionMap(username, rangeStart, rangeEnd),
    fetchContributionYears(username, currentYear)
  ])
  const days = buildDays(rangeStart, rangeEnd, contributionMap)
  const total = days.reduce((sum, day) => sum + day.count, 0)

  setHeader(event, 'cache-control', 'public, max-age=3600, stale-while-revalidate=86400')

  return {
    year,
    years,
    total,
    weeks: buildWeeks(days)
  }
})

async function fetchContributionYears(username: string, currentYear: number) {
  const user = await $fetch<GitHubUser>(`https://api.github.com/users/${username}`, {
    headers: {
      'accept': 'application/vnd.github+json',
      'user-agent': 'LittleYuan portfolio'
    }
  })

  const createdYear = user.created_at ? new Date(user.created_at).getUTCFullYear() : currentYear
  const firstYear = Number.isInteger(createdYear) ? Math.max(2008, createdYear) : currentYear

  return Array.from({ length: currentYear - firstYear + 1 }, (_, index) => currentYear - index)
}

async function fetchContributionMap(username: string, start: Date, end: Date) {
  const startYear = start.getUTCFullYear()
  const endYear = end.getUTCFullYear()
  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index)
  const contributionMap = new Map<string, ContributionDay>()

  const htmlByYear = await Promise.all(years.map(year => fetchContributionHtml(username, year)))

  for (const html of htmlByYear) {
    for (const [date, contribution] of parseContributionHtml(html)) {
      contributionMap.set(date, contribution)
    }
  }

  return contributionMap
}

function fetchContributionHtml(username: string, year: number) {
  const url = new URL(`https://github.com/users/${username}/contributions`)
  url.searchParams.set('from', `${year}-01-01`)
  url.searchParams.set('to', `${year}-12-31`)

  return $fetch<string>(url.toString(), {
    headers: {
      'user-agent': 'LittleYuan portfolio'
    }
  })
}

function parseContributionHtml(html: string) {
  const days = new Map<string, ContributionDay>()
  const elementRegex = /<[^>]+data-date="[^"]+"[^>]*>/g

  for (const match of html.matchAll(elementRegex)) {
    const element = match[0]
    const date = getAttribute(element, 'data-date')
    if (!date) continue

    days.set(date, {
      date,
      level: Number(getAttribute(element, 'data-level')) || 0,
      count: parseContributionCount(getAttribute(element, 'data-count'), Number(getAttribute(element, 'data-level')) || 0)
    })
  }

  return days
}

function getAttribute(element: string, name: string) {
  return element.match(new RegExp(`${name}="([^"]*)"`))?.[1] || ''
}

function parseContributionCount(value: string, level: number) {
  return Number(value.replace(/[^\d]/g, '')) || (level > 0 ? 1 : 0)
}

function buildDays(start: Date, end: Date, contributionMap: Map<string, ContributionDay>) {
  const days: ContributionDay[] = []

  for (let current = new Date(start); current <= end; current = new Date(current.getTime() + oneDay)) {
    const date = formatDate(current)
    const contribution = contributionMap.get(date)

    days.push(contribution || {
      date,
      count: 0,
      level: 0
    })
  }

  return days
}

function buildWeeks(days: ContributionDay[]) {
  const firstDate = new Date(`${days[0]?.date}T00:00:00Z`)
  const leadingEmptyDays = Number.isNaN(firstDate.getTime()) ? 0 : firstDate.getUTCDay()
  const weeks: ContributionDay[][] = []
  let week: ContributionDay[] = Array.from({ length: leadingEmptyDays }, () => ({
    date: '',
    count: 0,
    level: 0
  }))

  for (const day of days) {
    week.push(day)

    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }

  if (week.length) {
    while (week.length < 7) {
      week.push({
        date: '',
        count: 0,
        level: 0
      })
    }

    weeks.push(week)
  }

  return weeks
}

function stripTime(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10)
}
