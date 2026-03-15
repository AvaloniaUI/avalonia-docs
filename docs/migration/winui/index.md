---
title: WinUI / UWP
description: Migrate WinUI and UWP applications to Avalonia with equivalent XAML, controls, and MVVM patterns.
doc-type: migration
---

WinUI 3 and UWP are Microsoft's modern XAML frameworks, but they only target Windows. If your application needs to reach macOS, Linux, mobile, or the web, that is a hard ceiling. Avalonia uses a similar XAML model, supports the same MVVM patterns, and runs everywhere .NET runs.

If you already know WinUI or UWP, you are closer to Avalonia than you might think. The XAML dialect, data binding system, and control model are all familiar. The differences are mostly in styling, naming, and a few controls that work differently.

:::tip[Need help with your migration?]
The Avalonia team has hands-on experience migrating WinUI and UWP applications to Avalonia. If you would like expert guidance, this is a service we provide. See [Avalonia Services](https://avaloniaui.net/services) for more information.
:::

## Key differences

### Styling

WinUI uses `VisualStateManager` with visual states and storyboards to handle control appearance changes. Avalonia replaces this entirely with CSS-like selectors and pseudo-classes.

**WinUI (VisualStateManager):**

```xml
<VisualStateManager.VisualStateGroups>
    <VisualStateGroup x:Name="CommonStates">
        <VisualState x:Name="PointerOver">
            <VisualState.Setters>
                <Setter Target="RootBorder.Background" Value="{ThemeResource ButtonBackgroundPointerOver}" />
            </VisualState.Setters>
        </VisualState>
    </VisualStateGroup>
</VisualStateManager.VisualStateGroups>
```

**Avalonia (pseudo-classes):**

```xml
<Style Selector="Button:pointerover /template/ Border#RootBorder">
    <Setter Property="Background" Value="{DynamicResource ButtonBackgroundPointerOver}" />
</Style>
```

Avalonia's approach is more concise and composable. For a full guide on how styling works, see [Styles](/docs/styling/styles).

#### AdaptiveTrigger to container queries

WinUI uses `AdaptiveTrigger` inside `VisualStateManager` to adapt layout based on window size. Avalonia replaces this with container queries, which can respond to the size of any ancestor control (not only the window).

**WinUI (AdaptiveTrigger):**

```xml
<VisualStateManager.VisualStateGroups>
    <VisualStateGroup>
        <VisualState x:Name="Narrow">
            <VisualState.StateTriggers>
                <AdaptiveTrigger MinWindowWidth="0" />
            </VisualState.StateTriggers>
            <VisualState.Setters>
                <Setter Target="ContentGrid.Columns" Value="1" />
            </VisualState.Setters>
        </VisualState>
        <VisualState x:Name="Wide">
            <VisualState.StateTriggers>
                <AdaptiveTrigger MinWindowWidth="800" />
            </VisualState.StateTriggers>
            <VisualState.Setters>
                <Setter Target="ContentGrid.Columns" Value="3" />
            </VisualState.Setters>
        </VisualState>
    </VisualStateGroup>
</VisualStateManager.VisualStateGroups>
```

**Avalonia (container queries):**

```xml
<Panel Container.Name="root" Container.Sizing="Width">
    <Panel.Styles>
        <ContainerQuery Name="root" Query="max-width:800">
            <Style Selector="UniformGrid#ContentGrid">
                <Setter Property="Columns" Value="1" />
            </Style>
        </ContainerQuery>
        <ContainerQuery Name="root" Query="min-width:800">
            <Style Selector="UniformGrid#ContentGrid">
                <Setter Property="Columns" Value="3" />
            </Style>
        </ContainerQuery>
    </Panel.Styles>

    <UniformGrid x:Name="ContentGrid">
        <!-- content -->
    </UniformGrid>
</Panel>
```

Container queries offer two advantages over WinUI's `AdaptiveTrigger`:

- **Component-level responsiveness.** `AdaptiveTrigger` always measures the window. Container queries measure any ancestor, so a component adapts correctly whether it appears full-width, in a sidebar, or in a dialog.
- **No visual state boilerplate.** You define the query and the style in one place without declaring state groups, state names, or trigger objects.

You can also combine width and height conditions in a single query using `and` or `,` operators, and target any styleable property (font size, spacing, visibility, colours) alongside layout properties.

For the full query syntax, see [Container queries](/docs/styling/container-queries). For guidance on choosing between container queries, `OnFormFactor`, reflowing panels, and code-driven breakpoints, see [Responsive layouts](/docs/layout/responsive-layouts).

### XAML namespace

| WinUI / UWP | Avalonia |
|---|---|
| `xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"` | `xmlns="https://github.com/avaloniaui"` |
| `xmlns:muxc="using:Microsoft.UI.Xaml.Controls"` | `xmlns:controls="using:Avalonia.Controls"` (usually not needed, default namespace covers most controls) |
| `clr-namespace:` or `using:` for custom types | `using:` (preferred) or `clr-namespace:` |

### Data binding

The core binding syntax is the same. WinUI's `x:Bind` (compiled bindings) has an equivalent in Avalonia:

| WinUI / UWP | Avalonia | Notes |
|---|---|---|
| `{Binding Path}` | `{Binding Path}` | Same |
| `{x:Bind ViewModel.Name}` | `{Binding Name}` with `x:DataType` | Avalonia uses `x:CompileBindings` and `x:DataType` for compiled bindings |
| `{Binding ElementName=myControl, Path=Text}` | `{Binding #myControl.Text}` | `#name` shorthand |
| `{Binding RelativeSource={RelativeSource Self}}` | `{Binding $self.Property}` | |
| `x:DefaultBindMode` | `x:CompileBindings="True"` | |

### Controls

Most WinUI controls have direct equivalents in Avalonia. The main differences are in naming and a few controls that require separate packages.

| WinUI / UWP | Avalonia | Notes |
|---|---|---|
| `NavigationView` | No direct equivalent | Use [`SplitView`](/api/avalonia/controls/splitview) with a [`ListBox`](/api/avalonia/controls/listbox) or a third-party control |
| `InfoBar` | No direct equivalent | Use a styled `Border` with content |
| `TeachingTip` | No direct equivalent | Use `Popup` or `Flyout` |
| `PersonPicture` | No direct equivalent | Compose with `Ellipse` and `Image` |
| `RatingControl` | No direct equivalent | Use a third-party control |
| `NumberBox` | `NumericUpDown` | Different name |
| `Pivot` | `TabControl` | |
| `PivotItem` | `TabItem` | |
| `CalendarView` | `Calendar` | |
| `CalendarDatePicker` | `CalendarDatePicker` | Same |
| `CommandBar` | `Menu` or `ToolBar` | |
| `ContentDialog` | Dialog `Window` | Avalonia uses windows for dialogs |
| `MenuBar` | `Menu` | |
| `MenuFlyout` | `ContextMenu` | |
| `FlipView` | `Carousel` | |
| `ProgressRing` | No direct built-in equivalent | Use a third-party control or custom animation |
| `SplitView` | `SplitView` | Same |
| `TreeView` | `TreeView` | Same |
| `ListView` / `GridView` | `ListBox` | Use `ListBox` with `ItemTemplate` and `WrapPanel` for grid layout |
| `Page` / `Frame` | [`NavigationPage`](/api/avalonia/controls/navigationpage) / `ContentPage` | See [NavigationPage](/controls/navigation/navigationpage) |

### Navigation

Avalonia provides `NavigationPage`, a stack-based navigation system similar to WinUI's `Frame` and `Page` model. It supports pushing and popping pages with animated transitions, a built-in navigation bar with a back button, and modal presentation.

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

For full details on `NavigationPage`, see [NavigationPage](/controls/navigation/navigationpage).

### Resources and theming

| WinUI / UWP | Avalonia | Notes |
|---|---|---|
| `ThemeResource` | `DynamicResource` | Avalonia uses `DynamicResource` for theme-aware values |
| `StaticResource` | `StaticResource` | Same |
| `ResourceDictionary.ThemeDictionaries` | `ResourceDictionary.ThemeDictionaries` | Same concept |
| `ElementTheme.Light` / `.Dark` | `RequestedThemeVariant` | |
| `AcrylicBrush` | `ExperimentalAcrylicBorder` | Different API |

### File structure

| WinUI / UWP | Avalonia |
|---|---|
| `.xaml` extension | `.axaml` extension |
| `App.xaml` | `App.axaml` |
| `MainWindow.xaml` | `MainWindow.axaml` |
| `.xaml.cs` code-behind | `.axaml.cs` code-behind |
| `Package.appxmanifest` | No equivalent (standard .NET project) |

### Threading

| WinUI / UWP | Avalonia |
|---|---|
| `DispatcherQueue.TryEnqueue()` | `Dispatcher.UIThread.Post()` |
| `DispatcherQueue.GetForCurrentThread()` | `Dispatcher.UIThread` |
| `CoreDispatcher.RunAsync()` | `Dispatcher.UIThread.InvokeAsync()` |

## What you gain

Moving from WinUI to Avalonia is not only about cross-platform. There are a few areas where Avalonia offers more than WinUI does today:

- **CSS-like styling:** Selectors, style classes, and pseudo-classes give you more control over styling with less verbosity than `VisualStateManager`.
- **Compiled bindings with better tooling:** `x:DataType` and `x:CompileBindings` provide compile-time validation of binding paths across the entire project.
- **No MSIX/packaging requirement:** Avalonia applications are standard .NET executables. No app manifest, no packaging pipeline, no store requirement.
- **Linux and macOS as first-class targets:** Not an afterthought or a compatibility layer.

## See also

- [Get Started with Avalonia](/docs/get-started/first-app): Create your first Avalonia application.
- [Styles](/docs/styling/styles): How Avalonia's CSS-like styling works.
- [Container queries](/docs/styling/container-queries): Size-based styling, replacing WinUI's AdaptiveTrigger.
- [Responsive layouts](/docs/layout/responsive-layouts): Building adaptive layouts with container queries and reflowing panels.
- [Data Binding Syntax](/docs/data-binding/data-binding-syntax): Avalonia binding syntax reference.
- [Controls Reference](/controls): Full Avalonia controls documentation.
