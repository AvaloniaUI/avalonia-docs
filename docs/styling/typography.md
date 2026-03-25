---
id: typography
title: Typography
description: Font size, weight, style, stretch, letter spacing, line height, text decorations, and alignment properties for text.
doc-type: reference
---

Avalonia provides a set of properties for controlling how text appears in your application. These properties are defined on [`TextElement`](/api/avalonia/controls/documents/textelement) as inherited attached properties, so you can set them on any control to affect all text within its visual tree through [property value inheritance](../properties/property-value-inheritance).

## TextElement attached properties

The following properties are defined on `TextElement` and inherited by descendant controls. Set them directly on text controls like `TextBlock`, or on container controls to apply to all text within.

| Attached property | Type | Default | Description |
|---|---|---|---|
| `TextElement.FontFamily` | [`FontFamily`](/api/avalonia/media/fontfamily) | Platform default | The typeface used to render text. |
| `TextElement.FontSize` | `double` | `12` | The size of text in device-independent pixels. |
| `TextElement.FontWeight` | [`FontWeight`](/api/avalonia/media/fontweight) | `Normal` | The thickness of character strokes. |
| `TextElement.FontStyle` | [`FontStyle`](/api/avalonia/media/fontstyle) | `Normal` | Whether text is upright, italic, or oblique. |
| `TextElement.FontStretch` | [`FontStretch`](/api/avalonia/media/fontstretch) | `Normal` | The width of characters relative to their normal aspect ratio. |
| `TextElement.FontFeatures` | `FontFeatureCollection` | `null` | OpenType font features to enable or disable. |
| `TextElement.Foreground` | `IBrush` | Inherited | The brush used to paint text. |
| `TextElement.LetterSpacing` | `double` | `0` | Extra spacing between characters in device-independent pixels. |

When you set a property like `FontSize` directly on a `TextBlock`, it is equivalent to setting `TextElement.FontSize` on that control.

```xml
<!-- Set font properties on a container to apply to all child text -->
<StackPanel TextElement.FontSize="16"
            TextElement.FontWeight="SemiBold"
            TextElement.LetterSpacing="0.5">
    <TextBlock Text="This inherits all three properties." />
    <TextBlock Text="So does this." />
    <TextBlock FontSize="24" Text="This overrides FontSize but inherits the rest." />
</StackPanel>
```

## Font size

`FontSize` specifies the height of text in device-independent pixels. Set it on individual controls or on a container to affect all descendant text.

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui" Margin="20" Spacing="4">
    <TextBlock FontSize="12" Text="12px (default size)" />
    <TextBlock FontSize="16" Text="16px" />
    <TextBlock FontSize="24" Text="24px" />
    <TextBlock FontSize="36" Text="36px" />
</StackPanel>
```

</XamlPreview>

## Font weight

`FontWeight` controls the thickness of character strokes. You can use named values or numeric values from 1 to 999.

| Named value | Numeric value | Aliases |
|---|---|---|
| `Thin` | 100 | |
| `ExtraLight` | 200 | `UltraLight` |
| `Light` | 300 | |
| `SemiLight` | 350 | |
| `Normal` | 400 | `Regular` |
| `Medium` | 500 | |
| `SemiBold` | 600 | `DemiBold` |
| `Bold` | 700 | |
| `ExtraBold` | 800 | `UltraBold` |
| `Black` | 900 | `Heavy` |
| `ExtraBlack` | 950 | `UltraBlack` |

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui" Margin="20" Spacing="4">
    <TextBlock FontWeight="Light" Text="Light (300)" />
    <TextBlock FontWeight="Normal" Text="Normal (400)" />
    <TextBlock FontWeight="Medium" Text="Medium (500)" />
    <TextBlock FontWeight="SemiBold" Text="SemiBold (600)" />
    <TextBlock FontWeight="Bold" Text="Bold (700)" />
    <TextBlock FontWeight="ExtraBold" Text="ExtraBold (800)" />
    <TextBlock FontWeight="Black" Text="Black (900)" />
</StackPanel>
```

</XamlPreview>

You can also use numeric values directly in XAML or cast an integer in code:

```xml
<TextBlock FontWeight="550" Text="Custom weight 550" />
```

