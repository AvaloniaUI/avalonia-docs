---
id: third-party-libraries
title: Third party libraries
---

Avalonia XPF implements WPF's API surface, however a variety of third party libraries also depend on various win32 APIs which are obviously not available cross-platform.

To deal with this problem, Avalonia XPF implements a win32 API emulation layer that allows 3rd party libraries to work on non-windows platforms. This emulation layer needs to be enabled explictly in your XPF application.

This feature must be enabled before any assembly attempts to call a win32 API, so the constructor of your `App` class or `Program.Main` is a good place to enable it.

To enable win32 API emulation application-wide you can add the following call:

```cs
  AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup.AutoEnable();
```

You can exclude libraries that are known to provide non-windows platform support like this:

```cs
AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup.
  .AutoEnable(asm =>
  {
    var name = asm.GetName().Name.ToLowerInvariant();
    if (name is "sqlite" or "jint" or "esprima" or "magick.net" or "magick.net.core")
      return true;
    return false;
  });
```

Alternatively the layer can be enabled on per-library basis:

```cs
AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup
  .AddLibrary(typeof(Type.In.Third.Party.Library).Assembly);
```

## Compatibility Database

We maintain a comprehensive [compatibility database](avaloniaui.net/xpf/packages) for third-party controls. This database provides up-to-date status information for controls from major vendors.

:::info 
If you find that a control marked as `Fix In Progress` or `Untested` is mission-critical for your application, please contact our support team. We're committed to working with you to ensure compatibility.
:::

### Compatibility Notes

* **Pure WPF Controls**: Third-party controls that are implemented purely in WPF typically work without any issues, even if not listed in our compatibility database.
* **Unlisted Vendors**: The absence of a control vendor from our database doesn't indicate incompatibility. We encourage you to test any controls you need.
* **Known Challenges**: Issues most commonly arise with controls that utilize GDI or WinForms components. 
  
## WinAPI Shim APIs 

Below is an overview of the Windows API (WinAPI) shims available in Avalonia XPF. These shims allow for native Windows functionality while maintaining cross-platform compatibility. Some APIs may not be fully implemented. 


### Window Creation and Manipulation
```csharp
IntPtr CreateWindowEx(uint dwExStyle, void* lpClassName, void* lpWindowName, uint dwStyle, 
    int x, int y, int nWidth, int nHeight, IntPtr hWndParent, IntPtr hMenu, 
    IntPtr hInstance, IntPtr lpParam);
IntPtr CreateWindowExW(uint dwExStyle, void* lpClassName, void* lpWindowName, uint dwStyle, 
    int x, int y, int nWidth, int nHeight, IntPtr hWndParent, IntPtr hMenu, 
    IntPtr hInstance, IntPtr lpParam);
int GetWindowPlacement(IntPtr hWnd, IntPtr lpwndpl);
int GetWindowRect(IntPtr hWnd, RECT* lpRect);
int SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int x, int y, int cx, int cy, int uFlags);
int IsWindowEnabled(IntPtr hWnd);
int IsWindowVisible(IntPtr hWnd);
int IsWindow(IntPtr hWnd);
```

#### Window Properties and Attributes
```csharp
int GetWindowLong(IntPtr hWnd, int nIndex);
int SetWindowLong(IntPtr hWnd, int nIndex, int newVal);
IntPtr GetWindowLongPtr(IntPtr hWnd, int nIndex);
IntPtr GetWindowLongPtrW(IntPtr hWnd, int nIndex);
IntPtr SetWindowLongPtr(IntPtr hWnd, int nIndex, IntPtr newVal);
IntPtr GetSystemMenu(IntPtr hWnd, int bRevert);
int SetWindowDisplayAffinity(IntPtr hWnd, int* dwAffinity);
int GetWindowInfo(IntPtr hwnd, WINDOWINFO* pwi);
```

### Device Context and Graphics
```csharp
IntPtr GetDC(IntPtr hWnd);
IntPtr CreateCompatibleDC(IntPtr hdc);
int DeleteDC(IntPtr hdc);
int GetDeviceCaps(IntPtr hdc, int nIndex);
int ReleaseDC(IntPtr hWnd, IntPtr hDC);
IntPtr CreateRectRgn(int x1, int y1, int x2, int y2);
IntPtr CreateRoundRectRgn(int x1, int y1, int x2, int y2, int cx, int cy);
IntPtr CreateRectRgnIndirect(RECT* lprc);
int DeleteObject(IntPtr obj);
int SetWindowRgn(IntPtr hWnd, IntPtr hRgn, int bRedraw);
```

### DWM (Desktop Window Manager)
```csharp
int DwmIsCompositionEnabled(int* enabled);
int DwmExtendFrameIntoClientArea(IntPtr hWnd, MARGINS* pMarInset);
uint DwmGetWindowAttribute(IntPtr hwnd, int attribute, uint* pvAttribute, uint cbAttribute);
uint DwmSetWindowAttribute(IntPtr hwnd, int attribute, uint* pvAttribute, uint cbAttribute);
```

