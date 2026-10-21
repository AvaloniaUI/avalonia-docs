---
id: theming-and-localization
title: Theming, localization and accessibility
description: Style the Avalonia PdfViewer with theme brushes, pseudoclasses and a custom template, translate its strings, and review its accessibility support.
doc-type: how-to
tags:
  - avalonia pro
  - avalonia enterprise
---

## Themes

`PdfViewer` ships with two themes, each with light and dark palettes. One of them must be included in `App.axaml`.

Both themes use the same control template, which only references `Pdf*` resources. This means the viewer can render if you are using `SimpleTheme` or a custom application theme, so long as one of the two theme files is included.

```xml
<Application.Styles>
    <FluentTheme />
    // highlight-next-line
    <StyleInclude Source="avares://Avalonia.Controls.PdfViewer/Themes/Fluent.axaml" />
</Application.Styles>
```

| Theme | Description |
|---|---|
| `Default.axaml` | Neutral, rounded, borderless look. Uses its own palette. Does not depend on the host's Avalonia theme. |
| `Fluent.axaml` | Maps the same keys onto `FluentTheme` resources. The PDF viewer therefore follows the host's accent and theme variant. |

## Overriding theme palettes

Override individual `Pdf*` resources in `App.axaml` to replace theme colors with your own. A single override can supply light and dark values through a `ResourceDictionary.ThemeDictionaries` block.

```xml
<Application.Resources>
    <SolidColorBrush x:Key="PdfBackground" Color="#252526" />
    <SolidColorBrush x:Key="PdfErrorForeground" Color="#F48771" />
    <SolidColorBrush x:Key="PdfToolbarBackground" Color="#2D2D30" />
    <SolidColorBrush x:Key="PdfToolbarIconColor" Color="#CCCCCC" />
    <SolidColorBrush x:Key="PdfToolbarTextColor" Color="#E0E0E0" />
    <SolidColorBrush x:Key="PdfToolbarHoverBackground" Color="#3E3E42" />
    <SolidColorBrush x:Key="PdfToolbarBorderColor" Color="#555555" />
    <SolidColorBrush x:Key="PdfToolbarSeparatorColor" Color="#444444" />
    <SolidColorBrush x:Key="PdfMenuIconColor" Color="#AAAAAA" />

    <!-- Chrome the viewer builds in code -->
    <SolidColorBrush x:Key="PdfThumbnailBackground" Color="#2E2E2E" />
    <SolidColorBrush x:Key="PdfThumbnailSelectedBorder" Color="#4A9EDF" />
    <SolidColorBrush x:Key="PdfThumbnailLabelColor" Color="#B0B0B0" />
    <SolidColorBrush x:Key="PdfPagePlaceholderBackground" Color="#2A2A2A" />
    <SolidColorBrush x:Key="PdfDestructiveColor" Color="#FF6B6B" />

    <!-- Highlights and adorners drawn on the page -->
    <SolidColorBrush x:Key="PdfTextSelectionHighlight" Color="#5033A0FF" />
    <SolidColorBrush x:Key="PdfSearchHighlight" Color="#66FFEB3B" />
    <SolidColorBrush x:Key="PdfSearchHighlightActive" Color="#99FF9800" />
    <SolidColorBrush x:Key="PdfAdornerAccent" Color="#33A0FF" />
    <SolidColorBrush x:Key="PdfAdornerHandleBackground" Color="White" />
    <SolidColorBrush x:Key="PdfLinkHoverColor" Color="#DCA0A0A0" />
</Application.Resources>
```

## Pseudoclasses

PDF viewer exposes these states as [pseudoclasses](/docs/styling/pseudoclasses) for use by style selectors.

```xml
<Style Selector="pdf|PdfViewer:read-only">
    <Setter Property="Opacity" Value="0.9" />
</Style>
```

| Pseudoclass | State |
|---|---|
| `:has-document` | A document is open. |
| `:loading` | A document is loading. |
| `:error` | An `ErrorMessage` is set. |
| `:read-only` | `IsReadOnly` is `true`. |
| `:annotating` | A tool is active. |
| `:sidebar-open` | Sidebar is expanded. |
| `:mobile` | Compact mobile layout is in use. |
| `:narrow` | The control is narrower than 640 device-independent pixels, such as a phone in portrait. The search field collapses to an icon. |
| `:search-open` | Search field is open. |
| `:text-selected` | Text is selected. |
| `:shape-selected` | An annotation is selected. |
| `:form-field-focused` | A form field has focus. |
| `:editing-text` | Inline text editor is open. |

## Custom templates

The template parts of `PdfViewer` are declared with `[TemplatePart]`. Only `PART_ScrollViewer` and `PART_PagesContainer` are required. Every other part is optional. If omitted, the part together with the feature it carries are absent from the customized control.

To build your own theme, copy `Default.axaml` from the `Avalonia.Controls.PdfViewer` package. Change the values as desired and include the template in your application styles [as described above](#themes).

For more information on customizing control templates, see [Templated controls](/docs/custom-controls/templated-controls) and [Control themes](/docs/styling/control-themes).

## Localization

All text displayed in `PdfViewer` comes from `PdfViewerStrings`, including tooltips, menu entries, dialog text, sidebar labels, placeholders and error messages. This allows you to supply localizations by assigning translated text to `Strings`.

`Strings` must be set before loading a document. The toolbar updates immediately on a change, but contextual menus, the **Stamp** dropdown and thumbnail labels only pick up new strings during a rebuild.

```csharp
Viewer.Strings = new PdfViewerStrings
{
    Highlight = "Surligner",
    SearchPlaceholder = "Rechercher...",
    PageCountFormat = "sur {0}",
    Loading = "Chargement...",
};
```

Any untranslated strings keep the default English.

Properties ending in `Format` are `string.Format` patterns and must keep their `{0}` placeholder, for example `PageCountFormat` (`"of {0}"`) and `PageLabelFormat` (`"Page {0}"`).

## Accessibility

- Toolbar and sidebar buttons expose their tooltip as `AutomationProperties.Name`, so a screen reader announces their tooltip names rather than the control type, e.g., "Highlight" or "Zoom".
- The control reports as a document region, named from the document title (or file name) and the current page. Set `AutomationProperties.Name` on the `PdfViewer` to override.
- Hidden overlays (e.g., password, go-to-page, custom zoom) are out of the tab order.
- Form fields are reachable with <kbd>Tab</kbd> and show a focus ring. See [Forms](/controls/data-display/pdfviewer/annotations#forms).

:::caution
Page content is rendered as a bitmap, so the PDF's text is not automatically exposed to assistive technology. If needed, read the text with `GetPageTextAsync` and present it in your own accessible surface.
:::

## See also

- [PdfViewer control](/controls/data-display/pdfviewer/)
- [Navigation, zoom and search](/controls/data-display/pdfviewer/navigation-and-search)
- [Control themes](/docs/styling/control-themes)
