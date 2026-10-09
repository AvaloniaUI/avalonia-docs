---
id: navigation-and-search
title: Navigation, zoom and search
description: Navigate pages, zoom, follow links and bookmarks, search text and extract page content or images with the Avalonia PdfViewer control.
doc-type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

:::note Important
Navigation members use 1-based page numbers, matching `CurrentPage` and the page box in the toolbar. Annotation, text extraction and rendering members use 0-based page indexes.
:::

## Page navigation

| Member | Description |
|---|---|
| `CurrentPage` | Current page number, 1-based. Bindable in both directions. |
| `GoToPage(int pageNumber)` | Navigates to the specified page. |
| `NextPage()`, `PreviousPage()` | Navigates one page forward or back. |
| `GetPageLabel(int pageNumber)` | Returns the page's label from the document, such as `iv` or `A-2`, or `null` when it has none. Thumbnails and the page box use labels when present. |
| `PageChanged` | Raised when the current page changes. Args include `OldPage` and `NewPage`. |

```csharp
Viewer.PageChanged += (_, e) =>
    StatusText = $"Page {e.NewPage} of {Viewer.PageCount}";
```

## View modes

`ViewMode` selects how pages are laid out.

| Value | Description |
|---|---|
| `SinglePage` | One page at a time. Arrow keys and swipes move between pages. |
| `Continuous` | Pages are in a vertical scrolling column. Only pages near the viewport are decoded. |
| `TwoPages` | Two pages side by side. |
| `TwoPagesContinuous` | Two pages side by side in a scrolling column. |

## Zoom

| Member | Description |
|---|---|
| `ZoomLevel` | Zoom factor. `1.0` is 100%. Bindable in both directions. |
| `ZoomMode` | `Manual`, `FitWidth`, `FitPage`, `FitHeight` or `ActualSize`. |
| `MinZoom`, `MaxZoom` | Zoom bounds. |
| `ZoomStep` | Increment used by `ZoomIn` and `ZoomOut`. `0` uses the built-in adaptive step. |
| `ZoomIn()`, `ZoomOut()`, `ResetZoom()` | Adjusts the zoom. |
| `FitWidth()`, `FitPage()`, `FitHeight()` | Applies a fit mode to the zoom. |
| `ZoomChanged` | Raised when the zoom level changes. |

## Gestures

On touch devices and trackpads, the control handles the following gestures:

- Pinch to zoom
- Swipe between pages (in `SinglePage` and `TwoPages` view modes)
- Long press for contextual menu

## Outlines and links

`GetOutline()` returns the document's table of contents as a tree of `PdfBookmark` items, each with a `Title`, optional `PageIndex`, `Children` and optional `Destination`. The sidebar shows it in the **Table of Contents** tab when `IsTableOfContentsEnabled` is `true`. `HasOutline` reports whether the document has one.

| Member | Description |
|---|---|
| `GetOutline()` | Returns the document's table of contents. |
| `GoToBookmark(PdfBookmark)` | Navigates to an outline entry. This is its destination (page plus position) when it has one, else its page. |
| `NavigateTo(PdfLinkDestination)` | Navigates to a page destination, including its position and zoom if specified by the destination. Returns `false` for URI and file destinations. |

### Links

Links in the document are clickable. When clicking a link, `LinkClicked` is raised. The target is`Destination`, which is a `PdfLinkDestination.PageDestination`, `UriDestination` or `FileDestination`.

Unless a handler sets `Handled` to `true`:

- A page destination navigates within the document.
- An `http`, `https` or `mailto` URI opens in the system browser or mail client after the user confirms.
- File destinations and other URI schemes are raised but never opened by the viewer.

```csharp
Viewer.LinkClicked += (_, e) =>
{
    if (e.Destination is PdfLinkDestination.UriDestination uri
        && uri.Uri.StartsWith("myapp:"))
    {
        e.Handled = true;
        HandleDeepLink(uri.Uri);
    }
};
```

## Bookmarks

User bookmarks are separate from the document outline. They are stored in the PDF itself. The sidebar lists them in the **Bookmarks** tab when `IsBookmarksEnabled` is `true`.

`ShowBookmarkIndicators` draws a ribbon on bookmarked pages and thumbnails.

Bookmark changes are written by save and are not part of the undo history.

| Member | Description |
|---|---|
| `IsPageBookmarked(int pageNumber)` | Whether the specified page is bookmarked. |
| `AddBookmark(int pageNumber)`, `RemoveBookmark(int pageNumber)`, `ToggleBookmark(int pageNumber)` | Changes the bookmark status of a page. Returns whether anything changed. |
| `ToggleBookmarkCurrentPage()` | Toggles the bookmark on the current page. |
| `HasBookmarks` | Whether the document has any user bookmarks. |
| `BookmarksChanged` | Raised after any change. |

