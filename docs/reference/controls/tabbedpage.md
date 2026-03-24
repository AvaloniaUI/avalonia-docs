---
title: TabbedPage
description: REFERENCE - Built-in Controls
---

import TabbedPageBottomScreenshot from '/img/reference/controls/tabbedpage/tabbedpage-bottom.png';
import TabbedPageIconsScreenshot from '/img/reference/controls/tabbedpage/tabbedpage-icons.png';
import TabbedPageTopScreenshot from '/img/reference/controls/tabbedpage/tabbedpage-top.png';
import TabbedPageLeftScreenshot from '/img/reference/controls/tabbedpage/tabbedpage-left.png';
import TabbedPageRightScreenshot from '/img/reference/controls/tabbedpage/tabbedpage-right.png';
import TabbedPageInDrawerPageScreenshot from '/img/reference/controls/tabbedpage/tabbedpage-in-drawerpage.png';

# TabbedPage

`TabbedPage` displays a collection of pages through a tab strip. Each child `Page` becomes one tab. The tab header is built from the page's `Header` property for the label and its `Icon` property for the icon. The tab strip position adapts to the target platform by default.

`TabbedPage` extends `SelectingMultiPage`, which extends `MultiPage`. This inheritance chain provides the `Pages` collection, `ItemsSource`, `PageTemplate`, `SelectedIndex`, `SelectedPage`, `CurrentPage`, and the `SelectionChanged`, `PagesChanged`, and `CurrentPageChanged` events.

## Useful Properties

You will probably use these properties most often:

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `Pages` | `IEnumerable<Page>?` | `null` | The collection of child pages. This is the XAML content property. Supports any `IEnumerable<Page>`, including observable collections. |
| `ItemsSource` | `IEnumerable?` | `null` | View-model collection. When set, takes precedence over `Pages` as the item source. Use together with `PageTemplate` to convert each item into a `Page`. |
| `PageTemplate` | `IDataTemplate?` | `null` | Data template used to generate `Page` instances when the source contains data objects rather than pages directly. |
| `TabPlacement` | `TabPlacement` | `Auto` | Position of the tab strip. See the `TabPlacement` values table below. |
| `IsKeyboardNavigationEnabled` | `bool` | `true` | Enables arrow keys and Ctrl+Tab, Ctrl+Shift+Tab to switch tabs. |
| `IsGestureEnabled` | `bool` | `false` | Enables swipe gestures to switch tabs. Off by default. |
| `PageTransition` | `IPageTransition?` | `null` | Transition animation played when switching between tabs. |
| `IndicatorTemplate` | `IDataTemplate?` | `null` | Data template used to render the selection indicator on each tab item. |
| `SelectedIndex` | `int` | `-1` | Zero-based index of the currently selected tab. |
| `SelectedPage` | `Page?` | `null` | Read-only. The currently selected page. |

## TabPlacement Values

| Value | Description |
| ----- | ----------- |
| `Auto` | Platform-adaptive. Resolves to `Bottom` on Android and iOS, and `Top` on all other platforms. |
| `Top` | Tab strip at the top of the content area. |
| `Bottom` | Tab strip at the bottom of the content area. |
| `Left` | Tab strip along the left side of the content area. |
| `Right` | Tab strip along the right side of the content area. |

## Attached Property

Set on individual child `Page` instances to control tab enablement.

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `TabbedPage.IsTabEnabled` | `bool` | `true` | When `false`, the tab is visually disabled and is skipped during keyboard and swipe navigation. If the currently selected tab is disabled, selection moves automatically to the nearest enabled tab. |

## Tab Icons

The `Icon` property on each child `Page` controls the icon in the tab header. `TabbedPage` passes `Icon` and `IconTemplate` from the page to the underlying `TabItem`, so the standard `Content`/`ContentTemplate` rendering applies.

When no `IconTemplate` is set, the default handling accepts these values:

- `Geometry`: rendered as a path shape.
- `PathIcon`: used directly as a one-to-one control mapping.
- `DrawingImage` with a `GeometryDrawing`: the geometry is extracted.
- `string`: parsed as an SVG path geometry string.
- `IImage`: rendered as a bitmap image.

Alternatively, set `IconTemplate` on the page to control how any icon data is rendered:

