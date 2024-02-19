---
id: how-to-create-a-custom-controls-library
title: 如何创建自定义控件库
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CustomControlSolutionScreenshot from '/img/guides/custom-controls/custom-control-solution.png';
import CustomControlNuGetScreenshot from '/img/guides/custom-controls/custom-control-nuget.png';

# 如何创建自定义控件库

本指南将向您展示如何创建自定义控件库并在_Avalonia UI_应用程序中引用它。

<img src={CustomControlSolutionScreenshot} alt=""/>

在此示例中，将一个自定义控件文件添加到一个.NET类库中。该库已安装了_Avalonia UI_ _NuGet_包：

<img src={CustomControlNuGetScreenshot} alt=""/>

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:cc="clr-namespace:CCLibrary;assembly=CCLibrary"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaCCLib.MainWindow"
        Title="AvaloniaCCLib">
  <Window.Styles>
    <Style Selector="cc|MyCustomControl">
      <Setter Property="Background" Value="Yellow"/>
    </Style>
  </Window.Styles>

  <cc:MyCustomControl Height="200" Width="300"/>

</Window>
```

</TabItem>
<TabItem value="cs">

```cs
using Avalonia;
using Avalonia.Controls;
using Avalonia.Media;

namespace CCLibrary
{

    public class MyCustomControl : Control
    {
        public static readonly StyledProperty<IBrush?> BackgroundProperty =
            Border.BackgroundProperty.AddOwner<MyCustomControl>();

        public IBrush? Background
        {
            get { return GetValue(BackgroundProperty); }
            set { SetValue(BackgroundProperty, value); }
        }

        public sealed override void Render(DrawingContext context)
        {
            if (Background != null)
            {
                var renderSize = Bounds.Size;
                context.FillRectangle(Background, new Rect(renderSize));
            }
            base.Render(context);
        }
    }
}
```
</TabItem>  

</Tabs>

:::info
请注意，控件库的命名空间引用中包含了程序集的名称。
:::

## XML命名空间定义

当您在_Avalonia UI_的XAML文件中添加对控件库的引用时，您可能希望使用URL标识格式。例如：

```xml
xmlns:cc="https://my.controls.url"
```

这是因为控件库中存在XML命名空间定义。这些定义将URL映射到代码命名空间，并位于项目的`Properties/AssemblyInfo.cs`文件中。例如：

```csharp
[assembly: XmlnsDefinition("https://github.com/avaloniaui", "Avalonia")]
```

:::info
您可以在_Avalonia UI_内置控件的源代码中查看此内容[此处](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Properties/AssemblyInfo.cs)。
:::

### 常见的命名空间定义

您还可以使一个URL映射到控件库中的多个命名空间。只需添加多个使用相同URL的XML命名空间定义，但映射到不同的代码命名空间，如下所示：

```cs
using Avalonia.Metadata;

[assembly: XmlnsDefinition("https://my.controls.url", "My.NameSpace")]
[assembly: XmlnsDefinition("https://my.controls.url", "My.NameSpace.Other")]
```
