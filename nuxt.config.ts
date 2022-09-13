import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ["@unocss/nuxt", "@nuxt/content"],
	content: {
		// https://content.nuxtjs.org/api/configuration
		highlight: {
			// Theme used in all color schemes.
			theme: "github-dark",
		},
	},
});
