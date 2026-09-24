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
    e.DragEffects = e.DataTransfer.Contains(DataFormat.File)
        ? DragDropEffects.Copy
        : DragDropEffects.None;
}

private void OnDrop(object? sender, DragEventArgs e)
{
    if (e.DataTransfer.TryGetFiles() is { } files)
    {
        foreach (var file in files)
        {
            var path = file.Path.LocalPath;
            // Process the file
        }
    }
}
```

The value you set in `e.DragEffects` also controls the cursor, which tells your users what the drop will do:

| DragDropEffects | Cursor | Meaning |
|---|---|---|
| `None` | No-drop cursor | Drop is not allowed. |
| `Copy` | Copy cursor (+) | The item will be copied. |
| `Move` | Move cursor | The item will be moved. |
| `Link` | Link cursor | A link or shortcut will be created. |

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
    dragData.Add(DataTransferItem.CreateText("Dragged item text"));

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

:::note
Do not dispose the `DataTransfer` you pass to `DoDragDropAsync`, and do not create it in a `using` statement. Avalonia disposes it automatically when the drag operation completes.
:::

## Drag between lists

A common pattern is dragging items between two list controls. You set up one handler to initiate the drag from the source and another to accept the drop on the target.

Both handlers share a custom data format. Because the item is a view model that never leaves your application, you can make it an in-process format:

```csharp
private static readonly DataFormat<ItemViewModel> ItemFormat =
    DataFormat.CreateInProcessFormat<ItemViewModel>("my-app-item");
```

### Source list

```csharp
private async void SourceList_PointerPressed(object? sender, PointerPressedEventArgs e)
{
    if (sender is ListBox listBox && listBox.SelectedItem is ItemViewModel item)
    {
        var data = new DataTransfer();
        data.Add(DataTransferItem.Create(ItemFormat, item));

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
    if (e.DataTransfer.TryGetValue(ItemFormat) is { } item)
    {
        ViewModel.TargetItems.Add(item);
        e.DragEffects = DragDropEffects.Move;
    }
}
```

## Visual feedback during drag

Providing visual feedback helps your users understand where they can drop. This example changes the drop target's appearance when the user drags over, assuming the target is a `Border` declared in XAML with `x:Name="DropZone"` and `DragDrop.AllowDrop="True"`:

```csharp
public MainWindow()
{
    InitializeComponent();

    DragDrop.AddDragEnterHandler(DropZone, (s, e) =>
    {
        DropZone.BorderBrush = Brushes.Blue;
        DropZone.BorderThickness = new Thickness(2);
    });

    DragDrop.AddDragLeaveHandler(DropZone, (s, e) =>
    {
        DropZone.BorderBrush = Brushes.Transparent;
        DropZone.BorderThickness = new Thickness(0);
    });

    DragDrop.AddDropHandler(DropZone, (s, e) =>
    {
        DropZone.BorderBrush = Brushes.Transparent;
        DropZone.BorderThickness = new Thickness(0);
        // Handle drop...
    });
}
```

Attach the handlers to the drop zone itself rather than to the window. Otherwise, the highlight appears whenever the user drags anywhere over the window.

:::tip
Reset the visual state in both the `DragLeave` and `Drop` handlers. If you only reset on `DragLeave`, the highlight will remain when the user completes a drop.
:::

## Custom data formats

To transfer your own data, create a typed `DataFormat<T>` once and reuse it on both the drag source and the drop target:

```csharp
// Set
var data = new DataTransfer();
data.Add(DataTransferItem.Create(MyTypeFormat, myObject));

// Get
if (e.DataTransfer.TryGetValue(MyTypeFormat) is { } obj)
{
    // Use obj
}
```

`MyTypeFormat` is a static field created with one of the factory methods in the [data formats reference](#data-formats-reference), for example `DataFormat.CreateInProcessFormat<MyType>("my-app-type")`.

:::caution
Identifiers passed to `CreateStringApplicationFormat` and `CreateBytesApplicationFormat` can contain only ASCII letters, digits, dots (`.`) and hyphens (`-`). MIME-style identifiers such as `application/x-my-type` are not accepted.
:::

## Data formats reference

| Format | Data type | Description |
|---|---|---|
| `DataFormat.Text` | `string` | Plain text. |
| `DataFormat.Bitmap` | `Bitmap` | Bitmap image data. |
| `DataFormat.File` | `IStorageItem` | File system items. |
| `DataFormat.CreateInProcessFormat<T>(id)` | Any `T` | Custom data that stays within your application's process. Use this for view models and other live objects. |
| `DataFormat.CreateStringApplicationFormat(id)` | `string` | Custom data specific to your application. Other applications that use the same identifier can read it. |
| `DataFormat.CreateBytesApplicationFormat(id)` | `byte[]` | As above, for binary data. |
| `DataFormat.CreateStringPlatformFormat(id)` | `string` | A native format for the current platform (for example, `text/html`). Any application using the same identifier can read it. |
| `DataFormat.CreateBytesPlatformFormat(id)` | `byte[]` | As above, for binary data. |

## Edge cases and troubleshooting

- **Drop handler not firing:** Verify that `DragDrop.AllowDrop` is set to `True` on the target element and that your `DragOver` handler sets `e.DragEffects` to a value other than `None`.
- **Drag starts on single click:** Add a distance threshold before calling `DoDragDropAsync`. Without one, a simple click triggers a drag, which can confuse your users.
- **Custom data lost across processes:** Data in a format created with `CreateInProcessFormat` never leaves your application. To drag custom data to another process, serialize it to a `string` or `byte[]` and use an application or platform format instead.
- **Multiple data formats:** Call `Set` several times on the same `DataTransferItem`, once per format, then add the item to the `DataTransfer`. This lets drop targets choose the richest format they support.
- **Disposed data during a drag:** Do not dispose the `DataTransfer` you pass to `DoDragDropAsync`. Avalonia disposes it when the drag completes.

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
