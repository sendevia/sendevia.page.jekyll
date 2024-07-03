---
title: "Material3 Components"
description: "Material3 组件示例"
author: "sendevia"
color: "#02d8bb"
impression: "/assets/images/116014672_p0.webp"
toc: true
---

# Snackbar

底部提示框

| element          | class                   | preview                                                                                       |
| ---------------- | ----------------------- | --------------------------------------------------------------------------------------------- |
| <code>div</code> | <code>snackbar</code> | <button id="JTM-P-Components-Snackbar-Test" class="common-button" spec="elevated">点击测试</button> |

#### 代码示例

```html
<span class="snackbar"></span>
```

# Buttons

用户交互控件 - 按钮

| element             | class                 | spec                  | preview                                                         ||
| ------------------- | --------------------- | --------------------- | --------------------------------------------------------- | ---- |
| <code>button</code> | <code>common-button</code> | <code>elevated</code> | <button class="common-button" spec="elevated">Enabled</button> | <button class="common-button" spec="elevated" icon><span>add</span>Enabled</button> |
| ^^                  | ^^                    | <code>filled</code>   | <button class="common-button" spec="filled">Enabled</button>   | <button class="common-button" spec="filled" icon><span>add</span>Enabled</button>   |
| ^^                  | ^^                    | <code>tonal</code>    | <button class="common-button" spec="tonal">Enabled</button>    | <button class="common-button" spec="tonal" icon><span>add</span>Enabled</button>    |
| ^^                  | ^^                    | <code>outlined</code> | <button class="common-button" spec="outlined">Enabled</button> | <button class="common-button" spec="outlined" icon><span>add</span>Enabled</button> |
| ^^                  | ^^                    | <code>text</code>     | <button class="common-button" spec="text">Enabled</button>     | <button class="common-button" spec="text" icon><span>add</span>Enabled</button>     |

#### 代码示例

```html
<button class="common-button" spec="elevated">Enabled</button>
<button class="common-button" spec="elevated" icon>
  <span>add</span>
  Enabled
</button>
```

# Icon buttons

用户交互控件 - 图标按钮

| element             | class                  | spec                  | preview                                                     |
| ------------------- | ---------------------- | --------------------- | ----------------------------------------------------------- |
| <code>button</code> | <code>icon-button</code> | <code>standard</code> | <button class="icon-button" spec="standard">settings</button> |
| ^^                  | ^^                     | <code>filled</code>   | <button class="icon-button" spec="filled">settings</button>   |
| ^^                  | ^^                     | <code>tonal</code>    | <button class="icon-button" spec="tonal">settings</button>    |
| ^^                  | ^^                     | <code>outlined</code> | <button class="icon-button" spec="outlined">settings</button> |

#### 代码示例

```html
<button class="icon-button" spec="standard">settings</button>
```

# Cards

醒目的内容展示区域

| class               | spec               | preview |
| ------------------- | ------------------ | ------- |
| <code>card</code> | <code>clear</code> | <div class="card" spec="clear"><div class="card-impression"><img src="{{ site.impression }}" alt="image" /></div><div class="card-supporting"><h3>Lorem ipsum dolor sit amet</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p></div></div> |
| ^^                  | <code>focus</code> | <div class="card" spec="focus"><div class="card-impression"><img src="{{ site.impression }}" alt="image" /></div><div class="card-supporting"><h3>Lorem ipsum dolor sit amet</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p></div></div> |

#### 代码示例

```html
<div class="card" spec="clear">
  <div class="card-impression">
    <img src="{{ site.impression }}" alt="image" />
  </div>
  <div class="card-supporting">
    <h3>Lorem ipsum dolor sit amet</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
  </div>
</div>
```

# Fabs

用户交互控件 - FAB

| element             | class              | size                | spec                                  ||||
| ^^                  | ^^                 | ^^                  | surface | primary | secondary | tertiary |
| ------------------- | ------------------ | ------------------- | ------- | ------- | --------- | -------- |
| <code>button</code> | <code>fab</code> | <code>small</code>  | <button class="fab" spec="surface" size="small">edit</button> | <button class="fab" spec="primary" size="small">edit</button> | <button class="fab" spec="secondary" size="small">edit</button> | <button class="fab" spec="tertiary" size="small">edit</button> |
| ^^                  | ^^                 | <code>normal</code> | <button class="fab" spec="surface" size="normal">edit</button> | <button class="fab" spec="primary" size="normal">edit</button> | <button class="fab" spec="secondary" size="normal">edit</button> | <button class="fab" spec="tertiary" size="normal">edit</button> |
| ^^                  | ^^                 | <code>large</code>  | <button class="fab" spec="surface" size="large">edit</button> | <button class="fab" spec="primary" size="large">edit</button> | <button class="fab" spec="secondary" size="large">edit</button> | <button class="fab" spec="tertiary" size="large">edit</button> |

#### 代码示例

```html
<button class="fab" spec="primary" size="normal">edit</button>
```

# Progress Indicators

进度条

| element           | class                   | preview                          |
| ----------------- | ----------------------- | -------------------------------- |
| <code>span</code> | <code>progress-indicator</code> | <span class="progress-indicator"></span> |

#### 代码示例

```html
<span class="progress-indicator"></span>
```
