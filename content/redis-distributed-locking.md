---
title: Redis实现分布式锁
date: 2020-09-05 22:32:04
description: 线程锁在高并发中存在的问题,一般的线程锁并不能在分布式架构中解决高并发问题
---
## 线程锁在高并发中存在的问题

一般的线程锁并不能在分布式架构中解决高并发问题

![png](/redis-distributed-locking/20200904214328159922700848252.png)

## 解决思路

1. 使用UUID为每个线程创建唯一标识
2. 使用redis的setnx设置锁(UUID、过期时间)
3. 定时器或循环 延长锁的过期时间（过期时间的1/3）
4. 业务执行完成释放锁

![1](/redis-distributed-locking/20200904220034159922803443492.png)

## redisson分布式锁底层原理

![原理流程图](/redis-distributed-locking/20200904205428159922406833844.png)

### 这种redisson架构存在的问题

redis（Master）挂掉之后未同步当前锁，从Redis服务变成主节点，此时别的请求访问新的主Redis后无锁的情况，使用[ZooKeeper](http://blog.ymkj8.com/?id=9 "ZooKeeper")解决

## 提升分布式锁的性能

redis内将商品库存分段存储，程序分段操作

![png](/redis-distributed-locking/20200904220403159922824352423.png)
