---
id: insets-manager
title: Insets Manager
description: "Manage system bar visibility, safe area padding, and edge-to-edge display on mobile and browser platforms in Avalonia."
doc-type: guide
---

The `InsetsManager` allows you to interact with the platform's system bars and handle changes to the safe area of the mobile window. 

The `InsetsManager` can be access through an instance of `TopLevel` or `Window`, for more details on accessing `TopLevel` please visit [TopLevel](/docs/fundamentals/top-level) page.

```csharp
var insetsManager = TopLevel.GetTopLevel(control).InsetsManager;
```

:::note
This service is implemented on mobile and browser backends. For desktop window decoration customization, use `Window.ExtendClientAreaToDecorationsHint` with `WindowDrawnDecorations`. See [Window Management](/docs/app-development/window-management#custom-title-bar) for details.
:::

:::note
Starting with Avalonia 11.1, any Avalonia app will automatically adjust its root view accordingly to the inset values. This behavior can be disabled by setting `TopLevel.AutoSafeAreaPadding="False"` attached property value on the root view.
:::

## Properties

### IsSystemBarVisible
Gets or sets a value indicating whether the system bars are visible. Returns null if the platform doesn't support showing or hiding system bars.

```csharp
bool? IsSystemBarVisible { get; set; }
```

### DisplayEdgeToEdge
Gets or sets a value indicating whether the window should be drawn edge-to-edge behind any visible system bars.

```csharp
bool DisplayEdgeToEdge { get; set; }
```

### SafeAreaPadding
Gets the current safe area padding. The safe area represents the portion of the window that is not obscured by system bars.

```csharp
Thickness SafeAreaPadding { get; }
```

### SystemBarColor
Gets or sets the color of the platform's system bars. Returns null if the platform doesn't support setting the system bar color.

```csharp
Color? SystemBarColor { get; set; }
```

## Events

### SafeAreaChanged
Occurs when the safe area for the current window changes. This can happen when system bars are shown or hidden, or when the window's size or orientation changes.

```csharp
event EventHandler<SafeAreaChangedArgs>? SafeAreaChanged;
```

#### SafeAreaChangedArgs

SafeAreaChangedArgs is a class that provides data for the SafeAreaChanged event.

#### SafeAreaPadding
Gets the new safe area padding.

```csharp
public Thickness SafeAreaPadding { get; }
```

## SystemBarTheme

SystemBarTheme is an enumeration with values that represent light and dark themes for the system bar.

### Light
The system bar has a light background and a dark foreground.

### Dark
The system bar has a dark background and a light foreground.


## Platform compatibility

| Feature        | Windows | macOS | Linux | Browser | Android |  iOS |
|---------------|-------|-------|-------|-------|-------|-------|
| `IsSystemBarVisible` | ✗ | ✗ | ✗ | ✓* | ✓ | ✓ |
| `DisplayEdgeToEdge` | ✗ | ✗ | ✗ | ✗  | ✓ | ✓ |
| `SafeAreaPadding` | ✗ | ✗ | ✗ | ✓* | ✓ | ✓ |
| `SystemBarColor` | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| `SafeAreaChanged` | ✗ | ✗ | ✗ | ✓* | ✓ | ✓ |

\* - only mobile Chromium browsers support IInsetsManager API.

## See also

- [Input Pane](input-pane): Software keyboard state and boundaries.
- [TopLevel](/docs/fundamentals/top-level): Accessing platform services from controls.