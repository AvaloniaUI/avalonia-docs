---
id: clipboard-how-to
title: "How to: Use the Clipboard"
---

This guide covers clipboard operations: copying and pasting text, images, and custom data.

## Getting the Clipboard

Access the clipboard through `TopLevel`:

```csharp
var clipboard = TopLevel.GetTopLevel(this)?.Clipboard;
```

Or from a view model with a reference to the top-level:

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

## Copy Text to Clipboard

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

## Paste Text from Clipboard

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

## Check Clipboard Content

Query what formats are available before pasting:

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
        }
    }
}
```

## Copy an Image to Clipboard

```csharp
var clipboard = TopLevel.GetTopLevel(this)?.Clipboard;
if (clipboard is not null)
{
    var bitmap = new Bitmap("assets/photo.png");
    await clipboard.SetBitmapAsync(bitmap);
}
```

## Paste an Image from Clipboard

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

## Copy Custom Data

Use `DataTransfer` and `DataTransferItem` to place structured data on the clipboard:

```csharp
var myFormat = DataFormat.CreateBytesApplicationFormat("mycompany-myapp-mydata");

var item = new DataTransferItem();
item.Set(DataFormat.Text, "Plain text fallback");
item.Set(myFormat, mySerializedBytes);

var data = new DataTransfer();
data.Add(item);

await clipboard.SetDataAsync(data);
```

## Paste Custom Data

```csharp
var myFormat = DataFormat.CreateBytesApplicationFormat("mycompany-myapp-mydata");

using var data = await clipboard.TryGetDataAsync();
if (data is not null)
{
    var bytes = await data.TryGetValueAsync(myFormat);
    if (bytes is not null)
    {
        // Deserialize
    }
}
```

## Keyboard Shortcuts

The standard clipboard shortcuts (Ctrl+C, Ctrl+V, Ctrl+X) work automatically in text controls. For custom controls, bind key gestures to your commands:

```xml
<UserControl.KeyBindings>
    <KeyBinding Gesture="Ctrl+C" Command="{Binding CopyCommand}" />
    <KeyBinding Gesture="Ctrl+V" Command="{Binding PasteCommand}" />
    <KeyBinding Gesture="Ctrl+X" Command="{Binding CutCommand}" />
</UserControl.KeyBindings>
```

## Platform Notes

| Platform | Text | Images | Files | Custom Formats |
|---|---|---|---|---|
| Windows | Yes | Yes | Yes | Yes |
| macOS | Yes | Yes | Yes | Yes |
| Linux | Yes | Yes | Varies by DE | Yes |
| Browser/WASM | Yes (requires permission) | Yes | No | Limited |
| iOS | Yes | Yes | No | Limited |
| Android | Yes | Read only | No | Limited |

## See Also

- [Clipboard Service](/docs/services/clipboard): API reference.
- [Drag and Drop How-To](/docs/how-to/drag-and-drop-how-to): Transfer data via drag operations.
- [Keyboard and Hotkeys](/docs/input-interaction/keyboard-and-hotkeys): Key bindings.
