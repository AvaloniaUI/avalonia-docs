---
id: contentpage
title: ContentPage
---

import ContentPageInNavigationScreenshot from '/img/controls/contentpage/contentpage-in-navigationpage.png';
import ContentPageStandaloneScreenshot from '/img/controls/contentpage/contentpage-standalone.png';
import ContentPageTopCommandBarScreenshot from '/img/controls/contentpage/contentpage-top-commandbar.png';
import ContentPageBottomCommandBarScreenshot from '/img/controls/contentpage/contentpage-bottom-commandbar.png';
import ContentPageSafeAreaDisabledScreenshot from '/img/controls/contentpage/contentpage-safe-area-disabled.png';
import ContentPageAsTabScreenshot from '/img/controls/contentpage/contentpage-as-tab.png';

[`ContentPage`](/api/avalonia/controls/contentpage) is the foundational building block for screen-based UI in Avalonia. It represents a single page of content and provides built-in support for headers, icons, safe area padding, and command bars. Every screen the user sees is typically a `ContentPage` (or a subclass of one).

`ContentPage` is most commonly used as a child of [`NavigationPage`](navigationpage), [`TabbedPage`](tabbedpage), or [`DrawerPage`](drawerpage), but it can also be placed directly inside a [`Window`](/api/avalonia/controls/window) for single-page apps.

## How the header displays

The `Header` property serves different purposes depending on which container hosts the page:

| Host control | Where the header appears |
| --- | --- |
| [`NavigationPage`](/api/avalonia/controls/navigationpage) | Displayed in the navigation bar at the top of the screen. |
| [`TabbedPage`](/api/avalonia/controls/tabbedpage) | Used as the tab label. |
| `DrawerPage` | Used as the drawer menu item label. |
| Standalone (in a `Window`) | Not displayed automatically. You must render it yourself if needed. |

## Useful properties

### ContentPage properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `Content` | `object?` | `null` | The main content to display on the page. |
| `ContentTemplate` | `IDataTemplate?` | `null` | A data template used to render the content. |
| `Header` | `object?` | `null` | The page header, displayed in the navigation bar when hosted inside a `NavigationPage`. |
| `HeaderTemplate` | `IDataTemplate?` | `null` | A data template used to render the header. |
| `Icon` | `object?` | `null` | An icon for the page, displayed in tab bars when hosted inside a `TabbedPage`. |
| `IconTemplate` | `IDataTemplate?` | `null` | A data template used to render the icon. |
| `AutomaticallyApplySafeAreaPadding` | `bool` | `true` | Automatically adjusts padding for device safe areas (notches, status bars). |
| `TopCommandBar` | `object?` | `null` | Content displayed in a command bar area above the page content. |
| `BottomCommandBar` | `object?` | `null` | Content displayed in a command bar area below the page content. |
| `SafeAreaPadding` | `Thickness` | `0` | The current safe area padding applied to the page (read-only at runtime). |

### Page base properties

These properties are inherited from `Page` and are available on all page types:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `Navigation` | `INavigation` | inherited | Provides access to the nearest `NavigationPage` ancestor for push/pop operations. |
| `BackgroundImage` | `IImage?` | `null` | An image displayed behind the page content. |
| `BackgroundImageStretch` | `Stretch` | `UniformToFill` | Controls how the background image is stretched to fill the page. |

## Navigation events

Every `Page` (including `ContentPage`) supports lifecycle events that fire during navigation. The events fire in a specific order when a navigation occurs:

| Event | Description | Order |
| --- | --- | --- |
| `Navigating` | Raised on the **current** page before navigation begins. Supports cancellation via `e.Cancel = true`. | 1 |
| `NavigatedFrom` | Raised on the **old** page after the navigation has completed. | 2 |
| `NavigatedTo` | Raised on the **new** page after the navigation has completed. | 3 |

### Overriding lifecycle methods

You can also override the corresponding `protected` methods instead of subscribing to events:

```csharp
public class HomePage : ContentPage
{
    protected override void OnNavigatedTo(NavigatedToEventArgs args)
    {
        base.OnNavigatedTo(args);
        // Page is now visible, load or refresh data here
    }

    protected override void OnNavigating(NavigatingEventArgs args)
    {
        base.OnNavigating(args);
        if (HasUnsavedChanges)
        {
            args.Cancel = true; // Prevent navigation away
        }
    }

    protected override void OnNavigatedFrom(NavigatedFromEventArgs args)
    {
        base.OnNavigatedFrom(args);
        // Page is no longer visible, clean up resources
    }
}
```

:::note
`NavigatedTo` is not the same as the `Loaded` event. `Loaded` fires once when the control is first added to the visual tree, while `NavigatedTo` fires every time the page becomes the active page (for example, when returning to it via a back navigation).
:::

## Examples

### Minimal XAML page

The simplest possible `ContentPage` with inline content:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             Header="Home">
    <TextBlock Text="Hello, world!" Margin="16" />
</ContentPage>
```

### Creating a ContentPage in code

```csharp
var page = new ContentPage
{
    Header = "Home",
    Content = new TextBlock
    {
        Text = "Hello from code!",
        Margin = new Thickness(16)
    }
};
```

### ContentPage inside a NavigationPage

When hosted in a `NavigationPage`, the `Header` is displayed in the navigation bar:

```xml
<NavigationPage xmlns="https://github.com/avaloniaui">
    <ContentPage Header="Dashboard">
        <StackPanel Margin="16" Spacing="8">
            <TextBlock Text="Welcome back!" FontSize="24" FontWeight="Bold" />
            <Button Content="Go to Details" Click="OnGoToDetails" />
        </StackPanel>
    </ContentPage>
