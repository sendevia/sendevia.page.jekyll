```
    ___    _                           ____  ____
   /   |  (_)___  ______________ _____/ /  |/  (_)  __
  / /| | / / __ \/ ___/ ___/ __ `/ __  / /|_/ / / |/_/
 / ___ |/ / / / / /__/ /  / /_/ / /_/ / /  / / />  <
/_/  |_/_/_/ /_/\___/_/   \__,_/\__,_/_/  /_/_/_/|_|
```
### 发布网站

## 安装 jekyll 环境时报错解决方案

1. `WARNING:  You don't have ... in your PATH, gem executables will not run.`
   - 在 `~/.bashrc` 里增加 ``PATH="`ruby -e 'puts Gem.user_dir'`/bin:$PATH"``。
   - 执行 `source ~/.bashrc`。
