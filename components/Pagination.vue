<template>
	<div class="flex justify-center">
		<button
			class="dark:disabled:bg-gray-400 disabled:bg-gray-300 disabled:text-white"
			:disabled="props.page == 1"
			@click="pre"
		>
			<div class="i-carbon:chevron-left" />
		</button>
		<div class="flex mx-2 justify-center items-center">
			<input
				class="w-5 h-5 mr-1 text-black text-center"
				type="text"
				v-model="_page"
			/>
			<div class="text-base">/ {{ props.total }}</div>
		</div>
		<button
			class="dark:disabled:bg-gray-400 disabled:bg-gray-300 disabled:text-white"
			:disabled="props.page == props.total"
			@click="next"
		>
			<div class="i-carbon:chevron-right" />
		</button>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	page: {
		type: Number,
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
});
const _page = ref(1);
const emit = defineEmits<{
	(e: "update:page", page: number): void;
}>();
const pre = () => {
	_page.value--;
	emit("update:page", props.page - 1);
};
const next = () => {
	_page.value++;
	emit("update:page", props.page + 1);
};
watch([_page], (newPage, oldPage) => {
	if (newPage > oldPage) {
		emit("update:page", props.page + 1);
	} else {
		emit("update:page", props.page - 1);
	}
});
</script>

<style scoped>
button {
	border: 1px solid #e5e7eb;
	border-radius: 5px;
}
</style>
