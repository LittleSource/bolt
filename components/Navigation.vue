<template>
	<div class="w-full pt-10 flex flex-col">
		<div class="flex justify-end">
			<div class="flex w-120 justify-around">
				<NuxtLink to="/" class="nav-item">首页</NuxtLink>
				<NuxtLink to="/" class="nav-item">分类</NuxtLink>
				<NuxtLink to="/" class="nav-item">归档</NuxtLink>
				<NuxtLink to="/" class="nav-item">项目</NuxtLink>
				<NuxtLink to="/about" class="nav-item">关于</NuxtLink>
				<button icon-btn @click="toggleDark()">ddd</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.nav-item {
	padding: 8px 12px;
}
.nav-item:hover {
	border-radius: 3px;
	background-color: rgba(150, 150, 150, 0.5);
}
</style>
