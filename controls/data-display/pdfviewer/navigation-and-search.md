---
id: navigation-and-search
title: Navigation, zoom and search
description: Navigate pages, zoom, follow links and bookmarks, search text and extract page content or images with the Avalonia PdfViewer control.
doc-type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

:::note
Navigation members use 1-based page numbers, matching `CurrentPage` and the page box in the toolbar. Annotation, text extraction and rendering members use 0-based page indexes.
:::

## Page navigation

| Member | Description |
|---|---|
| `CurrentPage` | The current page number, 1-based. Bindable in both directions. |
| `GoToPage(int pageNumber)` | Navigates to a page. |
| `NextPage()` / `PreviousPage()` | Navigates forward or back. |
| `GetPageLabel(int pageNumber)` | The page's label from the document, such as `iv` or `A-2`, or `null` when it has none. Thumbnails and the page box use labels when present. |
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
| `Continuous` | Pages in a vertical scrolling column. Only pages near the viewport are decoded. |
| `TwoPages` | Two pages side by side. |
| `TwoPagesContinuous` | Two pages side by side in a scrolling column. |

## Zoom

| Member | Description |
|---|---|
| `ZoomLevel` | The zoom factor. `1.0` is 100%. Bindable in both directions. |
| `ZoomMode` | `Manual`, `FitWidth`, `FitPage`, `FitHeight` or `ActualSize`. |
| `MinZoom` / `MaxZoom` | Zoom bounds. |
| `ZoomStep` | Increment used by `ZoomIn` and `ZoomOut`. `0` uses the built-in adaptive step. |
| `ZoomIn()` / `ZoomOut()` / `ResetZoom()` | Adjusts the zoom. |
| `FitWidth()` / `FitPage()` / `FitHeight()` | Applies a fit mode. |
| `ZoomChanged` | Raised when the zoom level changes. |

Pinch to zoom, swipe between pages in the single and two-page modes, and long-press for the context menu are handled by the control on touch and trackpad.

## Outline and links

`GetOutline()` returns the document's table of contents as a tree of `PdfBookmark` items, each with a `Title`, an optional `PageIndex`, `Children` and an optional `Destination`. The sidebar shows it in the **Table of Contents** tab when `IsTableOfContentsEnabled` is `true`. `HasOutline` reports whether the document has one.

| Member | Description |
|---|---|
| `GetOutline()` | The document's table of contents. |
| `GoToBookmark(PdfBookmark)` | Navigates to an outline entry: its destination (page plus position) when it has one, else its page. |
| `NavigateTo(PdfLinkDestination)` | Navigates to a page destination, including its position and zoom when the destination specifies them. Returns `false` for URI and file destinations. |

### Links

Links in the page are clickable. `LinkClicked` is raised first, with the target in `Destination`, which is a `PdfLinkDestination.PageDestination`, `UriDestination` or `FileDestination`. Unless a handler sets `Handled` to `true`:

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

## User bookmarks

User bookmarks are separate from the document outline. They are stored in the PDF itself, in the format macOS Preview uses, so both applications see the same bookmarks. The sidebar lists them in the **Bookmarks** tab when `IsBookmarksEnabled` is `true`, and `ShowBookmarkIndicators` draws a ribbon on bookmarked pages and thumbnails.

| Member | Description |
|---|---|
| `IsPageBookmarked(int pageNumber)` | Whether the page is bookmarked. |
| `AddBookmark(int pageNumber)` / `RemoveBookmark(int pageNumber)` / `ToggleBookmark(int pageNumber)` | Changes the bookmark on a page. Returns whether anything changed. |
| `ToggleBookmarkCurrentPage()` | Toggles the bookmark on the current page. |
| `HasBookmarks` | Whether the document has any user bookmarks. |
| `BookmarksChanged` | Raised after any change. |

Bookmark changes are written by the next save and are not part of the undo history.

## Search

| Member | Description |
|---|---|
| `SearchAsync(string query, SearchOptions? options = null)` | Searches the document. Returns the matches and highlights them on the pages. |
| `SearchAsync(string query, SearchOptions? options, CancellationToken)` | The same with cancellation. Matches appear page by page as the search runs. |
| `FindNext()` / `FindPrevious()` | Moves the active match. |
| `ClearSearch()` | Clears the matches and their highlights. |
| `SearchResults` | The matches of the last search. |
| `SearchResultCount` | The number of matches. |
| `CurrentSearchResultIndex` | The index of the active match. |
| `SearchCompleted` | Raised when a search finishes. |

`SearchOptions` has `MatchCase`, `MatchWholeWord`, `StartPage` (a 0-based page index) and `MaxResults` (`0` for unlimited). Each `PdfSearchResult` has a `PageIndex`, the `CharIndex` and `CharCount` of the match, and its `Bounds` on the page.

The toolbar search box is bound to `SearchQuery`, `SearchMatchCase` and `SearchMatchWholeWord`.

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

A selection cannot span pages. `AllowTextSelection` turns selection off entirely.

| Member | Description |
|---|---|
| `SelectAll()` | Selects all text on the current page. |
| `ClearSelection()` | Clears the selection. |
| `GetSelectedText()` | Returns the selected text. |
| `CopySelectionToClipboard()` | Copies the selection to the clipboard. |
| `HasSelection` / `SelectedText` | The current selection state. |

