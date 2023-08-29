---
id: file-dialogs
title: 文件对话框
---

文件对话框功能可以通过 [`StorageProvider`](../../concepts/services/storage-provider) 服务 API 访问，该服务 API 可在 `Window` 或 `TopLevel` 类中获取。本页面仅展示基本用法，有关此 API 的更多信息，请查阅 StorageProvider 页面。

:::info
如果要查看这些概念在实际运行中的完整示例，请参阅 [示例应用程序](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/FileOps) 
:::

## OpenFilePickerAsync

此方法打开一个文件选择器对话框，允许用户选择文件。`FilePickerOpenOptions` 定义了传递给操作系统对话框的选项。

```cs
public class MyView : UserControl
{
    private async void OpenFileButton_Clicked(object sender, RoutedEventArgs args)
    {
        // 从当前控件获取 TopLevel。或者，您也可以使用 Window 引用。
        var topLevel = TopLevel.GetTopLevel(this);

        // 启动异步操作以打开对话框。
        var files = await topLevel.StorageProvider.OpenFilePickerAsync(new FilePickerOpenOptions
        {
            Title = "Open Text File",
            AllowMultiple = false
        });

        if (files.Count >= 1)
        {
            // 打开第一个文件的读取流。
            await using var stream = await files[0].OpenReadAsync();
            using var streamReader = new StreamReader(stream);
            // 将文件的所有内容作为文本读取。
            var fileContent = await streamReader.ReadToEndAsync();
        }
    }
}
```

---

## SaveFilePickerAsync

此方法打开一个文件保存对话框，允许用户保存文件。`FilePickerSaveOptions` 定义了传递给操作系统对话框的选项。

### 示例

```cs
public class MyView : UserControl
{
    private async void SaveFileButton_Clicked(object sender, RoutedEventArgs args)
    {
        // 从当前控件获取 TopLevel。或者，您也可以使用 Window 引用。
        var topLevel = TopLevel.GetTopLevel(this);

        // 启动异步操作以打开对话框。
        var file = await topLevel.StorageProvider.SaveFilePickerAsync(new FilePickerSaveOptions
        {
            Title = "Save Text File"
        });

        if (file is not null)
        {
            // 打开文件的写入流。
            await using var stream = await file.OpenWriteAsync();
            using var streamWriter = new StreamWriter(stream);
            // 将一些内容写入文件。
            await streamWriter.WriteLineAsync("Hello World!");
        }
    }
}
```

有关 StorageProvider 服务的更多信息，包括如何保持对选定文件的访问以及支持哪些可能的选项，请访问 [`StorageProvider`](../../concepts/services/storage-provider) 文档页面和子页面。

:::note
为了学习目的，提供的示例直接在 ViewModel 中访问 [`StorageProvider`](../../concepts/services/storage-provider) API。在实际的应用程序中，建议遵循 MVVM 原则，通过创建服务类并使用依赖注入/控制反转 (DI/IoC) 来定位它们。请参阅 [IoCFileOps](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/IoCFileOps) 和 DepInject 项目，查看如何实现这一功能的示例。
:::





















