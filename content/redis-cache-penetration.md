---
title: Redis缓存穿透
date: 2020-09-05 23:27:04
description: 什么是Redis缓存穿透,布隆过滤器底层算法,本质...
---
## 1. 什么是Redis缓存穿透

![1](/redis-cache-penetration/20200905222406159931584661410.png)

## 2. 布隆过滤器底层算法

### ①布隆过滤器的本质

1. 位数组（二进制向量、bitMap、bitSet）

2. 一系列随机映射函数（Hash）

   ![1](/redis-cache-penetration/20200905225425159931766557459.png)

### ②布隆过滤器的重要结论

![2](/redis-cache-penetration/20200905225657159931781799473.png)

## 3. 使用布隆过滤器解决缓存穿透流程图

![3](/redis-cache-penetration/20200905232415159931945520524.png)
