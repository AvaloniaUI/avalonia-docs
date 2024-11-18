---
description: TUTORIALS - Music Store App
---

# 添加数据持久性

在本页中，您将向专辑模型（业务服务）添加一些代码，将用户的专辑集合保存到磁盘上，以便在下次运行应用程序时可以恢复。

作为一个额外的好处，这也将实现专辑封面缓存为，这样专辑封面图像就可以从磁盘上获取（如果存在的话），而不是从 Web API 上获取。

## 专辑模型

按照以下步骤向专辑模型添加持久性服务（保存和加载）：

- 如果应用程序正在运行，请停止它。
- 找到并打开 **Album.cs** 文件（位于 **/Models** 文件夹中）。
- 添加实现保存到磁盘的代码，如下所示：

```csharp
public async Task SaveAsync()
{
    if (!Directory.Exists("./Cache"))
    {
        Directory.CreateDirectory("./Cache");
    }

    using (var fs = File.OpenWrite(CachePath))
    {
        await SaveToStreamAsync(this, fs);
    }
}

public Stream SaveCoverBitmapStream()
{
    return File.OpenWrite(CachePath + ".bmp");
}

private static async Task SaveToStreamAsync(Album data, Stream stream)
{
    await JsonSerializer.SerializeAsync(stream, data).ConfigureAwait(false);
}
```

- 添加实现从磁盘加载的代码，如下所示：

```csharp
public static async Task<Album> LoadFromStream(Stream stream)
{
    return (await JsonSerializer.DeserializeAsync<Album>(stream).ConfigureAwait(false))!;
}

public static async Task<IEnumerable<Album>> LoadCachedAsync()
{
    if (!Directory.Exists("./Cache"))
    {
        Directory.CreateDirectory("./Cache");
    }

    var results = new List<Album>();

    foreach (var file in Directory.EnumerateFiles("./Cache"))
    {
        if (!string.IsNullOrWhiteSpace(new DirectoryInfo(file).Extension)) continue;

        await using var fs = File.OpenRead(file);
        results.Add(await Album.LoadFromStream(fs).ConfigureAwait(false));
    }

    return results;
}
```

## 专辑视图模型

接下来，您需要在专辑视图模型中添加一个方法，以便它可以调用业务服务持久化保存方法：

`SaveAsync` - 将专辑文本数据保存为 JSON 文件，

`SaveCoverBitmapStream` - 将封面图像保存为位图（.BMP）文件。

要修改专辑视图模型，请按照以下步骤进行操作：

- 定位并打开 **AlbumViewModel.cs** 文件。
- 添加如下所示的方法：

```csharp
public async Task SaveToDiskAsync()
{
    await _album.SaveAsync();

    if (Cover != null)
    {
        var bitmap = Cover;

        await Task.Run(() =>
        {
            using (var fs = _album.SaveCoverBitmapStream())
            {
                bitmap.Save(fs);
            }
        });
    }
}
```

再次注意，位图是从副本中保存的，以防在操作过程中由另一个线程更改了 `Cover` 属性。

## 主窗口视图模型

最后，当对话框返回非空结果时，您将调用新的专辑视图模型持久化方法 `SaveToDiskAsync`。

要修改主窗口视图模型，请按照以下步骤进行操作：

- 定位并打开 **MainWindowViewModel.cs** 文件。
- 添加如下所示的代码 `await result.SaveToDiskAsync();`。

现在，您初始化响应式式命令的代码将如下所示：

```csharp
BuyMusicCommand = ReactiveCommand.CreateFromTask(async () =>
{
    var store = new MusicStoreViewModel();

    var result = await ShowDialog.Handle(store);

    if (result != null)
    {
        Albums.Add(result);
        await result.SaveToDiskAsync();
    }
});
```

- 点击 **Debug** 来编译和运行项目。
- 点击图标按钮。
- 输入一些搜索文本。
- 点击一个专辑来选择它。
- 点击 **购买专辑**。
- 为另一个专辑重复上述步骤。

您目前在应用程序中看不到任何差异。但是您可以检查以确保持久化文件已经被写入。要做到这一点，打开项目位置并浏览到 **/bin/Debug** 文件夹。打开您的 .NET 版本的文件夹，您将在那里找到 **/Cache** 文件夹。您将看到刚刚选择的每个专辑的两个缓存文件。

## 位图缓存已激活

请注意，由于 `SaveToDiskAsync` 方法将 JSON 数据和专辑封面位图都写入缓存文件夹，因此此步骤实际上已经实现了您之前构建的位图加载缓存行为。这意味着：如果一个专辑封面已经从 Web API 中获取并保存到缓存中，下一次加载位图将从文件而不是 API 中进行，从而节省时间并使应用程序响应更加敏捷。

要显示位图加载缓存正在运行的状态，请按照以下步骤进行操作：

- 如果应用程序正在运行，请停止它。
- 定位并打开 **Album.cs** 文件在 **/Models** 文件夹中。
- 检查是否仍然在 `LoadCoverBitmapAsync` 方法的这一行中设置了一个调试断点：

```csharp
return File.OpenRead(CachePath + ".bmp");
```

* 点击 **Debug** 来编译和运行项目。
* 点击图标按钮。
* 输入刚刚使用的相同搜索文本。
* 选择和上一次测试运行时选中的_相同的_专辑。
* 点击 **购买专辑**。

调试断点应该会停止应用程序。这证明了专辑封面即将从磁盘中读取，而不是从 Web API 中获取。

在下一页中，您将完成持久化功能，并在应用程序首次启动时从缓存中加载用户的专辑收藏。
