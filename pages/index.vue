<template>
	<div>
		<NuxtLayout name="default">
			<div class="flex flex-col items-center justify-center mb-20">
				<div class="max-w-screen-md 2xl:max-w-7xl gap-5 flex flex-col justify-center min-h-full px-6 md:px-5">
					<p class="text-2xl md:text-5xl tracking-widest animate-fade-up animate-ease-in-out">
						你好，我是
					</p>
					<strong
						:class="`text-5xl md:text-8xl tracking-widest font-black  bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500`"
						style="-webkit-text-fill-color: transparent;">
						LittleYuan
					</strong>
					<div class="animate-fade-up animate-ease-in-out">
						<div class="text-2xl md:text-5xl tracking-widest">一名全栈开发工程师</div>
					</div>
					<p class="text-2xl md:text-5xl tracking-widest">
						喜欢
						<span :class="`font-semibold text-[#42d392]`">Vue</span>、
						<span :class="`font-semibold text-[#007acc]`">TypeScript</span>和
						<span :class="`font-semibold text-[#00b4e0]`">Golang</span>
						<span class="ml-4">\owo/ ~</span>
					</p>
					<p
						class="text-base md:text-2xl text-muted-foreground tracking-widest animate-fade-up animate-ease-in-out">
						我在这个网站记录我的成长，努力 💪 做一个啥也不会的全栈工程师。
					</p>
					<div class="flex space-x-4">
						<NuxtLink to="/blog" class="btn">
							我的博客
						</NuxtLink>
						<NuxtLink to="/about" class="btn">
							关于我
						</NuxtLink>
					</div>

					<!-- <ul :class="cn('flex space-x-4', 'animate-fade-up animate-ease-in-out' )" :style="{
						animationDelay: `${getDelay()}ms`, }"">
						<li key={el.link}>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button asChild variant="outline" size="icon">
										<Link href={el.link} target="_blank">
										{el.icon}
										</Link>
									</Button>
								</TooltipTrigger>
								<TooltipContent>{el.label}</TooltipContent>
							</Tooltip>
						</li>
					</ul> -->
				</div>
			</div>
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: false,
	key: (route) => route.fullPath,
});
useHead({ title: `Little Yuan's blog` });
</script>
