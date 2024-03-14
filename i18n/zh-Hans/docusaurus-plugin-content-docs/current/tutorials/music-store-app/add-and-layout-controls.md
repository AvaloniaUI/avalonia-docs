---
description: TUTORIALS - Music Store App
---

import MusicStoreBuyButtonScreenshot from '/img/tutorials/music-store-app/add-and-layout-controls/buy-button.png';
import MusicStoreAddStylesScreenshot from '/img/tutorials/music-store-app/add-and-layout-controls/add-styles.png';
import MusicStorePrettyButtonScreenshot from '/img/tutorials/music-store-app/add-and-layout-controls/pretty-button.png';

# 添加并排版控件

应用程序的主窗口最终将显示用户收藏的专辑封面列表，右上角会有一个按钮，允许用户添加新的专辑，该按钮将打开一个搜索对话框，用于查找要添加的新专辑。

在本页面中，您将学习如何布局主窗口，来让按钮按照需求出现呈现在窗口右上角。

## 按钮排版

要在主窗口的内容区域显示一个按钮，请按照以下步骤进行操作：

- 如果应用程序仍在运行，请停止它。
- 转到并打开 **MainWindow.axaml** 文件。
- 在 Panel 元素内，添加以下用于按钮的 XAML 代码。Panel 的 XAML 代码应如下所示：

```xml
<Panel>
    <ExperimentalAcrylicBorder IsHitTestVisible="False">
        <ExperimentalAcrylicBorder.Material>
            <ExperimentalAcrylicMaterial
                 BackgroundSource="Digger"
                 TintColor="Black"
                 TintOpacity="1"
                 MaterialOpacity="0.65" />
        </ExperimentalAcrylicBorder.Material>
     </ExperimentalAcrylicBorder>

     <Button Content="Buy Music"/>
</Panel>
```

- Click **Debug** to compile and run the project.

<p><img className="image-medium-zoom" src={MusicStoreBuyButtonScreenshot} alt="" /></p>

您将看到按钮已经出现，但它处于默认位置，而非按照需求所属位于窗口的右上角。

按照以下步骤正确定位按钮：

- 如果应用程序仍在运行，请停止它。
- 将 Button 元素包装在一个新的 Panel 元素中。
- 在新的 Panel 元素上添加 Margin 属性，值为 40。
- 在 Button 元素上添加水平和垂直对齐属性，如下所示：

```xml
<Panel Margin="40">
  <Button Content="Buy Music" 
     HorizontalAlignment="Right" VerticalAlignment="Top" />
</Panel>
```

当您添加这些更改时，您应该能在预览窗格中看到所有这些更改的效果。

## 按钮图标

点击[这里](./)，回顾一下完整的应用程序的外观。

您将看到按钮显示一个图标，而不是文本（目前的情况）。这实际上是来自 Fluent Icons 集合的 Microsoft Store 图标，而 Avalonia UI 为您提供了所有这些图标的定义供您使用。

要使用 Microsoft Store 图标，请遵循以下步骤：

