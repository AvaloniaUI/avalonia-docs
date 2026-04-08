---
id: drawerpage
title: DrawerPage
---

import DrawerPageClosedScreenshot from '/img/controls/drawerpage/drawerpage-closed.png';
import DrawerPageOpenScreenshot from '/img/controls/drawerpage/drawerpage-open.png';
import DrawerPageHeaderFooterScreenshot from '/img/controls/drawerpage/drawerpage-header-footer.png';
import DrawerPageCompactCollapsedScreenshot from '/img/controls/drawerpage/drawerpage-compact-collapsed.png';
import DrawerPageCompactExpandedScreenshot from '/img/controls/drawerpage/drawerpage-compact-expanded.png';
import DrawerPageSplitScreenshot from '/img/controls/drawerpage/drawerpage-split.png';
import DrawerPageRightScreenshot from '/img/controls/drawerpage/drawerpage-right.png';
import DrawerPageRtlScreenshot from '/img/controls/drawerpage/drawerpage-rtl.png';

The [`DrawerPage`](/api/avalonia/controls/drawerpage) combines a sliding drawer pane with a main content area, providing a common navigation pattern for applications. It is built on top of `SplitView` and adds page-based navigation features such as lifecycle events, safe area support, and automatic integration with [`NavigationPage`](/api/avalonia/controls/navigationpage).

When nested inside a `NavigationPage`, the drawer icon automatically switches to a back button when the navigation stack has more than one page.

:::info
`DrawerPage` is similar to [`SplitView`](/controls/layout/containers/splitview) but adds page-based navigation features such as lifecycle events, safe area support, and automatic integration with `NavigationPage`.
:::

<img src={DrawerPageClosedScreenshot} alt="DrawerPage with the drawer closed" />

<img src={DrawerPageOpenScreenshot} alt="DrawerPage with the drawer open" />

## Useful properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `Content` | `object` | `null` | The main content area of the page. |
| `ContentTemplate` | `IDataTemplate` | `null` | A data template for the main content. |
| `Drawer` | `object` | `null` | The content displayed inside the drawer pane. |
| `DrawerTemplate` | `IDataTemplate` | `null` | A data template for the drawer content. |
| `IsOpen` | `bool` | `false` | Controls whether the drawer is open. |
| `DrawerLength` | `double` | `320` | The width (or height) of the drawer when open. |
| `CompactDrawerLength` | `double` | `48` | The width of the drawer in compact mode. |
| `DrawerBreakpointWidth` | `double` | `0` | The container width at which the drawer automatically switches between overlay and inline modes. A value of `0` disables the breakpoint. |
| `IsGestureEnabled` | `bool` | `true` | Enables swipe gestures to open and close the drawer. |
| `DrawerBehavior` | `DrawerBehavior` | `Auto` | Controls drawer visibility behavior. See the DrawerBehavior Values table below. |
| `DrawerLayoutBehavior` | `DrawerLayoutBehavior` | `Overlay` | How the drawer interacts with the content area. See the DrawerLayoutBehavior Values table below. |
| `DrawerPlacement` | `DrawerPlacement` | `Left` | The side where the drawer appears. See the DrawerPlacement Values table below. |
| `DrawerHeader` | `object` | `null` | Content displayed at the top of the drawer. |
| `DrawerFooter` | `object` | `null` | Content displayed at the bottom of the drawer. |
| `DrawerIcon` | `object` | `null` | An icon shown in the drawer toggle button. |
| `DrawerBackground` | [`IBrush`](/api/avalonia/media/ibrush) | `null` | The brush used for the drawer background. |
| `DrawerHeaderBackground` | `IBrush` | `null` | The brush used for the drawer header background. |
| `DrawerHeaderForeground` | `IBrush` | `null` | The brush used for the drawer header foreground. |
| `DrawerFooterBackground` | `IBrush` | `null` | The brush used for the drawer footer background. |
| `DrawerFooterForeground` | `IBrush` | `null` | The brush used for the drawer footer foreground. |
| `BackdropBrush` | `IBrush` | `null` | The brush used for the overlay backdrop when the drawer is open. |
| `DisplayMode` | `SplitViewDisplayMode` | `Overlay` | Controls how the drawer is displayed relative to the content. |
| `HorizontalContentAlignment` | `HorizontalAlignment` | `Stretch` | Horizontal alignment of the main content. |
| `VerticalContentAlignment` | `VerticalAlignment` | `Stretch` | Vertical alignment of the main content. |

### DrawerBehavior values

