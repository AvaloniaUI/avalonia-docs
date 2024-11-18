---
id: launcher
title: Launcher
---

# Launcher <MinVersion version="11.1" />

The `Launcher` allows you to open file or a URI link in the default app associated with the specified argument.

The `Launcher` can be access through an instance of `TopLevel` or `Window`, for more details on accessing `TopLevel` please visit [TopLevel](../toplevel) page:
```cs
var launcher = TopLevel.GetTopLevel(control).Launcher;
```

## Methods 

### LaunchUriAsync
Starts the default app associated with the URI scheme name for the specified URI.

```cs
Task<bool> LaunchUriAsync(Uri uri)
```

:::note
Input URI can have any scheme including custom ones. But it's up to the Operating System to accept or deny this launcher request.
:::

### LaunchFileAsync
Starts the default app associated with the specified storage file or folder.

```cs
Task<bool> LaunchFileAsync(IStorageItem storageItem);
```

:::note
IStorageItem is a file or folder retrieved from sandboxed APIs such as IStorageProvider or IClipboard.
If you only target non-sandboxed desktop platforms, consider using extension methods accepting FileInfo or DirectoryInfo.
:::

## Extension Methods 

### LaunchFileInfoAsync
Starts the default app associated with the specified storage file.

```cs
Task<bool> LaunchFileInfoAsync(FileInfo fileInfo)
```

### LaunchFileAsync
Starts the default app associated with the specified storage directory (folder).

```cs
Task<bool> LaunchDirectoryInfoAsync(DirectoryInfo directoryInfo);
```

:::note
Each of these methods returns a boolean result indicating whether OS can handle request or not.
It does not guarantee, that there is an app than can handle launcher request.
:::

## Platform compatibility:

| Feature        | Windows | macOS | Linux | Browser | Android |  iOS | Tizen |
|---------------|-------|-------|-------|-------|-------|-------|-------|
| `LaunchUriAsync` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| `LaunchFileAsync` | ✔ | ✔ | ✔ | ✖ | ✔ | ✔ | ✔ |
| `LaunchFileInfoAsync` | ✔ | ✔ | ✔ | ✖ | ✖ | ✖ | ✖ |
| `LaunchDirectoryInfoAsync` | ✔ | ✔ | ✔ | ✖ | ✖ | ✖ | ✖ |
