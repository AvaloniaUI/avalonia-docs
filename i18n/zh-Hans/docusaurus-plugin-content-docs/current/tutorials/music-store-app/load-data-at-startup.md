---
description: TUTORIALS - Music Store App
---

import MusicStoreLoadedDataStartScreenshot from '/img/tutorials/music-store-app/load-data-at-startup/image-20210310184202271.png';

# 在启动时加载数据

在本页上，您将添加代码以在应用程序启动时从磁盘加载用户的专辑收藏。

您已经在业务服务中添加了可以从磁盘加载所需文件的代码，现在需要做的就是在主窗口视图模型中添加一些代码来处理启动。

按照以下步骤添加一个方法来从磁盘加载用户的专辑收藏：

- 如果应用程序正在运行，请停止它。
- 找到并打开 **MainWindowViewModel.cs** 文件。
- 添加如下所示的代码：

```csharp
private async void LoadAlbums()
{
    var albums = (await Album.LoadCachedAsync()).Select(x => new AlbumViewModel(x));

    foreach (var album in albums)
    {
        Albums.Add(album);
    }

    foreach (var album in Albums.ToList())
    {
        await album.LoadCover();
    }
}
```

正如您所看到的，这个方法使用业务服务从磁盘缓存中加载专辑列表。然后，它将每个数据模型（`Album` 类）转换为视图模型（`AlbumViewModel` 类）。在此之后，所有专辑视图模型都将添加到可观察集合中，这将立即使用专辑的文本数据更新 UI。

您会注意到，在加载 JSON 专辑文件之后，第二个循环加载封面艺术图片文件。这为用户提供了尽可能快的视觉反馈（以专辑磁贴的形式，包含文本和占位符音符图标），告诉用户收藏中有哪些专辑。然后异步加载封面图像，这确保了在图像加载过程中应用程序仍能保持响应。

下一步是在应用程序启动时调度 `LoadAlbum` 方法运行。

要在主线程上调度该方法，请按照以下步骤进行：

- 保持 **MainWindowViewModel.cs** 文件打开。
- 添加对 `using System.Reactive.Concurrency;` 的引用。
- 将以下代码添加到类的构造函数中：

```csharp
RxApp.MainThreadScheduler.Schedule(LoadAlbums);
```

- 点击**调试**以编译和运行项目。

<p><img className="image-medium-zoom" src={MusicStoreLoadedDataStartScreenshot} alt="" /></p>
