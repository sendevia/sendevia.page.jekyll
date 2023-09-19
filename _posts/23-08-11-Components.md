---
title: "Material3 Components"
description: "Material3 组件示例"
author: "sendevia"
color: "#00eda2"
impression: "/assets/images/110468331_p0.webp"
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
      <td><code>mbt</code></td>
      <td><code>elevated</code></td>
      <td>
        <button class="mbt" spec="elevated">Enabled</button>
      </td>
      <td>
        <button class="mbt" spec="elevated" icon>
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
        <button class="mbt" spec="filled">Enabled</button>
      </td>
      <td>
        <button class="mbt" spec="filled" icon>
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
        <button class="mbt" spec="tonal">Enabled</button>
      </td>
      <td>
        <button class="mbt" spec="tonal" icon>
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
        <button class="mbt" spec="outlined">Enabled</button>
      </td>
      <td>
        <button class="mbt" spec="outlined" icon>
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
        <button class="mbt" spec="text">Enabled</button>
      </td>
      <td>
        <button class="mbt" spec="text" icon>
          <span>add</span>
          Enabled
        </button>
      </td>
    </tr>
  </tbody>
</table>

> **代码示例**
>
> ```html
> <button class="mbt" spec="elevated">Enabled</button>
> <button class="mbt" spec="elevated" icon>
>   <span>add</span>
>   Enabled
> </button>
> ```

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
      <td><code>mib</code></td>
      <td><code>standard</code></td>
      <td>
        <button class="mib" spec="standard">settings</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>filled</code></td>
      <td>
        <button class="mib" spec="filled">settings</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>tonal</code></td>
      <td>
        <button class="mib" spec="tonal">settings</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>outlined</code></td>
      <td>
        <button class="mib" spec="outlined">settings</button>
      </td>
    </tr>
  </tbody>
</table>

> **代码示例**
>
> ```html
> <button class="mib" spec="standard">settings</button>
> ```

# Checkbox

用户交互控件 - 多选框

<table>
  <thead>
    <tr>
      <th>element</th>
      <th>type</th>
      <th>class</th>
      <th>预览</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>input</code></td>
      <td><code>checkbox</code></td>
      <td><code>mip</code></td>
      <td>
        <input type="checkbox" class="mip" />
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td>
        <input type="checkbox" class="mip" checked />
      </td>
    </tr>
  </tbody>
</table>

> **代码示例**
>
> ```html
> <input type="checkbox" class="mip" />
> <input type="checkbox" class="mip" checked />
> ```

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
      <td><code>mcd</code></td>
      <td><code>normal</code></td>
      <td><code>outlined</code></td>
      <td>
        <div class="mcd" spec="normal" outlined>
          <div class="mcd-header">
            <div id="mcd-header-content">
              <div id="mcd--monogram">
                <span id="mcd--monogram-initial">A</span>
                <span id="mcd--monogram-background" />
              </div>
              <div id="mcd--text">
                <span id="mcd--text-header">Header</span>
                <span id="mcd--text-subhead">Subhead</span>
              </div>
            </div>
            <button class="mib">more_vert</button>
          </div>
          <div class="mcd-headline">
            <span id="mcd-headline-title">Title</span>
            <span id="mcd-headline-subhead">Subhead</span>
          </div>
          <div class="mcd-supporting">
            <span id="mcd-supporting-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</span>
          </div>
          <div class="mcd-actions">
            <a>action 1</a>
            <a>action 2</a>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>elevated</code></td>
      <td>
        <div class="mcd" spec="normal" elevated>
          <div class="mcd-header">
            <div id="mcd-header-content">
              <div id="mcd--monogram">
                <span id="mcd--monogram-initial">A</span>
                <span id="mcd--monogram-background" />
              </div>
              <div id="mcd--text">
                <span id="mcd--text-header">Header</span>
                <span id="mcd--text-subhead">Subhead</span>
              </div>
            </div>
            <button class="mib">more_vert</button>
          </div>
          <div class="mcd-headline">
            <span id="mcd-headline-title">Title</span>
            <span id="mcd-headline-subhead">Subhead</span>
          </div>
          <div class="mcd-supporting">
            <span id="mcd-supporting-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</span>
          </div>
          <div class="mcd-actions">
            <a>action 1</a>
            <a>action 2</a>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>filled</code></td>
      <td>
        <div class="mcd" spec="normal" filled>
          <div class="mcd-header">
            <div id="mcd-header-content">
              <div id="mcd--monogram">
                <span id="mcd--monogram-initial">A</span>
                <span id="mcd--monogram-background" />
              </div>
              <div id="mcd--text">
                <span id="mcd--text-header">Header</span>
                <span id="mcd--text-subhead">Subhead</span>
              </div>
            </div>
            <button class="mib">more_vert</button>
          </div>
          <div class="mcd-headline">
            <span id="mcd-headline-title">Title</span>
            <span id="mcd-headline-subhead">Subhead</span>
          </div>
          <div class="mcd-supporting">
            <span id="mcd-supporting-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</span>
          </div>
          <div class="mcd-actions">
            <a>action 1</a>
            <a>action 2</a>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td></td>
      <td><code>clear</code></td>
      <td>-</td>
      <td>
        <div class="mcd" spec="clear">
          <img src="{{ site.impression }}" alt="image" />
          <div class="mcd-supporting">
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
        <div class="mcd" spec="focus">
          <img src="{{ site.impression }}" alt="image" />
          <div class="mcd-supporting">
            <h3>Lorem ipsum dolor sit amet</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</table>

