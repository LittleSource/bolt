<template>
	<div class="flex flex-col items-center justify-center">
		<div class="mt-10">
			<ContentList path="/" v-slot="{ list }">
				<div v-for="article in list" :key="article._path">
					<ArticleCard
						:title="article.title"
						:description="article.description"
						@click="navArticle(article._path)"
					/>
				</div>
			</ContentList>
		</div>
	</div>
</template>

<script setup lang="ts">
const router = useRouter();
const navArticle = (path: string) => {
	router.push(`/article${path}`);
};
</script>

<style scoped></style>
