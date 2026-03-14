---
id: tabbedpage
title: TabbedPage
---

import TabbedPageBottomScreenshot from '/img/controls/tabbedpage/tabbedpage-bottom.png';
import TabbedPageIconsScreenshot from '/img/controls/tabbedpage/tabbedpage-icons.png';
import TabbedPageTopScreenshot from '/img/controls/tabbedpage/tabbedpage-top.png';
import TabbedPageLeftScreenshot from '/img/controls/tabbedpage/tabbedpage-left.png';
import TabbedPageRightScreenshot from '/img/controls/tabbedpage/tabbedpage-right.png';
import TabbedPageInDrawerPageScreenshot from '/img/controls/tabbedpage/tabbedpage-in-drawerpage.png';

The [`TabbedPage`](/api/avalonia/controls/tabbedpage) displays a collection of pages through a tab strip, allowing users to switch between pages by selecting tabs. Each child page becomes a tab, with the tab header and icon derived from the page's `Header` and `Icon` properties.

`TabbedPage` inherits from `SelectingMultiPage`, which in turn inherits from `MultiPage`. This inheritance chain provides built-in selection tracking, page lifecycle management, and support for page transitions.

:::info
If you need a simple tab strip without page-based navigation features (lifecycle events, safe area handling), consider using the standard [TabControl](/controls/navigation/tabcontrol) instead.
:::

## Useful properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `Pages` | `IEnumerable` | `null` | The collection of [`Page`](/api/avalonia/controls/page) children displayed as tabs. |
| `PageTemplate` | `IDataTemplate` | `null` | A data template used to render page content when binding to non-Page items. |
| [`TabPlacement`](/api/avalonia/controls/tabplacement) | `Dock` | `Auto` | Controls where tabs are positioned. See the TabPlacement values table below. |
| `IsKeyboardNavigationEnabled` | `bool` | `true` | Allows tab switching with keyboard input. |
| `IsGestureEnabled` | `bool` | `false` | Enables swipe gestures to switch tabs. |
| `PageTransition` | `IPageTransition` | `null` | The transition animation used when switching between tabs. |
| `IndicatorTemplate` | `IDataTemplate` | `null` | A data template for the selected tab indicator. |
| `SelectedIndex` | `int` | `0` | The index of the currently selected tab. |
| `SelectedPage` | `Page` | `null` | Read-only. The currently selected `Page`. |

### TabPlacement values

| Value | Description |
| --- | --- |
| `Auto` | The platform determines the tab position. Bottom on mobile, top on desktop. |
| `Top` | Tabs are placed along the top edge. |
| `Bottom` | Tabs are placed along the bottom edge. |
| `Left` | Tabs are placed along the left edge. |
| `Right` | Tabs are placed along the right edge. |

### Attached properties

| Attached Property | Type | Default | Description |
| --- | --- | --- | --- |
| `TabbedPage.IsTabEnabled` | `bool` | `true` | Set on a child `Page` to enable or disable its tab. A disabled tab cannot be selected by the user. |

### Tab icons

The `Icon` property on a child page accepts the following value types:

- `StreamGeometry` path data
- `DrawingImage`
- `Bitmap` or other `IImage` implementations
- String paths resolved through an asset loader

## Events

| Event | Description |
| --- | --- |
| `SelectionChanged` | Raised when the selected tab changes. Provides `PreviousPage` and `CurrentPage`. |
| `CurrentPageChanged` | Raised when the current page changes. |
| `PagesChanged` | Raised when the `Pages` collection is modified (tabs added or removed). |

## Keyboard navigation

When `IsKeyboardNavigationEnabled` is `true` (the default), users can switch tabs using the keyboard. The exact key bindings depend on the `TabPlacement` value:

- **Top/Bottom tabs:** Left and Right arrow keys move between tabs.
- **Left/Right tabs:** Up and Down arrow keys move between tabs.

## Examples

### Basic tabbed layout (XAML)

