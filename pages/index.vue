<template>
	<div
		class="font-sans antialiased bg-white dark:bg-black text-black dark:text-white text-small sm:text-base"
	>
		<Header />
		<div class="flex mt-10 flex-col items-center justify-center">
			<div class="mt-10" v-for="(item, index) in 10">
				<ArticleCard />
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style scoped>
.font-sans {
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
		Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
		"Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol,
		"Noto Color Emoji";
}

.antialiased {
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
