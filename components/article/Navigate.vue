<template>
	<div>
		<div class="mt-2 ml-5" v-for="(item, index) in articleNav" :key="index">
			<a :href="`#${item.props.id}`">
				{{ item.props.id }}
			</a>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "#imports";
export default defineComponent({
	props: {
		childrenNode: {
			type: Array as () => any[],
			default: () => [],
		},
	},
	setup(props) {
		const articleNav = props.childrenNode.filter((node) => {
			let titleTag = ["h1", "h2", "h3", "h4", "h5"];
			if (titleTag.includes(node.tag)) return node;
		});
		return {
			articleNav,
		};
	},
});
</script>

<style scoped></style>
