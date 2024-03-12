---
description: TUTORIALS - Music Store App
---

import MusicStoreiTunesSearchNugetScreenshot from '/img/tutorials/music-store-app/searching-for-albums/image-20210310013703557.png';
import MusicStoreAlbumViewScreenshot from '/img/tutorials/music-store-app/searching-for-albums/image-20210310110401944.png';

# 专辑服务

在这一页中，您将为应用程序添加一些业务逻辑。这将允许您替换模拟数据，并从搜索中获取一些真实的专辑数据。这个业务逻辑代码形成了 MVVM 模式中的“模型”部分。

为了在应用程序中实现真实的专辑搜索，您将使用一个可以调用 _Apple iTunes_ Web API 专辑搜索的 _NuGet_ 包。

## Apple Web API 包

按照以下步骤添加所需的 _NuGet_ 包：

- 如果应用程序仍在运行，请停止应用程序。
- 右键单击项目。
- 单击 **管理 NuGet 软件包**。

<p><img className="image-medium-zoom" src={MusicStoreiTunesSearchNugetScreenshot} alt="" /></p>

- 在左上角的搜索框中键入 “itunes”。
- 单击 **iTunesSearch**，然后单击 **安装**。

## MVVM 模型

在本教程中，应用程序很简单，您可以在同一个类中实现 MVVM 模式的“模型”部分所需的业务服务。这个类将包含专辑的数据模型和搜索所需的方法。

按照以下步骤添加专辑业务逻辑：

- 在解决方案资源管理器中，右键单击 **/Models** 文件夹，然后单击 **添加**。
- 单击 **类**。
- 在提示输入名称时，键入 “Album”。
- 添加以下代码：

```csharp
using iTunesSearch.Library;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Avalonia.MusicStore.Models
{
    public class Album
    {
        private static iTunesSearchManager s_SearchManager = new();

        public string Artist { get; set; }
        public string Title { get; set; }
        public string CoverUrl { get; set; }

        public Album(string artist, string title, string coverUrl)
        {
            Artist = artist;
            Title = title;
            CoverUrl = coverUrl;
        }

        public static async Task<IEnumerable<Album>> SearchAsync(string searchTerm)
        {
            var query = await s_SearchManager.GetAlbumsAsync(searchTerm)
                .ConfigureAwait(false);
                
            return query.Albums.Select(x =>
                new Album(x.ArtistName, x.CollectionName, 
                    x.ArtworkUrl100.Replace("100x100bb", "600x600bb")));
        }
    }  
}
```

## 专辑视图模型

为了在搜索结果列表中显示来自 Web API 的每个专辑（数据模型）的数据，您将创建一个专辑视图模型，并将其绑定到专辑视图（磁贴）以进行显示。

您的专辑视图模型目前是空的。它需要能够存储来自搜索的专辑数据，并具有一些用于艺术家名称和专辑标题的属性。然后，这些属性将绑定到视图以进行显示。

在这一步中，您将使用视图模型和（业务逻辑）模型之间的依赖关系的常见模式。这是指视图模型包含数据模型的一个实例，然后根据需要公开其某些属性以进行显示。

按照以下步骤准备专辑视图模型：

- 定位并打开 **AlbumViewModel.cs** 文件。
- 添加如下所示的代码：

```csharp
private readonly Album _album;

public AlbumViewModel(Album album)
{
    _album = album;
}

public string Artist => _album.Artist;

public string Title => _album.Title;
```

请注意，由于视图模型属性在运行时不会在 UI 中更改，因此它们没有 setter，只有一个普通的 getter，这里也不需要使用 `RaiseAndSetIfChanged` 方法。

## 开始搜索

在这一步中，您将向音乐商店视图模型中添加一些代码，以便每当搜索文本发生更改时，专辑模型（业务服务）上的 `SearchAsync` 方法就会启动。当它完成时，搜索将其结果放入可观察集合 `SearchResults` 中。这个集合已经绑定到列表框，因此通过对专辑视图进行小调整，搜索结果将显示为您之前准备的磁贴。

