<template>
	<div>
		<NuxtLayout name="default">
			<div class="flex justify-center mt-10 px-4">
				<ContentDoc path="/about" />
			</div>
		</NuxtLayout>
	</div>
</template>
<script setup lang="ts">
definePageMeta({
	layout: false,
});

useHead({ title: `About me - Little Yuan's blog` });
</script>
