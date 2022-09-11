<template>
	<div class="h-50 flex flex-col rounded p-4 gradient-border">
		<div class="flex justify-between items-center mb-4">
			<h4 class="font-medium text-2xl">Get Started</h4>
		</div>
		<p class="mb-2">
			Remove this welcome page by removing &lt;NuxtWelcome /&gt; tag or
			creating an app.vue file.
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
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
}
@media (prefers-color-scheme: light) {
	.gradient-border {
		background-color: rgba(255, 255, 255, 0.3);
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
	}
}
@media (prefers-color-scheme: dark) {
	.gradient-border {
		background-color: rgba(20, 20, 20, 0.3);
	}
	.gradient-border::before {
		background: linear-gradient(
			90deg,
			#303030 0%,
			#303030 25%,
			#00dc82 50%,
			#36e4da 75%,
			#0047e1 100%
		);
	}
}
.gradient-border::before {
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
