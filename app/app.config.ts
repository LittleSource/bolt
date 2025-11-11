export default defineAppConfig({
  global: {
    picture: {
      dark: './avatar.jpg',
      light: './avatar.jpg',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/',
    email: 'littley@outlook.ie',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `陇ICP备2022000468号-1 • © LittleYuan  ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-lucide-wallpaper',
      'to': 'https://photo.52ym.vip',
      'target': '_blank',
      'aria-label': 'LittleYuan on photo'
    }, {
      'icon': 'i-simple-icons-juejin',
      'to': 'https://juejin.cn/user/2840793779030478',
      'target': '_blank',
      'aria-label': 'LittleYuan on juejin'
    }, {
      'icon': 'i-simple-icons-substack',
      'to': 'https://substack.com/@littleyuan',
      'target': '_blank',
      'aria-label': 'LittleYuan on Substack'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/LittleSource',
      'target': '_blank',
      'aria-label': 'LittleYuan on GitHub'
    }]
  }
})
