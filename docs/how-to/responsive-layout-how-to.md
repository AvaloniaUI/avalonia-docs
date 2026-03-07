---
id: responsive-layout-how-to
title: "How to: Build responsive layouts"
description: Create Avalonia layouts that adapt to different window sizes and form factors.
doc-type: how-to
---

This guide covers techniques for creating layouts that adapt to different window sizes and form factors. You will learn how to use form-factor markup extensions, container queries, breakpoint-driven view models, and reflowing item layouts to build UIs that work across desktop and mobile.

## Adaptive grid columns

Use the `OnFormFactor` markup extension to change your layout structure based on the device type. In the following example, a two-column grid with a sidebar appears on desktop while mobile users see a single-column layout:

```xml
<Grid ColumnDefinitions="{OnFormFactor Desktop='250,*', Mobile='*'}">
    <Border Grid.Column="0" Background="#F3F4F6"
            IsVisible="{OnFormFactor Desktop=True, Mobile=False}">
        <!-- Sidebar: visible on desktop, hidden on mobile -->
        <ListBox ItemsSource="{Binding MenuItems}" />
    </Border>

    <ContentControl Grid.Column="{OnFormFactor Desktop=1, Mobile=0}"
                    Content="{Binding CurrentPage}" />
</Grid>
```

`OnFormFactor` resolves at startup, so the value does not change if you resize the window at runtime. If you need your layout to respond to live size changes, use container queries or a breakpoint-based approach instead.

## Container queries

Container queries adapt layout based on a control's own rendered size rather than the window size. This makes them ideal for reusable components that may appear in panels of varying width.

The following example switches a `StackPanel` between vertical and horizontal orientation depending on the width of its parent `Border`:

```xml
<Border>
    <Border.Styles>
        <!-- Vertical layout when container is narrow -->
        <Style Selector="Border[Width<400] > StackPanel">
            <Setter Property="Orientation" Value="Vertical" />
        </Style>
        <!-- Horizontal layout when container is wide -->
        <Style Selector="Border[Width>=400] > StackPanel">
            <Setter Property="Orientation" Value="Horizontal" />
        </Style>
    </Border.Styles>

    <StackPanel Spacing="8">
        <TextBlock Text="Label" />
        <TextBox Text="{Binding Value}" />
    </StackPanel>
</Border>
```

See [Container queries](/docs/styling/container-queries) for the full syntax and named-container support.

## Breakpoint-based layout

When you need fine-grained control over layout transitions, you can implement breakpoints by observing the window width in your view model. Define boolean properties for each breakpoint tier, then bind your XAML to them:

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

Call `UpdateLayout` from the window's `OnSizeChanged` override so that your properties stay in sync as the user resizes:

```csharp
// In MainWindow code-behind
protected override void OnSizeChanged(SizeChangedEventArgs e)
{
    base.OnSizeChanged(e);
    if (DataContext is MainViewModel vm)
        vm.UpdateLayout(e.NewSize.Width);
}
```

In your AXAML, swap between compact and wide views by binding `IsVisible` to the breakpoint properties:

```xml
<Grid>
    <!-- Compact layout: single column -->
    <StackPanel IsVisible="{Binding IsCompact}" Spacing="8">
        <views:SidebarView />
        <views:ContentView />
    </StackPanel>

    <!-- Wide layout: two columns -->
    <Grid IsVisible="{Binding !IsCompact}" ColumnDefinitions="280,*">
        <views:SidebarView Grid.Column="0" />
        <views:ContentView Grid.Column="1" />
    </Grid>
</Grid>
```

This approach gives you full programmatic control and works well when your layout logic involves more than simple width thresholds (for example, combining orientation and platform checks).

## Use `SplitView` for a collapsible sidebar

The `SplitView` control provides a built-in collapsible pane pattern. Set `DisplayMode` to `CompactInline` so the pane collapses to a narrow strip showing icons, then expands to reveal labels when you toggle `IsPaneOpen`:

