---
title: .NET MAUI
description: Migrate from .NET MAUI to Avalonia or extend MAUI apps with the Avalonia MAUI Backend.
doc-type: migration
---

If you are a .NET MAUI developer, you have two paths to Avalonia. You can keep your existing MAUI codebase and use the Avalonia MAUI Backend to extend it to new platforms, or you can migrate your application to Avalonia directly for full control over the UI framework. This page covers both options.

:::tip[Need help?]
The Avalonia team has hands-on experience working with MAUI codebases. Whether you want to adopt the Avalonia MAUI Backend or migrate fully to Avalonia, this is a service we provide. See [Avalonia Services](https://avaloniaui.net/services) for more information.
:::

## Option 1: Avalonia MAUI backend

The Avalonia MAUI Backend lets you keep your .NET MAUI codebase and replace the rendering layer with Avalonia. Your existing MAUI code, controls, handlers, and layouts continue to work, but they render through Avalonia's cross-platform engine instead of native platform controls.

This gives your MAUI application access to platforms that MAUI does not support on its own:

- **Desktop Linux:** First-class desktop support on Ubuntu, Debian, Fedora, and other distributions, using the same Avalonia renderer that powers demanding desktop applications in production today.
- **Embedded Linux:** Avalonia already runs on embedded Linux devices, from Raspberry Pi panels to industrial HMIs. The MAUI Backend brings those same capabilities to your MAUI applications.
- **WebAssembly:** Deploy your MAUI application to the browser with no native dependencies on the client.
- **Improved desktop performance:** On Windows and macOS, the Avalonia backend plugs into Avalonia's mature desktop story. Early testing on macOS shows significantly improved performance compared to the Mac Catalyst approach.

Because Avalonia draws every control itself, your MAUI application looks and behaves consistently whether it runs on Windows, macOS, Linux, mobile, or in a browser tab.

### How it works

At its core, the Avalonia MAUI Backend builds a single set of handlers that map MAUI controls to Avalonia controls. When you create a [`Button`](/api/avalonia/controls/button) in MAUI, it renders as an Avalonia `Button` on every platform, rather than a platform-specific native control.

MAUI's layout system works similarly. MAUI handles the positioning and constraint calculations itself, and the Avalonia backend positions controls exactly as MAUI specifies. In practice, this means many standard MAUI layout controls work without modification.

Libraries that use `SkiaSharp` and `Microsoft.Maui.Graphics` also work, since Avalonia includes a SkiaSharp-based renderer. This enables a direct mapping of drawn controls with minimal changes.

### What this means for your code

You do not need to rewrite your application. You add the Avalonia MAUI Backend libraries to your existing project and target the new platforms. Your MAUI XAML, view models, services, and business logic stay the same.

Build-time tools like Resizetizer continue to work. During the build, Resizetizer converts your images, SVGs, and fonts into resources, and the Avalonia backend maps them to Avalonia resources automatically.

### Current status

The Avalonia team is developing the MAUI Backend in collaboration with engineers from the MAUI ecosystem. The goal is a stable release alongside .NET 11. Preview releases will follow the .NET MAUI release cadence, with nightly builds available from CI.

The initial focus is on Linux and WebAssembly, since MAUI does not target those platforms today. The backend also runs on Windows and macOS, and support for all Avalonia targets is planned.

The project will not fork .NET MAUI. Any changes needed to support the integration are contributed upstream to the official .NET MAUI repository, so the work benefits the entire ecosystem.

:::note
The Avalonia MAUI Backend is in active development. Register your interest at [avaloniaui.net](https://avaloniaui.net) to get updates and early access.
:::

## Option 2: migrate to Avalonia

If you want full control over the UI framework, or if your application needs capabilities beyond what MAUI offers (CSS-like styling, custom rendering, advanced desktop features), you can migrate your MAUI application to Avalonia directly.

### Prerequisites

Before you begin, make sure you have the following in place:

- **.NET 8 or later** installed. Avalonia 11+ targets .NET 8 as the minimum.
- **Avalonia templates** installed. Run `dotnet new install Avalonia.Templates` from the command line.
- **Your existing MAUI project compiles and runs.** Fix any existing build issues before starting. Having a working baseline makes it easier to verify each step.
- Familiarity with XAML and the MVVM pattern. If you are coming from MAUI, you already have this.

### Different rendering models

The most important difference between MAUI and Avalonia is how they render.

**MAUI** maps its controls to native platform controls. A `Button` on iOS is a `UIButton`. A `Button` on Android is an `Android.Widget.Button`. This means every platform can look subtly (or significantly) different, and platform-specific bugs are common.

**Avalonia** draws every control itself using Skia or Direct2D. A `Button` in Avalonia looks the same on Windows, macOS, Linux, iOS, Android, and WebAssembly. You choose the theme, not the platform.

This distinction affects everything: styling, layout precision, debugging, and how much platform-specific code you end up writing.

### Key differences

#### XAML dialect

Both frameworks use XAML, but the dialects differ. MAUI's XAML is rooted in Xamarin.Forms conventions. Avalonia's XAML is closer to WPF.

| .NET MAUI | Avalonia | Notes |
|---|---|---|
| `xmlns="http://schemas.microsoft.com/dotnet/2021/maui"` | `xmlns="https://github.com/avaloniaui"` | |
| `x:DataType` for compiled bindings | `x:DataType` + `x:CompileBindings` | Same concept, slightly different setup |
| `{Binding Path}` | `{Binding Path}` | Same syntax |
| `{Binding Source={RelativeSource Self}}` | `{Binding $self.Property}` | Shorthand syntax |
| `{Binding Source={x:Reference myControl}, Path=Text}` | `{Binding #myControl.Text}` | `#name` shorthand |

#### Layout

MAUI and Avalonia both use panels for layout, but the names and behaviour differ.

| .NET MAUI | Avalonia | Notes |
|---|---|---|
| `StackLayout` / `VerticalStackLayout` | `StackPanel` | Avalonia uses `Orientation` property |
| `HorizontalStackLayout` | `StackPanel Orientation="Horizontal"` | |
| `Grid` | `Grid` | Same concept. Avalonia supports shorthand `ColumnDefinitions="Auto,*"` |
| `FlexLayout` | `WrapPanel` | Not a direct equivalent, but covers most use cases |
| `AbsoluteLayout` | `Canvas` | |
| `ScrollView` | `ScrollViewer` | |
| `Frame` | `Border` | |
| `ContentView` | `UserControl` or `ContentControl` | |
| `Padding`, `Margin` | `Padding`, `Margin` | Same |
| `Spacing` on layouts | `Spacing` on `StackPanel` | Same concept |

#### Controls

| .NET MAUI | Avalonia | Notes |
|---|---|---|
| `Entry` | [`TextBox`](/api/avalonia/controls/textbox) | |
| `Editor` | `TextBox` with `AcceptsReturn="True"` | |
| `Label` | `TextBlock` | |
| `Button` | `Button` | Same |
| `ImageButton` | `Button` with image content | |
| `CheckBox` | `CheckBox` | Same |
| `Switch` | `ToggleSwitch` | |
| `Slider` | `Slider` | Same |
| `Stepper` | `NumericUpDown` | |
| `Picker` | `ComboBox` | |
| `DatePicker` | `DatePicker` | Same |
| `TimePicker` | `TimePicker` | Same |
| `ActivityIndicator` | `ProgressBar IsIndeterminate="True"` | |
| `ProgressBar` | `ProgressBar` | Same |
| `ListView` / `CollectionView` | `ListBox` or `ItemsRepeater` | `ItemsRepeater` for virtualised custom layouts |
| `CarouselView` | `Carousel` | |
| `TableView` | No direct equivalent | Use `DataGrid` or compose with panels |
| `WebView` | No built-in equivalent | Use a third-party control |
| `RefreshView` | `RefreshContainer` | |
| `SearchBar` | `TextBox` with custom styling | Or `AutoCompleteBox` for suggestions |
| `Shell` | No equivalent | Avalonia does not impose a navigation framework |
| `FlyoutPage` | `SplitView` | |
| `TabbedPage` | `TabControl` | |
| [`NavigationPage`](/api/avalonia/controls/navigationpage) | `NavigationPage` | See [NavigationPage](/controls/navigation/navigationpage) |
| `ContentPage` | `ContentPage` | Used within `NavigationPage` |
| `BoxView` | `Border` or `Rectangle` | |

#### Styling

MAUI uses a resource-dictionary approach with `Style` elements that target types. Avalonia uses CSS-like selectors.

**MAUI:**

```xml
<Style TargetType="Button">
    <Setter Property="BackgroundColor" Value="SteelBlue" />
    <Setter Property="TextColor" Value="White" />
</Style>
```

**Avalonia:**

```xml
<Style Selector="Button">
    <Setter Property="Background" Value="SteelBlue" />
    <Setter Property="Foreground" Value="White" />
</Style>
```

The syntax is similar on the surface, but Avalonia's selectors support additional capabilities. You can target controls by class, name, state, nesting, and more:

```xml
<Style Selector="Button.primary:pointerover">
    <Setter Property="Background" Value="LightBlue" />
</Style>
```

MAUI has `VisualStateManager` for interactive states. Avalonia uses pseudo-classes (`:pointerover`, `:pressed`, `:disabled`, `:checked`) as part of the selector, which is more concise. See [Styles](/docs/styling/styles) for the full reference.

#### Navigation

MAUI provides `Shell`, `NavigationPage`, `FlyoutPage`, and `TabbedPage` as built-in navigation patterns. Avalonia provides `NavigationPage`, a stack-based navigation system that will feel familiar if you have used MAUI's `NavigationPage`. It supports pushing and popping pages with animated transitions, a built-in navigation bar with a back button, and modal presentation.

```xml
<NavigationPage xmlns="https://github.com/avaloniaui">
    <ContentPage Header="Home">
        <StackPanel Margin="16" Spacing="8">
            <TextBlock Text="Home Page" FontSize="24" />
            <Button Content="Go to Details" Click="OnGoToDetails" />
        </StackPanel>
    </ContentPage>
</NavigationPage>
```

```csharp
// Push a new page onto the stack
await Navigation.PushAsync(new DetailsPage());

// Pop back to the previous page
await Navigation.PopAsync();
```

For applications that prefer a lighter approach, you can also handle navigation through view model composition by swapping the content of a `ContentControl` based on application state:

```xml
<ContentControl Content="{Binding CurrentPage}" />
```

Avalonia resolves the correct view automatically if you register data templates for each view model type. This approach works well for applications that do not need a navigation bar or animated page transitions.

For full details, see [NavigationPage](/controls/navigation/navigationpage).

#### Platform-specific code

In MAUI, platform differences leak through constantly. You end up writing handlers, custom renderers, or `#if` conditional compilation blocks to fix behaviour on specific platforms.

In Avalonia, platform-specific code is rare. Because Avalonia controls its own rendering, the same code produces the same result everywhere. When you do need platform-specific behaviour (for example, accessing a native API), Avalonia provides clean abstractions without requiring you to subclass renderers.

#### File structure

| .NET MAUI | Avalonia |
|---|---|
| `.xaml` extension | `.axaml` extension |
| `App.xaml` | `App.axaml` |
| `MainPage.xaml` | `MainWindow.axaml` |
| `.xaml.cs` code-behind | `.axaml.cs` code-behind |
| `Platforms/` folder with per-platform code | Typically no platform folders needed |
| `MauiProgram.cs` builder | `Program.cs` with `AppBuilder` |

#### Threading

| .NET MAUI | Avalonia |
|---|---|
| `MainThread.BeginInvokeOnMainThread()` | `Dispatcher.UIThread.Post()` |
| `MainThread.InvokeOnMainThreadAsync()` | `Dispatcher.UIThread.InvokeAsync()` |
| `MainThread.IsMainThread` | `Dispatcher.UIThread.CheckAccess()` |

### Migration steps

There is no automated converter from MAUI to Avalonia. The migration is a manual process, but the similarities between the two frameworks make the process manageable. Work through your application one layer at a time.

#### 1. Create a new Avalonia project

Start with a fresh Avalonia project using the templates:

```bash
dotnet new avalonia.mvvm -n MyApp
```

This gives you a working project structure with `App.axaml`, `MainWindow.axaml`, and a view model base class. Do not try to convert your MAUI `.csproj` in place.

#### 2. Move your models and services

Copy your model classes, services, and any platform-independent business logic into the new project. These typically require no changes since they have no UI framework dependency.

#### 3. Migrate your view models

Copy your view models. If you use `CommunityToolkit.Mvvm`, it works with Avalonia without modification. If your view models reference MAUI-specific types (such as `Microsoft.Maui.Controls.Application`), replace those references with Avalonia equivalents.

#### 4. Convert your XAML files

For each `.xaml` page in your MAUI project, create a corresponding `.axaml` file in the Avalonia project. Use the control and layout mapping tables in the [Key differences](#key-differences) section above to translate control names, properties, and binding syntax.

Key changes for every file:
- Replace the root XML namespace with `xmlns="https://github.com/avaloniaui"`
- Rename controls (`Entry` to `TextBox`, `Label` to `TextBlock`, etc.)
- Replace `VisualStateManager` blocks with Avalonia style selectors and pseudo-classes
- Update binding syntax where needed (`{x:Reference}` to `#name`, `RelativeSource Self` to `$self`)

#### 5. Convert your styles and resources

Move your resource dictionaries. Replace `TargetType`-based styles with Avalonia selector-based styles. See the [Styling](#styling) section above for examples.

#### 6. Replace navigation

If your MAUI app uses `Shell` or `NavigationPage`, replace it with Avalonia's `NavigationPage` or a view model composition pattern. See the [Navigation](#navigation) section above.

#### 7. Handle platform-specific code

Review any code in your MAUI `Platforms/` folder. Most platform-specific workarounds for rendering inconsistencies are no longer needed. For genuine platform API access (camera, file system, sensors), use .NET MAUI Essentials as a standalone package or replace with direct platform API calls.

### Verification

After completing the migration, verify that your application works correctly:

1. **Build the project.** Fix any remaining compilation errors from missed type renames or namespace changes.
2. **Run on your primary platform.** Confirm that the main window loads and navigation works.
3. **Test on a second platform.** Run on a different OS (for example, macOS if you developed on Windows) to confirm cross-platform rendering consistency.
4. **Walk through your core user flows.** Verify that data binding, commands, and input handling work as expected.
5. **Check your styles.** Confirm that visual appearance matches your intent, paying attention to hover/pressed states that previously used `VisualStateManager`.

### What you gain

Moving from MAUI to Avalonia changes how you work day to day:

- **Pixel-perfect consistency:** Your UI renders identically on every platform. No more chasing layout bugs that only appear on Android or styling quirks on iOS.
- **First-class desktop support:** Avalonia was built for desktop from the start. Window management, menus, keyboard navigation, and multi-window support all work as expected.
- **Linux support:** Avalonia runs natively on Linux. MAUI does not support Linux at all.
- **No native control wrappers:** You are not debugging through layers of platform abstraction. What you see in XAML is what renders.
- **WebAssembly:** Avalonia supports browser deployment through WebAssembly, a target MAUI does not offer.

## See also

- [Get Started with Avalonia](/docs/get-started/first-app): Create your first Avalonia application.
- [Styles](/docs/styling/styles): How Avalonia's CSS-like styling works.
- [Data Binding Syntax](/docs/data-binding/data-binding-syntax): Avalonia binding syntax reference.
- [Controls Reference](/controls): Full Avalonia controls documentation.
- [NavigationPage](/controls/navigation/navigationpage): Stack-based page navigation in Avalonia.
