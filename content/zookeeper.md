---
title: Zookeeper基础篇
date: 2020-09-06 21:48:37
---
## 1、Zookeeper介绍

它是一个分布式协调框架，主要是用来解决分布式应用中经常用到的一些数据管理问题，如：统一命名服务、状态同步服务，集群管理。分布式应用配置项的管理等。

> **Zookeeper = 文件系统 + 监听通知机制**

##  2、Zookeeper安装

1. 安装java jdk

2. 下载ZooKeeper，地址：http://mirrors.hust.edu.cn/apache/zookeeper/

3. 解压zookeeper-3.4.12.tar.gz

4. 进入conf目录，创建配置文件zoo.cfg，可复制zoo_sample.cfg作为配置文件`cp zoo_sample.cfg zoo.cfg`

5. 启动（附上相关命令）

   ``` shell
   ./bin/zkServer.sh start		#启动 
   ./bin/zkServer.sh stop		#停止
   ./bin/zkServer.sh restart	#重启
   ./bin/zkServer.sh status	#状态
   ```

## 3、Zookeeper节点类型
- 持久化节点
- 有序节点
- 临时节点
- 临时有序节点

## 4、Zookeeper实现分布式锁
![](20200908212659159957161957056.png)

## 5、Zookeeper实现分布式配置中心
![](20200906213146159939910698497.png)

## 6、Go语言实现Zookeeper监听

``` go
package main

import (
	"fmt"
	"github.com/samuel/go-zookeeper/zk"
	"time"
)

func getConnect(host []string) (conn *zk.Conn){
	option := zk.WithEventCallback(callback)
	conn,_,err := zk.Connect(host, time.Second*5,option)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return
}

func callback(event zk.Event) {
	if event.Type.String() == "EventNodeDataChanged" {
		v, _, err := getConnect(hosts).Get(event.Path)
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println(">>>>>>>监听请况>>>>>>")
		fmt.Println("path:", event.Path)
		fmt.Println("type:", event.Type.String())
		fmt.Println("change value:",v)
		fmt.Println("<<<<<<<<end<<<<<<<")
	}
}
var hosts = []string{"localhost:2181"}
func main()  {
	conn := getConnect(hosts)
	defer conn.Close()
	var path = "/username"
	_, _, _, _ = conn.ExistsW(path)
	select{}
}
```