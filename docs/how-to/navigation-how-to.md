---
id: navigation-how-to
title: "How to: Navigate between views"
description: Common patterns for switching between views and pages in Avalonia applications.
doc-type: how-to
---

This guide covers common patterns for switching between views (pages) in your Avalonia applications. Each pattern suits a different scenario, from simple two-page apps to full desktop shells with history navigation.

## Choosing a navigation pattern

Before you start, consider which pattern fits your requirements:

| Pattern | Best for |
|---|---|
| [`ContentControl`](/api/avalonia/controls/contentcontrol) with data templates | Small apps with a few fixed pages |
| [`TransitioningContentControl`](/api/avalonia/controls/transitioningcontentcontrol) | Same as above, but with animated transitions |
| `TabControl` | Settings screens, document editors |
| Sidebar navigation | Desktop apps with a primary menu |
| Back-stack navigation | Wizard flows, browser-style history |

## View switching with ContentControl

The simplest navigation pattern uses a `ContentControl` that displays different view models, with data templates to resolve the corresponding view.

```xml
<Window x:Class="MyApp.Views.MainWindow"
        xmlns:vm="using:MyApp.ViewModels"
        xmlns:views="using:MyApp.Views">
    <Window.DataTemplates>
        <DataTemplate DataType="vm:HomeViewModel">
            <views:HomeView />
        </DataTemplate>
        <DataTemplate DataType="vm:SettingsViewModel">
            <views:SettingsView />
        </DataTemplate>
    </Window.DataTemplates>

    <Grid RowDefinitions="Auto,*">
        <StackPanel Grid.Row="0" Orientation="Horizontal" Spacing="8" Margin="8">
            <Button Content="Home" Command="{Binding GoHomeCommand}" />
            <Button Content="Settings" Command="{Binding GoSettingsCommand}" />
        </StackPanel>

        <ContentControl Grid.Row="1" Content="{Binding CurrentPage}" />
    </Grid>
</Window>
```

The view model:

```csharp
public partial class MainViewModel : ObservableObject
{
    [ObservableProperty]
    private ObservableObject _currentPage;

    public MainViewModel()
    {
        _currentPage = new HomeViewModel();
    }

    [RelayCommand]
    private void GoHome() => CurrentPage = new HomeViewModel();

    [RelayCommand]
    private void GoSettings() => CurrentPage = new SettingsViewModel();
}
```

When `CurrentPage` changes, the `ContentControl` looks up the matching [`DataTemplate`](/api/avalonia/markup/xaml/templates/datatemplate) and displays the corresponding view automatically. This works because Avalonia walks up the visual tree looking for a `DataTemplate` whose `DataType` matches the object assigned to `Content`.

