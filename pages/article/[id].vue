<template>
	<NuxtLayout name="article">
		<div class="flex items-center px-2 sm:px-0">
			<Avatar class="flex-shrink-0" />
			<div class="ml-10 flex flex-col justify-around">
				<div class="text-3xl">{{ page.title }}</div>
				<div class="text-base mt-2">
					{{ articleDate }}
				</div>
			</div>
		</div>
		<div class="mt-5 p-1">
			<ContentRenderer :value="page">
				<ContentRendererMarkdown
					:value="page"
					:components="customComponents"
				/>
			</ContentRenderer>
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
import { Article } from "types/article";
definePageMeta({
	layout: false, // 手动关闭 default 布局
});
const customComponents = {
	// img: "ProseImg",
};
const { $dayjs } = useNuxtApp();
const articleDate = ref($dayjs().format("L LT"));

const route = useRoute();

const { data: page } = await useAsyncData(
	route.params.id as string,
	queryContent<Article>(route.params.id as string).findOne
);

articleDate.value = page.value?.date && $dayjs(page.value.date).fromNow();

const [prev, next] = await queryContent<Article>("/")
	.only(["_path", "title"])
	.find();

useHead({ title: `${page.value.title}-Little Yuan's blog` });
</script>
<style scoped></style>
