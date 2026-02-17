---
id: embedding-avalonia-in-xpf
title: Embedding Avalonia in XPF
---

## Embedding Avalonia controls

### Step 1: Add an Avalonia UserControl

Add an Avalonia `UserControl` to your application which contains the Avalonia content that you wish to host. For example:

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
             x:Class="MyXpfApplication.MyAvaloniaView">
  <Button>Hello Avalonia!</Button>
</UserControl>
```

```csharp
using Avalonia.Controls;

namespace MyXpfApplication;

public partial class MyAvaloniaView : UserControl
{
    public MyAvaloniaView()
    {
        InitializeComponent();
    }
}
```

### Step 2: Host the Avalonia UserControl

Intiantiate an `AvaloniaHost` to host the Avalonia content in an XPF control:

```xml
<Window x:Class="MyXpfApplication.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:MyXpfApplication"
        // highlight-next-line
        xmlns:xpf="clr-namespace:Atlantis;assembly=PresentationCore"
        mc:Ignorable="d"
        Title="MainWindow">
  // highlight-start
  <xpf:AvaloniaHost>
    <local:MyAvaloniaView/>
  </xpf:AvaloniaHost>
  // highlight-end
</Window>
```

## Styling Avalonia controls

In XPF you can add Style to the Avalonia control only with the code-behind. Please consider the sample below.

### XAML Code

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

### Code-Behind C# Code

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
Ensure you replace "YourNamespace" with the actual namespace of your project. This example sets the background color to green and the foreground color to red for the Avalonia `Button` embedded in XPF. Adjust the setters and other properties according to your styling requirements. And if you will follow all the steps correctly your Avalonia control will change according to the style.

## Adding global styles dynamically in code

Adding global styles for Avalonia controls dynamically in code-behind provides flexibility and allows you to apply styles at runtime.
Use the following C# code to achieve this:
```csharp
 // Retrieve the current Avalonia application instance
var avaloniaApp = Avalonia.Controls.Application.Current;

// Dynamically add a global style for Button controls
avaloniaApp.Styles.Add(new StyleInclude()
{
    Source = new Uri("avares://YourNamespace/Styles/CustomStyles.xaml") // Adjust the URI accordingly
});
```
Here, "CustomStyles.xaml" is the XAML file containing the Avalonia styles you want to apply globally.

### With the redefinition of the Avalonia Application
In more advanced scenarios you may need to fully replace the styles applied by default with your custom styles and
for that you will need to redefine the Avalonia Application. First step would be to disable the automatic XPF initialization.
```xml
  <PropertyGroup>
    <DisableAutomaticXpfInit>true</DisableAutomaticXpfInit>
  </PropertyGroup>
```
Then you will need to create new Avalonia Application with XAML and code behind. Where in XAML you put your styles which you want to be defined globally.

:::note
`DataGrid` theme is required for DevTools to work correctly.
:::

```xml
 <StyleInclude Source="avares://Avalonia.Controls.DataGrid/Themes/Simple.xaml"/>
```

After that you will need to create a separate class which will initialize Avalonia for your XPF project. 

```csharp
public class MyXpfAvaloniaInitializer
{
    [ModuleInitializer]
    public static void Init()
    {
        if (Avalonia.Application.Current == null)
        {
            AppBuilder.Configure<MyApp>()
                .UsePlatformDetect()
                .With(new Win32PlatformOptions()
                {
                    // Default to System Dpi Aware. If process has a different awareness set in manifest, that value will be prioritized by the os
                    DpiAwareness = Win32DpiAwareness.SystemDpiAware
                })
                .WithAvaloniaXpf()
                .SetupWithLifetime(new ClassicDesktopStyleApplicationLifetime() { ShutdownMode = Avalonia.Controls.ShutdownMode.OnExplicitShutdown });
        }
    }
}
```

:::note
`ModuleInitializer` attribute is not mandatory here. You can initialize Avalonia by yourself anywhere but you should keep in mind that Avalonia initialization should be done before WPF initialization. That information might be useful for people who are using XPF with F#.
:::

And after that your styles would be applied for your whole Application.

## Accessing Avalonia features

Sometimes WPF APIs may not provide the specific features you need. In these cases, there is often an Avalonia API that you can use to fill that gap.

## Getting the Avalonia Window

Many Avalonia features are exposed via the top-level `Window` class. Because an XPF `Window` is also an Avalonia `Window`, you can use the following pattern to get a reference to the underlying Avalonia `Window`:

```csharp
if (XpfWpfAbstraction.GetAvaloniaWindowForWindow(xpfWindow) is { } avaloniaWindow)
{
    // You now have an Avalonia Window.
}
```