> **代码示例**
>
> ```html
> <div class="mcd" spec="normal" outlined>
>   <div class="mcd-header">
>     <div id="mcd-header-content">
>       <div id="mcd--monogram">
>         <span id="mcd--monogram-initial">A</span>
>         <span id="mcd--monogram-background" />
>       </div>
>       <div id="mcd--text">
>         <span id="mcd--text-header">Header</span>
>         <span id="mcd--text-subhead">Subhead</span>
>       </div>
>     </div>
>     <button class="mib">more_vert</button>
>   </div>
>   <div class="mcd-headline">
>     <span id="mcd-headline-title">Title</span>
>     <span id="mcd-headline-subhead">Subhead</span>
>   </div>
>   <div class="mcd-supporting">
>     <span id="mcd-supporting-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</span>
>   </div>
>   <div class="mcd-actions">
>     <a>action 1</a>
>     <a>action 2</a>
>   </div>
> </div>
> ```
>
> ```html
> <div class="mcd" spec="clear">
>   <img src="{{ site.impression }}" alt="image" />
>   <div class="mcd-supporting">
>     <h3>Lorem ipsum dolor sit amet</h3>
>     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
>   </div>
> </div>
> ```
>
> ```html
> <div class="mcd" spec="focus">
>   <img src="{{ site.impression }}" alt="image" />
>   <div class="mcd-supporting">
>     <h3>Lorem ipsum dolor sit amet</h3>
>     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
>   </div>
> </div>
> ```

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
      <td><code>mcp</code></td>
      <td><code>assist</code></td>
      <td>-</td>
      <td>
        <button class="mcp" spec="assist">Enabled</button>
      </td>
      <td>
        <button class="mcp" spec="assist" icon>
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
        <button class="mcp" spec="assist" container="elevated">Enabled</button>
      </td>
      <td>
        <button class="mcp" spec="assist" container="elevated" icon>
          <span>add_shopping_cart</span>
          Enabled
        </button>
      </td>
    </tr>
  </tbody>
</table>

> **代码示例**
>
> ```html
> <button class="mcp" spec="assist">Enabled</button>
> ```

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
      <td><code>mfb</code></td>
      <td><code>small</code></td>
      <td>
        <button class="mfb" spec="surface" size="small">edit</button>
      </td>
      <td>
        <button class="mfb" spec="primary" size="small">edit</button>
      </td>
      <td>
        <button class="mfb" spec="secondary" size="small">edit</button>
      </td>
      <td>
        <button class="mfb" spec="tertiary" size="small">edit</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>normal</code>（默认）</td>
      <td>
        <button class="mfb" spec="surface" size="normal">edit</button>
      </td>
      <td>
        <button class="mfb" spec="primary" size="normal">edit</button>
      </td>
      <td>
        <button class="mfb" spec="secondary" size="normal">edit</button>
      </td>
      <td>
        <button class="mfb" spec="tertiary" size="normal">edit</button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><code>large</code></td>
      <td>
        <button class="mfb" spec="surface" size="large">edit</button>
      </td>
      <td>
        <button class="mfb" spec="primary" size="large">edit</button>
      </td>
      <td>
        <button class="mfb" spec="secondary" size="large">edit</button>
      </td>
      <td>
        <button class="mfb" spec="tertiary" size="large">edit</button>
      </td>
    </tr>
  </tbody>
</table>

> **代码示例**
>
> ```html
> <button class="mfb" spec="primary" size="normal">edit</button>
> ```

# Progress Indicators

进度条

<table>
  <thead>
    <tr>
      <th>element</th>
      <th>class</th>
      <th>spec</th>
      <th>示例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>span</code></td>
      <td><code>mpi</code></td>
      <td><code>circular</code></td>
      <td>
        <span class="mpi" spec="circular"></span>
      </td>
    </tr>
  </tbody>
</table>

> **代码示例**
>
> ```html
> <span class="mpi" spec="circular"></span>
> ```
