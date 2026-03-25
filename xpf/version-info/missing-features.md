---
id: missing-features
title: Missing features
description: A summary of WPF features that are unavailable, limited, or planned for future support in Avalonia XPF.
doc-type: reference
---

## Overview

XPF makes a best effort to implement all WPF APIs, but some features are difficult or impossible to support due to cross-platform constraints or underlying architectural differences. This page lists the features that are currently missing, partially implemented, or unlikely to be added so you can plan your migration accordingly.

## Features with limitations

The following features are available but have known restrictions:

- **`WebBrowser`**: XPF provides web content embedding through a different mechanism. See the [WebView docs](/docs/app-development/embedding-web-content) for details.
- **`FlowDocument`**: Basic flow document rendering is supported, but with the following limitations:
  - Paginated documents are not supported.
  - `PageHeader` and `PageFooter` are not supported.
  - `Floater` is not supported.
  - Some table features, such as row and column spans, are not supported.

## Features planned for future releases

The following features require significant engineering effort and will be available in a later release:

- `Viewport3D` and related 3D APIs
- `MediaElement` and `MediaPlayer`
- `InkCanvas`

If your application depends on any of these features, check the [release notes](/xpf/version-info/release-notes) regularly for updates on their progress.

## Features unlikely to be supported

The following features are unlikely to be supported due to platform restrictions:

- **Multiple UI threads** (multiple `Dispatcher` instances): macOS allows only one UI thread, and Windows and Linux have limited support. See [Known differences from WPF](/xpf/migration/known-differences#multiple-ui-threads) for more detail.
- **`HwndHost` / `HwndSource`**: These types are tightly coupled to Win32 window handles and have no cross-platform equivalent.
- **`XPS`**: XPS document support relies on a Windows operating system component that is not available on other platforms.

## Workarounds

If your application relies on a missing or limited feature, consider these strategies:

- **Conditional compilation**: Use `#if` directives to provide alternative implementations for XPF builds versus WPF builds.
- **Feature detection at runtime**: Check whether a feature is available before using it and provide a graceful fallback.
- **Contact the XPF team**: If a missing feature is critical to your application, reach out to the Avalonia team. Feature priority is often influenced by customer demand.

## See also

- [Known differences from WPF](/xpf/migration/known-differences)
- [Release notes](/xpf/version-info/release-notes)
- [Versioning](/xpf/version-info/versioning)
