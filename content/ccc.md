---
title: 'Title of the page'
description: 'meta description of the page'
date: 2022-04-04 22:12:02
---
## 🪶前言

我前段时间投简历的时候，尝试投过20份简历感受下市场，结果只有4份简历给了回应，这在往年是不可能的情况。

在这样的市场行情下，你有再好的技术，投出去的简历都没个响声也白搭呀。找到好工作的一个前提还是得有一份像样的简历呀。

说到简历这个事情，咱们程序员肯定不能用Word模板随便整一个，特别是咱前端(O(∩_∩)O哈哈~我算半个前端)。之前一直在用github某位大佬做的网页版简历，由于项目太老，最近发现有些依赖下载不到了，而且简历布局我也不是很喜欢，所以决定打算自己写一个~~~

废话到此为止，上图👇
## 🪶效果
❤️‍🔥[在线体验](https://resume.52ym.vip/)

Github https://github.com/LittleSource/resume

**网页效果**

![resume.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e5af60d63f3453dab724d9c47b799af~tplv-k3u1fbpfcp-watermark.image?)

**适配手机端**


![4b8cdb07-bdd0-4ec9-b8c9-a141d7e65e48.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64cd22a52a184ae5a4587972fe4ee58d~tplv-k3u1fbpfcp-watermark.image?)
## 🪶Features

- 💥`react`+`ts`+`vite`赶时髦儿的技术栈

- 💪可转换为PDF

- 💦可自定义主题、字体

- 👁️响应式设计

## 🪶后续

本人不是一个专业前端，有些地方写的不够完善，欢迎大佬评论指正！

我会继续完善这个简历，争取做得更易扩展、易修改、可自定义程度更高。

希望有兴趣的小伙伴可以点个`star`、或者提交`PR`一起开发这个项目。

```js
<template>
	<NuxtLayout name="article">
		{{ $route.path }}
		<div class="flex justify-center">
			<div class="sm:w-1/2 w-full px-2 sm:px-0">
				<ContentDoc path="/" />
			</div>
		</div>
	</NuxtLayout>
</template>
```

Github https://github.com/LittleSource/resume-react