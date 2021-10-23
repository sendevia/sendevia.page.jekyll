```
    ___    _                           ____  ____
   /   |  (_)___  ______________ _____/ /  |/  (_)  __
  / /| | / / __ \/ ___/ ___/ __ `/ __  / /|_/ / / |/_/
 / ___ |/ / / / / /__/ /  / /_/ / /_/ / /  / / />  <
/_/  |_/_/_/ /_/\___/_/   \__,_/\__,_/_/  /_/_/_/|_|
```
#### 发布网站

## ArchLinux安装运行环境

```bash
sudo pacman -Sy ruby base-devel --noconfirm
```
```bash
echo 'export GEM_HOME="$HOME/.local/share/gem"' >> ~/.bashrc
```
```bash
echo 'export PATH="$HOME/.local/share/gem/ruby/3.0.0/bin:$PATH"' >> ~/.bashrc
```
```bash
source ~/.bashrc
```
```ruby
gem install bundler jekyll
```
```ruby
bundle install
```

## 运行 jekyll (包含局域网调试)

```ruby
bundle exec jekyll serve --host 0.0.0.0
```

## 环境报错解决方案

1. **WARNING:  You don't have ... in your PATH, gem executables will not run.**
   - 在 `~/.bashrc` 里添加 
        ```shell
        PATH="`ruby -e 'puts Gem.user_dir'`/bin:$PATH"
        ```
   - 执行
        ```bash
        source ~/.bashrc
        ```

2. **bundler: failed to load command: jekyll (...)
...ffi-*1.15.1*/lib/ffi.rb:5:in `require': libffi.so.7: cannot open shared object file.**
   - 执行
        ```ruby
        gem install ffi -v 1.15.1
        ```