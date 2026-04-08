---
id: markdown-styling
title: Markdown styling
tags:
  - accelerate
---

The `Markdown` control is built on the shared FlowDocument model, where every rendered element (`Paragraph`, `Section`, `Table`, `RichSpan`, `RichHyperlink`, etc.) is a full Avalonia `StyledElement`. This means you can style Markdown output using two complementary approaches:

1. **DocumentNode style selectors** — target elements by type and CSS-like class (e.g., `Paragraph.h1`, `Section.quoteBlock`).
2. **Named resources** — override theme values such as font sizes, margins, and brush colors.

:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Business or higher.
:::

## DocumentNode style selectors

Because all document elements are `StyledElement` instances, you can target them with standard Avalonia style selectors. The Markdown renderers apply CSS-like classes to each element, so you can style specific Markdown constructs without affecting others.

### Available selectors

The following table lists the style selectors used by the default theme. You can override or extend any of these in your application styles.

#### Block selectors

| Selector | Description |
|---|---|
| `:is(Block)` | All block-level elements (paragraphs, sections, etc.). Sets base margin. |
| `:is(Block).codeBlock` | Fenced code blocks. Background, border, padding, and monospace font. |
| `Paragraph.header` | All heading paragraphs (h1–h6). Bold font weight. |
| `Paragraph.h1` | Level 1 heading. |
| `Paragraph.h2` | Level 2 heading. |
| `Paragraph.h3` | Level 3 heading. |
| `Paragraph.h4` | Level 4 heading. |
| `Paragraph.h5` | Level 5 heading. |
| `Paragraph.h6` | Level 6 heading. |
| `Section.quoteBlock` | Block quotes. Left border, padding, muted foreground. |
| `Section.alertBlock` | All alert blocks (NOTE, TIP, IMPORTANT, WARNING, CAUTION). |
| `Section.alertBlock.note` | Note alert block border. |
| `Section.alertBlock.tip` | Tip alert block border. |
| `Section.alertBlock.important` | Important alert block border. |
| `Section.alertBlock.warning` | Warning alert block border. |
| `Section.alertBlock.caution` | Caution alert block border. |
| `BlockUIContainer.thematicBreak` | Horizontal rule (thematic break). |
| `BlockUIContainer.alertBlockHeader` | Alert block header container (icon + label). |
| `Table` | Table element. Border, cell spacing. |
| `TableCell` | Table cell element. Border. |
| `TableRow.tableHeader` | Header row. Bold font weight. |
| `List` | List element. Left padding, line height. |
| `ListItem` | List item element. Line height. |

#### Inline selectors

| Selector | Description |
|---|---|
| `RichRun.code` | Inline code spans. Background and monospace font. |
| `RichSpan.header` | Inline spans inside headings. Bold font weight. |
| `RichSpan.h1` through `RichSpan.h6` | Inline spans with heading-level font sizes. |
| `RichSpan.strikeThrough` | Strikethrough text decoration. |
| `RichSpan.inserted` | Underline text decoration (inserted text). |
| `RichSpan.marked` | Highlighted/marked text background. |
| `RichHyperlink` | Hyperlink element. Foreground color. |
| `RichHyperlink:pointerover` | Hyperlink on hover. Underline + hover color. |
| `RichHyperlink:visited` | Visited hyperlink color. |

#### Document element selectors

| Selector | Description |
|---|---|
| `MarkdownCodeBlock` | Code block element. Set `Highlighter` property here. |
| `MarkdownImage` | Image inline element. Set `ImageLoader` property here. |

### Custom styling examples

Override heading colors:

```xml
<Style Selector="Paragraph.h1">
    <Setter Property="Foreground" Value="#1a73e8" />
</Style>
<Style Selector="Paragraph.h2">
    <Setter Property="Foreground" Value="#188038" />
</Style>
```

Custom quote block appearance:

