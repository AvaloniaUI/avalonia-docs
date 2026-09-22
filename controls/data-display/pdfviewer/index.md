---
id: index
title: PdfViewer control
description: Display, search, annotate, fill and print PDF documents in Avalonia with the PdfViewer control.
doc-type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`PdfViewer` displays PDF documents in your Avalonia application. It is a complete reader out of the box, requiring only a document source to be set. The viewer includes many common PDF tools and functions, such as page thumbnails, zoom and view modes, text selection and search, form filling, bookmarks, native printing, and more.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## When to use

Use `PdfViewer` to show PDF documents inside your app. You can choose to enable or disable each tool and menu item, meaning it can work as a read-only viewer or an interactive editor.

## Requirements

- .NET 10 or later.
- Avalonia 12.0 or later.
- An Avalonia Pro or Enterprise license that covers the PDF Viewer.
- Windows, macOS, Linux (x64 and arm64), iOS 15 or later, Android API 23 or later, or WebAssembly.

## Dependencies

The package renders with [PDFium](https://pdfium.googlesource.com/pdfium/), which is bundled as a native library through the `bblanchon.PDFium.*` NuGet packages. Each target framework depends only on the packages for its own platforms.

| Target | Packages |
|---|---|
| `net10.0` (Windows, macOS, Linux) | `Avalonia`, `AvaloniaUI.Licensing`, `bblanchon.PDFium.Win32`, `bblanchon.PDFium.macOS`, `bblanchon.PDFium.Linux` |
| `net10.0-ios` | `Avalonia`, `AvaloniaUI.Licensing`, `bblanchon.PDFium.iOS` |
| `net10.0-android` | `Avalonia`, `Avalonia.Android`, `AvaloniaUI.Licensing`, `bblanchon.PDFium.Android` |
| `net10.0-browser` | `Avalonia`, `AvaloniaUI.Licensing`, `bblanchon.PDFium.WebAssembly` |

PDFium is licensed under the [BSD 3-Clause License](https://pdfium.googlesource.com/pdfium/+/refs/heads/main/LICENSE).You must include its notice in your application's third-party attributions.

## Getting started

1. Install the `Avalonia.Controls.PdfViewer` NuGet package by running `dotnet add package`. Add it to the project that contains your views and to each application head (desktop, iOS, Android, browser). This ensurea each head restores the required PDFium binaries for its own platform.

```bash
dotnet add package Avalonia.Controls.PdfViewer
```

2. Reference the `AvaloniaUI.Licensing` package in each application head. Include your Avalonia license key in the executable project file (`.csproj`). Your license key is available from the [Avalonia portal](https://portal.avaloniaui.net).

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

Reference the TreeDataGrid fluent theme via a StyleInclude in your App.axaml file. This adds the resources needed to render the control.

3. Reference one of the two available `PdfViewer` themes via a `StyleInclude` in your `App.axaml` file. Without a theme, the control cannot render. `Default.axaml` has its own palette. `Fluent.axaml` follows the host's `FluentTheme`.

```xml
<Application.Styles>
    <FluentTheme />
    // highlight-next-line
    <StyleInclude Source="avares://Avalonia.Controls.PdfViewer/Themes/Default.axaml" />
</Application.Styles>
```

For more information on installing Avalonia Pro controls, see [Installing Avalonia Pro](/tools/installing-avalonia-pro).

## Basic usage

`PdfViewer` lives in the `Avalonia.Controls` namespace. Its package name is `Avalonia.Controls.PdfViewer`.

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
using Avalonia.Controls;          // PdfViewer
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
| `DocumentSource` | `object?` | `null` | Flexible source. Can be a file path `string`, a `Stream`, or a `byte[]`. |
| `Password` | `string?` | `null` | Password for encrypted PDFs. |
| `CurrentPage` | `int` | `0` | Current page number. 1-based when a document is open, `0` when not. Coerced to a range of 1 to `PageCount`. |
| `ZoomLevel` | `double` | `1.0` | Zoom level. `1.0` is 100%. |
| `ZoomMode` | `PdfZoomMode` | `FitPage` | `Manual`, `FitWidth`, `FitPage`, `FitHeight` or `ActualSize`. |
| `MinZoom` | `double` | `0.05` | Lower zoom bound. |
| `MaxZoom` | `double` | `5.0` | Upper zoom bound. |
| `ZoomStep` | `double` | `0.0` | Increment applied by `ZoomIn` and `ZoomOut`. `0` uses the built-in adaptive step. |
| `ViewMode` | `PdfViewMode` | `Continuous` | `SinglePage`, `Continuous`, `TwoPages` or `TwoPagesContinuous`. |
| `PageRenderBuffer` | `int` | `2` | Pages decoded on each side of the viewport in continuous mode. Only accepts values from 0 to 10. |
| `PageRetentionBuffer` | `int` | `4` | Pages kept decoded on each side before eviction. Only accepts values from 0 to 20. |
| `MaxRenderScale` | `double` | `2.0` | Upper bound on device pixels per DIP used when decoding a page. Coerced to 1 to 4. |
| `VerticalScrollOffset` | `double` | | Current vertical scroll offset. |

### Sidebar and toolbar

| Property | Type | Default | Description |
|---|---|---|---|
| `SidebarMode` | `SidebarMode` | `Thumbnails` | `None`, `Thumbnails`, `TableOfContents` or `Bookmarks`. |
| `IsSidebarVisible` | `bool` | `true` | Shows or hides the sidebar. |
| `SidebarWidth` | `double` | `210` | Sidebar width in device-independent pixels. |
| `SidebarPlacement` | `SidebarPlacement` | `Auto` | `Auto`, `Overlay` or `Offset`. `Auto` displays as overlay in mobile layout, and offset in desktop layout. |
| `SidebarSelectionBrush` | `IBrush?` | `null` | Brush of the selected thumbnail and outline entry. `null` uses the theme's `PdfThumbnailSelectedBorder` resource. |
| `IsTableOfContentsEnabled` | `bool` | `true` | Enables the outline tab in the sidebar. |
| `IsBookmarksEnabled` | `bool` | `true` | Enables the bookmarks tab in the sidebar. |
| `ShowBookmarkIndicators` | `bool` | `true` | Draws a ribbon on bookmarked pages and thumbnails. |
| `IsToolbarVisible` | `bool` | `true` | Shows or hides the toolbar. |
| `IsMoreOptionsVisible` | `bool` | `true` | Shows or hides the toolbar's **More Options** menu, which contains print, share, and view modes. |
| `IsPrintVisible` | `bool` | `true` | Enables **Print** in the **More Options** menu. Always hidden when nothing can print. |
| `IsShareVisible` | `bool` | `true` | Enables **Share** in the **More Options** menu. Always hidden when nothing can share. |
| `IsOpenVisible` | `bool` | `false` | Enables **Open** in the **More Options** menu. |
| `IsSaveVisible` | `bool` | `false` | Enables **Save** in the **More Options** menu. Always hidden while `AllowDocumentSaving` is `false`. |
| `IsSaveAsVisible` | `bool` | `false` | Enables **Save As** in the **More Options** menu. |
| `PrintService` | `IPrintService?` | unset | Print implementation. Unset uses the built-in platform service. `null` disables it. |
| `ShareService` | `IShareService?` | unset | Share implementation. Unset uses the built-in platform service. `null` disables it. |
| `ToolbarLayoutMode` | `PdfToolbarLayoutMode` | `Auto` | `Auto` picks the layout from the platform and width. `Mobile` and `Desktop` force one. |
| `IsMobileLayout` | `bool` | | Whether the compact mobile layout is active. Set by the control: `true` on iOS and Android, and on any platform when the control is narrower than 500 device-independent pixels. |
<br />

Each tool has its own visibility property, allowing you to decide exactly which tools the toolbar offers. See [Toolbar visibility](/controls/data-display/pdfviewer/annotations#tool-visibility) for the full list of properties.

### Capabilities and permissions

| Property | Type | Default | Description |
|---|---|---|---|
| `IsReadOnly` | `bool` | `false` | Disables annotations and form editing when `true`. Does not affect saving, which is controlled by `AllowDocumentSaving` (see below). |
| `AllowTextSelection` | `bool` | `true` | Enables text selection and copy. |
| `AllowAnnotationEditing` | `bool` | `true` | Enables creating and editing annotations. |
| `AllowFormEditing` | `bool` | `true` | Enables interactive form field editing. |
| `AllowDocumentSaving` | `bool` | `true` | Enables saving. Gates `SaveCommand` and `SaveAsync`. |
| `RespectDocumentPermissions` | `bool` | `true` | Honors the document's permission flags for annotation, form filling, copying and printing. A document opened with its owner password is always unrestricted. |
| `AutoSave` | `bool` | `false` | Saves back to `Source` after each edit. Requires `AllowDocumentSaving` to be `true`. |
| `EnableKeyboardShortcuts` | `bool` | `true` | Handles the viewer's built-in [keyboard shortcuts](/controls/data-display/pdfviewer/navigation-and-search#keyboard-shortcuts). Set `false` to allow keystrokes to reach the host's own commands. |
| `IsArrowKeyNudgeEnabled` | `bool` | `true` | If enabled, annotations can be moved with the arrow keys when selected. |
| `SearchQuery` | `string?` | `null` | Text in the toolbar search box. |
| `SearchMatchCase` | `bool` | `false` | Whether search should match uppercase/lowercase. |
| `SearchMatchWholeWord` | `bool` | `false` | Whether search should match whole words. |
| `Strings` | `PdfViewerStrings` | `PdfViewerStrings.Default` | User-facing text. See [Localization](/controls/data-display/pdfviewer/theming-and-localization#localization). |

### State

These properties are read-only but [can be bound](/docs/data-binding/introduction-to-data-binding).

| Property | Type | Description |
|---|---|---|
| `PageCount` | `int` | Number of pages in the loaded document. |
| `HasDocument` | `bool` | Whether a document is open. |
| `IsLoading` | `bool` | `true` while a document is loading. |
| `IsDirty` | `bool` | `true` while the document has unsaved edits. Cleared by a successful save or by loading another document. |
| `IsSidebarOpen` | `bool` | `true` when the sidebar is expanded. |
| `HasOutline` | `bool` | `true` when the document has a table of contents. |
| `HasBookmarks` | `bool` | `true` when the document has bookmarks. |
| `HasSelection` | `bool` | `true` when text is selected. |
| `SelectedText` | `string?` | The current text selection. |
| `SearchResults` | `IReadOnlyList<PdfSearchResult>?` | Results of search. |
| `SearchResultCount` | `int` | Number of search matches. |
| `CurrentSearchResultIndex` | `int` | Index of the highlighted search match. |
| `ErrorMessage` | `string?` | Last error message. Shown as a dismissible banner over an open document, or as the canvas state after a failed load. Can be cleared with `ClearError()`. |
| `Metadata` | `PdfMetadata?` | Document metadata, such as title and author. |
| `Permissions` | `PdfPermissions?` | Document permission flags. |
| `CanEditAnnotations` | `bool` | `true` when annotations can be created or edited. |
| `CanPrint` | `bool` | `true` when a document is open and a print service or handler exists. |
| `CanShare` | `bool` | `true` when a document is open and a share service or handler exists. |
| `CanUndo` | `bool` | Undo history has an entry that can be applied. |
| `CanRedo` | `bool` | Redo history has an entry that can be applied. |

## Commands

All commands are `ICommand` and update `CanExecute` as document and selection states change.

| Command | Description |
|---|---|
| `ZoomInCommand`, `ZoomOutCommand`, `ResetZoomCommand` | Adjust the zoom. |
| `FitWidthCommand`, `FitPageCommand` | Apply a fit mode. |
| `NextPageCommand`, `PreviousPageCommand`, `GoToPageCommand` | Navigate between pages. |
| `SelectAllCommand` | Select all text on the current page. |
| `CopyCommand` | Copy the selection. |
| `OpenCommand`, `SaveCommand`, `SaveAsCommand` | File operations. See [Loading and saving](/controls/data-display/pdfviewer/loading-and-saving). |
| `PrintCommand` | Print the document, See [Printing and sharing](/controls/data-display/pdfviewer/printing-and-sharing). |
| `ShareCommand` | Share the document, See [Printing and sharing](/controls/data-display/pdfviewer/printing-and-sharing). |
| `SetToolCommand` | Arms an annotation tool. The parameter is a `PdfViewerTool` value or its name. |
| `ToggleBookmarkCommand`, `AddBookmarkCommand`, `RemoveBookmarkCommand` | Change the bookmark on a page. The parameter is a 1-based page number, else the current page. |
| `DismissErrorCommand` | Clears `ErrorMessage`. |

### Binding commands to controls

You can bind commands to your own controls (e.g., a button) if you wish to customize the UI beyond the built-in toolbar. For example:

```xml
<Button Content="Fit width" Command="{Binding #Viewer.FitWidthCommand}" />
<Button Content="Highlight" Command="{Binding #Viewer.SetToolCommand}" CommandParameter="Highlight" />
```

## Events

| Event | Args | Description |
|---|---|---|
| `DocumentLoaded` | `PdfDocumentLoadedEventArgs` | Document finished loading. Args include `PageCount` and `Metadata`. |
| `DocumentClosed` | `EventArgs` | Document was closed. |
| `LoadError` | `PdfLoadErrorEventArgs` | Document loading failed. |
| `AnnotationError` | `PdfAnnotationErrorEventArgs` | Annotation operation failed. Args include `Operation` and `Exception`. |
| `AnnotationAdded` | `PdfAnnotationEventArgs` | Annotation was added. |
| `PageChanged` | `PdfPageChangedEventArgs` | Current page changed. Args include `OldPage` and `NewPage`, 1-based. |
| `ZoomChanged` | `PdfZoomChangedEventArgs` | Zoom level changed. |
| `PageRendered` | `PdfPageRenderedEventArgs` | Page finished rendering. |
| `SearchCompleted` | `PdfSearchCompletedEventArgs` | Search finished. |
| `LinkClicked` | `PdfLinkClickedEventArgs` | Link was clicked. See [Links](/controls/data-display/pdfviewer/navigation-and-search#links). |
| `BookmarksChanged` | `EventArgs` | Bookmark was added or removed. |
| `UndoRedoStateChanged` | `EventArgs` | Value(s) of `CanUndo` or `CanRedo` changed. |
| `PrintRequested` | `PdfPrintRequestedEventArgs` | Raised before printing. Set `Handled` to print in the app instead of the platform service. |
| `ShareRequested` | `PdfShareRequestedEventArgs` | Raised before sharing. Set `Handled` to share in the app instead of the platform service. |
| `OpenRequested` | `PdfOpenRequestedEventArgs` | Raised before going to the built-in file dialog. Set `Handled` to open in the app. |
| `SaveAsRequested` | `PdfSaveAsRequestedEventArgs` | Raised before going to the built-in save dialog. Set `Handled` to write the PDF in the app. |

## Threading

Every public member of `PdfViewer` must be called on the UI thread. The `*Async` members throw if called from another thread. They do not block the UI while a page is decoding.

PDFium itself is single-threaded, so several viewers in one process share one pipeline.

## See also

- [Loading and saving](/controls/data-display/pdfviewer/loading-and-saving)
- [Navigation and search](/controls/data-display/pdfviewer/navigation-and-search)
- [Annotations](/controls/data-display/pdfviewer/annotations)
- [Printing and sharing](/controls/data-display/pdfviewer/printing-and-sharing)
- [Theming and localization](/controls/data-display/pdfviewer/theming-and-localization)
- [Platforms and performance](/controls/data-display/pdfviewer/platforms-and-performance)
- [Installing Avalonia Pro](/tools/installing-avalonia-pro)
- [Troubleshooting](/troubleshooting/controls/pdfviewer)
