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
| <code>div</code> | <code>c-snackbar</code> | <button id="JTM-P-Components-Snackbar-Test" class="c-button" spec="elevated">点击测试</button> |

#### 代码示例

```html
<span class="c-snackbar"></span>
```

# Buttons

用户交互控件 - 按钮

| element             | class                 | spec                  | preview                                                         ||
| ------------------- | --------------------- | --------------------- | --------------------------------------------------------- | ---- |
| <code>button</code> | <code>c-button</code> | <code>elevated</code> | <button class="c-button" spec="elevated">Enabled</button> | <button class="c-button" spec="elevated" icon><span>add</span>Enabled</button> |
| ^^                  | ^^                    | <code>filled</code>   | <button class="c-button" spec="filled">Enabled</button>   | <button class="c-button" spec="filled" icon><span>add</span>Enabled</button>   |
| ^^                  | ^^                    | <code>tonal</code>    | <button class="c-button" spec="tonal">Enabled</button>    | <button class="c-button" spec="tonal" icon><span>add</span>Enabled</button>    |
| ^^                  | ^^                    | <code>outlined</code> | <button class="c-button" spec="outlined">Enabled</button> | <button class="c-button" spec="outlined" icon><span>add</span>Enabled</button> |
| ^^                  | ^^                    | <code>text</code>     | <button class="c-button" spec="text">Enabled</button>     | <button class="c-button" spec="text" icon><span>add</span>Enabled</button>     |

#### 代码示例

```html
<button class="c-button" spec="elevated">Enabled</button>
<button class="c-button" spec="elevated" icon>
  <span>add</span>
  Enabled
</button>
```

# Icon buttons

用户交互控件 - 图标按钮

| element             | class                  | spec                  | preview                                                     |
| ------------------- | ---------------------- | --------------------- | ----------------------------------------------------------- |
| <code>button</code> | <code>c-iconbtn</code> | <code>standard</code> | <button class="c-iconbtn" spec="standard">settings</button> |
| ^^                  | ^^                     | <code>filled</code>   | <button class="c-iconbtn" spec="filled">settings</button>   |
| ^^                  | ^^                     | <code>tonal</code>    | <button class="c-iconbtn" spec="tonal">settings</button>    |
| ^^                  | ^^                     | <code>outlined</code> | <button class="c-iconbtn" spec="outlined">settings</button> |

#### 代码示例

```html
<button class="c-iconbtn" spec="standard">settings</button>
```

# Cards

醒目的内容展示区域

| class               | spec               | preview |
| ------------------- | ------------------ | ------- |
| <code>c-card</code> | <code>clear</code> | <div class="c-card" spec="clear"><div class="c-card-impression"><img src="{{ site.impression }}" alt="image" /></div><div class="c-card-supporting"><h3>Lorem ipsum dolor sit amet</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p></div></div> |
| ^^                  | <code>focus</code> | <div class="c-card" spec="focus"><div class="c-card-impression"><img src="{{ site.impression }}" alt="image" /></div><div class="c-card-supporting"><h3>Lorem ipsum dolor sit amet</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p></div></div> |

#### 代码示例

```html
<div class="c-card" spec="clear">
  <div class="c-card-impression">
    <img src="{{ site.impression }}" alt="image" />
  </div>
  <div class="c-card-supporting">
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
| <code>button</code> | <code>c-fab</code> | <code>small</code>  | <button class="c-fab" spec="surface" size="small">edit</button> | <button class="c-fab" spec="primary" size="small">edit</button> | <button class="c-fab" spec="secondary" size="small">edit</button> | <button class="c-fab" spec="tertiary" size="small">edit</button> |
| ^^                  | ^^                 | <code>normal</code> | <button class="c-fab" spec="surface" size="normal">edit</button> | <button class="c-fab" spec="primary" size="normal">edit</button> | <button class="c-fab" spec="secondary" size="normal">edit</button> | <button class="c-fab" spec="tertiary" size="normal">edit</button> |
| ^^                  | ^^                 | <code>large</code>  | <button class="c-fab" spec="surface" size="large">edit</button> | <button class="c-fab" spec="primary" size="large">edit</button> | <button class="c-fab" spec="secondary" size="large">edit</button> | <button class="c-fab" spec="tertiary" size="large">edit</button> |

#### 代码示例

```html
<button class="c-fab" spec="primary" size="normal">edit</button>
```

# Progress Indicators

进度条

| element           | class                   | preview                          |
| ----------------- | ----------------------- | -------------------------------- |
| <code>span</code> | <code>c-progress</code> | <span class="c-progress"></span> |

#### 代码示例

```html
<span class="c-progress"></span>
```
