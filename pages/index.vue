<template>
	<div class="flex flex-col items-center justify-center">
		<div class="mt-10">
			<div v-for="{ _path, title, description } in data" :key="_path">
				<ArticleCard
					:title="title"
					:description="description"
					@click="navArticle(_path)"
				/>
			</div>
			<div class="mt-5 flex justify-end">
				<!-- <n-pagination v-model:page="page" :page-count="total" simple /> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// import { NPagination } from "naive-ui";
const navArticle = (path: string) => {
	navigateTo(`/article${path}`);
};

const skip = ref(0);
const limit = 5;
const page = ref(1);
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

watch(page, (newPage, oldPage) => {
	if (newPage > oldPage) {
		skip.value = skip.value ? skip.value : 1 * limit;
	} else {
		skip.value = skip.value - limit;
	}
});

watch([skip], () => {
	refresh();
});
</script>

<style>
.hidden {
	visibility: hidden;
}
</style>
