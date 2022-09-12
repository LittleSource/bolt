<template>
	<div class="flex mt-8 flex-col items-center justify-center">
		<div class="mt-10" v-for="(item, index) in 10" @click="navArticle">
			<ArticleCard />
		</div>
	</div>
</template>

<script setup lang="ts">
const router = useRouter();
const navArticle = () => {
	router.push("/article/1123");
};
</script>

<style scoped></style>
