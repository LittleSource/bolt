<template>
	<div
		class="sm:min-h-40 sm:w-150 w-full mt-5 p-4 flex flex-col rounded gradient-border dark:bg-black dark:gradient-border-dark"
	>
		<div class="mb-4">
			<div class="font-medium text-2xl truncate">{{ title }}</div>
		</div>
		<div class="mb-2">
			{{ description }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		title: String,
		description: String,
	},
	setup() {
		return {};
	},
});
</script>

<style scoped>
.gradient-border {
	position: relative;
	border-radius: 0.5rem;
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);
	cursor: pointer;
	background-color: rgba(255, 255, 255, 1);
}
.gradient-border::before {
	background: linear-gradient(
		90deg,
		#e2e2e2 0%,
		#e2e2e2 25%,
		#00dc82 50%,
		#36e4da 75%,
		#0047e1 100%
	);
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	border-radius: 0.5rem;
	padding: 2px;
	width: 100%;
	background-size: 400% auto;
	background-position: 0 0;
	opacity: 0.5;
	transition: background-position 0.3s ease-in-out, opacity 0.2s ease-in-out;
	-webkit-mask: linear-gradient(#fff 0 0) content-box,
		linear-gradient(#fff 0 0);
	mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
	-webkit-mask-composite: xor;
	mask-composite: exclude;
}

.gradient-border:hover::before {
	background-position: -50% 0;
	opacity: 1;
}
</style>
