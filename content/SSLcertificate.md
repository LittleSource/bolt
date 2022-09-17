---
title: PHP出现SSLcertificate:unabletogetlocalissuercertificate的解决办法
catalog: true
date: 2020-06-01 13:38:02
author: LittleSource
tags:
- php
---

# PHP出现SSLcertificate:unabletogetlocalissuercertificate的解决办法

> 当本地curl需要访问https时，出现SSL certificate: unable to get local issuer certificate错误信息

### 解决办法：

1. 到 http://curl.haxx.se/ca/cacert.pem 下载pem文件
2. 将文件拷贝到D:\phpStudy\PHPTutorial\cacert.pem
3. 在php.ini增加curl.cainfo = "D:\phpStudy\PHPTutorial\cacert.pem"