| Value | Description |
| --- | --- |
| `Auto` | The drawer opens and closes normally based on user interaction and the breakpoint. |
| `Flyout` | The drawer behaves as a flyout overlay, closing automatically when the user taps outside. |
| `Locked` | The drawer stays open and cannot be closed by the user. |
| `Disabled` | The drawer is hidden and cannot be opened. |

### DrawerLayoutBehavior values

| Value | Description |
| --- | --- |
| `Overlay` | The drawer slides over the content. The content area is not resized. |
| `Split` | The drawer pushes the content to the side. Both the drawer and content are visible simultaneously. |
| `CompactOverlay` | A narrow strip of the drawer is always visible (showing icons). When opened, the drawer overlays the content. |
| `CompactInline` | A narrow strip of the drawer is always visible. When opened, the drawer pushes the content aside. |

### DrawerPlacement values

| Value | Description |
| --- | --- |
| `Left` | The drawer appears on the left side. |
| `Right` | The drawer appears on the right side. |
| `Top` | The drawer appears at the top. |
| `Bottom` | The drawer appears at the bottom. |

## Events

| Event | Description |
| --- | --- |
| `Opened` | Raised when the drawer finishes opening. |
| `Closing` | Raised when the drawer is about to close. Set `Cancel = true` on the event args to prevent closing. |
| `Closed` | Raised when the drawer finishes closing. |

## Gestures and keyboard

`DrawerPage` supports swipe gestures to open and close the drawer on touch-enabled devices. This can be toggled with the `IsGestureEnabled` property.

On desktop, pressing the `Escape` key closes the drawer when it is open and focused.

## NavigationPage integration

When a `DrawerPage` is placed inside a `NavigationPage`, the hamburger menu icon in the header automatically becomes a back button when additional pages are pushed onto the navigation stack. This provides a seamless transition between drawer navigation and hierarchical page navigation without requiring additional code.

## Examples

### Basic XAML

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

### Basic code

```csharp
var drawerPage = new DrawerPage
{
    Header = "My App",
    DrawerLength = 280,
    Drawer = new StackPanel
    {
        Spacing = 4,
        Margin = new Thickness(8),
        Children =
        {
            new Button { Content = "Home" },
            new Button { Content = "Settings" },
            new Button { Content = "About" }
        }
    },
    Content = new TextBlock
    {
        Text = "Select an item from the drawer",
        Margin = new Thickness(16),
        FontSize = 18
    }
};
```

### Toggling the drawer

```csharp
private void ToggleDrawer()
{
    myDrawerPage.IsOpen = !myDrawerPage.IsOpen;
}
```

### Navigating from the drawer

```csharp
private void OnSettingsClicked(object sender, RoutedEventArgs e)
{
    myDrawerPage.IsOpen = false;
    NavigationPage.GetNavigationPage(this)?.Push(new SettingsPage());
}
```

### Header and footer

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

<img src={DrawerPageHeaderFooterScreenshot} alt="DrawerPage with header and footer" />

### Persistent sidebar (Split)

Use `DrawerLayoutBehavior="Split"` to keep the drawer always visible alongside the content.

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            Header="My App"
            DrawerLayoutBehavior="Split"
            DrawerLength="250">
    <DrawerPage.Drawer>
        <StackPanel Spacing="4" Margin="8">
            <Button Content="Home" />
            <Button Content="Settings" />
        </StackPanel>
    </DrawerPage.Drawer>

    <TextBlock Text="Content is pushed to the side" Margin="16" />
</DrawerPage>
```

<img src={DrawerPageSplitScreenshot} alt="DrawerPage in split mode" />

### Compact navigation rail

Use `CompactOverlay` or `CompactInline` to show a narrow strip of the drawer (such as icon buttons) when closed, expanding to the full drawer on open.

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

<img src={DrawerPageCompactCollapsedScreenshot} alt="DrawerPage compact mode collapsed" />

<img src={DrawerPageCompactExpandedScreenshot} alt="DrawerPage compact mode expanded" />

### Responsive layout

Automatically switch the drawer between overlay and inline based on the container width.

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            Header="Responsive App"
            DrawerBreakpointWidth="800"
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

### RTL support

`DrawerPage` respects the `FlowDirection` property. When set to `RightToLeft`, the drawer placement is mirrored automatically.

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            Header="RTL App"
            FlowDirection="RightToLeft">
    <DrawerPage.Drawer>
        <StackPanel Spacing="4" Margin="8">
            <Button Content="الصفحة الرئيسية" />
            <Button Content="الإعدادات" />
        </StackPanel>
    </DrawerPage.Drawer>

    <TextBlock Text="محتوى من اليمين إلى اليسار" Margin="16" />
</DrawerPage>
```

