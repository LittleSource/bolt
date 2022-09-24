<template>
	<div class="w-full flex flex-col">
		<div class="flex justify-end">
			<div class="flex mt-5 w-120 justify-between items-center">
				<NuxtLink to="/" class="nav-item">首页</NuxtLink>
				<NuxtLink to="/" class="nav-item">分类</NuxtLink>
				<NuxtLink to="/" class="nav-item">项目</NuxtLink>
				<NuxtLink to="/about" class="nav-item">关于</NuxtLink>
				<a class="cursor-pointer w-8" @click="toggleDark"
					><div class="dark:i-carbon-moon i-carbon-sun"
				/></a>
				<a
					class="w-10"
					href="https://github.com/LittleSource/bolt"
					target="_blank"
					><div class="i-carbon-logo-github"
				/></a>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const color = useColorMode();
function toggleDark() {
	color.preference = color.value === "dark" ? "light" : "dark";
}
</script>

<style scoped>
.nav-item {
	padding: 8px 12px;
	line-height: 1.5rem;
}
.nav-item:hover {
	border-radius: 3px;
	background-color: rgba(150, 150, 150, 0.5);
}
a:hover {
	background-color: transparent;
}
</style>
