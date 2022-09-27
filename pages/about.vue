<template>
	<div>
		<NuxtLayout name="default">
			<div class="flex justify-center">
				<ContentDoc path="/about" />
			</div>
		</NuxtLayout>
	</div>
</template>
<script setup lang="ts">
definePageMeta({
	layout: false,
});
</script>
