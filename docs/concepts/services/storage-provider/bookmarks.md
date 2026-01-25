---
id: bookmarks
title: Bookmarks
---

# Bookmarks
Bookmarks are particularly important for maintaining access to files and folders in modern operating systems that have strict security and privacy controls. For instance, on platforms like iOS and newer versions of macOS, direct file system access is heavily restricted. Instead, applications request the user to select a file or folder through a system-provided file picker, and the operating system then gives the application a security-scoped bookmark that it can use to access that file or folder in the future.

In Avalonia's `StorageProvider`, these bookmarks are represented as `IStorageBookmarkFile` and `IStorageBookmarkFolder` interfaces.

## Avalonia.Platform.Storage
### IStorageBookmarkItem Interface
The `IStorageBookmarkItem` interface represents a bookmarked storage item. It inherits from IStorageItem and IDisposable. This interface is not client implementable, meaning you cannot create your own classes that implement it without special permissions.

Here are the key properties and methods it provides:

#### Properties:

`CanBookmark`: A property that indicates if the item can be bookmarked and reused later.

`Name`: The name of the item.

`Path`: The file-system path of the item.

#### Methods:
`CreateFileAsync(String)`,`CreateFolderAsync(String)`,`DeleteAsync()`,`Dispose()`,`GetBasicPropertiesAsync()`,`GetFileAsync(String)`,`GetFolderAsync(String)`,`GetItemsAsync()`,`GetParentAsync()`,`MoveAsync(IStorageFolder)`,`ReleaseBookmarkAsync()`,`SaveBookmarkAsync()`.

### IStorageBookmarkFolder Interface

#### Properties:
same as IStorageBookmarkItem

#### Methods:
`DeleteAsync()`,`Dispose()`,`GetBasicPropertiesAsync()`,`GetBasicPropertiesAsync()`,`GetParentAsync()`,`MoveAsync(IStorageFolder)`,`OpenReadAsync()`,`OpenWriteAsync()`,`ReleaseBookmarkAsync()`,`SaveBookmarkAsync()`.



## How to Use Bookmark Methods
This section provides a practical guide on using `bookmark`.

### Saving and Loading Bookmarks
To get a bookmark ID for a specific folder or file, use the `SaveBookmarkAsync()` asynchronous method on a storage item. Once you have a bookmark ID, you can save it to a local database for future use instead of requiring the user to select a folder every time.

`SaveBookmarkAsync()`: This method is used to get a `bookmark ID` for a selected file or folder, which can be stored for future use.

```csharp
// Example usage
private async Task SaveBookmarksAsync(Control control)
{
    // A folder must be selected first
    if (_lastSelectedFolder == null) return;

    var bookmarkId = await _lastSelectedFolder.SaveBookmarkAsync();

    if (bookmarkId != null)
    {
        // Save the bookmarkId to a local file for later use.
        // ... (code to save bookmarkId)
    }
}
```

You can use the `OpenFolderBookmarkAsync()` methods to open a bookmarked folder via a `bookmark ID`. This will return the bookmarked folder or null if the operating system denies the request.

```csharp
// Example usage
private async Task LoadFolderByBookmarkAsync(Control control, string bookmarkId)
{
    if (string.IsNullOrEmpty(bookmarkId)) return;

    var toplevel = TopLevel.GetTopLevel(control);
    if (toplevel?.StorageProvider != null)
    {
        var folder = await toplevel.StorageProvider.OpenFolderBookmarkAsync(bookmarkId);

        if (folder != null)
        {
            // Successfully opened the bookmarked folder.
            // ... (code to save folder as a var)
            LastSelectedFolder = folder;
        }
    }
}
```

`ReleaseBookmarkAsync()`: This method is used to revoke the security-scoped access granted by the operating system. You should call this when you no longer need access to the bookmarked item.

```csharp
// Example usage
private async Task ReleaseBookmarkAsync(Control control, string bookmarkId)
{
    if (string.IsNullOrEmpty(bookmarkId)) return;

    // First, try to release the OS bookmark.
    var toplevel = TopLevel.GetTopLevel(control);
    if (toplevel?.StorageProvider != null)
    {
        var folder = await toplevel.StorageProvider.OpenFolderBookmarkAsync(bookmarkId);
        if (folder is IStorageBookmarkItem storageBookmark)
        {
            await storageBookmark.ReleaseBookmarkAsync();
            storageBookmark.Dispose();
        }
    }
        
    // Then, remove the ID from local storage.
    // ... (code to remove bookmarkId from file)

}
```


### Reading and Writing File Content from a Bookmark

