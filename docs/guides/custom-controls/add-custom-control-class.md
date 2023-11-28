---
id: add-custom-control-class
title: Add a Custom Control Class
---

# Add a Custom Control Class

You create a custom control using a class that inherits from the _Avalonia UI_ `Control` class. You can place your custom control classes anywhere in you app project, or include them in another control library project.

:::info
For more information on creating a custom control library, see [here](how-to-create-a-custom-controls-library).
:::

Wherever you choose to place your custom control class, you must be able to reference it in the XAML. For example, this code shows the custom control `MyControl` class placed in the main window; and the custom control class defines in the `/CustomControls` namespace and project folder:

```xml title='XAML'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:cc="using:AvaloniaCCExample.CustomControls"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaCCExample.MainWindow"
        Title="Avalonia Custom Control">
  <cc:MyCustomControl Height="200" Width="300"/>
</Window>

```

```csharp title='C#'
using Avalonia.Controls;

namespace AvaloniaCCExample.CustomControls
{
    public class MyCustomControl : Control
    {
    }
}
```

Notice that you can already add properties for height and width of the custom control. These are from the base class: `Control`.

However at present, nothing shows. On the next page you will see how to define a property and teach the custom control how to draw using it.
