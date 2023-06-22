---
id: clipboard
title: Clipboard
---

The `Clipboard` class enables interacting with the system clipboard, providing functionality for setting and retrieving text, clearing the clipboard, handling data objects and working with different data formats. 

:::info
For a complete, runnable example of these concepts in action, check out [the sample application](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/ClipboardOps).
:::

## Methods 

### GetTextAsync()

Retrieves text from the clipboard asynchronously. This method returns a `Task<string?>` that represents the operation. The resulting value of the task is the text from the clipboard. If the clipboard doesn't contain text or is empty, the method returns `null`.

```cs
Task<string?> GetTextAsync()
```

### SetTextAsync(string? text)
Sets the clipboard text asynchronously. This method accepts a `string?` parameter and returns a `Task` that represents the operation. If the provided text is `null`, the clipboard will be cleared.

```cs
Task SetTextAsync(string? text)
```

### ClearAsync()
Clears the clipboard asynchronously. This method returns a `Task` that represents the operation.

```cs
Task ClearAsync()
```

### SetDataObjectAsync(IDataObject data)
Sets the clipboard content to the specified data object asynchronously. This method accepts an `IDataObject` parameter and returns a `Task` that represents the operation. The data object can contain multiple data formats.

```cs
Task SetDataObjectAsync(IDataObject data)
```

### GetFormatsAsync()
Retrieves the list of formats currently stored in the clipboard asynchronously. This method returns a `Task<string[]>` that represents the operation. The resulting value of the task is an array of string format names.

```cs
Task<string[]> GetFormatsAsync()
```

### GetDataAsync(string format)
Retrieves data in the specified format from the clipboard asynchronously. This method returns a `Task<object?>` that represents the operation. The resulting value of the task is the clipboard data in the specified format. If there's no data in the clipboard in the specified format, the method returns `null`.

```cs
Task<object?> GetDataAsync(string format)
```





