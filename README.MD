# 简介

我自己的博客网站的源码仓库，使用自制的 `jekyll-theme-m3` 主题，目前正积极开发中。**推荐在 CloudFlare 上部署本项目。**

**如果不需要对主题进行开发，直接按部署 jekyll 的方式部署本主题即可。**

```bash
bundle exec jekyll build
```

## 配置开发环境

### 安装依赖

Debian/Ubuntu

```bash
sudo apt install ruby-full build-essential zlib1g-dev curl -y
```

Archlinux

```bash
sudo pacman -S ruby base-devel curl
```

1. 使用 [nvm](https://github.com/nvm-sh/nvm) 安装 nodejs

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```

`重启终端`

```bash
nvm install --lts
```

### 配置环境变量，以 bash 为例

Debian/Ubuntu

```bash
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
```

```bash
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
```

`重启终端`

Archlinux

```bash
echo 'export GEM_HOME="$(ruby -e 'puts Gem.user_dir')"' >> ~/.bashrc
```

```bash
echo 'export PATH="$PATH:$GEM_HOME/bin"' >> ~/.bashrc
```

`重启终端`

### 安装 Jekyll

```bash
gem install bundler jekyll
```

### 开发本项目

切换到本项目文件夹

```bash
npm i
```

```bash
bundle i
```

```bash
npm run dev
```
