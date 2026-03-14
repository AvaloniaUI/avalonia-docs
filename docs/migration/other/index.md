---
title: Other frameworks
description: Migrate to Avalonia from Delphi, Qt, Electron, or ASP.NET MVC desktop applications.
doc-type: migration
---

Avalonia is not only for developers coming from Microsoft's XAML ecosystem. If you are building desktop or cross-platform applications with Delphi, Qt, Electron, or ASP.NET MVC and looking for a modern .NET alternative, Avalonia may be a strong fit.

This page covers what to expect when migrating from frameworks outside the XAML world.

:::tip[Need help with your migration?]
The Avalonia team has experience helping teams migrate from a wide range of UI frameworks. If you would like expert guidance, this is a service we provide. See [Avalonia Services](https://avaloniaui.net/services) for more information.
:::

## From Delphi (VCL / FireMonkey)

Delphi has been a mainstay of desktop development for decades. Many business-critical applications still run on VCL or FireMonkey. But the Delphi ecosystem is shrinking: fewer developers, fewer libraries, and rising licensing costs. Finding and hiring Delphi developers is becoming harder every year.

Avalonia gives you a path to .NET, which has a vastly larger developer pool, an active open-source ecosystem, and modern tooling. The transition requires learning XAML and MVVM, but the core concepts map surprisingly well.

### Concept mapping

| Delphi (VCL / FMX) | Avalonia | Notes |
|---|---|---|
| `TForm` | `Window` | |
| `TFrame` | `UserControl` | Reusable UI component |
| `TPanel` | `Border` or `Panel` | |
| `TButton` | `Button` | |
| `TEdit` | [`TextBox`](/api/avalonia/controls/textbox) | |
| `TMemo` | `TextBox` with `AcceptsReturn="True"` | |
| `TLabel` | `TextBlock` | |
| `TCheckBox` | `CheckBox` | |
| `TRadioButton` | `RadioButton` | |
| `TComboBox` | `ComboBox` | |
| `TListBox` | `ListBox` | |
| `TTreeView` | `TreeView` | |
| `TStringGrid` / `TDBGrid` | `DataGrid` (NuGet package) | |
| `TTabControl` | `TabControl` | |
| `TImage` | `Image` | |
| `TScrollBox` | `ScrollViewer` | |
| `TPopupMenu` | `ContextMenu` | |
| `TMainMenu` | `Menu` | |
| `TTimer` | `DispatcherTimer` | |
| `TAction` / `TActionList` | `ICommand` (MVVM pattern) | |
| Event handlers on components | Data binding + MVVM | The biggest architectural shift |
| DFM form files | `.axaml` XAML files | Declarative layout |
| `Application.CreateForm()` | `AppBuilder` pipeline | |

### Key differences

- **No visual form designer (drag-and-drop):** Avalonia uses XAML to declare layout. There is a live previewer, but you write markup rather than drag components onto a canvas. Most developers find this faster once they are past the initial learning curve.
- **MVVM replaces event-driven code:** In Delphi, you wire button clicks directly to methods. In Avalonia, you bind controls to properties and commands on a view model. This separation makes the code easier to test and maintain.
- **No component palette:** Instead of dropping components from a palette, you declare controls in XAML and configure them through properties and bindings.
- **.NET ecosystem:** NuGet replaces Delphi's component marketplace. The .NET package ecosystem is significantly larger.

## From Qt (QML / Qt Widgets)

Qt is a proven cross-platform framework, but its C++ foundation, licensing complexity (LGPL vs commercial), and the split between Qt Widgets and QML can create friction. If your team is already using .NET or wants to, Avalonia offers a cross-platform UI framework without leaving the .NET ecosystem.

### Concept mapping

| Qt | Avalonia | Notes |
|---|---|---|
| `QMainWindow` | `Window` | |
| `QWidget` | `Control` | |
| `QML` declarative UI | XAML declarative UI | Both are markup-based UI definitions |
| Signals and slots | Data binding + `ICommand` | Avalonia uses MVVM rather than signal/slot |
| `QVBoxLayout` / `QHBoxLayout` | `StackPanel` | |
| `QGridLayout` | `Grid` | |
| `QPushButton` | `Button` | |
| `QLineEdit` | `TextBox` | |
| `QTextEdit` | `TextBox` with `AcceptsReturn="True"` | |
| `QLabel` | `TextBlock` | |
| `QCheckBox` | `CheckBox` | |
| `QComboBox` | `ComboBox` | |
| `QListView` / `QListWidget` | `ListBox` | |
| `QTreeView` / `QTreeWidget` | `TreeView` | |
| `QTableView` | `DataGrid` (NuGet package) | |
| `QTabWidget` | `TabControl` | |
| `QScrollArea` | `ScrollViewer` | |
| `QMenu` | `ContextMenu` / `Menu` | |
| Qt Style Sheets (QSS) | CSS-like selectors and styles | Avalonia's styling system is conceptually similar to QSS |
| `QThread` / thread affinity | `Dispatcher.UIThread` | Same concept of UI thread affinity |
| `.ui` files (Qt Designer) | `.axaml` files | |
| `qmake` / `CMake` | MSBuild / `dotnet` CLI | |

### Key differences

- **No C++ required:** Avalonia is pure .NET (C# or F#). No bridging layers, no P/Invoke for basic UI work.
- **Simpler licensing:** Avalonia is MIT-licensed. No LGPL compliance concerns, no commercial license fees for the framework itself.
- **Styling is familiar:** If you have used Qt Style Sheets, Avalonia's CSS-like selectors will feel natural. Avalonia's system supports pseudo-classes, nested selectors, and style classes.
- **Single UI language:** Qt splits between Widgets (C++) and QML (JavaScript-like). Avalonia uses XAML consistently.

## From Electron

Electron applications are web apps packaged with Chromium. They work, but they consume significant memory and CPU, start slowly, and feel disconnected from the operating system. If your team chose Electron because it was the fastest way to cross-platform, Avalonia offers the same reach with native performance.

### Why teams move away from Electron

- **Memory usage:** Each Electron app bundles a full Chromium instance. A simple app can consume hundreds of megabytes of RAM.
- **Startup time:** Loading Chromium adds noticeable delay, especially on lower-end hardware.
- **No native feel:** Electron apps look and behave like web pages, not desktop applications. Window management, keyboard shortcuts, and system integration all require extra work.
- **Update and packaging complexity:** Shipping Chromium with your app makes builds larger and updates heavier.

### What Avalonia offers instead

- **Native performance:** Avalonia renders directly without a browser engine. Memory usage and startup time are dramatically lower.
- **Truly cross-platform:** Windows, macOS, Linux, iOS, Android, and WebAssembly from a single .NET codebase.
- **Desktop-native behaviour:** Window management, system menus, keyboard navigation, and tray icons work as users expect on each platform.
- **C# instead of JavaScript:** Strongly typed, compiled, with mature tooling and debugging support.

## From ASP.NET MVC / Blazor (Web to Desktop)

If you have a web application built with ASP.NET MVC or Blazor and want to offer a native desktop experience, Avalonia is a natural companion. Your backend, data layer, and business logic (all written in .NET) can be shared directly with an Avalonia desktop client. You are not rewriting your application logic, building a native frontend for it.

### What transfers directly

- **Models and DTOs:** Your data classes work in Avalonia without changes.
- **Services and business logic:** Anything that does not depend on ASP.NET's HTTP pipeline can be used directly.
- **Dependency injection:** Avalonia works with `Microsoft.Extensions.DependencyInjection` and the same patterns you use in ASP.NET.
- **Validation:** `INotifyDataErrorInfo` and data annotation validators work with Avalonia's binding system.

### What changes

- **No HTML/CSS/Razor:** Avalonia uses XAML for layout and a CSS-like styling system for appearance. The concepts are different from HTML, but XAML is more concise for UI work.
- **No HTTP request/response cycle:** Desktop apps are stateful. You bind UI controls to view model properties that update in real time, rather than rendering pages on each request.
- **Navigation is application-managed:** There is no URL routing. Navigation is handled by swapping views based on application state, or by using [NavigationPage](/controls/navigation/navigationpage) for stack-based page navigation.

## Getting started

Regardless of which framework you are coming from, the best place to start is the same:

1. **[Create your first Avalonia app](/docs/get-started/first-app):** Get a running application in minutes.
2. **[Learn XAML basics](/docs/xaml):** Understand how Avalonia declares UI.
3. **[Learn data binding](/docs/data-binding):** The foundation of how Avalonia connects UI to data.
4. **[Explore the controls](/controls):** See what is available out of the box.

## See also

- [Styles](/docs/styling/styles): How Avalonia's CSS-like styling works.
- [The MVVM Pattern](/docs/concepts/the-mvvm-pattern): Separating UI from logic.
- [Controls Reference](/controls): Full Avalonia controls documentation.
