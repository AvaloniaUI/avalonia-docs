---
id: cheat-sheet
title: WPF to Avalonia cheat sheet
description: Quick reference mapping WPF concepts, controls, and APIs to their Avalonia equivalents.
doc-type: migration
---

A quick reference for WPF developers transitioning to Avalonia. Each entry shows the WPF concept and its Avalonia equivalent.

## XAML namespace

| WPF | Avalonia |
|---|---|
| `xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"` | `xmlns="https://github.com/avaloniaui"` |
| `xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"` | Same |
| `xmlns:local="clr-namespace:MyApp"` | `xmlns:local="using:MyApp"` (preferred) or `clr-namespace:` |

## Property system

| WPF | Avalonia | Notes |
|---|---|---|
| `DependencyProperty` | `StyledProperty` | Supports styling, animation, inheritance |
| `DependencyProperty` (perf-critical) | `DirectProperty` | Faster but no styling/animation |
| `DependencyProperty.Register()` | `AvaloniaProperty.Register<TOwner, TValue>()` | Generic registration |
| `DependencyProperty.RegisterAttached()` | `AvaloniaProperty.RegisterAttached<TValue>()` | Attached properties |
| `PropertyMetadata` | `StyledPropertyMetadata<T>` | Type-safe metadata |
| `CoerceValueCallback` | `CoerceValueCallback` via metadata | Same concept |
| `PropertyChanged` callback in metadata | `propertyChanged` callback in `Register` | Passed directly |

## Styling

| WPF | Avalonia | Notes |
|---|---|---|
| `<Style TargetType="Button">` | `<Style Selector="Button">` | CSS-like selectors |
| `Style.Triggers` | Pseudo-classes (`:pointerover`, `:pressed`) | No triggers in Avalonia |
| `DataTrigger` | Bindings + pseudo-classes or converters | See below |
| `EventTrigger` | Animations on pseudo-classes | |
| `VisualStateManager` | Pseudo-classes | `:pointerover`, `:pressed`, `:disabled`, `:checked` |
| `BasedOn="{StaticResource ...}"` | Not needed; selectors compose | |
| `Style x:Key="..."` | Style classes: `<Style Selector="Button.primary">` | |
| `Style="{StaticResource ButtonStyle}"` | `Classes="primary"` | |
| `ControlTemplate.Triggers` | Pseudo-class selectors | |
| `TemplateBinding` | `TemplateBinding` | Same concept (OneWay only) |
| `{RelativeSource TemplatedParent}` | `{TemplateBinding}` or `$parent[ControlType]` | |

### DataTrigger equivalent

WPF:
```xml
<DataTrigger Binding="{Binding IsActive}" Value="True">
    <Setter Property="Background" Value="Green" />
</DataTrigger>
```

Avalonia (use a converter or custom pseudo-class):
```xml
<Style Selector="Border.status">
    <Setter Property="Background" Value="Red" />
</Style>
<Style Selector="Border.status[(vm:MyViewModel.IsActive)]">
    <Setter Property="Background" Value="Green" />
</Style>
```

Or with a binding converter:
```xml
<Border Background="{Binding IsActive, Converter={StaticResource BoolToColorConverter}}" />
```

## Data binding

| WPF | Avalonia | Notes |
|---|---|---|
| `{Binding Path}` | `{Binding Path}` | Same syntax |
| `{Binding Path, Mode=TwoWay}` | `{Binding Path, Mode=TwoWay}` | Same |
| `{Binding RelativeSource={RelativeSource Self}}` | `{Binding $self.Property}` | Shorthand syntax |
| `{Binding RelativeSource={RelativeSource AncestorType=Grid}}` | `{Binding $parent[Grid].Property}` | |
| `{Binding RelativeSource={RelativeSource TemplatedParent}}` | `{TemplateBinding Property}` | |
| `{Binding ElementName=myControl, Path=Text}` | `{Binding #myControl.Text}` | `#name` syntax |
| `CompiledBinding` | `{CompiledBinding}` or `x:CompileBindings="True"` | Compile-time validation |
| `MultiBinding` | `MultiBinding` | Same concept |
| `IValueConverter` | `IValueConverter` | Same interface |
| `IMultiValueConverter` | `IMultiValueConverter` | Same interface |
| `FallbackValue` | `FallbackValue` | Same |
| `TargetNullValue` | `TargetNullValue` | Same |
| `StringFormat` | `StringFormat` | Same |
| `UpdateSourceTrigger` | Not needed; defaults are sensible | TextBox updates on text change |

## Controls

