---
id: launcher
title: Launcher 启动器
---

# 启动器 <MinVersion version="11.1" />

`Launcher` 允许您在与指定参数关联的默认应用程序中打开文件或 URI 链接。

`Launcher` 可以通过 `TopLevel` 或 `Window` 的实例访问，有关访问 `TopLevel` 的更多详细信息，请访问 [TopLevel](/docs/concepts/toplevel) 页面：
```cs
var launcher = TopLevel.GetTopLevel(control).Launcher;
```

## 方法

### LaunchUriAsync

通过指定的URI启动与URI方案(scheme)名称关联的默认应用程序。

```cs
Task<bool> LaunchUriAsync(Uri uri)
```

:::note
输入的 URI 可以具有任何方案，也可以自定义方案。但是此启动请求被接受还是拒绝取决于操作系统。
:::

### LaunchFileAsync

启动与指定存储文件或文件夹关联的默认应用程序。

```cs
Task<bool> LaunchFileAsync(IStorageItem storageItem);
```

:::note
`IStorageItem` 是从沙盒 API（如 `IStorageProvider` 或 `IClipboard`）检索的文件或文件夹。如果您只针对非沙盒桌面平台，建议使用接受 `FileInfo` 或 `DirectoryInfo` 的扩展方法。
:::

## 扩展方法

### LaunchFileInfoAsync

启动与指定存储文件关联的默认应用程序。

```cs
Task<bool> LaunchFileInfoAsync(FileInfo fileInfo)
```

### LaunchDirectoryInfoAsync

启动与指定存储目录（文件夹）关联的默认应用程序。

```cs
Task<bool> LaunchDirectoryInfoAsync(DirectoryInfo directoryInfo);
```

:::note
这些方法中的每一个都会返回一个布尔结果，指示操作系统是否可以处理请求。但这并不能保证存在可以处理启动请求的应用程序。
:::

## 平台兼容性：

| 功能                  | Windows | macOS | Linux | 浏览器 | Android | iOS | Tizen |
|-----------------------|---------|-------|-------|--------|---------|-----|-------|
| `LaunchUriAsync`      | ✔       | ✔     | ✔     | ✔      | ✔       | ✔   | ✔     |
| `LaunchFileAsync`     | ✔       | ✔     | ✔     | ✖      | ✔       | ✔   | ✔     |
| `LaunchFileInfoAsync` | ✔       | ✔     | ✔     | ✖      | ✖       | ✖   | ✖     |
| `LaunchDirectoryInfoAsync` | ✔    | ✔     | ✔     | ✖      | ✖       | ✖   | ✖     |
```