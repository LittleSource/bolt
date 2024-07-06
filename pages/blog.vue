<template>
	<div>
		<NuxtLayout name="default">
			<div class="flex flex-col items-center justify-center">
				<div class="px-4 w-full sm:w-150">
					<ArticleCard v-for="{ _path, title, description } in data" :key="_path" :title="title"
						:description="description" @click="navArticle(_path ?? '')" />
					<div class="mt-5">
						<pagination v-model:page="page" :total="pageSum" />
					</div>
				</div>
			</div>
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();
definePageMeta({
	layout: false,
	key: (route) => route.fullPath,
});
const navArticle = (path: string) => {
	navigateTo(`/article${path}`);
};

const pageSum = usePageSum();

const limit = useLimit();

const page = ref(route.query?.page ? parseInt(route.query.page as string) : 1);

const skip = (page.value - 1) * limit;

const { data, refresh } = queryIndexList(skip, limit);

refresh();

watch(page, (newPage) => {
	navigateTo(`/blog?page=${newPage}`);
});

useHead({ title: `Blog - Little Yuan's blog` });
</script>
