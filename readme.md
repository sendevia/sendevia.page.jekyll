```
    ___    _                           ____  ____
   /   |  (_)___  ______________ _____/ /  |/  (_)  __
  / /| | / / __ \/ ___/ ___/ __ `/ __  / /|_/ / / |/_/
 / ___ |/ / / / / /__/ /  / /_/ / /_/ / /  / / />  <
/_/  |_/_/_/ /_/\___/_/   \__,_/\__,_/_/  /_/_/_/|_|
```
### 发布网站

## 安装运行环境 (Archlinux + ruby3.0.0)

```shell
$ sudo pacman -Sy ruby
$ echo 'export GEM_HOME="$HOME/.local/share/gem"' >> ~/.bashrc
$ echo 'export PATH="$HOME/.local/share/gem/ruby/3.0.0/bin:$PATH"' >> ~/.bashrc
$ source ~/.bashrc
```

```shell
$ gem install bundler jekyll
$ bundle install
```

## 运行 jekyll (包含局域网调试)

```shell
$ bundle exec jekyll serve --host 0.0.0.0
```

## 安装 jekyll 环境时报错解决方案

1. `WARNING:  You don't have ... in your PATH, gem executables will not run.`
   - 在 `~/.bashrc` 里增加 ``PATH="`ruby -e 'puts Gem.user_dir'`/bin:$PATH"``。
   - 执行 `source ~/.bashrc`。
