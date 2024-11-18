---
id: index
title: StorageProvider
---

# StorageProvider

`StorageProvider` 是文件和文件夹管理的核心。它提供了用于选择文件和文件夹、检查平台功能以及与存储书签交互的方法。

`StorageProvider` 可以通过 `TopLevel` 或 `Window` 的实例访问，有关访问 `TopLevel` 的更多详细信息，请访问 [TopLevel](../../toplevel) 页面：
```cs
var storage = window.StorageProvider;
```

## 属性 

### CanOpen
指示当前平台是否可以打开“打开文件选择器”。

```cs
bool CanOpen { get; }
```

### CanSave
指示当前平台是否可以打开“保存文件选择器”。

```cs
bool CanSave { get; }
```

### CanPickFolder
指示当前平台是否可以打开“文件夹选择器”。

```cs
bool CanPickFolder { get; }
```

## 方法

### OpenFilePickerAsync
打开文件选择对话框。

```cs
Task<IReadOnlyList<IStorageFile>> OpenFilePickerAsync(FilePickerOpenOptions options);
```
该方法返回选择的 `IStorageFile` 实例数组，如果用户取消对话框，则返回空集合。

### SaveFilePickerAsync
打开保存文件选择对话框。

```cs
Task<IStorageFile?> SaveFilePickerAsync(FilePickerSaveOptions options);
```
该方法返回保存的 `IStorageFile` 实例，如果用户取消对话框，则返回 null。

### OpenFolderPickerAsync
打开文件夹选择对话框。

```cs
Task<IReadOnlyList<IStorageFolder>> OpenFolderPickerAsync(FolderPickerOpenOptions options);
```
该方法返回选择的 `IStorageFolder` 实例数组，如果用户取消对话框，则返回空集合。

### OpenFileBookmarkAsync
通过书签 ID 打开 `IStorageBookmarkFile`。

```cs
Task<IStorageBookmarkFile?> OpenFileBookmarkAsync(string bookmark);
```
该方法返回书签文件，如果操作系统拒绝请求，则返回 null。

### OpenFolderBookmarkAsync
通过书签 ID 打开 `IStorageBookmarkFolder`。

```cs
Task<IStorageBookmarkFolder?> OpenFolderBookmarkAsync(string bookmark);
```
该方法返回书签文件夹，如果操作系统拒绝请求，则返回 null。

### TryGetFileFromPathAsync
尝试根据文件路径从文件系统中读取文件。

```cs
Task<IStorageFile?> TryGetFileFromPathAsync(Uri filePath);
```
该方法返回文件，如果文件不存在，则返回 null。filePath 参数预期是带有 "file" scheme 的绝对路径，但在 Android 上可以是带有 "content" scheme 的 URI。

### TryGetFolderFromPathAsync
尝试根据文件夹路径从文件系统中读取文件夹。

```cs
Task<IStorageFolder?> TryGetFolderFromPathAsync(Uri folderPath);
```
该方法返回文件夹，如果文件夹不存在，则返回 null。folderPath 参数预期是带有 "file" scheme 的绝对路径，但在 Android 上可以是带有 "content" scheme 的 URI。

### TryGetWellKnownFolderAsync
尝试根据知名文件夹标识符从文件系统中读取文件夹。

```cs
Task<IStorageFolder?> TryGetWellKnownFolderAsync(WellKnownFolder wellKnownFolder);
```
该方法返回文件夹，如果文件夹不存在，则返回 null。

## 扩展方法

### TryGetFileFromPathAsync
尝试根据文件路径从文件系统中读取文件。

```cs
Task<IStorageFile?> TryGetFileFromPathAsync(this IStorageProvider provider, string filePath);
```
该方法将返回一个文件，如果文件不存在，则返回null。
此方法接受本地文件路径字符串作为参数，不带任何scheme。
仅在操作系统上受支持，使用物理文件路径，主要仅适用于桌面。

### TryGetFolderFromPathAsync
尝试根据文件夹路径从文件系统中读取文件夹。

```cs
Task<IStorageFolder?> TryGetFolderFromPathAsync(this IStorageProvider provider, string folderPath);
```
该方法将返回一个文件夹，如果文件夹不存在，则返回null。
此方法接受本地文件夹路径字符串作为参数，不带任何scheme。
仅在操作系统上受支持，使用物理文件路径，主要仅适用于桌面。

## 平台兼容性：

| 功能        | 托管代码 |  Windows | macOS | Linux | 浏览器 | Android |  iOS |
|---------------|-------|-------|-------|-------|-------|-------|-------|
| `OpenFileBookmarkAsync` | ✔* | ✔* | ✔* | ✔* | ✔ | ✔ | ✔ |
| `OpenFolderBookmarkAsync` | ✔* | ✔* | ✔* | ✔* | ✔ | ✔ | ✔ |
| `OpenFilePickerAsync` | ✔** | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| `SaveFilePickerAsync` | ✔** | ✔ | ✔ | ✔ | ✔ | ✔*** | ✖ |
| `OpenFolderPickerAsync` | ✔** | ✔ | ✔ | ✔ | ✔ | ✔*** | ✔ |
| `TryGetFileFromPathAsync` | ✔ | ✔ | ✔ | ✔ | ✖ | ✖ | ✖ |
| `TryGetFolderFromPathAsync` | ✔ | ✔ | ✔ | ✔ | ✖ | ✖ | ✖ |
| `TryGetWellKnownFolderAsync` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |

\* 书签在桌面平台上不受支持，而是返回文件路径。计划支持 macOS，以便使其与受沙盒限制的 Apple Store 应用程序配合使用。

** 托管文件选择器仅在可以打开自定义窗口的桌面平台上工作。

*** 只有基于 Chromium 的浏览器对文件选择器有良好的支持。