:::tip
If you have many view models, listing every `DataTemplate` by hand becomes tedious. See the [View locator pattern](#view-locator-pattern) later in this guide for an automatic alternative.
:::

## View switching with transitions

You can add a page transition for animated view changes by replacing `ContentControl` with `TransitioningContentControl`:

```xml
<TransitioningContentControl Content="{Binding CurrentPage}">
    <TransitioningContentControl.PageTransition>
        <CrossFade Duration="0:0:0.25" />
    </TransitioningContentControl.PageTransition>
</TransitioningContentControl>
```

The following built-in transitions are available:

| Transition | Effect |
|---|---|
| `CrossFade` | Fades between old and new content |
| `PageSlide` | Slides content horizontally or vertically |
| `CompositePageTransition` | Combines multiple transitions together |

```xml
<!-- Slide transition -->
<TransitioningContentControl.PageTransition>
    <PageSlide Duration="0:0:0.3" Orientation="Horizontal" />
</TransitioningContentControl.PageTransition>

<!-- Combined: slide + fade -->
<TransitioningContentControl.PageTransition>
    <CompositePageTransition>
        <CrossFade Duration="0:0:0.2" />
        <PageSlide Duration="0:0:0.3" Orientation="Horizontal" />
    </CompositePageTransition>
</TransitioningContentControl.PageTransition>
```

## Tab-based navigation

Use `TabControl` when you want your users to switch between a fixed set of panels, such as settings categories or document tabs.

```xml
<TabControl>
    <TabItem Header="General">
        <views:GeneralSettingsView />
    </TabItem>
    <TabItem Header="Appearance">
        <views:AppearanceSettingsView />
    </TabItem>
    <TabItem Header="Advanced">
        <views:AdvancedSettingsView />
    </TabItem>
</TabControl>
```

### Dynamic tabs from a collection

When you need tabs driven by data (for example, open documents), bind `ItemsSource` to a collection in your view model.

```xml
<TabControl ItemsSource="{Binding OpenDocuments}"
            SelectedItem="{Binding ActiveDocument}">
    <TabControl.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Spacing="8">
                <TextBlock Text="{Binding Title}" />
                <Button Content="x" FontSize="10"
                        Command="{Binding $parent[TabControl].((vm:MainViewModel)DataContext).CloseDocumentCommand}"
                        CommandParameter="{Binding}" />
            </StackPanel>
        </DataTemplate>
    </TabControl.ItemTemplate>
    <TabControl.ContentTemplate>
        <DataTemplate>
            <views:DocumentView />
        </DataTemplate>
    </TabControl.ContentTemplate>
</TabControl>
```

## Sidebar navigation

A common desktop pattern places a persistent menu in a sidebar while the main content area swaps views. This example uses a `ListBox` for the menu and a `TransitioningContentControl` for the content.

```xml
<Grid ColumnDefinitions="220,*">
    <!-- Sidebar -->
    <Border Grid.Column="0" Background="#F3F4F6">
        <ListBox ItemsSource="{Binding MenuItems}"
                 SelectedItem="{Binding SelectedMenuItem}"
                 Background="Transparent">
            <ListBox.ItemTemplate>
                <DataTemplate>
                    <StackPanel Orientation="Horizontal" Spacing="8" Margin="8,4">
                        <PathIcon Data="{Binding Icon}" Width="16" Height="16" />
                        <TextBlock Text="{Binding Title}" />
                    </StackPanel>
                </DataTemplate>
            </ListBox.ItemTemplate>
        </ListBox>
    </Border>

    <!-- Content area -->
    <TransitioningContentControl Grid.Column="1" Content="{Binding CurrentPage}" />
</Grid>
```

```csharp
public partial class MainViewModel : ObservableObject
{
    public ObservableCollection<MenuItem> MenuItems { get; } = new()
    {
        new MenuItem("Home", "HomeIcon", () => new HomeViewModel()),
        new MenuItem("Settings", "SettingsIcon", () => new SettingsViewModel()),
        new MenuItem("About", "InfoIcon", () => new AboutViewModel()),
    };

    [ObservableProperty]
    private MenuItem? _selectedMenuItem;

    [ObservableProperty]
    private ObservableObject? _currentPage;

    partial void OnSelectedMenuItemChanged(MenuItem? value)
    {
        CurrentPage = value?.CreatePage();
    }
}

public record MenuItem(string Title, string Icon, Func<ObservableObject> CreatePage);
```

## Navigation with back stack

If your application needs browser-style back and forward buttons (for example, a wizard or a file browser), you can maintain a history of visited pages using two stacks.

```csharp
public partial class NavigationViewModel : ObservableObject
{
    private readonly Stack<ObservableObject> _backStack = new();
    private readonly Stack<ObservableObject> _forwardStack = new();

    [ObservableProperty]
    private ObservableObject? _currentPage;

    public bool CanGoBack => _backStack.Count > 0;
    public bool CanGoForward => _forwardStack.Count > 0;

    public void NavigateTo(ObservableObject page)
    {
        if (CurrentPage is not null)
            _backStack.Push(CurrentPage);

        _forwardStack.Clear();
        CurrentPage = page;

        OnPropertyChanged(nameof(CanGoBack));
        OnPropertyChanged(nameof(CanGoForward));
    }

    [RelayCommand(CanExecute = nameof(CanGoBack))]
    private void GoBack()
    {
        if (CurrentPage is not null)
            _forwardStack.Push(CurrentPage);

        CurrentPage = _backStack.Pop();

        OnPropertyChanged(nameof(CanGoBack));
        OnPropertyChanged(nameof(CanGoForward));
        GoBackCommand.NotifyCanExecuteChanged();
        GoForwardCommand.NotifyCanExecuteChanged();
    }

    [RelayCommand(CanExecute = nameof(CanGoForward))]
    private void GoForward()
    {
        if (CurrentPage is not null)
            _backStack.Push(CurrentPage);

        CurrentPage = _forwardStack.Pop();

        OnPropertyChanged(nameof(CanGoBack));
        OnPropertyChanged(nameof(CanGoForward));
        GoBackCommand.NotifyCanExecuteChanged();
        GoForwardCommand.NotifyCanExecuteChanged();
    }
}
```

```xml
<Grid RowDefinitions="Auto,*">
    <StackPanel Grid.Row="0" Orientation="Horizontal" Spacing="4" Margin="8">
        <Button Content="Back" Command="{Binding GoBackCommand}" />
        <Button Content="Forward" Command="{Binding GoForwardCommand}" />
    </StackPanel>

    <TransitioningContentControl Grid.Row="1" Content="{Binding CurrentPage}" />
</Grid>
```

## View locator pattern

Instead of declaring a `DataTemplate` for every view model, you can use a view locator to resolve views automatically by convention. The locator replaces `ViewModel` in the fully qualified type name with `View` and instantiates the result.

```csharp
public class ViewLocator : IDataTemplate
{
    public Control Build(object? data)
    {
        if (data is null) return new TextBlock { Text = "No data" };

        var name = data.GetType().FullName!
            .Replace("ViewModel", "View", StringComparison.Ordinal);

        var type = Type.GetType(name);

        if (type is not null)
            return (Control)Activator.CreateInstance(type)!;

        return new TextBlock { Text = $"View not found: {name}" };
    }

    public bool Match(object? data)
    {
        return data is ObservableObject;
    }
}
```

Register the locator in `App.axaml` so it applies globally:

```xml
<Application.DataTemplates>
    <local:ViewLocator />
</Application.DataTemplates>
```

Now any `ContentControl` bound to a view model will automatically resolve its view. For example, `HomeViewModel` maps to `HomeView`, and `SettingsViewModel` maps to `SettingsView`.

:::note
This convention requires that your view and view model classes live in parallel namespaces (for example, `MyApp.ViewModels.HomeViewModel` and `MyApp.Views.HomeView`). If your project uses a different folder structure, adjust the string replacement logic in the `Build` method accordingly.
:::

## See also

- [Page transitions](/docs/graphics-animation/page-transitions): Transition animations between views.
- [Data templates](/docs/data-templates/introduction-to-data-templates): How data templates resolve views.
- [View locator](/docs/data-templates/view-locator): Automatic view-model to view mapping.
- [The MVVM pattern](/docs/fundamentals/the-mvvm-pattern): View model architecture.
