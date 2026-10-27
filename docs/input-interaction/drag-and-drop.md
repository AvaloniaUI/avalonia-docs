---
id: drag-and-drop
title: Drag and drop
description: Drag-and-drop events, event arguments, effects, and data formats in Avalonia, for accepting drops and starting drags with DoDragDropAsync.
doc-type: reference
---

Avalonia supports drag-and-drop operations for transferring data between controls, or between your application and the operating system. The drag-and-drop system uses the [`DragDrop`](/api/avalonia/input/dragdrop) static class and the [`DataTransfer`](/api/avalonia/input/datatransfer) type to manage data during operations.

## Accepting drops

To receive dropped content, an element must have the `DragDrop.AllowDrop` attached property set to `True`. Additionally, you must set handlers for the drag-and-drop events.

<Tabs>

<TabItem value="xaml" label="XAML">

```xml
<Border DragDrop.AllowDrop="True"
        Background="LightGray" Padding="40"
        DragDrop.DragEnter="OnDragEnter"
        DragDrop.DragLeave="OnDragLeave"
        DragDrop.DragOver="OnDragOver"
        DragDrop.Drop="OnDrop">
    <TextBlock Text="Drop files here" HorizontalAlignment="Center" />
</Border>
```

</TabItem>

<TabItem value="cs" label="Code-behind">

```csharp
using Avalonia.Controls;
using Avalonia.Input;

namespace MyApp.Views;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }
    private void OnDragEnter(object? sender, DragEventArgs e){}
    private void OnDragLeave(object? sender, DragEventArgs e){}
    private void OnDragOver(object? sender, DragEventArgs e){}
    private void OnDrop(object? sender, DragEventArgs e){}
}
```

</TabItem>

</Tabs>

## Drag-and-drop events

### Events

| Event | When it fires |
|---|---|
| `DragEnter` | The pointer enters the target element while dragging. |
| `DragLeave` | The pointer leaves the target element while dragging. Not raised after `Drop`. |
| `DragOver` | The pointer moves over the target element while dragging. Fires continuously. |
| `Drop` | The user releases the pointer over the target element. |

### Event arguments

All of the events listed above provide `DragEventArgs` with these properties:

| Property | Description |
|---|---|
| `DataTransfer` | The `IDataTransfer` object containing the dragged data. |
| `DragEffects` | Allowed and requested drag effects. Set this to indicate what your target accepts. |
| `KeyModifiers` | Current keyboard modifiers (Ctrl, Shift, Alt). |
| `GetPosition(Visual)` | Returns the pointer position relative to the specified visual element. |

## Handling drop events

Here are the basic implementations of event handlers for dragging and dropping.

```csharp
private void OnDragOver(object? sender, DragEventArgs e)
{
    // Check if the data is accepted.
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
        var files = e.DataTransfer.TryGetFiles();
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

## `DragDropEffects`

The `DragDropEffects` flags enum indicates what operations are permitted. Set `e.DragEffects` in `DragOver` to control the cursor feedback and in `Drop` to indicate the result of the operation.

| Value | Cursor | Meaning |
|---|---|---|
| `None` | No-drop cursor | Drop is not allowed. |
| `Copy` | Copy cursor (+) | Copies the data to the target. |
| `Move` | Move cursor | Moves the data to the target. |
| `Link` | Link cursor | Creates a link or shortcut to the original data. |

## Starting a drag operation

To initiate a drag-and-drop operation from your control, call `DragDrop.DoDragDropAsync` and pass the `PointerPressedEventArgs` of the press that starts the drag. Create a `DataTransfer` object containing the data to drag.

For more usage examples of drag operations, see [How to: Implement drag and drop](/docs/how-to/drag-and-drop-how-to).

```csharp
private async void OnPointerPressed(object? sender, PointerPressedEventArgs e)
{
    var dragData = new DataTransfer();
    dragData.Add(DataTransferItem.CreateText("Hello from drag!"));

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

## Data transfer and data formats

The `DataTransfer` class is a mutable container for drag-and-drop data. Use `DataFormat` static properties for standard formats.

See the [`DataFormat<T>` API reference](/api/avalonia/input/dataformat-1) for the full list of available methods and supported data types.

| Format | Type | Description |
|---|---|---|
| `DataFormat.Text` | `string` | Plain text |
| `DataFormat.Bitmap` | `Bitmap` | Bitmap image data |
| `DataFormat.File` | `IStorageItem` | File system items |

You can also create custom formats, for example:

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
    var files = e.DataTransfer.TryGetFiles();
}
```

## Complete example

This example creates a drop zone that accepts text and files.

<Tabs>

<TabItem value="xaml" label="XAML">

```xml
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

</TabItem>

<TabItem value="cs" label="Code-behind">

```csharp
using System.Linq;
using Avalonia.Controls;
using Avalonia.Input;
using Avalonia.Media;

namespace MyApp.Views;

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
            var files = e.DataTransfer.TryGetFiles();
            if (files != null)
            {
                StatusText.Text = $"Dropped {files.Count()} file(s)";
            }
        }
    }
}
```

</TabItem>

</Tabs>

## Handling events in XAML vs code

Drag-and-drop events are attached events on the `DragDrop` class. You can handle them in XAML using event attribute syntax, or register them explicitly in code.

The `DragDrop` class provides `Add*Handler` and `Remove*Handler` static methods for each event: `DragEnter`, `DragLeave`, `DragOver`, and `Drop`.

```csharp
// Register in code
DragDrop.AddDropHandler(myBorder, OnDrop);

// Remove handler
DragDrop.RemoveDropHandler(myBorder, OnDrop);
```

## See also

- [How to: Implement drag and drop](/docs/how-to/drag-and-drop-how-to): Practical examples showing how to implement common uses of drag-and-drop.
- [Pointer Events](/docs/input-interaction/pointer): Detecting pointer movement for initiating drags.
- [Clipboard](/docs/services/clipboard): Sharing data via the clipboard.
- [Storage Provider](/docs/services/storage/storage-provider): Working with files and folders.
