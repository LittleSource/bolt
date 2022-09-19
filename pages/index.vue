<template>
	<div class="flex flex-col items-center justify-center">
		<div class="mt-1 p-2 w-full sm:w-150">
			<ArticleCard
				v-for="{ _path, title, description } in data"
				:key="_path"
				:title="title"
				:description="description"
				@click="navArticle(_path)"
			/>
			<div class="mt-5">
				<pagination v-model:page="page" :total="total" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();
definePageMeta({
	key: (route) => route.fullPath,
});

const navArticle = (path: string) => {
	navigateTo(`/article${path}`);
};

const limit = 5;

const page = ref(route.query?.page ? parseInt(route.query.page as string) : 1);

const skip = ref((page.value - 1) * limit);
const total = ref(0);

const { data, refresh } = await useAsyncData("homepage", () => {
	return queryContent("/")
		.only(["_path", "title", "description"])
		.skip(skip.value)
		.limit(limit)
		.sort({ date: -1 })
		.find();
});

queryContent("/")
	.find()
	.then((res) => {
		total.value = Math.ceil(res.length / limit);
	});

refresh();

watch(page, (newPage) => {
	navigateTo(`/?page=${newPage}`);
});
</script>
