---
id: markdown-styling
title: Markdown styling
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

The `Markdown` control in Avalonia supports custom styling via named resources. You can override these resources in your application to customize the appearance of Markdown elements.

## Customizable Resources

Below is a list of key resources you can override in your theme or resource dictionary:

## Blocks
| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownBlockMargin` | Thickness | `0,8` | Block outer margin |

## Hyperlinks
| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownHyperlinkForeground` | Brush | `#0969da` | Link color |
| `MarkdownHyperlinkForegroundVisited` | Brush | `#551A8B` | Visited link color |
| `MarkdownHyperlinkForegroundPointerOver` | Brush | `#0056b3` | Hover link color |

## Selection
| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownSelectionBrush` | Brush | `#FF086F9E` | Selection highlight |

## Code
| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownCodeFontFamily` | FontFamily | `Courier New` | Inline/code font |

## Code blocks
| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownCodeBlockParagraphPadding` | Thickness | `16` | Inner padding for code blocks |
| `MarkdownCodeBlockParagraphBorderThickness` | Thickness | `1` | Border thickness for code blocks |
| `MarkdownCodeBlockParagraphCornerRadius` | CornerRadius | `6` | Corner radius for code blocks |
| `MarkdownCodeBlockParagraphBackground` | Brush | `#1f818b98` | Background for code blocks |
| `MarkdownCodeBlockParagraphBorderBrush` | Brush | `#e3ebf6` | Border brush for code blocks |

## Inline code
| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownCodeRunBackground` | Brush | `#1f818b98` | Inline code background |

## Thematic break
| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownThematicBreakRectangleFill` | Brush | `#d1d9e0` | Thematic break color |

## Headers (per level)
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

## Quote blocks
| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownQuoteBlockSectionBorderThickness` | Thickness | `4,0,0,0` | Quote block left border thickness |
| `MarkdownQuoteBlockSectionBorderBrush` | Brush | `#DDDDDD` | Quote block border brush |
| `MarkdownQuoteBlockSectionForeground` | Brush | `#777777` | Quote block foreground color |
| `MarkdownQuoteBlockSectionPadding` | Thickness | `15,0` | Quote block inner padding |
| `MarkdownQuoteBlockFirstChildSectionMargin` | Thickness | `0,0,0,14` | Margin for first child in quote |
| `MarkdownQuoteBlockLastChildSectionMargin` | Thickness | `0` | Margin for last child in quote |

## Tables
| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownTableCellBorderBrush` | Brush | `Black` | Table cell border brush |
| `MarkdownTableBorderBrush` | Brush | `Black` | Table border brush |
| `MarkdownTableBorderThickness` | Thickness | `0,0,1,1` | Table outer border thickness |
| `MarkdownTableCellSpacing` | Double | `0` | Cell spacing |
| `MarkdownTableCellBorderThickness` | Thickness | `1,1,0,0` | Cell border thickness |
| `MarkdownTableCellParagraphPadding` | Thickness | `12,5` | Cell paragraph padding |

## Inline styles
| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownMarkedSpanBackground` | Brush | `Yellow` | Highlight background for marked spans |

## Alert blocks (per type)
| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownAlertBlockNoteBorderBrush` | Brush | `#0969da` | Note alert border brush |
| `MarkdownAlertBlockNoteParagraphForeground` | Brush | `#0969da` | Note alert paragraph foreground |
| `MarkdownAlertBlockTipBorderBrush` | Brush | `#1a7f37` | Tip alert border brush |
| `MarkdownAlertBlockTipParagraphForeground` | Brush | `#1a7f37` | Tip alert paragraph foreground |
| `MarkdownAlertBlockImportantBorderBrush` | Brush | `#8250df` | Important alert border brush |
| `MarkdownAlertBlockImportantParagraphForeground` | Brush | `#8250df` | Important alert paragraph foreground |
| `MarkdownAlertBlockWarningBorderBrush` | Brush | `#9a6700` | Warning alert border brush |
| `MarkdownAlertBlockWarningParagraphForeground` | Brush | `#9a6700` | Warning alert paragraph foreground |
| `MarkdownAlertBlockCautionBorderBrush` | Brush | `#d1242f` | Caution alert border brush |
| `MarkdownAlertBlockCautionParagraphForeground` | Brush | `#d1242f` | Caution alert paragraph foreground |
| `MarkdownAlertBlockHeaderMargin` | Thickness | `0 0 0 8` | Alert header margin |

### Alert header content templates
- `MarkdownAlertBlockHeaderNoteContentTemplate` - content template for Note alert header
- `MarkdownAlertBlockHeaderTipContentTemplate` - content template for Tip alert header
- `MarkdownAlertBlockHeaderImportantContentTemplate` - content template for Important alert header
- `MarkdownAlertBlockHeaderWarningContentTemplate` - content template for Warning alert header
- `MarkdownAlertBlockHeaderCautionContentTemplate` - content template for Caution alert header

## Copy button
| Key | Type | Default | Notes |
|---|---|---|---|
| `MarkdownCopyButtonFill` | Brush | `#59636e` | Copy button fill color |
| `MarkdownCopyButtonContentTemplate` | DataTemplate | - | Content template for copy button |

## How to Override

To customize, define these resources in your application theme or resource dictionary. For example:

```xml
<SolidColorBrush x:Key="MarkdownHyperlinkForeground" Color="#FF0000" />
```

## Example: Custom Theme

```xml
<ResourceDictionary>
  <SolidColorBrush x:Key="MarkdownSelectionBrush" Color="#FFD700" />
  <FontFamily x:Key="MarkdownCodeFontFamily">Consolas</FontFamily>
  <!-- Add more overrides as needed -->
</ResourceDictionary>
```

## See also

- [Markdown control](/controls/data-display/text-display/markdown)
- [Rendering markdown](/docs/ui-development/rendering-markdown)