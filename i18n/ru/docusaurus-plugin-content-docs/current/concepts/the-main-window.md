---
description: CONCEPTS
---

# The Main Window

The main window is the window passed to `ApplicationLifetime.MainWindow` in the `OnFrameworkInitializationCompleted` method of your `App.axaml.cs` file:

```csharp
public override void OnFrameworkInitializationCompleted()
{
    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktopLifetime)
    {
        desktopLifetime.MainWindow = new MainWindow();
    }
}
```

It can be retrieved at any time by casting `Application.Current.ApplicationLifetime` to `IClassicDesktopStyleApplicationLifetime`.

Worth mentioning, developers should keep in mind, that using static globals and accessing MainWindow from any place of the app can be dangerous and sometimes cause bad UX. All top-level (window) related APIs should be used from the most specific top-level, usually, it's the latest active one. In this way, user dialogs won't be opened from the wrong window, for example.

:::warning
Mobile and browser platforms don't have a concept of Window in Avalonia. Instead, you need to set MainView control in Application.ApplicationLifetime when it implements ISingleViewApplicationLifetime interface.
:::

### <a href="#show-hide-and-close-a-window" id="show-hide-and-close-a-window"></a>
