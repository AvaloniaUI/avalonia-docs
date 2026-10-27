---
id: drag-and-drop-how-to
title: "How to: Implement drag and drop"
description: Initiate drags, handle drops, provide visual feedback, and accept file drops in Avalonia.
doc-type: how-to
---

This guide covers common drag-and-drop scenarios: initiating drags, handling drops, providing visual feedback, and accepting file drops.

## Accepting dropped files

One common drag-and-drop scenario is accepting files dragged by the user from the OS file manager into your app.

### XAML setup

Enable dropping by setting `DragDrop.AllowDrop` to `True` on the target element.

```xml
<Border Background="#F3F4F6" Padding="40"
        DragDrop.AllowDrop="True">
    <TextBlock Text="Drop files here"
               HorizontalAlignment="Center" VerticalAlignment="Center" />
</Border>
```

### Code-behind handler

Register handlers for `DragOver` (to indicate which effects you accept) and `Drop` (to process the dropped data).

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

The value you set in `e.DragEffects` also controls the cursor, so that it tells your users what to expect from the drop.

| `DragDropEffects` | Cursor | Meaning |
|---|---|---|
| `None` | No-drop cursor | Drop is not allowed. |
| `Copy` | Copy cursor (+) | Copies the item. |
| `Move` | Move cursor | Moves the item. |
| `Link` | Link cursor | Creates a link or shortcut. |

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

To start a drag from your control (for example, from a list item), call `DragDrop.DoDragDropAsync` and pass the `PointerPressedEventArgs` from the press that begins the drag.

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
Do not dispose the `DataTransfer` you pass to `DoDragDropAsync`, and do not create it in a `using` statement. Avalonia disposes it automatically when the drag operation completes.
:::

### Setting a minimum distance to start the drag

Avoid starting a drag on every `PointerPressed` event, as this turns every click into a drag. Instead, set a minimum distance threshold of pointer movement to confirm the user intends to drag.

To set a distance threshold, store the arguments from `PointerPressed` and pass them to `DoDragDropAsync` only when the pointer has moved the desired distance.

## Drag between lists

Another common pattern is dragging items between two list controls. You can set up one handler to initiate the drag from the source and another to accept the drop on the target.

Both handlers share a custom data format. Because the item is a view model that never leaves your application, you can make it an in-process format.

```csharp
private static readonly DataFormat<ItemViewModel> ItemFormat =
    DataFormat.CreateInProcessFormat<ItemViewModel>("my-app-item");
```

<Tabs>

<TabItem value="source-list" label="Source list">

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

</TabItem>

<TabItem value="target-list" label="Target list">

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

</TabItem>

</Tabs>

## Visual feedback during drag

Providing visual feedback helps your users understand where they can drop. This example changes the drop target's appearance when the user drags something over it. The chosen target is a `Border` with `x:Name="DropZone"` and `DragDrop.AllowDrop="True"`.

Note that the handlers are attached to the drop zone rather than the window. This ensures the highlight appears only when the user drags over the `Border`. Otherwise, it would appear whenever the user drags anywhere in the window.

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

:::tip
Reset the visual state in both the `DragLeave` and `Drop` handlers. If you only reset on `DragLeave`, the highlight remains when the user completes a drop.
:::

## Custom data formats

To transfer your own data, create a typed `DataFormat<T>` and reuse it on the drag source and the drop target.

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

`MyTypeFormat` is a static field created with a `DataFormat` method, for example `DataFormat.CreateInProcessFormat<MyType>("my-app-type")`. See [the `DataFormat<T>` API reference](/api/avalonia/input/dataformat-1) for the full list of available methods and supported data types.

:::warning
Identifiers passed to `CreateStringApplicationFormat` and `CreateBytesApplicationFormat` can contain only ASCII letters, digits, dots (`.`) and hyphens (`-`). MIME-style identifiers, such as `application/x-my-type`, are not accepted.
:::

## Troubleshooting

#### Drop handler does not fire.

Verify that `DragDrop.AllowDrop` is set to `True` on the target element, and that your `DragOver` handler sets `e.DragEffects` to a value other than `None`.

#### Drag starts on a single click.

See [Setting a minimum distance to start the drag](#setting-a-minimum-distance-to-start-the-drag).

#### Cannot convert from `PointerEventArgs` to `PointerPressedEventArgs`.

Since Avalonia 12, `DoDragDropAsync` accepts only arguments from a `PointerPressed` event, and not `Pointer` events. You must store the `PointerPressed` arguments and pass those instead.

#### Custom data is lost across processes.

Data icreated with `CreateInProcessFormat` never leaves the current process. To drag custom data to another process, serialize it to a `string` or `byte[]` and use an application or platform format instead.

#### Need to drag-and-drop multiple data formats.

Call `Set` multiple times on the same `DataTransferItem`, once per format. Then, add the item to the `DataTransfer`. This lets the drop target choose the richest format it supports.

#### Data is disposed during a drag.

Do not dispose the `DataTransfer` you pass to `DoDragDropAsync`. Avalonia automatically disposes it when the drag completes.

## Platform-specific notes

| Platform | Support | Notes |
|---|---|---|
| Windows | Full | Full support for file drops from Explorer, inter-app text and bitmap drops, and custom formats within your application. |
| macOS | Full | File drops from Finder are supported. The system drag cursor respects `DragDropEffects`. |
| Linux (X11, Wayland) | Full | Behavior matches Windows. Wayland compositors may differ slightly in cursor rendering. |
| Browser (WebAssembly) | Limited | File drops from the OS file manager are supported in most browsers. Dragging between elements within your app requires a custom implementation, because the browser handles pointer capture. |
| iOS, Android | Not supported | Drag-and-drop is not available. Consider using long-press gestures or list reorder patterns for similar functionality. |

## See also

- [Drag and Drop](/docs/input-interaction/drag-and-drop): Conceptual overview of the drag-and-drop system.
- [Gestures](/docs/input-interaction/gestures): Touch and pointer gesture recognizers.
- [Storage Provider](/docs/services/storage/storage-provider): File access APIs used with `IStorageItem`.