- 导航到 _Avalonia UI_ 的 _GitHub_，找到 Fluent Icons 列表，网址为 [https://avaloniaui.github.io/icons.html](https://avaloniaui.github.io/icons.html)
- 使用浏览器的文本搜索功能找到图标名称 'store\_microsoft\_regular'。应该会有一些类似以下代码的内容：

```xml
<StreamGeometry x:Key="store_microsoft_regular">M11.5 9.5V13H8V9.5H11.5Z M11.5 17.5V14H8V17.5H11.5Z M16 9.5V13H12.5V9.5H16Z M16 17.5V14H12.5V17.5H16Z M8 6V3.75C8 2.7835 8.7835 2 9.75 2H14.25C15.2165 2 16 2.7835 16 3.75V6H21.25C21.6642 6 22 6.33579 22 6.75V18.25C22 19.7688 20.7688 21 19.25 21H4.75C3.23122 21 2 19.7688 2 18.25V6.75C2 6.33579 2.33579 6 2.75 6H8ZM9.5 3.75V6H14.5V3.75C14.5 3.61193 14.3881 3.5 14.25 3.5H9.75C9.61193 3.5 9.5 3.61193 9.5 3.75ZM3.5 18.25C3.5 18.9404 4.05964 19.5 4.75 19.5H19.25C19.9404 19.5 20.5 18.9404 20.5 18.25V7.5H3.5V18.25Z</StreamGeometry>
```

- 复制图标的所有代码。
- 在 _Rider_ 解决方案资源管理器中，右键单击项目。
- 点击 **添加**，然后点击 **Avalonia Styles**。

<p><img className="image-medium-zoom" src={MusicStoreAddStylesScreenshot} alt="" /></p>

- 输入 **名称** 'Icons'，然后按回车键。
- 找到并打开新创建的 **Icons.axaml** 文件。XAML 代码将如下所示：

```xml
<Styles xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Design.PreviewWith>
        <Border Padding="20">
            <!-- Add Controls for Previewer Here -->
        </Border>
    </Design.PreviewWith>

    <!-- Add Styles Here -->
</Styles>
```

- 添加一个带有开始和结束标签的新 `<Style>` 元素。
- 在新添加的 `<Style>` 元素内部新添加一个带有开始和结束标签的 `<Style.Resources>` 元素。
- 将您的图标代码粘贴到 `<Style.Resources>` 元素内。

现在，图标文件的代码如下所示：

```xml
<Styles xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Design.PreviewWith>
        <Border Padding="20">
            <!-- Add Controls for Previewer Here -->
        </Border>
    </Design.PreviewWith>

    <!-- Add Styles Here -->
    <Style>
        <Style.Resources>
            <StreamGeometry x:Key="store_microsoft_regular">M11.5 9.5V13H8V9.5H11.5Z M11.5 17.5V14H8V17.5H11.5Z M16 9.5V13H12.5V9.5H16Z M16 17.5V14H12.5V17.5H16Z M8 6V3.75C8 2.7835 8.7835 2 9.75 2H14.25C15.2165 2 16 2.7835 16 3.75V6H21.25C21.6642 6 22 6.33579 22 6.75V18.25C22 19.7688 20.7688 21 19.25 21H4.75C3.23122 21 2 19.7688 2 18.25V6.75C2 6.33579 2.33579 6 2.75 6H8ZM9.5 3.75V6H14.5V3.75C14.5 3.61193 14.3881 3.5 14.25 3.5H9.75C9.61193 3.5 9.5 3.61193 9.5 3.75ZM3.5 18.25C3.5 18.9404 4.05964 19.5 4.75 19.5H19.25C19.9404 19.5 20.5 18.9404 20.5 18.25V7.5H3.5V18.25Z</StreamGeometry>
        </Style.Resources>
    </Style>
</Styles>
```

在新的图标文件准备好后，您现在必须将其包含在您的应用程序中。

按照以下步骤将图标文件包含在应用程序中：

- 找到并打开 **App.axaml** 文件。
- 添加一个 `<StyleInclude>` 元素，如下所示：

```xml
<Application.Styles>
    <FluentTheme />
    <StyleInclude Source="avares://Avalonia.MusicStore/Icons.axaml" />
</Application.Styles>
```

您需要构建应用程序，以便图标在预览窗格中可用。

要将按钮从文本更改为图标内容，请按照以下步骤操作：

- 找到并打开 **MainWindow.axaml** 文件。
- 修改按钮的 XAML 代码，如下所示：

```xml
<Button HorizontalAlignment="Right" VerticalAlignment="Top">       
    <PathIcon Data="{StaticResource store_microsoft_regular}" /> 
</Button>
```

- 点击 **调试** 以编译和运行项目。

<p><img className="image-medium-zoom" src={MusicStorePrettyButtonScreenshot} alt="" /></p>

在下一页中，您将学习如何将视图中的按钮（MVVM 模式中的视图）链接到视图模型中的命令，以便它可以在那里执行应用程序逻辑。
