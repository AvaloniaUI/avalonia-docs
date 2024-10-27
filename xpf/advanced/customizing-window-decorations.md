---
id: customizing-window-decorations
title: Customizing Window decorations
---

# Customizing Window decorations

By default, XPF applications include a titlebar for window management. However, there may be cases where you want to remove the titlebar. This documentation will guide you through the process of removing the titlebar.
In this article we will showcase two approaches to customize window appearance: first using WPF API's and second using Avalonia API's.
You may use WPF API's to remove titlebar, but Avalonia API's provide a higher degree of flexibility and control over titlebar settings, so Avalonia team recommends to use second approach.

## How to do that using WPF API's?
In WPF, you can remove the title bar of a window by setting the `WindowStyle` property to `None`. Additionally, you might want to set the `AllowsTransparency` property to `True` to remove the resize border from the Window.
```xml
<Window x:Class="YourNamespace.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="Your Window Title" Height="350" Width="525"
        WindowStyle="None" AllowsTransparency="True">
    <!-- Your content goes here -->
</Window>
```

:::note
Keep in mind that when you remove the title bar, you might need to implement custom controls for window dragging, resizing, and closing, as the default title bar functionality will no longer be available.
:::

```csharp
using System.Windows;

namespace YourNamespace
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Window_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            DragMove();
        }

        private void CloseButton_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}
```

And in XAML, you would attach the event handlers:

```xml
<Window x:Class="YourNamespace.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="Your Window Title" Height="350" Width="525"
        WindowStyle="None" AllowsTransparency="True"
        MouseLeftButtonDown="Window_MouseLeftButtonDown">
    <!-- Your content goes here -->

    <!-- Close button example -->
    <Button Content="X" HorizontalAlignment="Right" VerticalAlignment="Top" Margin="0,5,5,0" Click="CloseButton_Click"/>
</Window>
```

This example shows a basic setup, and you may need to adjust it based on your specific requirements and the functionality you want to provide.

## How to do that using Avalonia API's?

First of all, you need to find `MainWindow.xaml.cs` file. And then everything you need is to paste the code below.

```csharp
protected override void OnSourceInitialized(EventArgs e)
{
    base.OnSourceInitialized(e);

    if (XpfWpfAbstraction.IsRunningOnXpf)
    {
        if (XpfWpfAbstraction.GetAvaloniaWindowForWindow(this) is { } window)
        {
            window.ExtendClientAreaToDecorationsHint = true;
            window.ExtendClientAreaChromeHints = Avalonia.Platform.ExtendClientAreaChromeHints.NoChrome;
        }

    }
}
```
`ExtendClientAreaToDecorationsHint` is responsible for removing the titlebar, but you will still have Close, Minimize and FullScreen buttons. 
If you don't need them you will need to set `ExtendClientAreaChromeHints` to `NoChrome`.

:::note
Keep in mind that when you specify those settings your window wouldn't be draggable because XpfHost control will swallow click events since `IsHitTestVisible` is set to `True` on it. To solve that you will need, for example to set margin on top of it to reserve that area for the titlebar.
:::
