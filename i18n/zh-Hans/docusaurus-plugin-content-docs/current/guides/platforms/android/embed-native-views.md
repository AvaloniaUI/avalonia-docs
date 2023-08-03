---
id: embed-native-views
title: 嵌入原生视图
---

在 Avalonia UI 中，您可以通过从 Android 视图创建 `AndroidViewControlHandle` 的实例来在 Android 上使用原生控制主机功能。

:::tip
此文档基于[以下示例](https://github.com/AvaloniaUI/Avalonia/blob/master/samples/ControlCatalog.Android/EmbedSample.Android.cs)。
:::


我们有一个名为 `EmbedSampleAndroid` 的类，实现了 `INativeDemoControl` 接口。该类包含一个名为 `CreateControl` 的方法，演示了如何使用原生控制主机。

```csharp
 public interface INativeDemoControl
    {
        /// <param name="isSecond">用于指定显示哪个控件作为演示</param>
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

在这个 `CreateControl` 方法中，将 `parent` 对象强制转换为 `AndroidViewControlHandle`，以获取 `View` 的 Context。如果转换失败，则使用全局应用程序上下文。

`isSecond` 参数用于决定要创建哪个控件。如果为 `true`，将创建一个 `WebView`，并导航到”https://www.android.com/ “，然后将其实例包装在 `AndroidViewControlHandle` 中并返回。

如果 `isSecond` 为 `false`，则创建一个带有文本 ”Hello world“ 的按钮。按钮的 `Click` 事件与一个事件处理程序关联，该处理程序增加 `clickCount` 并更新按钮的文本以显示点击次数。按钮的实例也被包装在 `AndroidViewControlHandle` 中并返回。
