---
title: NavigationPage
description: REFERENCE - Built-in Controls
---

import NavigationPageRootScreenshot from '/img/reference/controls/navigationpage/navigationpage-root.png';
import NavigationPagePushedScreenshot from '/img/reference/controls/navigationpage/navigationpage-pushed.png';
import NavigationPageCustomBackScreenshot from '/img/reference/controls/navigationpage/navigationpage-custom-back-button.png';
import NavigationPageNoNavbarScreenshot from '/img/reference/controls/navigationpage/navigationpage-no-navbar.png';
import NavigationPageOverlayBarScreenshot from '/img/reference/controls/navigationpage/navigationpage-overlay-bar.png';
import NavigationPageTopCommandBarScreenshot from '/img/reference/controls/navigationpage/navigationpage-top-commandbar.png';
import NavigationPageAppearanceScreenshot from '/img/reference/controls/navigationpage/navigationpage-appearance.png';
import NavigationPageModalScreenshot from '/img/reference/controls/navigationpage/navigationpage-modal.png';
import NavigationPageDrawerIntegrationScreenshot from '/img/reference/controls/navigationpage/navigationpage-drawer-integration.png';

# NavigationPage

`NavigationPage` provides stack-based navigation. Pages are pushed onto and popped off the stack through the `INavigation` interface. A navigation bar is rendered at the top of the page by default, showing the current page title, a back button when the stack depth is greater than 1, and optional command bars contributed by child pages.

`NavigationPage` implements `INavigation` directly, so the navigation API is available both through `Page.Navigation` on child pages and through a direct reference to the `NavigationPage` instance.

## Navigation Bar Layout

The navigation bar contains:

| Zone | Contents |
| ---- | -------- |
| Left | Back button when depth is greater than 1. Hamburger toggle when at the root inside a `DrawerPage`. |
| Center | Page title from the active page's `Header` property. |
| Right | `TopCommandBar` control set via the `NavigationPage.TopCommandBar` attached property. |

## Useful Properties

You will probably use these properties most often:

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `Content` | `object?` | `null` | The root page. Setting this pushes the page onto the stack automatically. This is the XAML content property. |
| `PageTransition` | `IPageTransition?` | `null` | Transition played when pushing or popping pages. |
| `ModalTransition` | `IPageTransition?` | `null` | Transition played when presenting or dismissing modal pages. |
| `HasShadow` | `bool` | `false` | Whether the navigation bar casts a shadow onto the page content below. |
| `BarHeight` | `double` | `48` | Default height of the navigation bar in device-independent pixels. |
| `EffectiveBarHeight` | `double` | computed | Read-only. The actual bar height in use, taking per-page overrides into account. |
| `IsBackButtonVisible` | `bool` | `true` | Global switch that controls whether a back button is ever shown in the bar. |
| `IsGestureEnabled` | `bool` | `true` | Enables the edge-swipe gesture to navigate back. |
| `CanGoBack` | `bool` | computed | Read-only. `true` when the navigation stack has more than one entry. |
| `IsBackButtonEffectivelyVisible` | `bool?` | computed | Read-only. The resolved back button visibility, taking into account `IsBackButtonVisible`, the per-page `HasBackButton` attached property, and stack depth. `null` when not yet determined. |
| `NavigationStack` | `IReadOnlyList<Page>` | computed | Read-only. Ordered list of pages on the stack, root first and top last. |

## Attached Properties

Set these on individual child `Page` instances to control per-page navigation bar behavior.

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `NavigationPage.HasNavigationBar` | `bool` | `true` | Hides or shows the navigation bar for a specific page. |
| `NavigationPage.HasBackButton` | `bool` | `true` | Hides or shows the back button for a specific page. |
| `NavigationPage.IsBackButtonEnabled` | `bool` | `true` | Enables or disables the back button for a specific page. |
| `NavigationPage.BackButtonContent` | `object?` | `null` | Custom content rendered inside the back button for a specific page. |
| `NavigationPage.TopCommandBar` | `Control?` | `null` | A control rendered in the right zone of the navigation bar when that page is active. |
| `NavigationPage.BottomCommandBar` | `Control?` | `null` | A control rendered in a command bar area below the page content. |
| `NavigationPage.BarLayoutBehavior` | `BarLayoutBehavior?` | `null` | Overrides how the navigation bar is laid out for a specific page. |
| `NavigationPage.BarHeightOverride` | `double?` | `null` | Overrides `BarHeight` for a specific page. |

