---
id: clipboard
title: Clipboard
---

The `Clipboard` class enables interacting with the system clipboard, providing functionality for setting and retrieving text, clearing the clipboard, handling data objects and working with different data formats. 

<GitHubSampleLink title="Clipboard" link="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/ClipboardOps"/>


The `Clipboard` can be access through an instance of `TopLevel` or `Window`, for more details on accessing `TopLevel` please visit [TopLevel](../toplevel) page:
```cs
var clipboard = window.Clipboard;
```

## Methods 

### GetTextAsync()

Retrieves text from the clipboard asynchronously. The resulting value of the task is the text from the clipboard. If the clipboard doesn't contain text or is empty, the method returns `null`.

```cs
Task<string?> GetTextAsync()
```

:::note
Avalonia clipboard always operates with Unicode text.
:::

### SetTextAsync(string? text)
Sets the clipboard text asynchronously and flushes it immediately. This method accepts a `string?` parameter for a text that needs to be copied. If the provided text is `null`, the clipboard will be cleared.

```cs
Task SetTextAsync(string? text)
```

:::note
Unlikely different Win32 clipboard APIs, Avalonia clipboard always flushes data and is never delayed.
:::

### ClearAsync()
Clears the clipboard asynchronously flushes it immediately.

```cs
Task ClearAsync()
```

### SetDataObjectAsync(IDataObject data)
Sets the clipboard content to the specified data object asynchronously. This method accepts an `IDataObject` parameter. The data object can contain multiple data formats.

```cs
Task SetDataObjectAsync(IDataObject data)
```

:::note
Unlikely different Win32 clipboard APIs, Avalonia clipboard always flushes data and is never delayed.
:::

### GetFormatsAsync()
Retrieves the list of formats currently stored in the clipboard asynchronously. The resulting value of the task is an array of string format names.

```cs
Task<string[]> GetFormatsAsync()
```

### GetDataAsync(string format)
Retrieves data in the specified format from the clipboard asynchronously. This method returns a `Task<object?>` that represents the operation. The resulting value of the task is the clipboard data in the specified format. If there's no data in the clipboard in the specified format, the method returns `null`.

```cs
Task<object?> GetDataAsync(string format)
```

## Creating a DataObject to be sent to the clipboard

You can store objects on the clipboard on some platforms with different formats.

```csharp title='C#'
private async void CopyButton_OnClick(object? sender, RoutedEventArgs args)
{
    var clipboard = TopLevel.GetTopLevel(this)?.Clipboard;
    var dataObject = new DataObject();
    dataObject.Set(DataFormats.Text, "Hello World");
    await clipboard.SetDataObjectAsync(dataObject);
}
```

## Platform compatibility:

| Feature        |  Windows | macOS | Linux x11 | Browser | Android |  iOS |
|---------------|-------|-------|-------|-------|-------|-------|
| `GetTextAsync` | ✔ | ✔ | ✔ | ✔** | ✔ | ✔ |
| `SetTextAsync` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| `ClearAsync` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| `GetFormatsAsync` | ✔ | ✔ | ✔ | ✖* | ✖* | ✖* |
| `SetDataObjectAsync` | ✔ | ✔ | ✔ | ✖* | ✖* | ✖* |
| `GetDataAsync` | ✔ | ✔ | ✔ | ✖* | ✖* | ✖* |

\* Technically possible, but wasn't implemented yet. Contributions are welcome!

** In the Mozilla browser, the GetTextAsync method only functions after the "Paste" gesture has been triggered, typically by using Ctrl+V.