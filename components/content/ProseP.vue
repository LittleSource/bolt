<script setup>
const slots = useSlots();
const isImage = computed(() => {
	return slots.default()[0].type.tag === "img";
});
</script>

<template>
	<div class="prose-image" v-if="isImage"><slot /></div>
	<p v-else><slot /></p>
</template>

<style>
.prose-image img {
	padding: 2px 0px;
	width: 100%;
}
p a {
	color: rgba(120, 120, 120, 0.8);
}
</style>
