---
id: embed-native-views
title: Embedding Android native views
description: Learn how to embed native Android views such as WebView and Button controls inside your Avalonia application using NativeControlHost and AndroidViewControlHandle.
doc-type: guide
---

Avalonia lets you embed native Android views inside the Avalonia visual tree by subclassing [`NativeControlHost`](/api/avalonia/controls/nativecontrolhost). You wrap each Android `View` in an [`AndroidViewControlHandle`](/api/avalonia/android/androidviewcontrolhandle) and return it from `CreateNativeControlCore`. This is useful when you need platform-specific controls (such as `WebView`, `MapView`, or media players) that have no Avalonia equivalent.

## How it works

`NativeControlHost` reserves space in the Avalonia layout and hands rendering of that region to the native platform. On Android, you:

1. Override `CreateNativeControlCore` in a `NativeControlHost` subclass.
2. Create the native Android `View` you need, using the parent context from the `parent` handle.
3. Wrap the `View` in an `AndroidViewControlHandle` and return it.

Avalonia positions and clips the native view to match the host control's bounds.

## Getting the parent context

The `parent` parameter passed to `CreateNativeControlCore` is an `IPlatformHandle`. On Android, you can cast it to `AndroidViewControlHandle` to obtain the `View.Context`. If the cast fails, fall back to the global application context:

```csharp
var parentContext = (parent as AndroidViewControlHandle)?.View.Context
    ?? global::Android.App.Application.Context;
```

## Example: embedding a WebView and a Button

The following example demonstrates a class that implements an `INativeDemoControl` interface and creates one of two native Android controls depending on a parameter.

:::tip
This example is based on the [ControlCatalog.Android sample](https://github.com/AvaloniaUI/Avalonia/blob/master/samples/ControlCatalog.Android/EmbedSample.Android.cs) in the Avalonia repository.
:::

First, define the interface your shared code uses to request a native control:

```csharp
public interface INativeDemoControl
{
    IPlatformHandle CreateControl(
        bool isSecond,
        IPlatformHandle parent,
        Func<IPlatformHandle> createDefault);
}
```

Then implement it in your Android project:

```csharp
public class EmbedSampleAndroid : INativeDemoControl
{
    public IPlatformHandle CreateControl(
        bool isSecond,
        IPlatformHandle parent,
        Func<IPlatformHandle> createDefault)
    {
        var parentContext = (parent as AndroidViewControlHandle)?.View.Context
            ?? global::Android.App.Application.Context;

        if (isSecond)
        {
            var webView = new global::Android.Webkit.WebView(parentContext);
            webView.LoadUrl("https://www.android.com/");
            return new AndroidViewControlHandle(webView);
        }

        var button = new global::Android.Widget.Button(parentContext)
        {
            Text = "Hello world"
        };

        var clickCount = 0;
        button.Click += (sender, args) =>
        {
            clickCount++;
            button.Text = $"Click count {clickCount}";
        };

        return new AndroidViewControlHandle(button);
    }
}
```

When `isSecond` is `true`, the method creates an Android `WebView`, loads a URL, and returns it wrapped in an `AndroidViewControlHandle`. When `isSecond` is `false`, it creates a native `Button` with a click counter and returns that instead.

## Limitations

Native views sit on top of the Avalonia rendering surface. Keep the following constraints in mind:

- **No transparency**: Native views cannot have transparent backgrounds that reveal Avalonia content behind them.
- **No transforms**: Avalonia render transforms (rotation, scale) do not affect native views.
- **Z-order constraints**: Native views always render on top of Avalonia content. You cannot overlay Avalonia controls on a native view.
- **Clipping**: The native view is clipped to its host bounds, but complex clip geometries are not supported.

## See also

- [Native platform interop](/docs/app-development/native-interop)
- [Developing with Avalonia for Android](/docs/platform-specific-guides/android)
- [Deploying on Android](/docs/deployment/android)

