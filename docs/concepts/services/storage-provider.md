---
id: storage-provider
title: StorageProvider
---

# StorageProvider

The `StorageProvider` is central to file and folder management. It provides methods for file and folder selection, checking platform capabilities, and interacting with stored bookmarks.

The `StorageProvider` can be access through an instance of `TopLevel` or directly from the `Window` class, as it inherits from `TopLevel`. Here are two common ways to access to the `StorageProvider`. 

### Using TopLevel.GetTopLevel
You can use the static `GetTopLevel` method of the TopLevel class to get the top-level control that contains the current control. After obtaining the `TopLevel` instance, you can then access the `StorageProvider`:

```cs
var topLevel = TopLevel.GetTopLevel(control);
var result = topLevel.StorageProvider.OpenFilePickerAsync(new FilePickerOpenOptions
{
    Title = "Open Text File",
    AllowMultiple = false
});
```
This method can be helpful if you're working within a user control or a lower-level component and need access to the `StorageProvider`.

### Using the Window Class

Since the`Window` class inherits from `TopLevel`, you can directly access the `StorageProvider` from an instance of `Window`:

```cs
var result = window.StorageProvider.OpenFilePickerAsync(new FilePickerOpenOptions
{
    Title = "Open Text File",
    AllowMultiple = false
});
```

This method is typically used when you're already working within the context of a window, such as in a ViewModel or an event handler within the `Window` class.


## Properties 

### CanOpen
Indicates whether it's possible to open a file picker on the current platform.

```cs
bool CanOpen { get; }
```

### CanSave
Indicates whether it's possible to open a save file picker on the current platform.

```cs
bool CanSave { get; }
```

### CanPickFolder
Indicates whether it's possible to open a folder picker on the current platform.

```cs
bool CanPickFolder { get; }
```

## Methods

### OpenFilePickerAsync
Opens a file picker dialog.

```cs
Task<IReadOnlyList<IStorageFile>> OpenFilePickerAsync(FilePickerOpenOptions options);
```
The method returns an array of selected `IStorageFile` instances or an empty collection if the user cancels the dialog.

### SaveFilePickerAsync
Opens a save file picker dialog.

```cs
Task<IStorageFile?> SaveFilePickerAsync(FilePickerSaveOptions options);
```
The method returns a saved `IStorageFile` instance or null if the user cancels the dialog.

### OpenFolderPickerAsync
Opens a folder picker dialog.

```cs
Task<IReadOnlyList<IStorageFolder>> OpenFolderPickerAsync(FolderPickerOpenOptions options);
```
The method returns an array of selected `IStorageFolder` instances or an empty collection if the user cancels the dialog.

### OpenFileBookmarkAsync
Opens a `IStorageBookmarkFile` from the bookmark ID.

```cs
Task<IStorageBookmarkFile?> OpenFileBookmarkAsync(string bookmark);
```
The method returns a bookmarked file or null if the operating system denied the request.

### OpenFolderBookmarkAsync
Opens a `IStorageBookmarkFolder` from the bookmark ID.

```cs
Task<IStorageBookmarkFolder?> OpenFolderBookmarkAsync(string bookmark);
```
The method returns a bookmarked folder or null if the operating system denied the request.

### TryGetFileFromPathAsync
Attempts to read a file from the file system by its path.

```cs
Task<IStorageFile?> TryGetFileFromPathAsync(Uri filePath);
```
The method returns a file or null if it doesn't exist. The filePath parameter is expected to be an absolute path with a "file" scheme, but can be a URI with a "content" scheme on Android.

### TryGetFolderFromPathAsync
Attempts to read a folder from the file system by its path.

```cs
Task<IStorageFolder?> TryGetFolderFromPathAsync(Uri folderPath);
```
The method returns a folder or null if it doesn't exist. The folderPath parameter is expected to be an absolute path with a "file" scheme, but can be a URI with a "content" scheme on Android.

### TryGetWellKnownFolderAsync
Attempts to read a folder from the file system by its well-known folder identifier.

```cs
Task<IStorageFolder?> TryGetWellKnownFolderAsync(WellKnownFolder wellKnownFolder);
```
The method returns a folder or null if it doesn't exist.