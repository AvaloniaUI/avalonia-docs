---
id: faq
title: FAQ
toc_max_heading_level: 2
---

## General

### Do I need a license to use Avalonia?

No. **Avalonia UI itself remains entirely open-source under the MIT license.** You can build and ship commercial applications with Avalonia completely free, forever. The Community License only applies to the professional tooling (Visual Studio extension, Dev Tools, Parcel), not the framework itself.

### What if I don't want any of this?

That's completely fine. All the legacy tooling remains open-source and available on GitHub:
- The existing Visual Studio extension
- Dev Tools
- TreeDataGrid

You can continue using them as they are today, or fork and maintain them independently if you prefer.

### Can I continue using the legacy tools?

Yes. The legacy FOSS Visual Studio extension remains available to clone and build at [github.com/AvaloniaUI/AvaloniaVS](https://github.com/AvaloniaUI/AvaloniaVS). The legacy Dev Tools source remains available. The original TreeDataGrid remains available. All are MIT licensed and can be used, forked, or maintained by anyone.

### When does my Community License expire?

Community Licenses do not expire as long as you remain eligible. However, if your circumstances change (e.g., your organization grows beyond the eligibility thresholds), you must upgrade to a paid license.

### What happens after the Visual Studio grace period?

After April 13th 2026, if you haven't registered for a Community License or purchased a paid license, you can:
- Continue using the legacy FOSS Visual Studio extension
- Switch to Visual Studio Code or JetBrains Rider (extensions remain freely available)
- Register for a Community License if eligible
- Purchase a paid license

## WebView

### Is offscreen rendering supported? To avoid airspace issue?

No, offscreen rendering is not currently supported. However, we are considering it as an optional feature for future releases.

### Why is NativeWebView control not supported on Linux?

`NativeWebView` requires a system browser that can be embedded into Avalonia. Unlike Windows and macOS, Linux has more complex native control embedding, which doesn't work reliably on Wayland-based desktop environments.

**Recommended Solution:** Design your app with `NativeWebDialog` as a fallback. This component provides a similar API to `NativeWebView` but operates in a dedicated window.

### Can I use WebAuthenticationBroker for Google Auth or Microsoft.Identity Auth?

Yes, both authentication providers are supported. You can either:
- Build request and redirect `Uri`s manually
- Integrate with `Google.Apis.Auth` and `Microsoft.Identity.Client` NuGet packages

Integration samples are available in our [sample repository](https://github.com/AvaloniaUI/Accelerate.Samples/tree/main/WebAuthenticationBrokerSample/WebAuthenticationBrokerSample).

### Why use WebAuthenticationBroker over other options?

While `Microsoft.Identity.Client` and `Google.Apis.Auth` include their own Web-UI dialogs, these are limited to specific platforms and providers. WebAuthenticationBroker offers:
- Provider-independent implementation
- Desktop platform support without special framework requirements
- Full macOS support without mac-catalyst limitations

### Does NativeWebView support camera/microphone/screenshare access via getUserMedia() API?

Yes, `getUserMedia()` API is supported across platforms. Users will receive permission prompts for camera, microphone, or screen sharing access, similar to desktop browsers. macOS support was added in version `11.2.4`.

Some platforms also require developer to configure permissions on the application bundle. If any particular permission is necessary for a main application, it's likely to be necessary for a web view. For example, [NSCameraUsageDescription](https://developer.apple.com/documentation/bundleresources/information-property-list/nscamerausagedescription?language=objc) is necessary for macOS/iOS on bundled apps.