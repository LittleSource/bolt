<template>
	<div>
		<NuxtLayout name="article">
			<template #header>
				<div class="flex items-center px-2 sm:px-0">
					<Avatar class="flex-shrink-0" />
					<div class="ml-10 flex flex-col justify-around">
						<div class="text-3xl">{{ page?.title }}</div>
						<div class="text-base mt-2">
							{{ articleDate }}
						</div>
					</div>
				</div>
			</template>
			<template #content>
				<ContentRenderer :value="page ?? undefined"></ContentRenderer>
			</template>
			<template #article-navigate>
				<ArticleNavigate :childrenNode="page?.body.children"></ArticleNavigate>
			</template>
			<template #next>
				<div class="w-50 truncate">
					上一篇：<NuxtLink v-if="prev" :to="`/article${prev._path}`">{{ prev.title }}</NuxtLink>
					<span v-else>无</span>
				</div>
				<div class="w-50 truncate">
					下一篇：<NuxtLink class="" v-if="next" :to="`/article${next._path}`">{{ next.title }}</NuxtLink>
					<span v-else>无</span>
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
const dayjs = useDayjs()
const articleDate = ref(dayjs().format("L LT"));
if (page.value?.date) {
	articleDate.value = dayjs(page.value.date).fromNow();
}
const [prev, next] = await queryArticlePreAndNext(route.params.id as string);

useHead({ title: `${page.value?.title}-Little Yuan's blog` });
</script>
