---
description: CONCEPTS
---

# The Main Window

The main window is the window passed to `ApplicationLifetime.MainWindow` in the `OnFrameworkInitializationCompleted` method of your your `App.axaml.cs` file:

```csharp
public override void OnFrameworkInitializationCompleted()
{
    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktopLifetime)
    {
        desktopLifetime.MainWindow = new MainWindow();
    }
}
```

It can be retrieved at any time by casting `Application.ApplicationLifetime` to `IClassicDesktopStyleApplicationLifetime`.

:::warning
Mobile and browser platforms don't have a concept of Window in Avalonia. Instead you need to set the MainView control in Application.ApplicationLifetime when it implements ISingleViewApplicationLifetime interface.
:::

### <a href="#show-hide-and-close-a-window" id="show-hide-and-close-a-window"></a>
