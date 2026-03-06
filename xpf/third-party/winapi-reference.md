---
id: winapi-reference
title: WinAPI Shim Reference
---

This page lists the Win32 APIs available through XPF's shim layer. These shims exist to support third-party WPF controls on non-Windows platforms. They are not a general-purpose Win32 emulation layer.

For setup and configuration, see [Win32 API Shims](/xpf/third-party/win32-api-shims).

:::note
"Shimmed" means XPF intercepts the call and provides a cross-platform implementation. The behavior may not be identical to native Win32 in all cases. Functions marked with (W) have both ANSI and Unicode variants available.
:::

## user32.dll

### Window creation and lifecycle

| Function | Description |
|---|---|
| `CreateWindowEx` (W) | Creates a window with extended styles. Returns a virtual HWND managed by XPF. |
| `RegisterClass` | Registers a window class. |
| `RegisterClassExW` | Registers a window class (extended). |
| `DestroyWindow` | Destroys a window created with `CreateWindowEx`. |

### Window properties and state

| Function | Description |
|---|---|
| `GetWindowRect` | Gets the window bounding rectangle in screen coordinates. |
| `GetClientRect` | Gets the client area rectangle. |
| `GetWindowPlacement` | Gets the show state and positions of a window. |
| `GetWindowInfo` | Gets window information including styles and borders. |
| `IsWindow` | Tests whether a handle is a valid window. |
| `IsWindowEnabled` | Tests whether a window accepts user input. |
| `IsWindowVisible` | Tests whether a window is visible. |
| `GetWindowLong` / `SetWindowLong` | Gets or sets a 32-bit value in the window data. |
| `GetWindowLongPtr` (W) / `SetWindowLongPtr` | Gets or sets a pointer-sized value in the window data. Used for window styles and procedures. |

### Window position and layout

| Function | Description |
|---|---|
| `SetWindowPos` | Sets the size, position, and Z-order of a window. |
| `AdjustWindowRectEx` | Calculates the required window size for a given client area size. |
| `BeginDeferWindowPos` / `EndDeferWindowPos` | Batches multiple window position changes for performance. |

### Window hierarchy

| Function | Description |
|---|---|
| `GetActiveWindow` | Returns the active window on the calling thread. |
| `GetTopWindow` | Returns the topmost child window. |
| `GetWindow` | Retrieves a related window (next, previous, owner, child). |
| `GetDesktopWindow` | Returns a handle to the desktop window. |
| `FindWindow` | Finds a top-level window by class name or title. |
| `WindowFromPoint` | Returns the window at a given screen coordinate. |
| `EnumChildWindows` | Enumerates child windows of a parent. |
| `EnumThreadWindows` | Enumerates windows owned by a thread. |

### Window display

| Function | Description |
|---|---|
| `SetWindowRgn` | Sets a window's visible region. |
| `RedrawWindow` | Redraws a window or region. |
| `InvalidateRect` | Marks a rectangle as needing repaint. |
| `SetWindowDisplayAffinity` | Controls whether a window can be captured by screen capture tools. Stub implementation. |

### System menu

| Function | Description |
|---|---|
| `GetSystemMenu` | Returns a handle to the window's system menu (the menu shown when clicking the window icon). |

### Focus and input

| Function | Description |
|---|---|
| `GetFocus` | Returns the window with keyboard focus. |
| `SetForegroundWindow` | Brings a window to the foreground and gives it focus. |
| `GetCapture` / `ReleaseCapture` | Gets or releases mouse capture. |
| `GetKeyState` | Returns the state of a virtual key (up, down, toggled). |
| `GetCursorPos` | Returns the cursor position in screen coordinates. |
| `GetMessagePos` / `GetMessageTime` | Returns the cursor position and time of the last message. |

### Messages

| Function | Description |
|---|---|
| `SendMessage` | Sends a message to a window and waits for processing. Limited message support. |
| `PostMessage` | Posts a message to a window's message queue. Limited message support. |
| `DefWindowProc` (W) | Provides default processing for messages not handled by a window procedure. |
| `FormatMessageW` | Formats a system error message string. |

### Hooks

| Function | Description |
|---|---|
| `SetWindowsHookEx` | Installs a hook procedure. Limited hook types supported. |
| `UnhookWindowsHookEx` | Removes a hook procedure. |

### Caret

| Function | Description |
|---|---|
| `CreateCaret` | Creates a caret (text cursor) for a window. |
| `ShowCaret` / `HideCaret` | Shows or hides the caret. |
| `DestroyCaret` | Destroys the current caret. |
| `SetCaretPos` | Sets the caret position. |

### Menus

| Function | Description |
|---|---|
| `TrackPopupMenuEx` | Displays a shortcut menu at a specified location. |
| `EnableMenuItem` | Enables, disables, or grays a menu item. |

### System information

| Function | Description |
|---|---|
| `GetSysColor` | Returns the current color of a display element (button face, window background, etc.). |
| `SystemParametersInfo` (W) | Gets or sets system-wide parameters (scroll bar size, animation settings, etc.). |
| `GetDoubleClickTime` | Returns the maximum interval between two clicks for a double-click. |
| `GetSystemMetrics` | Returns system metric values (screen size, icon size, scroll bar dimensions, etc.). |
| `GetCaretBlinkTime` | Returns the caret blink interval. |

