---
id: main-window
title: Main window
description: Set and access the main window or main view for desktop, mobile, and browser platforms.
doc-type: explanation
---

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

Keep in mind that using static globals and accessing `MainWindow` from any place of the app can be risky and sometimes cause a poor user experience. All top-level (window) related APIs should be used from the most specific top-level, usually the latest active one. This ensures that user dialogs are not opened from the wrong window.

:::caution
Mobile and browser platforms don't have a concept of `Window` in Avalonia. On iOS and browser, set the `MainView` control via `ISingleViewApplicationLifetime`. On Android, set a `MainViewFactory` via `IActivityApplicationLifetime` instead, because Android can recreate the main activity multiple times. See [Application lifetimes](/docs/fundamentals/application-lifetimes) for details.
:::

## See also

- [Top level](/docs/fundamentals/top-level)
- [Application lifetimes](/docs/fundamentals/application-lifetimes)
