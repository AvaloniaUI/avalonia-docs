---
id: how-to-create-a-custom-controls-library
title: How To Create a Custom Controls Library
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CustomControlSolutionScreenshot from '/img/guides/custom-controls/custom-control-solution.png';
import CustomControlNuGetScreenshot from '/img/guides/custom-controls/custom-control-nuget.png';

# How To Create a Custom Controls Library

This guide shows you how to create a custom controls library and reference it for use in an _Avalonia UI_ app.

<img src={CustomControlSolutionScreenshot} alt=""/>

In this example, a custom control file is added to a .NET class library. The library has the _Avalonia UI_ _NuGet_ package installed:

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
Notice that the namespace reference for the control library includes the name of the assembly.
:::

## XML Namespace Definitions

When you add a reference to a controls library in an _Avalonia UI_ XAML file, you may want to use the URL identification format. For example:

```xml
xmlns:cc="https://my.controls.url"
```

This is possible because of the presence of XML namespace definitions in a controls library. These map URLs to the code namespaces, and are in the project `Properties/AssemblyInfo.cs` file. For example:

```csharp
[assembly: XmlnsDefinition("https://github.com/avaloniaui", "Avalonia")]
```

:::info
You can see this in the _Avalonia UI_ built-in controls source code [here](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Properties/AssemblyInfo.cs).
:::

### Common Namespace Definitions

You can also make one URL map several namespaces in your controls library. To do this simply add multiple XML namespace definitions that use the same URL, but map to different code namespaces, like this:

```cs
using Avalonia.Metadata;

[assembly: XmlnsDefinition("https://my.controls.url", "My.NameSpace")]
[assembly: XmlnsDefinition("https://my.controls.url", "My.NameSpace.Other")]
```