### Monitor and Display
```csharp
IntPtr MonitorFromPoint(long point, uint dwFlags);
IntPtr MonitorFromRect(IntPtr lprc, uint dwFlags);
IntPtr MonitorFromWindow(IntPtr handle, uint flags);
int GetMonitorInfo(IntPtr hMonitor, IntPtr lpmi);
int EnumDisplayMonitors(IntPtr hdc, IntPtr lprcClip, IntPtr lpfnEnum, IntPtr data);
int GetDpiForMonitor(IntPtr hMonitor, int dpiType, uint* dpiX, uint* dpiY);
int GetDpiForWindow(IntPtr hWnd);
```

### Input Method Editor (IME)
```csharp
IntPtr ImmCreateContext();
int ImmDestroyContext(IntPtr hIMC);
IntPtr ImmGetContext(IntPtr hWnd);
int ImmReleaseContext(IntPtr hWnd, IntPtr hIMC);
IntPtr ImmAssociateContext(IntPtr hWnd, IntPtr hIMC);
int ImmSetOpenStatus(IntPtr hIMC, int open);
int ImmGetOpenStatus(IntPtr hIMC);
int ImmGetCompositionString(IntPtr hIMC, int dwIndex, void* lpBuf, int dwBufLen);
int ImmGetCompositionStringW(IntPtr hIMC, int dwIndex, void* lpBuf, int dwBufLen);
int ImmSetCompositionFont(IntPtr hIMC, void* lf);
int ImmSetCompositionFontW(IntPtr hIMC, void* lf);
int ImmSetCompositionWindow(IntPtr hIMC, void* compform);
int ImmSetCandidateWindow(IntPtr hIMC, void* candform);
```

### System Information and Settings
```csharp
int GetSysColor(int nIndex);
int SystemParametersInfo(uint uiAction, uint uiParam, void* pvParam, uint fWinIni);
int SystemParametersInfoW(uint uiAction, uint uiParam, void* pvParam, uint fWinIni);
uint GetDoubleClickTime();
int GetSystemMetrics(int index);
int RtlGetVersion(RTL_OSVERSIONINFOW* lpVersionInformation);
uint GetCaretBlinkTime();
```

### Clipboard and Shell
```csharp
int AddClipboardFormatListener(IntPtr hwnd);
IntPtr SHGetFileInfo(void* pszPath, uint dwFileAttributes, SHFILEINFOA* psfi, 
    uint cbFileInfo, uint uFlags);
IntPtr SHGetFileInfoW(void* pszPath, uint dwFileAttributes, SHFILEINFOW* psfi, 
    uint cbFileInfo, uint uFlags);
```

### Window Messages and Hooks
```csharp
IntPtr SendMessage(IntPtr hWnd, int uMsg, IntPtr wParam, IntPtr lParam);
int PostMessage(IntPtr hWnd, int uMsg, IntPtr wParam, IntPtr lParam);
IntPtr SetWindowsHookEx(int idHook, IntPtr lpfn, IntPtr hMod, uint dwThreadId);
int UnhookWindowsHookEx(IntPtr hWnd);
IntPtr DefWindowProc(IntPtr hWnd, uint msg, IntPtr wParam, IntPtr lParam);
IntPtr DefWindowProcW(IntPtr hWnd, uint msg, IntPtr wParam, IntPtr lParam);
```

### File and Resource Management
```csharp
IntPtr LoadLibrary(void* lpLib);
IntPtr LoadLibraryW(void* lpLib);
int LoadString(IntPtr hInstance, uint uID, void* lpBuffer, int cchBufferMax);
int LoadStringW(IntPtr hInstance, uint uID, void* lpBuffer, int cchBufferMax);
IntPtr CreateFileMapping(IntPtr hFile, IntPtr lpFileMappingAttributes, uint flProtect, 
    uint dwMaximumSizeHigh, uint dwMaximumSizeLow, char* lpName);
IntPtr MapViewOfFile(IntPtr hFileMappingObject, uint dwDesiredAccess, uint dwFileOffsetHigh, 
    uint dwFileOffsetLow, IntPtr dwNumberOfBytesToMap);
int UnmapViewOfFile(IntPtr lpBaseAddress);
int CloseHandle(IntPtr hObject);
```

### UI Elements
```csharp
int CreateCaret(IntPtr hWnd, IntPtr hBitmap, int width, int height);
int ShowCaret(IntPtr hWnd);
int HideCaret(IntPtr hWnd);
int DestroyCaret();
int SetCaretPos(int x, int y);
uint TrackPopupMenuEx(IntPtr hmenu, uint fuFlags, int x, int y, IntPtr hwnd, IntPtr lptpm);
```

### Notes
- Functions with 'W' suffix are Unicode versions
- Many functions return non-zero value for success, zero for failure
- IntPtr parameters typically represent handles (HWND, HDC, etc.)
- void* parameters are typically used for strings or structures in unmanaged code

### Usage Example
```csharp
// Example of getting window dimensions
var hwnd = window.PlatformImpl.Handle.Handle;
var rect = new RECT();
if (GetWindowRect(hwnd, &rect) != 0)
{
    int width = rect.right - rect.left;
    int height = rect.bottom - rect.top;
}
```