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
			<ContentRenderer :value="page"></ContentRenderer>
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
definePageMeta({
	layout: false, // 手动关闭 default 布局
});
const route = useRoute();
const page = await queryArticleDetails(route.params.id as string);

const { $dayjs } = useNuxtApp();
const articleDate = ref($dayjs().format("L LT"));
articleDate.value = page.value?.date && $dayjs(page.value.date).fromNow();

const [prev, next] = await queryArticlePreAndNext();

useHead({ title: `${page.value.title}-Little Yuan's blog` });
</script>
<style scoped></style>
