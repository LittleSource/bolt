<template>
	<p><slot /></p>
</template>

<style>
p > img {
	padding: 2px 0px;
	max-width: 100%;
}
p > a {
	color: rgba(180, 180, 180, 0.9);
}
p > a:hover {
	border-bottom: 1px solid gray;
	transition: border 1s ease-in-out;
}
</style>
