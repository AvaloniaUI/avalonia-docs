---
title: ContentPage
description: REFERENCE - Built-in Controls
---

import ContentPageInNavigationScreenshot from '/img/reference/controls/contentpage/contentpage-in-navigationpage.png';
import ContentPageStandaloneScreenshot from '/img/reference/controls/contentpage/contentpage-standalone.png';
import ContentPageTopCommandBarScreenshot from '/img/reference/controls/contentpage/contentpage-top-commandbar.png';
import ContentPageBottomCommandBarScreenshot from '/img/reference/controls/contentpage/contentpage-bottom-commandbar.png';
import ContentPageSafeAreaDisabledScreenshot from '/img/reference/controls/contentpage/contentpage-safe-area-disabled.png';
import ContentPageAsTabScreenshot from '/img/reference/controls/contentpage/contentpage-as-tab.png';

# ContentPage

`ContentPage` is the foundational screen building block for Avalonia apps. It holds a single root view, typically a layout panel, and integrates with the other page containers: `NavigationPage`, `TabbedPage`, and `DrawerPage`. Every screen in an app that uses the page navigation system is typically a `ContentPage` or a subclass of it.

The class hierarchy is `ContentPage -> Page -> TemplatedControl`, which means it benefits from full Avalonia styling, theming, and data binding.

## How the Header Displays

The `Header` property from the `Page` base class controls the title text shown in context:

| Host | How `Header` is used |
| ---- | -------------------- |
| `NavigationPage` | Displayed as the page title in the navigation bar. |
| `TabbedPage` | Displayed as the tab label in the tab strip. |
| `DrawerPage` | Not shown by the container directly. |
| Standalone `Window` | Not shown. Set `Window.Title` instead. |

## Useful Properties

You will probably use these properties most often:

`ContentPage` inherits from `Page`. The following properties are defined by `ContentPage` itself.

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `Content` | `object?` | `null` | The single root view displayed on the page. This is the XAML content property. Typically a layout panel such as `Grid`, `StackPanel`, or `ScrollView`. |
| `ContentTemplate` | `IDataTemplate?` | `null` | Data template used to display `Content` when it is a data object rather than a control. |
| `AutomaticallyApplySafeAreaPadding` | `bool` | `true` | When `true`, platform safe-area insets (notch, status bar, home indicator) are automatically applied as padding to the content presenter. Set to `false` for full-bleed designs such as maps or splash screens. |
| `TopCommandBar` | `object?` | `null` | Content rendered in a command bar slot above the page content. Typically a `CommandBar`. Hidden automatically when `null`. |
| `BottomCommandBar` | `object?` | `null` | Content rendered in a command bar slot below the page content. Useful for a bottom toolbar on mobile. Hidden automatically when `null`. |
| `HorizontalContentAlignment` | `HorizontalAlignment` | `Stretch` | Horizontal alignment of `Content` inside its presenter. |
| `VerticalContentAlignment` | `VerticalAlignment` | `Stretch` | Vertical alignment of `Content` inside its presenter. |

## Page Base Properties

Inherited from `Page` and available on all page types.

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `Header` | `object?` | `null` | Text or custom view shown in the navigation bar or tab strip. Accepts a string or any Avalonia control. |
| `Icon` | `object?` | `null` | Icon shown in the tab strip when hosted in a `TabbedPage`. Accepts a `Geometry`, `PathIcon`, `IImage`, or SVG path string. |
| `SafeAreaPadding` | `Thickness` | `default` | The safe-area insets currently active for this page, propagated by the parent page or platform. |
| `Navigation` | `INavigation?` | `null` | Navigation service injected by the parent `NavigationPage`. `null` when the page is not inside a `NavigationPage`. |
| `IsInNavigationPage` | `bool` | `false` | `true` while this page is hosted inside a `NavigationPage`. Useful to conditionally show or hide in-page back navigation controls. |

## Navigation Events

`Page` defines three navigation lifecycle events. They fire in this order whenever the user navigates to or from the page.

| Order | Event | Signature | Description |
| ----- | ----- | --------- | ----------- |
| 1 | `Navigating` | `Func<NavigatingFromEventArgs, Task>` | Fired asynchronously before leaving the current page. Each registered handler is awaited in order. Set `args.Cancel = true` to abort the navigation. |
| 2 | `NavigatedFrom` | `EventHandler<NavigatedFromEventArgs>` | Fired after the page is no longer the active page. Use this to release resources or stop timers. |
| 3 | `NavigatedTo` | `EventHandler<NavigatedToEventArgs>` | Fired when the page becomes the active page. Use this to load or refresh data. |

