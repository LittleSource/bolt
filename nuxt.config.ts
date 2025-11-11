// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt',
    'nuxt-studio'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-11-01',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  studio: {
    // Studio admin route (default: '/_studio')
    route: '/_studio',

    // GitHub repository configuration (owner and repo are required)
    repository: {
      provider: 'github', // only GitHub is currently supported
      owner: 'LittleSource', // your GitHub username or organization
      repo: 'bolt', // your repository name
      branch: 'main', // the branch to commit to (default: main)
      rootDir: '' // optional: if your Nuxt app is in a subdirectory (default: '')
    }
  }
})
