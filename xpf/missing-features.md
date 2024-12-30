---
id: missing-features
title: Missing features
---

While XPF makes a best attempt to implement all WPF APIs, there are still some places where this is difficult or impossible.

The following features are available, but with limitations:

- `WebBrowser` see our [WebView docs](embedding/web-view)
- `FlowDocument`
  - Paginated documents are not supported
  - `PageHeader`/`PageFooter` are not supported
  - `Floater` is not supported
  - There are some limitations on tables such as row/column spans not being supported

The following features will be available later but require significant engineering effort:

- `Viewport3D` and related 3D APIs
- `MediaElement` and `MediaPlayer`

The following features are unlikely to be supported due to platform restrictions:

- [Multiple UI threads](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/threading-model?view=netframeworkdesktop-4.8#multiple-windows-multiple-threads) (multiple `Dispatcher` instances)
- `HwndHost` / `HwndSource`
- `XPS` - this relies on a Windows operating system component