### Clipboard

| Function | Description |
|---|---|
| `AddClipboardFormatListener` | Registers a window to receive clipboard change notifications. |

## gdi32.dll

### Device contexts

| Function | Description |
|---|---|
| `GetDC` / `ReleaseDC` | Gets or releases a device context for a window. |
| `CreateCompatibleDC` / `DeleteDC` | Creates or deletes a memory device context. |
| `GetDeviceCaps` | Returns device capabilities (DPI, color depth, etc.). |

### Drawing objects

| Function | Description |
|---|---|
| `CreateRectRgn` | Creates a rectangular region. |
| `CreateRoundRectRgn` | Creates a rectangular region with rounded corners. |
| `CreateRectRgnIndirect` | Creates a rectangular region from a RECT structure. |
| `DeleteObject` | Deletes a GDI object (region, brush, pen, etc.). |
| `GetStockObject` | Returns a handle to a predefined stock object. |

### Coordinate mapping

| Function | Description |
|---|---|
| `GetMapMode` / `SetMapMode` | Gets or sets the mapping mode for a device context. |
| `SetWindowExtEx` / `SetViewportExtEx` | Sets the window or viewport extents for coordinate mapping. |
| `OffsetRect` | Moves a rectangle by a specified offset. |

## dwmapi.dll

| Function | Description |
|---|---|
| `DwmIsCompositionEnabled` | Returns whether desktop composition is enabled. Always returns true on non-Windows. |
| `DwmExtendFrameIntoClientArea` | Extends the window frame into the client area. |
| `DwmGetWindowAttribute` | Gets a DWM window attribute. Limited attribute support. |
| `DwmSetWindowAttribute` | Sets a DWM window attribute. Limited attribute support. |

## shcore.dll / Monitor APIs

| Function | Description |
|---|---|
| `MonitorFromPoint` | Returns the monitor containing a point. |
| `MonitorFromRect` | Returns the monitor with the largest intersection with a rectangle. |
| `MonitorFromWindow` | Returns the monitor containing the largest part of a window. |
| `GetMonitorInfo` | Returns the display area and work area of a monitor. |
| `EnumDisplayMonitors` | Enumerates display monitors. |
| `GetDpiForMonitor` | Returns the DPI of a monitor. |
| `GetDpiForWindow` | Returns the DPI for a window. |
| `GetProcessDpiAwareness` | Returns the DPI awareness setting for a process. |

## imm32.dll (Input Method Editor)

| Function | Description |
|---|---|
| `ImmCreateContext` / `ImmDestroyContext` | Creates or destroys an IME input context. |
| `ImmGetContext` / `ImmReleaseContext` | Gets or releases the IME context for a window. |
| `ImmAssociateContext` | Associates an IME context with a window. |
| `ImmSetOpenStatus` / `ImmGetOpenStatus` | Opens or closes the IME, or queries the current state. |
| `ImmNotifyIME` | Sends a notification to the IME. |
| `ImmGetProperty` | Returns IME properties. |
| `ImmGetCompositionString` (W) | Returns the composition string (the text being composed). |
| `ImmSetCompositionFont` (W) | Sets the font used to display the composition string. |
| `ImmConfigureIMEW` | Opens the IME configuration dialog. |
| `ImmSetCompositionWindow` | Sets the position of the composition window. |
| `ImmSetCandidateWindow` | Sets the position of the candidate list window. |
| `ImmGetDefaultIMEWnd` | Returns the default IME window handle. |

## kernel32.dll

| Function | Description |
|---|---|
| `GetCurrentThreadId` | Returns the calling thread's ID. |
| `GetModuleFileName` | Returns the full path of a loaded module. |
| `GetModuleHandle` (W) | Returns the handle of a loaded module by name. |
| `LoadLibrary` (W) | Loads a DLL. Intercepted by the shim to redirect Win32 DLL loads. |
| `LoadString` (W) | Loads a string resource from an executable. |
| `CloseHandle` | Closes an object handle. |
| `RtlGetVersion` | Returns the OS version. Returns emulated Windows version info on non-Windows. |

### File and memory mapping

| Function | Description |
|---|---|
| `CreateFileMapping` | Creates or opens a file mapping object. |
| `MapViewOfFile` / `UnmapViewOfFile` | Maps or unmaps a view of a file mapping into the process address space. |
| `FindFirstFile` / `FindNextFile` / `FindClose` | Enumerates files in a directory. |

### Memory

| Function | Description |
|---|---|
| `RtlMoveMemory` | Copies a block of memory. |

## shell32.dll

| Function | Description |
|---|---|
| `SHGetFileInfo` (W) | Returns information about a file (icon, display name, type). |
| `ExtractIconEx` (W) | Extracts icons from an executable or DLL. |

## uxtheme.dll

| Function | Description |
|---|---|
| `IsThemeActive` | Returns whether visual styles are active. |
| `SetWindowThemeAttribute` | Sets theme attributes on a window. |

## msctf.dll

| Function | Description |
|---|---|
| `TF_CreateThreadMgr` | Creates a Text Services Framework thread manager. |
