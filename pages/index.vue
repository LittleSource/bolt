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
		</div>
		<div class="flex mt-5">
			<button v-show="skip !== 0" @click="pre" class="mr-2">
				上一页
			</button>
			<button v-show="hasNext" @click="next">下一页</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const router = useRouter();
const navArticle = (path: string) => {
	router.push(`/article${path}`);
};
const skip = ref(0);
const limit = ref(5);
const hasNext = ref(true);

const { data, refresh } = await useAsyncData("homepage", () => {
	return queryContent("/").skip(skip.value).limit(limit.value).find();
});

const next = () => {
	skip.value = skip.value ? skip.value : 1 * limit.value;
};

const pre = () => {
	skip.value = skip.value - limit.value;
};

watch([skip, limit], () => {
	refresh().then(() => {
		if (data.value.length < limit.value) {
			hasNext.value = false;
		} else {
			hasNext.value = true;
		}
	});
});
</script>

<style scoped></style>
