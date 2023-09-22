# 简介

我自己的博客网站的源码仓库，使用自制的 `jekyll-theme-m3` 主题，目前正积极开发中。**推荐在 CloudFlare 上部署本项目。**

**如果不需要对主题进行开发，直接按部署 jekyll 的方式部署本主题即可。**

编写

> ```
> bundle exec jekyll serve --livereload --host 0.0.0.0
> ```

发布

> ```
> bundle exec jekyll build
> ```

## 配置开发环境

### 安装依赖

Debian/Ubuntu

> ```
> sudo apt install ruby-full build-essential zlib1g-dev curl -y
> ```

Archlinux

> ```
> sudo pacman -S ruby base-devel curl
> ```

1. 使用 [nvm](https://github.com/nvm-sh/nvm) 安装 nodejs

> ```
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
> ```

> `重启终端`

> ```
> nvm install --lts
> ```

### 配置环境变量

_以 bash 为例_

Debian/Ubuntu

> ```
> echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
> ```
>
> ```
> echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
> ```

> `重启终端`

Archlinux

> ```
> echo 'export GEM_HOME="$(ruby -e 'puts Gem.user_dir')"' >> ~/.bashrc
> ```
>
> ```
> echo 'export PATH="$PATH:$GEM_HOME/bin"' >> ~/.bashrc
> ```

> `重启终端`

### 安装 Jekyll

> ```
> gem install bundler jekyll
> ```

### 开发本项目

切换到本项目文件夹

> ```
> npm i
> ```
>
> ```
> bundle i
> ```

> ```
> npm run dev
> ```
