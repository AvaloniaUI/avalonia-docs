---
id: bookmarks
title: 书签 Bookmarks
---

# 书签 Bookmarks

在现代操作系统中，书签（bookmarks）用于在权限受限/隐私环境下保持对文件和文件夹的长期访问。例如，在 iOS 和较新版本的 macOS 上，应用通常通过系统提供的文件选择器让用户授权访问，然后操作系统返回一个受信任的书签，应用可以用该书签在未来访问对应的文件或文件夹。

在 Avalonia 的 `StorageProvider` 中，这些书签由 `IStorageBookmarkFile` 和 `IStorageBookmarkFolder` 实现。

## Avalonia.Platform.Storage
### IStorageBookmarkItem 接口
`IStorageBookmarkItem` 表示一个已书签化的存储项。它继承自 `IStorageItem` 并实现 `IDisposable`。此接口不是客户端可实现的，即无特殊权限时无法自行实现该接口。

关键属性与方法摘要：

#### 属性
`CanBookmark`：指示该项目是否可以被创建书签并在以后复用。

`Name`：项目的名称。

`Path`：项目的系统路径（若可用）。

#### 方法
`CreateFileAsync(String)`、`CreateFolderAsync(String)`、`DeleteAsync()`、`Dispose()`、`GetBasicPropertiesAsync()`、`GetFileAsync(String)`、`GetFolderAsync(String)`、`GetItemsAsync()`、`GetParentAsync()`、`MoveAsync(IStorageFolder)`、`ReleaseBookmarkAsync()`、`SaveBookmarkAsync()`。

### IStorageBookmarkFolder 接口
#### 属性
与 `IStorageBookmarkItem` 相同。

#### 方法
`DeleteAsync()`、`Dispose()`、`GetBasicPropertiesAsync()`、`GetParentAsync()`、`MoveAsync(IStorageFolder)`、`OpenReadAsync()`、`OpenWriteAsync()`、`ReleaseBookmarkAsync()`、`SaveBookmarkAsync()`。

> 注意：文件和文件夹对象都提供 `SaveBookmarkAsync()` 和 `ReleaseBookmarkAsync()`，方法名相同，但对象类型会是 `IStorageBookmarkFile` 或 `IStorageBookmarkFolder`（两者都派生自 `IStorageBookmarkItem`）。结束使用后应释放实现了 `IDisposable` 的书签对象。

## 如何使用书签方法
下面提供实用指南，说明如何保存、加载以及使用书签访问文件内容。

### 保存与加载书签
要为特定文件或文件夹获取书签 ID，请使用存储项上的 `SaveBookmarkAsync()` 异步方法。获取到书签 ID 后，可将其保存到本地（例如应用私有目录）以便下次直接用书签访问，而无需再次请求用户选择。

`SaveBookmarkAsync()`：用于获取所选文件或文件夹的书签 ID，可以将该 ID 存储以便后续复用。

```csharp
// 示例：保存当前选中文件夹的书签 ID
private async Task SaveBookmarksAsync(Control control)
{
    // 需要先选中一个文件夹
    if (_lastSelectedFolder == null) return;

    var bookmarkId = await _lastSelectedFolder.SaveBookmarkAsync();

    if (bookmarkId != null)
    {
        // 将 bookmarkId 保存到本地文件或数据库中以便以后使用
        // 写入应用私有目录中的 JSON 文件（省略具体实现）
    }
}
```

要通过书签 ID 打开已书签化的文件夹或文件，可以使用 `OpenFolderBookmarkAsync()` 或 `OpenFileBookmarkAsync()`。如果操作系统拒绝请求，这些方法会返回 `null`。

```csharp
// 示例：通过书签 ID 打开书签化的文件夹
private async Task LoadFolderByBookmarkAsync(Control control, string bookmarkId)
{
    if (string.IsNullOrEmpty(bookmarkId)) return;

    var toplevel = TopLevel.GetTopLevel(control);
    if (toplevel?.StorageProvider != null)
    {
        var folder = await toplevel.StorageProvider.OpenFolderBookmarkAsync(bookmarkId);

        if (folder != null)
        {
            // 成功打开书签文件夹
            LastSelectedFolder = folder;
        }
    }
}
```

`ReleaseBookmarkAsync()`：用于撤销操作系统授予的安全范围访问。使用完成后应调用它以释放权限并在需要时释放书签资源。

