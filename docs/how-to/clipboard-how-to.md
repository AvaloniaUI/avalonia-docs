---
id: clipboard-how-to
title: "How to: Use the Clipboard"
description: Copy and paste text, images, and custom data using the Avalonia clipboard API.
doc-type: how-to
---

This guide shows you how to copy and paste text, images, and custom data using the Avalonia clipboard API. You will learn how to obtain a clipboard reference, transfer common data types, register custom formats, and wire up keyboard shortcuts.

## Getting the clipboard

You access the clipboard through `TopLevel`. In a code-behind file you can call `GetTopLevel` on any visual that is part of the tree:

```csharp
var clipboard = TopLevel.GetTopLevel(this)?.Clipboard;
```

If you need clipboard access from a view model, inject `IClipboard` through the constructor so the view model stays testable:

```csharp
public class MainViewModel
{
    private readonly IClipboard? _clipboard;

    public MainViewModel(IClipboard? clipboard)
    {
        _clipboard = clipboard;
    }
}
```

:::tip
All clipboard methods are asynchronous because the underlying platform APIs may require user permission or cross-process communication. Always `await` the calls and handle possible `null` return values.
:::

## Copy text to the clipboard

Use `SetTextAsync` to place a plain-text string on the clipboard:

```csharp
[RelayCommand]
private async Task CopyText()
{
    var clipboard = TopLevel.GetTopLevel(this)?.Clipboard;
    if (clipboard is not null)
    {
        await clipboard.SetTextAsync("Hello, clipboard!");
    }
}
```

## Paste text from the clipboard

Use `TryGetTextAsync` to read plain text. The method returns `null` when no text is available:

```csharp
[RelayCommand]
private async Task PasteText()
{
    var clipboard = TopLevel.GetTopLevel(this)?.Clipboard;
    if (clipboard is not null)
    {
        var text = await clipboard.TryGetTextAsync();
        if (text is not null)
        {
            Content = text;
        }
    }
}
```

## Check clipboard content

Before you paste, you can query which formats the clipboard currently holds. This is useful when your application supports multiple data types and you want to pick the best available format:

```csharp
var clipboard = TopLevel.GetTopLevel(this)?.Clipboard;
if (clipboard is not null)
{
    using var data = await clipboard.TryGetDataAsync();
    if (data is not null)
    {
        if (data.Formats.Contains(DataFormat.Text))
        {
            var text = await data.TryGetTextAsync();
            // Use the text value
        }
    }
}
```

:::note
The `DataTransfer` object returned by `TryGetDataAsync` is disposable. Wrap it in a `using` statement so platform resources are released promptly.
:::

## Copy an image to the clipboard

Load a `Bitmap` and pass it to `SetBitmapAsync`:

```csharp
var clipboard = TopLevel.GetTopLevel(this)?.Clipboard;
if (clipboard is not null)
{
    var bitmap = new Bitmap("assets/photo.png");
    await clipboard.SetBitmapAsync(bitmap);
}
```

## Paste an image from the clipboard

Use `TryGetBitmapAsync` to retrieve an image. The method returns `null` when no image data is available:

```csharp
var clipboard = TopLevel.GetTopLevel(this)?.Clipboard;
if (clipboard is not null)
{
    var bitmap = await clipboard.TryGetBitmapAsync();
    if (bitmap is not null)
    {
        MyImage.Source = bitmap;
    }
}
```

## Copy custom data

Use `DataTransfer` and `DataTransferItem` to place structured data on the clipboard. You first create an application-scoped format with a unique identifier, then populate a `DataTransferItem` with one or more representations. Including a `DataFormat.Text` entry gives other applications a plain-text fallback:

```csharp
var myFormat = DataFormat.CreateBytesApplicationFormat("mycompany-myapp-mydata");

var item = new DataTransferItem();
item.Set(DataFormat.Text, "Plain text fallback");
item.Set(myFormat, mySerializedBytes);

var data = new DataTransfer();
data.Add(item);

await clipboard.SetDataAsync(data);
```

## Paste custom data

To read your custom format back, create the same `DataFormat` and call `TryGetValueAsync`:

```csharp
var myFormat = DataFormat.CreateBytesApplicationFormat("mycompany-myapp-mydata");

using var data = await clipboard.TryGetDataAsync();
if (data is not null)
{
    var bytes = await data.TryGetValueAsync(myFormat);
    if (bytes is not null)
    {
        // Deserialize the byte array into your object
    }
}
```

:::tip
Use the same format identifier string (`"mycompany-myapp-mydata"`) on both the copy and paste sides. The identifier is how the clipboard matches the data to your application format.
:::

## Keyboard shortcuts

The standard clipboard shortcuts (`Ctrl+C`, `Ctrl+V`, `Ctrl+X`) work automatically in built-in text controls such as `TextBox` and `TextPresenter`. For custom controls, bind key gestures to your commands explicitly:

```xml
<UserControl.KeyBindings>
    <KeyBinding Gesture="Ctrl+C" Command="{Binding CopyCommand}" />
    <KeyBinding Gesture="Ctrl+V" Command="{Binding PasteCommand}" />
    <KeyBinding Gesture="Ctrl+X" Command="{Binding CutCommand}" />
</UserControl.KeyBindings>
```

On macOS, Avalonia automatically maps `Cmd+C`, `Cmd+V`, and `Cmd+X` when you specify the `Ctrl` modifier in XAML, so you do not need platform-specific bindings.

## Platform notes

The clipboard API is available on all Avalonia targets, but not every platform supports every data type. The table below summarizes current support:

| Platform | Text | Images | Files | Custom formats |
|---|---|---|---|---|
| Windows | Yes | Yes | Yes | Yes |
| macOS | Yes | Yes | Yes | Yes |
| Linux | Yes | Yes | Varies by desktop environment | Yes |
| Browser (WASM) | Yes (requires permission) | Yes | No | Limited |
| iOS | Yes | Yes | No | Limited |
| Android | Yes | Read only | No | Limited |

On **Browser/WASM**, the browser may prompt the user for clipboard permission the first time your application calls a clipboard method. Your code should handle the case where permission is denied and the call returns `null`.

On **Linux**, file clipboard support depends on the desktop environment and its clipboard manager. Text and image operations work reliably across GNOME, KDE, and other major environments.

## See also

- [Clipboard service](/docs/services/clipboard)
- [Drag and drop how-to](/docs/how-to/drag-and-drop-how-to)
- [Hotkeys](/docs/input-interaction/hotkeys)
