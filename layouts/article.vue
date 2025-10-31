<template>
	<div>
		<Navigation />
		<div class="flex justify-center font-lxgw dark:text-white article-color">
			<div class="flex-1"></div>
			<div class="sm:w-1/3 sm:max-w-1/3 w-full px-2 py-4 sm:px-0">
				<slot name="header"></slot>
				<div class="mt-5 text-small sm:text-base">
					<slot name="content" />
				</div>
				<div class="flex justify-between mt-10">
					<slot name="next" />
				</div>
			</div>
			<div class="flex-1 sm:block sm:w-50 sm:mt-30 hidden">
				<div class="sm:sticky sm:top-10">
					<slot name="article-navigate"></slot>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>
