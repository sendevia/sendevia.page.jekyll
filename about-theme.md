---
author: sendevia
description: Material 3 (Material You) 在 jekyll 上的轻量化实现
excerpt_separator: <!--more-->
header_image: /assets/images/97367522_p0.webp
layout: Material3
notips: true
title: A Material3 Theme for Jekyll
---

# 关于主题

<material-card filled style="max-width: 50%;">
    <div class="header">
        <div id="content">
            <div id="text">
                <span id="header">深海</span>
                <a href="https://www.pixiv.net/users/17965967" target="_blank">
                    <span id="subhead">sas</span>
                </a>
            </div>
        </div>
  </div>
  <img src="/assets/images/97367522_p0.webp" />
  <div class="actions">
    <button onclick="location.href='//pixiv.net/artworks/97367522'" icon>
        <span>open_in_new</span>
        标题背景图来源
    </button>
  </div>
</material-card>

# 主要功能

1. 编撰文章
2. 简单的主题颜色更换

# 已知 BUG

1. 文章内的链接有指向错误，目前在文章中插入链接只能使用`[文字](链接)`的方式，而拆分开后它们就不能正确的对应在一起了。比如`[文字]`放在文章中，`(链接)`放在文章结尾。这可能是 kramdown 的 bug。
