---
id: activatable-lifetime
title: Activatable lifetime
---

# Activatable lifetime

The `IActivatableLifetime` service defines methods and events related to the activation-deactivation lifecycle of an app. `IActivatableLifetime` is a global app-level service that is accessed from the application instance using the `TryGetService` method: `Application.Current.TryGetService<IActivatableLifetime>()`.

## Events

### Activated

An event that is raised when the application is **Activated**, for reasons described by the `ActivationKind` enumeration.

### Deactivated

An event that is raised when the application is **Deactivated**, for reasons described by the `ActivationKind` enumeration.

## Methods

### TryLeaveBackground

Tells the application to attempt to leave background state.

Returns **true** if it was possible on the given platform. Otherwise, returns **false**.

**Example:** `[NSApp unhide]` on macOS.

### TryEnterBackground

Tells the application to attempt to enter background state.

Returns **true** if it was possible on the given platform. Otherwise, returns **false**.

**Example:** `[NSApp hide]` on macOS.

## Examples

### Entering and exiting background state

You may want an app to pause or stop some code processing when it is in the background, e.g., pausing multimedia playback, or disabling recurrent HTTP requests.

```csharp
if (Application.Current?.TryGetFeature<IActivatableLifetime>() is { } activatableLifetime)
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

Your app may need to support protocol activation, more commonly called deep linking. Link schemas must be registered in the system and associated with the app. Once registered, the OS can redirect the links to the app.

Typical use cases are navigating to a specific page, or creating a [redirect URL in OAuth operations](https://www.oauth.com/oauth2-servers/oauth-native-apps/redirect-urls-for-native-apps/).

```csharp
if (Application.Current?.TryGetFeature<IActivatableLifetime>() is { } activatableLifetime)
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
Some platforms have specific steps to update the manifest and enable protocol handling.

**macOS and iOS:** Add CFBundleURLTypes with CFBundleURLSchemes segment to your `Info.plist`. See https://rderik.com/blog/creating-app-custom-url-scheme/ (skip Swift part, as it's handled by `IActivatableLifetime`).

**Android:** Add `intent-filter` with specific `android:scheme` to your `AndroidManifest.xml`. See https://developer.android.com/training/app-links/deep-linking for details (skip Kotlin/Java parts, as it's handled by `IActivatableLifetime`).
:::

### Handling file activation

Your app may need to handle file activation, which occurs when the OS launches or foregrounds your app (usually because the user opens a file associated with it). Like link schemas, file type associations must be registered in the system and linked to your app. Once registered, opening an associated file also opens your app via this event.

Typical use cases are opening a document, importing a file, or processing files passed from the OS shell.

```csharp
if (Application.Current?.TryGetFeature<IActivatableLifetime>() is { } activatableLifetime)
{
    activatableLifetime.Activated += (s, a) =>
    {
        if (a is FileActivatedEventArgs fileArgs && fileArgs.Kind == ActivationKind.File)
        {
            foreach (var file in fileArgs.Files)
            {
                Console.WriteLine($"App activated via file: {file.Name}");
            }
        }
    };
}
```

:::note
Some platforms have specific steps to update the manifest and enable file type associations.

**macOS and iOS:** Add `CFBundleDocumentTypes` to your `Info.plist` to declare the file types your app handles. See the [Apple documentation](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundledocumenttypes) for details.

**Android:** Add an `intent-filter` with `action.VIEW` and the appropriate `data` MIME type or file extension to your `AndroidManifest.xml`. See the [Android documentation](https://developer.android.com/training/data-storage/shared/documents-files) for details (skip Kotlin/Java parts, as it's handled by `IActivatableLifetime`).
:::

## Platform compatibility:

| Feature        |  Windows | macOS | Linux | Browser | Android |  iOS |
|---------------|-------|-------|-------|-------|-------|-------|
| `ActivationKind.Background` | ✗ | ✓ | ✗ | ✓ | ✓ | ✓ |
| `ActivationKind.File` | ✗ | ✓ | ✗ | ✗ | ✓ | ✓ |
| `ActivationKind.OpenUri` | ✗ | ✓ | ✗ | ✗ | ✓ | ✓ |
| `ActivationKind.Reopen` | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| `TryLeaveBackground`  | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| `TryEnterBackground` | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ |

See https://github.com/AvaloniaUI/Avalonia/issues/15316
