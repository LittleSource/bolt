<template>
	<!-- <NuxtPage /> -->
	<div
		class="font-sans antialiased bg-white dark:bg-black text-black dark:text-white text-small sm:text-base"
	>
		<NuxtLoadingIndicator />
		<Navigation />
		<div class="w-3/5 flex justify-center">
			<div class="flex justify-start items-center">
				<Avatar />
			</div>
		</div>
		<slot />
		<Footer />
	</div>
</template>

<script setup lang="ts">
import { useHead } from "#imports";
useHead({
	title: "Little Yuan's blog",
	style: [
		{
			children: `*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}p,h4,h5{margin:0}h4,h5{font-size:inherit;font-weight:inherit}svg{display:block;vertical-align:middle}`,
		},
	],
});
</script>

<style scoped>
.font-sans {
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
		Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
		"Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol,
		"Noto Color Emoji";
}

.antialiased {
	min-height: 100vh;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

@media (prefers-color-scheme: dark) {
	.dark\:bg-black {
		--tw-bg-opacity: 1;
		background-color: rgba(0, 0, 0, var(--tw-bg-opacity));
	}
	.dark\:bg-white\/10 {
		--tw-bg-opacity: 0.1;
		background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
	}
	.dark\:text-white {
		--tw-text-opacity: 1;
		color: rgba(255, 255, 255, var(--tw-text-opacity));
	}
}
</style>
