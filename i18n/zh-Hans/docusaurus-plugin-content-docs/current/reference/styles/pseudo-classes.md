---
description: REFERENCE - Styles
---

# 伪类（Pseudo Classes）

伪类是由控件生成的，通常是作为对某种状态的响应。

例如，`:pointerover` 伪类表示指针输入当前悬停在（控件的边界内部）。

伪类不是在控件的 `Classes` 属性中设置的（不同于样式类）。

常见的伪类包括：

`:focus`、`:disabled`、`:pressed` 用于按钮，以及 `:checked` 用于复选框。

一个控件可以同时有多个伪类处于活动状态。

您可以在样式选择器中指定一个或多个伪类。例如：

```
<Style Selector="Button.red:focus:pointover">
```

此选择器针对具有设置了红色类的按钮控件，且处于 `:focus` 和 `:pointover` 伪类状态的情况。

一些常见的伪类：

<table><thead><tr><th width="187">伪类</th><th>描述</th></tr></thead><tbody><tr><td><code>:pointerover</code></td><td>指针输入当前悬停在（控件的边界内部）</td></tr><tr><td><code>:focus</code></td><td>控件拥有输入焦点</td></tr><tr><td><code>:disabled</code></td><td>控件无法响应用户交互</td></tr><tr><td><code>:pressed</code></td><td>按钮控件处于按下状态</td></tr><tr><td><code>:checked</code></td><td>复选框控件已选中（显示勾选标记）</td></tr></tbody></table>

### 自定义伪类

您可以为基于 `CustomControl` 或 `TemplatedControl` 的自定义控件创建自己的伪类。下面的函数根据 `StyledElement` 上的布尔值添加或移除伪类。

```csharp
PseudoClasses.Set(":className", bool);
```
