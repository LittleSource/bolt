<template>
	<div class="text-small sm:text-base">
		<Navigation />
		<div class="flex justify-center">
			<div class="flex-1"></div>
			<div class="sm:w-1/2 sm:max-w-1/2 w-full px-2 py-4 sm:px-0">
				<slot name="header"></slot>
				<div class="mt-5">
					<slot name="content" />
				</div>
				<div class="flex justify-between mt-10">
					<slot name="next" />
				</div>
			</div>
			<div class="flex-1 sticky top-30">
				<div class="sm:block sm:w-50 mt-30 hidden">
					<slot name="article-navigate"></slot>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>