Selecting text shows a context menu with **Copy** and the text markup tools. See [Annotations](annotations.md#markup-from-a-selection).

## Text extraction and page images

These members take 0-based page indexes.

| Member | Description |
|---|---|
| `GetPageTextAsync(int pageIndex, CancellationToken)` | Extracts one page's plain text. Returns an empty string when no document is loaded or the index is out of range. |
| `GetTextAsync(CancellationToken)` | Extracts the whole document's text, one string per page. |
| `RenderPageToImageAsync(int pageIndex, double scale = 1.0, CancellationToken)` | Renders a page to a `Bitmap` at the given scale, where `1.0` is 100%. Returns `null` when no document is loaded or the index is out of range. Dispose the bitmap when you are done with it. |

```csharp
// A thumbnail of the first page for a file list
using var thumbnail = await Viewer.RenderPageToImageAsync(0, scale: 0.25);
```

## Keyboard shortcuts

<kbd>Cmd</kbd> is <kbd>⌘</kbd> on macOS and iOS and <kbd>Ctrl</kbd> everywhere else. Modifiers are matched exactly, so a combination the viewer does not list, such as <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd>, reaches your own handlers.

### Document shortcuts

These require `EnableKeyboardShortcuts`. Set it to `false` to keep these keystrokes for your own commands. Form input and <kbd>Esc</kbd> are unaffected.

| Shortcut | Action | Notes |
|---|---|---|
| <kbd>Cmd</kbd>+<kbd>C</kbd> | Copy the selected annotation, else the selected text | Only handled when something is selected |
| <kbd>Cmd</kbd>+<kbd>V</kbd> | Paste the copied annotation onto the current page | Needs a copied annotation and `CanEditAnnotations` |
| <kbd>Cmd</kbd>+<kbd>A</kbd> | Select all text on the current page | |
| <kbd>Cmd</kbd>+<kbd>+</kbd> | Zoom in | <kbd>=</kbd> and the numeric keypad <kbd>+</kbd> also work |
| <kbd>Cmd</kbd>+<kbd>-</kbd> | Zoom out | <kbd>_</kbd> and the numeric keypad <kbd>-</kbd> also work |
| <kbd>Cmd</kbd>+<kbd>0</kbd> | Actual size (100%) | |
| <kbd>Cmd</kbd>+<kbd>1</kbd> | Fit page | |
| <kbd>Cmd</kbd>+<kbd>2</kbd> | Fit width | |
| <kbd>Cmd</kbd>+<kbd>D</kbd> | Bookmark the current page | Add only. Remove from the **Bookmarks** tab or the API |
| <kbd>Cmd</kbd>+<kbd>Z</kbd> | Undo | |
| <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd>, <kbd>Ctrl</kbd>+<kbd>Y</kbd> | Redo | |
| <kbd>Cmd</kbd>+<kbd>S</kbd> | Save to `Source` | Only when the document can be saved, otherwise left to the host |
| <kbd>Delete</kbd>, <kbd>Backspace</kbd> | Delete the selected annotation | Needs `CanEditAnnotations`. Undoable |
| Arrow keys | Nudge the selected annotation by 1 px | <kbd>Shift</kbd> nudges 10 px. Opt out with `IsArrowKeyNudgeEnabled` |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Scroll in the continuous view modes | |
| <kbd>←</kbd> / <kbd>↑</kbd>, <kbd>→</kbd> / <kbd>↓</kbd> | Previous / next page in the single and two-page modes | |

### Always on

These are not affected by `EnableKeyboardShortcuts`.

| Shortcut | Action |
|---|---|
| <kbd>Esc</kbd> | Closes the context menu, clears the annotation or text selection, deactivates the active tool. Only marked handled when something changed |
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> onto the viewer | Enters the first / last form field on the current page |
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> in a form field | Next / previous field. Leaves the viewer when there is no next field |
| <kbd>Esc</kbd> in a form field | Leaves form focus |
| <kbd>Cmd</kbd>+<kbd>A</kbd>, <kbd>Cmd</kbd>+<kbd>C</kbd>, <kbd>Cmd</kbd>+<kbd>X</kbd>, <kbd>Cmd</kbd>+<kbd>V</kbd> in a form field | Select all, copy, cut and paste the field's text |
| <kbd>Cmd</kbd>+<kbd>Z</kbd>, <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> in a form field | Undo and redo inside the field |

### Inside the viewer's own chrome

| Where | Keys |
|---|---|
| Inline text editor (text box or shape text) | <kbd>Esc</kbd> cancels, <kbd>Ctrl</kbd>+<kbd>Enter</kbd> commits |
| Search box | <kbd>Enter</kbd> goes to the next result, <kbd>Esc</kbd> clears and closes |
| Page number box | <kbd>Enter</kbd> commits, <kbd>Esc</kbd> reverts |
| Link URL dialog, password, go-to-page and custom zoom overlays | <kbd>Enter</kbd> confirms, <kbd>Esc</kbd> cancels |
| Hex colour inputs | <kbd>Enter</kbd> applies |

`FocusViewer()` moves keyboard focus to the viewer so the shortcuts apply.

## See also

- [PdfViewer control](index.md)
- [Annotations](annotations.md)
- [Platforms and performance](platforms-and-performance.md)
