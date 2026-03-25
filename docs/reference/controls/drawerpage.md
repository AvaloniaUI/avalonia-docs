---
title: DrawerPage
description: REFERENCE - Built-in Controls
---

import DrawerPageClosedScreenshot from '/img/reference/controls/drawerpage/drawerpage-closed.png';
import DrawerPageOpenScreenshot from '/img/reference/controls/drawerpage/drawerpage-open.png';
import DrawerPageHeaderFooterScreenshot from '/img/reference/controls/drawerpage/drawerpage-header-footer.png';
import DrawerPageCompactCollapsedScreenshot from '/img/reference/controls/drawerpage/drawerpage-compact-collapsed.png';
import DrawerPageCompactExpandedScreenshot from '/img/reference/controls/drawerpage/drawerpage-compact-expanded.png';
import DrawerPageSplitScreenshot from '/img/reference/controls/drawerpage/drawerpage-split.png';
import DrawerPageRightScreenshot from '/img/reference/controls/drawerpage/drawerpage-right.png';
import DrawerPageRtlScreenshot from '/img/reference/controls/drawerpage/drawerpage-rtl.png';

# DrawerPage

`DrawerPage` is a page that combines a sliding drawer pane with a main content area. The drawer can open as a flyout overlay, sit permanently alongside the content as a split sidebar, or render as a compact navigation rail. The drawer pane can appear from any edge of the screen and supports swipe gestures, keyboard shortcuts, and a backdrop scrim.

`DrawerPage` is built on top of `SplitView` internally. The `DrawerBehavior` and `DrawerLayoutBehavior` properties control which `SplitViewDisplayMode` is applied.

## Useful Properties

You will probably use these properties most often:

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `Content` | `object?` | `null` | The main content area. This is the XAML content property. Accepts a `Page` or any view. |
| `ContentTemplate` | `IDataTemplate?` | built-in | Data template used to display `Content` when it is a data object. |
| `Drawer` | `object?` | `null` | The drawer pane content. Accepts a `Page` or any view. |
| `DrawerTemplate` | `IDataTemplate?` | `null` | Data template used to display `Drawer` when it is a data object. |
| `IsOpen` | `bool` | `false` | Whether the drawer pane is currently open. Bindable. Setting it to `true` when `DrawerBehavior` is `Disabled` is a no-op, and setting it to `false` when `DrawerBehavior` is `Locked` is a no-op. |
| `DrawerLength` | `double` | `320` | Width, or height for top and bottom placement, of the drawer pane when fully open. |
| `CompactDrawerLength` | `double` | `48` | Width, or height for `Top` and `Bottom` placement, of the visible compact rail strip in `CompactOverlay` and `CompactInline` layout modes. |
| `DrawerBreakpointLength` | `double` | `0` | Responsive breakpoint. When greater than `0` and the page width drops below this value, the layout switches to `Overlay` automatically regardless of `DrawerLayoutBehavior`. Applies to `Left` and `Right` placement only. Set to `0` to disable responsive switching. |
| `IsGestureEnabled` | `bool` | `true` | Enables swipe gestures to open and close the drawer. |
| `DrawerBehavior` | `DrawerBehavior` | `Auto` | Controls the open and close behavior. See the `DrawerBehavior` values table below. |
| `DrawerLayoutBehavior` | `DrawerLayoutBehavior` | `Overlay` | Controls the layout mode when `DrawerBehavior` is `Auto`. See the `DrawerLayoutBehavior` values table below. |
| `DrawerPlacement` | `DrawerPlacement` | `Left` | Which edge the drawer slides in from. See the `DrawerPlacement` values table below. |
| `DrawerHeader` | `object?` | `null` | Content rendered at the top of the drawer pane, above the main drawer content. |
| `DrawerFooter` | `object?` | `null` | Content rendered at the bottom of the drawer pane, below the main drawer content. |
| `DrawerIcon` | `object?` | `null` | Icon data displayed in the drawer toggle button. Use together with `DrawerIconTemplate` to control rendering. When no template is provided, the default template handles `Geometry`, `PathIcon`, `IImage`, and SVG path strings. |
| `DrawerIconTemplate` | `IDataTemplate?` | `null` | Data template used to render the `DrawerIcon` in each icon presenter slot. Each presenter independently materializes its own visual from this template. |
| `DrawerBackground` | `IBrush?` | `null` | Background brush of the drawer pane. |
| `DrawerHeaderBackground` | `IBrush?` | `null` | Background brush of the drawer header area. |
| `DrawerHeaderForeground` | `IBrush?` | `null` | Foreground brush of the drawer header area. |
| `DrawerFooterBackground` | `IBrush?` | `null` | Background brush of the drawer footer area. |
| `DrawerFooterForeground` | `IBrush?` | `null` | Foreground brush of the drawer footer area. |
| `BackdropBrush` | `IBrush?` | `null` | Brush rendered over the content area while the drawer is open in overlay mode. A semi-transparent brush creates a scrim effect. Hidden when `null`. |
| `DisplayMode` | `SplitViewDisplayMode` | computed | Computed. The resolved display mode currently applied to the internal `SplitView`. Managed automatically by `DrawerBehavior`, `DrawerLayoutBehavior`, and `DrawerBreakpointLength`. |
| `HorizontalContentAlignment` | `HorizontalAlignment` | `Stretch` | Horizontal alignment of the main content. |
| `VerticalContentAlignment` | `VerticalAlignment` | `Stretch` | Vertical alignment of the main content. |

