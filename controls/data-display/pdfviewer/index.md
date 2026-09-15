---
id: index
title: PdfViewer control
description: Display, search, annotate, fill and print PDF documents in Avalonia with the PdfViewer control from the Avalonia.Controls.PdfViewer package.
doc-type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`PdfViewer` displays PDF documents in your Avalonia application. It is a complete reader out of the box: set a source and you have a toolbar and sidebar, page thumbnails and a document outline, page navigation, zoom and view modes, text selection and search, a full annotation toolset with undo and redo, form filling, bookmarks, and native printing and sharing. Each of these can be hidden or disabled, and everything is available from code as well as through the built-in UI. The same control and package run on Windows, macOS, Linux, iOS, Android and WebAssembly.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## When to use

Use `PdfViewer` to show PDF documents inside your app. Every tool and menu entry can be hidden or disabled, so it works as a plain read-only viewer or as a full annotation editor.

To render a page as an image outside the viewer, for example for a thumbnail in a file list, use [`RenderPageToImageAsync`](navigation-and-search.md#text-extraction-and-page-images).

## Requirements

- .NET 10 or later.
- Avalonia 12.0 or later.
- An Avalonia Pro or Enterprise license that covers the PDF Viewer.
- Windows, macOS, Linux (x64 and arm64), iOS 15 or later, Android API 23 or later, or WebAssembly.

## Dependencies

The package renders with [PDFium](https://pdfium.googlesource.com/pdfium/), which is bundled as a native library through the `bblanchon.PDFium.*` NuGet packages. Each target framework depends only on the packages for its own platforms, so an app head restores nothing it does not need.

| Target | Packages |
|---|---|
| `net10.0` (Windows, macOS, Linux) | `Avalonia`, `AvaloniaUI.Licensing`, `bblanchon.PDFium.Win32`, `bblanchon.PDFium.macOS`, `bblanchon.PDFium.Linux` |
| `net10.0-ios` | `Avalonia`, `AvaloniaUI.Licensing`, `bblanchon.PDFium.iOS` |
| `net10.0-android` | `Avalonia`, `Avalonia.Android`, `AvaloniaUI.Licensing`, `bblanchon.PDFium.Android` |
| `net10.0-browser` | `Avalonia`, `AvaloniaUI.Licensing`, `bblanchon.PDFium.WebAssembly` |

PDFium is licensed under the [BSD 3-Clause License](https://pdfium.googlesource.com/pdfium/+/refs/heads/main/LICENSE). Include its notice in your application's third-party attributions.

## Getting started

1. Install the `Avalonia.Controls.PdfViewer` NuGet package by running `dotnet add package`. Add it to the project that contains your views and to each application head (desktop, iOS, Android, browser), so each head restores the required PDFium binaries for its own platform.

```bash
dotnet add package Avalonia.Controls.PdfViewer
```

2. Reference the `AvaloniaUI.Licensing` package in each application head and include your Avalonia license key in the executable project file (`.csproj`). Your license key is available from the [Avalonia portal](https://portal.avaloniaui.net). The control throws `AvaloniaLicensingException` on first use if the key is missing or does not cover the PDF Viewer.

```xml
<ItemGroup>
  <PackageReference Include="AvaloniaUI.Licensing" Version="3.1.2" />
</ItemGroup>
<ItemGroup>
  <AvaloniaUILicenseKey Include="YOUR_LICENSE_KEY" />
</ItemGroup>
```

:::tip
For multi-project solutions, you can store your licence key in an [environment variable](https://learn.microsoft.com/en-us/visualstudio/msbuild/how-to-use-environment-variables-in-a-build) or a [shared props file](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory?view=vs-2022#directorybuildprops-example) to avoid duplication.
:::

3. Reference one of the two themes via a `StyleInclude` in your `App.axaml` file. Without a theme the control renders nothing. `Default.axaml` has its own palette and works under any host theme. `Fluent.axaml` follows the host's `FluentTheme` accent and theme variant.

```xml
<Application.Styles>
    <FluentTheme />
    <StyleInclude Source="avares://Avalonia.Controls.PdfViewer/Themes/Default.axaml" />
</Application.Styles>
```

For more information on installing Avalonia Pro controls, see [Installing Avalonia Pro](/tools/installing-avalonia-pro).

## Basic usage

The control lives in the `Avalonia.Controls` namespace. `Avalonia.Controls.PdfViewer` is the package and assembly name, so map the namespace with an `xmlns` prefix in XAML.

<Tabs>
<TabItem value="xaml" label="XAML">

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:pdf="using:Avalonia.Controls"
        Width="1000" Height="700">

    <pdf:PdfViewer x:Name="Viewer"
                   Source="/path/to/document.pdf"
                   ViewMode="Continuous"
                   SidebarMode="Thumbnails" />

</Window>
```

</TabItem>

<TabItem value="csharp" label="Code-behind">

```csharp
using Avalonia.Controls;          // PdfViewer, its enums and event args
using Avalonia.Controls.Pdf.Core; // PdfAnnotationColor, PdfBookmark, PdfSearchResult, SearchOptions

// Load from a file path, a stream, or a password-protected file
await Viewer.LoadDocumentAsync("/path/to/document.pdf");
await Viewer.LoadDocumentAsync(fileStream);
await Viewer.LoadDocumentAsync("/path/to/encrypted.pdf", password: "secret");

// Navigate and zoom
Viewer.GoToPage(5);
Viewer.NextPage();
Viewer.FitWidth();

// Search
var results = await Viewer.SearchAsync("keyword", new SearchOptions { MatchCase = true });
Viewer.FindNext();

// Read the selection
string? text = Viewer.GetSelectedText();
await Viewer.CopySelectionToClipboard();

// Annotate the current selection, then save with the edits
await Viewer.HighlightSelectionAsync();
await Viewer.UnderlineSelectionAsync(new PdfAnnotationColor(0, 0, 255, 255));
await Viewer.SaveDocumentAsync("/path/to/output.pdf");
```

</TabItem>
</Tabs>

Setting `Source` loads the document. It can be set before the viewer is attached to the visual tree, for example from a view model constructor.

## Namespaces

| Namespace | Contents |
|---|---|
| `Avalonia.Controls` | `PdfViewer`, its enums, its event args and `PdfViewerStrings`. |
| `Avalonia.Controls.Pdf.Core` | Data types: `PdfAnnotationColor`, `PdfBookmark`, `PdfSearchResult`, `PdfMetadata`, `PdfPermissions`, `SearchOptions`, `PdfLinkDestination`. |
| `Avalonia.Controls.Pdf.Services` | Print and share types: `PrintOptions`, `IPrintService`, `ShareOptions`, `IShareService`. |

## Properties

### Document, view and zoom

| Property | Type | Default | Description |
|---|---|---|---|
| `Source` | `string?` | `null` | Path to the PDF file. Setting it loads the document. |
| `DocumentSource` | `object?` | `null` | Flexible source: a file path `string`, a `Stream`, or a `byte[]`. |
| `Password` | `string?` | `null` | Password for encrypted PDFs. |
| `CurrentPage` | `int` | `0` | Current page number. 1-based once a document is open, `0` while none is. Coerced to the range 1 to `PageCount`. |
| `ZoomLevel` | `double` | `1.0` | Zoom level, from `MinZoom` to `MaxZoom`. `1.0` is 100%. |
| `ZoomMode` | `PdfZoomMode` | `FitPage` | `Manual`, `FitWidth`, `FitPage`, `FitHeight` or `ActualSize`. |
| `MinZoom` | `double` | `0.05` | Lower zoom bound. |
| `MaxZoom` | `double` | `5.0` | Upper zoom bound. |
| `ZoomStep` | `double` | `0.0` | Increment applied by `ZoomIn` and `ZoomOut`. `0` uses the built-in adaptive step. |
| `ViewMode` | `PdfViewMode` | `Continuous` | `SinglePage`, `Continuous`, `TwoPages` or `TwoPagesContinuous`. |
| `PageRenderBuffer` | `int` | `2` | Pages decoded on each side of the viewport in continuous mode. Clamped to 0 to 10. |
| `PageRetentionBuffer` | `int` | `4` | Pages kept decoded on each side before eviction. Clamped to 0 to 20. |
| `MaxRenderScale` | `double` | `2.0` | Upper bound on device pixels per DIP used when decoding a page. Coerced to 1 to 4. |
| `VerticalScrollOffset` | `double` | | Current vertical scroll offset. |

### Sidebar and toolbar

| Property | Type | Default | Description |
|---|---|---|---|
| `SidebarMode` | `SidebarMode` | `Thumbnails` | `None`, `Thumbnails`, `TableOfContents` or `Bookmarks`. |
| `IsSidebarVisible` | `bool` | `true` | Shows or hides the sidebar. |
| `SidebarWidth` | `double` | `210` | Sidebar width in DIPs. |
| `SidebarPlacement` | `SidebarPlacement` | `Auto` | `Auto` (overlay in the mobile layout, offset on desktop), `Overlay` or `Offset`. |
| `SidebarSelectionBrush` | `IBrush?` | `null` | Brush of the selected thumbnail and outline entry. `null` uses the theme's `PdfThumbnailSelectedBorder` resource. |
| `IsTableOfContentsEnabled` | `bool` | `true` | Offers the outline tab in the sidebar. |
| `IsBookmarksEnabled` | `bool` | `true` | Offers the bookmarks tab in the sidebar. |
| `ShowBookmarkIndicators` | `bool` | `true` | Draws a ribbon on bookmarked pages and thumbnails. |
| `IsToolbarVisible` | `bool` | `true` | Shows or hides the toolbar. |
| `IsMoreOptionsVisible` | `bool` | `true` | Shows or hides the toolbar's **More Options** menu (print, share, view modes). |
| `IsPrintVisible` | `bool` | `true` | Offers **Print** in the **More Options** menu. Hidden anyway when nothing can print. |
| `IsShareVisible` | `bool` | `true` | Offers **Share** in the **More Options** menu. Hidden anyway when nothing can share. |
| `IsOpenVisible` | `bool` | `false` | Offers **Open** at the top of the **More Options** menu. |
| `IsSaveVisible` | `bool` | `false` | Offers **Save** in the **More Options** menu. Hidden while `AllowDocumentSaving` is `false`. |
| `IsSaveAsVisible` | `bool` | `false` | Offers **Save As** in the **More Options** menu. |
| `PrintService` | `IPrintService?` | platform | Print implementation. Unset uses the built-in platform service, `null` disables it. |
| `ShareService` | `IShareService?` | platform | Share implementation, with the same semantics as `PrintService`. |
| `ToolbarLayoutMode` | `PdfToolbarLayoutMode` | `Auto` | `Auto` picks the layout from the platform and width. `Mobile` and `Desktop` force one. |
| `IsMobileLayout` | `bool` | | Whether the compact mobile layout is active. Set by the control: `true` on iOS and Android, and on any platform when the control is narrower than 500 DIPs. Use `ToolbarLayoutMode` to force a layout. |

The visibility of each annotation tool is controlled by its own property. See [Annotations](annotations.md#tool-visibility).

### Capabilities and permissions

| Property | Type | Default | Description |
|---|---|---|---|
| `IsReadOnly` | `bool` | `false` | Disables annotation and form editing in one switch. Saving is gated separately by `AllowDocumentSaving`. |
| `AllowTextSelection` | `bool` | `true` | Enables text selection and copy. |
| `AllowAnnotationEditing` | `bool` | `true` | Enables creating and editing annotations. |
| `AllowFormEditing` | `bool` | `true` | Enables interactive form field editing. |
| `AllowDocumentSaving` | `bool` | `true` | Enables saving. Gates `SaveCommand` and `SaveAsync`. |
| `RespectDocumentPermissions` | `bool` | `true` | Honours the document's own permission flags. Annotation editing, form filling, text selection and printing are each withheld when the document forbids them. A document opened with its owner password is unrestricted. |
| `AutoSave` | `bool` | `false` | Saves back to `Source` after each edit. Requires `AllowDocumentSaving`. |
| `EnableKeyboardShortcuts` | `bool` | `true` | Handles the viewer's built-in [keyboard shortcuts](navigation-and-search.md#keyboard-shortcuts). Set `false` so those keystrokes reach the host's own commands. |
| `IsArrowKeyNudgeEnabled` | `bool` | `true` | With an annotation selected, the arrow keys move it instead of navigating. |
| `SearchQuery` | `string?` | `null` | Text in the toolbar search box. |
| `SearchMatchCase` | `bool` | `false` | Case-sensitive option of the toolbar search box. |
| `SearchMatchWholeWord` | `bool` | `false` | Whole-word option of the toolbar search box. |
| `Strings` | `PdfViewerStrings` | `PdfViewerStrings.Default` | Every user-facing text. See [Localization](theming-and-localization.md#localization). |

### State

These properties are read-only and bindable.

| Property | Type | Description |
|---|---|---|
| `PageCount` | `int` | Number of pages in the loaded document. |
| `HasDocument` | `bool` | Whether a document is open. |
| `IsLoading` | `bool` | `true` while a document is loading. |
| `IsDirty` | `bool` | The document has edits not yet written. Cleared by a successful save and by loading another document. |
| `IsSidebarOpen` | `bool` | `true` when the sidebar is expanded. |
| `HasOutline` | `bool` | The document has a table of contents. |
| `HasBookmarks` | `bool` | The document has user bookmarks. |
| `HasSelection` | `bool` | Text is currently selected. |
| `SelectedText` | `string?` | The current text selection. |
| `SearchResults` | `IReadOnlyList<PdfSearchResult>?` | Results of the last search. |
| `SearchResultCount` | `int` | Number of search matches. |
| `CurrentSearchResultIndex` | `int` | Index of the highlighted match. |
| `ErrorMessage` | `string?` | Last error message. Shown as a dismissible banner over an open document, or as the canvas state after a failed load. Clear it with `ClearError()`. |
| `Metadata` | `PdfMetadata?` | Document metadata such as title and author. |
| `Permissions` | `PdfPermissions?` | Document permission flags. |
| `CanEditAnnotations` | `bool` | Annotations can be created and edited right now. |
| `CanPrint` | `bool` | A document is open and a print service or handler exists. |
| `CanShare` | `bool` | A document is open and a share service or handler exists. |
| `CanUndo` | `bool` | The undo history has an entry to apply. |
| `CanRedo` | `bool` | The redo history has an entry to apply. |

## Commands

All commands are `ICommand` and update `CanExecute` as document and selection state changes. Bind them from your own buttons if you hide the built-in toolbar.

| Command | Description |
|---|---|
| `ZoomInCommand`, `ZoomOutCommand`, `ResetZoomCommand` | Adjust the zoom. |
| `FitWidthCommand`, `FitPageCommand` | Apply a fit mode. |
| `NextPageCommand`, `PreviousPageCommand`, `GoToPageCommand` | Navigate between pages. |
| `SelectAllCommand`, `CopyCommand` | Select all text on the current page, copy the selection. |
| `OpenCommand`, `SaveCommand`, `SaveAsCommand` | File operations. See [Loading and saving](loading-and-saving.md). |
| `PrintCommand`, `ShareCommand` | See [Printing and sharing](printing-and-sharing.md). |
| `SetToolCommand` | Arms an annotation tool. The parameter is a `PdfViewerTool` value or its name. |
| `ToggleBookmarkCommand`, `AddBookmarkCommand`, `RemoveBookmarkCommand` | Change the bookmark on a page. The parameter is a 1-based page number, else the current page. |
| `DismissErrorCommand` | Clears `ErrorMessage`. |

```xml
<Button Content="Fit width" Command="{Binding #Viewer.FitWidthCommand}" />
<Button Content="Highlight" Command="{Binding #Viewer.SetToolCommand}" CommandParameter="Highlight" />
```

## Events

| Event | Args | Description |
|---|---|---|
| `DocumentLoaded` | `PdfDocumentLoadedEventArgs` | A document finished loading. Args include `PageCount` and `Metadata`. |
| `DocumentClosed` | `EventArgs` | The document was closed. |
| `LoadError` | `PdfLoadErrorEventArgs` | Document loading failed. |
| `AnnotationError` | `PdfAnnotationErrorEventArgs` | An annotation operation failed. Args include `Operation` and the underlying `Exception`. |
| `AnnotationAdded` | `PdfAnnotationEventArgs` | An annotation was added. |
| `PageChanged` | `PdfPageChangedEventArgs` | The current page changed. Args include `OldPage` and `NewPage`, 1-based. |
| `ZoomChanged` | `PdfZoomChangedEventArgs` | The zoom level changed. |
| `PageRendered` | `PdfPageRenderedEventArgs` | A page finished rendering. |
| `SearchCompleted` | `PdfSearchCompletedEventArgs` | A search finished. |
| `LinkClicked` | `PdfLinkClickedEventArgs` | A link was clicked. See [Links](navigation-and-search.md#links). |
| `BookmarksChanged` | `EventArgs` | A user bookmark was added or removed. |
| `UndoRedoStateChanged` | `EventArgs` | `CanUndo` or `CanRedo` changed. |
| `PrintRequested` | `PdfPrintRequestedEventArgs` | Raised before printing. Set `Handled` to print in the app instead of the platform service. |
| `ShareRequested` | `PdfShareRequestedEventArgs` | Raised before sharing. Set `Handled` to share in the app instead of the platform service. |
| `OpenRequested` | `PdfOpenRequestedEventArgs` | Raised before the built-in file picker. Set `Handled` to open in the app. |
| `SaveAsRequested` | `PdfSaveAsRequestedEventArgs` | Raised before the built-in save picker. Set `Handled` to write the PDF in the app. |

## Threading

Every public member of `PdfViewer` must be called on the UI thread. The `*Async` members throw if called from another thread. They do not block the UI while a page is decoding. PDFium itself is single-threaded, so several viewers in one process share one decode pipeline.

## See also

- [Loading and saving](loading-and-saving.md)
- [Navigation and search](navigation-and-search.md)
- [Annotations](annotations.md)
- [Printing and sharing](printing-and-sharing.md)
- [Theming and localization](theming-and-localization.md)
- [Platforms and performance](platforms-and-performance.md)
- [Installing Avalonia Pro](/tools/installing-avalonia-pro)
- [Troubleshooting](/troubleshooting/controls/pdfviewer)
