---
title: NavigationPage
description: '`NavigationPage` provides stack-based page navigation. It includes a navigation bar, a back button, and optional page-specific command bars.'
doc-type: reference
---

import NavigationBasicExample from '/img/controls/navigationpage/navigation-basic-example.gif';
import NavigationPagePushedScreenshot from '/img/controls/navigationpage/navigationpage-pushed.png';
import NavigationPageCustomBackScreenshot from '/img/controls/navigationpage/navigationpage-custom-back-button.png';
import NavigationPageNoNavbarScreenshot from '/img/controls/navigationpage/navigationpage-no-navbar.png';
import NavigationPageNoBackButtonScreenshot from '/img/controls/navigationpage/navigationpage-no-back-button.png';
import NavigationPageOverlayBarScreenshot from '/img/controls/navigationpage/navigationpage-overlay-bar.png';
import NavigationPageTopCommandBarScreenshot from '/img/controls/navigationpage/navigationpage-top-commandbar.png';
import NavigationPageAppearanceScreenshot from '/img/controls/navigationpage/navigationpage-appearance.png';
import NavigationPageModalScreenshot from '/img/controls/navigationpage/navigationpage-modal.png';
import NavigationPageDrawerIntegrationScreenshot from '/img/controls/navigationpage/navigationpage-drawer-integration.png';

`NavigationPage` provides stack-based navigation. Pages, built as individual instances of [`ContentPage`](/controls/navigation/contentpage), are pushed onto and popped off the stack through the `INavigation` interface. A navigation bar is rendered at the top of the page by default, showing the current page title and a back button when the stack depth is greater than 1. Optional command bars can be rendered on child pages.

`NavigationPage` implements `INavigation` directly. The navigation API is available either through `Page.Navigation` on child pages, or through a direct reference to the `NavigationPage` instance.

## Navigation bar layout

The navigation bar contains:

| Zone | Contents |
| ---- | -------- |
| Left | Back button when depth is greater than 1. Hamburger toggle when at the root inside a `DrawerPage`. |
| Center | Page title from the active page's `Header` property. |
| Right | `TopCommandBar` control set via the `NavigationPage.TopCommandBar` attached property. |

## Useful properties

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
| `IsBackButtonEffectivelyVisible` | `bool` | computed | Read-only. The resolved back button visibility, taking into account `IsBackButtonVisible`, the per-page `HasBackButton` attached property, and stack depth. |
| `ModalStack` | `IReadOnlyList<Page>` | computed | Read-only. Currently presented modal pages, oldest at index 0 and topmost last. |
| `NavigationStack` | `IReadOnlyList<Page>` | computed | Read-only. Ordered list of pages on the stack, root first and top last. |
| `IsNavigating` | `bool` | computed | Read-only. `true` while a navigation operation (push, pop, replace, or modal) is in progress. |
| `StackDepth` | `int` | computed | Read-only. Number of pages currently on the navigation stack. |

## Attached properties

Set these on individual child `Page` instances to control per-page navigation bar behavior.

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `NavigationPage.HasNavigationBar` | `bool` | `true` | Shows the navigation bar for a specific page. |
| `NavigationPage.HasBackButton` | `bool` | `true` | Shows the back button for a specific page. |
| `NavigationPage.IsBackButtonEnabled` | `bool` | `true` | Enables the back button for a specific page. |
| `NavigationPage.BackButtonContent` | `object?` | `null` | Custom content rendered inside the back button for a specific page. |
| `NavigationPage.TopCommandBar` | `Control?` | `null` | A control rendered in the right zone of the navigation bar when that page is active. |
| `NavigationPage.BottomCommandBar` | `Control?` | `null` | A control rendered in a command bar area below the page content when that page is active. |
| `NavigationPage.BarLayoutBehavior` | `BarLayoutBehavior?` | `null` | Overrides how the navigation bar is laid out for a specific page. |
| `NavigationPage.BarHeightOverride` | `double?` | `null` | Overrides `BarHeight` for a specific page. |

## BarLayoutBehavior values

| Value | Description |
| ----- | ----------- |
| `Inset` | Default. The navigation bar occupies layout space. Page content is laid out below it. |
| `Overlay` | The navigation bar floats above the page content. Content extends behind the bar and should handle the inset via `SafeAreaPadding`. |

## Navigation methods

Navigation is performed through the `INavigation` interface, accessible via `Page.Navigation` on any child page, or directly on the `NavigationPage` instance.

