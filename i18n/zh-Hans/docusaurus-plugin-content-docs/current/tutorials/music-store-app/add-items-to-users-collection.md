---
description: TUTORIALS - Music Store App
---

import MusicStoreAddedAlbumsScreenshot from '/img/tutorials/music-store-app/add-items-to-users-collection/image-20210310175949319.png';

# 将项目添加到用户的集合中

在本页中，您将实现一个包含用户使用搜索对话框和 **购买专辑** 按钮选择的专辑的集合，并在主窗口中显示它们。

## 可观察集合

您的第一步是在主窗口视图模型中添加一个可观察集合。这将保存用户使用搜索对话框选择的专辑。

按照以下步骤操作：

- 如果应用程序正在运行，请停止它。
- 找到并打开 **MainWindowViewModel.cs** 文件。
- 添加一个可观察集合，如下所示：

```csharp
public ObservableCollection<AlbumViewModel> Albums { get; } = new();
```

## 处理对话框结果

下一步是修改购买音乐的响应式命令，以便将对话框返回的对象（一个 `AlbumViewModel`）添加到可观察集合中。按照以下步骤操作：

- 修改初始化响应式命令的代码，如下所示：

```csharp
BuyMusicCommand = ReactiveCommand.CreateFromTask(async () =>
{
    var store = new MusicStoreViewModel();
    var result = await ShowDialog.Handle(store);
    if (result != null)
    {
        Albums.Add(result);
    }
});
```

## 主窗口视图

接下来，您将在主窗口视图中添加 XAML 以显示可观察集合中的项目。同样，使用一个 **数据模板**，这次是在 `ItemsControl` 内部。`ItemsControl` 实际上是显示多个项目的控件的基类（如列表框），因此其中的一些内容可能已经很熟悉了。

要添加 `ItemsControl` 及其数据模板，请按照以下步骤操作：

- 找到并打开 **MainWindow.axaml** 文件。
- 将以下命名空间声明添加到 `<Window>` 元素中：

```
xmlns:views="clr-namespace:Avalonia.MusicStore.Views"
```

- 在按钮元素下方，添加如下所示的 XAML：

```xml
<ItemsControl Margin="0 40 0 0" ItemsSource="{Binding Albums}">
  <ItemsControl.ItemsPanel>
    <ItemsPanelTemplate>
      <WrapPanel />
    </ItemsPanelTemplate>
  </ItemsControl.ItemsPanel>

  <ItemsControl.ItemTemplate>
    <DataTemplate>
      <views:AlbumView Margin="0 0 20 20" />
    </DataTemplate>
  </ItemsControl.ItemTemplate>
</ItemsControl>
```



- 点击 **调试** 编译并运行项目。
- 点击图标按钮。
- 输入一些搜索文本。
- 点击一个专辑进行选择。
- 点击 **购买专辑**。
- 再次重复。

<p><img className="image-medium-zoom" src={MusicStoreAddedAlbumsScreenshot} alt="" /></p>

您将看到在搜索和选择时用户的专辑集合正在构建。但是，如果停止运行应用程序，然后再次启动它，集合将恢复为空。

在下一页中，您将学习如何为应用程序实现数据持久化。
