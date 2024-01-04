---
id: file-dialogs
title: File Dialogs
---

The file dialog functionality is accessed through the [`StorageProvider`](../../concepts/services/storage-provider) service API, which is available from the `Window` or `TopLevel` classes. This page shows only basic usage and for more information about this API please visit StorageProvider page.

<GitHubSampleLink title="File Dialogs" link="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/FileOps"/>

## OpenFilePickerAsync

This method opens a file picker dialog, allowing the user to select a file. `FilePickerOpenOptions` defines options that are passed to the OS dialog.

```cs
public class MyView : UserControl
{
    private async void OpenFileButton_Clicked(object sender, RoutedEventArgs args)
    {
        // Get top level from the current control. Alternatively, you can use Window reference instead.
        var topLevel = TopLevel.GetTopLevel(this);

        // Start async operation to open the dialog.
        var files = await topLevel.StorageProvider.OpenFilePickerAsync(new FilePickerOpenOptions
        {
            Title = "Open Text File",
            AllowMultiple = false
        });

        if (files.Count >= 1)
        {
            // Open reading stream from the first file.
            await using var stream = await files[0].OpenReadAsync();
            using var streamReader = new StreamReader(stream);
            // Reads all the content of file as a text.
            var fileContent = await streamReader.ReadToEndAsync();
        }
    }
}
```

---

## SaveFilePickerAsync

This method opens a file save dialog, allowing the user to save a file. `FilePickerSaveOptions` defines options that are passed to the OS dialog.

### Example

```cs
public class MyView : UserControl
{
    private async void SaveFileButton_Clicked(object sender, RoutedEventArgs args)
    {
        // Get top level from the current control. Alternatively, you can use Window reference instead.
        var topLevel = TopLevel.GetTopLevel(this);

        // Start async operation to open the dialog.
        var file = await topLevel.StorageProvider.SaveFilePickerAsync(new FilePickerSaveOptions
        {
            Title = "Save Text File"
        });

        if (file is not null)
        {
            // Open writing stream from the file.
            await using var stream = await file.OpenWriteAsync();
            using var streamWriter = new StreamWriter(stream);
            // Write some content to the file.
            await streamWriter.WriteLineAsync("Hello World!");
        }
    }
}
```

For more information on StorageProvider service including on how to keep access to the picked files and what possible options are supported, please visit [`StorageProvider`](../../concepts/services/storage-provider) documentation page and subpages.

:::note
The provided examples directly access the [`StorageProvider`](../../concepts/services/storage-provider) API inside the ViewModel for learning purposes. In a real-world application, it's recommended to adhere to MVVM principles by creating service classes and locating them with Dependency Injection / Inversion of Control (DI/IoC). Please refer to the [IoCFileOps](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/IoCFileOps) and DepInject projects for samples of how to achieve this.
:::





















