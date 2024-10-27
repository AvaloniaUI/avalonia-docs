---
id: adding-global-style-for-avalonia-controls-in-XPF
title: Adding global style for Avalonia controls in XPF
---
# Adding Global Style for Avalonia Controls in XPF

## Add Global Styles Dynamically in Code
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

## With the redefinition of the Avalonia Application
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