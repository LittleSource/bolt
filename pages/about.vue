<template>
	<div>
		<NuxtLayout name="default">
			<div class="flex justify-center mt-10">
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
