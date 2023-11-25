---
id: file-picker-options
title: 文件选择器选项 File Picker Options
---

# 文件选择器选项

## 常见 PickerOptions

### Title

获取或设置出现在选择器标题栏中的文本。

### SuggestedStartLocation

获取或设置文件打开选择器寻找文件以展示给用户的初始位置。
可以从之前选择的文件夹中获取，或者使用 `StorageProvider.TryGetFolderFromPathAsync` 或 `StorageProvider.TryGetWellKnownFolderAsync`。

:::note
这是对系统的建议，如果应用程序无法访问文件夹或文件夹不存在，可以忽略此参数。
:::
:::note
在 Linux 上，一些 DBus 文件选择器不支持启动位置。对于使用 GTK Free Desktop，请在 `X11PlatformOptions` 中禁用 `UseDBusFilePicker`。
:::

## FilePickerOpenOptions

### AllowMultiple

获取或设置一个选项，指示打开选择器是否允许用户选择多个文件。

### FileTypeFilter

获取或设置文件打开选择器显示的文件类型集合。

为文件选择器创建文件类型列表：

```cs
//这也可以应用于SaveFilePicker。
var files = await _target.StorageProvider.OpenFilePickerAsync(new FilePickerOpenOptions()
{
 Title = title,
//您可以添加自定义文件类型，也可以从内置文件类型添加。请参阅“定义自定义文件类型”，了解如何创建自定义文件类型。
 FileTypeFilter = new[] { ImageAll, FilePickerFileTypes.TextPlain }
});
```

## FilePickerSaveOptions

### SuggestedFileName

获取或设置文件保存选择器建议给用户的文件名。

### DefaultExtension

获取或设置用于保存文件的默认扩展名。

### FileTypeChoices

获取或设置用户可以选择为文件分配的有效文件类型集合。

### ShowOverwritePrompt

获取或设置一个值，指示文件打开选择器是否在用户指定一个已经存在的文件名时显示警告。

## FolderPickerOpenOptions

### AllowMultiple

获取或设置一个选项，指示打开选择器是否允许用户选择多个文件夹。

## 平台兼容性：

| 功能        | 托管 |  Windows | macOS | Linux | 浏览器 | 安卓 |  iOS |
|---------------|-------|-------|-------|-------|-------|-------|-------|
| `Title` | ✔ | ✔ | ✔ | ✔ | ✖ | ✔ | ✔ |
| `SuggestedStartLocation` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| `AllowMultiple` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| `FileTypeFilter` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| `SuggestedFileName` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✖ |
| `DefaultExtension` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✖ |
| `FileTypeChoices` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✖ |
| `ShowOverwritePrompt` | ✔ | ✔ | ✖ | ✔ | ✖ | ✖ | ✖ |

# 定义自定义文件类型

Avalonia 有一组内置的文件类型：

- FilePickerFileTypes.All - 所有文件
- FilePickerFileTypes.TextPlain - 文本文件 (txt)
- FilePickerFileTypes.ImageAll - 所有图片
- FilePickerFileTypes.ImageJpg - jpg 图片
- FilePickerFileTypes.ImagePng - png 图片
- FilePickerFileTypes.Pdf - pdf 文件

然而，您可以定义自定义文件类型，供选择器使用：

例如，内置的 ImageAll 类型定义如下
```cs

public static FilePickerFileType ImageAll { get; } = new("All Images")
{
    Patterns = new[] { "*.png", "*.jpg", "*.jpeg", "*.gif", "*.bmp" },
    AppleUniformTypeIdentifiers = new[] { "public.image" },
    MimeTypes = new[] { "image/*" }
};
```

每个文件类型都有以下用于不同平台的提示信息：
- `Patterns` 用于大多数 Windows、Linux 和浏览器平台，是一个基本的 GLOB 模式，可以匹配类型。
- `AppleUniformTypeIdentifiers` 是 Apple 定义的标准标识符，用于 macOS 和 iOS 平台。
- `MimeTypes` 是大多数平台上用于文件的 Web 标识符，但不包括 Windows 和 iOS。

通常，建议在每个文件类型中定义尽可能多的信息。但至少需要定义 `Patterns` 和 `MimeTypes`。

:::note
如果不知道特定的提示信息，请不要设置随机值或 "*.*" 通配符，而是将该集合保持为 null。这将告诉平台忽略此集合，而是尝试使用其他集合。
:::