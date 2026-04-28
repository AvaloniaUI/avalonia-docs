---
title: NavigationPage
description: '`NavigationPage` provides stack-based page navigation. It includes a navigation bar, a back button, and optional page-specific command bars.'
doc-type: reference
---

import NavigationBasicExample from '/img/controls/navigationpage/navigation-basic-example.gif';
import NavigationLoginModal from '/img/controls/navigationpage/navigation-login-modal.gif';
import NavigationPagePushedScreenshot from '/img/controls/navigationpage/navigationpage-pushed.png';
import NavigationPageCustomBackScreenshot from '/img/controls/navigationpage/navigationpage-custom-back-button.png';
import NavigationPageNoNavbarScreenshot from '/img/controls/navigationpage/navigationpage-no-navbar.png';
import NavigationPageNoBackButtonScreenshot from '/img/controls/navigationpage/navigationpage-no-back-button.png';
import NavigationPageOverlayBarScreenshot from '/img/controls/navigationpage/navigationpage-overlay-bar.png';
import NavigationPageTopCommandBarScreenshot from '/img/controls/navigationpage/navigationpage-top-commandbar.png';
import NavigationPageModalScreenshot from '/img/controls/navigationpage/navigationpage-modal.png';
import NavigationPageDrawerIntegrationScreenshot from '/img/controls/navigationpage/navigationpage-drawer-integration.png';

`NavigationPage` provides stack-based navigation. Pages are built as individual instances of [`ContentPage`](/controls/navigation/contentpage), and are pushed onto and popped off the stack through `INavigation`. A navigation bar is rendered at the top of the page by default, showing the current page title and a back button. Optional command bars can be rendered on child pages.

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
| `Overlay` | The navigation bar floats above the page content. Content extends behind the bar. Handle the inset via [`SafeAreaPadding`](/docs/services/insets-manager). |

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

<Image light={NavigationBasicExample} alt="Animation showing a home page with a navigation bar; clicking 'Go to Details' slides to a detail page with Refresh and Share command buttons in the navigation bar" position="center" maxWidth={400} cornerRadius="true" />
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

### Hiding the navigation bar

<Image light={NavigationPageNoNavbarScreenshot} alt="A detail page with the navigation bar hidden, showing command buttons at the top without a title or back button" position="center" maxWidth={400} cornerRadius="true"/>
<br />

<Tabs>

  <TabItem label="XAML" value="xaml">
  ```xml
  <ContentPage NavigationPage.HasNavigationBar="False">
      <!-- content -->
  </ContentPage>
  ```
  </TabItem>

  <TabItem label="C#" value="cs">
  ```csharp
  NavigationPage.SetHasNavigationBar(page, false);
  ```
  </TabItem>

</Tabs>

### Hiding the back button

<Image light={NavigationPageNoBackButtonScreenshot} alt="A navigation bar showing the 'Details' page title without a back button" position="center" maxWidth={400} cornerRadius="true"/>
<br />

<Tabs>

  <TabItem label="XAML" value="xaml">
  ```xml
  <ContentPage NavigationPage.HasBackButton="False">
      <!-- user cannot navigate back from here -->
  </ContentPage>
  ```
  </TabItem>

  <TabItem label="C#" value="cs">
  ```csharp
  NavigationPage.SetHasBackButton(page, false);
  ```
  </TabItem>

</Tabs>

### Custom back button

Replace the default back arrow with custom text or a control.

In this example, the back arrow is replaced with the text "Go Home" on the detail page by adding this line to the `DetailPage.axaml.cs` code-behind.

<Image light={NavigationPageCustomBackScreenshot} alt="A navigation bar showing 'Go Home' as a custom back button label next to the Details page title" position="center" maxWidth={400} cornerRadius="true"/>
<br />

```csharp
NavigationPage.SetBackButtonContent(this, new TextBlock { Text = "Go Home" });
```

### Per-page custom TopCommandBar

Create a custom command bar and assign it to a target page. It is rendered within the navigation bar area when the target page is at the top of the stack.

This example shows a row of custom buttons that are displayed when viewing the detail page. They are placed in a custom [`UserControl`](/controls/primitives/usercontrol) named `TopBar`, defined in independent .axaml and .axaml.cs files. `TopBar` can then be referenced in the `DetailPage.axaml.cs` code-behind file.

<Image light={NavigationPageTopCommandBarScreenshot} alt="A navigation bar with a back button, 'Details' title, and a top command bar containing Refresh, Share, Filter, and Add New buttons on the right" position="center" maxWidth={400} cornerRadius="true"/>
<br />

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

### Page transitions

To animate page pushes and pops, go into the code-behind file of where the `NavigationPage` control appears (`MainWindow.axaml.cs`, in this example). Then, set the `PageTransition` property on the `NavigationPage`.

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

Present a modal page that covers the full `NavigationPage` area.

This example shows a mock login page. It is called by `PushModalAsync` from the home page. Clicking Login dismisses the modal with `PopModalAsync`, whereas clicking Cancel dismisses all open modals with `PopAllModalsAsync`.

<Image light={NavigationLoginModal} alt="Animation showing a modal login page with email and password fields being presented over the home page and dismissed" position="center" maxWidth={400} cornerRadius="true" />
<br />

