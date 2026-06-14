---
title: 微信支付商户号注册教程
description: 微信支付开通全流程：从申请商户号、绑定小程序、配置 APIv3 密钥到获取证书文件。
date: 2026-06-14T16:00:00.000Z
categories:
  - 微信小程序
tags:
  - 小程序
  - 微信支付
---

## 前置条件

在申请微信支付之前，必须先完成以下两步：

1. **小程序注册** — 在微信公众平台完成小程序账号注册
2. **小程序认证** — 完成微信认证

## 一、申请微信支付

**官网：** [微信支付商户平台](https://pay.weixin.qq.com/)

### 需要准备的材料

- 营业执照（已完成小程序认证的可用同一份）
- 对公银行账户信息
- 法人/经营者身份证信息
- 一个用于接收通知的手机号
- 一个用于收款管理的微信号

### 申请步骤

1. 进入微信支付商户平台，点击「接入微信支付」
2. 选择「企业」类型，填写基本资料
3. 填写企业经营类目、销售商品信息
4. 绑定对公账户
5. 绑定小程序（输入小程序的 AppID）
6. 设置收款管理员（微信号），用于接收收款通知和操作确认

## 二、获取小程序 APPID

登录微信公众平台后，进入：

> 开发 → 开发管理 → 基本设置

即可查看到小程序的 **AppID**（以 `wx` 开头的字符串）。

## 三、配置 APIv3 密钥 

**！！！这一步操作复杂，不懂可联系开发人员！！！**

### 申请 APIv3

1. 登录 [微信支付商户平台](https://pay.weixin.qq.com/)
2. 进入「账户中心」→「API 安全」
3. 申请开通 APIv3
4. 设置 APIv3 密钥（一个 32 位的字符串，需自己设置并牢记）

### 生成证书文件

开启 APIv3 后，需要下载两个证书文件：

- **`apiclient_cert.pem`** — 商户证书（公钥）
- **`apiclient_key.pem`** — 商户私钥（密钥）

> 这两个文件在商户平台可以直接下载，也可以通过 API 工具生成。

### 最终参数配置

配置完成后，你会得到以下参数：

```javascript
{
  appid: "wx你的小程序AppID",
  mchid: "你的商户号",
  publicKey: fs.readFileSync("./utils/apiclient_cert.pem"), // 公钥文件
  privateKey: fs.readFileSync("./utils/apiclient_key.pem"), // 密钥文件
  key: "你设置的APIv3密钥",
}
```

### 安全提醒

:::warning
公钥和密钥文件涉及到你的支付资金安全，请务必注意：

- 不要将 `.pem` 文件上传到公开仓库（如 GitHub）
- 建议在服务器上使用绝对路径引用，不要放在前端静态目录
- 建议自己申请和生成，不要完全依赖第三方操作
- APIv3 密钥请使用强密码，并定期更换
:::

## 参考链接

- 微信支付商户平台：[https://pay.weixin.qq.com/](https://pay.weixin.qq.com/)
- 小程序 APPID 获取：[https://mp.weixin.qq.com/](https://mp.weixin.qq.com/)
- APIv3 接入文档：[https://pay.weixin.qq.com/wiki/doc/apiv3/](https://pay.weixin.qq.com/wiki/doc/apiv3/)
