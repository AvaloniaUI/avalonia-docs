---
id: tabbedpage
title: TabbedPage
---

The `TabbedPage` displays multiple pages in a tabbed interface, allowing users to switch between pages by selecting tabs. Each child page becomes a tab, with the tab header and icon derived from the page's `Header` and `Icon` properties.

:::info
If you need a simple tab strip without page-based navigation features (lifecycle events, safe area handling), consider using the standard [TabControl](/controls/navigation/tabcontrol) instead.
:::

## Useful Properties

| Property | Description |
| --- | --- |
| `Pages` | The collection of `Page` children displayed as tabs. |
| `SelectedIndex` | The index of the currently selected tab. |
| `SelectedPage` | Read-only. The currently selected `Page`. |
| `TabPlacement` | Controls where tabs are positioned. Options: `Auto`, `Top`, `Bottom`, `Left`, `Right`. Default is `Auto`. |
| `PageTransition` | The transition animation used when switching between tabs. |
| `PageTemplate` | A data template used to render page content. |
| `IsKeyboardNavigationEnabled` | Boolean, default is `true`. Allows tab switching with keyboard input. |
| `IsGestureEnabled` | Boolean, default is `false`. Enables swipe gestures to switch tabs. |
| `IndicatorTemplate` | A data template for the selected tab indicator. |

## Attached Properties

| Attached Property | Type | Default | Description |
| --- | --- | --- | --- |
| `TabbedPage.IsTabEnabled` | `bool` | `true` | Set on a child `Page` to enable or disable its tab. |

## Events

| Event | Description |
| --- | --- |
| `SelectionChanged` | Raised when the selected tab changes. Provides `PreviousPage` and `CurrentPage`. |
| `CurrentPageChanged` | Raised when the current page changes. |

## Examples

### Basic Tabbed Layout

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

### Bottom Tabs

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

### Tabs with Navigation

A common pattern is to place a `NavigationPage` inside each tab, giving each tab its own navigation stack:

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

### Disabling a Tab

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

### Swipe Navigation

Enable gesture-based tab switching for touch-friendly interfaces:

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

## See Also

- [ContentPage](contentpage)
- [NavigationPage](navigationpage)
- [TabControl](/controls/navigation/tabcontrol)
