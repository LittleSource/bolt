<template>
	<NuxtLayout name="article">
		<div class="flex justify-center">
			<ContentDoc path="/about" />
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
	layout: false, // 手动关闭 default 布局
});
</script>

<style scoped></style>