## DrawerBehavior Values

| Value | Description |
| ----- | ----------- |
| `Auto` | Default. Uses `DrawerLayoutBehavior` to determine the display mode. Respects `DrawerBreakpointLength` for responsive switching. |
| `Flyout` | Always opens as an overlay, ignoring `DrawerLayoutBehavior`. |
| `Locked` | Always open. Cannot be closed by the user or by setting `IsOpen = false`. |
| `Disabled` | Always closed. The drawer toggle is hidden and gestures are blocked. Setting `IsOpen = true` is a no-op. |

## DrawerLayoutBehavior Values

Applies when `DrawerBehavior` is `Auto`.

| Value | Description |
| ----- | ----------- |
| `Overlay` | Default. The drawer slides over the content area as a flyout. |
| `Split` | The drawer and content are shown side by side at all times. |
| `CompactOverlay` | A narrow rail of `CompactDrawerLength` size is always visible. Opening expands the drawer as an overlay. |
| `CompactInline` | A narrow rail is always visible. Opening expands the drawer and pushes the content aside. |

## DrawerPlacement Values

| Value | Description |
| ----- | ----------- |
| `Left` | Default. Drawer slides in from the left edge. |
| `Right` | Drawer slides in from the right edge. |
| `Top` | Drawer slides down from the top edge. |
| `Bottom` | Drawer slides up from the bottom edge. |

## Events

| Event | Args type | Description |
| ----- | --------- | ----------- |
| `Opened` | `RoutedEventArgs` | Bubbling routed event raised when the drawer transitions to open. |
| `Closing` | `DrawerClosingEventArgs` | Bubbling routed event raised just before the drawer closes. Set `args.Cancel = true` to prevent closing. |
| `Closed` | `RoutedEventArgs` | Bubbling routed event raised after the drawer has closed, if closing was not cancelled. |

## Gestures and Keyboard

- Swipe to open: Swipe inward from the edge zone (20 px by default) to open the drawer. In compact modes the swipe zone is the compact rail strip.
- Swipe to close: Swipe away from the drawer while it is open.
- Escape key: Closes an overlay or compact-overlay drawer. Does not apply when `DrawerBehavior` is `Locked`.
- System back button: Closes the drawer when it is open and not in `Locked` or `Disabled` mode.
- Backdrop tap: Tapping the backdrop, when `BackdropBrush` is set, closes the drawer.

## NavigationPage Integration

When `Content` is a `NavigationPage`, `DrawerPage` automatically:

- Hides its own top bar and defers header rendering to the `NavigationPage` navigation bar.
- Shows a hamburger toggle button in the navigation bar at the root of the `NavigationPage` stack.
- Hides the hamburger button when the user navigates deeper into the stack, where the back button takes its place.

## Example

### Basic DrawerPage in XAML

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
            x:Class="MyApp.Shell">

    <DrawerPage.Drawer>
        <ContentPage Header="Menu">
            <StackPanel Spacing="8" Margin="12">
                <Button Content="Home"     Click="OnHomeClick" />
                <Button Content="Profile"  Click="OnProfileClick" />
                <Button Content="Settings" Click="OnSettingsClick" />
            </StackPanel>
        </ContentPage>
    </DrawerPage.Drawer>

    <NavigationPage>
        <local:HomePage />
    </NavigationPage>

</DrawerPage>
```

### Basic DrawerPage in Code

```csharp
var drawerPage = new DrawerPage
{
    Drawer = new ContentPage
    {
        Header = "Menu",
        Content = new StackPanel
        {
            Children =
            {
                new Button { Content = "Home" },
                new Button { Content = "Settings" }
            }
        }
    },
    Content = new NavigationPage { Content = new HomePage() }
};

window.Page = drawerPage;
```

<img src={DrawerPageClosedScreenshot} alt="" />

<img src={DrawerPageOpenScreenshot} alt="" />

### Toggling the Drawer

```csharp
// Open
drawerPage.IsOpen = true;

// Close
drawerPage.IsOpen = false;

