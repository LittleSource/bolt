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
				:value="page"
				@input="inputChange"
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
const emit = defineEmits<{
	(e: "update:page", page: number): void;
}>();
const pre = () => {
	if (props.page !== 1) {
		emit("update:page", props.page - 1);
	}
};
const next = () => {
	if (props.page !== props.total) {
		emit("update:page", props.page + 1);
	}
};

const inputChange = (e) => {
	const page = parseInt(e.srcElement.value);
	if (!isNaN(page) && page > 0 && page <= props.total) {
		emit("update:page", page);
	}
};
</script>

<style scoped>
button {
	border: 1px solid #e5e7eb;
	border-radius: 5px;
}
</style>
