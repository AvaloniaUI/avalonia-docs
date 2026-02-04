---
id: properties
title: Properties
---

## DependencyProperty

The Avalonia equivalent of `DependencyProperty` is `StyledProperty`, however Avalonia [has a richer property system than WPF](/docs/guides/custom-controls/defining-properties), and includes `DirectProperty` for turning standard CLR properties into Avalonia properties. The common base class of `StyledProperty` and `DirectProperty` is `AvaloniaProperty`.

## PropertyChangedCallback

Listening to changes on DependencyProperties in WPF can be complex. When you register a `DependencyProperty` you can supply a static `PropertyChangedCallback` but if you want to listen to changes from elsewhere [things can get complicated and error-prone](https://stackoverflow.com/questions/23682232).

In Avalonia, there is no `PropertyChangedCallback` at the time of registration, instead a class listener is [added to the control's static constructor in much the same way that event class listeners are added](/docs/data/binding-from-code).

<XpfAd/>