| Method | Description |
| ------ | ----------- |
| `PushAsync(page)` | Pushes a page with the configured `PageTransition`. |
| `PushAsync(page, transition)` | Pushes with a specific transition. Pass `null` for no animation. |
| `PopAsync()` | Pops the top page with the configured `PageTransition`. |
| `PopAsync(transition)` | Pops with a specific transition. Pass `null` for no animation. |
| `PopToRootAsync()` | Pops all pages down to the root. |
| `PopToRootAsync(transition)` | Pops all pages down to the root, with a specific transition. |
| `PopToPageAsync(page)` | Pops all pages above the specified page. |
| `PopToPageAsync(page, transition)` | Pops all pages above the specified page, with a specific transition. |
| `ReplaceAsync(page)` | Replaces the current top page with a new one. |
| `ReplaceAsync(page, transition)` | Replaces the current top page with a new one, with a specific transition. |
| `InsertPage(page, before)` | Inserts a page immediately before another in the stack, without animation. |
| `RemovePage(page)` | Removes a specific page from the stack, without animation. |
| `PushModalAsync(page)` | Presents a page modally, covering the entire `NavigationPage`. |
| `PushModalAsync(page, transition)` | Presents a page modally with a specific transition. |
| `PopModalAsync()` | Dismisses the top modal page. |
| `PopModalAsync(transition)` | Dismisses the top modal with a specific transition. |
| `PopAllModalsAsync()` | Dismisses all modal pages. |
| `PopAllModalsAsync(transition)` | Dismisses all modals with a specific transition. |

The system back button automatically calls `PopAsync()` when `StackDepth > 1`.

## Events

| Event | Args type | Description |
| ----- | --------- | ----------- |
| `Pushed` | `NavigationEventArgs` | Raised after a page is pushed onto the stack. `args.Page` is the page that was pushed. |
| `Popped` | `NavigationEventArgs` | Raised after a page is popped from the stack. `args.Page` is the page that was removed. |
| `PoppedToRoot` | `NavigationEventArgs` | Raised after `PopToRootAsync` completes. `args.Page` is the new top page (the root). |
| `PageInserted` | `PageInsertedEventArgs` | Raised after `InsertPage` completes. `args.Page` is the inserted page; `args.Before` is the page it was inserted before. |
| `PageRemoved` | `PageRemovedEventArgs` | Raised after `RemovePage` completes. `args.Page` is the page that was removed. |
| `ModalPushed` | `ModalPushedEventArgs` | Raised after a modal page is presented. `args.Modal` is the modal page. |
| `ModalPopped` | `ModalPoppedEventArgs` | Raised after a modal page is dismissed. `args.Modal` is the page that was dismissed. |

## Examples

### Basic NavigationPage

<Image light={NavigationBasicExample} position="center" maxWidth={400} cornerRadius="true" />
<br />

A basic implementation of `NavigationPage` with two-page navigation between a home page and detail page, plus a top command bar that appears on the detail page only.

<Tabs groupId="basicExample">

  <TabItem label="MainWindow.axaml" value="mainWindowXaml">
    ```xml
    <NavigationPage>
        <views:HomePage/>
    </NavigationPage>
    ```
  </TabItem>

  <TabItem label="HomePage.axaml" value="homePageXaml">
    ```xml
    <ContentPage xmlns="https://github.com/avaloniaui"
               xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
               x:Class="TestApp1.Views.HomePage"
               Header="Home">
      <StackPanel HorizontalAlignment="Center"
                  VerticalAlignment="Center"
                  Spacing="12">
          <TextBlock Text="Welcome to the Home Page"
                     FontSize="22"
                     FontWeight="SemiBold"
                     HorizontalAlignment="Center"/>
          <TextBlock Text="Click the button to open the detail page."
                     HorizontalAlignment="Center"/>
          <Button Content="Go to Details"
                  Click="OnGoToDetailsClick"
                  HorizontalAlignment="Center"/>
      </StackPanel>
    </ContentPage>
    ```
  </TabItem>

  <TabItem label="HomePage.axaml.cs" value="homePageCs">
    ```csharp
    public partial class HomePage : ContentPage
    {
        public HomePage()
        {
            InitializeComponent();
        }

        private async void OnGoToDetailsClick(object? sender, RoutedEventArgs e)
        {
            if (Navigation is not null)
                await Navigation.PushAsync(new DetailPage());
        }
    }
    ```
  </TabItem>

  <TabItem label="DetailPage.axaml" value="detailPageXaml">
    ```xml
    <ContentPage xmlns="https://github.com/avaloniaui"
                 xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
                 x:Class="TestApp1.Views.DetailPage"
                 Header="Details">

      <ContentPage.TopCommandBar>
          <StackPanel Orientation="Horizontal" Spacing="8">
              <Button Content="Refresh" Click="OnRefreshClick"/>
              <Button Content="Share" Click="OnShareClick"/>
          </StackPanel>
      </ContentPage.TopCommandBar>

      <StackPanel HorizontalAlignment="Center"
                  VerticalAlignment="Center"
                  Spacing="12">
          <TextBlock Text="Detail Page"
                     FontSize="22"
                     FontWeight="SemiBold"
                     HorizontalAlignment="Center"/>
          <TextBlock Text="Use the back button to return to Home."
                     HorizontalAlignment="Center"/>
      </StackPanel>
    </ContentPage>
    ```
  </TabItem>

