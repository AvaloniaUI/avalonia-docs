---
id: clipboard-how-to
title: "How To: Use the Clipboard"
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
        var text = await clipboard.GetTextAsync();
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
    var formats = await clipboard.GetFormatsAsync();

    if (formats.Contains(DataFormats.Text))
    {
        var text = await clipboard.GetTextAsync();
    }
}
```

## Copy Custom Data

Use `DataObject` to place structured data on the clipboard:

```csharp
var data = new DataObject();
data.Set(DataFormats.Text, "Plain text fallback");
data.Set("application/x-my-data", mySerializedData);

await clipboard.SetDataObjectAsync(data);
```

## Paste Custom Data

```csharp
var data = await clipboard.GetDataAsync("application/x-my-data");
if (data is byte[] bytes)
{
    // Deserialize
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

| Platform | Text | Files | Custom Formats |
|---|---|---|---|
| Windows | Yes | Yes | Yes |
| macOS | Yes | Yes | Yes |
| Linux | Yes | Varies by DE | Yes |
| Browser/WASM | Yes (requires permission) | No | Limited |
| Android/iOS | Yes | No | Limited |

## See Also

- [Clipboard Service](/docs/services/clipboard): API reference.
- [Drag and Drop How-To](/docs/how-to/drag-and-drop-how-to): Transfer data via drag operations.
- [Keyboard and Hotkeys](/docs/input-interaction/keyboard-and-hotkeys): Key bindings.
