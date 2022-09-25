<template>
	<NuxtLayout name="article">
		<div class="flex justify-center">
			<ContentRenderer :key="page._id" :value="page"></ContentRenderer>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { Article } from "types/article";
definePageMeta({
	layout: false, // 手动关闭 default 布局
});
const { data: page } = await useAsyncData(
	"about/about-me",
	queryContent<Article>("/about-me").findOne
);
console.log(page.value);
</script>

<style scoped></style>
