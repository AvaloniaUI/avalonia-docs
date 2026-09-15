---
id: theming-and-localization
title: Theming, localization and accessibility
description: Style the Avalonia PdfViewer with theme brushes, pseudo-classes and a custom template, translate its strings, and review its accessibility support.
doc-type: how-to
tags:
  - avalonia pro
  - avalonia enterprise
---

## Themes

The package ships two themes, each with light and dark palettes. Include one of them in `App.axaml`.

| Theme | Description |
|---|---|
| `Default.axaml` | A neutral, rounded, borderless look with its own palette. It does not depend on the host's Avalonia theme. |
| `Fluent.axaml` | Maps the same keys onto `FluentTheme` resources such as `SystemAccentColor` and `ControlCornerRadius`, so the viewer follows the host's accent, theme variant and any Fluent resource the application overrides. |

```xml
<Application.Styles>
    <FluentTheme />
    <StyleInclude Source="avares://Avalonia.Controls.PdfViewer/Themes/Fluent.axaml" />
</Application.Styles>
```

Both themes use the same control template, which only references `Pdf*` resources. The viewer therefore renders fully under `SimpleTheme` or a custom application theme as long as one of the two theme files is included.

## Override theme brushes

Override the `Pdf*` resources in `App.axaml` to match your application. The keys resolve per theme variant, so an override can supply light and dark values through a `ResourceDictionary.ThemeDictionaries` block.

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

    <!-- Highlights and edit adorners drawn on the page -->
    <SolidColorBrush x:Key="PdfTextSelectionHighlight" Color="#5033A0FF" />
    <SolidColorBrush x:Key="PdfSearchHighlight" Color="#66FFEB3B" />
    <SolidColorBrush x:Key="PdfSearchHighlightActive" Color="#99FF9800" />
    <SolidColorBrush x:Key="PdfAdornerAccent" Color="#33A0FF" />
    <SolidColorBrush x:Key="PdfAdornerHandleBackground" Color="White" />
    <SolidColorBrush x:Key="PdfLinkHoverColor" Color="#DCA0A0A0" />
</Application.Resources>
```

`SidebarSelectionBrush` on the control overrides `PdfThumbnailSelectedBorder` for one viewer.

## Pseudo-classes

The viewer exposes its states as pseudo-classes for use in style selectors.

| Pseudo-class | State |
|---|---|
| `:has-document` | A document is open. |
| `:loading` | A document is loading. |
| `:error` | `ErrorMessage` is set. |
| `:read-only` | `IsReadOnly` is `true`. |
| `:annotating` | A tool is active. |
| `:sidebar-open` | The sidebar is expanded. |
| `:mobile` | The compact mobile layout is in use. |
| `:narrow` | The control is narrower than 640 DIPs, such as a phone in portrait. The search field collapses to an icon. |
| `:search-open` | The search field is open. |
| `:text-selected` | Text is selected. |
| `:shape-selected` | An annotation is selected. |
| `:form-field-focused` | A form field has focus. |
| `:editing-text` | The inline text editor is open. |

```xml
<Style Selector="pdf|PdfViewer:read-only">
    <Setter Property="Opacity" Value="0.9" />
</Style>
```

## Custom templates

The template parts are declared with `[TemplatePart]` attributes on `PdfViewer`. Only `PART_ScrollViewer` and `PART_PagesContainer` are required. Every other part is optional, and its feature is absent when a custom template leaves it out.

To build your own theme, copy `Default.axaml` from the package, change the values and include the template the same way.

## Localization

Every text the viewer shows comes from `PdfViewerStrings`: tooltips, menu entries, dialog text, sidebar labels, placeholders and error messages. Assign an instance with your translations to `Strings`. Properties you leave out keep the English default.

```csharp
Viewer.Strings = new PdfViewerStrings
{
    Highlight = "Surligner",
    SearchPlaceholder = "Rechercher...",
    PageCountFormat = "sur {0}",
    Loading = "Chargement...",
};
```

Properties ending in `Format` are `string.Format` patterns and must keep their `{0}` placeholder, for example `PageCountFormat` (`"of {0}"`) and `PageLabelFormat` (`"Page {0}"`).

Set `Strings` before loading a document. The toolbar updates immediately on a change, but context menus, the **Stamp** dropdown and thumbnail labels only pick up new strings when they are next built. The zoom percentage is formatted with the current culture.

## Accessibility

- Toolbar and sidebar buttons expose their tooltip as `AutomationProperties.Name`, so a screen reader announces "Highlight" or "Zoom" rather than the control type.
- The control reports as a document region, named from the document title (or file name) and the current page. Set `AutomationProperties.Name` on the `PdfViewer` to override this.
- Hidden overlays (password, go-to-page, custom zoom) are out of the tab order.
- Form fields are reachable with <kbd>Tab</kbd> and show a focus ring. See [Forms](annotations.md#forms).

Page content is rendered as a bitmap, so the PDF's text is not exposed to assistive technology as elements. If you need it, read it with `GetPageTextAsync` and present it in your own accessible surface.

## See also

- [PdfViewer control](index.md)
- [Navigation, zoom and search](navigation-and-search.md)
- [Control themes](/docs/styling/control-themes)
