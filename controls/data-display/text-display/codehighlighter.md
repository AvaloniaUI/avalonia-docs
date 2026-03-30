---
id: codehighlighter
title: CodeHighlighter
description: Adds syntax highlighting to code blocks rendered by the Markdown control, with ColorCode and TextMate implementations available as separate packages.
doc-type: reference
tags:
  - accelerate
---

The `Markdown` control supports syntax highlighting for fenced code blocks via the `Highlighter` property on `MarkdownCodeBlock`. Because the Markdown control is built on the shared document model, each code block is a full `StyledElement` — you assign a highlighter using a standard Avalonia style selector. Two implementations ship as separate NuGet packages: `ColorCodeHighlighter` (lightweight, limited language support) and `TextMateHighlighter` (full TextMate grammar support with themes).

:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Business or higher.
:::

## Installation

Highlighters are distributed as separate NuGet packages. Install the one that suits your needs:

**ColorCode** provides a lightweight highlighter that covers common languages such as C#, XML, JSON, and JavaScript:

```bash
dotnet add package Avalonia.Controls.Markdown.ColorCode
```

**TextMate** provides full TextMate grammar support with built-in themes, covering a wide range of languages:

```bash
dotnet add package Avalonia.Controls.Markdown.TextMate
```

## Choosing a highlighter

| Feature | `ColorCodeHighlighter` | `TextMateHighlighter` |
|---|---|---|
| Language coverage | Common languages (C#, XML, JSON, JS, and others) | Broad coverage via TextMate grammars |
| Theming | Inherits your application theme colors | Built-in themes such as `LightPlus`, `DarkPlus`, and others |
| Package size | Smaller | Larger (bundles grammar files) |
| Setup | Minimal | Requires a `Theme` property value |

If you only need to highlight a handful of popular languages and want to keep dependencies small, use `ColorCodeHighlighter`. If you need extensive language support or want to control the color theme independently of your application theme, use `TextMateHighlighter`.

## Using `TextMateHighlighter` in XAML

Define the highlighter as a resource and assign it to `MarkdownCodeBlock` elements via a style:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:textMate="clr-namespace:Avalonia.Controls;assembly=Avalonia.Controls.Markdown.TextMate">
  <Window.Resources>
    <textMate:TextMateHighlighter x:Key="TextMateHighlighter" Theme="LightPlus"/>
  </Window.Resources>

  <Window.Styles>
    <Style Selector="MarkdownCodeBlock">
      <Setter Property="Highlighter" Value="{StaticResource TextMateHighlighter}" />
    </Style>
  </Window.Styles>

  <Markdown Text="# Example&#10;&#10;```csharp&#10;var x = 1;&#10;```" />
</Window>
```

You can switch the theme at runtime by changing the `Theme` property on the `TextMateHighlighter` resource. Code blocks automatically re-highlight when the highlighter raises its `Invalidated` event.

## Using `ColorCodeHighlighter` in XAML

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:cc="clr-namespace:Avalonia.Controls;assembly=Avalonia.Controls.Markdown.ColorCode">
  <Window.Resources>
    <cc:ColorCodeHighlighter x:Key="ColorCodeHighlighter" />
  </Window.Resources>

  <Window.Styles>
    <Style Selector="MarkdownCodeBlock">
      <Setter Property="Highlighter" Value="{StaticResource ColorCodeHighlighter}" />
    </Style>
  </Window.Styles>

  <Markdown Text="# Example&#10;&#10;```csharp&#10;var x = 1;&#10;```" />
</Window>
```

## Setting the highlighter in code-behind

You can also create a style programmatically or assign the highlighter to a specific `MarkdownCodeBlock` instance:

```csharp
// Create the highlighter
var textMateHighlighter = new TextMateHighlighter { Theme = "DarkPlus" };

// Option 1: Apply via a style (preferred — affects all code blocks)
var style = new Style(x => x.OfType<MarkdownCodeBlock>());
style.Setters.Add(new Setter(MarkdownCodeBlock.HighlighterProperty, textMateHighlighter));
myMarkdownControl.Styles.Add(style);
```

## Specifying languages in code blocks

To get correct highlighting, specify the language identifier after the opening triple backticks in your Markdown source. For example:

````markdown
```csharp
Console.WriteLine("Hello, world!");
```
````

If you omit the language identifier, the highlighter will render the block as plain text without coloring. The language identifier is stored on the `MarkdownCodeBlock.LanguageId` property.

## Notes

- The `Markdown` control listens for property changes on the highlighter and re-renders code blocks automatically when you update properties such as `Theme`.
- Each `Markdown` control accepts a single `CodeHighlighter` instance shared across all its code blocks via the style. If you have multiple `Markdown` controls, you can share the same highlighter resource.
- `MarkdownCodeBlock` extends `Paragraph` and is a full `StyledElement`, so you can combine the highlighter style with other visual customizations (background, padding, font family) in a single selector.

## See also

- [Markdown control](/controls/data-display/text-display/markdown)
- [Markdown styling](/controls/data-display/text-display/markdown-styling)
- [Rendering markdown](/docs/app-development/rendering-markdown)
