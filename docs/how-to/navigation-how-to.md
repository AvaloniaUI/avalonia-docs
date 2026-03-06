---
id: navigation-how-to
title: "How to: Navigate Between Views"
---

This guide covers common patterns for switching between views (pages) in Avalonia applications.

## View Switching with ContentControl

The simplest navigation pattern uses a `ContentControl` that displays different view models, with data templates to resolve the corresponding view:

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

When `CurrentPage` changes, the `ContentControl` looks up the matching `DataTemplate` and displays the corresponding view.

## View Switching with Transitions

Add a page transition for animated view changes using `TransitioningContentControl`:

```xml
<TransitioningContentControl Content="{Binding CurrentPage}">
    <TransitioningContentControl.PageTransition>
        <CrossFade Duration="0:0:0.25" />
    </TransitioningContentControl.PageTransition>
</TransitioningContentControl>
```

Available transitions:

| Transition | Effect |
|---|---|
| `CrossFade` | Fades between old and new content |
| `PageSlide` | Slides content horizontally or vertically |
| `CompositePageTransition` | Combines multiple transitions |

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

## Tab-Based Navigation

Use `TabControl` for tabbed navigation:

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

## Sidebar Navigation

A common desktop pattern with a sidebar menu:

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

## Navigation with Back Stack

Maintain a history of visited pages:

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

## View Locator Pattern

Instead of explicit `DataTemplate` declarations, use a view locator to automatically find views for view models:

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

Register it in `App.axaml`:

```xml
<Application.DataTemplates>
    <local:ViewLocator />
</Application.DataTemplates>
```

Now any `ContentControl` bound to a view model will automatically resolve its view. `HomeViewModel` maps to `HomeView`, `SettingsViewModel` maps to `SettingsView`, and so on.

## See Also

- [Page Transitions](/docs/graphics-animation/page-transitions): Transition animations between views.
- [Data Templates](/docs/data-templates/introduction-to-data-templates): How data templates resolve views.
- [View Locator](/docs/data-templates/view-locator): Automatic view-model to view mapping.
- [The MVVM Pattern](/docs/fundamentals/the-mvvm-pattern): View model architecture.
