---
id: add-a-control
title: Add a Control 
---

import Highlight from '@site/src/components/global/Highlight';
import CalculateButton from '/img/get-started/test-drive/calculate-button.png';
import ButtonIntellisenseScreenshot from '/img/get-started/test-drive/button-intellisense.png';

So far, the main window of your application displays only a text string. On this page, you will learn how to add some of the built-in controls that are part of Avalonia.

## Button

Avalonia contains a built-in control that creates a button. Follow this procedure to replace the text string currently in the `Window`'s content zone with a button control.

- Stop the app if it is running.
- Locate the highlighted line of XAML in the `MainWindow.xaml` file. 
```xml title='XAML' 
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:GetStartedApp.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="400" d:DesignHeight="450"
        x:Class="GetStartedApp.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="GetStartedApp">

    <Design.DataContext>
        <!-- This only sets the DataContext for the previewer in an IDE,
             to set the actual DataContext for runtime, set the DataContext property in code (look at App.axaml.cs) -->
        <vm:MainWindowViewModel/>
    </Design.DataContext>

    // highlight-next-line
    <TextBlock Text="{Binding Greeting}" HorizontalAlignment="Center" VerticalAlignment="Center"/>
    
</Window>
```

- Replace the entire line with the following:
```xml title='XAML'
  <Button>Calculate</Button>
```
- Your XAML should now look like this: 
```xml title='XAML'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:GetStartedApp.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="400" d:DesignHeight="450"
        x:Class="GetStartedApp.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="GetStartedApp">

    <Design.DataContext>
        <!-- This only sets the DataContext for the previewer in an IDE,
             to set the actual DataContext for runtime, set the DataContext property in code (look at App.axaml.cs) -->
        <vm:MainWindowViewModel/>
    </Design.DataContext>
    
    // highlight-next-line
    <Button>Calculate</Button>    
</Window>
```

:::tip
If you're using the previewer, you will see the button appear in the preview pane as soon as the XAML is valid. You can 
also try hovering and clicking the `Button` to see it change appearance in different states.
:::

- Run the app to confirm that the presentation and behaviour of the button is the same at runtime.

## Control Attributes

XAML uses XML attributes to specify presentation and behavior for controls. These attributes can set properties, call 
methods, and call event handlers in the controls created by the XAML.

For example, the `Button` is currently positioned hard against the left edge of the `Window`. This is a result 
of the default value (left) of its `HorizontalAlignment` property. Follow this 
procedure to set the `HorizontalAlignment` to centered instead.

- Add a new attribute to the Button tag as follows:

```xml title='XAML'
<Button HorizontalAlignment="Center">Calculate</Button>
```

:::tip
If you're using an IDE, notice how the Avalonia code completion guides you as you add attributes to the XAML.

<img className="center" src={ButtonIntellisenseScreenshot} alt="" />
:::

The `Button` should now move to the center of the window content zone. Horizontally because of the change and vertically 
because of the Button's default.

:::info
For full information about the complete range of Avalonia UI built-in controls, and their attributes, see the reference section [here](../../reference/controls).
:::

On the next page, you will learn how to create a more complex layout.