```xml
<ContentPage Header="Home">
    <ContentPage.Icon>
        <StreamGeometry>M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z</StreamGeometry>
    </ContentPage.Icon>
    <ContentPage.IconTemplate>
        <DataTemplate DataType="Geometry">
            <PathIcon Data="{Binding}" Width="20" Height="20" />
        </DataTemplate>
    </ContentPage.IconTemplate>
    <!-- content -->
</ContentPage>
```

## Events

| Event | Description |
| ----- | ----------- |
| `SelectionChanged` | Raised when the selected tab changes. Provides `PreviousPage` and `CurrentPage`. |
| `CurrentPageChanged` | Raised when `CurrentPage` changes. |
| `PagesChanged` | Raised when the `Pages` collection changes. |

Navigation lifecycle events (`NavigatedTo`, `Navigating`, `NavigatedFrom`) fire on each child `Page` as the active tab changes.

## Keyboard Navigation

When `IsKeyboardNavigationEnabled` is `true`:

- Horizontal tabs (Top, Bottom): left and right arrow keys switch tabs. RTL layouts reverse the direction.
- Vertical tabs (Left, Right): up and down arrow keys switch tabs.
- `Ctrl+Tab` moves to the next enabled tab. `Ctrl+Shift+Tab` moves to the previous.

Disabled tabs (via `IsTabEnabled = false`) are always skipped.

## Example

### Basic TabbedPage in XAML

```xml
<TabbedPage xmlns="https://github.com/avaloniaui"
            xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
            x:Class="MyApp.MainTabs">

    <ContentPage Header="Home">
        <TextBlock Text="Home content"
                   VerticalAlignment="Center"
                   HorizontalAlignment="Center" />
    </ContentPage>

    <ContentPage Header="Profile">
        <TextBlock Text="Profile content"
                   VerticalAlignment="Center"
                   HorizontalAlignment="Center" />
    </ContentPage>

    <ContentPage Header="Settings">
        <TextBlock Text="Settings content"
                   VerticalAlignment="Center"
                   HorizontalAlignment="Center" />
    </ContentPage>

</TabbedPage>
```

### TabbedPage in Code

```csharp
var tabbedPage = new TabbedPage
{
    TabPlacement = TabPlacement.Bottom,
    Pages = new AvaloniaList<Page>
    {
        new ContentPage { Header = "Home",     Content = homeView },
        new ContentPage { Header = "Profile",  Content = profileView },
        new ContentPage { Header = "Settings", Content = settingsView }
    }
};

window.Page = tabbedPage;
```

<img src={TabbedPageBottomScreenshot} alt="" />

### Tab Icons

Set the `Icon` property on each child page:

```xml
<ContentPage Header="Home">
    <ContentPage.Icon>
        <StreamGeometry>M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z</StreamGeometry>
    </ContentPage.Icon>
    <!-- content -->
</ContentPage>

<ContentPage Header="Profile">
    <ContentPage.Icon>
        <StreamGeometry>M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z</StreamGeometry>
    </ContentPage.Icon>
    <!-- content -->
</ContentPage>
```

```csharp
var homePage = new ContentPage
{
    Header = "Home",
    Icon   = Geometry.Parse("M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"),
    Content = homeView
};
```

<img src={TabbedPageIconsScreenshot} alt="" />

### Controlling TabPlacement

```csharp
// Explicit bottom tabs (default on mobile)
tabbedPage.TabPlacement = TabPlacement.Bottom;

// Sidebar tabs on desktop
tabbedPage.TabPlacement = TabPlacement.Left;
```

In XAML:

```xml
<TabbedPage TabPlacement="Left">
    <!-- pages -->
</TabbedPage>
```

<img src={TabbedPageTopScreenshot} alt="" />

<img src={TabbedPageLeftScreenshot} alt="" />

<img src={TabbedPageRightScreenshot} alt="" />

### Dynamic Tab Management

Add and remove pages at runtime. The tab strip updates automatically:

```csharp
var pages = new AvaloniaList<Page>();
tabbedPage.Pages = pages;

// Add a tab
pages.Add(new ContentPage
{
    Header  = "Reports",
    Content = new ReportsView()
});

// Remove a tab
if (pages.Count > 1)
    pages.RemoveAt(pages.Count - 1);
```

