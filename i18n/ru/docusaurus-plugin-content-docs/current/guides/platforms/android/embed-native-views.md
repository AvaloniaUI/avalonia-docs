---
id: embed-native-views
title: Embed Native Views
---

In Avalonia UI, you can use the native control host feature on Android by creating an instance of `AndroidViewControlHandle` from an Android view. 

:::tip
This documentation is based on the [following example](https://github.com/AvaloniaUI/Avalonia/blob/master/samples/ControlCatalog.Android/EmbedSample.Android.cs).
:::


We have a class named `EmbedSampleAndroid` implementing the `INativeDemoControl` interface. This class contains a method `CreateControl` which demonstrates how to use native control host.

```csharp
 public interface INativeDemoControl
    {
        /// <param name="isSecond">Used to specify which control should be displayed as a demo</param>
        /// <param name="parent"></param>
        /// <param name="createDefault"></param>
        IPlatformHandle CreateControl(bool isSecond, IPlatformHandle parent, Func<IPlatformHandle> createDefault);
    }

public class EmbedSampleAndroid : INativeDemoControl
{
    public IPlatformHandle CreateControl(bool isSecond, IPlatformHandle parent, Func<IPlatformHandle> createDefault)
    {
        var parentContext = (parent as AndroidViewControlHandle)?.View.Context
            ?? global::Android.App.Application.Context;

        if (isSecond)
        {
            var webView = new global::Android.Webkit.WebView(parentContext);
            webView.LoadUrl("https://www.android.com/");

            return new AndroidViewControlHandle(webView);
        }
        else
        {
            var button = new global::Android.Widget.Button(parentContext) { Text = "Hello world" };
            var clickCount = 0;
            button.Click += (sender, args) =>
            {
                clickCount++;
                button.Text = $"Click count {clickCount}";
            };

            return new AndroidViewControlHandle(button);
        }
    }
}
```

In this method, `CreateControl`, the `parent` object is cast to `AndroidViewControlHandle` to get the `View`'s Context. If this fails, the global application context is used.

The `isSecond` parameter is used to decide which control to create. If it's `true`, a `WebView` is created, navigates to "https://www.android.com/", and its instance is wrapped in an `AndroidViewControlHandle` which is then returned.

If `isSecond` is `false`, a Button is created with the text "Hello world". The button's `Click` event is wired up to an event handler that increases the `clickCount` and updates the button's text to display the number of clicks. The `Button` instance is also wrapped in an `AndroidViewControlHandle` and returned.

