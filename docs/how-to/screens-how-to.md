---
id: screens-how-to
title: "How to: Work with screens"
description: How to obtain information about connected monitors through the Screens API, and how to query or respond to them.
doc-type: how-to
---

The [`Screens` API](/api/avalonia/controls/screens) provides information about connected monitors.

## Accessing screens

Access `Screens` from any [`TopLevel`](/docs/fundamentals/top-level):

```csharp
var screens = TopLevel.GetTopLevel(this)?.Screens;
```

## Querying screens

```csharp
// All connected screens
var allScreens = screens.All;

// Primary monitor
var primary = screens.Primary;

// Screen containing a specific window
var currentScreen = screens.ScreenFromWindow(this);

// Screen at a point
var screenAtPoint = screens.ScreenFromPoint(new PixelPoint(500, 300));
```

## `Screen` properties

| Property | Type | Description |
|---|---|---|
| `Bounds` | `PixelRect` | Screen dimensions in pixels. |
| `WorkingArea` | `PixelRect` | Usable area in pixels. Excludes taskbars and docks. |
| `Scaling` | `double` | DPI scaling factor (e.g., 1.0 for 96 DPI, 1.5 for 144 DPI). |
| `IsPrimary` | `bool` | Whether this screen is the primary display. |
| `DisplayName` | `string?` | Display name reported by the operating system. |
| `CurrentOrientation` | `ScreenOrientation` | Screen orientation, e.g., landscape, portrait. |

## Responding to screen changes

Subscribe to the `Changed` event to detect when monitors are added, removed, or reconfigured.

```csharp
screens.Changed += (sender, args) =>
{
    // Re-evaluate window placement or layout
    var count = screens.All.Count;
};
```

## See also

- [Top level](/docs/fundamentals/top-level)
- [`Screens` API reference](/api/avalonia/controls/screens)