<script setup lang="ts">
interface ContributionDay {
  date: string
  count: number
  level: number
}

interface ContributionResponse {
  year: number
  years: number[]
  total: number
  weeks: ContributionDay[][]
}

const { global } = useAppConfig()

const username = computed(() => global.github?.username || 'LittleSource')
const profileUrl = computed(() => global.github?.url || `https://github.com/${username.value}`)
const currentYear = new Date().getFullYear()
const selectedYear = ref(currentYear)
const data = ref<ContributionResponse>({
  year: selectedYear.value,
  years: [selectedYear.value],
  total: 0,
  weeks: []
})
const status = ref<'idle' | 'pending' | 'success' | 'error'>('idle')
const error = ref<unknown>(null)
let requestId = 0

async function fetchContributions() {
  const activeRequestId = ++requestId
  data.value = {
    year: selectedYear.value,
    years: data.value.years,
    total: 0,
    weeks: []
  }
  status.value = 'pending'
  error.value = null

  try {
    const response = await $fetch<ContributionResponse>('/api/github-contributions', {
      query: {
        username: username.value,
        year: selectedYear.value,
        v: '7'
      }
    })

    if (activeRequestId !== requestId) return

    data.value = response
    status.value = 'success'
  } catch (fetchError) {
    if (activeRequestId !== requestId) return

    error.value = fetchError
    status.value = 'error'
  }
}

watch([selectedYear, username], fetchContributions, { immediate: true })

const years = computed(() => data.value?.years?.length ? data.value.years : [selectedYear.value])
const weeks = computed(() => data.value?.weeks || [])
const total = computed(() => data.value?.total || 0)
const isLoading = computed(() => status.value === 'pending')

const monthLabels = computed(() => {
  const labels: { label: string, column: number }[] = []
  let previousMonth = ''

  weeks.value.forEach((week, column) => {
    const firstVisibleDay = week.find(day => day.date)
    if (!firstVisibleDay) return

    const month = firstVisibleDay.date.slice(5, 7)
    if (month === previousMonth) return

    labels.push({
      label: new Date(`${firstVisibleDay.date}T00:00:00`).toLocaleDateString('en-US', { month: 'short' }),
      column
    })
    previousMonth = month
  })

  return labels
})

const contributionText = computed(() => {
  const label = total.value === 1 ? 'contribution' : 'contributions'
  return selectedYear.value === currentYear
    ? `${total.value} ${label} in the last year`
    : `${total.value} ${label} in ${selectedYear.value}`
})

function getDayClass(day: ContributionDay) {
  if (!day.date) return ['github-activity-day', 'github-activity-day-empty']

  return [
    'github-activity-day',
    `github-activity-day-${Math.max(0, Math.min(day.level, 4))}`
  ]
}
</script>

<template>
  <section class="github-activity">
    <div class="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 class="text-xl font-medium tracking-normal text-highlighted sm:text-2xl">
          GitHub 活动图
        </h2>
      </div>

      <label class="github-activity-year-select">
        <span class="sr-only">Contribution year</span>
        <select
          v-model.number="selectedYear"
          aria-label="Contribution year"
        >
          <option
            v-for="year in years"
            :key="year"
            :value="year"
          >
            {{ year }}
          </option>
        </select>
      </label>
    </div>

    <div class="github-activity-card">
      <div class="github-activity-scroll">
        <div
          class="github-activity-grid"
          :style="{ '--github-week-count': String(Math.max(weeks.length, 1)) }"
        >
          <div class="github-activity-months">
            <span
              v-for="month in monthLabels"
              :key="`${month.label}-${month.column}`"
              :style="{ gridColumn: `${month.column + 1}` }"
            >
              {{ month.label }}
            </span>
          </div>

          <div class="github-activity-weeks">
            <div
              v-for="(week, weekIndex) in weeks"
              :key="weekIndex"
              class="github-activity-week"
            >
              <span
                v-for="(day, dayIndex) in week"
                :key="day.date || `${weekIndex}-${dayIndex}`"
                :class="getDayClass(day)"
                :title="day.date ? `${day.count} contributions on ${day.date}` : undefined"
                :aria-label="day.date ? `${day.count} contributions on ${day.date}` : undefined"
              />
            </div>
          </div>
        </div>

        <div
          v-if="isLoading && !weeks.length"
          class="github-activity-state"
        >
          Loading activity
        </div>

        <div
          v-else-if="error"
          class="github-activity-state"
        >
          GitHub activity is temporarily unavailable
        </div>
      </div>

      <div class="mt-4 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <a
          :href="profileUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-colors hover:text-highlighted"
        >
          {{ contributionText }}
        </a>
        <span>Scroll horizontal to view</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.github-activity-card {
  border: 1px dashed color-mix(in oklab, var(--ui-border) 75%, transparent);
  border-radius: 0.75rem;
  background: color-mix(in oklab, var(--ui-bg-muted) 42%, transparent);
  padding: 1.25rem;
}

