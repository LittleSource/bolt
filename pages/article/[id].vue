<template>
	<NuxtLayout name="article">
		<div class="flex justify-center">
			<div class="sm:w-1/2 w-full px-2 py-4 sm:px-0">
				<ContentDoc :path="($route.params.id as string)" />
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
	layout: false, // 手动关闭 default 布局
});
</script>

<style scoped></style>
