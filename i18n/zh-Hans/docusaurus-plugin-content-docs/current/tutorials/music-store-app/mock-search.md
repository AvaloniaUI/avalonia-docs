---
description: TUTORIALS - Music Store App
---

import MusicStoreMockSearchScreenshot from '/img/tutorials/music-store-app/add-content-to-dialog/text-list.png';

# 模拟搜索

在本页面上，您将为专辑搜索功能创建视图模型，然后将其绑定到新用户控件上的控件上。现在，您将使用模拟的搜索，以便专注于视图模型。

## 响应式视图模型

_ReactiveUI_ 框架为 _Avalonia UI_ 提供了对其数据绑定系统的支持。您可以通过从 `ReactiveObject` 类派生您的视图模型来添加此支持，这是通过在项目开始时由解决方案模板添加到您的项目中的 `ViewModelBase` 类实现的。

按照以下步骤从 `ReactiveObject` 类派生类：

- 找到并打开 **MusicStoreViewModel.cs** 文件。
- 添加代码以从 `ViewModelBase` 派生类。

```csharp
namespace Avalonia.MusicStore.ViewModels
{
    public class MusicStoreViewModel : ViewModelBase
    {
    }
}
```

这将为您的视图模型添加重要的扩展方法 `RaiseAndSetIfChanged`，并允许您为其中的属性提供通知更改的能力。

:::info
要了解 MVVM 模式和通知背后的概念，请参阅[此处](../../concepts/the-mvvm-pattern/)。
:::

在这个阶段，您将为搜索应用程序逻辑创建两个属性：

* 一个文本字符串，作为搜索条件，
* 一个布尔值，指示搜索是否繁忙。

- 添加以下代码来实现上述属性：

```csharp
using ReactiveUI;

namespace AvaloniaApplication11.ViewModels
{
    public class MusicStoreViewModel : ViewModelBase
    {
        private string? _searchText;
        private bool _isBusy;

        public string? SearchText
        {
            get => _searchText;
            set => this.RaiseAndSetIfChanged(ref _searchText, value);
        }

        public bool IsBusy
        {
            get => _isBusy;
            set => this.RaiseAndSetIfChanged(ref _isBusy, value);
        }

    }
}
```

您可以看到，这些属性具有正常的公共 getter，它返回私有值字段；但是 setter 调用了 `RaiseAndSetIfChanged` 方法，以实现通知。

## 数据绑定

接下来，您将添加数据绑定以将视图与视图模型关联起来。文本框将绑定到搜索文本，进度条是否对用户可见将绑定到布尔值。

按照以下步骤将数据绑定添加到视图中：

- 找到并打开 **MusicStoreView.axaml** 文件。
- 添加所示的绑定表达式：

```xml
<UserControl ...>
    <!-- ... -->
    <DockPanel>
      <StackPanel DockPanel.Dock="Top">
        <TextBox Text="{Binding SearchText}" Watermark="Search for Albums...." />
        <ProgressBar IsIndeterminate="True" IsVisible="{Binding IsBusy}" />
      </StackPanel>
      <Button Content="Buy Album"
              DockPanel.Dock="Bottom"
              HorizontalAlignment="Center" />
      <ListBox/>
    </DockPanel>
    <!-- ... -->
</UserControl>
```

## 专辑搜索与选择

下一步是创建音乐商店视图模型属性，以处理专辑。这些属性包括：

* 一个专辑视图模型的集合，用于表示搜索可能找到的专辑，
* 一个属性，用于保存用户选择的专辑。

在这里，您将使用 `ObservableCollection`，这是一个由 .NET 框架提供的能够进行通知的集合。

按照以下步骤添加上述属性：

- 找到并打开 **MusicStoreViewModel.cs** 文件。
- 将以下代码添加到类中：

```csharp
private AlbumViewModel? _selectedAlbum;

public ObservableCollection<AlbumViewModel> SearchResults { get; } = new();

public AlbumViewModel? SelectedAlbum
{
    get => _selectedAlbum;
    set => this.RaiseAndSetIfChanged(ref _selectedAlbum, value);
}
```

接下来，将这些属性绑定到视图中的列表框，按照以下步骤进行操作：

- 定位并打开 **MusicStoreView.axaml** 文件。
- 将所示的绑定表达式添加到 `<ListBox>` 元素中：

```xml
<ListBox ItemsSource="{Binding SearchResults}" SelectedItem="{Binding SelectedAlbum}" />
```

## 模拟数据

现在，为了在这个阶段测试应用程序，您将直接向视图模型添加一些模拟数据。

按照以下步骤进行操作：

- 定位并再次打开 **MusicStoreViewModel.cs** 文件。
- 向类添加一个构造函数，如下所示：

```csharp
public MusicStoreViewModel()
{
    SearchResults.Add(new AlbumViewModel());
    SearchResults.Add(new AlbumViewModel());
    SearchResults.Add(new AlbumViewModel());
}
```

- 点击 **调试** 编译并运行项目。

<p><img className="image-medium-zoom" src={MusicStoreMockSearchScreenshot} alt="" /></p>

这表明从视图模型中的专辑集合到视图中的列表的数据绑定正在工作，但是视图还没有图形化。在下一页中，您将通过用图形化的专辑磁贴替换文本来进一步开发应用程序。
