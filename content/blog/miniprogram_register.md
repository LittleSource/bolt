---
title: 微信小程序上线前注册与备案流程
description: 从零开始注册微信小程序、填写信息、备案、开通微信支付注册指南。
date: 2026-06-14T16:00:00.000Z
categories:
  - 微信小程序
tags:
  - 小程序
  - 微信
---

## 一、提前准备

在开始注册前，先准备好以下材料：

1. **营业执照电子版**
2. **未注册过微信平台的邮箱**
3. **法人身份证正反面照片**

## 二、注册小程序账号

**官网入口：** [微信公众平台](https://mp.weixin.qq.com/cgi-bin/wx?lang=zh_CN&token=)

点击「前往注册」，按照指引填写信息。

![](/content/miniprogram_register/image1.png)

注册流程共 6 步，依次填写即可：

![](/content/miniprogram_register/image2.png)

![](/content/miniprogram_register/image3.png)

![](/content/miniprogram_register/image4.png)

![](/content/miniprogram_register/image5.png)

![](/content/miniprogram_register/image6.png)


**关于管理员：**
管理员就是以后操作这个小程序后台的人，包括设置小程序的基本信息，上传代码，提交代码审核及发布等工作。

![](/content/miniprogram_register/image7.png)

注册成功后，进入小程序管理后台：

![](/content/miniprogram_register/image8.png)

## 三、填写小程序信息

进入后台首页 → 「小程序信息」→「去填写」

### ① 小程序名称
一年可以修改 **3 次**。建议提前在手机版微信搜索一下，看看你想要的名称是否已被注册。申请过程中系统也会检测名称是否可用。

![](/content/miniprogram_register/image9.png)

### ② 小程序简称（选填）
一年可以修改 **2 次**。简称会展示在手机任务栏，展示效果如下：

![](/content/miniprogram_register/image10.png)

### ③ 小程序头像
可以自己设计一个专属 logo，或者从网上找一个不侵权、符合风格的图标。要求、格式、大小、尺寸如下：

![](/content/miniprogram_register/image11.png)

### ④ 小程序介绍
简单描述小程序的用途和服务范围。

### ⑤ 提交
全部填写完成后提交即可。

## 四、补充服务类目

首页 → 「小程序类目」→「去补充」

根据你的小程序实际业务选择对应的服务类目，不同类目需要的资质文件不同。

![](/content/miniprogram_register/image12.png)

![](/content/miniprogram_register/image13.png)

## 五、微信认证

首页 →「微信认证」

腾讯那边需要收取费用 （企业 300 元， 个体工商户 30 元）。

按提示操作付完钱等待审核就好，大概几个小时就能审核通过。

## 六、小程序备案

**这是比较耗时的一步。**

首页 →「小程序备案」

需要填写：
- 个人身份信息
- 身份证正反面照片
- 其他备案相关信息

提交后等待管局审核，通常需要 **5-15 个工作日**。

## 七、微信支付（完成认证后申请）

前提：必须先完成小程序认证。

微信支付的申请和 APIv3 密钥配置步骤比较多，我单独写了一篇文章详细说明：

👉 [微信支付商户号申请与 APIv3 密钥配置](/blog/wepay-register)

包括申请商户号、绑定小程序、配置 APIv3 密钥、获取证书文件等完整流程。

## 八、总结时间线

| 步骤 | 预计时长 | 备注 |
|------|---------|------|
| 注册小程序 | 1 天 | 资料齐全很快 |
| 填写信息 + 类目 | 1 天 | |
| 小程序备案 | 5-15 天 | 最耗时 |
| 微信支付申请 | 1-3 天 | 需先完成认证 |
| 购买服务器 + 域名备案 | 7-15 天 | 可和备案同步进行 |

> **建议：** 备案和域名备案可以同时进行，节省等待时间。建议提前准备所有材料，整个流程走下来大约需要 **10-15 天**。
