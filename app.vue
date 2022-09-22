<script setup>
useHead({
	title: "Little Yuan's blog",
	style: [
		{
			children: `*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}svg{display:block;vertical-align:middle}`,
		},
	],
	link: [
		{
			rel: "icon",
			type: "image/png",
			href: "/nuxt.png",
		},
	],
});

//查询总页数
const limit = useLimit();
const pageSum = usePageSum();
queryContent("/")
	.find()
	.then((res) => {
		pageSum.value = Math.ceil(res.length / limit);
	});
</script>

<template>
	<div class="font-sans text-small sm:text-base">
		<NuxtLoadingIndicator />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style>
html,
body,
html,
body,
#__nuxt {
	height: 100vh;
	margin: 0;
	padding: 0;
}
html.dark {
	background: #000;
	color: white;
}
img {
	padding: 2px 0px;
	width: 100%;
}
pre > code,
line {
	width: 100%;
	overflow: auto;
}
pre {
	margin: 10px 0px 0px;
}
h1 {
	font-size: 1.7rem;
}
h2 {
	font-size: 1.6rem;
}
h3 {
	font-size: 1.5rem;
}
h4 {
	font-size: 1.4rem;
}
h5 {
	font-size: 1.3rem;
}
ol,
p,
li {
	font-size: 1.2rem;
}
p {
	line-height: 1.8rem;
}

.font-sans {
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
		Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
		"Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol,
		"Noto Color Emoji";
}
</style>
