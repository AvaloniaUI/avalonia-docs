---
id: webauthenticationbroker
title: WebAuthenticationBroker
---

## Overview

`WebAuthenticationBroker` is a utility class that facilitates OAuth and other web-based authentication flows by providing a secure way to handle web authentication in desktop applications.

It navigates to a start URI, waits for the flow to reach a redirect URI, and hands the callback back to you. How the flow is displayed depends on the [mode](#webauthenticatormode).

## Static methods

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

## WebAuthenticatorMode

Selects which implementation runs the flow.

| Mode | Description | Platforms |
|------|-------------|-----------|
| `Auto` | Default. Resolves to the first supported mode, in the order `System`, `NativeWebDialog`, `Browser`. | All |
| `System` | Uses the platform's native web authentication APIs. | macOS, iOS, Android, Browser |
| `NativeWebDialog` | Shows the flow in a [NativeWebDialog](/controls/web/nativewebdialog) containing an embedded web view. | Windows, macOS, Linux, Android |
| `Browser` | Opens the flow in the user's default browser and receives the redirect on a local HTTP listener. | All except Browser |

## WebAuthenticatorOptions

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
public WebAuthenticatorMode Mode { get; init; }
```

Implementation used to run the flow. See [WebAuthenticatorMode](#webauthenticatormode).

```csharp
public bool NonPersistent { get; init; }
```

Hint for the platform implementation to not store any session data persistently. Ignored by `WebAuthenticatorMode.Browser`, which uses the user's own browser session.

```csharp
public BrowserOptions? BrowserOptions { get; init; }
```

Options used when `Mode` is `WebAuthenticatorMode.Browser`. See [BrowserOptions](#browseroptions).

```csharp
public Func<NativeWebDialog?> NativeWebDialogFactory { get; init; }
```

Callback that can be used to override [NativeWebDialog](/controls/web/nativewebdialog) creation when WebAuthenticationBroker uses dialog implementation instead of system auth APIs.

## Browser mode

`WebAuthenticatorMode.Browser` launches the system browser and starts a listener on the loopback interface to receive the redirect. `RedirectUri` must be an `http` loopback address, such as `http://127.0.0.1:5000/callback`. When the URI specifies no port, the OS allocates a free one.

:::warning
The listener accepts connections from any process on the machine, so the callback is untrusted input. Check [`State`](#webauthenticationresult) against the value you sent, and handle `Error` before using `Code`.

PKCE is strongly recommended (RFC 8252, section 8.1). It is what makes an injected authorization code unusable at the token endpoint. Use `CallbackFilter` to keep the listener waiting when a request does not belong to the flow.
:::

### BrowserOptions

```csharp
public TimeSpan Timeout { get; init; }
```

How long to wait for the callback before the flow is canceled. Defaults to 5 minutes.

```csharp
public BrowserCallbackFilter? CallbackFilter { get; init; }
```

Decides whether a request received on the redirect path belongs to this flow. Return `false` to reject it and keep waiting. The usual implementation compares `State` against the value sent in the authorization request. A filter that accepts a request does not make it trusted, so the caller still has to check the result.

```csharp
public delegate bool BrowserCallbackFilter(WebAuthenticationResult result);
```

```csharp
public BrowserResponseHandler? ResponseHandler { get; init; }
```

Customizes the HTTP response sent to the browser once the callback is received. If not specified, a default response is sent.

```csharp
public delegate Task BrowserResponseHandler(
    WebAuthenticationResult result, BrowserResponse response);
```

`BrowserResponse` exposes `StatusCode` and `OutputStream`, so you can write your own "you can close this window" page. `Redirect(Uri)` sends the browser to an absolute URI instead, setting the status code to `302 Found`:

```csharp
ResponseHandler = (result, response) =>
{
    response.Redirect(new Uri("https://example.com/signed-in"));
    return Task.CompletedTask;
}
```

### Example

```csharp
var result = await WebAuthenticationBroker.AuthenticateAsync(
    mainWindow,
    new WebAuthenticatorOptions(requestUri, new Uri("http://127.0.0.1:5000/callback"))
    {
        Mode = WebAuthenticatorMode.Browser,
        BrowserOptions = new BrowserOptions
        {
            Timeout = TimeSpan.FromMinutes(2),
            CallbackFilter = callback => callback.State == expectedState
        }
    });

if (result.Error is { } error)
    throw new InvalidOperationException($"{error}: {result.ErrorDescription}");

var code = result.Code;
```

## WebAuthenticationResult

### Properties

```csharp
public Uri CallbackUri { get; }
```

The response URI containing authentication data.

```csharp
public IReadOnlyDictionary<string, string> Parameters { get; }
```

The parameters of the `CallbackUri` query string. Names are matched case-sensitively. A name that appears more than once is left out, as OAuth 2.0 (RFC 6749, section 3.1) does not allow repeated parameters.

```csharp
public string? Code { get; }
public string? State { get; }
public string? Error { get; }
public string? ErrorDescription { get; }
```

The corresponding OAuth 2.0 query parameters, or `null` when absent or repeated. Compare `State` against the value sent in the authorization request, and check `Error` before using `Code`.

## Usage example

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
    new WebAuthenticatorOptions(
        RequestUri: new Uri(googleAuthRequestUri),
        RedirectUri: new Uri(googleAuthRedirectUri)));
```

Similarly it can be done with [Microsoft identity](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow), [Facebook Login](https://developers.facebook.com/docs/facebook-login/) or other OAuth2 standard compatible options.

## Platform support

| Feature                     | Windows | macOS (10.15+) | Linux | iOS (iOS 12.0+) | Android  | Browser  |
|-----------------------------|---------|-------|-------|-----|-----------|-----------|
| Platform Implementation  | ✗       | ✓*     | ✗     | ✓*   | ✓**         | ✓***         |
| NativeWebDialog         | ✓       | ✓     | ✓     | ✗   | ✗         | ✗         |
| Browser                 | ✓       | ✓     | ✓     | ✓   | ✓         | ✗         |

\* Apple platforms use ASWebAuthenticationSession implementation.  
\** Android uses CustomTabsIntent implementation, but support is experimental and might be changed.  
\*** Browser solution requires CORS to be configured to allow access to the redirected page. .NET 10 is also necessary to run this library in browser.

## See also

- [NativeWebView](/controls/web/nativewebview)
- [NativeWebDialog](/controls/web/nativewebdialog)
- [WebView environment options](/controls/web/webview-environment)
- [Embedding web content](/docs/app-development/embedding-web-content)
- [FAQ](/tools/faq#webview)
