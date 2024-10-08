---
title: git分支及开发规范
date: 2024-08-21 22:18:55
description: 每个仓库有有以下的 branch main dev feat  release hotfix...
---


## branch

每个仓库有有以下的 branch
Branch: main 、 dev 、 feat 、 release 、 hotfix

其中：

main 受保护，存放的是正式服务器线上代码，不允许直接提交代码，所有的 需要上线代码 在上线时需要合并到此分支。

dev 受保护，测试分支，不能直接提交代码，在这个分支`只能从自己 新建的分支 合并`。

feat 分支需要从 main 切出，然后开发完成后，提交合并请求到 dev 分支进行提测。

hotfix 分支需要 main 切出，用于修复线上的bug，待 bug 修复完成后，提交合并请求到 main

## 开发流程

从main分支根据需求，检出分支 feat/xxxx，即 main --> feat/xxxx

开发完成后需要提交到测试服，发起 merge request，待 code review 通过后，负责人 merge 代码，即 feat/xxxx --> dev
> 若此时发起 merge request发现有冲突，千万不要将dev分支合并到自己的feat/xxxx分支，正确的方式是要从自己feat/xxxx新建一个feat_dev/xxxx分支，然后将dev合并到feat_dev/xxxx解决冲突，之后将feat_dev/xxxx提交merge request

测试通过后，发起 merge request，待 code review（此处code review不会很严格） 通过后，负责人 merge 代码，即 feat/xxxx --> main

## git message提交规范

参考angular团队的git提交规范

```yml
  - type
    - 用于说明 `commit` 的类别，只允许使用下面10个标识。
      - feat：新功能（feature）
      - fix：修补bug
      - docs：文档（documentation）
      - style： 格式（不影响代码运行的变动）
      - refactor：重构（即不是新增功能，也不是修改bug的代码变动）
      - perf：性能优化
      - test：增加测试
      - chore：构建过程或辅助工具的变动
      - revert：回退
      - build：打包
  - scope(可选)
    - 用于说明 `commit` 影响的范围，比如Button组件、store、首页、路由等等，视项目不同而不同。
  - subject(可选))
    - 是 `commit` 目的的简短描述，不超过50个字符。
      - 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
      - 第一个字母小写
      - 结尾不加句号（.）
```

例如我改了几个文件，修复了某个bug，提交信息应该是

```shell
fix: 修复了某个bug
```

## 暂时先写这么多，待续
