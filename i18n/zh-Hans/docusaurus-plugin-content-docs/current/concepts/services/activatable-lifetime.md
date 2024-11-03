---
id: activatable-lifetime
title: Activatable Lifetime 可激活生命周期
---

# 可激活生命周期 <MinVersion version="11.1" />

`IActivatableLifetime` 服务定义了一组与应用程序激活和去激活生命周期相关的方法和事件。`IActivatableLifetime` 是一个全局应用程序级别的服务，可以通过 `Application` 实例使用 `TryGetService` 方法访问：`Application.Current.TryGetService<IActivatableLifetime>()`。

## 事件

### Activated

当应用程序因各种原因被激活时引发的事件，这些原因由 `ActivationKind` 枚举描述。

### Deactivated

当应用程序因各种原因被去激活时引发的事件，这些原因由 `ActivationKind` 枚举描述。

## 方法

### TryLeaveBackground

告诉应用程序尝试离开其后台状态。如果可能并且平台支持此操作，则返回 `true`；否则返回 `false`。

:::note
例如在 macOS 上是 `[NSApp unhide]`。
:::

### TryEnterBackground

告诉应用程序尝试进入其后台状态。如果可能并且平台支持此操作，则返回 `true`；否则返回 `false`。

:::note
例如在 macOS 上是 `[NSApp hide]`。
:::

## 示例

### 处理应用程序进入和退出后台状态

在某些应用程序中，您可能希望在应用程序处于后台时暂停或停止某些代码处理，比如说暂停多媒体播放或禁用周期性的 HTTP 请求。

```csharp
if (Application.Current.TryGetFeature<IActivatableLifetime>() is { } activatableLifetime)
{
    activatableLifetime.Activated += (sender, args) =>
    {
        if (args.Kind == ActivationKind.Background)
        {
            Console.WriteLine($"App exited background");
        }
    };

    activatableLifetime.Deactivated += (sender, args) =>
    {
        if (args.Kind == ActivationKind.Background)
        {
            Console.WriteLine($"App entered background");
        }
    };
}
```

### 处理 URI 激活

某些应用程序可能需要支持协议激活，通常称为深度链接。注册在系统中并与应用程序关联的链接方案（协议）。一旦注册，操作系统将始终将这些链接重定向到应用程序。

应用程序可以以不同的方式处理这些链接。但典型的用例包括导航到特定页面或将其用作 [OAuth 操作中的重定向 URL](https://www.oauth.com/oauth2-servers/oauth-native-apps/redirect-urls-for-native-apps/)。

```csharp
if (Application.Current.TryGetFeature<IActivatableLifetime>() is { } activatableLifetime)
{
    activatableLifetime.Activated += (s, a) =>
   {
        if (a is ProtocolActivatedEventArgs protocolArgs && protocolArgs.Kind == ActivationKind.OpenUri)
        {
            Console.WriteLine($"App activated via Uri: {protocolArgs.Uri}");
        }
   };
}
```

:::note
为了启用应用程序的协议处理，您需要遵循特定平台的说明更新清单。
在 macOS 和 iOS 上，您需要在 `Info.plist` 中添加带有 `CFBundleURLSchemes` 段的 `CFBundleURLTypes`。
参阅 https://rderik.com/blog/creating-app-custom-url-scheme/（跳过 Swift 部分，因为它由 `IActivatableLifetime` 处理）。
在 Android 上，您需要在 `AndroidManifest.xml` 中添加带有特定 `android:scheme` 的 `intent-filter`。参阅 https://developer.android.com/training/app-links/deep-linking 了解详细信息（跳过 Kotlin/Java 部分，因为它由 `IActivatableLifetime` 处理）。
:::

## 平台兼容性：

| 功能                  | Windows | macOS | Linux | 浏览器 | Android | iOS | Tizen |
|-----------------------|---------|-------|-------|--------|---------|-----|-------|
| `ActivationKind.Background` | ✖       | ✔     | ✖     | ✔      | ✔       | ✔   | ✖     |
| `ActivationKind.File`        | ✖       | ✔     | ✖     | ✖      | ✔       | ✔   | ✖     |
| `ActivationKind.OpenUri`     | ✖       | ✔     | ✖     | ✖      | ✔       | ✔   | ✖     |
| `ActivationKind.Reopen`      | ✖       | ✔     | ✖     | ✖      | ✖       | ✖   | ✖     |
| `TryLeaveBackground`         | ✖       | ✔     | ✖     | ✖      | ✖       | ✖   | ✖     |
| `TryEnterBackground`         | ✖       | ✔     | ✖     | ✖      | ✔       | ✖   | ✖     |

参阅 [AvaloniaUI/Avalonia#15316](https://github.com/AvaloniaUI/Avalonia/issues/15316) 以获取当前支持和不支持的平台的更多信息。