## Search

Each individual `PdfSearchResult` has a `PageIndex`, `CharIndex` and `CharCount` of the match, and its `Bounds` on the page.

| Member | Description |
|---|---|
| `SearchAsync(string query, SearchOptions? options = null)` | Searches the document. Returns the matches and highlights them on the pages. |
| `SearchAsync(string query, SearchOptions? options, CancellationToken)` | Searches the document, with the option to cancel. A cancelled search stops within a page. Returns the matches up till cancellation and highlights them on the pages. |
| `FindNext()`, `FindPrevious()` | Moves the active match. |
| `ClearSearch()` | Clears the matches and their highlights. |
| `SearchResults` | Matches of a search. |
| `SearchResultCount` | Number of matches. |
| `CurrentSearchResultIndex` | Index of the active match. |
| `SearchCompleted` | Raised when a search finishes. |

### Search options

The following `SearchOptions` are available. The toolbar search box is bound to `SearchQuery`, `SearchMatchCase` and `SearchMatchWholeWord`.

- `MatchCase`: Search matches uppercase/lowercase.
- `MatchWholeWord`: Search matches whole words.
- `StartPage`: A 0-based page index.
- `MaxResults`: Set `0` for unlimited results.

```csharp
var results = await Viewer.SearchAsync("invoice", new SearchOptions
{
    MatchCase = false,
    MatchWholeWord = true,
});

Console.WriteLine($"{results.Count} matches");
Viewer.FindNext();
```

## Text selection

Text selection cannot span pages. Setting `AllowTextSelection` to `false` disables selection entirely.

