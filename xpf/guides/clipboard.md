---
id: clipboard
title: Clipboard
---

## Overview

XPF implements the WPF clipboard API (`System.Windows.Clipboard`) across all platforms. There are some differences from WPF's native Windows implementation that you should be aware of.

## Basic Usage

Standard WPF clipboard operations work in XPF:

```csharp
// Text
Clipboard.SetText("Hello, World!");
string text = Clipboard.GetText();

// Data object
var data = new DataObject();
data.SetData(DataFormats.Text, "Hello");
Clipboard.SetDataObject(data);
```

## Bitmap Support

Copying bitmaps to and from the clipboard is supported in XPF 1.6.0 and later:

```csharp
// Copy bitmap to clipboard
Clipboard.SetImage(myBitmapSource);

// Retrieve bitmap from clipboard
BitmapSource image = Clipboard.GetImage();
```

On macOS, screenshots captured with system shortcuts (Cmd+Shift+Ctrl+3) may use pixel formats that differ from WPF conventions. XPF 1.6.0+ automatically transcodes these to compatible formats.

## Custom Data Formats

Custom clipboard data formats work within the same process. For cross-process clipboard operations with custom data, XPF serializes data as strings. Ensure your custom data types are serializable.

```csharp
var data = new DataObject();
data.SetData("MyCustomFormat", mySerializableObject);
Clipboard.SetDataObject(data);
```

## STA Threading (Windows)

On Windows, clipboard operations use COM and require the main thread to be marked as STA. If you encounter `COMException: CoInitialize was not called`, ensure your entry point has the `[STAThread]` attribute or use [custom initialization](/xpf/guides/customizing-initialization), which handles this automatically.

## Platform Differences

| Feature | Windows | macOS | Linux |
|---|---|---|---|
| Text | Supported | Supported | Supported |
| Bitmap | Supported (1.6.0+) | Supported (1.6.0+) | Supported (1.6.0+) |
| Custom formats (same process) | Supported | Supported | Supported |
| Custom formats (cross-process) | Supported (1.6.0+) | Supported (1.6.0+) | Supported (1.6.0+) |
| `Clipboard.Flush()` | Supported | No effect | Supported (X11) |

`Clipboard.Flush()` persists clipboard data so it remains available after the application closes. On platforms where flushing is not supported, the method does nothing.
