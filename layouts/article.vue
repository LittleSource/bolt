<template>
	<div>
		<Navigation />
		<div class="flex justify-center">
			<div class="sm:w-1/2 sm:max-w-1/2 w-full px-2 py-4 sm:px-0">
				<slot />
			</div>
		</div>
		<Footer />
	</div>
</template>