```xml
<TabbedPage xmlns="https://github.com/avaloniaui">
    <ContentPage Header="Home" Icon="{StaticResource HomeIcon}">
        <TextBlock Text="Home content" Margin="16" />
    </ContentPage>
    <ContentPage Header="Search" Icon="{StaticResource SearchIcon}">
        <TextBlock Text="Search content" Margin="16" />
    </ContentPage>
    <ContentPage Header="Profile" Icon="{StaticResource ProfileIcon}">
        <TextBlock Text="Profile content" Margin="16" />
    </ContentPage>
</TabbedPage>
```

<img src={TabbedPageTopScreenshot} alt="TabbedPage with top tabs" />

### Basic tabbed layout (code)

```csharp
var tabbedPage = new TabbedPage();

var homePage = new ContentPage
{
    Header = "Home",
    Content = new TextBlock { Text = "Home content", Margin = new Thickness(16) }
};

var searchPage = new ContentPage
{
    Header = "Search",
    Content = new TextBlock { Text = "Search content", Margin = new Thickness(16) }
};

var profilePage = new ContentPage
{
    Header = "Profile",
    Content = new TextBlock { Text = "Profile content", Margin = new Thickness(16) }
};

tabbedPage.Pages = new[] { homePage, searchPage, profilePage };
```

### Tab icons

You can assign icons to tabs using the `Icon` property on each child page. Icons appear alongside the tab header text.

```xml
<TabbedPage xmlns="https://github.com/avaloniaui"
            TabPlacement="Bottom">
    <ContentPage Header="Home">
        <ContentPage.Icon>
            <StreamGeometry>M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z</StreamGeometry>
        </ContentPage.Icon>
        <TextBlock Text="Home content" Margin="16" />
    </ContentPage>
    <ContentPage Header="Search">
        <ContentPage.Icon>
            <StreamGeometry>M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 ... Z</StreamGeometry>
        </ContentPage.Icon>
        <TextBlock Text="Search content" Margin="16" />
    </ContentPage>
</TabbedPage>
```

```csharp
var homePage = new ContentPage
{
    Header = "Home",
    Icon = StreamGeometry.Parse("M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"),
    Content = new TextBlock { Text = "Home content", Margin = new Thickness(16) }
};
```

<img src={TabbedPageIconsScreenshot} alt="TabbedPage with tab icons" />

### Controlling TabPlacement

Use the `TabPlacement` property to position tabs on different edges of the control.

```xml
<TabbedPage xmlns="https://github.com/avaloniaui"
            TabPlacement="Bottom">
    <ContentPage Header="Feed">
        <TextBlock Text="Feed content" Margin="16" />
    </ContentPage>
    <ContentPage Header="Messages">
        <TextBlock Text="Messages content" Margin="16" />
    </ContentPage>
</TabbedPage>
```

<img src={TabbedPageBottomScreenshot} alt="TabbedPage with bottom tabs" />

<img src={TabbedPageLeftScreenshot} alt="TabbedPage with left tabs" />

<img src={TabbedPageRightScreenshot} alt="TabbedPage with right tabs" />

### Dynamic tab management

You can add and remove tabs at runtime by modifying the `Pages` collection.

```csharp
// Add a new tab
var newPage = new ContentPage
{
    Header = "New Tab",
    Content = new TextBlock { Text = "Dynamically added tab", Margin = new Thickness(16) }
};
tabbedPage.Pages = tabbedPage.Pages.Append(newPage).ToList();

// Remove a tab
var pages = tabbedPage.Pages.ToList();
pages.Remove(newPage);
tabbedPage.Pages = pages;
```

### Enabling swipe gestures

Set `IsGestureEnabled` to `True` to allow users to swipe between tabs on touch devices.

```xml
<TabbedPage xmlns="https://github.com/avaloniaui"
            IsGestureEnabled="True"
            TabPlacement="Bottom">
    <ContentPage Header="Page 1">
        <TextBlock Text="Swipe left or right" Margin="16" />
    </ContentPage>
    <ContentPage Header="Page 2">
        <TextBlock Text="Page 2 content" Margin="16" />
    </ContentPage>
</TabbedPage>
```

### Disabling a tab

