---
id: dialogs-how-to
title: "How to: Work with Dialogs"
description: Create and show modal dialogs, return results, and build custom dialog windows in Avalonia.
doc-type: how-to
---

This guide covers creating and showing modal dialogs, returning results, and building custom dialog windows.

## Showing a Dialog Window

Create a dialog window and show it modally with `ShowDialog<T>`:

```csharp
var dialog = new ConfirmDialog();
dialog.DataContext = new ConfirmDialogViewModel("Delete this item?");

// ShowDialog returns a result when the dialog closes
bool? result = await dialog.ShowDialog<bool?>(parentWindow);

if (result == true)
{
    DeleteItem();
}
```

The `parentWindow` parameter sets the owner. On desktop platforms, the dialog appears centered over the owner window and prevents interaction with it until closed.

## Creating a Dialog Window

A dialog is a regular `Window` with some typical settings:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="MyApp.Views.ConfirmDialog"
        Title="Confirm"
        Width="400" Height="200"
        WindowStartupLocation="CenterOwner"
        CanResize="False"
        ShowInTaskbar="False">
    <Grid RowDefinitions="*,Auto" Margin="20">
        <TextBlock Grid.Row="0" Text="{Binding Message}"
                   TextWrapping="Wrap" VerticalAlignment="Center" />

        <StackPanel Grid.Row="1" Orientation="Horizontal"
                    HorizontalAlignment="Right" Spacing="8">
            <Button Content="Cancel" Command="{Binding CancelCommand}" />
            <Button Content="OK" Command="{Binding ConfirmCommand}" />
        </StackPanel>
    </Grid>
</Window>
```

### Closing with a result

Close the dialog and return a value using `Window.Close(result)`:

```csharp
public partial class ConfirmDialog : Window
{
    public ConfirmDialog()
    {
        InitializeComponent();
    }
}
```

```csharp
public partial class ConfirmDialogViewModel : ObservableObject
{
    private readonly Window _dialog;

    public string Message { get; }

    public ConfirmDialogViewModel(Window dialog, string message)
    {
        _dialog = dialog;
        Message = message;
    }

    [RelayCommand]
    private void Confirm() => _dialog.Close(true);

    [RelayCommand]
    private void Cancel() => _dialog.Close(false);
}
```

Set up the dialog and its view model:

```csharp
var dialog = new ConfirmDialog();
var vm = new ConfirmDialogViewModel(dialog, "Delete this item?");
dialog.DataContext = vm;

bool? result = await dialog.ShowDialog<bool?>(this);
```

### Alternative: Close from code-behind

If you prefer to keep the close logic in the view:

```csharp
public partial class ConfirmDialog : Window
{
    public ConfirmDialog()
    {
        InitializeComponent();
    }

    private void OnOkClick(object? sender, RoutedEventArgs e)
    {
        Close(true);
    }

    private void OnCancelClick(object? sender, RoutedEventArgs e)
    {
        Close(false);
    }
}
```

## Returning Complex Results

Return any object from a dialog:

```csharp
// Dialog that returns a selected color
var dialog = new ColorPickerDialog();
Color? selectedColor = await dialog.ShowDialog<Color?>(parentWindow);

if (selectedColor is not null)
{
    ApplyColor(selectedColor.Value);
}
```

In the dialog:

```csharp
[RelayCommand]
private void Select()
{
    _dialog.Close(SelectedColor);
}

[RelayCommand]
private void Cancel()
{
    _dialog.Close(null);
}
```

## Getting the Parent Window

To show a dialog from a view model or UserControl where you do not have a direct reference to the parent window:

```csharp
// From a UserControl's code-behind
var window = TopLevel.GetTopLevel(this) as Window;
if (window is not null)
{
    var result = await dialog.ShowDialog<bool?>(window);
}
```

From a view model, pass the window through a service or parameter:

```csharp
public interface IDialogService
{
    Task<bool> ShowConfirmAsync(string message);
    Task<string?> ShowInputAsync(string prompt);
}

public class DialogService : IDialogService
{
    private readonly Window _mainWindow;

    public DialogService(Window mainWindow)
    {
        _mainWindow = mainWindow;
    }

    public async Task<bool> ShowConfirmAsync(string message)
    {
        var dialog = new ConfirmDialog();
        dialog.DataContext = new ConfirmDialogViewModel(dialog, message);
        var result = await dialog.ShowDialog<bool?>(_mainWindow);
        return result == true;
    }
}
```

## File and Folder Dialogs

Use the `IStorageProvider` service for file and folder picker dialogs:

```csharp
var topLevel = TopLevel.GetTopLevel(this);
if (topLevel is null) return;

var storage = topLevel.StorageProvider;

// Open file picker
var files = await storage.OpenFilePickerAsync(new FilePickerOpenOptions
{
    Title = "Select a File",
    AllowMultiple = false,
    FileTypeFilter = new[]
    {
        new FilePickerFileType("Text Files") { Patterns = new[] { "*.txt" } },
        new FilePickerFileType("All Files") { Patterns = new[] { "*" } },
    }
});

if (files.Count > 0)
{
    var file = files[0];
    await using var stream = await file.OpenReadAsync();
    // Read file contents
}
```

```csharp
// Save file picker
var file = await storage.SaveFilePickerAsync(new FilePickerSaveOptions
{
    Title = "Save File",
    SuggestedFileName = "document.txt",
    FileTypeChoices = new[]
    {
        new FilePickerFileType("Text Files") { Patterns = new[] { "*.txt" } },
    }
});

if (file is not null)
{
    await using var stream = await file.OpenWriteAsync();
    // Write file contents
}
```

See [Storage Provider](/docs/services/storage/storage-provider) for the full API.

## Preventing Dialog Close

Handle the `Closing` event to prevent the dialog from closing (e.g., when there are unsaved changes):

```csharp
dialog.Closing += (sender, e) =>
{
    if (HasUnsavedChanges)
    {
        e.Cancel = true;
        // Optionally show a confirmation
    }
};
```

## Overlay Dialogs (In-Window)

For dialogs that appear within the window (not as a separate OS window), use an overlay panel:

```xml
<Grid>
    <!-- Main content -->
    <StackPanel Margin="20">
        <Button Content="Show Dialog" Command="{Binding ShowDialogCommand}" />
    </StackPanel>

    <!-- Dialog overlay -->
    <Border Background="#80000000"
            IsVisible="{Binding IsDialogVisible}">
        <Border Background="White" CornerRadius="8"
                HorizontalAlignment="Center" VerticalAlignment="Center"
                Padding="24" MinWidth="300" BoxShadow="0 8 16 0 #40000000">
            <StackPanel Spacing="16">
                <TextBlock Text="Confirm Action" FontWeight="Bold" FontSize="18" />
                <TextBlock Text="Are you sure?" />
                <StackPanel Orientation="Horizontal" Spacing="8"
                            HorizontalAlignment="Right">
                    <Button Content="Cancel" Command="{Binding HideDialogCommand}" />
                    <Button Content="OK" Command="{Binding ConfirmCommand}" />
                </StackPanel>
            </StackPanel>
        </Border>
    </Border>
</Grid>
```

This approach works on all platforms including WebAssembly where separate windows are not supported.

## See Also

- [Window Management](/docs/app-development/window-management): Show, ShowDialog, and window lifecycle.
- [Storage Provider](/docs/services/storage/storage-provider): File and folder picker dialogs.
- [Commanding](/docs/input-interaction/commanding): Binding buttons to commands.