`OpenFileBookmarkAsync()`: This method is used to open a bookmarked file from a stored `bookmark ID`. It will return the bookmarked file or null if the operating system denies the request.


Once you retrieve a bookmarked file using `OpenFileBookmarkAsync()`, you can read its content with `OpenReadAsync()` or modify it with `OpenWriteAsync()`.

`OpenReadAsync()`: Opens a stream for read access to the bookmarked file.

```csharp
// Example usage
private async Task LoadFileByBookmarkAsync(Control control, string bookmarkId)
{
    if (string.IsNullOrEmpty(bookmarkId)) return;
    var toplevel = TopLevel.GetTopLevel(control);
    if (toplevel?.StorageProvider != null)
    {
        IStorageFile bookmarkedFile = await toplevel.StorageProvider.OpenFileBookmarkAsync(bookmarkId);
        if (bookmarkedFile != null)
        {
            // Read bookmarkedFile content
            // ... (code to use a read stream)
            await using var readStream = await bookmarkedFile.OpenReadAsync();
            using var reader = new StreamReader(readStream, Encoding.UTF8);
            FileContent = await reader.ReadToEndAsync();
        }
    }
}
```

`OpenWriteAsync()`: Opens a stream for writing to the bookmarked file.

```csharp
// Example usage
private async Task SaveFileByBookmarkAsync(Control control, string bookmarkId)
{
    if (string.IsNullOrEmpty(bookmarkId)) return;
    var toplevel = TopLevel.GetTopLevel(control);
    if (toplevel?.StorageProvider != null)
    {
        IStorageFile bookmarkedFile = await toplevel.StorageProvider.OpenFileBookmarkAsync(bookmarkId);
        if (bookmarkedFile != null)
        {
            // Write bookmarkedFile content
            // ... (code to use a write stream)
            await using var writeStream = await bookmarkedFile.OpenWriteAsync();
            await using var writer = new StreamWriter(writeStream, Encoding.UTF8);
            await writer.WriteAsync(FileContent);
        }
    }
}
```


### Managing Bookmarked Files and Folders
Once a bookmark is loaded, you can use the inherited methods from `IStorageItem` to manipulate the file or folder.

`DeleteAsync()`: This method asynchronously deletes the current storage item and its contents.

```csharp
// Example usage
private async Task DeleteFileAsync()
{
    if (SelectedFile != null && LastSelectedFolder != null)
    {
        await SelectedFile.DeleteAsync();
        // Then refresh the UI.
    }
}
```

`MoveAsync(IStorageFolder)`: This method asynchronously moves the bookmarked item to a new location.

```csharp
IStorageFile bookmarkedFile = ...;
IStorageFolder newDestinationFolder = ...;
await bookmarkedFile.MoveAsync(newDestinationFolder);
```

`GetBasicPropertiesAsync()`: This method asynchronously retrieves basic properties of the storage item, such as its size and modification date.

```csharp
// Example usage
IStorageFile bookmarkedFile = ...;
var properties = await bookmarkedFile.GetBasicPropertiesAsync();
long size = properties.Size;
```

`GetParentAsync()`: This method asynchronously gets the parent folder of the current storage item.

```csharp
// Example usage
IStorageFile bookmarkedFile = ...;
var parentFolder = await bookmarkedFile.GetParentAsync();
string parentName = parentFolder.Name;
```

`TryGetLocalPath()`: This extension method attempts to get the local file system path as a string. It's useful for platform-specific operations where a local path is required.

```csharp
// This will work on Windows but may return null on other platforms
IStorageFile bookmarkedFile = ...;
string? localPath = bookmarkedFile.TryGetLocalPath();
```

## Platform-Specific Bookmark Representation
The way a `bookmark ID` is represented can vary by platform:

**Windows**: A bookmark is a simple absolute path string, so a bookmark might look like `C:\Documents\Avalonia\bookmarks.pdf`

**Android**: Think of the content provider like a waiter that your apps can ask for a certain file/folder through a Content URI. The URI format looks like `content://[Authority]/[path]/[id]`. For example, `com.android.externalstorage.documents` is an `Authority` for accessing External Storage providers, so a bookmark might look like `content://com.android.externalstorage.documents/tree/[your folder path]`(Reference: [Create a content provider | Android Developers](https://developer.android.com/guide/topics/providers/content-provider-creating)).

:::note
The exact behavior and capabilities can depend on the specific operating system and its security policies. For instance, on some platforms, a bookmark might become invalid if the user moves or renames the file or folder that it points to.
:::

:::note
It's not recommended to store bookmark IDs in a remote database, as bookmarks might not be persistent and might contain sensitive file path information.
:::