---
id: drag-and-drop
title: Drag and Drop
---

Avalonia supports drag-and-drop operations for transferring data between controls or between your application and the operating system. The drag-and-drop system uses the [`DragDrop`](/api/avalonia/input/dragdrop) static class and the [`DataTransfer`](/api/avalonia/input/datatransfer) type to manage data during operations.

## Enabling drop on a target

To receive dropped content, an element must have the `DragDrop.AllowDrop` attached property set to `True` and handlers for the drag-and-drop events:

```xml
<Border DragDrop.AllowDrop="True"
        Background="LightGray" Padding="40"
        DragEnter="OnDragEnter"
        DragLeave="OnDragLeave"
        DragOver="OnDragOver"
        Drop="OnDrop">
    <TextBlock Text="Drop files here" HorizontalAlignment="Center" />
</Border>
```

## Drag-and-drop events

| Event | When it fires |
|---|---|
| `DragEnter` | The pointer enters the target element while dragging. |
| `DragLeave` | The pointer leaves the target element while dragging. |
| `DragOver` | The pointer moves over the target element while dragging. Fires continuously. |
| `Drop` | The user releases the pointer over the target element. |

All events provide a `DragEventArgs` with these properties:

| Property | Description |
|---|---|
| `DataTransfer` | The `IDataTransfer` object containing the dragged data. |
| `DragEffects` | The allowed and requested drag effects. Set this to indicate what your target accepts. |
| `KeyModifiers` | The current keyboard modifiers (Ctrl, Shift, Alt). |
| `GetPosition(Visual)` | Returns the pointer position relative to a given visual element. |

## Handling drop events

```csharp
private void OnDragOver(object? sender, DragEventArgs e)
{
    // Check if we can accept the data
    if (e.DataTransfer.Formats.Contains(DataFormat.File))
    {
        e.DragEffects = DragDropEffects.Copy;
    }
    else
    {
        e.DragEffects = DragDropEffects.None;
    }
}

private void OnDrop(object? sender, DragEventArgs e)
{
    if (e.DataTransfer.Formats.Contains(DataFormat.File))
    {
        var files = e.DataTransfer.GetFiles();
        if (files != null)
        {
            foreach (var file in files)
            {
                // Process each dropped file
                Debug.WriteLine($"Dropped: {file.Name}");
            }
        }
    }
}
```

## DragDropEffects

The `DragDropEffects` flags enum indicates what operations are permitted:

| Value | Description |
|---|---|
| `None` | The drop target does not accept the data. |
| `Copy` | The data is copied to the target. |
| `Move` | The data is moved to the target. |
| `Link` | A link to the original data is created. |

Set `e.DragEffects` in `DragOver` to control the cursor feedback and in `Drop` to indicate the result of the operation.

## Starting a drag operation

To initiate a drag-and-drop operation from your control, call `DragDrop.DoDragDropAsync` in response to a pointer event. Create a `DataTransfer` object containing the data to drag:

```csharp
private async void OnPointerPressed(object? sender, PointerPressedEventArgs e)
{
    var dragData = new DataTransfer();
    dragData.Set(DataFormat.Text, "Hello from drag!");

    var result = await DragDrop.DoDragDropAsync(
        e,
        dragData,
        DragDropEffects.Copy | DragDropEffects.Move);

    // result indicates what the drop target did
    if (result == DragDropEffects.Move)
    {
        // Remove the source data since it was moved
    }
}
```

:::info
`DoDragDropAsync` is asynchronous. The method returns when the user completes or cancels the drag operation. The return value indicates which effect the drop target applied.
:::

## DataTransfer and data formats

The `DataTransfer` class is a mutable container for drag-and-drop data. Use `DataFormat` static properties for standard formats:

| Format | Type | Description |
|---|---|---|
| `DataFormat.Text` | `string` | Plain text. |
| `DataFormat.Bitmap` | `Bitmap` | Bitmap image data. |
| `DataFormat.File` | `IStorageItem` | File system items. |

You can also create custom formats:

```csharp
var myFormat = DataFormat.CreateStringApplicationFormat("myapp-item");
```