```xml
<Style Selector="Section.quoteBlock">
    <Setter Property="Background" Value="#f8f9fa" />
    <Setter Property="BorderBrush" Value="#6c757d" />
    <Setter Property="BorderThickness" Value="3,0,0,0" />
    <Setter Property="CornerRadius" Value="4" />
</Style>
```

Custom inline code styling:

```xml
<Style Selector="RichRun.code">
    <Setter Property="Background" Value="#e8f0fe" />
    <Setter Property="FontFamily" Value="Cascadia Code" />
</Style>
```

Custom code block with rounded corners and different background:

```xml
<Style Selector=":is(Block).codeBlock">
    <Setter Property="Background" Value="#1e1e1e" />
    <Setter Property="Foreground" Value="#d4d4d4" />
    <Setter Property="CornerRadius" Value="8" />
    <Setter Property="Padding" Value="20" />
</Style>
```

Scoped nesting selectors also work. For example, remove paragraph margins inside tables:

```xml
<Style Selector="Table Paragraph">
    <Setter Property="Margin" Value="0" />
</Style>
```

## Customizable resources

In addition to style selectors, you can override named resources in your theme or resource dictionary. These are used by the default styles and provide an easy way to adjust values without rewriting selectors.

### Blocks
| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownBlockMargin` | Thickness | `0,8` | Block outer margin |

### Hyperlinks
| Key | Type | Default (Light) | Default (Dark) | Notes |
|---|---|---|---|---|
| `MarkdownHyperlinkForeground` | Brush | `#0969da` | `#58a6ff` | Link color |
| `MarkdownHyperlinkForegroundVisited` | Brush | `#551A8B` | `#bc8cff` | Visited link color |
| `MarkdownHyperlinkForegroundPointerOver` | Brush | `#0056b3` | `#79c0ff` | Hover link color |

### Selection
| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownSelectionBrush` | Brush | `#FF086F9E` | Selection highlight |

### Code
| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownCodeFontFamily` | FontFamily | `Courier New` | Inline/code font |

### Code blocks
| Key | Type | Default (Light) | Default (Dark) | Notes |
|---|---|---|---|---|
| `MarkdownCodeBlockParagraphPadding` | Thickness | `16` | `16` | Inner padding |
| `MarkdownCodeBlockParagraphBorderThickness` | Thickness | `1` | `1` | Border thickness |
| `MarkdownCodeBlockParagraphCornerRadius` | CornerRadius | `6` | `6` | Corner radius |
| `MarkdownCodeBlockParagraphBackground` | Brush | `#1f818b98` | `#20484f58` | Background |
| `MarkdownCodeBlockParagraphBorderBrush` | Brush | `#e3ebf6` | `#30363d` | Border brush |

### Inline code
| Key | Type | Default (Light) | Default (Dark) | Notes |
|---|---|---|---|---|
| `MarkdownCodeRunBackground` | Brush | `#1f818b98` | `#20484f58` | Inline code background |

### Thematic break
| Key | Type | Default (Light) | Default (Dark) | Notes |
|---|---|---|---|---|
| `MarkdownThematicBreakRectangleFill` | Brush | `#d1d9e0` | `#30363d` | Thematic break color |

### Headers (per level)
Each header exposes `FontSize`, `BorderThickness`, `Padding`, `Margin`.

| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownHeader1ParagraphFontSize` | Double | `31.5` | H1 font size |
| `MarkdownHeader1ParagraphBorderThickness` | Thickness | `0,0,0,1` | H1 bottom border |
| `MarkdownHeader1ParagraphPadding` | Thickness | `0,0,0,16` | H1 inner padding (bottom) |
| `MarkdownHeader1ParagraphMargin` | Thickness | `0,31,0,14` | H1 outer margin |
| `MarkdownHeader2ParagraphFontSize` | Double | `24.5` | H2 font size |
| `MarkdownHeader2ParagraphBorderThickness` | Thickness | `0,0,0,1` | H2 bottom border |
| `MarkdownHeader2ParagraphPadding` | Thickness | `0,0,0,12` | H2 inner padding (bottom) |
| `MarkdownHeader2ParagraphMargin` | Thickness | `0,24.5,0,14` | H2 outer margin |
| `MarkdownHeader3ParagraphFontSize` | Double | `21` | H3 font size |
| `MarkdownHeader3ParagraphBorderThickness` | Thickness | `0,0,0,1` | H3 bottom border |
| `MarkdownHeader3ParagraphPadding` | Thickness | `0,0,0,8` | H3 inner padding (bottom) |
| `MarkdownHeader3ParagraphMargin` | Thickness | `0,21,0,14` | H3 outer margin |
| `MarkdownHeader4ParagraphFontSize` | Double | `16.8` | H4 font size |
| `MarkdownHeader4ParagraphBorderThickness` | Thickness | `0,0,0,1` | H4 bottom border |
| `MarkdownHeader4ParagraphPadding` | Thickness | `0,0,0,6` | H4 inner padding (bottom) |
| `MarkdownHeader4ParagraphMargin` | Thickness | `0,16.8,0,14` | H4 outer margin |
| `MarkdownHeader5ParagraphFontSize` | Double | `14` | H5 font size |
| `MarkdownHeader5ParagraphBorderThickness` | Thickness | `0,0,0,1` | H5 bottom border |
| `MarkdownHeader5ParagraphPadding` | Thickness | `0,0,0,4` | H5 inner padding (bottom) |
| `MarkdownHeader5ParagraphMargin` | Thickness | `0,14,0,14` | H5 outer margin |
| `MarkdownHeader6ParagraphFontSize` | Double | `14` | H6 font size |
| `MarkdownHeader6ParagraphBorderThickness` | Thickness | `0,0,0,1` | H6 bottom border |
| `MarkdownHeader6ParagraphPadding` | Thickness | `0,0,0,2` | H6 inner padding (bottom) |
| `MarkdownHeader6ParagraphMargin` | Thickness | `0,14,0,14` | H6 outer margin |

### Quote blocks
| Key | Type | Default (Light) | Default (Dark) | Notes |
|---|---|---|---|---|
| `MarkdownQuoteBlockSectionBorderThickness` | Thickness | `4,0,0,0` | `4,0,0,0` | Quote block left border thickness |
| `MarkdownQuoteBlockSectionBorderBrush` | Brush | `#DDDDDD` | `#3b434b` | Quote block border brush |
| `MarkdownQuoteBlockSectionForeground` | Brush | `#777777` | `#8b949e` | Quote block foreground color |
| `MarkdownQuoteBlockSectionPadding` | Thickness | `15,0` | `15,0` | Quote block inner padding |
| `MarkdownQuoteBlockFirstChildSectionMargin` | Thickness | `0,0,0,14` | `0,0,0,14` | Margin for first child in quote |
| `MarkdownQuoteBlockLastChildSectionMargin` | Thickness | `0` | `0` | Margin for last child in quote |

### Tables
| Key | Type | Default (Light) | Default (Dark) | Notes |
|---|---|---|---|---|
| `MarkdownTableCellBorderBrush` | Brush | `Black` | `#30363d` | Table cell border brush |
| `MarkdownTableBorderBrush` | Brush | `Black` | `#30363d` | Table border brush |
| `MarkdownTableBorderThickness` | Thickness | `0,0,1,1` | `0,0,1,1` | Table outer border thickness |
| `MarkdownTableCellSpacing` | Double | `0` | — | Cell spacing |
| `MarkdownTableCellBorderThickness` | Thickness | `1,1,0,0` | `1,1,0,0` | Cell border thickness |
| `MarkdownTableCellParagraphPadding` | Thickness | `12,5` | `12,5` | Cell paragraph padding |

### Inline styles
| Key | Type | Default (Light) | Default (Dark) | Notes |
|---|---|---|---|---|
| `MarkdownMarkedSpanBackground` | Brush | `Yellow` | `#bb8009` | Highlight background for marked spans |