There is also a routed event for the platform back button:

| Event | Description |
| ----- | ----------- |
| `PageNavigationSystemBackButtonPressed` | Bubbling routed event raised when the platform back button is pressed while this page is active. Handle it to intercept or customize back navigation. |

### Overriding Lifecycle Methods

Override the virtual methods in a subclass instead of subscribing to the events directly:

```csharp
public partial class FeedPage : ContentPage
{
    private CancellationTokenSource? _cts;

    protected override void OnNavigatedTo(NavigatedToEventArgs args)
    {
        base.OnNavigatedTo(args);
        _cts = new CancellationTokenSource();
        _ = LoadDataAsync(_cts.Token);
    }

    protected override void OnNavigatingFrom(NavigatingFromEventArgs args)
    {
        // Synchronous pre-navigation hook.
        // For async work, subscribe to the Navigating event instead.
    }

    protected override void OnNavigatedFrom(NavigatedFromEventArgs args)
    {
        base.OnNavigatedFrom(args);
        _cts?.Cancel();
        _cts = null;
    }

    private async Task LoadDataAsync(CancellationToken ct) { /* ... */ }
}
```

`NavigatedTo` and `NavigatedFrom` are different from Avalonia's `Loaded` and `Unloaded` events. `Loaded` fires once when the control joins the visual tree. `NavigatedTo` fires every time the page becomes the top page, including when the user navigates back to it after visiting a child page. Use `NavigatedTo` for data that must be refreshed on every visit.

## Example

### Minimal ContentPage in XAML

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MyApp.HomePage"
             Header="Home">

    <VerticalStackLayout Padding="20" Spacing="16">
        <TextBlock Text="Hello, Avalonia!" FontSize="24" />
        <Button Content="Go to Details" Click="OnGoToDetailsClick" />
    </VerticalStackLayout>

</ContentPage>
```

### ContentPage in Code

```csharp
var page = new ContentPage
{
    Header = "Home",
    Content = new VerticalStackLayout
    {
        Spacing = 16,
        Margin = new Thickness(20),
        Children =
        {
            new TextBlock { Text = "Hello, Avalonia!", FontSize = 24 },
            new Button { Content = "Go to Details" }
        }
    }
};
```

The page looks like this when hosted inside a `NavigationPage`:

<img src={ContentPageInNavigationScreenshot} alt="" />

Without a navigation container, only the page content is shown:

<img src={ContentPageStandaloneScreenshot} alt="" />

### ContentPage as a Window Root

Set the page directly on a window, optionally wrapped in a `NavigationPage` for stack navigation:

```csharp
// Without navigation
window.Page = new MainPage();

// With navigation support
window.Page = new NavigationPage(new MainPage());
```

### ContentPage with a Scrollable Layout

Wrap the layout in a `ScrollView` when the content may be taller than the screen:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MyApp.ProfilePage"
             Header="Profile">

    <ScrollView>
        <VerticalStackLayout Padding="20" Spacing="12">
            <Image Source="avatar.png"
                   Width="80" Height="80"
                   HorizontalAlignment="Center" />
            <TextBlock Text="{Binding FullName}"
                       FontSize="20"
                       HorizontalAlignment="Center" />
            <TextBlock Text="{Binding Bio}"
                       TextWrapping="Wrap" />
        </VerticalStackLayout>
    </ScrollView>

</ContentPage>
```

### ContentPage with MVVM Binding

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             xmlns:vm="clr-namespace:MyApp.ViewModels"
             x:Class="MyApp.LoginPage"
             Header="Sign In"
             x:DataType="vm:LoginViewModel">

    <VerticalStackLayout Padding="32" Spacing="16" VerticalAlignment="Center">
        <TextBox Watermark="Email"
                 Text="{Binding Email}" />
        <TextBox Watermark="Password"
                 PasswordChar="*"
                 Text="{Binding Password}" />
        <Button Content="Sign In"
                Command="{Binding SignInCommand}"
                HorizontalAlignment="Stretch" />
        <TextBlock Text="{Binding ErrorMessage}"
                   Foreground="Red"
                   IsVisible="{Binding HasError}" />
    </VerticalStackLayout>

