---
id: launcher
title: Launcher
description: Learn how to use the Avalonia Launcher service to open files, folders, and URIs in the user's default application.
doc-type: concept
---

The `Launcher` service allows you to open a file, folder, or URI in the default application associated with that item. For example, you can use it to open a URL in the user's default browser, or open a document in the application registered to handle its file type.

You can access the `Launcher` through an instance of `TopLevel` or `Window`. For more details on accessing `TopLevel`, visit the [TopLevel](/docs/fundamentals/top-level) page.

```csharp
var launcher = TopLevel.GetTopLevel(control).Launcher;
```

## Methods

### `LaunchUriAsync`

Starts the default application associated with the URI scheme name for the specified URI.

```csharp
Task<bool> LaunchUriAsync(Uri uri)
```

:::note
The input URI can have any scheme, including custom ones. However, it is up to the operating system to accept or deny the launcher request.
:::

**Example: opening a URL in the default browser**

```csharp
var success = await launcher.LaunchUriAsync(new Uri("https://avaloniaui.net"));
```

### `LaunchFileAsync`

Starts the default application associated with the specified storage file or folder.

```csharp
Task<bool> LaunchFileAsync(IStorageItem storageItem);
```

:::note
`IStorageItem` is a file or folder retrieved from sandboxed APIs such as `IStorageProvider` or `IClipboard`. If you only target non-sandboxed desktop platforms, consider using the extension methods that accept `FileInfo` or `DirectoryInfo` instead.
:::

**Example: opening a file picked by the user**

```csharp
var files = await storageProvider.OpenFilePickerAsync(new FilePickerOpenOptions());
if (files.Count > 0)
{
    await launcher.LaunchFileAsync(files[0]);
}
```

## Extension methods

The following extension methods are available for convenience when you are targeting non-sandboxed desktop platforms (Windows, macOS, Linux).

### `LaunchFileInfoAsync`

Starts the default application associated with the specified file.

```csharp
Task<bool> LaunchFileInfoAsync(FileInfo fileInfo)
```

**Example**

```csharp
var file = new FileInfo("/path/to/document.pdf");
var success = await launcher.LaunchFileInfoAsync(file);
```

### `LaunchDirectoryInfoAsync`

Starts the default application associated with the specified directory (folder). This typically opens the folder in the system file manager.

```csharp
Task<bool> LaunchDirectoryInfoAsync(DirectoryInfo directoryInfo);
```

**Example**

```csharp
var folder = new DirectoryInfo("/path/to/folder");
var success = await launcher.LaunchDirectoryInfoAsync(folder);
```

## Return values

Each of these methods returns a `bool` indicating whether the operating system was able to handle the request. A return value of `true` does not guarantee that an application actually opened the item. It only indicates that the OS accepted the request without error.

## Platform compatibility

| Feature        | Windows | macOS | Linux | Browser | Android |  iOS |
|---------------|-------|-------|-------|-------|-------|-------|
| `LaunchUriAsync` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `LaunchFileAsync` | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ |
| `LaunchFileInfoAsync` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `LaunchDirectoryInfoAsync` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |

## See also

- [Storage Provider](/docs/services/storage/storage-provider): File and folder management API.
- [Clipboard](/docs/services/clipboard): Reading and writing clipboard data.
- [TopLevel](/docs/fundamentals/top-level): Accessing platform services from controls.
