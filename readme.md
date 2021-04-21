# AincradMix 发布网站

## 安装运行环境（Archlinux + ruby3.0.0）

```shell
$ pacman -Sy ruby
$ echo 'export GEM_HOME="$HOME/.local/share/gem"' >> ~/.bashrc
$ echo 'export PATH="$HOME/.local/share/gem/ruby/3.0.0/bin:$PATH"' >> ~/.bashrc
$ source ~/.bashrc
```

```shell
$ gem install bundler jekyll
$ bundle install
```

## 运行 jekyll

```shell
$ bundle exec jekyll serve --host 0.0.0.0
```