// Toggle
drawerPage.IsOpen = !drawerPage.IsOpen;
```

From XAML using a button binding:

```xml
<Button Content="Toggle Menu"
        Command="{Binding ToggleDrawerCommand}" />
```

```csharp
// In the view-model
[RelayCommand]
private void ToggleDrawer() => IsDrawerOpen = !IsDrawerOpen;
```

### Navigating from the Drawer Menu

Close the drawer after the user taps a menu item:

```csharp
private void OnHomeClick(object? sender, RoutedEventArgs e)
{
    if (Content is NavigationPage nav)
        _ = nav.PopToRootAsync();

    IsOpen = false;
}

private void OnProfileClick(object? sender, RoutedEventArgs e)
{
    if (Content is NavigationPage nav)
        _ = nav.PushAsync(new ProfilePage());

    IsOpen = false;
}
```

### Drawer with Header and Footer

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
            x:Class="MyApp.Shell"
            DrawerLength="280">

    <DrawerPage.Drawer>
        <ContentPage Header="Navigation">
        </ContentPage>
    </DrawerPage.Drawer>

    <DrawerPage.DrawerHeader>
        <Border Background="#1E3A5F" Padding="16">
            <StackPanel>
                <TextBlock Text="My App"
                           Foreground="White"
                           FontSize="20"
                           FontWeight="SemiBold" />
                <TextBlock Text="user@example.com"
                           Foreground="#AAD4F5"
                           FontSize="13" />
            </StackPanel>
        </Border>
    </DrawerPage.DrawerHeader>

    <DrawerPage.DrawerFooter>
        <Border Padding="12">
            <Button Content="Sign Out"
                    Click="OnSignOutClick"
                    HorizontalAlignment="Stretch" />
        </Border>
    </DrawerPage.DrawerFooter>

    <NavigationPage>
        <local:HomePage />
    </NavigationPage>

</DrawerPage>
```

<img src={DrawerPageHeaderFooterScreenshot} alt="" />

### Persistent Sidebar (Split Layout)

The drawer stays permanently open next to the content. No toggle or gesture is needed.

```csharp
var drawerPage = new DrawerPage
{
    DrawerLayoutBehavior = DrawerLayoutBehavior.Split,
    DrawerLength = 240,
    Drawer = sidebarPage,
    Content = new NavigationPage { Content = new HomePage() }
};
```

<img src={DrawerPageSplitScreenshot} alt="" />

### Compact Navigation Rail

A narrow icon strip is always visible. Tapping or swiping it opens the full drawer. In `CompactInline` mode, the content is pushed aside when expanded. In `CompactOverlay` mode, the expanded drawer overlays the content instead.

```xml
<DrawerPage DrawerLayoutBehavior="CompactInline"
            CompactDrawerLength="56"
            DrawerLength="240">

    <DrawerPage.Drawer>
        <StackPanel Spacing="2" Margin="0,8">
            <Button HorizontalAlignment="Stretch" Background="Transparent"
                    ToolTip.Tip="Home">
                <StackPanel HorizontalAlignment="Center" Spacing="3">
                    <PathIcon Width="20" Height="20"
                              Data="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                    <TextBlock Text="Home" FontSize="9" HorizontalAlignment="Center" />
                </StackPanel>
            </Button>
            <Button HorizontalAlignment="Stretch" Background="Transparent"
                    ToolTip.Tip="Profile">
                <StackPanel HorizontalAlignment="Center" Spacing="3">
                    <PathIcon Width="20" Height="20"
                              Data="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                    <TextBlock Text="Profile" FontSize="9" HorizontalAlignment="Center" />
                </StackPanel>
            </Button>
        </StackPanel>
    </DrawerPage.Drawer>

    <NavigationPage>
        <local:HomePage />
    </NavigationPage>

</DrawerPage>
```

```csharp
var drawerPage = new DrawerPage
{
    DrawerLayoutBehavior = DrawerLayoutBehavior.CompactInline,
    CompactDrawerLength = 56,
    DrawerLength = 240,
    Drawer = navRailPage,
    Content = new NavigationPage { Content = new HomePage() }
};
```

<img src={DrawerPageCompactCollapsedScreenshot} alt="" />

<img src={DrawerPageCompactExpandedScreenshot} alt="" />

### Responsive Layout with DrawerBreakpointLength

Switch automatically between a split sidebar on wide windows and an overlay flyout on narrow windows. When the page width drops below the breakpoint the drawer closes and switches to `Overlay`. When the width grows back above it, the configured layout is restored and the drawer opens automatically.

This applies to `Left` and `Right` placement only.

```xml
<DrawerPage DrawerLayoutBehavior="Split"
            DrawerBreakpointLength="720"
            DrawerLength="240">
    <!-- drawer and content -->
</DrawerPage>
```

