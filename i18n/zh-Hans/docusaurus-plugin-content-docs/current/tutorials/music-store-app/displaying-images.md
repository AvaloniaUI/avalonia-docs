---
description: TUTORIALS - Music Store App
---

import MusicStoreDisplayingImagesScreenshot from '/img/tutorials/music-store-app/displaying-images/image-20210310173858088.png';

# 展示图象

在本页中，您将学习如何从搜索结果中获取每个专辑的封面图像，在每个专辑磁贴视图上显示图像，而不是占位符音符图标。

## 专辑服务

您的第一步是修改业务服务，从 _Apple iTunes_ Web API 中获取专辑封面图像。

按照以下步骤从 Web API 获取专辑封面图像：

- 如果应用程序仍在运行，请停止应用程序。
- 在 **/Models** 文件夹中找到并打开 **Album.cs** 文件。
- 添加如下代码：

```csharp
private static HttpClient s_httpClient = new();
private string CachePath => $"./Cache/{Artist} - {Title}";

public async Task<Stream> LoadCoverBitmapAsync()
{
    if (File.Exists(CachePath + ".bmp"))
    {
        return File.OpenRead(CachePath + ".bmp");
    }
    else
    {
        var data = await s_httpClient.GetByteArrayAsync(CoverUrl);
        return new MemoryStream(data);
    }
}
```

该方法返回一个流，可以用来加载位图，可以从缓存文件或 API 中加载。

:::info
请注意，此时缓存尚未启用，您将在本教程的后面部分实现它。
:::

- 为了在缓存启用时立即看到效果，请在以下代码行上设置一个调试断点：

```csharp
return File.OpenRead(CachePath + ".bmp");
```

## 专辑视图模型

在这一步中，您将向专辑视图模型添加一个属性，用于将封面艺术存储为位图。

:::warning
注意：您必须在专辑视图模型中引用 `Avalonia.Media.Imaging`，因为您必须在这里使用 _Avalonia UI_ 位图，而不是 .NET 的 `System.Bitmap`。
:::

按照以下步骤更新专辑视图模型：

- 找到并打开 **AlbumViewModel.cs** 文件。
- 添加 `using Avalonia.Media.Imaging;` 引用。
- 添加专辑封面的额外代码，如下所示：

```csharp
using Avalonia.Media.Imaging;
...

public class AlbumViewModel : ViewModelBase
{
    ...
    
    private Bitmap? _cover;

    public Bitmap? Cover
    {
        get => _cover;
        private set => this.RaiseAndSetIfChanged(ref _cover, value);
    }
    
    public async Task LoadCover()
    {
        await using (var imageStream = await _album.LoadCoverBitmapAsync())
        {
            Cover = await Task.Run(() => Bitmap.DecodeToWidth(imageStream, 400));
        }
    }
}   
```

请花些时间仔细阅读此代码，因为它可以让您了解如何使用 _Avalonia UI_ 操作图像。例如，上面的代码使用 `DecodeToWidth` 方法将图像流转换为 _Avalonia UI_ 中的显示格式。该方法可以将大分辨率图像的流转换为较小的位图，指定宽度并保持纵横比。

这意味着即使 Web API 返回相当大的文件，您也不会浪费大量内存来显示专辑封面图像。

还请注意 `LoadCover` 方法如何编码为异步运行，并在后台线程上运行。这样可以避免阻塞 UI 线程，使 UI 变得无响应。

## 加载封面图像

在这一步中，您将修改音乐商店视图模型中的专辑搜索，以便为找到的每个专辑加载封面图像。为了保持应用程序的响应性，您将使此过程既异步又可取消。

首先，您需要添加一个方法，可以在返回搜索结果时开始加载专辑封面。您将使此方法异步和可取消。

按照以下步骤添加加载专辑封面艺术的方法：

- 找到并打开 **MusicStoreViewModel.cs** 文件。
- 添加如下代码：

```csharp
private async void LoadCovers(CancellationToken cancellationToken)
{
    foreach (var album in SearchResults.ToList())
    {
        await album.LoadCover();

        if (cancellationToken.IsCancellationRequested)
        {
            return;
        }
    }
}
```

:::warning
重要提示：此方法通过搜索结果集合的**副本**进行迭代（由 `ToList` 方法创建）。这是因为它在自己的线程上异步运行，原始结果集合可能随时被另一个线程更改。
:::

取消令牌参数将允许您在需要时停止加载专辑封面的方法。

## 可取消的图像加载

在这一步中，您将在音乐商店视图模型的 `DoSearch` 方法中调用 `LoadCovers` 方法，但要进行完整的取消管理。

按照以下步骤进行操作：

- 在 **MusicStoreViewModel.cs** 文件中添加此字段。

```csharp
private CancellationTokenSource? _cancellationTokenSource;
```

- 修改 `DoSearch` 方法开头的代码，设置取消令牌：

```csharp
_cancellationTokenSource?.Cancel();
_cancellationTokenSource = new CancellationTokenSource();
var cancellationToken = _cancellationTokenSource.Token;
```

因此，如果仍有正在加载专辑封面的现有请求，它将被取消。同样，由于 `_cancellationTokenSource` 可能会被另一个线程异步替换，因此您必须使用存储为局部变量的副本进行操作。

- 将以下代码添加到 `DoSearch` 方法的末尾：

```csharp
if (!cancellationToken.IsCancellationRequested)
{
    LoadCovers(cancellationToken);
}
```

目前，您的 `DoSearch` 方法应该如下所示：

```csharp
private async void DoSearch(string s)
{
    IsBusy = true;
    SearchResults.Clear();

    _cancellationTokenSource?.Cancel();
    _cancellationTokenSource = new CancellationTokenSource();
    var cancellationToken = _cancellationTokenSource.Token;

    if (!string.IsNullOrWhiteSpace(s))
    {
        var albums = await Album.SearchAsync(s);

        foreach (var album in albums)
        {
            var vm = new AlbumViewModel(album);

            SearchResults.Add(vm);
        }

        if (!cancellationToken.IsCancellationRequested)
        {
            LoadCovers(cancellationToken);
        }
    }

    IsBusy = false;
}
```

## 专辑视图

在这一步中，您将更改专辑视图中的数据绑定，以便磁贴可以显示专辑封面图像。您还将添加一个测试，以便仅在专辑封面图像不可用（为 null）时显示占位符面板。

按照以下步骤进行操作：

- 找到并打开 **AlbumView.axaml** 文件。
- 将数据绑定 `Source="{Binding Cover}"` 添加到 `<Image>` 元素中：
- 将此数据绑定和转换器添加到下面的面板元素中：

```
IsVisible="{Binding Cover, Converter={x:Static ObjectConverters.IsNull}}"
```

转换器是数据绑定表达式的扩展，可以在传递给绑定控件之前转换绑定值。`IsNull` 转换器返回一个布尔值，当值对象为 null 时为 true。

:::info
有关 _Avalonia UI_ 内置绑定转换器的更多信息，请参阅[此处](../../reference/built-in-data-binding-converters.md)的参考文档。
:::

- 单击 **调试** 编译并运行项目。
- 单击图标按钮。
- 输入一些搜索文本。

<p><img className="image-medium-zoom" src={MusicStoreDisplayingImagesScreenshot} alt="" /></p>

注意专辑封面逐个加载，并且界面保持响应。

在下一页中，您将学习如何在用户单击 **购买专辑** 时从对话框返回所选专辑。