```csharp
// 示例：释放文件夹书签并从本地存储移除对应的 ID
private async Task ReleaseBookmarkAsync(Control control, string bookmarkId)
{
    if (string.IsNullOrEmpty(bookmarkId)) return;

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

    // 从本地存储中移除 bookmarkId（省略具体实现）
}
```


### 从书签读取与写入文件内容
一旦通过 `OpenFileBookmarkAsync()` 获取到书签化的文件（`IStorageFile` / `IStorageBookmarkFile`），应使用流接口来读取或写入内容：`OpenReadAsync()`（读取）和 `OpenWriteAsync()`（写入）。这两个方法来源于 `IStorageFile`。

`OpenReadAsync()`：打开一个用于读取的流。

`OpenWriteAsync()`：打开一个用于写入的流（覆盖或写入，依提供者实现可能有所不同）。

下面给出两个独立、可复制的示例：一个仅读取，另一个仅读取完成后单独写入（风格与文档其余部分一致）。

```
// 仅读取示例：从书签打开文件并加载文本内容
private async Task LoadFileByBookmarkAsync(Control control, string bookmarkId)
{
    if (string.IsNullOrEmpty(bookmarkId)) return;

    var toplevel = TopLevel.GetTopLevel(control);
    if (toplevel?.StorageProvider != null)
    {
        var bookmarkedFile = await toplevel.StorageProvider.OpenFileBookmarkAsync(bookmarkId);
        if (bookmarkedFile != null)
        {
            await using var readStream = await bookmarkedFile.OpenReadAsync();
            using var reader = new StreamReader(readStream, Encoding.UTF8);
            FileContent = await reader.ReadToEndAsync();
        }
    }
}
```

```
// 仅写入示例：通过书签打开文件并将文本写入（覆盖）
private async Task SaveFileByBookmarkAsync(Control control, string bookmarkId)
{
    if (string.IsNullOrEmpty(bookmarkId)) return;

    var toplevel = TopLevel.GetTopLevel(control);
    if (toplevel?.StorageProvider != null)
    {
        var bookmarkedFile = await toplevel.StorageProvider.OpenFileBookmarkAsync(bookmarkId);
        if (bookmarkedFile != null && FileContent != null)
        {
            await using var writeStream = await bookmarkedFile.OpenWriteAsync();
            await using var writer = new StreamWriter(writeStream, Encoding.UTF8);
            await writer.WriteAsync(FileContent);
        }
    }
}
```

### 管理书签化的文件和文件夹
一旦加载书签，你可以使用继承自 `IStorageItem` 的方法来操作文件或文件夹。常用方法包括：
`DeleteAsync()`：异步删除该存储项及其内容。

`MoveAsync(IStorageFolder)`：异步将该存储项移动到另一文件夹。

`GetBasicPropertiesAsync()`：获取基本属性（大小、修改时间等）。

`GetParentAsync()`：获取父文件夹。

扩展方法 `TryGetLocalPath()`：尝试返回本地文件系统路径（在某些平台上可能为 `null`，例如 Android 的 content: URI 或浏览器环境）。

示例：

```
// 删除示例
private async Task DeleteFileAsync()
{
    if (SelectedFile != null && LastSelectedFolder != null)
    {
        await SelectedFile.DeleteAsync();
        // 刷新 UI 等后续操作
    }
}
```

## 平台相关的书签表示
书签 ID 的具体形式会因平台而异：

Windows：通常是绝对路径的字符串，例如 `C:\Documents\Avalonia\bookmarks.pdf`。

Android：使用 content URI，如 `content://[Authority]/[path]/[id]`，例如当内容提供者（包名，`[Authority]`）为 `com.android.externalstorage.documents` 时，路径可以表示为 `content://com.android.externalstorage.documents/tree/...`（详细参见：[Create a content provider | Android Developers](https://developer.android.com/guide/topics/providers/content-provider-creating?hl=zh-cn)）。

:::note
具体的行为和能力可能取决于特定操作系统及其安全策略。例如，在某些平台上，如果用户移动或重命名书签指向的文件或文件夹，那么书签可能会失效。
:::

:::note
不建议在远程数据库中存储书签ID，因为书签可能不是持久的，并且可能包含敏感的文件路径信息。
:::