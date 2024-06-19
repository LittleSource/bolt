// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@unocss/nuxt",
    "@nuxt/content",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "dayjs-nuxt",
  ],
  content: {
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      preload: ["js", "dart", "go", "vue"],
      // Theme used in all color schemes.
      theme: {
        // Default theme (same as single string)
        default: "vitesse-dark",
        // Theme used if `html.dark`
        dark: "vitesse-dark",
        // Theme used if `html.sepia`
        light: "vitesse-light",
      },
    },
  },
  unocss: {
    preflight: false,
  },
  colorMode: {
    classSuffix: "",
  },
  routeRules: {
    "/": { prerender: true },
  },
});
