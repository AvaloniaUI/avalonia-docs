---
id: known-differences
title: Known Differences from WPF
---

## Overview

XPF maintains API and binary compatibility with WPF, but there are behavioral differences due to the different rendering engine (Skia instead of MilCore) and cross-platform requirements. This page documents the known differences to help you plan your migration.

## Rendering

### Dashed strokes and line caps

Skia renders dashed strokes with line caps differently from WPF's milcore engine. If your application uses `StrokeDashArray` with custom line caps (triangular, round), the visual output may differ slightly between WPF and XPF. This is a fundamental difference in the Skia rendering backend.

### Blur effects

Blur effects (`BlurEffect`, `DropShadowEffect`) are computationally more expensive in Skia than in WPF's hardware-accelerated pipeline. Applications with heavy blur usage may see reduced framerates. See [Performance: Blur Effects](/xpf/configuration/performance#blur-effects) for mitigation strategies.

## Controls

### ContextMenu

In WPF, `PlacementTarget` is implicitly set when you open a context menu programmatically. In XPF, you must set it explicitly:

```csharp
myContextMenu.PlacementTarget = targetElement;
myContextMenu.IsOpen = true;
```

Right-click context menus work identically to WPF without any changes.

### MessageBox

`System.Windows.MessageBox` and `System.Windows.Forms.MessageBox` are both supported, but the rendered output may differ from native Windows message boxes:

- Text line breaks may appear at different positions (XPF limits width to approximately 400px)
- Icon positioning may vary slightly
- Button styling uses the platform's native appearance

### TextBox touch behavior

On touchscreen devices, dragging a finger on a `TextBox` causes the text to scroll/slide. This behavior is inherited from WPF. To disable it:

```csharp
ScrollViewer.SetPanningMode(myTextBox, PanningMode.None);
```

Or in XAML:

```xml
<TextBox ScrollViewer.PanningMode="None" />
```

### FlowDocument

FlowDocument is available with limitations:
- No pagination support
- No floater support
- Limited table support

See [Missing Features](/xpf/version-info/missing-features) for the full list.

## Window management

### Transparent windows

XPF uses `WS_EX_NOREDIRECTIONBITMAP` rather than `WS_EX_LAYERED` (which WPF uses). This means:

- Per-pixel hit transparency is not supported. Mouse clicks on transparent regions of a window are not passed through to windows underneath.
- For overlay scenarios, embed content in a single window rather than layering transparent windows. See [Performance: Embedding High-Performance Content](/xpf/configuration/performance#embedding-high-performance-content) for OpenGL embedding.

### Multiple UI threads

WPF supports creating windows on separate dispatcher threads. XPF does not support multiple UI threads on macOS (only one is allowed by the platform). On Windows and Linux, multiple dispatchers have limited support. Patterns that rely on splash screens or progress windows on a separate thread should be refactored to use the main dispatcher.

### Window.ShowActivated

The `ShowActivated` property is supported in XPF 1.6.0 and later.

### Window closing event

The `Closing` event fires once when a window is closed programmatically or via the close button. In earlier XPF versions (before 1.6.0), `Closing` could fire twice when using `Window.Close()`.

To override the close behavior, handle the `Closing` event and set `e.Cancel = true`:

```csharp
protected override void OnClosing(CancelEventArgs e)
{
    e.Cancel = true; // Prevent close
    Hide();          // Hide instead
}
```

### Win32 window messages

XPF's Win32 API shim layer generates window messages (such as `WM_ACTIVATEAPP`, `WM_SETFOCUS`) to the extent needed by supported third-party controls. Not all Win32 messages are generated on all platforms. If your application relies on specific window messages for inter-window communication, use .NET IPC mechanisms (such as named pipes or memory-mapped files) instead.

## APIs

### VisualTreeHelper.GetDpi

`VisualTreeHelper.GetDpi()` may not return accurate values on macOS. Use the Avalonia interop API instead:

```csharp
using Atlantis;

var topLevel = XpfWpfAbstraction.GetAvaloniaTopLevelForWindow(myWindow);
double scaling = topLevel.RenderScaling;
```

### CursorInteropHelper.Create

`CursorInteropHelper.Create()` is not fully implemented because it relies on native Windows cursor handles. XPF 1.6.0+ provides a fallback to the default cursor. For custom cursor mapping, see [Windows: CefSharp](/xpf/platforms/windows#cefsharp).

### SystemSounds.Beep

`System.Media.SystemSounds.Beep` throws `PlatformNotSupportedException` on macOS and Linux. Guard calls to this API with a platform check or remove them for cross-platform builds.

### System.Drawing.Common

`System.Drawing.Common` (GDI+) is deprecated on non-Windows platforms. Third-party controls that depend on GDI+ for rendering (such as certain DevExpress controls) will throw exceptions on macOS and Linux. See [macOS: GDI+ and System.Drawing.Common](/xpf/platforms/macos#gdi-and-systemdrawingcommon) for workarounds.

## File dialogs

### FilterIndex

`FilterIndex` for `OpenFileDialog` and `SaveFileDialog` is fully supported in XPF 1.6.0 and later.

### `InitialDirectory` on Linux

On older Linux distributions, `InitialDirectory` may be ignored if the GNOME version does not support the DBus file dialog protocol. See [Linux: File Dialogs on Older Distributions](/xpf/platforms/linux#file-dialogs-on-older-distributions) for a workaround.

### OpenFolderDialog

Use `Microsoft.Win32.OpenFolderDialog` for cross-platform folder selection. Some third-party folder dialog implementations (such as DevExpress FolderDialog) may not work on macOS.

### FolderBrowserDialog (System.Windows.Forms)

`System.Windows.Forms.FolderBrowserDialog` is supported in XPF but maps to the platform's native folder picker. On Linux and macOS, the dialog appearance and behavior will differ from Windows. For consistent behavior, prefer `Microsoft.Win32.OpenFolderDialog`.

### Dialog migration patterns

When migrating WPF dialog code to XPF for cross-platform use:

- Replace `System.Windows.Forms.OpenFileDialog` with `Microsoft.Win32.OpenFileDialog` where possible
- Avoid setting Windows-specific dialog properties (such as `DereferenceLinks`) that have no cross-platform equivalent
- On macOS, avoid showing modal dialogs during window activation. See [macOS: Startup and Modal Dialogs](/xpf/platforms/macos#startup-and-modal-dialogs)

## Clipboard

See [Clipboard](/xpf/migration/clipboard) for a full breakdown of clipboard differences.

## Fonts

- Font matching rules differ between WPF and XPF. Fonts with non-standard style names may not be matched correctly.
- Font fallback behavior can be customized. See [Getting Started: Fonts](/xpf/getting-started#fonts).
- Cross-platform rendering uses different text backends per platform, so visual differences are expected.
