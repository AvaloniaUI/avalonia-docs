---
id: selectors
title: Style Selectors
---

# Style Selectors

_Avalonia UI_ uses style selectors to match controls using a custom XAML syntax.

:::info
If you are familiar with the CSS (Cascading Style Sheets) technology, then you will recognise this syntax as being very similar.
:::

Here is a list of some example style selectors:

<table><thead><tr><th width="310">Style Selector</th><th>Description</th></tr></thead><tbody><tr><td><code>Button</code></td><td>Selects all <code>Button</code> (class) controls.</td></tr><tr><td><code>Button.red</code></td><td>Selects all <code>Button</code> controls with the <code>red</code> style class defined.</td></tr><tr><td><code>Button.red.large</code></td><td>Selects all <code>Button</code> controls with the <code>red</code> and <code>large</code> style classes defined.</td></tr><tr><td><code>Button:focus</code></td><td>Selects all <code>Button</code> controls with the <code>:focus</code> pseudo class active.</td></tr><tr><td><code>Button.red:focus</code></td><td>Selects all <code>Button</code> controls with the <code>red</code> style class and the <code>:focus</code> pseudo class active.</td></tr><tr><td><code>Button#myButton</code></td><td>Selects a <code>Button</code> control with the <code>Name</code> (attribute) defined as <code>"myButton"</code>.</td></tr><tr><td><code>StackPanel Button.xl</code></td><td>Selects all  <code>Button</code> (class) controls with the <code>xl</code>class defined; that are also descendants at any level of a <code>StackPanel</code> (class) control.</td></tr><tr><td><code>StackPanel > Button.xl</code></td><td>Selects all  <code>Button</code> (class) controls with the <code>xl</code>class defined; that are also a direct descendant of a <code>StackPanel</code> (class) control.</td></tr><tr><td><code>Button /template/ ContentPresenter</code></td><td>Selects all <code>ContentPresenter</code> (class) controls inside a template of a <code>Button</code> (class) control.</td></tr></tbody></table>

For a full description of these style selector formats, and more, see the reference [here](../../reference/styles/style-selector-syntax).
