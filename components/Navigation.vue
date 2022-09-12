<template>
	<div class="w-full pt-10 flex flex-col">
		<div class="flex justify-end">
			<div class="flex w-100 justify-between">
				<NuxtLink to="/" class="nav-item">首页</NuxtLink>
				<NuxtLink to="/" class="nav-item">分类</NuxtLink>
				<NuxtLink to="/" class="nav-item">归档</NuxtLink>
				<NuxtLink to="/" class="nav-item">项目</NuxtLink>
				<NuxtLink to="/about" class="nav-item">关于</NuxtLink>
				<div class="spotlight-wrapper">
					<div class="fixed left-0 right-0 spotlight"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Avatar from "./Avatar.vue";
</script>

<style scoped>
.spotlight {
	background: linear-gradient(45deg, #ff0082 0%, #ffdc82 50%, #00dcff 100%);
	filter: blur(20vh);
	height: 30vh;
	top: -40vh;
}
.spotlight-wrapper {
	opacity: 0.5;
	transition: opacity 0.4s ease-in;
}
.nav-item:hover ~ .spotlight-wrapper {
	opacity: 0.95;
}

.header-bg {
	background: url(../../assets/header-bg.jpeg) no-repeat top center;
	background-size: cover;
}
</style>