## BarLayoutBehavior Values

| Value | Description |
| ----- | ----------- |
| `Inset` | Default. The navigation bar occupies layout space. Page content is laid out below it. |
| `Overlay` | The navigation bar floats above the page content. Content extends behind the bar and should handle the inset via `SafeAreaPadding`. |

## Navigation Methods

Navigation is performed through the `INavigation` interface, accessible via `Page.Navigation` on any child page, or directly on the `NavigationPage` instance.

| Method | Description |
| ------ | ----------- |
| `PushAsync(page)` | Pushes a page with the configured `PageTransition`. |
| `PushAsync(page, transition)` | Pushes with a specific transition. Pass `null` for no animation. |
| `PopAsync()` | Pops the top page with the configured `PageTransition`. |
| `PopAsync(transition)` | Pops with a specific transition. Pass `null` for no animation. |
| `PopToRootAsync()` | Pops all pages down to the root. |
| `PopToRootAsync(transition)` | Same, with a specific transition. |
| `PopToPageAsync(page)` | Pops all pages above the specified page. |
| `ReplaceAsync(page)` | Replaces the current top page with a new one. |
| `InsertPage(page, before)` | Inserts a page immediately before another in the stack, without animation. |
| `RemovePage(page)` | Removes a specific page from the stack, without animation. |
| `PushModalAsync(page)` | Presents a page modally, covering the entire `NavigationPage`. |
| `PushModalAsync(page, transition)` | Presents modally with a specific transition. |
| `PopModalAsync()` | Dismisses the top modal page. |
| `PopAllModalsAsync()` | Dismisses all modal pages. |
| `NavigationStack` | Read-only list of pages on the stack, root at index 0. |
| `ModalStack` | Read-only list of currently presented modal pages. |
| `StackDepth` | Number of pages currently on the navigation stack. |
| `CanGoBack` | `true` when the stack has more than one entry. |

The system back button automatically calls `PopAsync()` when `StackDepth > 1`.

## Example

### Basic NavigationPage in XAML

```xml
<NavigationPage xmlns="https://github.com/avaloniaui"
                xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
                x:Class="MyApp.AppShell">
    <local:HomePage />
</NavigationPage>
```

### Basic NavigationPage in Code

```csharp
window.Page = new NavigationPage(new HomePage());
```

The root page shows the `Header` in the navigation bar with no back button:

<img src={NavigationPageRootScreenshot} alt="" />

When a page is pushed, the back button appears automatically:

<img src={NavigationPagePushedScreenshot} alt="" />

### Pushing and Popping Pages

Access `Navigation` from within any child `ContentPage`:

```csharp
// Push a new page
private async void OnGoToDetailsClick(object? sender, RoutedEventArgs e)
{
    await Navigation.PushAsync(new DetailPage());
}

// Pop back
private async void OnBackClick(object? sender, RoutedEventArgs e)
{
    await Navigation.PopAsync();
}

// Pop to root from anywhere in the stack
private async void OnGoHomeClick(object? sender, RoutedEventArgs e)
{
    await Navigation.PopToRootAsync();
}
```

### Tracking Stack Depth and Current Page

```csharp
private void UpdateStatus()
{
    StatusText.Text = $"Depth: {Navigation.StackDepth}";
    HeaderText.Text = $"Current: {Navigation.NavigationStack[^1].Header}";
    CanGoBackText.Text = Navigation.CanGoBack ? "Can go back" : "At root";
}
```

### Hiding the Navigation Bar for a Page

```xml
<ContentPage NavigationPage.HasNavigationBar="False"
             Header="Full Screen">
    <!-- content fills the entire NavigationPage area -->
</ContentPage>
```

```csharp
NavigationPage.SetHasNavigationBar(page, false);
```

<img src={NavigationPageNoNavbarScreenshot} alt="" />

### Hiding the Back Button