</Tabs>

### Pushing and popping pages

Access `Navigation` from any child `ContentPage`:

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

### Tracking stack depth and current page

```csharp
private void UpdateStatus()
{
    StatusText.Text = $"Depth: {Navigation.StackDepth}";
    HeaderText.Text = $"Current: {Navigation.NavigationStack[^1].Header}";
    CanGoBackText.Text = Navigation.CanGoBack ? "Can go back" : "At root";
}
```

### Hiding the navigation bar on a page

<Image light={NavigationPageNoNavbarScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>

```xml
<ContentPage NavigationPage.HasNavigationBar="False">
    <!-- content -->
</ContentPage>
```

```csharp
NavigationPage.SetHasNavigationBar(page, false);
```

### Hiding the back button

<Image light={NavigationPageNoBackButtonScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>

```xml
<ContentPage NavigationPage.HasBackButton="False">
    <!-- user cannot navigate back from here -->
</ContentPage>
```

```csharp
NavigationPage.SetHasBackButton(page, false);
```

### Custom back button

Replace the default back arrow with custom text or a control.

In this example, the back arrow is replaced with the text "Go Home" on the detail page by adding this line to the **DetailPage.axaml.cs** code-behind.

<Image light={NavigationPageCustomBackScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>

```csharp
NavigationPage.SetBackButtonContent(this, new TextBlock { Text = "Go Home" });
```

### Per-page custom TopCommandBar

Create a custom command bar and assign it to a target page. It is rendered within the navigation bar area when the target page is at the top of the stack.

In this example, we add a row of custom buttons that are displayed when viewing the detail page. This involves creating a custom [`UserControl`](/controls/primitives/usercontrol) with its own .axaml and .axaml.cs files, then referencing it in the **DetailPage.axaml.cs** code-behind file.

<Image light={NavigationPageTopCommandBarScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>

<Tabs>

  <TabItem label="TopBar.axaml" value="topBarXaml">
    ```xml
    <UserControl xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="TestApp1.Views.TopBar">
    
      <CommandBar>
          <CommandBar.PrimaryCommands>
              <CommandBarButton Label="Refresh"/>
              <CommandBarButton Label="Share"/>
              <CommandBarButton Label="Filter"/>
              <CommandBarButton Label="Add New"/>
          </CommandBar.PrimaryCommands>
      </CommandBar>
    
    </UserControl>
    ```
  </TabItem>

  <TabItem label="TopBar.axaml.cs" value="topBarCs">
    ```csharp
    using Avalonia.Controls;

    namespace TestApp1.Views;

    public partial class TopBar : UserControl
    {
        public TopBar()
        {
            InitializeComponent();
        }
    }
    ```
  </TabItem>

  <TabItem label="DetailPage.axaml.cs" value="detailPageCs">
    ```csharp
    using Avalonia.Controls;

    namespace TestApp1.Views;

    public partial class DetailPage : ContentPage
    {
        public DetailPage()
        {
            InitializeComponent();
            NavigationPage.SetTopCommandBar(this, new TopBar());
        }
    }
    ```
  </TabItem>

</Tabs>

### Page Transitions

To animate page pushes and pops, go into **MainWindow.axaml.cs**, then set the `PageTransition` property on the `NavigationPage` control.

```csharp
using Avalonia.Animation; // Add this "using" statement to use Avalonia's built-in animations

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();

        // Select the NavigationPage control named "Nav"
        var nav = this.FindControl<NavigationPage>("Nav");                                         

        // Horizontal slide (default)
        nav.PageTransition = new PageSlide(TimeSpan.FromMilliseconds(300))

        // Cross-fade                          
        nav.PageTransition = new CrossFade(TimeSpan.FromMilliseconds(300));

        // No animation
        nav.PageTransition = null;
    }
}
```

### Modal pages

Present a page that covers the full `NavigationPage` area. Useful for login flows, pickers, or any full-screen dialog.

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

### Modal transitions

```csharp
var navPage = new NavigationPage
{
    Content = new HomePage(),
    ModalTransition = new CrossFade(TimeSpan.FromMilliseconds(300))
};
```

### Customizing the bar height

```csharp
// Global default
var navPage = new NavigationPage
{
    Content = new HomePage(),
    BarHeight = 64
};

// Override for a single page
NavigationPage.SetBarHeightOverride(page, 56);
```

<Image light={NavigationPageAppearanceScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>

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

<Image light={NavigationPageOverlayBarScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>

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
    Content = new NavigationPage { Content = new HomePage() }
};
window.Page = shell;
```

<Image light={NavigationPageDrawerIntegrationScreenshot} alt="" position="center" maxWidth={400} cornerRadius="true"/>

### Disabling Back-Swipe Gesture

```csharp
navPage.IsGestureEnabled = false;
```

## See also

- [API reference](/api/avalonia/controls/navigationpage)
- [Source code](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Page/NavigationPage.cs)
