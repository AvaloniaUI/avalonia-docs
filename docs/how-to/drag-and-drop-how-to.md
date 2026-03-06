---
id: drag-and-drop-how-to
title: "How To: Implement Drag and Drop"
---

This guide covers common drag-and-drop scenarios: initiating drags, handling drops, visual feedback, and file drops.

## Accepting Dropped Files

The most common drag-and-drop scenario is accepting files dragged from the OS file manager.

### XAML setup

Enable drop by setting `DragDrop.AllowDrop`:

```xml
<Border Background="#F3F4F6" Padding="40"
        DragDrop.AllowDrop="True">
    <TextBlock Text="Drop files here"
               HorizontalAlignment="Center" VerticalAlignment="Center" />
</Border>
```

### Code-behind handler

```csharp
public MainWindow()
{
    InitializeComponent();

    DragDrop.AddDropHandler(this, OnDrop);
    DragDrop.AddDragOverHandler(this, OnDragOver);
}

private void OnDragOver(object? sender, DragEventArgs e)
{
    // Indicate we accept file drops
    e.DragEffects = e.DataTransfer.Formats.Contains(DataFormat.File)
        ? DragDropEffects.Copy
        : DragDropEffects.None;
}

private void OnDrop(object? sender, DragEventArgs e)
{
    if (e.DataTransfer.GetFiles() is { } files)
    {
        foreach (var file in files)
        {
            var path = file.Path.LocalPath;
            // Process the file
        }
    }
}
```

## Accepting Dropped Text

```csharp
private void OnDrop(object? sender, DragEventArgs e)
{
    if (e.DataTransfer.TryGetText() is { } text)
    {
        // Use the dropped text
        ViewModel.Content = text;
    }
}
```

## Initiating a Drag Operation

Start a drag from your control (for example, from a list item):

```csharp
private async void OnPointerPressed(object? sender, PointerPressedEventArgs e)
{
    if (sender is not Control control) return;

    var dragData = new DataTransfer();
    dragData.Set(DataFormat.Text, "Dragged item text");

    var result = await DragDrop.DoDragDropAsync(e, dragData, DragDropEffects.Copy | DragDropEffects.Move);

    if (result == DragDropEffects.Move)
    {
        // Item was moved, remove from source
    }
}
```

## Drag Between Lists

A common pattern is dragging items between two list controls.

### Source list

```csharp
private async void SourceList_PointerPressed(object? sender, PointerPressedEventArgs e)
{
    if (sender is ListBox listBox && listBox.SelectedItem is ItemViewModel item)
    {
        var data = new DataTransfer();
        data.Set("application/x-my-item", item);

        var result = await DragDrop.DoDragDropAsync(e, data, DragDropEffects.Move);

        if (result == DragDropEffects.Move)
            ViewModel.SourceItems.Remove(item);
    }
}
```

### Target list

```csharp
private void TargetList_Drop(object? sender, DragEventArgs e)
{
    if (e.DataTransfer.Get("application/x-my-item") is ItemViewModel item)
    {
        ViewModel.TargetItems.Add(item);
        e.DragEffects = DragDropEffects.Move;
    }
}
```

## Visual Feedback During Drag

Change the drop target's appearance when dragging over it:

```csharp
public MainWindow()
{
    InitializeComponent();

    var dropZone = this.FindControl<Border>("DropZone");

    DragDrop.AddDragEnterHandler(this, (s, e) =>
    {
        dropZone.BorderBrush = Brushes.Blue;
        dropZone.BorderThickness = new Thickness(2);
    });

    DragDrop.AddDragLeaveHandler(this, (s, e) =>
    {
        dropZone.BorderBrush = Brushes.Transparent;
        dropZone.BorderThickness = new Thickness(0);
    });

    DragDrop.AddDropHandler(this, (s, e) =>
    {
        dropZone.BorderBrush = Brushes.Transparent;
        dropZone.BorderThickness = new Thickness(0);
        // Handle drop...
    });
}
```

## Setting the Drag Cursor

Control the cursor shown during drag to communicate the allowed operation:

```csharp
private void OnDragOver(object? sender, DragEventArgs e)
{
    if (e.DataTransfer.Formats.Contains(DataFormat.File))
    {
        e.DragEffects = DragDropEffects.Copy;
    }
    else
    {
        e.DragEffects = DragDropEffects.None;
    }
}
```

| DragDropEffects | Cursor | Meaning |
|---|---|---|
| `None` | No-drop cursor | Drop not allowed. |
| `Copy` | Copy cursor (+) | Item will be copied. |
| `Move` | Move cursor | Item will be moved. |
| `Link` | Link cursor | A link/shortcut will be created. |

## Custom Data Formats

Transfer custom objects using a string key:

```csharp
// Set
var data = new DataTransfer();
data.Set("application/x-my-custom-type", myObject);

// Get
if (e.DataTransfer.Get("application/x-my-custom-type") is MyType obj)
{
    // Use obj
}
```

## Data Formats Reference

| Format | Constant | Description |
|---|---|---|
| Text | `DataFormat.Text` | Plain text string. |
| Bitmap | `DataFormat.Bitmap` | Bitmap image data. |
| File | `DataFormat.File` | File system items (`IStorageItem`). |
| Custom | Any string key | Application-defined data. |

## Platform Notes

- **Desktop** (Windows, macOS, Linux): Full drag-and-drop support including file drops from the OS.
- **Browser/WASM**: Limited. File drops from the OS may work; inter-element drag requires custom implementation.
- **Mobile**: Drag-and-drop is not commonly used. Consider long-press gestures or reorder patterns instead.

## See Also

- [Drag and Drop](/docs/input-interaction/drag-and-drop): Conceptual overview.
- [Gestures](/docs/input-interaction/gestures): Touch gesture recognizers.
- [Storage Provider](/docs/services/storage/storage-provider): File access APIs.