```csharp
myTextBlock.FontWeight = (FontWeight)550;
```

:::note
The available weights depend on the font. If a requested weight is not available, Avalonia selects the closest match. Some fonts include only a few weights (such as Normal and Bold), while others provide the full range.
:::

## Font style

`FontStyle` controls whether text is rendered upright, italic, or oblique.

| Value | Description |
|---|---|
| `Normal` | Upright text (default). |
| `Italic` | Uses the italic variant of the font, designed with modified letterforms. |
| `Oblique` | Slants the text algorithmically. Used when the font does not include a true italic variant. |

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui" Margin="20" Spacing="4">
    <TextBlock FontStyle="Normal" Text="Normal style" />
    <TextBlock FontStyle="Italic" Text="Italic style" />
    <TextBlock FontStyle="Oblique" Text="Oblique style" />
</StackPanel>
```

</XamlPreview>

## Font stretch

`FontStretch` controls the width of characters relative to their normal aspect ratio. This property requires a font that includes condensed or expanded variants.

| Value | Description |
|---|---|
| `UltraCondensed` | Narrowest character width. |
| `ExtraCondensed` | Narrower than `Condensed`. |
| `Condensed` | Narrower than `SemiCondensed`. |
| `SemiCondensed` | Slightly narrower than `Normal`. |
| `Normal` | Default character width. |
| `SemiExpanded` | Slightly wider than `Normal`. |
| `Expanded` | Wider than `SemiExpanded`. |
| `ExtraExpanded` | Wider than `Expanded`. |
| `UltraExpanded` | Widest character width. |

```xml
<TextBlock FontStretch="Condensed" Text="Condensed text" />
<TextBlock FontStretch="Normal" Text="Normal text" />
<TextBlock FontStretch="Expanded" Text="Expanded text" />
```

:::note
Most fonts only include `Normal` width glyphs. `FontStretch` has no visible effect unless the font includes glyphs designed for the requested stretch value.
:::

## Letter spacing

`LetterSpacing` adds extra space between characters, specified in device-independent pixels. Positive values increase spacing. Negative values decrease spacing.

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui" Margin="20" Spacing="4">
    <TextBlock LetterSpacing="-1" Text="Tighter spacing (-1px)" />
    <TextBlock LetterSpacing="0" Text="Default spacing (0px)" />
    <TextBlock LetterSpacing="2" Text="Wider spacing (2px)" />
    <TextBlock LetterSpacing="5" Text="Wide spacing (5px)" />
</StackPanel>
```

</XamlPreview>

Because `LetterSpacing` is an inherited attached property defined on `TextElement`, you can set it on a container to affect all text within:

```xml
<StackPanel TextElement.LetterSpacing="1.5">
    <TextBlock Text="All text in this panel" />
    <TextBlock Text="has 1.5px extra letter spacing." />
</StackPanel>
```

## Line height and line spacing

`LineHeight` and `LineSpacing` control the vertical distance between lines of text in a `TextBlock`.

| Property | Type | Default | Description |
|---|---|---|---|
| `LineHeight` | `double` | `NaN` | The total height of each line. When set to `NaN`, the font metrics determine line height automatically. |
| `LineSpacing` | `double` | `0` | Extra distance added between lines, in device-independent pixels. Added on top of the font's natural line height. |

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui" Margin="20" Spacing="16" Width="300">
    <TextBlock TextWrapping="Wrap"
               Text="Default line height: this text uses the line height determined by the font metrics. No manual adjustment." />

    <TextBlock TextWrapping="Wrap"
               LineHeight="32"
               Text="LineHeight=32: this text has a fixed line height of 32 pixels, creating consistent vertical spacing." />

    <TextBlock TextWrapping="Wrap"
               LineSpacing="8"
               Text="LineSpacing=8: this text adds 8 extra pixels between each line, on top of the font's natural height." />
