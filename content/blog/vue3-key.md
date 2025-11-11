---
title: Vue3 按键修饰符的使用场景讲解
date: 2022-09-22T14:32:37.000Z
description: 在vue中，对于键盘事件，我们可以使用@keyup或者@keydown等事件去处理...
---

## 监听键盘事件

在 vue 中，我们可以通过v-on指令来监听 DOM 事件。对于键盘事件，我们可以使用@keyup或者@keydown等事件。这种方式，虽然有点违背了关注点分离，但如它官方文档介绍，带来了如下一些好处。

1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。

2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。

3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。

我们可以看一下之前的键盘事件都是怎么处理的：

```js
$(document).keydown(function (e) {
    e = e || event;
    e.stopPropagation();
    // esc 键关闭所有打开的div
    if (e.keyCode == 27) {
        escClosePopup();
        return;
    }
    if (e.keyCode == 13) {
        const target = e.target ? e.target : e.srcElement;
        if(target.name === 'test1') {
            ...
        }
    }
});
```

这种集中式地管理会导致整个document都会受该代码的侵入式影响，看似节省了一些代码，却带来更大的问题。我们只针对特定的 DOM 去绑定@keydown事件就无需担心这种副作用。

## 处理中文输入法的回车

我们通过@keydown.enter修饰符就可以处理回车事件。但在实际工作中，我们的使用场景会变得复杂起来。比如第一个场景，处理中文输入法的回车：

在表单提交的时候，我们经常会用Enter键来快速操作。但是我们使用中文输入法时，期望的是输入英文，而不是直接提交。虽然正确的使用方式是按Space键，但是很多用户的行为已经很难纠正过来，我们不得不去处理这种情况。

## 解决方案

在vue2中，我们可以使用@keydown.13来解决这个问题。 因为对于中文输入法来说，Enter对应的Keycode值是229。我们只针对默认输入法的13来进行处理，就可以规避掉这个问题。

由于keyCode这个属性从 web 标准中删除了，vue3 不再支持@keydown.13这种写法，但是KeyboardEvent里仍然保留了keyCode属性。所以在 vue3 中，我们需要手动处理一下。目前，我的做法是使用一个高阶函数来专门处理中文输入法。

```vue
<template>
  <input
    v-model="input"
    placeholder="请输入内容"
    @keydown.enter="handleKeyBoard($event, handleEnter)"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { handleKeyBoard } from "@/composition/_keyboard";

export default defineComponent({
  setup() {
    const handleEnter = (e: KeyboardEvent) => {
      console.log("触发enter", e);
    };
    return {
      input: ref(""),
      handleEnter,
      handleKeyBoard,
    };
  },
});
</script>
```

```js
/**
 * 高阶函数，处理中文输入法
 * @param e
 * @param handle
 * @returns
 */
export function handleKeyBoard(e: KeyboardEvent, handle: Function) {
  if (e.keyCode === 229) {
    return
  }
  handle(e)
}
```

这种方式需要注意一下浏览器的兼容性。关于浏览器的Keyboard事件，因为不同的厂商等原因，一直都没有被规范化，也是前端的一大痛点。这里有几篇文章对它做了深入的研究：

JavaScript Madness: Keyboard Events
Web 应用快捷键支持（一）：正确处理 Keyboard Event
处理Shift+Enter换行
在有些场景中，我们需要支持按 Enter 提交，Shift+Enter 换行。对于这种需求，我们可以利用.exact修饰符

![code](/vue-key/1.png)

```vue
<input
  v-model="input"
  placeholder="请输入内容"
  @keydown.enter.exact="handleKeyBoard($event, handleEnter)"
/>
```

处理组件的键盘事件
如果我们在组件上使用@keydown是没有效果的，比如Element UI 的`<el-input>`。为了解决这个问题，在 vue2 中我们可以使用.native修饰符，它可以监听组件根元素的原生事件。

```vue
<el-input v-model="input" @keydown.enter.native="handleEnter"></el-input>
```

在 vue3 中，.native修饰符被移除了：移除 v-on.native 修饰符。同时，新增的 emits 选项允许子组件定义真正会被触发的事件。对于子组件中未被定义为组件触发的所有事件监听器，Vue 现在将把它们作为原生事件监听器添加到子组件的根元素中 (除非在子组件的选项中设置了 inheritAttrs: false)。

所以我们会发现基于 vue3 重写的Element Plus不需要再指定.native修饰符了。
