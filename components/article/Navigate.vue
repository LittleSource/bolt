<template>
	<div>
		<div class="ml-5 text-base font-medium border-l-4 border-dark-50 pl-2">
			大纲
		</div>
		<div class="mt-2 ml-5" v-for="(item, index) in articleNav" :key="index">
			<a class="border-gray-400" :href="`#${item.props.id}`">
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
		// TODO对于不同的标题级别显示不同的ml
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

<style scoped>
a:hover {
	border-bottom: 1px solid;
	transition: border 0.3s ease-out;
}
</style>