.github-activity-scroll {
  position: relative;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.github-activity-grid {
  --github-cell-size: 0.58rem;
  --github-cell-gap: 0.24rem;
  width: max-content;
  min-width: 100%;
}

.github-activity-months,
.github-activity-weeks {
  display: grid;
  grid-template-columns: repeat(var(--github-week-count), var(--github-cell-size));
  gap: var(--github-cell-gap);
  justify-content: space-between;
}

.github-activity-months {
  margin-bottom: 0.45rem;
  color: var(--ui-text-highlighted);
  font-size: 0.75rem;
  line-height: 1rem;
}

.github-activity-weeks {
  align-items: start;
}

.github-activity-week {
  display: grid;
  grid-template-rows: repeat(7, var(--github-cell-size));
  gap: var(--github-cell-gap);
}

.github-activity-day {
  width: var(--github-cell-size);
  height: var(--github-cell-size);
  border-radius: 0.18rem;
  background: color-mix(in oklab, var(--ui-bg-elevated) 85%, var(--ui-text) 15%);
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--ui-border) 65%, transparent);
}

.github-activity-day-empty {
  background: transparent;
  box-shadow: none;
}

.github-activity-day-1 {
  background: #0e4429;
}

.github-activity-day-2 {
  background: #006d32;
}

.github-activity-day-3 {
  background: #26a641;
}

.github-activity-day-4 {
  background: #39d353;
}

.github-activity-year-select {
  position: relative;
  flex: 0 0 auto;
}

.github-activity-year-select::after {
  position: absolute;
  top: 50%;
  right: 0.65rem;
  width: 0.4rem;
  height: 0.4rem;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  color: var(--ui-text-muted);
  content: "";
  pointer-events: none;
  transform: translateY(-65%) rotate(45deg);
}

.github-activity-year-select select {
  appearance: none;
  min-width: 5.25rem;
  border: 1px solid var(--ui-border);
  border-radius: 0.5rem;
  background: color-mix(in oklab, var(--ui-bg) 85%, transparent);
  color: var(--ui-text-highlighted);
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.4rem 1.8rem 0.4rem 0.75rem;
}

.github-activity-year-select select:hover {
  border-color: color-mix(in oklab, var(--ui-border) 65%, var(--ui-text-highlighted));
}

.github-activity-year-select select:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 2px;
}

.github-activity-state {
  display: flex;
  min-height: 6rem;
  align-items: center;
  font-size: 0.75rem;
  color: var(--ui-text-muted);
}

@media (max-width: 640px) {
  .github-activity-card {
    padding: 1rem;
  }

  .github-activity-grid {
    --github-cell-size: 0.54rem;
    --github-cell-gap: 0.22rem;
  }

  .github-activity-year-select select {
    font-size: 0.85rem;
    line-height: 1.25rem;
    min-width: 4.75rem;
  }
}
</style>