### Enabling Swipe Gestures

```csharp
tabbedPage.IsGestureEnabled = true;
```

Swipe left or right on horizontal tab strips. Swipe up or down on vertical tab strips.

### Disabling a Tab

```csharp
TabbedPage.SetIsTabEnabled(settingsPage, false);
```

In XAML:

```xml
<ContentPage TabbedPage.IsTabEnabled="False" Header="Settings">
    <!-- ... -->
</ContentPage>
```

A disabled tab is skipped during keyboard and swipe navigation. If it is currently selected when disabled, selection moves to the nearest enabled tab automatically.

### Responding to Selection Changes

```csharp
tabbedPage.SelectionChanged += (sender, e) =>
{
    Console.WriteLine($"Switched from {e.PreviousPage?.Header} to {e.CurrentPage?.Header}");
};
```

Use the navigation lifecycle events on child pages to react when a tab becomes active:

```csharp
public partial class ProfilePage : ContentPage
{
    protected override void OnNavigatedTo(NavigatedToEventArgs args)
    {
        base.OnNavigatedTo(args);
        // This tab is now active, refresh data.
        _ = LoadProfileAsync();
    }
}
```

### Programmatic Tab Selection

```csharp
// Select by index
tabbedPage.SelectedIndex = 2;
```

### Independent Navigation Stack per Tab

Each tab can host its own `NavigationPage` to maintain an independent navigation stack. Navigation inside one tab does not affect the other tabs. There is no special integration between `TabbedPage` and `NavigationPage`: `TabbedPage` treats a `NavigationPage` child the same as any other `Page`, reading its `Header` and `Icon` for the tab strip.

```xml
<TabbedPage xmlns="https://github.com/avaloniaui"
            xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
            x:Class="MyApp.MainShell">

    <!-- Home tab: full navigation stack -->
    <NavigationPage Header="Home">
        <local:HomeRootPage />
    </NavigationPage>

    <!-- Explore tab: independent stack -->
    <NavigationPage Header="Explore">
        <local:ExploreRootPage />
    </NavigationPage>

    <!-- Profile tab: single page, no nav stack needed -->
    <ContentPage Header="Profile">
        <local:ProfileView />
    </ContentPage>

</TabbedPage>
```

```csharp
// Navigate within a specific tab's stack from that tab's ContentPage:
private async void OnItemClick(object? sender, RoutedEventArgs e)
{
    await Navigation.PushAsync(new ItemDetailPage());
}
```

Each `NavigationPage` maintains its own back stack independently. Switching tabs does not reset the stack.

### Data-Driven Tabs with ItemsSource

Bind a view-model collection to `ItemsSource` and use `PageTemplate` to generate the pages:

```xml
<TabbedPage xmlns="https://github.com/avaloniaui"
            xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
            xmlns:vm="clr-namespace:MyApp.ViewModels"
            x:Class="MyApp.MainTabs"
            ItemsSource="{Binding Sections}">

    <TabbedPage.PageTemplate>
        <DataTemplate x:DataType="vm:SectionViewModel">
            <ContentPage Header="{Binding Title}">
                <TextBlock Text="{Binding Description}"
                           VerticalAlignment="Center"
                           HorizontalAlignment="Center" />
            </ContentPage>
        </DataTemplate>
    </TabbedPage.PageTemplate>

</TabbedPage>
```

### TabbedPage Inside a DrawerPage

Combine a drawer navigation menu with tabbed content in the detail area:

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
            x:Class="MyApp.Shell">

    <DrawerPage.Drawer>
        <ContentPage Header="Menu">
            <StackPanel Margin="12" Spacing="8">
                <Button Content="Dashboard" Click="OnDashboardClick" />
                <Button Content="Reports"   Click="OnReportsClick" />
            </StackPanel>
        </ContentPage>
    </DrawerPage.Drawer>

    <TabbedPage>
        <ContentPage Header="Overview">
            <local:OverviewView />
        </ContentPage>
        <ContentPage Header="Analytics">
            <local:AnalyticsView />
        </ContentPage>
    </TabbedPage>

</DrawerPage>
```

<img src={TabbedPageInDrawerPageScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_TabbedPage).
:::

:::info
View the source code on _GitHub_ [`TabbedPage.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Page/TabbedPage.cs)
:::
