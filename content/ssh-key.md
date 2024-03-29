---
title: 服务器添加key实现免密码登录
description: 最近公司在用服务器开发，每次跑项目都要在终端用ssh连接然后输入密码，vscode远程也需要输入密码...
date: 2022-09-21 09:52:57
---
## 前言

最近在公司用服务器开发，每次跑项目都要在终端用ssh连接然后输入密码，vscode远程也需要输入密码。

所以在想有什么免输入密码的方式去提高效率，终于找到了解决方式，ssh可以使用本地计算机生成的公钥免密登录服务器。

## 1、生成私钥

其实一般情况下，你的本地计算机已经生成好了，就是那个为了github/gitlab所生成的id_rsa.pub文件

一般情况下生成的位置在`~/.ssh/id_rsa.pub`

如果没有可以用下面的命令生成，输入命令后连按三次回车~

```shell
ssh-keygen -t rsa -C "你的邮箱"
```

## 2、将公钥拷贝到服务器

```shell
ssh-copy-id -i ~/.ssh/id_rsa.pub root@192.168.204.100
# windows下可能没有ssh-copy-id命令 可以使用
type %USERPROFILE%.ssh\id_rsa.pub | ssh ubuntu@192.168.1.8 "cat >> .ssh/authorized_keys"
```

## 3、大功告成

可以重新登录试试，免密登录
