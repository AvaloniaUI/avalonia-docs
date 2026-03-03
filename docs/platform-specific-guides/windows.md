---
id: windows
title: Windows
---

Avalonia uses the Win32 API directly on Windows. No additional workloads or dependencies are needed beyond the .NET SDK.

## Embedding Avalonia in Windows Forms

Avalonia controls can be hosted inside Windows Forms applications using `WinFormsAvaloniaControlHost`. This enables incremental migration of existing Windows Forms applications to Avalonia without rewriting everything at once.

A typical setup requires at least two projects:

1. **YourApp** - A cross-platform class library containing your Avalonia controls and view models.
2. **YourApp.WinForms** - Your existing Windows Forms application.
3. **YourApp.Desktop** (optional) - A standalone Avalonia executable, only needed if you want to use the Visual Studio XAML previewer.

Since Windows Forms only runs on Windows, embedding Avalonia controls into a WinForms app does not make it cross-platform. For cross-platform support, migrate fully to an Avalonia desktop project.

### Setup

These instructions assume Visual Studio 2022 with the Avalonia extension. If you use VS Code or Rider, you can skip the optional `YourApp.Desktop` project.

1. Add a new project to your solution using the **Avalonia C# Project** template. Select at least **Desktop** as a target platform. This creates `YourApp` and `YourApp.Desktop`.

2. Add the following references to your Windows Forms project:
   - Package reference: `Avalonia.Desktop`
   - Package reference: `Avalonia.Win32.Interoperability`
   - Project reference: `YourApp.csproj`

3. In your WinForms `Program.cs`, initialize Avalonia before calling `Application.Run()`:

```csharp
AppBuilder.Configure<App>()
    .UsePlatformDetect()
    .SetupWithoutStarting();
```

4. Add a `WinFormsAvaloniaControlHost` control to your form (available in the Toolbox after adding the package reference).

5. Set its content in your form's constructor, after `InitializeComponent()`:

```csharp
winFormsAvaloniaControlHost1.Content = new MainView
{
    DataContext = new MainViewModel()
};
```

You should now see Avalonia's default view rendered inside your Windows Forms application.

:::warning
You cannot use ReactiveUI for both Windows Forms and Avalonia controls simultaneously. If you want to use ReactiveUI with Avalonia, register it on the `AppBuilder` with `.UseReactiveUI()` in `Program.cs`. Do not include a reference to `ReactiveUI.WinForms`, as it will prevent interactions from working correctly (see [#16478](https://github.com/AvaloniaUI/Avalonia/discussions/16478)).
:::

## See also

- [WPF migration guide](/docs/migration/wpf)