| WPF | Avalonia | Notes |
|---|---|---|
| `Window` | `Window` | Same |
| `UserControl` | `UserControl` | Same |
| `Button` | `Button` | Same |
| `TextBlock` | `TextBlock` | Same |
| `TextBox` | `TextBox` | Same |
| `CheckBox` | `CheckBox` | Same |
| `RadioButton` | `RadioButton` | Same |
| `ComboBox` | `ComboBox` | Same |
| [`ListBox`](/api/avalonia/controls/listbox) | `ListBox` | Same |
| `ListView` | `ListBox` | Use ListBox with ItemTemplate |
| `TreeView` | `TreeView` | Same |
| `DataGrid` | `DataGrid` (NuGet package) | Separate package |
| `TabControl` | `TabControl` | Same |
| `Expander` | `Expander` | Same |
| `Slider` | `Slider` | Same |
| `ProgressBar` | `ProgressBar` | Same |
| `ToolTip` | `ToolTip` | Attached property: `ToolTip.Tip` |
| `StatusBar` | No direct equivalent | Use a styled panel |
| `Menu` | `Menu` | Same |
| `ContextMenu` | `ContextMenu` | Same |
| `Popup` | `Popup` | Same |
| `ScrollViewer` | `ScrollViewer` | Same |
| `Image` | `Image` | Same |
| [`Border`](/api/avalonia/controls/border) | `Border` | Same; supports `BoxShadow` |
| `Viewbox` | `Viewbox` | Same |
| `ContentControl` | `ContentControl` | Same |
| `ItemsControl` | `ItemsControl` | Same |
| `StackPanel` | `StackPanel` | Same |
| `Grid` | `Grid` | Same; shorthand `ColumnDefinitions="Auto,*"` |
| `DockPanel` | `DockPanel` | Same |
| `WrapPanel` | `WrapPanel` | Same |
| `Canvas` | `Canvas` | Same |
| `UniformGrid` | `UniformGrid` | Same |
| `GroupBox` | [`GroupBox`](/controls/layout/containers/groupbox) | Same |
| `RichTextBox` | No built-in equivalent | Use a third-party editor |

## Layout

| WPF | Avalonia | Notes |
|---|---|---|
| `Grid.RowDefinitions="Auto,*"` | Same shorthand | Both support inline syntax |
| `DockPanel.LastChildFill` | `DockPanel.LastChildFill` | Same |
| `HorizontalAlignment` | `HorizontalAlignment` | Same |
| `VerticalAlignment` | `VerticalAlignment` | Same |
| `Margin="10,5"` | `Margin="10,5"` | Same |
| `SharedSizeGroup` | `SharedSizeGroup` | Same |
| `Visibility` (`Visible`/`Collapsed`/`Hidden`) | `IsVisible` (`bool`) | `IsVisible="False"` equals WPF `Collapsed` (removed from layout). For WPF `Hidden` (invisible but still occupies space), use `Opacity="0"` instead. |

## Resources

| WPF | Avalonia | Notes |
|---|---|---|
| `StaticResource` | `StaticResource` | Same (resolved once) |
| `DynamicResource` | `DynamicResource` | Same (tracks changes) |
| `MergedDictionaries` | `MergedDictionaries` | Same |
| `ResourceDictionary` | `ResourceDictionary` | Same |
| `ThemeDictionaries` | `ResourceDictionary.ThemeDictionaries` | Light/Dark variants |

## Events

| WPF | Avalonia | Notes |
|---|---|---|
| [`RoutedEvent`](/api/avalonia/interactivity/routedevent) (Bubble) | `RoutedEvent` (Bubble) | Same |
| `RoutedEvent` (Tunnel) | `RoutedEvent` (Tunnel) | Same |
| `Preview*` events | Tunnel routing strategy | Use `AddHandler` with `RoutingStrategies.Tunnel` |
| `EventManager.RegisterRoutedEvent` | `RoutedEvent.Register<T, TArgs>` | Generic registration |
| `e.Handled = true` | `e.Handled = true` | Same |
| `AddHandler(event, handler, handledEventsToo)` | Same signature | Same |
| Class handlers | `Event.AddClassHandler<T>()` | Same concept |

## Commands

| WPF | Avalonia | Notes |
|---|---|---|
| `ICommand` | `ICommand` | Same interface |
| `RoutedCommand` | No built-in equivalent | Use `ICommand` implementations |
| `CommandBinding` | No equivalent | Bind commands directly |
| `InputBinding` / `KeyBinding` | `KeyBinding` | Same concept |
| `RelayCommand` (MVVM toolkit) | `RelayCommand` (CommunityToolkit.Mvvm) | Same library works |

## Templates

| WPF | Avalonia | Notes |
|---|---|---|
| [`DataTemplate`](/api/avalonia/markup/xaml/templates/datatemplate) | `DataTemplate` | Same |
| `HierarchicalDataTemplate` | `TreeDataTemplate` | Different name |
| `ControlTemplate` | `ControlTemplate` | Same |
| `DataTemplateSelector` | `DataTemplate` with `DataType` | Use DataType matching |
| `ContentPresenter` | `ContentPresenter` | Same |
| `ItemsPresenter` | `ItemsPresenter` | Same |
| `PART_` naming convention | `PART_` naming convention | Same |

## Threading

| WPF | Avalonia | Notes |
|---|---|---|
| `Dispatcher.Invoke()` | `Dispatcher.UIThread.InvokeAsync()` | Async by default |
| `Dispatcher.BeginInvoke()` | `Dispatcher.UIThread.Post()` | Fire-and-forget |
| `Dispatcher.CurrentDispatcher` | `Dispatcher.CurrentDispatcher` | Same API |
| `Dispatcher.FromThread()` | `Dispatcher.FromThread()` | Same API |
| `DependencyObject.Dispatcher` | `AvaloniaObject.Dispatcher` | Per-object dispatcher |
| `Dispatcher.CheckAccess()` | `Dispatcher.UIThread.CheckAccess()` | Same |
| `Dispatcher.Yield()` | `Dispatcher.Yield()` | Same API |
| `DispatcherPriority` | `DispatcherPriority` | Same enum |

