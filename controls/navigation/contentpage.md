---
id: contentpage
title: ContentPage
---

A `ContentPage` is the fundamental building block for page-based navigation in Avalonia. It represents a single page of content and provides built-in support for headers, icons, safe area padding, and command bars.

`ContentPage` is typically used as a child of [`NavigationPage`](navigationpage), [`TabbedPage`](tabbedpage), or [`DrawerPage`](drawerpage).

## Useful Properties

You will probably use these properties most often:

| Property | Description |
| --- | --- |
| `Content` | The main content to display on the page. |
| `ContentTemplate` | A data template used to display the content. |
| `Header` | The page header, displayed in the navigation bar when hosted inside a `NavigationPage`. |
| `Icon` | An icon for the page, displayed in tab bars when hosted inside a `TabbedPage`. |
| `AutomaticallyApplySafeAreaPadding` | Boolean, default is `true`. Automatically adjusts padding for device safe areas (notches, status bars). |
| `TopCommandBar` | Content displayed in a command bar area above the page content. |
| `BottomCommandBar` | Content displayed in a command bar area below the page content. |
| `SafeAreaPadding` | The current safe area padding applied to the page. |

## Page Lifecycle Events

Every `Page` (including `ContentPage`) supports lifecycle events that fire during navigation:

| Event | Description |
| --- | --- |
| `NavigatedTo` | Raised when the page has been navigated to. |
| `Navigating` | Raised when the page is about to be navigated away from. Supports cancellation. |
| `NavigatedFrom` | Raised when the page has been navigated away from. |

## Example

A basic content page with a header:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             Header="Home">
    <StackPanel Margin="16" Spacing="8">
        <TextBlock Text="Welcome to Avalonia!"
                   FontSize="24" FontWeight="Bold" />
        <TextBlock Text="This is a ContentPage." />
    </StackPanel>
</ContentPage>
```

### Using Command Bars

You can add command bars to the top or bottom of a page:

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

### Responding to Navigation Events

```csharp
public class HomePage : ContentPage
{
    protected override void OnNavigatedTo(NavigatedToEventArgs args)
    {
        base.OnNavigatedTo(args);
        // Load data when the page appears
    }

    protected override void OnNavigatedFrom(NavigatedFromEventArgs args)
    {
        base.OnNavigatedFrom(args);
        // Clean up when the page disappears
    }
}
```

## See Also

- [NavigationPage](navigationpage)
- [TabbedPage](tabbedpage)
- [DrawerPage](drawerpage)
