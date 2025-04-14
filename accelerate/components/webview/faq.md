# Frequently Asked Questions

## Is offscreen rendering supported? To avoid airspace issue?

No, offscreen rendering is not currently supported. However, we are considering it as an optional feature for future releases.

## Why is NativeWebView control not supported on Linux?

`NativeWebView` requires a system browser that can be embedded into Avalonia. Unlike Windows and macOS, Linux has more complex native control embedding, which doesn't work reliably on Wayland-based desktop environments.

**Recommended Solution:** Design your app with `NativeWebDialog` as a fallback. This component provides a similar API to `NativeWebView` but operates in a dedicated window.

## Can I use WebAuthenticationBroker for Google Auth or Microsoft.Identity Auth?

Yes, both authentication providers are supported. You can either:
- Build request and redirect `Uri`s manually
- Integrate with `Google.Apis.Auth` and `Microsoft.Identity.Client` NuGet packages

Integration samples are available in our [sample repository](https://github.com/AvaloniaUI/Accelerate.Samples/tree/main/WebAuthenticationBrokerSample/WebAuthenticationBrokerSample).

## Why use WebAuthenticationBroker over other options?

While `Microsoft.Identity.Client` and `Google.Apis.Auth` include their own Web-UI dialogs, these are limited to specific platforms and providers. WebAuthenticationBroker offers:
- Provider-independent implementation
- Desktop platform support without special framework requirements
- Full macOS support without mac-catalyst limitations

## Does NativeWebView support camera/microphone/screenshare access via getUserMedia() API?

Yes, `getUserMedia()` API is supported across platforms. Users will receive permission prompts for camera, microphone, or screen sharing access, similar to desktop browsers. macOS support was added in version `11.2.4`.