```csharp
var drawerPage = new DrawerPage
{
    DrawerLayoutBehavior = DrawerLayoutBehavior.Split,
    DrawerBreakpointLength = 720, // overlay when width < 720 px, split when >= 720 px
    Drawer = menuPage,
    Content = mainPage
};
```

### RTL Support

`DrawerPlacement` is logical, not physical. When `FlowDirection` is `RightToLeft`, `Left` and `Right` placements are mirrored: `Left` appears on the right edge and `Right` appears on the left edge. Swipe gestures are mirrored automatically. This supports RTL locales such as Arabic and Hebrew without any extra code.

```xml
<DrawerPage FlowDirection="RightToLeft"
            DrawerPlacement="Left">
    <!-- drawer opens from the right edge in RTL -->
</DrawerPage>
```

<img src={DrawerPageRtlScreenshot} alt="" />

### Right-Side Drawer

Useful for filter panels, detail inspectors, or contextual sidebars:

```xml
<DrawerPage DrawerPlacement="Right"
            DrawerLength="300">

    <DrawerPage.Drawer>
        <ContentPage Header="Filters">
            <local:FilterPanel />
        </ContentPage>
    </DrawerPage.Drawer>

    <local:ResultsPage />

</DrawerPage>
```

<img src={DrawerPageRightScreenshot} alt="" />

### Backdrop Scrim

Add a semi-transparent overlay behind the drawer when in overlay mode:

```csharp
drawerPage.BackdropBrush = new SolidColorBrush(Colors.Black, opacity: 0.4);
```

Tapping the scrim closes the drawer automatically.

### Cancelling Close

Use the `Closing` event to prevent the drawer from closing, for example when there is unsaved work inside the drawer pane:

```csharp
drawerPage.Closing += (sender, e) =>
{
    if (HasUnsavedChanges)
        e.Cancel = true;
};
```

### Responding to Open and Close

```csharp
drawerPage.Opened += (sender, e) =>
{
    Console.WriteLine("Drawer opened");
};

drawerPage.Closed += (sender, e) =>
{
    Console.WriteLine("Drawer closed");
};
```

Alternatively, monitor `IsOpen` through a property changed handler:

```csharp
drawerPage.PropertyChanged += (sender, e) =>
{
    if (e.Property == DrawerPage.IsOpenProperty)
        Console.WriteLine($"IsOpen: {drawerPage.IsOpen}");
};
```

### MVVM Binding for IsOpen

```xml
<DrawerPage IsOpen="{Binding IsMenuOpen}"
            DrawerLayoutBehavior="Overlay">
    <!-- ... -->
</DrawerPage>
```

```csharp
// In the view-model:
[ObservableProperty]
private bool _isMenuOpen;
```

### Custom Drawer Icon

Set `DrawerIcon` to a `Geometry` value and provide a `DrawerIconTemplate` so each icon presenter independently materializes its own visual:

```xml
<DrawerPage>
    <DrawerPage.DrawerIcon>
        <StreamGeometry>M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z</StreamGeometry>
    </DrawerPage.DrawerIcon>
    <DrawerPage.DrawerIconTemplate>
        <DataTemplate DataType="Geometry">
            <PathIcon Data="{Binding}" />
        </DataTemplate>
    </DrawerPage.DrawerIconTemplate>
    <!-- ... -->
</DrawerPage>
```

Change the icon programmatically at runtime:

```csharp
drawerPage.DrawerIcon = Geometry.Parse("M4,8H8V4H4V8M10,20H14V16H10V20M4,20H8V16H4V20M4,14H8V10H4V14M10,14H14V10H10V14M16,4V8H20V4H16M10,8H14V4H10V8M16,14H20V10H16V14M16,20H20V16H16V20Z");
```

### Locked Drawer (Always Open)

```csharp
drawerPage.DrawerBehavior = DrawerBehavior.Locked;
// IsOpen is forced to true. The user cannot close it.
```

### Disabling the Drawer

```csharp
drawerPage.DrawerBehavior = DrawerBehavior.Disabled;
// The toggle is hidden. IsOpen stays false. Gestures are blocked.
```

### DrawerPage with a CrossFade Transition on the NavigationPage

```csharp
var navPage = new NavigationPage
{
    Content = new HomePage(),
    PageTransition = new CrossFade(TimeSpan.FromMilliseconds(250))
};

var drawerPage = new DrawerPage
{
    DrawerLayoutBehavior = DrawerLayoutBehavior.Overlay,
    DrawerLength = 280,
    Drawer = menuPage,
    Content = navPage
};
```

## More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_DrawerPage).
:::

:::info
View the source code on _GitHub_ [`DrawerPage.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Page/DrawerPage.cs)
:::
