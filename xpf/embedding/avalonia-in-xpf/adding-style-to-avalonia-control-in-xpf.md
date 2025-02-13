---
id: adding-style-to-avalonia-control-in-xpf
title: Adding style to Avalonia control in XPF
---

# Adding Style to the Avalonia control in XPF

In XPF you can add Style to the Avalonia control only with the code-behind. Please consider the sample below.

## XAML Code

Here is an example XAML code snippet demonstrating how to embed an Avalonia control, specifically a `Button`, into a XPF `Window`:

```xml
<Window
    x:Class="YourNamespace.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:atlantis="clr-namespace:Atlantis;assembly=PresentationCore"
    xmlns:avalonia="clr-namespace:Avalonia.Controls;assembly=Avalonia.Controls"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    Title="Avalonia Embedded in XPF"
    Width="800"
    Height="450"
    mc:Ignorable="d">
    <atlantis:AvaloniaHost>
        <!-- Avalonia control within AvaloniaHost -->
        <avalonia:Button Content="Click me" x:Name="myButton" />
    </atlantis:AvaloniaHost>
</Window>
```

## Code-Behind C# Code

In the code-behind file (`MainWindow.xaml.cs`), you can apply styles to the Avalonia control using the `Styles` property. The following C# code demonstrates how to create a style for the Avalonia `Button`:

```csharp
using Avalonia.Styling;
using System.Linq;
using System.Windows;
using Setter = Avalonia.Styling.Setter;
using Style = Avalonia.Styling.Style;
using Button = Avalonia.Controls.Button;
using SolidColorBrush = Avalonia.Media.SolidColorBrush;

namespace YourNamespace
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        public MainWindow()
        {
            InitializeComponent();

            // Create a style for the Button
            var myButtonStyle = new Style(x => x.OfType<Button>())
            {
                Setters = 
                {
                    new Setter(Button.BackgroundProperty, new SolidColorBrush(Avalonia.Media.Colors.Green)),
                    new Setter(Button.ForegroundProperty, new SolidColorBrush(Avalonia.Media.Colors.Red))
                    // Add more setters as needed
                }
            };

            // Apply the style to the Button
            myButton.Styles.Add(myButtonStyle);
        }

    }
}
```
Ensure to replace "YourNamespace" with the actual namespace of your project. This example sets the background color to green and the foreground color to red for the Avalonia `Button` embedded in XPF. Adjust the setters and other properties according to your styling requirements. And if you will follow all the steps correctly your Avalonia control will change according to the style.