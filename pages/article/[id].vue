<template>
	<NuxtLayout name="article">
		<div class="flex items-center px-2 sm:px-0">
			<Avatar class="flex-shrink-0" />
			<div class="ml-10 flex flex-col justify-around">
				<div class="text-3xl">{{ page.title }}</div>
				<div class="text-base">{{ page.date }}</div>
			</div>
		</div>
		<div class="mt-5 p-1">
			<ContentRenderer :key="page._id" :value="page"></ContentRenderer>
			<div class="flex justify-between mt-10">
				<div class="w-50 truncate">
					<NuxtLink v-if="prev" :to="`/article${prev._path}`"
						>上一篇：{{ prev.title }}</NuxtLink
					>
				</div>
				<div class="w-50 truncate">
					<NuxtLink class="" v-if="next" :to="`/article${next._path}`"
						>下一篇：{{ next.title }}</NuxtLink
					>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import type { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types";
interface Article extends MarkdownParsedContent {
	author: string;
}
definePageMeta({
	layout: false, // 手动关闭 default 布局
});
const route = useRoute();

const { data: page } = await useAsyncData(
	route.params.id as string,
	queryContent<Article>(route.params.id as string).findOne
);
const [prev, next] = await queryContent<Article>("/")
	.only(["_path", "title"])
	.find();
useHead({ title: `${page.value.title}-Little Yuan's blog` });
</script>
<style scoped></style>
