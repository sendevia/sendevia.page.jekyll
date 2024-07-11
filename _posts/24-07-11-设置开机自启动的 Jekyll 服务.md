---
title: "设置开机自启动的 Jekyll 服务"
description: "通过 systemd 实现一个开机自启的 Jekyll 服务，通常来说，这对使用 Jekyll 作为服务后端的网站很有用。"
author: "sendevia"
color: ""
impression: ""
categories: 
  - 随笔
tags:
  - jekyll
featured: true
---

本文的目标是使用普通用户启动 Jekyll，因此需要添加一行`Environment`来设置下环境变量，并且所有的操作都在这个普通用户的用户目录下进行。

# 新建一个 systemd 服务

```bash
sudo nano /etc/systemd/system/jekyll.service
```

```systemd
[Unit]
Description = Jekyll Service
After = syslog.target

[Service]
# 指定 GEM_HOME 的目录
Environment = GEM_HOME="/home/<user>/gems"
# Jekyll 网站的目录
WorkingDirectory = /home/<user>/<jekyll_site>
User = <user>
Type = simple
# 指定 bundle 所在目录并启动 Jekyll
ExecStart = /home/<user>/gems/bin/bundle exec jekyll serve --port 4000

Restart = always
StandardOutput = journal
StandardError = journal
SyslogIdentifier = jekyll

[Install]
WantedBy = multi-user.target
```

保存之后执行

```bash
sudo systemctl daemon-reload
```

启动自启服务并检查运行状况

```bash
sudo systemctl enable jekyll --now
```

```bash
sudo journalctl -u jekyll
```
