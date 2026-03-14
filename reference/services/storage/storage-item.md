---
id: storage-item
title: Storage Items
---

# Storage Items

## Common members for StorageFile and StorageFolder

### Name

Gets a short name of the item including the file name extension if there is one.

### Path

Gets the file-system path of the item.

:::note
Android backend might return file path with "content:" scheme.
Browser and iOS backends might return relative uris.
:::

:::warning
DO NOT use Path property to preserve access to the file or folder. Instead see [Bookmarks](/docs/services/storage/bookmarks) page on how to keep access to the storage items.

DO NOT use Path property to directly read file by its path, as it won't work on most of mobile and browser platforms. Instead use [OpenReadAsync](#openreadasync) and [OpenWriteAsync](#openwriteasync).
:::

### CanBookmark

Returns true is item can be bookmarked and reused later.

### SaveBookmarkAsync

Saves items to a bookmark.
Returns identifier of a bookmark. Can be null if OS denied request.

### GetBasicPropertiesAsync

Gets the basic properties of the current item.
Currently available properties:
- Size
- DateCreated
- DateModified

### GetParentAsync

Gets the parent folder of the current storage item.

### DeleteAsync

Deletes the current storage item and it's contents

### MoveAsync

Moves the current storage item and it's contents to a IStorageFolder

## StorageFile members

### OpenReadAsync

Opens a stream for read access.

### OpenWriteAsync

Opens stream for writing to the file.

## StorageFolder members

### GetItemsAsync

Gets the files and subfolders in the current folder.
When this method completes successfully, it returns a list of the files and folders in the current folder. Each item in the list is represented by an IStorageItem implementation object.

:::note
This method is lazily evaluate and is async.
:::

### CreateFileAsync

Creates a file with specified name as a child of the current storage folder

### CreateFolderAsync

Creates a folder with specified name as a child of the current storage folder

### TryGetSingleFileAsync

Retrieves a single file by name from the current storage folder. Returns the matching `IStorageFile` if found, or null if no file with the specified name exists. This is an extension method that simplifies the common pattern of getting one specific file from a folder.

```csharp
IStorageFile? file = await folder.TryGetSingleFileAsync("config.json");
```

### TryGetSingleFolderAsync

Retrieves a single subfolder by name from the current storage folder. Returns the matching `IStorageFolder` if found, or null if no folder with the specified name exists. This is an extension method that simplifies the common pattern of getting one specific subfolder from a folder.

```csharp
IStorageFolder? subFolder = await folder.TryGetSingleFolderAsync("images");
```

## Extension methods

### TryGetLocalPath

Gets the local file system path of the item as a string.
Android platform usually uses "content:" virtual file paths and Browser platform has isolated access without full paths, so on these platforms this method will return null.

:::note
If you want to save file path to reuse it later (in combination with TryGetFileFromPathAsync), please consider using [Bookmarks](/docs/services/storage/bookmarks) instead as they are designed to work in sandboxed environment, where user app might not have direct access to the physical file system.
:::