```xml
<ContentPage NavigationPage.HasBackButton="False" Header="Start">
    <!-- user cannot navigate back from here -->
</ContentPage>
```

```csharp
NavigationPage.SetHasBackButton(page, false);
```

### Custom Back Button Content

Replace the default back arrow with custom text or a control:

```csharp
NavigationPage.SetBackButtonContent(page, new TextBlock { Text = "Home" });
```

<img src={NavigationPageCustomBackScreenshot} alt="" />

### Per-Page TopCommandBar

Assign a command bar to a child page. It is rendered in the navigation bar area when that page is at the top of the stack.

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MyApp.ItemsPage"
             Header="Items"
             NavigationPage.TopCommandBar="{x:Reference TopBar}">

    <CommandBar x:Name="TopBar">
        <CommandBar.PrimaryCommands>
            <AppBarButton Label="Add"    Click="OnAddClick" />
            <AppBarButton Label="Filter" Click="OnFilterClick" />
        </CommandBar.PrimaryCommands>
    </CommandBar>

    <ListBox ItemsSource="{Binding Items}" />

</ContentPage>
```

<img src={NavigationPageTopCommandBarScreenshot} alt="" />

### Page Transitions

Set a transition on the `NavigationPage` to animate pushes and pops:

```csharp
// Horizontal slide (default direction)
var navPage = new NavigationPage(new HomePage())
{
    PageTransition = new PageSlide(TimeSpan.FromMilliseconds(300))
};

// Cross-fade
navPage.PageTransition = new CrossFade(TimeSpan.FromMilliseconds(250));

// No animation
await Navigation.PushAsync(new DetailPage(), transition: null);
```

### Modal Pages

Present a page that covers the full `NavigationPage` area. Useful for login flows, pickers, or any full-screen dialog:

```csharp
// Present modally
await Navigation.PushModalAsync(new LoginPage());

// Dismiss
await Navigation.PopModalAsync();

// Dismiss all modals at once
await Navigation.PopAllModalsAsync();

// Check how many modals are open
int modalCount = Navigation.ModalStack.Count;
```

<img src={NavigationPageModalScreenshot} alt="" />

### Modal Transitions

```csharp
var navPage = new NavigationPage(new HomePage())
{
    ModalTransition = new CrossFade(TimeSpan.FromMilliseconds(300))
};
```

### Customizing the Bar Height

```csharp
// Global default
var navPage = new NavigationPage(new HomePage())
{
    BarHeight = 64
};

// Override for a single page
NavigationPage.SetBarHeightOverride(page, 56);
```

<img src={NavigationPageAppearanceScreenshot} alt="" />

### Navigation Bar Shadow

```csharp
navPage.HasShadow = true;
```

### Overlay Navigation Bar

Use `BarLayoutBehavior.Overlay` so the bar floats above a hero image or map:

```xml
<ContentPage NavigationPage.BarLayoutBehavior="Overlay"
             Header="Map">
    <!-- content extends behind the bar -->
    <MapView />
</ContentPage>
```

<img src={NavigationPageOverlayBarScreenshot} alt="" />

### Replacing the Login Screen After Sign-In

After a successful login, replace the root page so the user cannot navigate back to the login screen:

```csharp
private async void OnLoginSuccess()
{
    // Remove the login page and push the main page
    Navigation.InsertPage(new MainPage(), before: Navigation.NavigationStack[0]);
    await Navigation.PopToRootAsync(transition: null);
}
```

Or use `ReplaceAsync` to swap the top page:

```csharp
await Navigation.ReplaceAsync(new HomePage());
```

### DrawerPage Integration

When `NavigationPage` is the `Content` of a `DrawerPage`, a hamburger toggle appears in the navigation bar at the root of the stack. It disappears when the user navigates deeper.

```csharp
var shell = new DrawerPage
{
    Drawer  = new MenuPage(),
    Content = new NavigationPage(new HomePage())
};
window.Page = shell;
```

<img src={NavigationPageDrawerIntegrationScreenshot} alt="" />

### Disabling Back-Swipe Gesture

```csharp
navPage.IsGestureEnabled = false;
```

## More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_NavigationPage).
:::

:::info
View the source code on _GitHub_ [`NavigationPage.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Page/NavigationPage.cs)
:::
