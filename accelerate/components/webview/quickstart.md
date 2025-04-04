# Quick Start Guide


## Installation

Add the WebView package to your project:

```bash
dotnet add package Avalonia.Controls.WebView
```

// add licensing

## Usage

For each control, please visit their documentation:
- [NativeWebView control](nativewebview.md)
- [NativeWebDialog window](nativewebdialog.md)
- [WebAuthenticationBroker API](webauthenticationbroker.md)

## Prerequisites for user machine

`Avalonia.Controls.WebView` relies on native WebView implementations preinstalled with the use machine.

### Windows

WebView2 is used. 
WebView2 runtime is preinstalled with each Windows 11 installation, but might be missing on older Windows 10 builds.
To ensure WebView2 runtime is available, you can embed it with your installer.
https://developer.microsoft.com/en-us/microsoft-edge/webview2?form=MA13LH#download
https://learn.microsoft.com/en-us/microsoft-edge/webview2/concepts/distribution?tabs=dotnetcsharp

### MacOS/iOS

Avalonia uses `WKWebView` which is preinstalled on every modern macOS/iOS device. No additional setup is necessary.
For [WebAuthenticationBroker](./webauthenticationbroker.md) support macOS 10.15+ or iOS 12.0+ is necessary.

### Linux

GTK 3.0 and WebKitGTK 4.1 are necessary.

Debian/Ubuntu:
```
apt install libgtk-3-0 libwebkit2gtk-4.1-0
```
Fedora:
```
dnf install gtk3 webkit2gtk4.1
```

### Android

Android API 21 or higher.