<img src={DrawerPageRtlScreenshot} alt="DrawerPage with RTL layout" />

### Right-side drawer

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            Header="Right Drawer"
            DrawerPlacement="Right"
            DrawerLength="280">
    <DrawerPage.Drawer>
        <StackPanel Spacing="4" Margin="8">
            <Button Content="Option A" />
            <Button Content="Option B" />
        </StackPanel>
    </DrawerPage.Drawer>

    <TextBlock Text="The drawer opens from the right" Margin="16" />
</DrawerPage>
```

<img src={DrawerPageRightScreenshot} alt="DrawerPage with right-side drawer" />

### Backdrop scrim

Use the `BackdropBrush` property to add a semi-transparent overlay behind the drawer when it is open in overlay mode.

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            Header="Scrim Example"
            BackdropBrush="#80000000">
    <DrawerPage.Drawer>
        <StackPanel Spacing="4" Margin="8">
            <Button Content="Home" />
        </StackPanel>
    </DrawerPage.Drawer>

    <TextBlock Text="A scrim appears behind the drawer" Margin="16" />
</DrawerPage>
```

### Cancelling close

Handle the `Closing` event to prevent the drawer from closing under certain conditions.

```csharp
private void OnDrawerClosing(object sender, CancelEventArgs e)
{
    if (hasUnsavedChanges)
    {
        e.Cancel = true;
    }
}
```

### Responding to open/close

```csharp
private void OnDrawerOpened(object sender, EventArgs e)
{
    Debug.WriteLine("Drawer opened");
}

private void OnDrawerClosed(object sender, EventArgs e)
{
    Debug.WriteLine("Drawer closed");
}
```

### MVVM binding

Bind the `IsOpen` property to a view model for full control over the drawer state.

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            Header="MVVM Example"
            IsOpen="{Binding IsDrawerOpen}">
    <DrawerPage.Drawer>
        <StackPanel Spacing="4" Margin="8">
            <Button Content="Home" Command="{Binding GoHomeCommand}" />
            <Button Content="Settings" Command="{Binding GoSettingsCommand}" />
        </StackPanel>
    </DrawerPage.Drawer>

    <ContentControl Content="{Binding CurrentContent}" />
</DrawerPage>
```

### Custom drawer icon

Replace the default hamburger icon with a custom icon.

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            Header="Custom Icon">
    <DrawerPage.DrawerIcon>
        <PathIcon Data="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </DrawerPage.DrawerIcon>

    <DrawerPage.Drawer>
        <StackPanel Spacing="4" Margin="8">
            <Button Content="Home" />
        </StackPanel>
    </DrawerPage.Drawer>

    <TextBlock Text="Custom drawer icon" Margin="16" />
</DrawerPage>
```

### Locked drawer

Use `DrawerBehavior="Locked"` to keep the drawer permanently open.

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            Header="Locked Drawer"
            DrawerBehavior="Locked"
            DrawerLayoutBehavior="Split"
            DrawerLength="250">
    <DrawerPage.Drawer>
        <StackPanel Spacing="4" Margin="8">
            <Button Content="Home" />
            <Button Content="Settings" />
        </StackPanel>
    </DrawerPage.Drawer>

    <TextBlock Text="The drawer cannot be closed" Margin="16" />
</DrawerPage>
```

### Disabling the drawer

Use `DrawerBehavior="Disabled"` to hide the drawer entirely.

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            Header="No Drawer"
            DrawerBehavior="Disabled">
    <TextBlock Text="The drawer is disabled on this page" Margin="16" />
</DrawerPage>
```

### CrossFade transition

Apply a transition when the drawer opens or closes.

```xml
<DrawerPage xmlns="https://github.com/avaloniaui"
            Header="Transitions">
    <DrawerPage.PageTransition>
        <CrossFade Duration="0:0:0.25" />
    </DrawerPage.PageTransition>

    <DrawerPage.Drawer>
        <StackPanel Spacing="4" Margin="8">
            <Button Content="Home" />
        </StackPanel>
    </DrawerPage.Drawer>

    <TextBlock Text="Smooth transitions" Margin="16" />
</DrawerPage>
```

### Drawer inside NavigationPage

When wrapped in a `NavigationPage`, the hamburger menu icon automatically becomes a back button when pages are pushed.

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

## See also

- [ContentPage](contentpage)
- [NavigationPage](navigationpage)
- [SplitView](/controls/layout/containers/splitview)
- [DrawerPage API reference](/api/avalonia/controls/drawerpage)
- [`DrawerPage.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Page/DrawerPage.cs)