## Animations

| WPF | Avalonia | Notes |
|---|---|---|
| `Storyboard` | `Animation` | Different API |
| `DoubleAnimation` | Keyframe animations | Use `KeyFrame` with `Cue` |
| `BeginStoryboard` | Animations declared in `Style.Animations` | Triggered by pseudo-classes |
| `EasingFunction` | `Easing` property | Same easing types available |
| `Transitions` (UWP) | `Transitions` | Property change animations |
| `CompositionTarget.Rendering` | `TopLevel.RequestAnimationFrame()` | Per-frame callback on UI thread; see also `CompositionCustomVisualHandler` for render-thread callbacks |

## Graphics

| WPF | Avalonia | Notes |
|---|---|---|
| `SolidColorBrush` | `SolidColorBrush` | Same |
| `LinearGradientBrush` | `LinearGradientBrush` | Same |
| `RadialGradientBrush` | `RadialGradientBrush` | Same |
| `ImageBrush` | `ImageBrush` | Same |
| [`VisualBrush`](/api/avalonia/media/visualbrush) | `VisualBrush` | Same |
| `DrawingBrush` | Not available | Use `VisualBrush` |
| `BitmapEffect` | `Effect` property | `BlurEffect`, `DropShadowEffect` |
| `DropShadowEffect` | `BoxShadow` on `Border` | Different API, CSS-like |
| `RenderTransform` | `RenderTransform` | Same; also supports CSS shorthand |
| `LayoutTransform` | `LayoutTransformControl` | Wrap in a control |
| `Clip` | `Clip` | Same |
| `OpacityMask` | `OpacityMask` | Same |
| `Path` | `Path` | Same; same mini-language |

## Platform services

| WPF | Avalonia | Notes |
|---|---|---|
| `SystemParameters.PrimaryScreenWidth` | `TopLevel.GetTopLevel(this).Screens.Primary.Bounds.Width` | Access via [`Screens`](/api/avalonia/controls/screens) on any `TopLevel` |
| `System.Windows.Forms.Screen.AllScreens` | `TopLevel.GetTopLevel(this).Screens.All` | Returns all connected monitors |
| `System.Windows.Forms.Screen.PrimaryScreen.WorkingArea` | `TopLevel.GetTopLevel(this).Screens.Primary.WorkingArea` | Excludes taskbar/dock |
| `PresentationSource.FromVisual().CompositionTarget.TransformToDevice` | `TopLevel.GetTopLevel(this).Screens.Primary.Scaling` | DPI scaling factor |

See [Working with screens](/docs/app-development/window-management#working-with-screens) for full usage details.

## File structure

| WPF | Avalonia |
|---|---|
| `.xaml` extension | `.axaml` extension |
| `App.xaml` | `App.axaml` |
| `MainWindow.xaml` | `MainWindow.axaml` |
| `.xaml.cs` code-behind | `.axaml.cs` code-behind |
| `.csproj` WPF SDK | `.csproj` Avalonia SDK |

## Common gotchas

1. **No triggers**: Avalonia uses pseudo-classes and CSS-like selectors instead of WPF triggers. See [Pseudo-Classes](/docs/styling/pseudoclasses).

2. **Style selectors not TargetType**: Styles use CSS-like selectors (`Button.primary:pointerover`) instead of `TargetType` + `Triggers`.

3. **x:Name not Name**: Use `x:Name` in Avalonia XAML. The `Name` property exists but `x:Name` is standard.

4. **Binding path syntax**: Use `#elementName.Property` instead of `ElementName=elementName, Path=Property`. Use `$parent[Type]` instead of `RelativeSource AncestorType`.

5. **No RoutedCommand**: Avalonia does not have WPF's `RoutedCommand` infrastructure. Use `ICommand` implementations (CommunityToolkit.Mvvm recommended).

6. **DataGrid is a separate package**: Install `Avalonia.Controls.DataGrid` from NuGet.

7. **TreeDataTemplate not HierarchicalDataTemplate**: The name is different but the concept is identical.

8. **Layout transforms**: Use `LayoutTransformControl` wrapper instead of the `LayoutTransform` property.

9. **Assets use avares://**: Resource URIs use `avares://AssemblyName/path` instead of `pack://application:,,,/`.

10. **Default binding modes**: Some controls have different default binding modes than WPF. Check the control documentation if a binding does not update as expected.

## See also

- [Migrating from WPF](/docs/migration/wpf): Detailed migration guides.
- [Avalonia Architecture](/docs/fundamentals/architecture): How Avalonia works internally.
- [Style Selectors](/docs/styling/style-selectors): CSS-like selector syntax.
- [Data Binding Syntax](/docs/data-binding/data-binding-syntax): Avalonia binding syntax.
