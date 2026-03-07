---
id: text-options
title: Text options
description: TextOptions attached properties for controlling text hinting, alignment, and rendering mode.
doc-type: reference
---

Avalonia provides fine-grained control over how text is rendered through the `TextOptions` attached properties. These settings affect hinting, pixel alignment, and rendering mode for text within a control and its descendants.

## Properties

| Attached property | Type | Default | Description |
|---|---|---|---|
| `TextOptions.TextRenderingMode` | `TextRenderingMode` | `Auto` | Controls whether text uses anti-aliasing, ClearType/subpixel rendering, or aliased rendering. |
| `TextOptions.TextHintingMode` | `TextHintingMode` | `Full` | Controls how font hinting is applied. Hinting adjusts glyph outlines to align with the pixel grid for sharper text at small sizes. |
| `TextOptions.BaselinePixelAlignment` | `BaselinePixelAlignment` | `Unspecified` | Controls whether text baselines snap to whole pixel boundaries. |

## TextRenderingMode

| Value | Description |
|---|---|
| `Auto` | The platform chooses the best rendering mode. |
| `Alias` | Text is rendered without anti-aliasing. Produces sharp but jagged edges, useful for pixel-art fonts or very small text. |
| `Antialias` | Text is rendered with grayscale anti-aliasing. |
| `SubpixelAntialias` | Text is rendered with subpixel anti-aliasing (e.g., ClearType on Windows). Produces the sharpest text on LCD displays. |

```xml
<TextBlock Text="Aliased text"
           TextOptions.TextRenderingMode="Alias" />

<TextBlock Text="Subpixel text"
           TextOptions.TextRenderingMode="SubpixelAntialias" />
```

## TextHintingMode

Font hinting adjusts glyph outlines so they align with the pixel grid. This improves readability at small sizes but can distort glyph shapes. Reducing or disabling hinting preserves the original typeface design, which is preferable for large text or animated text.

| Value | Description |
|---|---|
| `None` | No hinting. Glyphs use their original outlines. Best for large or animated text. |
| `Slight` | Minimal hinting. Adjusts vertical metrics only, preserving horizontal glyph shapes. |
| `Normal` | Moderate hinting. |
| `Full` | Full hinting (default). Maximum pixel-grid alignment for sharpest small text. |

```xml
<!-- Large heading with no hinting for smooth outlines -->
<TextBlock Text="Welcome"
           FontSize="48"
           TextOptions.TextHintingMode="None" />

<!-- Body text with full hinting for maximum readability -->
<TextBlock Text="Read the details below."
           FontSize="14"
           TextOptions.TextHintingMode="Full" />
```

## BaselinePixelAlignment

Controls whether text baselines snap to whole pixel boundaries. Pixel-aligned baselines produce sharper text in static layouts. Unaligned baselines allow sub-pixel positioning, which prevents text from "jumping" during animations or smooth scrolling.

| Value | Description |
|---|---|
| `Unspecified` | The platform decides (typically aligned for static text). |
| `Aligned` | Baselines snap to the nearest pixel. Best for static UI text. |
| `Unaligned` | Baselines use sub-pixel positioning. Best for animated or smoothly scrolled text. |

```xml
<!-- Prevent text snapping during a RenderTransform animation -->
<TextBlock Text="Sliding text"
           TextOptions.BaselinePixelAlignment="Unaligned">
    <TextBlock.RenderTransform>
        <TranslateTransform />
    </TextBlock.RenderTransform>
</TextBlock>
```

## Applying to a container

Like `RenderOptions`, `TextOptions` is inherited by child controls. Set it on a container to affect all text within:

```xml
<StackPanel TextOptions.TextHintingMode="None"
            TextOptions.BaselinePixelAlignment="Unaligned">
    <TextBlock Text="All text in this panel" />
    <TextBlock Text="uses no hinting and sub-pixel baselines." />
</StackPanel>
```

## Setting from code

```csharp
TextOptions.SetTextHintingMode(myControl, TextHintingMode.None);
TextOptions.SetBaselinePixelAlignment(myControl, BaselinePixelAlignment.Unaligned);
```

## See also

- [Image Interpolation](/docs/graphics-animation/image-interpolation): Bitmap rendering quality options via `RenderOptions`.
- [Custom Rendering](/docs/graphics-animation/custom-rendering): Drawing with the Avalonia rendering API.
