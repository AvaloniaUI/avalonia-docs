---
id: storage-item
title: 存储项 Storage Items
---

# 存储项

## StorageFile 和 StorageFolder 的共同成员

### Name

获取项的短名称，如果有的话，包括文件扩展名。

### Path

获取项的文件系统路径。

:::note
Android 后端可能返回带有 "content:" 方案的文件路径。
浏览器和 iOS 后端可能返回相对 URI。
:::

:::warning
请勿使用 Path 属性来保留对文件或文件夹的访问。而是请参阅 [Bookmarks](./bookmarks) 页面，了解如何保持对存储项的访问。

请勿直接使用 Path 属性按路径直接读取文件，因为在大多数移动和浏览器平台上不起作用。请改用 [OpenReadAsync](#openreadasync) 和 [OpenWriteAsync](#openwriteasync)。
:::

### CanBookmark

返回项是否可以被加入书签并在以后重用。

### SaveBookmarkAsync

将项保存为书签。
返回书签的标识符。如果操作系统拒绝请求，则可能为空。

### GetBasicPropertiesAsync

获取当前项的基本属性。
当前可用的属性有：
- 大小
- 创建日期
- 修改日期

### GetParentAsync

获取当前存储项的父文件夹。

### DeleteAsync

删除当前存储项及其内容。

### MoveAsync

将当前存储项及其内容移动到 IStorageFolder。

## StorageFile 成员

### OpenReadAsync

打开一个用于读取访问的流。

### OpenWriteAsync

打开一个用于写入文件的流。

## StorageFolder 成员

### GetItemsAsync

获取当前文件夹中的文件和子文件夹。
当此方法成功完成时，它返回当前文件夹中文件和文件夹的列表。列表中的每个项都由 IStorageItem 实现对象表示。

:::note
该方法是惰性求值的，并且是异步的。
:::

### CreateFileAsync

在当前存储文件夹的子级中创建一个具有指定名称的文件。

### CreateFolderAsync

在当前存储文件夹的子级中创建一个具有指定名称的文件夹。

## Extension methods

### TryGetLocalPath

Gets the local file system path of the item as a string.
Android platform usually uses "content:" virtual file paths and Browser platform has isolated access without full paths, so on these platforms this method will return null.

:::note
If you want to save file path to reuse it later (in combination with TryGetFileFromPathAsync), please consider using [Bookmarks](./bookmarks) instead as they are designed to work in sandboxed environment, where user app might not have direct access to the physical file system.
:::