</StackPanel>
```

</XamlPreview>

Use `LineHeight` when you need precise control over line dimensions. Use `LineSpacing` when you want to add breathing room between lines without overriding the font's natural metrics.

## Text alignment

`TextAlignment` controls the horizontal positioning of text within its container.

| Value | Description |
|---|---|
| `Left` | Text aligns to the left edge. |
| `Center` | Text is centered horizontally. |
| `Right` | Text aligns to the right edge. |
| `Start` | Text aligns to the start edge, respecting `FlowDirection`. Equivalent to `Left` in left-to-right layouts. |
| `End` | Text aligns to the end edge, respecting `FlowDirection`. Equivalent to `Right` in left-to-right layouts. |
| `Justify` | Text is stretched so that each line (except the last) fills the full width. Requires `TextWrapping` to be enabled. |
| `DetectFromContent` | Alignment is inferred from the text content's Unicode directionality. |

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui" Margin="20" Width="300" Spacing="8">
    <TextBlock TextAlignment="Left" Text="Left-aligned text" />
    <TextBlock TextAlignment="Center" Text="Center-aligned text" />
    <TextBlock TextAlignment="Right" Text="Right-aligned text" />
    <TextBlock TextAlignment="Justify" TextWrapping="Wrap"
               Text="Justified text stretches words evenly across the full width when wrapping is enabled." />
</StackPanel>
```

</XamlPreview>

:::info
Use `Start` and `End` instead of `Left` and `Right` when your application supports both left-to-right and right-to-left layouts. These values automatically adapt to the current `FlowDirection`.
:::

## Text decorations

Text decorations draw lines on or around text. Avalonia provides four presets through the [`TextDecorations`](/api/avalonia/media/textdecorations) class, and supports fully customized decorations through the [`TextDecoration`](/api/avalonia/media/textdecoration) class.

### Preset decorations

| Value | Description |
|---|---|
| `Underline` | A line below the text baseline. |
| `Strikethrough` | A line through the middle of the text. |
| `Overline` | A line above the text. |
| `Baseline` | A line at the text baseline. |

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui" Margin="20" Spacing="4">
    <TextBlock TextDecorations="Underline" Text="Underlined text" />
    <TextBlock TextDecorations="Strikethrough" Text="Struck-through text" />
    <TextBlock TextDecorations="Overline" Text="Overlined text" />
    <TextBlock TextDecorations="Baseline" Text="Baseline decoration" />
    <TextBlock TextDecorations="Underline Strikethrough" Text="Multiple decorations" />
</StackPanel>
```

</XamlPreview>

You can apply decorations to individual `Run` elements within a `TextBlock`:

```xml
<TextBlock>
    <Run Text="Normal text, " />
    <Run TextDecorations="Underline" Text="underlined text, " />
    <Run TextDecorations="Strikethrough" Text="and struck-through text." />
</TextBlock>
```

### Custom decorations

For control over color, thickness, offset, and dash pattern, define a `TextDecoration` directly.

| Property | Type | Description |
|---|---|---|
| `Location` | [`TextDecorationLocation`](/api/avalonia/media/textdecorationlocation) | Where the line is drawn: `Underline`, `Strikethrough`, `Overline`, or `Baseline`. |
| `Stroke` | `IBrush` | The brush used to paint the decoration line. |
| `StrokeThickness` | `double` | The thickness of the decoration line. |
| `StrokeThicknessUnit` | [`TextDecorationUnit`](/api/avalonia/media/textdecorationunit) | The unit for thickness: `FontRecommended` (default), `FontRenderingEmSize`, or `Pixel`. |
| `StrokeOffset` | `double` | Vertical offset of the line from its default position. |
| `StrokeOffsetUnit` | `TextDecorationUnit` | The unit for offset. |
| `StrokeDashArray` | `AvaloniaList<double>` | A dash pattern for the decoration line. |
| `StrokeLineCap` | `PenLineCap` | The shape at the ends of dashes: `Flat`, `Round`, or `Square`. |

```xml
<TextBlock Text="Custom red dashed underline">
    <TextBlock.TextDecorations>
        <TextDecorationCollection>
            <TextDecoration Location="Underline"
                           Stroke="Red"
                           StrokeThickness="2"
                           StrokeDashArray="2,2" />
        </TextDecorationCollection>
    </TextBlock.TextDecorations>