### Alert blocks (per type)
| Key | Type | Default (Light) | Default (Dark) | Notes |
|---|---|---|---|---|
| `MarkdownAlertBlockNoteBorderBrush` | Brush | `#0969da` | `#58a6ff` | Note alert border brush |
| `MarkdownAlertBlockNoteParagraphForeground` | Brush | `#0969da` | `#58a6ff` | Note alert paragraph foreground |
| `MarkdownAlertBlockTipBorderBrush` | Brush | `#1a7f37` | `#3fb950` | Tip alert border brush |
| `MarkdownAlertBlockTipParagraphForeground` | Brush | `#1a7f37` | `#3fb950` | Tip alert paragraph foreground |
| `MarkdownAlertBlockImportantBorderBrush` | Brush | `#8250df` | `#bc8cff` | Important alert border brush |
| `MarkdownAlertBlockImportantParagraphForeground` | Brush | `#8250df` | `#bc8cff` | Important alert paragraph foreground |
| `MarkdownAlertBlockWarningBorderBrush` | Brush | `#9a6700` | `#d29922` | Warning alert border brush |
| `MarkdownAlertBlockWarningParagraphForeground` | Brush | `#9a6700` | `#d29922` | Warning alert paragraph foreground |
| `MarkdownAlertBlockCautionBorderBrush` | Brush | `#d1242f` | `#f85149` | Caution alert border brush |
| `MarkdownAlertBlockCautionParagraphForeground` | Brush | `#d1242f` | `#f85149` | Caution alert paragraph foreground |
| `MarkdownAlertBlockHeaderMargin` | Thickness | `0 0 0 8` | — | Alert header margin |

### Alert header content templates
- `MarkdownAlertBlockHeaderNoteContentTemplate` — content template for Note alert header
- `MarkdownAlertBlockHeaderTipContentTemplate` — content template for Tip alert header
- `MarkdownAlertBlockHeaderImportantContentTemplate` — content template for Important alert header
- `MarkdownAlertBlockHeaderWarningContentTemplate` — content template for Warning alert header
- `MarkdownAlertBlockHeaderCautionContentTemplate` — content template for Caution alert header

### Copy button
| Key | Type | Default (Light) | Default (Dark) | Notes |
|---|---|---|---|---|
| `MarkdownCopyButtonFill` | Brush | `#59636e` | `#8b949e` | Copy button fill color |
| `MarkdownCopyButtonContentTemplate` | DataTemplate | — | — | Content template for copy button |

## How to override

### Style selectors (recommended)

Place your styles after the `StyleInclude` for `Default.axaml` in `App.axaml` or in a merged resource dictionary. Later styles take precedence:

```xml
<Application.Styles>
    <StyleInclude Source="avares://Avalonia.Controls.Markdown/Themes/Default.axaml" />

    <!-- Your overrides -->
    <Style Selector="Paragraph.h1">
        <Setter Property="Foreground" Value="Navy" />
    </Style>
    <Style Selector="Section.quoteBlock">
        <Setter Property="Background" Value="#f0f4f8" />
    </Style>
</Application.Styles>
```

### Named resources

Define resources in your application theme or resource dictionary:

```xml
<SolidColorBrush x:Key="MarkdownHyperlinkForeground" Color="#FF0000" />
```

## Example: custom theme

```xml
<ResourceDictionary>
    <SolidColorBrush x:Key="MarkdownSelectionBrush" Color="#FFD700" />
    <FontFamily x:Key="MarkdownCodeFontFamily">Cascadia Code</FontFamily>
</ResourceDictionary>
```

Combined with style selectors for a dark code theme:

```xml
<Style Selector=":is(Block).codeBlock">
    <Setter Property="Background" Value="#2d2d2d" />
    <Setter Property="Foreground" Value="#cccccc" />
    <Setter Property="CornerRadius" Value="8" />
</Style>
```

## See also

- [Markdown control](/controls/data-display/text-display/markdown)
- [Rendering markdown](/docs/app-development/rendering-markdown)