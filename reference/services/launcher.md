---
id: launcher
title: Launcher
description: Reference for the Avalonia Launcher service, which opens files and URIs in the default associated application.
doc-type: reference
---

# Launcher

The `Launcher` service allows you to open a file or a URI link in the default application associated with the specified argument. For example, you can use it to open a URL in the user's default browser or open a document in its associated editor.

You can access the `Launcher` through an instance of `TopLevel` or `Window`. For more details on accessing `TopLevel`, visit the [TopLevel](../../docs/fundamentals/top-level) page.

```csharp
var launcher = TopLevel.GetTopLevel(control).Launcher;
```

## Methods

### `LaunchUriAsync`

Starts the default application associated with the URI scheme name for the specified URI. Returns `true` if the operating system reported that it can handle the request, or `false` otherwise.

```csharp
Task<bool> LaunchUriAsync(Uri uri)
```

:::note
The input URI can have any scheme, including custom ones. However, it is up to the operating system to accept or deny the launcher request.
:::

#### Example

```csharp
var launcher = TopLevel.GetTopLevel(this)!.Launcher;
await launcher.LaunchUriAsync(new Uri("https://avaloniaui.net"));
```

### `LaunchFileAsync`

Starts the default application associated with the specified storage file or folder. The `storageItem` parameter accepts an `IStorageItem` retrieved from a sandboxed API such as `IStorageProvider` or `IClipboard`.

```csharp
Task<bool> LaunchFileAsync(IStorageItem storageItem);
```

:::note
`IStorageItem` is a file or folder retrieved from sandboxed APIs such as `IStorageProvider` or `IClipboard`. If you only target non-sandboxed desktop platforms, consider using the extension methods that accept `FileInfo` or `DirectoryInfo` instead.
:::

#### Example

```csharp
var launcher = TopLevel.GetTopLevel(this)!.Launcher;
var storageProvider = TopLevel.GetTopLevel(this)!.StorageProvider;

var file = await storageProvider.OpenFilePickerAsync(new FilePickerOpenOptions
{
    Title = "Select a file to open",
    AllowMultiple = false
});

if (file.Count > 0)
{
    await launcher.LaunchFileAsync(file[0]);
}
```

## Extension methods

### `LaunchFileInfoAsync`

Starts the default application associated with the specified file. This extension method accepts a `FileInfo` object and is only available on non-sandboxed desktop platforms.

```csharp
Task<bool> LaunchFileInfoAsync(FileInfo fileInfo)
```

#### Example

```csharp
var launcher = TopLevel.GetTopLevel(this)!.Launcher;
var fileInfo = new FileInfo("/path/to/document.pdf");
await launcher.LaunchFileInfoAsync(fileInfo);
```

### `LaunchDirectoryInfoAsync`

Starts the default application associated with the specified directory (folder). This extension method accepts a `DirectoryInfo` object and is only available on non-sandboxed desktop platforms.

```csharp
Task<bool> LaunchDirectoryInfoAsync(DirectoryInfo directoryInfo);
```

#### Example

```csharp
var launcher = TopLevel.GetTopLevel(this)!.Launcher;
var dirInfo = new DirectoryInfo("/path/to/folder");
await launcher.LaunchDirectoryInfoAsync(dirInfo);
```

## Return values

Each of these methods returns a `bool` result indicating whether the operating system can handle the request. A `true` return value does not guarantee that an application was actually launched to handle the request, only that the OS accepted it.

## Platform compatibility

| Feature        | Windows | macOS | Linux | Browser | Android |  iOS |
|---------------|-------|-------|-------|-------|-------|-------|
| `LaunchUriAsync` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `LaunchFileAsync` | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ |
| `LaunchFileInfoAsync` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `LaunchDirectoryInfoAsync` | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |

## See also

- [TopLevel](../../docs/fundamentals/top-level)
- [Storage provider](storage/storage-provider)
- [Clipboard](clipboard)