Selecting text shows a contextual menu with **Copy** and the text markup tools. See [Annotations](/controls/data-display/pdfviewer/annotations#markup-from-a-selection).

| Member | Description |
|---|---|
| `SelectAll()` | Selects all text on the current page. |
| `ClearSelection()` | Clears the selection. |
| `GetSelectedText()` | Returns the selected text. |
| `CopySelectionToClipboard()` | Copies the selection to the clipboard. |
| `HasSelection`, `SelectedText` | Current selection state. |

## Text extraction and page images

These members take 0-based page indexes.

| Member | Description |
|---|---|
| `GetPageTextAsync(int pageIndex, CancellationToken)` | Extracts the plain text of the specified page. Returns an empty string when no document is loaded or the index is out of range. |
| `GetTextAsync(CancellationToken)` | Extracts the whole document's text, one string per page. |
| `RenderPageToImageAsync(int pageIndex, double scale = 1.0, CancellationToken)` | Renders the specified page to a `Bitmap` at the given scale, where `1.0` is 100%. Returns `null` when no document is loaded or the index is out of range. |

```csharp
// Create a thumbnail of the first page for a file list
using var thumbnail = await Viewer.RenderPageToImageAsync(0, scale: 0.25);
```

:::tip
Dispose the bitmap after running `RenderPageToImageAsync`.
:::

## Keyboard shortcuts

Most shortcuts are enabled only when `EnableKeyboardShortcuts` is `true`. Set to `false` to keep these keystrokes for your own commands. Similarly, combinations not used by `PdfViewer`, such as <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd>, can be used by your own handlers.

See [Always on](#always-on) for exceptions that are unaffected by `EnableKeyboardShortcuts`.

Shortcuts in the tables below are listed with the <kbd>Ctrl</kbd> key. Unless otherwise specified, this can be directly substituted with <kbd>Cmd</kbd> on macOS.

| Shortcut | Action | Notes |
|---|---|---|
| <kbd>Ctrl</kbd>+<kbd>C</kbd> | Copy the selected text or annotation. | Only handled when something is selected. |
| <kbd>Ctrl</kbd>+<kbd>V</kbd> | Paste the copied annotation onto the current page. | Needs a copied annotation and `CanEditAnnotations`. |
| <kbd>Ctrl</kbd>+<kbd>A</kbd> | Select all text on the current page. | |
| <kbd>Ctrl</kbd>+<kbd>+</kbd> | Zoom in | Alternatives are <kbd>=</kbd> and the numeric keypad <kbd>+</kbd>. |
| <kbd>Ctrl</kbd>+<kbd>-</kbd> | Zoom out | Alternatives are <kbd>_</kbd> and the numeric keypad <kbd>-</kbd>. |
| <kbd>Ctrl</kbd>+<kbd>0</kbd> | Adjust zoom to actual size (100%). | |
| <kbd>Ctrl</kbd>+<kbd>1</kbd> | Adjust zoom to fit page. | |
| <kbd>Ctrl</kbd>+<kbd>2</kbd> | Adjust zoom to fit width. | |
| <kbd>Ctrl</kbd>+<kbd>D</kbd> | Bookmark the current page. | Add only. Does not remove. |
| <kbd>Ctrl</kbd>+<kbd>Z</kbd> | Undo | |
| Windows: <kbd>Ctrl</kbd>+<kbd>Y</kbd>, macOS: <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> | Redo | |
| <kbd>Ctrl</kbd>+<kbd>S</kbd> | Save to `Source`. | Only when the document can be saved. Otherwise left to the host. |
| <kbd>Delete</kbd>, <kbd>Backspace</kbd> | Delete the selected annotation. | Needs `CanEditAnnotations`. Undoable. |
| Arrow keys | Nudge the selected annotation by 1 px. | Can be disabled with `IsArrowKeyNudgeEnabled`. |
| <kbd>Shift</kbd> + arrow keys | Nudge the selected annotation by 10 px. | Can be disabled with `IsArrowKeyNudgeEnabled`. |
| <kbd>↑</kbd>, <kbd>↓</kbd> | Scroll in the continuous view modes. | |
| <kbd>←</kbd> / <kbd>↑</kbd>, <kbd>→</kbd> / <kbd>↓</kbd> | Previous / next page in single and two-page view modes. | |

### Always on

These keyboard shortcuts are always enabled and cannot be disabled by setting `EnableKeyboardShortcuts` to `false`.

| Shortcut | Action |
|---|---|
| <kbd>Esc</kbd> | Closes the contextual menu, clears the annotation or text selection, deactivates the active tool. Only marked handled when something changed. |
| <kbd>Esc</kbd> in a form field | Leaves form focus. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> in the viewer | Enters the first / last form field on the current page. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> in a form field | Next / previous form field. Leaves the viewer when there is no next field. |
| <kbd>Ctrl</kbd>+<kbd>A</kbd> in a form field | Select all text in the form field. |
| <kbd>Ctrl</kbd>+<kbd>C</kbd> in a form field | Copy text in the form field. |
| <kbd>Ctrl</kbd>+<kbd>X</kbd> in a form field | Cut text in the form field. |
| <kbd>Ctrl</kbd>+<kbd>V</kbd> in a form field | Paste text into the form field. |
| <kbd>Ctrl</kbd>+<kbd>Z</kbd> in a form field | Undo inside the form field. |
| Windows: <kbd>Ctrl</kbd>+<kbd>Y</kbd>, macOS: <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> in a form field | Redo inside the form field. |

### Inside the PDF viewer's chrome

`FocusViewer()` moves keyboard focus to the viewer so the shortcuts apply.

<table>
  <thead>
    <tr>
      <th>Where</th>
      <th>Shortcut</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">Inline text editor (text box or shape text)</td>
      <td><kbd>Esc</kbd></td>
      <td>Cancel</td>
    </tr>
    <tr>
      <td><kbd>Ctrl</kbd>+<kbd>Enter</kbd></td>
      <td>Commit</td>
    </tr>
    <tr>
      <td rowspan="2">Search box</td>
      <td><kbd>Enter</kbd></td>
      <td>Next result</td>
    </tr>
    <tr>
      <td><kbd>Esc</kbd></td>
      <td>Clear and close</td>
    </tr>
    <tr>
      <td rowspan="2">Page number box</td>
      <td><kbd>Enter</kbd></td>
      <td>Commit</td>
    </tr>
    <tr>
      <td><kbd>Esc</kbd></td>
      <td>Revert</td>
    </tr>
    <tr>
      <td rowspan="2">Link URL dialog, password, go-to-page, custom zoom overlays</td>
      <td><kbd>Enter</kbd></td>
      <td>Commit</td>
    </tr>
    <tr>
      <td><kbd>Esc</kbd></td>
      <td>Cancel</td>
    </tr>
    <tr>
      <td>Hex color input</td>
      <td><kbd>Enter</kbd></td>
      <td>Apply color</td>
    </tr>
  </tbody>
</table>

## See also

- [PdfViewer control](/controls/data-display/pdfviewer/)
- [Annotations](/controls/data-display/pdfviewer/annotations)
- [Platforms and performance](/controls/data-display/pdfviewer/platforms-and-performance)