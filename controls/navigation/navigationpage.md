---
id: navigationpage
title: NavigationPage
---

The `NavigationPage` manages a stack-based navigation system, allowing you to push and pop pages with animated transitions. It displays a navigation bar with a back button and the current page's header.

`NavigationPage` implements the `INavigation` interface, providing a full set of async navigation methods for pushing, popping, and replacing pages.

## Useful Properties

| Property | Description |
| --- | --- |
| `PageTransition` | The transition animation used when navigating between pages. |
| `ModalTransition` | The transition animation used when presenting or dismissing modal pages. |
| `BarHeight` | The height of the navigation bar. Default is `48`. |
| `IsBackButtonVisible` | Boolean, default is `true`. Controls whether the back button is shown. |
| `IsGestureEnabled` | Boolean, default is `true`. Enables swipe gestures for back navigation. |
| `HasShadow` | Boolean, default is `false`. Displays a shadow beneath the navigation bar. |
| `CanGoBack` | Read-only. Returns `true` when there is more than one page on the navigation stack. |
| `NavigationStack` | Read-only. The current stack of pages. |
| `ModalStack` | Read-only. The current stack of modal pages. |
| `StackDepth` | Read-only. The number of pages on the navigation stack. |

## Attached Properties

These properties can be set on individual `Page` instances to customize their appearance within the `NavigationPage`:

| Attached Property | Type | Default | Description |
| --- | --- | --- | --- |
| `NavigationPage.HasNavigationBar` | `bool` | `true` | Whether the navigation bar is visible for this page. |
| `NavigationPage.HasBackButton` | `bool` | `true` | Whether the back button is shown for this page. |
| `NavigationPage.IsBackButtonEnabled` | `bool` | `true` | Whether the back button is enabled for this page. |
| `NavigationPage.BackButtonContent` | `object` | `null` | Custom content for the back button. |
| `NavigationPage.BarHeightOverride` | `double?` | `null` | Overrides the bar height for this page. |
| `NavigationPage.BarLayoutBehavior` | `BarLayoutBehavior?` | `null` | Controls whether the bar is `Inset` (pushes content down) or `Overlay` (floats over content). |
| `NavigationPage.TopCommandBar` | `Control` | `null` | A command bar displayed below the navigation bar for this page. |
| `NavigationPage.BottomCommandBar` | `Control` | `null` | A command bar displayed at the bottom for this page. |

## Pseudoclasses

| Pseudoclass | Description |
| --- | --- |
| `:nav-bar-inset` | Active when the navigation bar is in inset mode (content is offset below the bar). |
| `:nav-bar-compact` | Active when the navigation bar is in compact mode. |

## Navigation Methods

All navigation methods are asynchronous and return `Task`. Each method has an overload that accepts an `IPageTransition` parameter to override the default transition.

| Method | Description |
| --- | --- |
| `PushAsync(Page)` | Pushes a new page onto the navigation stack. |
| `PopAsync()` | Removes the current page from the stack and returns it. |
| `PopToRootAsync()` | Pops all pages except the root page. |
| `PopToPageAsync(Page)` | Pops pages until the specified page is on top. |
| `ReplaceAsync(Page)` | Replaces the current page with a new page. |
| `InsertPage(Page, Page)` | Inserts a page into the stack before the specified page. |
| `RemovePage(Page)` | Removes a specific page from the stack. |

### Modal Navigation

| Method | Description |
| --- | --- |
| `PushModalAsync(Page)` | Presents a page as a modal overlay. |
| `PopModalAsync()` | Dismisses the current modal and returns it. |
| `PopAllModalsAsync()` | Dismisses all modals. |

## Events

| Event | Description |
| --- | --- |
| `Pushed` | Raised after a page is pushed onto the stack. |
| `Popped` | Raised after a page is popped from the stack. |
| `PoppedToRoot` | Raised after all pages are popped to the root. |
| `PageInserted` | Raised after a page is inserted into the stack. |
| `PageRemoved` | Raised after a page is removed from the stack. |
| `ModalPushed` | Raised after a modal page is presented. |
| `ModalPopped` | Raised after a modal page is dismissed. |

## Examples

### Basic Navigation

Define a `NavigationPage` with an initial root page:

```xml
<NavigationPage xmlns="https://github.com/avaloniaui">
    <ContentPage Header="Home">
        <StackPanel Margin="16" Spacing="8">
            <TextBlock Text="Home Page" FontSize="24" />
            <Button Content="Go to Details" Click="OnGoToDetails" />
        </StackPanel>
    </ContentPage>
</NavigationPage>
```

Push and pop pages in code-behind or a view model:

```csharp
// Push a new page
await Navigation.PushAsync(new DetailsPage());

// Pop back
await Navigation.PopAsync();

// Pop to the root page
await Navigation.PopToRootAsync();
```

### Accessing Navigation

Every `Page` exposes a `Navigation` property (of type `INavigation`) that references the nearest `NavigationPage` ancestor. Use this to navigate from within any page:

```csharp
public class DetailsPage : ContentPage
{
    private async void OnBackClicked(object? sender, RoutedEventArgs e)
    {
        await Navigation.PopAsync();
    }
}
```

### Custom Page Transition

```xml
<NavigationPage xmlns="https://github.com/avaloniaui">
    <NavigationPage.PageTransition>
        <PageSlide Duration="0:00:00.300" Orientation="Horizontal" />
    </NavigationPage.PageTransition>

    <ContentPage Header="Home">
        <TextBlock Text="Slide transitions" Margin="16" />
    </ContentPage>
</NavigationPage>
```

### Per-Page Navigation Bar Customization

Use attached properties to control the navigation bar on a per-page basis:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             Header="Immersive View"
             NavigationPage.HasNavigationBar="False">
    <!-- Full-screen content with no navigation bar -->
    <Image Source="avares://MyApp/Assets/hero.jpg" Stretch="UniformToFill" />
</ContentPage>
```

### Modal Pages

```csharp
// Present a modal
await Navigation.PushModalAsync(new LoginPage());

// Dismiss the modal
await Navigation.PopModalAsync();
```

## See Also

- [ContentPage](contentpage)
- [TabbedPage](tabbedpage)
- [DrawerPage](drawerpage)
- [Page Transitions](/docs/graphics-animation/page-transitions)