### Setting data

```csharp
var data = new DataTransfer();
data.Add(DataTransferItem.Create(DataFormat.Text, "Some text"));
```

### Reading data

```csharp
// In a DragOver or Drop handler
if (e.DataTransfer.Formats.Contains(DataFormat.Text))
{
    var text = e.DataTransfer.TryGetText();
}

if (e.DataTransfer.Formats.Contains(DataFormat.File))
{
    var files = e.DataTransfer.GetFiles();
}
```

## Visual feedback during drag

Use the `DragEnter` and `DragLeave` events to provide visual feedback:

```csharp
private void OnDragEnter(object? sender, DragEventArgs e)
{
    if (sender is Border border)
    {
        border.BorderBrush = Brushes.Blue;
        border.BorderThickness = new Thickness(2);
    }
}

private void OnDragLeave(object? sender, DragEventArgs e)
{
    if (sender is Border border)
    {
        border.BorderBrush = null;
        border.BorderThickness = new Thickness(0);
    }
}
```

## Complete example

This example creates a drop zone that accepts text and files:

```xml title="XAML"
<Border x:Name="DropZone"
        DragDrop.AllowDrop="True"
        Background="#F5F5F5" CornerRadius="8"
        Padding="40" Margin="20"
        BorderBrush="DarkGray" BorderThickness="1">
    <StackPanel Spacing="8" HorizontalAlignment="Center">
        <TextBlock Text="Drop text or files here"
                   HorizontalAlignment="Center" />
        <TextBlock x:Name="StatusText" Foreground="Gray"
                   HorizontalAlignment="Center" />
    </StackPanel>
</Border>
```

```csharp title="Code-behind"
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();

        DragDrop.AddDragOverHandler(DropZone, OnDragOver);
        DragDrop.AddDropHandler(DropZone, OnDrop);
        DragDrop.AddDragEnterHandler(DropZone, OnDragEnter);
        DragDrop.AddDragLeaveHandler(DropZone, OnDragLeave);
    }

    private void OnDragEnter(object? sender, DragEventArgs e)
    {
        DropZone.Background = Brushes.LightBlue;
    }

    private void OnDragLeave(object? sender, DragEventArgs e)
    {
        DropZone.Background = new SolidColorBrush(Color.Parse("#F5F5F5"));
    }

    private void OnDragOver(object? sender, DragEventArgs e)
    {
        e.DragEffects = e.DataTransfer.Formats.Contains(DataFormat.Text)
                     || e.DataTransfer.Formats.Contains(DataFormat.File)
            ? DragDropEffects.Copy
            : DragDropEffects.None;
    }

    private void OnDrop(object? sender, DragEventArgs e)
    {
        DropZone.Background = new SolidColorBrush(Color.Parse("#F5F5F5"));

        if (e.DataTransfer.Formats.Contains(DataFormat.Text))
        {
            StatusText.Text = $"Dropped text: {e.DataTransfer.TryGetText()}";
        }
        else if (e.DataTransfer.Formats.Contains(DataFormat.File))
        {
            var files = e.DataTransfer.GetFiles();
            if (files != null)
            {
                StatusText.Text = $"Dropped {files.Count()} file(s)";
            }
        }
    }
}
```

## Handling events in XAML vs code

Drag-and-drop events are attached events on the `DragDrop` class. You can handle them in XAML using event attribute syntax (as shown above) or register them explicitly in code:

```csharp
// Register in code
DragDrop.AddDropHandler(myBorder, OnDrop);

// Remove handler
DragDrop.RemoveDropHandler(myBorder, OnDrop);
```

The `DragDrop` class provides `Add*Handler` and `Remove*Handler` static methods for each event: `DragEnter`, `DragLeave`, `DragOver`, and `Drop`.

## See also

- [Pointer Events](/docs/input-interaction/pointer): Detecting pointer movement for initiating drags.
- [Clipboard](/docs/services/clipboard): Sharing data via the clipboard.
- [Storage Provider](/docs/services/storage/storage-provider): Working with files and folders.
