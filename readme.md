```
    ___    _                           ____  ____
   /   |  (_)___  ______________ _____/ /  |/  (_)  __
  / /| | / / __ \/ ___/ ___/ __ `/ __  / /|_/ / / |/_/
 / ___ |/ / / / / /__/ /  / /_/ / /_/ / /  / / />  <
/_/  |_/_/_/ /_/\___/_/   \__,_/\__,_/_/  /_/_/_/|_|
```

#### 发布网站

## ArchLinux 安装运行环境

1. 安装 ruby 环境

```bash
sudo pacman -Sy ruby base-devel --noconfirm
```

2. 配置环境变量

```bash
echo 'export GEM_HOME="$HOME/.local/share/gem"\nexport PATH="$HOME/.local/share/gem/ruby/3.0.0/bin:$PATH"' >> ~/.bashrc
```

3. 使变量生效

```bash
source ~/.bashrc
```

4. 安装 Jekyll

```ruby
gem install bundler jekyll
```

5. 切换到 sendevia.github.io 文件夹

```ruby
bundle install
```

## 运行 jekyll

```ruby
bundle exec jekyll serve --livereload
```

## 环境报错解决方案

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