</ContentPage>
```

### TopCommandBar

Place a `CommandBar` or any other control in the `TopCommandBar` slot. The slot is hidden automatically when the value is `null`.

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MyApp.DocumentPage"
             Header="Document">

    <ContentPage.TopCommandBar>
        <CommandBar>
            <CommandBar.PrimaryCommands>
                <AppBarButton Label="Save"  Click="OnSaveClick">
                    <AppBarButton.Icon>
                        <PathIcon Data="M15,9H5V5H15M12,19A3,3 0 0,1..." />
                    </AppBarButton.Icon>
                </AppBarButton>
                <AppBarButton Label="Share" Click="OnShareClick">
                    <AppBarButton.Icon>
                        <PathIcon Data="M18,16.08C17.24,16.08..." />
                    </AppBarButton.Icon>
                </AppBarButton>
            </CommandBar.PrimaryCommands>
            <CommandBar.SecondaryCommands>
                <AppBarButton Label="Export as PDF" Click="OnExportClick" />
                <AppBarButton Label="Print"         Click="OnPrintClick" />
            </CommandBar.SecondaryCommands>
        </CommandBar>
    </ContentPage.TopCommandBar>

    <ScrollView>
        <TextBox AcceptsReturn="True" Text="{Binding DocumentText}" />
    </ScrollView>

</ContentPage>
```

<img src={ContentPageTopCommandBarScreenshot} alt="" />

### BottomCommandBar

`BottomCommandBar` works the same way and is placed below the page content. Useful for a mobile action bar:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MyApp.PhotoPage"
             Header="Photo">

    <ContentPage.BottomCommandBar>
        <CommandBar>
            <CommandBar.PrimaryCommands>
                <AppBarButton Label="Like"    Click="OnLikeClick" />
                <AppBarButton Label="Comment" Click="OnCommentClick" />
                <AppBarButton Label="Share"   Click="OnShareClick" />
            </CommandBar.PrimaryCommands>
        </CommandBar>
    </ContentPage.BottomCommandBar>

    <Image Source="{Binding PhotoSource}" Stretch="UniformToFill" />

</ContentPage>
```

<img src={ContentPageBottomCommandBarScreenshot} alt="" />

### Cancelling Navigation with Unsaved Changes

The `Navigating` event handler is async. You can await dialogs or async validation before deciding to cancel:

```csharp
public partial class EditPage : ContentPage
{
    public bool HasUnsavedChanges { get; set; }

    public EditPage()
    {
        InitializeComponent();
        Navigating += OnNavigatingAsync;
    }

    private async Task OnNavigatingAsync(NavigatingFromEventArgs args)
    {
        if (!HasUnsavedChanges) return;

        var dialog = new ConfirmDialog("You have unsaved changes. Discard them?");
        bool confirmed = await dialog.ShowAsync();
        if (!confirmed)
            args.Cancel = true;
    }
}
```

### Intercepting the System Back Button

Override `OnSystemBackButtonPressed` to handle hardware or OS-level back navigation:

```csharp
public partial class WizardPage : ContentPage
{
    private int _step;

    protected override bool OnSystemBackButtonPressed()
    {
        if (_step > 0)
        {
            _step--;
            UpdateStep();
            return true; // handled, do not navigate back
        }
        return false; // let the NavigationPage handle it
    }
}
```

### Refreshing Data on Every Visit

```csharp
public partial class CartPage : ContentPage
{
    private readonly CartViewModel _vm;

    public CartPage(CartViewModel vm)
    {
        _vm = vm;
        DataContext = vm;
        InitializeComponent();
    }

    protected override void OnNavigatedTo(NavigatedToEventArgs args)
    {
        base.OnNavigatedTo(args);
        // Runs every time this page comes to the front,
        // including when the user pops back from a child page.
        _ = _vm.RefreshCartAsync();
    }
}
```

### Full-Bleed Layout Without Safe-Area Padding

Use this for pages with hero images, maps, or other content that should extend under the status bar:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MyApp.SplashPage"
             AutomaticallyApplySafeAreaPadding="False">

    <Grid>
        <Image Source="hero.jpg" Stretch="UniformToFill" />
        <TextBlock Text="Welcome"
                   VerticalAlignment="Bottom"
                   Margin="20,0,20,40"
                   FontSize="32"
                   Foreground="White" />
    </Grid>

</ContentPage>
```

<img src={ContentPageSafeAreaDisabledScreenshot} alt="" />

### ContentPage as a Tab with an Icon

```csharp
var homePage = new ContentPage
{
    Header = "Home",
    Icon   = Geometry.Parse("M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"),
    Content = homeView
};
```

<img src={ContentPageAsTabScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_ContentPage).
:::

:::info
View the source code on _GitHub_ [`ContentPage.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Page/ContentPage.cs) and [`Page.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Page/Page.cs)
:::
