---
id: file-dialogs
title: File Dialogs
---

The file dialog functionality is accessed through the `StorageProvider` API, which is available from the `MainWindow`. The following are two methods that demonstrate how to utilize this API for file operations.

:::info
For a complete, runnable example of these concepts in action, check out [the sample application.](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/FileOps) 
:::

## OpenFilePickerAsync

This private method opens a file picker dialog, allowing the user to select a file. This method is asynchronous and returns a `Task<IStorageFile?>`.

```cs
private async Task<IStorageFile?> DoOpenFilePickerAsync()
{
    if (Application.Current?.ApplicationLifetime is not IClassicDesktopStyleApplicationLifetime desktop ||
        desktop.MainWindow?.StorageProvider is not { } provider)
        throw new NullReferenceException("Missing StorageProvider instance.");

    var files = await provider.OpenFilePickerAsync(new FilePickerOpenOptions()
    {
        Title = "Open Text File",
        AllowMultiple = false
    });

    return files?.Count >= 1 ? files[0] : null;
}
```

### Usage
This method is used to open a file picker dialog with the title "Open Text File". Only a single file can be selected at a time. If a file is selected, it is returned; otherwise, null is returned.


---

## SaveFilePickerAsync

This private method opens a file picker dialog, allowing the user to save a file. This method is asynchronous and returns a `Task<IStorageFile?>`.

### Example

```cs
private async Task<IStorageFile?> DoSaveFilePickerAsync()
{
    if (Application.Current?.ApplicationLifetime is not IClassicDesktopStyleApplicationLifetime desktop ||
        desktop.MainWindow?.StorageProvider is not { } provider)
        throw new NullReferenceException("Missing StorageProvider instance.");

    return await provider.SaveFilePickerAsync(new FilePickerSaveOptions()
    {
        Title = "Save Text File"
    });
}
```

### Usage
This method is used to open a save file dialog with the title "Save Text File". The selected file location is returned, or null if no location is selected.

:::note
The provided examples directly access the `StorageProvider` API inside the ViewModel for learning purposes. In a real-world application, it's recommended to adhere to MVVM principles by creating service classes and locating them with Dependency Injection / Inversion of Control (DI/IoC). Please refer to the [IoCFileOps](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/IoCFileOps) and DepInject projects for samples of how to achieve this.
:::



