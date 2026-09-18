---
id: codehighlighter
title: CodeHighlighter
description: Adds syntax highlighting to code blocks rendered by the Markdown control, with ColorCode and TextMate implementations available as separate packages.
doc-type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

The `Markdown` control supports syntax highlighting for fenced code blocks. Set `Markdown.CodeHighlighter` on the control and every code block in its document uses it. Two implementations ship as separate NuGet packages: `ColorCodeHighlighter` (lightweight, limited language support) and `TextMateHighlighter` (full TextMate grammar support with themes).

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
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
| Theming | Inherits your application theme colors | Built-in `ThemeName` values such as `LightPlus` and `DarkPlus` |
| Package size | Smaller | Larger (bundles grammar files) |
| Setup | Minimal | Requires a `Theme` property value |

If you only need to highlight a handful of popular languages and want to keep dependencies small, use `ColorCodeHighlighter`. If you need extensive language support or want to control the color theme independently of your application theme, use `TextMateHighlighter`.

## Using `TextMateHighlighter` in XAML

`Markdown.CodeHighlighter` is an attached property. Set it on the control itself:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:textMate="clr-namespace:Avalonia.Controls;assembly=Avalonia.Controls.Markdown.TextMate">
  <Markdown Text="# Example&#10;&#10;```csharp&#10;var x = 1;&#10;```">
    <Markdown.CodeHighlighter>
      <textMate:TextMateHighlighter Theme="LightPlus" />
    </Markdown.CodeHighlighter>
  </Markdown>
</Window>
```

You can switch the theme at runtime by changing the `Theme` property on the highlighter. Every code block that uses it re-highlights.

## Using `ColorCodeHighlighter` in XAML

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:cc="clr-namespace:Avalonia.Controls;assembly=Avalonia.Controls.Markdown.ColorCode">
  <Markdown Text="# Example&#10;&#10;```csharp&#10;var x = 1;&#10;```">
    <Markdown.CodeHighlighter>
      <cc:ColorCodeHighlighter />
    </Markdown.CodeHighlighter>
  </Markdown>
</Window>
```

## Sharing one highlighter across several controls

Declare the highlighter as a resource and point each control at it. One instance can serve any number of `Markdown` controls:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:textMate="clr-namespace:Avalonia.Controls;assembly=Avalonia.Controls.Markdown.TextMate">
  <Window.Resources>
    <textMate:TextMateHighlighter x:Key="Highlighter" Theme="DarkPlus" />
  </Window.Resources>

  <StackPanel>
    <Markdown Markdown.CodeHighlighter="{StaticResource Highlighter}" Text="{Binding First}" />
    <Markdown Markdown.CodeHighlighter="{StaticResource Highlighter}" Text="{Binding Second}" />
  </StackPanel>
</Window>
```

## Setting the highlighter in code

```csharp
using TextMateSharp.Grammars; // ThemeName

var highlighter = new TextMateHighlighter { Theme = ThemeName.DarkPlus };

// Every code block in this control's document uses it
markdown.CodeHighlighter = highlighter;

// Or through the static accessor, which takes any StyledElement
Markdown.SetCodeHighlighter(markdown, highlighter);
```

To highlight one block differently from the rest, set `MarkdownCodeBlock.Highlighter` on that element. A value set on one block wins over the value supplied by the control.

## Specifying languages in code blocks

To get correct highlighting, specify the language identifier after the opening triple backticks in your Markdown source. For example:

````markdown
```csharp
Console.WriteLine("Hello, world!");
```
````

If you omit the language identifier, the highlighter will render the block as plain text without coloring. The language identifier is stored on the `MarkdownCodeBlock.LanguageId` property.

## Notes

- Code blocks re-render on their own when you change a property of the highlighter they are using, such as `Theme`. A custom highlighter signals this by calling `OnInvalidated`.
- `Markdown.CodeHighlighter` is an inheriting attached property, so a single instance covers every code block in the control's document without a style. `MarkdownCodeBlock.Highlighter` set on one block overrides it.
- `MarkdownCodeBlock` extends `Paragraph` and is a full `StyledElement`, so a style selector still reaches it for visual customization, such as background, padding and font family.

## See also

- [Markdown control](/controls/data-display/text-display/markdown)
- [Markdown styling](/controls/data-display/text-display/markdown/markdown-styling)
