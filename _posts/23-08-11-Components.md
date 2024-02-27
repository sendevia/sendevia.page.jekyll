---
title: Material3 Components
description: Material3 组件示例
author: sendevia
color: "#c05545"
impression: /assets/images/108723573_p0.webp
toc: true
---

# Snackbar

底部提示框

<table>
  <thead>
    <tr>
      <th>element</th>
      <th>class</th>
      <th>示例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>div</code></td>
      <td><code>c-snackbar</code></td>
      <td><button id="JTM-P-Components-Snackbar-Test" class="c-button" spec="elevated">点击测试</button>
      </td>
    </tr>
  </tbody>
</table>

#### 代码示例

```html
<span class="c-snackbar"></span>
```

# Buttons

用户交互控件 - 按钮

<table>
  <thead>
    <tr>
      <th>element</th>
      <th>class</th>
      <th>spec</th>
      <th colspan="2">预览</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>button</code></td>
      <td><code>c-button</code></td>
      <td><code>elevated</code></td>
      <td>
        <button class="c-button" spec="elevated">Enabled</button>
      </td>
      <td>
        <button class="c-button" spec="elevated" icon>
          <span>add</span>
          Enabled
        </button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>filled</code></td>
      <td>
        <button class="c-button" spec="filled">Enabled</button>
      </td>
      <td>
        <button class="c-button" spec="filled" icon>
          <span>add</span>
          Enabled
        </button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>tonal</code></td>
      <td>
        <button class="c-button" spec="tonal">Enabled</button>
      </td>
      <td>
        <button class="c-button" spec="tonal" icon>
          <span>add</span>
          Enabled
        </button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>outlined</code></td>
      <td>
        <button class="c-button" spec="outlined">Enabled</button>
      </td>
      <td>
        <button class="c-button" spec="outlined" icon>
          <span>add</span>
          Enabled
        </button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>text</code></td>
      <td>
        <button class="c-button" spec="text">Enabled</button>
      </td>
      <td>
        <button class="c-button" spec="text" icon>
          <span>add</span>
          Enabled
        </button>
      </td>
    </tr>
  </tbody>
</table>

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

<table>
  <thead>
    <tr>
      <th>element</th>
      <th>class</th>
      <th>spec</th>
      <th>预览</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>button</code></td>
      <td><code>c-iconbtn</code></td>
      <td><code>standard</code></td>
      <td>
        <button class="c-iconbtn" spec="standard">settings</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>filled</code></td>
      <td>
        <button class="c-iconbtn" spec="filled">settings</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>tonal</code></td>
      <td>
        <button class="c-iconbtn" spec="tonal">settings</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>outlined</code></td>
      <td>
        <button class="c-iconbtn" spec="outlined">settings</button>
      </td>
    </tr>
  </tbody>
</table>

#### 代码示例

```html
<button class="c-iconbtn" spec="standard">settings</button>
```

# Cards

醒目的内容展示区域

<table>
  <thead>
    <tr>
      <th>class</th>
      <th>spec</th>
      <th>attribute</th>
      <th>预览</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>c-card</code></td>
      <td><code>clear</code></td>
      <td>-</td>
      <td>
        <div class="c-card" spec="clear">
          <div class="c-card-impression">
            <img src="{{ site.impression }}" alt="image" />
          </div>
          <div class="c-card-supporting">
            <h3>Lorem ipsum dolor sit amet</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td></td>
      <td><code>focus</code></td>
      <td>-</td>
      <td>
        <div class="c-card" spec="focus">
          <img src="{{ site.impression }}" alt="image" />
          <div class="c-card-supporting">
            <h3>Lorem ipsum dolor sit amet</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</table>

#### 代码示例

变种：<code>clear</code>

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

变种：<code>focus</code>

```html
<div class="c-card" spec="focus">
  <img src="{{ site.impression }}" alt="image" />
  <div class="c-card-supporting">
    <h3>Lorem ipsum dolor sit amet</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
  </div>
</div>
```

# Chips

通常用于内容的提示，项目的筛选

<table>
  <thead>
    <tr>
      <th>element</th>
      <th>class</th>
      <th>spec</th>
      <th>container</th>
      <th colspan="2">预览</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>button</code></td>
      <td><code>c-chip</code></td>
      <td><code>assist</code></td>
      <td>-</td>
      <td>
        <button class="c-chip" spec="assist">Enabled</button>
      </td>
      <td>
        <button class="c-chip" spec="assist" icon>
          <span>add_shopping_cart</span>
          Enabled
        </button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td>elevated</td>
      <td>
        <button class="c-chip" spec="assist" container="elevated">Enabled</button>
      </td>
      <td>
        <button class="c-chip" spec="assist" container="elevated" icon>
          <span>add_shopping_cart</span>
          Enabled
        </button>
      </td>
    </tr>
  </tbody>
</table>

#### 代码示例

```html
<button class="c-chip" spec="assist">Enabled</button>
```

# Fabs

用户交互控件 - FAB

<table>
  <thead>
    <tr>
      <th>element</th>
      <th>class</th>
      <th>size</th>
      <th colspan="4">spec</th>
    </tr>
    <tr>
      <th></th>
      <th></th>
      <th></th>
      <th>surface</th>
      <th>primary</th>
      <th>secondary</th>
      <th>tertiary</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>button</code></td>
      <td><code>c-fab</code></td>
      <td><code>small</code></td>
      <td>
        <button class="c-fab" spec="surface" size="small">edit</button>
      </td>
      <td>
        <button class="c-fab" spec="primary" size="small">edit</button>
      </td>
      <td>
        <button class="c-fab" spec="secondary" size="small">edit</button>
      </td>
      <td>
        <button class="c-fab" spec="tertiary" size="small">edit</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>normal</code>（默认）</td>
      <td>
        <button class="c-fab" spec="surface" size="normal">edit</button>
      </td>
      <td>
        <button class="c-fab" spec="primary" size="normal">edit</button>
      </td>
      <td>
        <button class="c-fab" spec="secondary" size="normal">edit</button>
      </td>
      <td>
        <button class="c-fab" spec="tertiary" size="normal">edit</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>large</code></td>
      <td>
        <button class="c-fab" spec="surface" size="large">edit</button>
      </td>
      <td>
        <button class="c-fab" spec="primary" size="large">edit</button>
      </td>
      <td>
        <button class="c-fab" spec="secondary" size="large">edit</button>
      </td>
      <td>
        <button class="c-fab" spec="tertiary" size="large">edit</button>
      </td>
    </tr>
  </tbody>
</table>

#### 代码示例

```html
<button class="c-fab" spec="primary" size="normal">edit</button>
```

# Progress Indicators

进度条

<table>
  <thead>
    <tr>
      <th>element</th>
      <th>class</th>
      <th>示例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>span</code></td>
      <td><code>c-progress</code></td>
      <td>
        <span class="c-progress"></span>
      </td>
    </tr>
  </tbody>
</table>

#### 代码示例

```html
<span class="c-progress"></span>
```
