<script setup>
useHead({
	title: "Little Yuan's blog",
	link: [
		{
			rel: "icon",
			type: "image/png",
			href: "/nuxt.png",
		},
	],
});

//查询总页数
const limit = useLimit();
const pageSum = usePageSum();
queryArticleTotal().then((total) => {
	pageSum.value = Math.ceil(total / limit);
});
</script>

<template>
	<div class="text-small sm:text-base">
		<NuxtLoadingIndicator />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style>
@import "~/assets/css/reset.css";
@import "~/assets/css/base.css";
</style>