</TextBlock>
```

## OpenType font features

The `FontFeatures` property enables or disables OpenType features such as ligatures, tabular numbers, and small capitals. Features are specified as comma-separated tags using HarfBuzz syntax.

```xml
<TextBlock Text="0123456789" FontFeatures="+tnum" />
<TextBlock Text="fi fl ffi" FontFeatures="-liga" />
<TextBlock Text="Small Caps" FontFeatures="+smcp" />
```

For a full list of common tags and usage examples, see [Custom fonts: OpenType font features](custom-fonts#opentype-font-features).

## Creating a type scale with style classes

Avalonia does not include built-in heading styles like HTML's `<h1>` through `<h6>`. You can create your own type scale using [style classes](style-classes), giving you full control over the sizes, weights, and spacing that match your application's design.

Define the styles in your `App.axaml` (or any shared resource file) so they are available throughout your application:

```xml title="App.axaml"
<Application.Styles>
    <FluentTheme />

    <Style Selector="TextBlock.h1">
        <Setter Property="FontSize" Value="32" />
        <Setter Property="FontWeight" Value="Bold" />
        <Setter Property="LineHeight" Value="40" />
    </Style>
    <Style Selector="TextBlock.h2">
        <Setter Property="FontSize" Value="24" />
        <Setter Property="FontWeight" Value="SemiBold" />
        <Setter Property="LineHeight" Value="32" />
    </Style>
    <Style Selector="TextBlock.h3">
        <Setter Property="FontSize" Value="20" />
        <Setter Property="FontWeight" Value="SemiBold" />
        <Setter Property="LineHeight" Value="28" />
    </Style>
    <Style Selector="TextBlock.subtitle">
        <Setter Property="FontSize" Value="16" />
        <Setter Property="FontWeight" Value="Medium" />
        <Setter Property="Foreground" Value="{DynamicResource TextFillColorSecondaryBrush}" />
    </Style>
    <Style Selector="TextBlock.body">
        <Setter Property="FontSize" Value="14" />
        <Setter Property="LineHeight" Value="20" />
    </Style>
    <Style Selector="TextBlock.caption">
        <Setter Property="FontSize" Value="12" />
        <Setter Property="Foreground" Value="{DynamicResource TextFillColorTertiaryBrush}" />
    </Style>
</Application.Styles>
```

Then apply them with the `Classes` property:

```xml
<StackPanel Spacing="8">
    <TextBlock Classes="h1" Text="Page title" />
    <TextBlock Classes="subtitle" Text="A short description of the page" />
    <TextBlock Classes="h2" Text="Section heading" />
    <TextBlock Classes="body" TextWrapping="Wrap"
               Text="Body text for the main content of the section." />
    <TextBlock Classes="caption" Text="Last updated March 2026" />
</StackPanel>
```

You can combine style classes with inline overrides when a specific instance needs to differ:

```xml
<TextBlock Classes="h1" Foreground="DodgerBlue" Text="Colored heading" />
```

This approach works well with [sharing styles](sharing-styles) across your application. Define the type scale once, then use it consistently everywhere.

## Setting typography from code

All `TextElement` attached properties have static `Get` and `Set` methods for use in code-behind:

```csharp
TextElement.SetFontSize(myPanel, 18);
TextElement.SetFontWeight(myPanel, FontWeight.Bold);
TextElement.SetLetterSpacing(myPanel, 1.5);
TextElement.SetFontStyle(myPanel, FontStyle.Italic);
```

You can also set properties directly on text controls:

```csharp
myTextBlock.FontSize = 24;
myTextBlock.FontWeight = FontWeight.SemiBold;
myTextBlock.LineHeight = 32;
myTextBlock.TextDecorations = TextDecorations.Underline;
```

## See also

- [Custom fonts](custom-fonts): Embedding and loading custom font files.
- [Text options](../graphics-animation/text-options): Controlling text rendering, hinting, and baseline alignment.
- [TextBlock](/controls/data-display/text-display/textblock): The primary control for displaying formatted text.
- [TextTrimming](/reference/text/texttrimming): How text is truncated when it overflows.
- [Property value inheritance](../properties/property-value-inheritance): How font properties propagate through the visual tree.
- [`TextElement` API reference](/api/avalonia/controls/documents/textelement)
- [Style classes](style-classes): Applying named style classes to controls.
- [`FontWeight` API reference](/api/avalonia/media/fontweight)
