---
id: bookmarks
title: Bookmarks
---

### Bookmarks

Bookmarks are particularly important for maintaining access to files and folders in modern operating systems that have strict security and privacy controls. For instance, on platforms like iOS and newer versions of macOS, direct file system access is heavily restricted. Instead, applications request the user to select a file or folder through a system-provided file picker, and the operating system then gives the application a security-scoped bookmark that it can use to access that file or folder in the future.

In Avalonia's `StorageProvider`, these bookmarks are represented as `IStorageBookmarkFile` and `IStorageBookmarkFolder` interfaces. You can use the `OpenFileBookmarkAsync` and `OpenFolderBookmarkAsync` methods to open a bookmarked file or folder using its bookmark ID. This will return the bookmarked file or folder, or null if the operating system denies the request.

:::note
The exact behavior and capabilities can depend on the specific operating system and its security policies. For instance, on some platforms, a bookmark might become invalid if the user moves or renames the file or folder that it points to.
:::