---
id: file-dialogs
title: File Dialogs
description: Learn how to use file open, save, and folder picker dialogs in Avalonia through the StorageProvider API.
doc-type: explanation
---

File dialogs let your users browse the file system to open files, save files, or select folders. In Avalonia, you access this functionality through the `StorageProvider` service API, which is available from the `Window` or `TopLevel` classes. This page covers basic usage. For the full API reference and advanced options, see the [`StorageProvider`](/docs/services/storage/storage-provider) documentation.

<GitHubSampleLink title="File Dialog" link="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/FileOps"/>

## Opening a file

Call `OpenFilePickerAsync` to display a file picker dialog that allows the user to select one or more files. You pass a `FilePickerOpenOptions` object to configure the dialog title, whether multiple selection is allowed, and which file type filters to display.

```csharp
public class MyView : UserControl
{
    private async void OpenFileButton_Clicked(object sender, RoutedEventArgs args)
    {
        // Get top level from the current control. Alternatively, you can use a Window reference.
        var topLevel = TopLevel.GetTopLevel(this);

        // Start an async operation to open the dialog.
        var files = await topLevel.StorageProvider.OpenFilePickerAsync(new FilePickerOpenOptions
        {
            Title = "Open Text File",
            AllowMultiple = false
        });

        if (files.Count >= 1)
        {
            // Open a reading stream from the first file.
            await using var stream = await files[0].OpenReadAsync();
            using var streamReader = new StreamReader(stream);
            // Read all content of the file as text.
            var fileContent = await streamReader.ReadToEndAsync();
        }
    }
}
```

The method returns a list of `IStorageFile` objects. When the user cancels the dialog, the list is empty. Each `IStorageFile` provides stream-based access to the file content, so you do not work with raw file paths.

## Saving a file

Call `SaveFilePickerAsync` to display a save dialog that allows the user to choose a destination file. You pass a `FilePickerSaveOptions` object to configure the dialog.

```csharp
public class MyView : UserControl
{
    private async void SaveFileButton_Clicked(object sender, RoutedEventArgs args)
    {
        // Get top level from the current control. Alternatively, you can use a Window reference.
        var topLevel = TopLevel.GetTopLevel(this);

        // Start an async operation to open the dialog.
        var file = await topLevel.StorageProvider.SaveFilePickerAsync(new FilePickerSaveOptions
        {
            Title = "Save Text File"
        });

        if (file is not null)
        {
            // Open a writing stream from the file.
            await using var stream = await file.OpenWriteAsync();
            using var streamWriter = new StreamWriter(stream);
            // Write some content to the file.
            await streamWriter.WriteLineAsync("Hello World!");
        }
    }
}
```

The method returns a single `IStorageFile`, or `null` if the user cancels the dialog.

## Selecting a folder

Call `OpenFolderPickerAsync` to display a folder picker dialog. You pass a `FolderPickerOpenOptions` object to configure the dialog title and whether multiple selection is allowed.

```csharp
var folders = await topLevel.StorageProvider.OpenFolderPickerAsync(new FolderPickerOpenOptions
{
    Title = "Select Folder",
    AllowMultiple = false
});

if (folders.Count >= 1)
{
    var folderPath = folders[0].Path;
}
```

## Checking platform capabilities

Not every platform supports all dialog types. Before you open a dialog, you can check the `StorageProvider` capability properties:

- `CanOpen`: indicates whether the open file picker is available.
- `CanSave`: indicates whether the save file picker is available.
- `CanPickFolder`: indicates whether the folder picker is available.

```csharp
if (topLevel.StorageProvider.CanOpen)
{
    // Safe to call OpenFilePickerAsync
}
```

This is especially important when your application targets browsers (WebAssembly) or mobile platforms where certain dialog types may not be supported.

## Platform considerations

File dialogs rely on the native platform dialog where possible. Keep the following in mind:

- **Desktop (Windows, macOS, Linux)**: Full support for open, save, and folder pickers. The dialogs use the native OS file chooser.
- **Browser (WebAssembly)**: Open file picker is supported through the browser's file input API. Save and folder pickers have limited or no support depending on the browser.
- **iOS and Android**: File pickers use platform-specific document providers. Folder picking may not be available on all versions.

Because `StorageProvider` returns `IStorageFile` and `IStorageFolder` abstractions rather than raw file paths, your code stays portable across platforms.

## MVVM considerations

:::note
The examples on this page access the `StorageProvider` API directly from a code-behind class for simplicity. In a production application, you should follow MVVM principles by wrapping file dialog access in a service class and resolving it through dependency injection. See the [IoCFileOps](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/IoCFileOps) sample project for a practical example of this approach.
:::

## See also

- [`StorageProvider` API](/docs/services/storage/storage-provider)
- [Storage items (`IStorageFile` and `IStorageFolder`)](/docs/services/storage/storage-item)
- [Bookmarks (persisting file access)](/docs/services/storage/bookmarks)
- [Data persistence how-to](/docs/how-to/data-persistence-how-to)
- [Drag and drop](/docs/how-to/drag-and-drop-how-to)

















