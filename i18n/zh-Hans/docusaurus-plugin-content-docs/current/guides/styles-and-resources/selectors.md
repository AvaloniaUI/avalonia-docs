---
id: selectors
title: 样式选择器
---

# 样式选择器

_Avalonia UI_ 使用自定义的 XAML 语法来匹配控件，采用样式选择器。

:::info
如果您熟悉 CSS（层叠样式表）技术，您会发现这个语法非常相似。
:::

以下是一些样式选择器的示例列表：

<table><thead><tr><th width="310">样式选择器</th><th>描述</th></tr></thead><tbody><tr><td><code>Button</code></td><td>选择所有 <code>Button</code>（类）控件。</td></tr><tr><td><code>Button.red</code></td><td>选择所有带有 <code>red</code> 样式类的 <code>Button</code> 控件。</td></tr><tr><td><code>Button.red.large</code></td><td>选择所有同时带有 <code>red</code> 和 <code>large</code> 样式类的 <code>Button</code> 控件。</td></tr><tr><td><code>Button:focus</code></td><td>选择所有带有 <code>:focus</code> 伪类激活的 <code>Button</code> 控件。</td></tr><tr><td><code>Button.red:focus</code></td><td>选择所有同时带有 <code>red</code> 样式类和 <code>:focus</code> 伪类激活的 <code>Button</code> 控件。</td></tr><tr><td><code>Button#myButton</code></td><td>选择 <code>Name</code>（属性）为 <code>"myButton"</code> 的 <code>Button</code> 控件。</td></tr><tr><td><code>StackPanel Button.xl</code></td><td>选择所有带有 <code>xl</code> 样式类的 <code>Button</code>（类）控件，同时它们是 <code>StackPanel</code>（类）控件的后代，可以位于任何级别。</td></tr><tr><td><code>StackPanel > Button.xl</code></td><td>选择所有带有 <code>xl</code> 样式类的 <code>Button</code>（类）控件，同时它们是 <code>StackPanel</code>（类）控件的直接后代。</td></tr><tr><td><code>Button /template/ ContentPresenter</code></td><td>选择所有在 <code>Button</code>（类）控件的模板内的 <code>ContentPresenter</code>（类）控件。</td></tr></tbody></table>

有关这些样式选择器格式的完整描述以及更多信息，请参阅[此处的参考文档](../../reference/styles/style-selector-syntax)。
