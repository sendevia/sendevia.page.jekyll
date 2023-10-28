---
title: Material3 Components
description: Material3 组件示例
author: sendevia
color: ""
impression: /assets/images/108723573_p0.webp
toc: true
---

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
      <td><code>JTM-C-CommonButton</code></td>
      <td><code>elevated</code></td>
      <td>
        <button class="JTM-C-CommonButton" spec="elevated">Enabled</button>
      </td>
      <td>
        <button class="JTM-C-CommonButton" spec="elevated" icon>
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
        <button class="JTM-C-CommonButton" spec="filled">Enabled</button>
      </td>
      <td>
        <button class="JTM-C-CommonButton" spec="filled" icon>
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
        <button class="JTM-C-CommonButton" spec="tonal">Enabled</button>
      </td>
      <td>
        <button class="JTM-C-CommonButton" spec="tonal" icon>
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
        <button class="JTM-C-CommonButton" spec="outlined">Enabled</button>
      </td>
      <td>
        <button class="JTM-C-CommonButton" spec="outlined" icon>
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
        <button class="JTM-C-CommonButton" spec="text">Enabled</button>
      </td>
      <td>
        <button class="JTM-C-CommonButton" spec="text" icon>
          <span>add</span>
          Enabled
        </button>
      </td>
    </tr>
  </tbody>
</table>

#### 代码示例

```html
<button class="JTM-C-CommonButton" spec="elevated">Enabled</button>
<button class="JTM-C-CommonButton" spec="elevated" icon>
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
      <td><code>JTM-C-IconButton</code></td>
      <td><code>standard</code></td>
      <td>
        <button class="JTM-C-IconButton" spec="standard">settings</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>filled</code></td>
      <td>
        <button class="JTM-C-IconButton" spec="filled">settings</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>tonal</code></td>
      <td>
        <button class="JTM-C-IconButton" spec="tonal">settings</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>outlined</code></td>
      <td>
        <button class="JTM-C-IconButton" spec="outlined">settings</button>
      </td>
    </tr>
  </tbody>
</table>

#### 代码示例

```html
<button class="JTM-C-IconButton" spec="standard">settings</button>
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
      <td><code>JTM-C-Card</code></td>
      <td><code>clear</code></td>
      <td>-</td>
      <td>
        <div class="JTM-C-Card" spec="clear">
          <div class="JTM-C-Card-Impression">
            <img src="{{ site.impression }}" alt="image" />
          </div>
          <div class="JTM-C-Card-Supporting">
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
        <div class="JTM-C-Card" spec="focus">
          <img src="{{ site.impression }}" alt="image" />
          <div class="JTM-C-Card-Supporting">
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
<div class="JTM-C-Card" spec="clear">
  <div class="JTM-C-Card-Impression">
    <img src="{{ site.impression }}" alt="image" />
  </div>
  <div class="JTM-C-Card-Supporting">
    <h3>Lorem ipsum dolor sit amet</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
  </div>
</div>
```

变种：<code>focus</code>

```html
<div class="JTM-C-Card" spec="focus">
  <img src="{{ site.impression }}" alt="image" />
  <div class="JTM-C-Card-Supporting">
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
      <td><code>JTM-C-Chip</code></td>
      <td><code>assist</code></td>
      <td>-</td>
      <td>
        <button class="JTM-C-Chip" spec="assist">Enabled</button>
      </td>
      <td>
        <button class="JTM-C-Chip" spec="assist" icon>
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
        <button class="JTM-C-Chip" spec="assist" container="elevated">Enabled</button>
      </td>
      <td>
        <button class="JTM-C-Chip" spec="assist" container="elevated" icon>
          <span>add_shopping_cart</span>
          Enabled
        </button>
      </td>
    </tr>
  </tbody>
</table>

#### 代码示例

```html
<button class="JTM-C-Chip" spec="assist">Enabled</button>
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
      <td><code>JTM-C-FAB</code></td>
      <td><code>small</code></td>
      <td>
        <button class="JTM-C-FAB" spec="surface" size="small">edit</button>
      </td>
      <td>
        <button class="JTM-C-FAB" spec="primary" size="small">edit</button>
      </td>
      <td>
        <button class="JTM-C-FAB" spec="secondary" size="small">edit</button>
      </td>
      <td>
        <button class="JTM-C-FAB" spec="tertiary" size="small">edit</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>normal</code>（默认）</td>
      <td>
        <button class="JTM-C-FAB" spec="surface" size="normal">edit</button>
      </td>
      <td>
        <button class="JTM-C-FAB" spec="primary" size="normal">edit</button>
      </td>
      <td>
        <button class="JTM-C-FAB" spec="secondary" size="normal">edit</button>
      </td>
      <td>
        <button class="JTM-C-FAB" spec="tertiary" size="normal">edit</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>large</code></td>
      <td>
        <button class="JTM-C-FAB" spec="surface" size="large">edit</button>
      </td>
      <td>
        <button class="JTM-C-FAB" spec="primary" size="large">edit</button>
      </td>
      <td>
        <button class="JTM-C-FAB" spec="secondary" size="large">edit</button>
      </td>
      <td>
        <button class="JTM-C-FAB" spec="tertiary" size="large">edit</button>
      </td>
    </tr>
  </tbody>
</table>

#### 代码示例

```html
<button class="JTM-C-FAB" spec="primary" size="normal">edit</button>
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
      <td><code>JTM-C-ProgressIndicator</code></td>
      <td>
        <span class="JTM-C-ProgressIndicator"></span>
      </td>
    </tr>
  </tbody>
</table>

#### 代码示例

```html
<span class="JTM-C-ProgressIndicator"></span>
```
