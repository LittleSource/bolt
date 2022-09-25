import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: [
		"@unocss/nuxt",
		"@nuxt/content",
		"@vueuse/nuxt",
		"@nuxtjs/color-mode",
		"@nathanchase/nuxt-dayjs-module",
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
	dayjs: {
		plugins: ["relativeTime"],
	},
});
