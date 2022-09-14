import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ["@unocss/nuxt", "@nuxt/content"],
	content: {
		// https://content.nuxtjs.org/api/configuration
		highlight: {
			// Theme used in all color schemes.
			theme: {
				// Default theme (same as single string)
				default: "vitesse-dark",
				// Theme used if `html.dark`
				dark: "vitesse-dark",
				// Theme used if `html.sepia`
				sepia: "vitesse-light",
			},
		},
	},
});
