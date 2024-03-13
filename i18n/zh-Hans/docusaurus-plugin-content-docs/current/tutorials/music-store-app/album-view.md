---
description: TUTORIALS - Music Store App
---

import MusicStoreBeforeTemplateScreenshot from '/img/gitbook-import/assets/image (6) (1) (3) (1).png';
import MusicStoreBeforeWrapPanelScreenshot from '/img/tutorials/music-store-app/add-content-to-dialog/image-20210310010932979.png';
import MusicStoreWrapPanelScreenshot from '/img/tutorials/music-store-app/add-content-to-dialog/image-20210310011526700.png';

# 专辑视图

在这个页面上，您将通过用图形化的专辑磁贴替换当前显示的文本，继续开发应用程序的搜索结果列表。

## 图标资源

首先，您需要添加一个“音符”图标的资源。您将使用这个图标作为应用程序中专辑封面的占位符图标，它们最终将被下载的专辑封面艺术品替换。

要添加音符图标资源，请按照以下步骤进行操作：

- 如果应用程序仍在运行，请停止它。
- 导航到 _Avalonia UI_ 的 _GitHub_，在 [https://avaloniaui.github.io/icons.html](https://avaloniaui.github.io/icons.html) 找到 Fluent 图标列表。
- 使用浏览器的文本搜索来查找图标 “music\_regular” 的名称。应该有一些类似于以下代码的代码：

```xml
<StreamGeometry x:Key="music_regular">M11.5,2.75 C11.5,2.22634895 12.0230228,1.86388952 12.5133347,2.04775015 L18.8913911,4.43943933 C20.1598961,4.91511241 21.0002742,6.1277638 21.0002742,7.48252202 L21.0002742,10.7513533 C21.0002742,11.2750044 20.4772513,11.6374638 19.9869395,11.4536032 L13,8.83332147 L13,17.5 C13,17.5545945 12.9941667,17.6078265 12.9830895,17.6591069 C12.9940859,17.7709636 13,17.884807 13,18 C13,20.2596863 10.7242052,22 8,22 C5.27579485,22 3,20.2596863 3,18 C3,15.7403137 5.27579485,14 8,14 C9.3521238,14 10.5937815,14.428727 11.5015337,15.1368931 L11.5,2.75 Z M8,15.5 C6.02978478,15.5 4.5,16.6698354 4.5,18 C4.5,19.3301646 6.02978478,20.5 8,20.5 C9.97021522,20.5 11.5,19.3301646 11.5,18 C11.5,16.6698354 9.97021522,15.5 8,15.5 Z M13,3.83223733 L13,7.23159672 L19.5002742,9.669116 L19.5002742,7.48252202 C19.5002742,6.75303682 19.0477629,6.10007069 18.3647217,5.84393903 L13,3.83223733 Z</StreamGeometry>
```

- 复制图标的所有代码。
- 找到并打开之前创建的 **Icons.axaml** 文件。
- 将复制的 `<StreamGeometry>` 元素粘贴到 `<Style.Resources>` 元素内。

## 专辑视图

下一步是为专辑创建一个图形化的“磁贴”视图。然后，您将使用这个视图来替换列表中每个专辑当前显示的文本。

要创建图形化的“磁贴”视图，请按照以下步骤进行操作：

- 在解决方案资源管理器中，右键单击 **/Views** 文件夹，然后单击 **添加**。
- 单击 **Avalonia User Control**。
- 在提示输入名称时，键入 “AlbumView”。
- 按回车键。
- 将属性 `Width="200"` 添加到 `<UserControl>` 元素中。
- 如下修改用户控件内容区域的 XAML：

```xml
<StackPanel Spacing="5" Width="200">
    <Border CornerRadius="10" ClipToBounds="True">
        <Panel Background="#7FFF22DD">
            <Image Width="200" Stretch="Uniform" />
            <Panel Height="200">
                <PathIcon Height="75" Width="75" Data="{StaticResource music_regular}" />
            </Panel>
        </Panel>
    </Border>    
</StackPanel>
```

预览窗格现在将显示一个新的磁贴视图，其中心放置了音符图标。

## 视图定位器

专辑视图模型最终将包含专辑的名称、艺术家和已下载的封面艺术品的数据，但在这个阶段，您将继续使用占位符音符图标。

正如您在上一页中看到的，此时专辑列表只显示了专辑视图模型类的（完全限定的）名称。

<img className="center" src={MusicStoreBeforeTemplateScreenshot} alt="" />

在这一步中，您将使用项目中由解决方案模板添加的视图定位器类（**ViewLocator.cs** 文件）。该类已经在 **App.axaml** 文件中以数据模板的形式被注册到应用程序的最高级别。数据模板的注册如下所示：

```
<Application ...
             xmlns:local="using:Avalonia.MusicStore"
             ... >
    <Application.DataTemplates>
        <local:ViewLocator/>
    </Application.DataTemplates>
    ...
</Application>
```
因此，当 _Avalonia UI_ 搜索数据模板时，它总是可以找到视图定位器。

:::info
有关**数据模板**概念的更多详细信息，请参阅[这里](../../concepts/templates/)。
:::

视图定位器作为视图模型（在本例中是专辑视图模型）的数据模板，满足以下条件：

- 视图模型继承自 `ViewModelBase` 类，
- 并且存在一个与基本名称相同的视图。

视图 `AlbumView` 和视图模型 `AlbumViewModel` 已经具有相同的基本名称 “Album”，并且视图 `AlbumView` 存在。因此，视图定位器工作的唯一剩余条件是视图模型必须继承自 `ViewModelBase` 类。

按照以下步骤进行操作：

- 找到并打开之前创建的 **AlbumViewModel.cs** 文件。
- 添加代码，使该类继承自 `ViewModelBase`，如下所示：

```csharp
public class AlbumViewModel : ViewModelBase
{        
}
```

- 单击 **调试** 以编译并运行项目。
- 单击图标按钮。

<p><img className="image-medium-zoom" src={MusicStoreBeforeWrapPanelScreenshot} alt="" /></p>

视图定位器找到了视图 `AlbumView`，并将其用作列表项的数据模板。

## 列表项面板模板

在这一步中，您将整理列表显示，使专辑封面填充所有可用空间。

列表框有一个属性，其中包含一个用于布局列表项的模板控件。默认情况下，这是一个堆叠面板。为了使专辑封面填充所有空间，您可以将面板模板更改为包装面板。

您还将为列表框添加一些样式属性。

按照以下步骤整理列表：

- 如果应用程序仍在运行，请停止应用程序。
- 找到并打开 **MusicStoreView.axaml** 文件。
- 展开 `<ListBox>` 元素，使其具有开始和结束标记。
- 添加所示的 `<ListBox.ItemsPanel>` XAML：

```xml
<ListBox ItemsSource="{Binding SearchResults}" SelectedItem="{Binding SelectedAlbum}"
    Background="Transparent" Margin="0 20">
    <ListBox.ItemsPanel>
        <ItemsPanelTemplate>
            <WrapPanel />
        </ItemsPanelTemplate>
    </ListBox.ItemsPanel>
</ListBox>
```

- 单击 **调试** 以编译并运行项目。
- 单击图标按钮。

<p><img className="image-medium-zoom" src={MusicStoreWrapPanelScreenshot} alt="" /></p>

在下一页中，您将以数据服务的形式添加一些业务逻辑，以便您可以从搜索中获取真实的专辑数据。
