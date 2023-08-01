---
id: clipboard
title: Clipboard
---

`Clipboard` 类允许与系统剪贴板交互，提供设置和获取文本、清空剪贴板、处理数据对象以及使用不同数据格式的功能。

:::info
有关这些概念实际运用的完整可运行示例，请查看[示例应用](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/ClipboardOps)。
:::

可以通过 `TopLevel` 或 `Window` 实例来访问 `Clipboard`。有关访问 `TopLevel` 的更多详细信息，请访问[TopLevel](../toplevel)页面：

```cs
var clipboard = window.Clipboard;
```

## 方法

### GetTextAsync()

异步从剪贴板检索文本。任务的结果值是剪贴板中的文本。如果剪贴板不包含文本或为空，则该方法返回 `null`。

```cs
Task<string?> GetTextAsync()
```

:::note
Avalonia 剪贴板始终处理 Unicode 文本。
:::

### SetTextAsync(string? text)

异步设置剪贴板文本，并立即清除剪贴板。该方法接受 `string?` 参数，用于复制需要的文本。如果提供的文本为 `null`，则剪贴板将被清除。

```cs
Task SetTextAsync(string? text)
```

:::note
与不同的 Win32 剪贴板 API 不同，Avalonia 剪贴板始终刷新数据，永远不会延迟。
:::

### ClearAsync()

异步清除剪贴板并立即刷新。

```cs
Task ClearAsync()
```

### SetDataObjectAsync(IDataObject data)

异步将剪贴板内容设置为指定的数据对象。该方法接受 `IDataObject` 参数。数据对象可以包含多种数据格式。

```cs
Task SetDataObjectAsync(IDataObject data)
```

:::note
与不同的 Win32 剪贴板 API 不同，Avalonia 剪贴板始终刷新数据，永远不会延迟。
:::

### GetFormatsAsync()

异步检索当前存储在剪贴板中的格式列表。任务的结果值是一个字符串格式名称的数组。

```cs
Task<string[]> GetFormatsAsync()
```

### GetDataAsync(string format)

异步从剪贴板中检索指定格式的数据。该方法返回一个 `Task<object?>`，代表该操作。任务的结果值是指定格式的剪贴板数据。如果剪贴板中没有指定格式的数据，则该方法返回 `null`。

```cs
Task<object?> GetDataAsync(string format)
```

## 创建要发送到剪贴板的 DataObject

您可以将对象存储在剪贴板上，并使用不同的格式在某些平台上进行存储。

```csharp title='C#'
private async void CopyButton_OnClick(object? sender, RoutedEventArgs args)
{
    var clipboard = TopLevel.GetTopLevel(this)?.Clipboard;
    var dataObject = new DataObject();
    dataObject.Set(DataFormats.Text, "Hello World");
    await clipboard.SetDataObjectAsync(dataObject);
}
```

## 平台兼容性：

| 功能        |  Windows | macOS | Linux x11 | 浏览器 | Android |  iOS |
|---------------|-------|-------|-------|-------|-------|-------|
| `GetTextAsync` | ✔ | ✔ | ✔ | ✔** | ✔ | ✔ |
| `SetTextAsync` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| `ClearAsync` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| `GetFormatsAsync` | ✔ | ✔ | ✔ | ✖* | ✖* | ✖* |
| `SetDataObjectAsync` | ✔ | ✔ | ✔ | ✖* | ✖* | ✖* |
| `GetDataAsync` | ✔ | ✔ | ✔ | ✖* | ✖* | ✖* |

\* 在技术上可能可行，但尚未实现。欢迎贡献！

** 在 Mozilla 浏览器中，GetTextAsync 方法仅在触发“粘贴”手势后才起作用，通常是通过使用 Ctrl+V。