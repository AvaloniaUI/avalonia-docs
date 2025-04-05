# WebAuthenticationBroker

## Overview

`WebAuthenticationBroker` is a utility class that facilitates OAuth and other web-based authentication flows by providing a secure way to handle web authentication in desktop applications.

## Static Methods

### AuthenticateAsync

```csharp
public static Task<WebAuthenticationResult> AuthenticateAsync(
    TopLevel topLevel, WebAuthenticatorOptions options)
```

Starts an authentication flow by navigating to the specified start URI and monitoring for navigation to the end URI.

#### Parameters

- `topLevel`: Owner top-level, a window on desktop platforms.
- `options`: Authentication options that control the broker's behavior

#### Returns

A `Task<WebAuthenticationResult>` containing the authentication result.

## WebAuthenticationOptions

### Properties

```csharp
public Uri RequestUri { get; init; }
```

The initial URI that starts the authentication flow.

```csharp
public Uri RedirectUri { get; init; }
```

URI that indicates the completion of the authentication flow.

```csharp
public bool PreferNativeWebDialog { get; init; }
```

If true, WebAuthenticationBroker will avoid platform specific implementation option, and will use [NativeWebDialog](nativewebdialog.md) based implementation.

## WebAuthenticationResult

### Properties

```csharp
public Uri? CallbackUri { get; }
```

The response URI containing authentication data.

## Usage Example

Google OAuth is used in this example.

As a minimal requirement for setup, follow:

1. Create Google credentials (Type: Desktop for Windows/macOS/Linux, or iOS). See [Console Credentials](https://console.cloud.google.com/apis/credentials). On this step client ID and redirect URI are created.
2. Follow google [OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/web-server#httprest) documentation for general knowledge.

```csharp
var googleAuthRedirectUri = "http://localhost";
var googleAuthRequestUri = "https://accounts.google.com/o/oauth2/auth?response_type=code&access_type=offline&scope=openid";
googleAuthRequestUri += "&client_id=" + /* YOUR CLIENT ID */;
googleAuthRequestUri += "&redirect_uri=" + googleAuthRedirectUri;

var result = await WebAuthenticationBroker.AuthenticateAsync(
    mainWindow,
    new WebAuthenticationOptions(
        RequestUri: new Uri(googleAuthRequestUri)
        RedirectUri: new Uri(googleAuthRedirectUri));
```

Similarly it can be done with [Microsoft identity](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow), [Facebook Login](https://developers.facebook.com/docs/facebook-login/) or other OAuth2 standard compatible options.

## Platform Support

| Feature                     | Windows | macOS (10.15+) | Linux | iOS (iOS 12.0+) | Android  | Browser  |
|-----------------------------|---------|-------|-------|-----|-----------|-----------|
| Platform Implementation  | ✖       | ✔*     | ✖     | ✔*   | ✔**         | ✔***         |
| NativeWebDialog         | ✔       | ✔     | ✔     | ✖   | ✖         | ✖         |

\* Apple platforms use ASWebAuthenticationSession implementation.
\** Android uses CustomTabsIntent implementation, but support is experimental and might be changed.
\*** Browser solution requires CORS to be configured to allow access to the redirected page.
