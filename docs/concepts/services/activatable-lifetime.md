---
id: activatable-lifetime
title: Activatable Lifetime
---

# Activatable Lifetime <MinVersion version="11.1" />

The `IActivatableLifetime` service defines a set of methods and events related to the activation and deactivation lifecycle of an application. `IActivatableLifetime` is a global app-level service that can be accessed from the Application instance using the `TryGetService` method: `Application.Current.TryGetService<IActivatableLifetime>()`.

## Events

### Activated

An event that is raised when the application is Activated for various reasons as described by the ActivationKind enumeration.

### Deactivated

An event that is raised when the application is Deactivated for various reasons as described by the ActivationKind enumeration.

## Methods

### TryLeaveBackground

Tells the application that it should attempt to leave its background state.
Returns true if it was possible and the platform supports this. False otherwise.

:::note
For example on macOS this would be [NSApp unhide].
:::

### TryEnterBackground

Tells the application that it should attempt to enter its background state.

Returns true if it was possible and the platform supports this. False otherwise.

:::note
For example on macOS this would be [NSApp hide].
:::

## Examples

### Handling app entering and exiting background state

In some applications, you might want to pause or stop some code processing, while application is in background.
It might be pausing multimedia playback, or disabling recurrent HTTP requests.

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

### Handling URI activation

Some apps might need to supports Protocol Activation, or as it's often called - deep linking. Link schemas (protocols) that are registered in the system and associated with the app. Once registered, OS will always redirect these links to the app.

App can handle these links in different ways. But typical use cases would be either enabling navigation to the specific page, or using it as a [redirect URL in OAuth operations](https://www.oauth.com/oauth2-servers/oauth-native-apps/redirect-urls-for-native-apps/).

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
In order to enable protocol handling for your app, you need to follow platform specific instructions on updating manifest.
On macOS and iOS, you need to add CFBundleURLTypes with CFBundleURLSchemes segment to your `Info.plist`. See https://rderik.com/blog/creating-app-custom-url-scheme/ (skip Swift part, as it's handled by `IActivatableLifetime`).
On Android, you need to add `intent-filter` with specific `android:scheme` to your `AndroidManifest.xml`. See https://developer.android.com/training/app-links/deep-linking for details (skip Kotlin/Java parts, as it's handled by `IActivatableLifetime`).
:::

## Platform compatibility:

| Feature        |  Windows | macOS | Linux | Browser | Android |  iOS |
|---------------|-------|-------|-------|-------|-------|-------|
| `ActivationKind.Background` | ✖ | ✔ | ✖ | ✔ | ✔ | ✔ |
| `ActivationKind.OpenUri` | ✖ | ✔ | ✖ | ✖* | ✔ | ✔ |
| `ActivationKind.Reopen` | ✖ | ✔ | ✖ | ✖ | ✖ | ✖ |
| `TryLeaveBackground`  | ✖ | ✔ | ✖ | ✖ | ✖ | ✖ |
| `TryEnterBackground` | ✖ | ✔ | ✖ | ✖ | ✔ | ✖ |

\* Technically possible, but not yet implemented.
