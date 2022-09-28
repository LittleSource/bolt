<script lang="ts">
import { defineComponent } from "#imports";
export default defineComponent({
	props: {
		code: {
			type: String,
			default: "",
		},
		language: {
			type: String,
			default: null,
		},
		filename: {
			type: String,
			default: null,
		},
		highlights: {
			type: Array as () => number[],
			default: () => [],
		},
	},
});
</script>

<template>
	<div class="dark:bg-gray-900 bg-gray-50 code-container">
		<div class="flex justify-between relative w-14">
			<div class="traffic-light bg-red-500"></div>
			<div class="traffic-light bg-yellow-400"></div>
			<div class="traffic-light bg-green-500"></div>
		</div>
		<div class="code-scroll">
			<slot />
		</div>
	</div>
</template>

<style>
.code-container {
	margin-top: 0.5rem;
	padding: 0.5rem 0.5rem 0;
	border-radius: 6px;
}
.code-scroll {
	overflow-x: scroll;
	overflow-y: hidden;
	-ms-overflow-style: none;
	overflow: -moz-scrollbars-none;
}

.code-scroll::-webkit-scrollbar {
	width: 0 !important;
}

.traffic-light {
	width: 0.9rem;
	height: 0.9rem;
	border-radius: 50%;
}

pre code .line {
	display: block;
	min-height: 1rem;
}
</style>
