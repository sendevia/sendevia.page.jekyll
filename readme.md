# 安装运行环境

## ArchLinux

1. 安装 ruby 环境

```
sudo pacman -Sy ruby base-devel --noconfirm
```

2. 配置环境变量

```bash
echo 'export GEM_HOME="$HOME/.local/share/gem"' >> ~/.bashrc
echo 'export PATH="$HOME/.local/share/gem/ruby/3.0.0/bin:$PATH"' >> ~/.bashrc
```

## Ubuntu 22.04

1. 安装 ruby 环境

```
sudo apt install ruby-full build-essential zlib1g-dev -y
```

2. 配置环境变量

```bash
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

# 使变量生效

```bash
source ~/.bashrc
```

# 安装 Jekyll

```ruby
gem install bundler jekyll
```

# 运行 Jekyll

1. 切换到本项目文件夹

```ruby
bundle install
```

```ruby
bundle exec jekyll serve --livereload
```

# 环境报错解决方案

1. **WARNING: You don't have ... in your PATH, gem executables will not run.**

   - 在 `~/.bashrc` 里添加
     ```shell
     PATH="`ruby -e 'puts Gem.user_dir'`/bin:$PATH"
     ```
   - 使更改生效
     ```bash
     source ~/.bashrc
     ```

2. **bundler: failed to load command: jekyll (...)
   ...ffi-_1.15.1_/lib/ffi.rb:5:in `require': libffi.so.7: cannot open shared object file.**
   - 单独安装 1.15.1 版本
     ```ruby
     gem install ffi -v 1.15.1
     ```
