---
id: drag-and-drop-how-to
title: "How to: Implement Drag and Drop"
description: Initiate drags, handle drops, provide visual feedback, and accept file drops in Avalonia.
doc-type: how-to
---

This guide covers common drag-and-drop scenarios: initiating drags, handling drops, providing visual feedback, and accepting file drops.

## Accepting dropped files

The most common drag-and-drop scenario is accepting files that your users drag from the OS file manager.

### XAML setup

Enable dropping by setting `DragDrop.AllowDrop` to `True` on the target element:

```xml
<Border Background="#F3F4F6" Padding="40"
        DragDrop.AllowDrop="True">
    <TextBlock Text="Drop files here"
               HorizontalAlignment="Center" VerticalAlignment="Center" />
</Border>
```

### Code-behind handler

Register handlers for `DragOver` (to indicate which effects you accept) and `Drop` (to process the dropped data):

```csharp
public MainWindow()
{
    InitializeComponent();

    DragDrop.AddDropHandler(this, OnDrop);
    DragDrop.AddDragOverHandler(this, OnDragOver);
}

private void OnDragOver(object? sender, DragEventArgs e)
{
    // Accept file drops only; reject everything else
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

:::tip
Always set `e.DragEffects` in your `DragOver` handler. If you do not, the platform may show a "not allowed" cursor even when your control can accept the drop.
:::

## Accepting dropped text

You can also accept plain text drops. Use `TryGetText()` to retrieve the string value:

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

## Initiating a drag operation

To start a drag from your control (for example, from a list item), call `DragDrop.DoDragDropAsync` inside a pointer-pressed handler:

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

:::warning
`DoDragDropAsync` captures the pointer. Avoid starting a drag on every `PointerPressed` event. Instead, add a minimum distance threshold or wait for `PointerMoved` to confirm the user intends to drag rather than click.
:::

## Drag between lists

A common pattern is dragging items between two list controls. You set up one handler to initiate the drag from the source and another to accept the drop on the target.

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

In the drop handler, retrieve your custom object and add it to the target collection:

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

## Visual feedback during drag

Providing visual feedback helps your users understand where they can drop. Change the drop target's appearance when the user drags over it:

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

:::tip
Reset the visual state in both the `DragLeave` and `Drop` handlers. If you only reset on `DragLeave`, the highlight will remain when the user completes a drop.
:::

## Setting the drag cursor

You can control the cursor shown during a drag to communicate the allowed operation. Set `e.DragEffects` in your `DragOver` handler:

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
| `None` | No-drop cursor | Drop is not allowed here. |
| `Copy` | Copy cursor (+) | The item will be copied. |
| `Move` | Move cursor | The item will be moved. |
| `Link` | Link cursor | A link or shortcut will be created. |

## Custom data formats

You can transfer custom objects using a string key. Use a MIME-style identifier to avoid collisions with other applications:

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

## Data formats reference

| Format | Constant | Description |
|---|---|---|
| Text | `DataFormat.Text` | Plain text string. |
| Bitmap | `DataFormat.Bitmap` | Bitmap image data. |
| File | `DataFormat.File` | File system items (returns `IStorageItem` instances). |
| Custom | Any string key | Application-defined data of any type. |

## Edge cases and troubleshooting

- **Drop handler not firing:** Verify that `DragDrop.AllowDrop` is set to `True` on the target element and that your `DragOver` handler sets `e.DragEffects` to a value other than `None`.
- **Drag starts on single click:** Add a distance threshold before calling `DoDragDropAsync`. Without one, a simple click triggers a drag, which can confuse your users.
- **Custom data lost across processes:** Custom object types set with `DataTransfer.Set` are only available within the same application. Cross-process drag-and-drop is limited to standard formats such as `DataFormat.Text` and `DataFormat.File`.
- **Multiple data formats:** You can call `DataTransfer.Set` multiple times with different format keys on the same `DataTransfer` instance. This lets drop targets choose the richest format they support.

## Platform notes

| Platform | Support level | Notes |
|---|---|---|
| Windows | Full | File drops from Explorer, inter-app text and bitmap drops, and custom formats within your application all work. |
| macOS | Full | File drops from Finder are supported. The system drag cursor respects `DragDropEffects`. |
| Linux (X11/Wayland) | Full | Behavior matches Windows. Wayland compositors may differ slightly in cursor rendering. |
| Browser (WebAssembly) | Limited | File drops from the OS file manager are supported in most browsers. Dragging between elements within your app requires a custom implementation because the browser handles pointer capture. |
| iOS / Android | Not supported | Drag-and-drop is not available. Consider using long-press gestures or list reorder patterns for similar functionality. |

## See also

- [Drag and Drop](/docs/input-interaction/drag-and-drop): Conceptual overview of the drag-and-drop system.
- [Gestures](/docs/input-interaction/gestures): Touch and pointer gesture recognizers.
- [Storage Provider](/docs/services/storage/storage-provider): File access APIs used with `IStorageItem`.
