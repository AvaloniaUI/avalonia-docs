---
id: storage-provider
title: Storage Provider
---

The `StorageProvider` is central to file and folder management. It provides methods for file and folder selection, checking platform capabilities, and interacting with stored bookmarks.

The `StorageProvider` can be access through an instance of `TopLevel` or `Window`, for more details on accessing `TopLevel` please visit [TopLevel](/docs/fundamentals/top-level) page.

```csharp
var storage = window.StorageProvider;
```

## Properties

### CanOpen
Indicates whether it's possible to open a `open file picker` on the current platform.

```csharp
bool CanOpen { get; }
```

### CanSave
Indicates whether it's possible to open a `save file picker` on the current platform.

```csharp
bool CanSave { get; }
```

### CanPickFolder
Indicates whether it's possible to open a `folder picker` on the current platform.

```csharp
bool CanPickFolder { get; }
```

## Methods

### OpenFilePickerAsync
Opens a file picker dialog.

```csharp
Task<IReadOnlyList<IStorageFile>> OpenFilePickerAsync(FilePickerOpenOptions options);
```
The method returns an array of selected `IStorageFile` instances or an empty collection if the user cancels the dialog.

### SaveFilePickerAsync
Opens a save file picker dialog.

```csharp
Task<IStorageFile?> SaveFilePickerAsync(FilePickerSaveOptions options);
```
The method returns a saved `IStorageFile` instance or null if the user cancels the dialog.

### SaveFilePickerWithResultAsync
Opens a save file picker dialog and returns the selected file type filter alongside the file.

```csharp
Task<SaveFilePickerResult> SaveFilePickerWithResultAsync(FilePickerSaveOptions options);
```
The method returns a `SaveFilePickerResult` struct. Its `StorageFile` property contains the saved file (or `null` if cancelled), and `SelectedFileType` contains the `FilePickerFileType` the user selected in the dialog.

### OpenFolderPickerAsync
Opens a folder picker dialog.

```csharp
Task<IReadOnlyList<IStorageFolder>> OpenFolderPickerAsync(FolderPickerOpenOptions options);
```
The method returns an array of selected `IStorageFolder` instances or an empty collection if the user cancels the dialog.

### OpenFileBookmarkAsync
Opens a `IStorageBookmarkFile` from the bookmark ID.

```csharp
Task<IStorageBookmarkFile?> OpenFileBookmarkAsync(string bookmark);
```
The method returns a bookmarked file or null if the operating system denied the request.

### OpenFolderBookmarkAsync
Opens a `IStorageBookmarkFolder` from the bookmark ID.

```csharp
Task<IStorageBookmarkFolder?> OpenFolderBookmarkAsync(string bookmark);
```
The method returns a bookmarked folder or null if the operating system denied the request.

### TryGetFileFromPathAsync
Attempts to read a file from the file system by its path.

```csharp
Task<IStorageFile?> TryGetFileFromPathAsync(Uri filePath);
```
The method returns a file or null if it doesn't exist. The filePath parameter is expected to be an absolute path with a "file" scheme, but can be a URI with a "content" scheme on Android.

### TryGetFolderFromPathAsync
Attempts to read a folder from the file system by its path.

```csharp
Task<IStorageFolder?> TryGetFolderFromPathAsync(Uri folderPath);
```
The method returns a folder or null if it doesn't exist. The folderPath parameter is expected to be an absolute path with a "file" scheme, but can be a URI with a "content" scheme on Android.

### TryGetWellKnownFolderAsync
Attempts to read a folder from the file system by its well-known folder identifier.

```csharp
Task<IStorageFolder?> TryGetWellKnownFolderAsync(WellKnownFolder wellKnownFolder);
```
The method returns a folder or null if it doesn't exist.

## Extension methods

### TryGetFileFromPathAsync
Attempts to read a file from the file system by its path.

```csharp
Task<IStorageFile?> TryGetFileFromPathAsync(this IStorageProvider provider, string filePath);
```
The method returns a file or null if it doesn't exist.
This method accepts local file path string as a parameter without any scheme.
Only supported on the OS, with physical file paths, primarily only desktop.

### TryGetFolderFromPathAsync
Attempts to read a folder from the file system by its path.

```csharp
Task<IStorageFolder?> TryGetFolderFromPathAsync(this IStorageProvider provider, string folderPath);
```
The method returns a folder or null if it doesn't exist. 
This method accepts local folder path string as a parameter without any scheme.
Only supported on the OS, with physical file paths, primarily only desktop.

## Platform compatibility

| Feature        | Managed |  Windows | macOS | Linux | Browser | Android |  iOS |
|---------------|-------|-------|-------|-------|-------|-------|-------|
| `OpenFileBookmarkAsync` | ✓* | ✓* | ✓* | ✓* | ✓ | ✓ | ✓ |
| `OpenFolderBookmarkAsync` | ✓* | ✓* | ✓* | ✓* | ✓ | ✓ | ✓ |
| `OpenFilePickerAsync` | ✓** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `SaveFilePickerAsync` | ✓** | ✓ | ✓ | ✓ | ✓*** | ✓ | ✓ |
| `SaveFilePickerWithResultAsync` | ✓** | ✓ | ✓ | ✓ | ✓*** | ✓ | ✓ |
| `OpenFolderPickerAsync` | ✓** | ✓ | ✓ | ✓ | ✓*** | ✓ | ✓ |
| `TryGetFileFromPathAsync` | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `TryGetFolderFromPathAsync` | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `TryGetWellKnownFolderAsync` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

\* Bookmarks are not properly supported on desktop platforms and instead return file path instead. macOS support is planned to get it work with Sandboxed Apple Store apps.

** Managed file picker works only on desktop platforms where it's possible to open a custom window.

*** Only Chromium based browsers have a proper support for file pickers.

## See also

- [File Dialogs](/docs/services/file-dialogs): Common file dialog usage examples.
- [File Picker Options](file-picker-options): Configuring file type filters and dialog options.
- [Bookmarks](bookmarks): Persisting access to picked files and folders.
- [Storage Items](storage-item): Working with files and folders returned by the storage provider.
