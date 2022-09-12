<template>
	<NuxtLayout name="article">
		<div>文章 / {{ $route.params.id }}</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
	layout: false, // 手动关闭 default 布局
});
</script>

<style scoped></style>