</NavigationPage>
```

<img src={ContentPageInNavigationScreenshot} alt="ContentPage inside a NavigationPage" />

### ContentPage as a window root

For single-page applications, you can place a `ContentPage` directly inside a `Window`:

```xml
<Window xmlns="https://github.com/avaloniaui"
        Title="My App">
    <ContentPage>
        <StackPanel Margin="16" Spacing="8">
            <TextBlock Text="Single-page app" FontSize="24" />
            <TextBlock Text="No navigation container needed." />
        </StackPanel>
    </ContentPage>
</Window>
```

<img src={ContentPageStandaloneScreenshot} alt="ContentPage standalone in a Window" />

### Scrollable layout

`ContentPage` does not include a built-in scroll viewer. Wrap your content in a `ScrollViewer` if it may overflow:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             Header="Long Content">
    <ScrollViewer>
        <StackPanel Margin="16" Spacing="8">
            <TextBlock Text="Item 1" />
            <TextBlock Text="Item 2" />
            <TextBlock Text="Item 3" />
            <!-- Many more items -->
        </StackPanel>
    </ScrollViewer>
</ContentPage>
```

### MVVM binding

Bind the page content to a view model using `ContentTemplate`:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             Header="{Binding Title}"
             Content="{Binding}">
    <ContentPage.ContentTemplate>
        <DataTemplate>
            <StackPanel Margin="16" Spacing="8">
                <TextBlock Text="{Binding Description}" FontSize="18" />
                <TextBlock Text="{Binding Detail}" />
            </StackPanel>
        </DataTemplate>
    </ContentPage.ContentTemplate>
</ContentPage>
```

### TopCommandBar

Display a toolbar above the page content:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             Header="Inbox">
    <ContentPage.TopCommandBar>
        <StackPanel Orientation="Horizontal" Spacing="4" Margin="8">
            <Button Content="Filter" />
            <Button Content="Sort" />
        </StackPanel>
    </ContentPage.TopCommandBar>

    <TextBlock Text="Messages go here" Margin="16" />
</ContentPage>
```

<img src={ContentPageTopCommandBarScreenshot} alt="ContentPage with a top command bar" />

### BottomCommandBar

Display a toolbar below the page content:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             Header="Settings">
    <ContentPage.BottomCommandBar>
        <StackPanel Orientation="Horizontal" Spacing="8" Margin="8">
            <Button Content="Save" />
            <Button Content="Cancel" />
        </StackPanel>
    </ContentPage.BottomCommandBar>

    <TextBlock Text="Page content goes here" Margin="16" />
</ContentPage>
```

<img src={ContentPageBottomCommandBarScreenshot} alt="ContentPage with a bottom command bar" />

### Cancelling navigation

Use the `Navigating` event or override `OnNavigating` to prevent the user from leaving a page with unsaved changes:

```csharp
public class EditPage : ContentPage
{
    public bool HasUnsavedChanges { get; set; }

    protected override void OnNavigating(NavigatingEventArgs args)
    {
        base.OnNavigating(args);

        if (HasUnsavedChanges)
        {
            args.Cancel = true;
            // Optionally show a confirmation dialog here
        }
    }
}
```

### Intercepting the system back button

On platforms with a hardware or system back button (Android, browser), `Navigating` fires before the back action occurs. Cancelling it will also cancel the system back navigation:

```csharp
protected override void OnNavigating(NavigatingEventArgs args)
{
    base.OnNavigating(args);

    if (ShouldPreventBack())
    {
        args.Cancel = true;
    }
}
```

### Refreshing data when the page reappears

`NavigatedTo` fires every time the page becomes active, making it the ideal place to refresh data:

```csharp
public class OrdersPage : ContentPage
{
    protected override async void OnNavigatedTo(NavigatedToEventArgs args)
    {
        base.OnNavigatedTo(args);
        await ViewModel.LoadOrdersAsync();
    }
}
```

### Full-bleed layout (disabling safe area padding)

Set `AutomaticallyApplySafeAreaPadding` to `false` to let your content extend behind the notch and status bar:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             AutomaticallyApplySafeAreaPadding="False">
    <Image Source="avares://MyApp/Assets/hero.jpg"
           Stretch="UniformToFill" />
</ContentPage>
```

<img src={ContentPageSafeAreaDisabledScreenshot} alt="ContentPage with safe area padding disabled" />

### Tab with icon

When used inside a `TabbedPage`, the `Header` and `Icon` properties control the tab appearance:

```xml
<TabbedPage xmlns="https://github.com/avaloniaui"
            TabPlacement="Bottom">
    <ContentPage Header="Home" Icon="{StaticResource HomeIcon}">
        <TextBlock Text="Home content" Margin="16" />
    </ContentPage>
    <ContentPage Header="Settings" Icon="{StaticResource SettingsIcon}">
        <TextBlock Text="Settings content" Margin="16" />
    </ContentPage>
</TabbedPage>
```

<img src={ContentPageAsTabScreenshot} alt="ContentPage used as a tab in TabbedPage" />

## See also

- [NavigationPage](navigationpage)
- [TabbedPage](tabbedpage)
- [DrawerPage](drawerpage)
- [ContentPage API reference](/api/avalonia/controls/contentpage)
- [`ContentPage.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Page/ContentPage.cs)
