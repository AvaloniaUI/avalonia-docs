---
id: responsive-layout-how-to
title: "How To: Build Responsive Layouts"
---

This guide covers techniques for creating Avalonia layouts that adapt to different window sizes and form factors.

## Adaptive Grid Columns

Use `OnFormFactor` to change layout based on device type:

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

## Container Queries

Avalonia supports container queries, which adapt layout based on the control's own size rather than the window size:

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

See [Container Queries](/docs/styling/container-queries) for the full syntax.

## Breakpoint-Based Layout

Implement breakpoints by observing the window width:

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

```csharp
// In MainWindow code-behind
protected override void OnSizeChanged(SizeChangedEventArgs e)
{
    base.OnSizeChanged(e);
    if (DataContext is MainViewModel vm)
        vm.UpdateLayout(e.NewSize.Width);
}
```

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

## SplitView for Collapsible Sidebar

`SplitView` provides a built-in collapsible pane pattern:

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

## Responsive Card Grid

Use `WrapPanel` or `UniformGridLayout` for cards that reflow:

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

The `UniformGridLayout` automatically adjusts the number of columns based on available width.

## Platform-Specific Spacing

Adjust spacing and padding for different platforms:

```xml
<StackPanel Spacing="{OnFormFactor Desktop=8, Mobile=12}"
            Margin="{OnFormFactor Desktop='16', Mobile='8'}">
    <TextBlock Text="Content" FontSize="{OnFormFactor Desktop=14, Mobile=16}" />
</StackPanel>
```

## Adaptive Font Sizes

Scale text based on the container or window:

```xml
<Style Selector="TextBlock.title">
    <Setter Property="FontSize" Value="24" />
</Style>

<!-- Smaller title on narrow containers -->
<Style Selector="Panel[Width<500] TextBlock.title">
    <Setter Property="FontSize" Value="18" />
</Style>
```

## See Also

- [Container Queries](/docs/styling/container-queries): Responsive styling based on container size.
- [Layout](/docs/layout/layout): Avalonia layout system overview.
- [Grid How-To](/docs/how-to/grid-how-to): Grid layout patterns.
- [Cross-Platform Architecture](/docs/fundamentals/cross-platform-architecture): Platform detection and branching.
