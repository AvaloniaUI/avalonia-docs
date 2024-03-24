---
id: ide-support
title: How To Use Live Preview
---

import VsXamlPreviewerScreenshot from '/img/guides/implementation-guides/vs-xaml-previewer.png';
import VsLogVerbosityScreenshot from '/img/guides/implementation-guides/vs-log-verbosity.png';
import VsDiagnosticsOutputScreenshot from '/img/guides/implementation-guides/vs-diagnostics-output.png';

# How To Use Live Preview

This guide will show you how to use the live preview feature of the _Avalonia UI_ extensions for Visual Studio and _ReSharper_.

The _Avalonia for Visual Studio_ extension includes a XAML designer which can be used to show a live preview of the XAML as you are writing it. With the Avalonia for Visual Studio extension installed, double click on an Avalonia XAML file to open it.

For Visual Studio and ReSharper users, [ReSharper 2020.3 introduces](https://www.jetbrains.com/resharper/whatsnew/2020-3/#version-2020-3-avalonia-support) built-in code analysis, code completion, navigation, and find usages.

<img src={VsXamlPreviewerScreenshot} alt="Shows the XAML Previewer in Visual Studio"/>

:::info
If your XAML is in a library, _Avalonia UI_ needs an executable application in order to be able to preview it. Select an executable project from the dropdown on the top right of the designer. Once your project is built, editing the XAML in the editor will cause the preview to update automatically.
:::

:::warning
In some cases, due to bugs/limitations in Visual Studio, the Avalonia XAML designer is not shown and instead the WPF designer gets shown. If your XAML file is showing a lot of errors, try right-clicking the file then selecting "Open With..." → "Avalonia XAML Editor".
:::

## Design-Time Properties

There are a number of properties that can be applied to your controls which will take effect only at design-time. To use these you must add a namespace to your XAML file:

```csharp
xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
```

With the namespace added, the following design-time properties become available:

### d:DesignWidth and d:DesignHeight

The `d:DesignWidth` and `d:DesignHeight` properties apply a width and height to the control being previewed.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaApplication1.MainWindow">
    Welcome to Avalonia!
</Window>
```

### d:DataContext

The `d:DataContext` property applies a `DataContext` only at design-time. It is recommended that you use this property in conjunction with the `{x:Static}` directive to reference a static property in one of your assemblies:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:dd="clr-namespace:My.Namespace;assembly=MyAssembly"
        d:DataContext="{x:Static dd:DesignData.ExampleViewModel}"
        x:Class="AvaloniaApplication1.MainWindow">
    Welcome to Avalonia!
</Window>
```

```csharp
namespace My.Namespace
{
    public static class DesignData
    {
        public static MyViewModel ExampleViewModel { get; } = new MyViewModel
        {
            // View Model initialization here.
        };
    }
}
```

### Design.DataContext

Alternatively you can use `Design.DataContext` attached property. As well as `Design.Width` and `Design.Height`.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:dd="clr-namespace:My.Namespace;assembly=MyAssembly"
        x:Class="AvaloniaApplication1.MainWindow"
        Design.Width="100">
    <Design.DataContext>
        <dd:MyViewModel />
    </Design.DataContext>
    Welcome to Avalonia!
</Window>
```

## Diagnosing Errors

If you're having problems, try enabling verbose logging. To do this in Visual Studio, follow this procedure:

-  Click **Options...** on the **Tools** menu
-  Click **Avalonia XAML Editor** in the list
-  Click **Verbose** in the **Minimum Log Verbosity** drop-down.

<img src={VsLogVerbosityScreenshot} alt=""/>

Logs will now be displayed in the Visual Studio **Output** window.

Select **Avalonia Diagnostics** from the drop-down at the top of this window.

<img src={VsDiagnosticsOutputScreenshot} alt=""/>
