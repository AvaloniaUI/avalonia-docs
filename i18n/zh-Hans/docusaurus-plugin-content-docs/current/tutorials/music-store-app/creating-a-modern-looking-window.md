---
description: TUTORIALS - Music Store App
---

import MusicStoreDarkModePreviewScreenshot from '/img/tutorials/music-store-app/creating-a-modern-looking-window/dark-mode-preview.png';
import MusicStoreAcrylicMaterialScreenshot from '/img/tutorials/music-store-app/creating-a-modern-looking-window/acrylic-material.png';
import MusicStoreFullAcrylicWindowScreenshot from '/img/tutorials/music-store-app/creating-a-modern-looking-window/full-acrylic-window.png';

# 窗口样式

在本页中，您将通过对窗口背景应用暗色主题和亚克力模糊效果，来使主窗口看起来现代化。

## 暗色模式

按照以下步骤将主窗口样式设置为“暗色”模式：

- 如果应用程序仍在运行，请停止它。
- 找到并打开文件 **App.axaml**。
- 在 XAML 中，将 `<Application>` 元素中的 `RequestedThemeVariant` 属性从 `Default` 更改为 `Dark`：

```xml
<Application ...
    RequestedThemeVariant="Dark">
```

- 现在，在 **/Views** 文件夹中找到并打开 **MainWindow.axaml** 文件。

需要注意的是，预览窗格仍然显示窗口处于“亮色”模式。应用程序需要重新构建才能在预览窗格中显示新模式。

- 单击 **构建** 菜单上的 **构建启动项目**。

预览窗格现在会切换到暗色模式。

<p><img className="image-medium-zoom" src={MusicStoreDarkModePreviewScreenshot} alt="" /></p>

## 亚克力模糊效果

按照以下步骤为主窗口的背景应用亚克力模糊效果样式：

- 在 **/Views** 文件夹中找到并打开 **MainWindow.axaml** 文件。
- 找到 `<Window>` 元素的结束标签。
- 在 `Title="Avalonia.MusicStore"` 属性后添加两个新属性，如下所示：

```xml
<Window ...
        Title="Avalonia.MusicStore"

        TransparencyLevelHint="AcrylicBlur"
        Background="Transparent">
```

- 为了将亚克力效果应用到整个窗口，将主窗口的内容区域中的 `<TextBlock>` 元素替换为以下用于 Panel 的 XAML 代码：

```xml
<Window ... >
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
       </Panel>
   </Window>
```

- 单击 **调试**（IDE 右上角）以编译并运行项目。

<p><img className="image-medium-zoom" src={MusicStoreAcrylicMaterialScreenshot} alt="" /></p>

注意，正如预期的那样，亚克力窗口效果覆盖了主窗口的内容区域，但该效果还尚未延伸到标题栏。

:::warning
请注意，由于 X11 版本的限制，_Linux_ 用户目前无法使用以下代码。教程代码虽然可以在 _Linux_ 上运行，且窗口仍然可以工作，但无法实现完整效果。
:::

按照以下步骤将亚克力模糊效果延伸到标题栏：

- 如果应用程序仍在运行，请停止它。
- 再次找到 `<Window>` 元素的结束标签。
- 添加 `ExtendClientAreaToDecorationsHint` 属性，如下所示：

```xml
   <Window ...
           TransparencyLevelHint="AcrylicBlur"
           Background="Transparent"

           ExtendClientAreaToDecorationsHint="True">
```

- 单击 **调试** 以编译并运行项目。

<p><img className="image-medium-zoom" src={MusicStoreFullAcrylicWindowScreenshot} alt="" /></p>

现在，您已经将亚克力模糊效果延伸到标题栏中。在下一页中，您将学习如何在窗口中添加并排版控件。
