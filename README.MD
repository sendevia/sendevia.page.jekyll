# 简介

**推荐在 CloudFlare 上部署本项目、在 WSL2 上进行本地开发调试。**

## 配置运行环境

1. 安装依赖

> Debian/Ubuntu

```
sudo apt install ruby-full build-essential zlib1g-dev curl -y
```

> Archlinux

```
sudo pacman -S ruby base-devel curl
```

2. 使用 [nvm](https://github.com/nvm-sh/nvm) 安装 nodejs

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

```
重启终端
```

```
nvm i 12.18
```

1. 配置环境变量

> Debian/Ubuntu

```
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
```

```
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
```

```
重启终端
```

> Archlinux

```
echo 'export GEM_HOME="$(ruby -e 'puts Gem.user_dir')"' >> ~/.bashrc
```

```
echo 'export PATH="$PATH:$GEM_HOME/bin"' >> ~/.bashrc
```

```
重启终端
```

## 安装 Jekyll

```
gem install bundler jekyll
```

# 运行和部署本项目

**切换到本项目文件夹**

```
npm i
```

```
bundle i
```

## 开发模式

```
npm run dev
```

## 发布模式

```
npm run build
```
