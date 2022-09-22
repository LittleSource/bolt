<template>
	<div class="flex justify-center">
		<button
			class="dark:bg-black dark:text-white dark:disabled:bg-white dark:disabled:text-black disabled:bg-grey-400 disabled:text-grey-200"
			:disabled="props.page == 1"
			@click="pre"
		>
			<div class="i-carbon:chevron-left" />
		</button>
		<div class="flex mx-2 justify-center items-center">
			<input
				class="w-8 h-6 rounded-1 mr-1 text-black text-center bg-gray-50 dark:bg-gray-200"
				type="text"
				:value="page"
				@input="inputChange"
			/>
			<div class="text-base">/ {{ props.total }}</div>
		</div>
		<button
			class="dark:bg-black dark:text-white dark:disabled:bg-white dark:disabled:text-black disabled:bg-grey-400 disabled:text-grey-200"
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
