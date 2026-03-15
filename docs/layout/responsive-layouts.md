---
id: responsive-layouts
title: Responsive layouts
description: Create layouts that adapt to different sizes using container queries, form-factor extensions, and reflowing panels.
doc-type: explanation
---

Avalonia provides techniques for building layouts that adapt when the available space changes. You can respond to the size of a container, the type of device, or the dimensions of a reflowing panel. This page explains each approach and when to choose it.

## Approaches at a glance

| Technique | Responds to | Resolves | Best for |
|-----------|-------------|----------|----------|
| [Container queries](#container-queries) | Size of an ancestor control | Live, as the control resizes | Reusable components that appear in panels of varying width |
| [`OnFormFactor`](#onformfactor) | Device type (desktop, mobile) | Once, at startup | Platform-specific layout differences |
| [Reflowing panels](#reflowing-panels) | Available width | Live, as the panel resizes | Card grids and flowing content |
| [Breakpoint view models](#breakpoint-view-models) | Window width (or any measured value) | Live, via property change | Complex multi-property transitions driven by code |

## Container queries

Container queries let you activate styles when an ancestor control reaches a specific size. Because the query targets a control rather than the window, the same component adapts correctly whether it appears in a full-width page, a narrow sidebar, or a dialog.

### Declaring a container

Mark any ancestor as a container by setting the `Container.Name` and `Container.Sizing` attached properties:

```xml
<Border Container.Name="main"
        Container.Sizing="Width">
    <!-- child content here -->
</Border>
```

`Container.Sizing` determines which dimensions are tracked:

| Value | Tracked dimensions |
|-------|--------------------|
| `Normal` | None (default) |
| `Width` | Width only |
| `Height` | Height only |
| `WidthAndHeight` | Both width and height |

### Writing a container query

A `ContainerQuery` element lives inside the `Styles` collection of a control that is an ancestor of the container. It activates its child styles when the query condition is met:

```xml
<Window>
    <Window.Styles>
        <ContainerQuery Name="main" Query="max-width:600">
            <Style Selector="StackPanel#sidebar">
                <Setter Property="IsVisible" Value="False" />
            </Style>
        </ContainerQuery>
    </Window.Styles>

    <Grid ColumnDefinitions="200,*">
        <StackPanel x:Name="sidebar" Grid.Column="0">
            <!-- sidebar content -->
        </StackPanel>
        <ContentControl Grid.Column="1"
                        Content="{Binding CurrentPage}" />
    </Grid>
</Window>
```

In this example, the sidebar hides when the container named `main` is 600 pixels wide or narrower.

### Adjusting layout structure with breakpoints

You can use multiple container queries on the same container to define breakpoint tiers. The following example changes the number of columns in a `UniformGrid` as the container grows:

```xml
<Panel Container.Name="content" Container.Sizing="Width">
    <Panel.Styles>
        <ContainerQuery Name="content" Query="max-width:400">
            <Style Selector="UniformGrid#cards">
                <Setter Property="Columns" Value="1" />
            </Style>
        </ContainerQuery>
        <ContainerQuery Name="content" Query="min-width:400">
            <Style Selector="UniformGrid#cards">
                <Setter Property="Columns" Value="2" />
            </Style>
        </ContainerQuery>
        <ContainerQuery Name="content" Query="min-width:800">
            <Style Selector="UniformGrid#cards">
                <Setter Property="Columns" Value="3" />
            </Style>
        </ContainerQuery>
    </Panel.Styles>

    <UniformGrid x:Name="cards">
        <!-- card items -->
    </UniformGrid>
</Panel>
```

### Customising non-layout properties

Container queries are not limited to layout properties. You can adjust any property that a `Style` can set, including font sizes, spacing, visibility, and colours:

```xml
<Panel Container.Name="content" Container.Sizing="Width">
    <Panel.Styles>
        <!-- Default heading size -->
        <Style Selector="TextBlock.heading">
            <Setter Property="FontSize" Value="24" />
        </Style>

        <!-- Smaller heading when the container is narrow -->
        <ContainerQuery Name="content" Query="max-width:500">
            <Style Selector="TextBlock.heading">
                <Setter Property="FontSize" Value="18" />
            </Style>
            <Style Selector="StackPanel.toolbar">
                <Setter Property="Orientation" Value="Vertical" />
            </Style>
        </ContainerQuery>
    </Panel.Styles>

    <StackPanel>
        <TextBlock Classes="heading" Text="Dashboard" />
        <StackPanel Classes="toolbar" Orientation="Horizontal" Spacing="8">
            <Button Content="New" />
            <Button Content="Refresh" />
        </StackPanel>
    </StackPanel>
</Panel>
```

### Combining queries

Combine multiple conditions in a single query using `and` (all conditions must match) or `,` (any condition can match):

```xml
<!-- Both conditions must be true -->
<ContainerQuery Name="main" Query="min-width:400 and max-width:800">
    <!-- styles for medium widths -->
</ContainerQuery>

<!-- Either condition can be true -->
<ContainerQuery Name="main" Query="max-width:300,min-height:600">
    <!-- styles for narrow OR tall containers -->
</ContainerQuery>
```

For the full query syntax, available query types, and restrictions, see [Container queries](/docs/styling/container-queries).

:::tip
When the `TopLevel` (your window or main view) is set as a container, container queries behave like CSS media queries, responding to the window size itself.
:::

## OnFormFactor

The `OnFormFactor` markup extension selects a value based on the device type. It resolves once at startup, so it does not respond to window resizing at runtime.

### Form factor values

| Parameter | Matches | Typical platforms |
|-----------|---------|-------------------|
| `Desktop` | Desktop systems | Windows, macOS, Linux |
| `Mobile` | Mobile systems | iOS, Android |
| `TV` | Television systems | tvOS, Android TV |
| `Default` | Fallback when the current form factor is not specified | Any |

If the current form factor does not match any of the specified parameters, the `Default` value is used. If `Default` is not set, the property receives its type's default value.

```xml
<Grid ColumnDefinitions="{OnFormFactor Desktop='250,*', Mobile='*'}">
    <Border Grid.Column="0"
            IsVisible="{OnFormFactor Desktop=True, Mobile=False}">
        <ListBox ItemsSource="{Binding MenuItems}" />
    </Border>
    <ContentControl Grid.Column="{OnFormFactor Desktop=1, Mobile=0}"
                    Content="{Binding CurrentPage}" />
</Grid>
```

Use `OnFormFactor` when your desktop and mobile layouts are structurally different and you do not need to respond to live resizing. For layouts that must adapt as the user resizes the window, use container queries instead.

### OnPlatform

The related `OnPlatform` markup extension selects a value based on the operating system rather than the device type. It also resolves once at startup.

| Parameter | Matches |
|-----------|---------|
| `Windows` | Windows |
| `macOS` | macOS |
| `Linux` | Linux |
| `iOS` | iOS |
| `Android` | Android |
| `Browser` | WebAssembly (WASM) in a browser |
| `Default` | Fallback when the current platform is not specified |

```xml
<TextBlock FontFamily="{OnPlatform macOS='San Francisco',
                                   Windows='Segoe UI',
                                   Default='Inter'}" />
```

`OnFormFactor` and `OnPlatform` serve different purposes. Use `OnFormFactor` for structural layout differences between device categories (desktop vs. mobile). Use `OnPlatform` for platform-specific adjustments like native font families or OS-specific styling.

## Reflowing panels

Some panels automatically reflow their children based on available space without requiring queries or code.

**`WrapPanel`** arranges children in a row and wraps to the next line when the edge of the panel is reached:

```xml
<WrapPanel Orientation="Horizontal">
    <Button Content="One" Margin="4" />
    <Button Content="Two" Margin="4" />
    <Button Content="Three" Margin="4" />
    <!-- wraps to the next row when the panel is too narrow -->
</WrapPanel>
```

**`UniformGridLayout`** (used with `ItemsRepeater`) calculates column count from the available width and a minimum item size:

```xml
<ItemsRepeater ItemsSource="{Binding Cards}">
    <ItemsRepeater.Layout>
        <UniformGridLayout MinItemWidth="280"
                           MinItemHeight="200"
                           MinColumnSpacing="12"
                           MinRowSpacing="12" />
    </ItemsRepeater.Layout>
    <ItemsRepeater.ItemTemplate>
        <DataTemplate>
            <Border Padding="16" CornerRadius="8"
                    Background="White"
                    BorderBrush="#E5E7EB" BorderThickness="1">
                <TextBlock Text="{Binding Title}" />
            </Border>
        </DataTemplate>
    </ItemsRepeater.ItemTemplate>
</ItemsRepeater>
```

These panels are a good choice when you need flowing content without explicit breakpoints.

## Breakpoint view models

When your responsive logic involves multiple coordinated property changes or conditions beyond size (such as combining orientation and platform checks), you can observe the window width in your view model and expose boolean properties for each tier:

```csharp
public partial class MainViewModel : ObservableObject
{
    [ObservableProperty]
    private bool _isCompact;

    [ObservableProperty]
    private bool _isWide;

    public void UpdateLayout(double windowWidth)
    {
        IsCompact = windowWidth < 640;
        IsWide = windowWidth >= 1024;
    }
}
```

Call `UpdateLayout` from the window's size-changed handler:

```csharp
protected override void OnSizeChanged(SizeChangedEventArgs e)
{
    base.OnSizeChanged(e);
    if (DataContext is MainViewModel vm)
        vm.UpdateLayout(e.NewSize.Width);
}
```

Then bind layout properties to the breakpoint flags:

```xml
<StackPanel IsVisible="{Binding IsCompact}" Spacing="8">
    <views:SidebarView />
    <views:ContentView />
</StackPanel>

<Grid IsVisible="{Binding !IsCompact}" ColumnDefinitions="280,*">
    <views:SidebarView Grid.Column="0" />
    <views:ContentView Grid.Column="1" />
</Grid>
```

This approach provides full programmatic control but requires code-behind or view model wiring. Prefer container queries when your transitions are purely size-based and can be expressed in XAML.

## Choosing an approach

Use the following decision process to select the right technique:

1. **Does your component need to adapt based on its own size (not the window)?** Use container queries. This keeps the component self-contained and reusable.
2. **Are desktop and mobile layouts structurally different, with no need for live resizing?** Use `OnFormFactor`.
3. **Do you have a collection of items that should reflow into rows?** Use `WrapPanel` or `UniformGridLayout`.
4. **Does your transition logic involve multiple conditions, platform checks, or non-size triggers?** Use breakpoint view models.

You can combine these techniques. For example, use `OnFormFactor` for a top-level structural difference (sidebar vs. bottom tabs), then use container queries within individual panels so they adapt to their actual rendered size.

## See also

- [Container queries](/docs/styling/container-queries): Full query syntax, container sizing modes, and restrictions.
- [How to: Build responsive layouts](/docs/how-to/responsive-layout-how-to): Step-by-step recipes for common responsive patterns.
- [Layout](/docs/layout/layout): How the Avalonia measure and arrange system works.
- [Choosing a layout panel](/docs/layout/choosing-a-layout-panel): Picking the right panel for your scenario.
- [`OnFormFactorExtension` API reference](/api/avalonia/markup/xaml/markupextensions/onformfactorextension)
- [`OnPlatformExtension` API reference](/api/avalonia/markup/xaml/markupextensions/onplatformextension)
