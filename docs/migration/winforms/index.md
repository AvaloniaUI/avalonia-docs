---
title: Windows Forms
description: Migrate Windows Forms applications to Avalonia for cross-platform support and modern UI.
doc-type: migration
---

Windows Forms has been shipping production applications since 2002. If you have a WinForms app that works, there are good reasons to keep it running. But Windows Forms only runs on Windows, and the gap between what it offers and what users expect from a modern UI grows wider every year.

Avalonia gives you a path forward. It is a cross-platform .NET UI framework with a XAML-based layout system, data binding, styling, and a control library that runs on Windows, macOS, Linux, iOS, Android, and WebAssembly. If you have been building with WinForms and wondering what comes next, Avalonia is designed for developers in exactly that position.

:::tip[Need help with your migration?]
The Avalonia team has extensive experience porting Windows Forms applications to Avalonia. If you would rather have expert guidance than go it alone, this is a service we provide. See [Avalonia Services](https://avaloniaui.net/services) for more information.
:::

## What changes

Windows Forms and Avalonia are fundamentally different UI models. Unlike migrating between XAML frameworks (for example, WPF to Avalonia), there is no one-to-one mapping for most concepts. Expect to learn new patterns rather than translate old ones.

| Windows Forms | Avalonia | Notes |
|---|---|---|
| Designer-generated layout | XAML declarative layout | Layout is defined in `.axaml` files, not generated code |
| `Control` base class | `Control` / `TemplatedControl` | Avalonia separates non-templated and templated controls |
| Event handlers for everything | Data binding + MVVM | Avalonia strongly favours separating UI from logic |
| `Dock` and `Anchor` positioning | Layout panels (`Grid`, `StackPanel`, `DockPanel`) | Panel-based layout replaces anchor/dock positioning |
| `DataGridView` | `DataGrid` (NuGet package) | Separate package: `Avalonia.Controls.DataGrid` |
| `ToolStrip` / `MenuStrip` | `Menu` / `ToolTip` / `ContextMenu` | Different control names, same concepts |
| `Form` | `Window` | |
| [`UserControl`](/api/avalonia/controls/usercontrol) | `UserControl` | Same name, different base class |
| `MessageBox.Show()` | Dialog windows or custom overlays | No built-in message box |
| GDI+ drawing (`OnPaint`) | `DrawingContext` or custom `Render` override | Different rendering API |
| `Application.Run(new MainForm())` | `AppBuilder` pipeline | Avalonia uses a builder pattern for app startup |

## Migration strategy

A WinForms-to-Avalonia migration is not a find-and-replace exercise. The most successful approach is incremental: start new screens in Avalonia while keeping existing WinForms screens running, then migrate the rest over time.

### Option 1: start fresh, migrate incrementally

Create a new Avalonia project and rebuild screens one at a time, starting with the simplest. This is the cleanest approach and produces the best result, but it requires the most upfront effort.

1. Create a new Avalonia project using the [getting started guide](/docs/get-started/first-app).
2. Set up your view models and data layer (these can often be shared directly from your WinForms project).
3. Rebuild each screen as an Avalonia `Window` or `UserControl`.
4. Once all screens are migrated, retire the WinForms project.

### Option 2: host Avalonia controls inside WinForms (Windows only)

If you need to keep your WinForms application running while gradually introducing Avalonia, you can embed Avalonia controls directly inside WinForms windows using `WinFormsAvaloniaControlHost`. This lets you build new features in Avalonia without touching existing WinForms code.

This approach only works on Windows since Windows Forms itself is Windows-only. However, if you structure your Avalonia controls in a separate class library, those same controls can later be used in a standalone cross-platform Avalonia application.

For setup instructions, see [Embedding Avalonia in Windows Forms](/docs/platform-specific-guides/windows#embedding-avalonia-in-windows-forms).

## Key concepts to learn

If you are coming from WinForms with no XAML experience, these are the areas that will require the most adjustment:

- **[XAML basics](/docs/xaml):** Avalonia uses XAML to declare UI layout and structure. This replaces the WinForms designer.
- **[Data binding](/docs/data-binding):** Instead of setting control properties in event handlers, you bind controls to properties on a view model. Changes flow automatically.
- **[MVVM pattern](/docs/concepts/the-mvvm-pattern):** Avalonia is designed around separating your UI (Views) from your application logic (ViewModels). This is the biggest mindset shift from WinForms.
- **[Styling](/docs/styling/styles):** Avalonia uses a CSS-like styling system with selectors and style classes, rather than setting properties on individual controls.
- **[Layout panels](/docs/layout/layout):** Instead of absolute positioning or dock/anchor, Avalonia uses panels like `Grid`, `StackPanel`, and `DockPanel` to arrange controls.

## See also

- [Get Started with Avalonia](/docs/get-started/first-app): Create your first Avalonia application.
- [Embedding Avalonia in Windows Forms](/docs/platform-specific-guides/windows#embedding-avalonia-in-windows-forms): Host Avalonia controls inside an existing WinForms app.
- [Controls Reference](/controls): Full Avalonia controls documentation.
