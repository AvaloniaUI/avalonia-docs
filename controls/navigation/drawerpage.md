---
id: drawerpage
title: DrawerPage
---

The `DrawerPage` provides a side drawer (or top/bottom drawer) navigation pattern. It displays a main content area alongside a collapsible drawer pane that can hold navigation menus, settings, or any other content.

When nested inside a `NavigationPage`, the drawer icon automatically switches to a back button when the navigation stack has more than one page.

:::info
`DrawerPage` is similar to [`SplitView`](/controls/layout/containers/splitview) but adds page-based navigation features such as lifecycle events, safe area support, and automatic integration with `NavigationPage`.
:::

## Useful Properties

| Property | Description |
| --- | --- |
| `Drawer` | The content displayed inside the drawer pane. |
| `Content` | The main content area of the page. |
| `IsOpen` | Boolean, default is `false`. Controls whether the drawer is open. |
| `DrawerPlacement` | The side where the drawer appears. Options: `Left`, `Right`, `Top`, `Bottom`. Default is `Left`. |
| `DrawerLayoutBehavior` | How the drawer interacts with content. Options: `Overlay`, `Split`, `CompactOverlay`, `CompactInline`. Default is `Overlay`. |
| `DrawerBehavior` | Controls drawer visibility behavior. Options: `Auto`, `Flyout`, `Locked`, `Disabled`. Default is `Auto`. |
| `DrawerLength` | The width (or height) of the drawer when open. Default is `320`. |
| `CompactDrawerLength` | The width of the drawer in compact mode. Default is `48`. |
| `DrawerBreakpointLength` | The container width at which the drawer automatically switches between overlay and inline modes. Default is `0` (disabled). |
| `IsGestureEnabled` | Boolean, default is `true`. Enables swipe gestures to open and close the drawer. |

### Drawer Appearance Properties

| Property | Description |
| --- | --- |
| `DrawerHeader` | Content displayed at the top of the drawer. |
| `DrawerFooter` | Content displayed at the bottom of the drawer. |
| `DrawerIcon` | An icon shown in the drawer toggle button. |
| `DrawerTemplate` | A data template for the drawer content. |
| `DrawerBackground` | The brush used for the drawer background. |
| `DrawerHeaderBackground` | The brush used for the drawer header background. |
| `DrawerHeaderForeground` | The brush used for the drawer header foreground. |
| `DrawerFooterBackground` | The brush used for the drawer footer background. |
| `DrawerFooterForeground` | The brush used for the drawer footer foreground. |
| `BackdropBrush` | The brush used for the overlay backdrop when the drawer is open. |

## Drawer Layout Behaviors

The `DrawerLayoutBehavior` property controls how the drawer interacts with the content area:

- **Overlay**: The drawer slides over the content. The content area is not resized.
- **Split**: The drawer pushes the content to the side. Both the drawer and content are visible simultaneously.
- **CompactOverlay**: A narrow strip of the drawer is always visible (showing icons). When opened, the drawer overlays the content.
- **CompactInline**: A narrow strip of the drawer is always visible. When opened, the drawer pushes the content aside.

## Events

| Event | Description |
| --- | --- |
| `Opened` | Raised when the drawer finishes opening. |
| `Closing` | Raised when the drawer is about to close. Set `Cancel = true` on the event args to prevent closing. |
| `Closed` | Raised when the drawer finishes closing. |

## Examples

### Basic Drawer Navigation

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            Header="My App"
            DrawerLength="280">
    <DrawerPage.Drawer>
        <StackPanel Spacing="4" Margin="8">
            <Button Content="Home" Click="OnHomeClicked" />
            <Button Content="Settings" Click="OnSettingsClicked" />
            <Button Content="About" Click="OnAboutClicked" />
        </StackPanel>
    </DrawerPage.Drawer>

    <TextBlock Text="Select an item from the drawer"
               Margin="16" FontSize="18" />
</DrawerPage>
```

### Drawer with Header and Footer

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            Header="My App">
    <DrawerPage.DrawerHeader>
        <TextBlock Text="Navigation" FontSize="18"
                   FontWeight="Bold" Margin="16" />
    </DrawerPage.DrawerHeader>

    <DrawerPage.DrawerFooter>
        <TextBlock Text="v1.0.0" Margin="16" Opacity="0.6" />
    </DrawerPage.DrawerFooter>

    <DrawerPage.Drawer>
        <StackPanel Spacing="4" Margin="8">
            <Button Content="Home" />
            <Button Content="Profile" />
        </StackPanel>
    </DrawerPage.Drawer>

    <TextBlock Text="Main content" Margin="16" />
</DrawerPage>
```

### Compact Inline Mode

Use compact inline mode to keep icon buttons visible when the drawer is closed:

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            Header="My App"
            DrawerLayoutBehavior="CompactInline"
            CompactDrawerLength="48"
            DrawerLength="250">
    <DrawerPage.Drawer>
        <StackPanel Spacing="4">
            <Button Width="48" Content="H" />
            <Button Width="48" Content="S" />
        </StackPanel>
    </DrawerPage.Drawer>

    <TextBlock Text="Content adjusts when drawer opens" Margin="16" />
</DrawerPage>
```

### Responsive Drawer with Breakpoint

Automatically switch the drawer between overlay and inline based on the container width:

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            Header="Responsive App"
            DrawerBreakpointLength="800"
            DrawerLayoutBehavior="Split">
    <DrawerPage.Drawer>
        <StackPanel Spacing="4" Margin="8">
            <Button Content="Home" />
            <Button Content="Settings" />
        </StackPanel>
    </DrawerPage.Drawer>

    <TextBlock Text="Resize the window to see the drawer adapt" Margin="16" />
</DrawerPage>
```

### Drawer Inside NavigationPage

When wrapped in a `NavigationPage`, the hamburger menu icon automatically becomes a back button when pages are pushed:

```xml
<NavigationPage xmlns="https://github.com/avaloniaui">
    <DrawerPage Header="Home">
        <DrawerPage.Drawer>
            <StackPanel Spacing="4" Margin="8">
                <Button Content="Home" />
                <Button Content="Settings" />
            </StackPanel>
        </DrawerPage.Drawer>

        <StackPanel Margin="16" Spacing="8">
            <TextBlock Text="Home Page" FontSize="24" />
            <Button Content="Go to Details" Click="OnGoToDetails" />
        </StackPanel>
    </DrawerPage>
</NavigationPage>
```

## See Also

- [ContentPage](contentpage)
- [NavigationPage](navigationpage)
- [SplitView](/controls/layout/containers/splitview)