```xml
<SplitView IsPaneOpen="{Binding IsSidebarOpen}"
           DisplayMode="CompactInline"
           CompactPaneLength="48"
           OpenPaneLength="250">
    <SplitView.Pane>
        <StackPanel>
            <Button Content="☰" Command="{Binding ToggleSidebarCommand}"
                    HorizontalAlignment="Left" Width="48" />
            <ListBox ItemsSource="{Binding MenuItems}"
                     SelectedItem="{Binding SelectedMenuItem}">
                <ListBox.ItemTemplate>
                    <DataTemplate>
                        <StackPanel Orientation="Horizontal" Spacing="12">
                            <PathIcon Data="{Binding Icon}" Width="16" />
                            <TextBlock Text="{Binding Title}" />
                        </StackPanel>
                    </DataTemplate>
                </ListBox.ItemTemplate>
            </ListBox>
        </StackPanel>
    </SplitView.Pane>

    <SplitView.Content>
        <ContentControl Content="{Binding CurrentPage}" />
    </SplitView.Content>
</SplitView>
```

You can bind `IsPaneOpen` to your breakpoint properties so the sidebar opens automatically on wide screens and collapses on narrow ones.

## Responsive card grid

Use `ItemsRepeater` with a `UniformGridLayout` to create a card grid that reflows as the available width changes. Set `MinItemWidth` and `MinItemHeight` to define the smallest card size, and `UniformGridLayout` calculates the column count for you:

```xml
<ScrollViewer>
    <ItemsRepeater ItemsSource="{Binding Cards}">
        <ItemsRepeater.Layout>
            <UniformGridLayout MinItemWidth="280" MinItemHeight="200"
                               MinColumnSpacing="12" MinRowSpacing="12" />
        </ItemsRepeater.Layout>
        <ItemsRepeater.ItemTemplate>
            <DataTemplate>
                <Border Background="White" CornerRadius="8" Padding="16"
                        BorderBrush="#E5E7EB" BorderThickness="1">
                    <StackPanel Spacing="8">
                        <TextBlock Text="{Binding Title}" FontWeight="Bold" />
                        <TextBlock Text="{Binding Description}"
                                   TextWrapping="Wrap" Foreground="Gray" />
                    </StackPanel>
                </Border>
            </DataTemplate>
        </ItemsRepeater.ItemTemplate>
    </ItemsRepeater>
</ScrollViewer>
```

If you need a simpler reflowing container without virtualization, you can use `WrapPanel` instead.

## Platform-specific spacing

Use `OnFormFactor` to adjust spacing, margins, and font sizes per platform. Mobile interfaces typically benefit from larger touch targets and slightly larger text:

```xml
<StackPanel Spacing="{OnFormFactor Desktop=8, Mobile=12}"
            Margin="{OnFormFactor Desktop='16', Mobile='8'}">
    <TextBlock Text="Content" FontSize="{OnFormFactor Desktop=14, Mobile=16}" />
</StackPanel>
```

## Adaptive font sizes

Use [container queries](/docs/styling/container-queries) to scale text based on the size of an ancestor. Declare a container on the parent element with `Container.Name` and `Container.Sizing`, then apply a `ContainerQuery` to set different font sizes at different widths:

```xml
<Panel Container.Name="content" Container.Sizing="Width">
    <Panel.Styles>
        <Style Selector="TextBlock.title">
            <Setter Property="FontSize" Value="24" />
        </Style>

        <!-- Smaller title when the container is narrow -->
        <ContainerQuery Name="content" Query="max-width:500">
            <Style Selector="TextBlock.title">
                <Setter Property="FontSize" Value="18" />
            </Style>
        </ContainerQuery>
    </Panel.Styles>

    <TextBlock Classes="title" Text="Responsive heading" />
</Panel>
```

This technique keeps your typography responsive without relying on window-level breakpoints, so the text adapts correctly even when your control is hosted inside a split pane or dialog.

## See also

- [Container queries](/docs/styling/container-queries): Responsive styling based on container size.
- [Layout](/docs/layout/layout): Avalonia layout system overview.
- [Grid how-to](/docs/how-to/grid-how-to): Grid layout patterns.
- [Cross-platform architecture](/docs/fundamentals/cross-platform-architecture): Platform detection and branching.