按照以下步骤，在搜索文本更改时启动搜索：

- 定位并打开 **MusicStoreViewModel.cs** 文件。
- 替换构造函数代码，并添加额外的代码，如下所示：

```csharp
using Avalonia.MusicStore.Models;
using ReactiveUI;
using System;
using System.Collections.ObjectModel;
using System.Reactive.Linq;
using System.Threading;

namespace Avalonia.MusicStore.ViewModels
{
    public class MusicStoreViewModel : ViewModelBase
    {
        ...
       
        public MusicStoreViewModel()
        {
            this.WhenAnyValue(x => x.SearchText)
                .Throttle(TimeSpan.FromMilliseconds(400))
                .ObserveOn(RxApp.MainThreadScheduler)
                .Subscribe(DoSearch!);
        }
       
        private async void DoSearch(string s)
        {
            IsBusy = true;
            SearchResults.Clear();

            if (!string.IsNullOrWhiteSpace(s))
            {
                var albums = await Album.SearchAsync(s);

                foreach (var album in albums)
                {
                    var vm = new AlbumViewModel(album);
                    SearchResults.Add(vm);
                }
            }

            IsBusy = false;
        }
    }
}
```

`WhenAnyValue` 方法由 _ReactiveUI_ 框架提供，作为 `ReactiveObject` 的一部分（继承自 `ViewModelBase`）。该方法接受一个 lambda 表达式参数，该参数获取要观察的属性。因此，在上面的代码中，每当用户键入以更改搜索文本时，都会发生一个事件。

在尝试运行搜索之前等待用户停止键入是一个很好的设计。`Throttle` 方法可以让事件在经过指定的时间间隔（400毫秒）后没有再次发生才会被处理。这意味着在用户停止键入 400 毫秒或更长时间之前，不会开始处理。

:::info
`ObserveOn` 方法是必需的，以确保订阅的方法始终在 UI 线程上调用。在 _Avalonia UI_ 应用程序中，您必须始终在 UI 线程上更新 UI。
:::

最后，`Subscribe` 方法对每个观察到的事件调用 `DoSearch` 方法。`DoSearch` 方法以异步方式运行，没有返回值。

## 绑定专辑视图

您在上一页上对专辑“磁贴”视图进行的格式化工作没有添加任何显示搜索结果文本的方法。

按照以下步骤，将专辑名称和艺术家名称添加到磁贴中：

- 定位并打开 **AlbumView.axaml** 文件。
- 添加两个文本块控件及其数据绑定，如下所示：
- To have compiled binding working, you need to indicate the datatype used in the view : AlbumViewModel.

```xml
<UserControl ...
  xmlns:vm="using:Avalonia.MusicStore.ViewModels"
  x:DataType="vm:AlbumViewModel" >

  <StackPanel Spacing="5" Width="200">
    <Border CornerRadius="10" ClipToBounds="True">
      <Panel Background="#7FFF22DD">
        <Image Width="200" Stretch="Uniform" />
        <Panel Height="200">
          <PathIcon Height="75" Width="75" Data="{StaticResource music_regular}" />
        </Panel>
      </Panel>
    </Border>
    <TextBlock HorizontalAlignment="Center" Text="{Binding Title}"/>
    <TextBlock HorizontalAlignment="Center" Text="{Binding Artist}"/>
  </StackPanel>
</UserControl>
```

- 点击 **调试** 编译并运行项目。
- 点击图标按钮。
- 输入一些搜索文本。

<p><img className="image-medium-zoom" src={MusicStoreAlbumViewScreenshot} alt="" /></p>

在下一页中，您将学习如何通过获取每个专辑的封面艺术来改善应用程序的外观。磁铁将会显示封面图像，而非音符图标。
