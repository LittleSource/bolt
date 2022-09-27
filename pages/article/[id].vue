<template>
	<div>
		<NuxtLayout name="article">
			<template #header>
				<div class="flex items-center px-2 sm:px-0">
					<Avatar class="flex-shrink-0" />
					<div class="ml-10 flex flex-col justify-around">
						<div class="text-3xl">{{ page.title }}</div>
						<div class="text-base mt-2">
							{{ articleDate }}
						</div>
					</div>
				</div>
			</template>
			<template #content>
				<ContentRenderer :value="page"></ContentRenderer>
			</template>
			<template #article-navigate>
				<ArticleNavigate
					:childrenNode="page.excerpt.children"
				></ArticleNavigate>
			</template>
			<template #next>
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
			</template>
		</NuxtLayout>
	</div>
</template>
<script setup lang="ts">
definePageMeta({
	layout: false,
});
const route = useRoute();
const page = await queryArticleDetails(route.params.id as string);
const { $dayjs } = useNuxtApp();
const articleDate = ref($dayjs().format("L LT"));
if (page.value?.date) {
	articleDate.value = $dayjs(page.value.date).fromNow();
}
const [prev, next] = await queryArticlePreAndNext();

useHead({ title: `${page.value.title}-Little Yuan's blog` });
</script>