<Tabs>

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
        <Button Content="Login"
                Click="OnLoginClick"
                HorizontalAlignment="Center"/>
    </StackPanel>
  </ContentPage>
  ```
  </TabItem>

  <TabItem label="HomePage.axaml.cs" value="homePageCs">
  ```csharp
  using Avalonia.Controls;
  using Avalonia.Interactivity;

  namespace TestApp1.Views;

  public partial class HomePage : ContentPage
  {
      public HomePage()
      {
          InitializeComponent();
      }

      private async void OnLoginClick(object? sender, RoutedEventArgs e)
      {
          if (Navigation is not null)
              await Navigation.PushModalAsync(new LoginPage());
      }
  }
  ```
  </TabItem>

  <TabItem label="LoginPage.axaml" value="loginPageXaml">
  ```xml
  <ContentPage xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="TestApp1.Views.LoginPage"
             Header="Login">

    <StackPanel HorizontalAlignment="Center"
                VerticalAlignment="Center"
                Spacing="20">

        <TextBlock Text="Sign In"
                   FontSize="24"
                   HorizontalAlignment="Center"/>

        <StackPanel Spacing="4">
            <TextBlock Text="Email"/>
            <TextBox Name="EmailBox"
                     Watermark="Enter your email"/>
        </StackPanel>

        <StackPanel Spacing="4">
            <TextBlock Text="Password"/>
            <TextBox Name="PasswordBox"
                     Watermark="Enter your password"
                     PasswordChar="•"/>
        </StackPanel>

        <Button Content="Login"
                Click="OnLoginClick"/>

        <Button Content="Cancel"
                Click="OnCancelClick"/>

    </StackPanel>
  </ContentPage>
  ```
  </TabItem>

  <TabItem label="LoginPage.axaml.cs" value="loginPageCs">
  ```csharp
  using Avalonia.Controls;
  using Avalonia.Interactivity;

  namespace TestApp1.Views;

  public partial class LoginPage : ContentPage
  {
      public LoginPage()
      {
          InitializeComponent();
      }

      private async void OnLoginClick(object? sender, RoutedEventArgs e)
      {
          // This is where you specify your actual login auth logic
          if (Navigation is not null)
              await Navigation.PopModalAsync();
      }

      private async void OnCancelClick(object? sender, RoutedEventArgs e)
      {
          // Cancel button dismisses all open modals
          if (Navigation is not null)
              await Navigation.PopAllModalsAsync();
      }
  }
  ```
  </TabItem>

</Tabs>

### Count number of modals open

```csharp
int modalCount = Navigation.ModalStack.Count;
```

### Modal transitions

To animate modal pushes and pops, set the `ModalTransition` property on the `NavigationPage` control. This works similarly as [`PageTransition`](#page-transitions).

<Tabs>

  <TabItem label="XAML" value="xaml">
  ```xml
  <NavigationPage>
    <NavigationPage.ModalTransition>
        <CrossFade Duration="0:0:0.30"/>
    </NavigationPage.ModalTransition>
  </NavigationPage>
  ```
  </TabItem>

  <TabItem label="C#" value="cs">
  ```csharp
  using Avalonia.Animation; // Add this "using" statement to use Avalonia's built-in animations

  public partial class MainWindow : Window
  {
      public MainWindow()
      {
          InitializeComponent();

          // Select the NavigationPage control named "Nav"
          var nav = this.FindControl<NavigationPage>("Nav");

          // Set a cross-fade modal transition
          nav.ModalTransition = new CrossFade(TimeSpan.FromMilliseconds(300));
      }
  }
  ```
  </TabItem>

</Tabs>

### Overlay navigation bar

Use `BarLayoutBehavior.Overlay` to make the bar float above a hero image or map.

```xml
<ContentPage NavigationPage.BarLayoutBehavior="Overlay"
             Header="Map">
    <!-- content extends behind the bar -->
    <MapView />
</ContentPage>
```

<Image light={NavigationPageOverlayBarScreenshot} alt="A page with the navigation bar overlaid on top of content, with a back button and share icon floating above a game app header image" position="center" maxWidth={250} cornerRadius="true"/>

### Replacing the login screen after sign-in

After a successful login, replace the root page so the user cannot navigate back to the login screen.

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

### DrawerPage integration

When `NavigationPage` is the `Content` of a [`DrawerPage`](/controls/navigation/drawerpage), a hamburger toggle appears in the navigation bar at the root of the stack. It disappears when the user navigates deeper.

```csharp
var shell = new DrawerPage
{
    Drawer  = new MenuPage(),
    Content = new NavigationPage { Content = new HomePage() }
};
window.Page = shell;
```

<Image light={NavigationPageDrawerIntegrationScreenshot} alt="A navigation bar at the root page showing a hamburger toggle button on the left to open the drawer" position="center" maxWidth={250} cornerRadius="true"/>

### Disabling the go-back swipe gesture

```csharp
navPage.IsGestureEnabled = false;
```

## See also

- [API reference](/api/avalonia/controls/navigationpage)
- [Source code](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Page/NavigationPage.cs)
