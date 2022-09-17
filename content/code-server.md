---
title: Code-server搭建web IDE
date: 2021-04-06 18:52:11
---
最近买了个平板电脑，想着能在图书馆安安静静的刷Leetcode，但是网站上的编辑器一点提示都没有，纯文本手写效率有点低

> 传送门 [code-server gitHub](https://github.com/cdr/code-server)
### 前言
最近买了个平板电脑，想着能在图书馆安安静静的刷Leetcode，但是网站上的编辑器一点提示都没有，纯文本手写效率有点低，偶然间看到还能有网页版的VScode，所以自己动手搭建了一下。
### Code-server概述
code server 的目标是为开发者构建一个便捷统一的开发环境，让开发者能从任意设备、任意位置通过浏览器来进行代码的编写。从而免去了常规的 IDE 开发流程中的环境搭建的问题。
### 安装流程
1. 使用github文档提供的命令
``` shell
curl -fsSL https://code-server.dev/install.sh | sh -s -- --dry-run
```
2. 然后按控制台输出的几个步骤操作:

    ![控制台显示](/static/code-server/code.png)


3. 按上述步骤操作完成后，如果要允许任意IP访问得修改一下配置文件
``` shell
vi ~/.config/code-server/config.yaml
```
改成如下代码
``` shell
bind-addr: 0.0.0.0:8080
auth: password
password: 123456
cert: false
```

4. 启动

    有两种方式
    
    1 后台启动
    ``` shell
    sudo systemctl enable --now code-server@$USER
    ```

    2 前台启动
    ``` shell
    code-server
    ```