Use the `TabbedPage.IsTabEnabled` attached property to prevent a specific tab from being selected.

```xml
<TabbedPage xmlns="https://github.com/avaloniaui">
    <ContentPage Header="Active Tab">
        <TextBlock Text="This tab is enabled" Margin="16" />
    </ContentPage>
    <ContentPage Header="Locked Tab" TabbedPage.IsTabEnabled="False">
        <TextBlock Text="This tab is disabled" Margin="16" />
    </ContentPage>
</TabbedPage>
```

### Responding to selection changes

Handle the `SelectionChanged` event to react when the user switches tabs.

```csharp
tabbedPage.SelectionChanged += (sender, args) =>
{
    var previousPage = args.PreviousPage;
    var currentPage = args.CurrentPage;
    Console.WriteLine($"Switched from {previousPage?.Header} to {currentPage?.Header}");
};
```

### Programmatic tab selection

You can change the active tab in code by setting `SelectedIndex` or `SelectedPage`.

```csharp
// Select by index
tabbedPage.SelectedIndex = 2;

// Select by page reference
tabbedPage.SelectedPage = profilePage;
```

### Independent navigation stack per tab

A common pattern is to place a `NavigationPage` inside each tab, giving each tab its own independent navigation stack.

```xml
<TabbedPage xmlns="https://github.com/avaloniaui"
            TabPlacement="Bottom">
    <NavigationPage Header="Home" Icon="{StaticResource HomeIcon}">
        <ContentPage Header="Home">
            <Button Content="View Details" Click="OnViewDetails" />
        </ContentPage>
    </NavigationPage>
    <NavigationPage Header="Settings" Icon="{StaticResource SettingsIcon}">
        <ContentPage Header="Settings">
            <TextBlock Text="Settings page" Margin="16" />
        </ContentPage>
    </NavigationPage>
</TabbedPage>
```

### Data-driven tabs with PageTemplate

Use `PageTemplate` to generate tabs from a bound data collection. Each item in the collection is rendered using the specified template.

```xml
<TabbedPage xmlns="https://github.com/avaloniaui"
            Pages="{Binding Tabs}">
    <TabbedPage.PageTemplate>
        <DataTemplate>
            <ContentPage Header="{Binding Title}">
                <TextBlock Text="{Binding Body}" Margin="16" />
            </ContentPage>
        </DataTemplate>
    </TabbedPage.PageTemplate>
</TabbedPage>
```

```csharp
public class MainViewModel
{
    public ObservableCollection<TabItem> Tabs { get; } = new()
    {
        new TabItem { Title = "Home", Body = "Home content" },
        new TabItem { Title = "News", Body = "News content" },
        new TabItem { Title = "Settings", Body = "Settings content" }
    };
}

public class TabItem
{
    public string Title { get; set; }
    public string Body { get; set; }
}
```

### TabbedPage inside a DrawerPage

You can nest a `TabbedPage` inside a `DrawerPage` to combine a side drawer with tabbed navigation.

```xml
<DrawerPage xmlns="https://github.com/avaloniaui">
    <DrawerPage.Drawer>
        <StackPanel Margin="16">
            <TextBlock Text="Drawer Menu" FontSize="20" />
            <Button Content="Option A" />
            <Button Content="Option B" />
        </StackPanel>
    </DrawerPage.Drawer>
    <TabbedPage TabPlacement="Bottom">
        <ContentPage Header="Home">
            <TextBlock Text="Home content" Margin="16" />
        </ContentPage>
        <ContentPage Header="Search">
            <TextBlock Text="Search content" Margin="16" />
        </ContentPage>
    </TabbedPage>
</DrawerPage>
```

<img src={TabbedPageInDrawerPageScreenshot} alt="TabbedPage inside a DrawerPage" />

## See also

- [ContentPage](contentpage)
- [NavigationPage](navigationpage)
- [TabControl](/controls/navigation/tabcontrol)
- [TabbedPage API reference](/api/avalonia/controls/tabbedpage)
- [`TabbedPage.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Page/TabbedPage.cs)
