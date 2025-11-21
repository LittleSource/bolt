---
title: Chronoframe安装
description: 自托管个人图库应用程序，具有在线照片管理和相册功能，支持动态照片、EXIF 解析、地理位置识别和探索地图。一款流畅的照片显示和管理应用程序，支持多种图像格式和大尺寸图像渲染。
seo:
  title: Chronoframe file
  description: 自托管个人图库应用程序，具有在线照片管理和相册功能，支持动态照片、EXIF 解析、地理位置识别和探索地图。一款流畅的照片显示和管理应用程序，支持多种图像格式和大尺寸图像渲染。
date: 2025-11-21T21:46:57.000Z
categories:
  - null
tags:
  - 软件
---

1. 拉取镜像
   ```shell
   docker pull ghcr.io/hoshinosuzumi/chronoframe:latest
   ```
2. 创建文件夹 chronoframe
   ```shell
   mkdir chronoframe
   ```
3. 创建 .env 文件
   ```yaml
   # 管理员邮箱（必须）
   CFRAME_ADMIN_EMAIL=littley@outlook.ie
   # 管理员用户名（可选，默认 ChronoFrame）
   CFRAME_ADMIN_NAME=
   # 管理员密码（可选，默认 CF1234@!）
   CFRAME_ADMIN_PASSWORD=

   # 站点信息（均可选）
   NUXT_PUBLIC_APP_TITLE="LittleYuan's photos"
   NUXT_PUBLIC_APP_SLOGAN=
   NUXT_PUBLIC_APP_AUTHOR=LittleYuan
   NUXT_PUBLIC_APP_AVATAR_URL=https://cdn.52ym.vip/32avatar.jpg

   # 地图提供器 (maplibre/mapbox)
   NUXT_PUBLIC_MAP_PROVIDER=maplibre
   # 使用 MapLibre 需要 MapTiler 访问令牌
   NUXT_PUBLIC_MAP_MAPLIBRE_TOKEN=
   # 使用 Mapbox 需要 Mapbox 访问令牌
   NUXT_PUBLIC_MAPBOX_ACCESS_TOKEN=

   # Mapbox 无域名限制令牌（反向地理编码，可选）
   NUXT_MAPBOX_ACCESS_TOKEN=

   # 存储提供者（local、s3 或 openlist）
   NUXT_STORAGE_PROVIDER=s3
   NUXT_PROVIDER_S3_ENDPOINT=https://s3.api.upyun.com
   NUXT_PROVIDER_S3_BUCKET=chronoframe-photos
   NUXT_PROVIDER_S3_REGION=auto
   NUXT_PROVIDER_S3_ACCESS_KEY_ID=69a4exxxxxxxxbbaf03417b4bc1a778
   NUXT_PROVIDER_S3_SECRET_ACCESS_KEY=a3447xxxxxxx5d17a54129a608
   NUXT_PROVIDER_S3_CDN_URL=https://photos.52ym.vip/

   NUXT_PROVIDER_LOCAL_PATH=/app/data/storage

   # 会话密码（必须，32 位随机字符串）
   NUXT_SESSION_PASSWORD=GWLyi2zrSo83DQMS1ZQvqW6wWlyUzmCB
   ```
4. 创建 docker-compose.yml 文件
   ```yaml
   services:
     chronoframe:
       image: ghcr.io/hoshinosuzumi/chronoframe:latest
       container_name: chronoframe
       restart: unless-stopped
       ports:
         - "3000:3000"
       volumes:
         - ./data:/app/data
       env_file:
         - .env
   ```
5. 启动
   ```bash
   docker-compose up -d
   ```

**使用指南**

> 如未配置 CFRAME\_ADMIN\_EMAIL 和 CFRAME\_ADMIN\_PASSWORD，默认账号如下：
>
> - 邮箱: `admin@chronoframe.com`
> - 密码: `CF1234@!`

**登录到控制台**

1. 点击头像跳转到登录页面，可以使用账号密码或 GitHub 登录

**上传照片**

1. 访问仪表板页面 `/dashboard`
2. 在 `Photos` 页面中选择图片并点击上传（支持批量上传和拖拽上传）
3. 系统将自动提取 EXIF 信息、生成缩略图并逆编码照片地理位置
