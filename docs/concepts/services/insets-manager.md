---
id: insets-manager
title: Insets Manager
---

The `InsetsManager` allows you to interact with the platform's system bars and handle changes to the safe area of the mobile window. 

The `InsetsManager` can be access through an instance of `TopLevel` or `Window`, for more details on accessing `TopLevel` please visit [TopLevel](../toplevel) page:
```cs
var insetsManager = TopLevel.GetTopLevel(control).InsetsManager;
```

:::note
As for now, this service has implementation only on mobile and browser backends. If you need to adjust desktop window decorations, please use `Window.ExtendClientAreaToDecorationsHint`, `Window.ExtendClientAreaChromeHints`, `Window.ExtendClientAreaTitleBarHeightHint` properties.
:::

## Properties 

### IsSystemBarVisible
Gets or sets a value indicating whether the system bars are visible. Returns null if the platform doesn't support showing or hiding system bars.

```cs
bool? IsSystemBarVisible { get; set; }
```

### DisplayEdgeToEdge
Gets or sets a value indicating whether the window should be drawn edge-to-edge behind any visible system bars.

```cs
bool DisplayEdgeToEdge { get; set; }
```

### SafeAreaPadding
Gets the current safe area padding. The safe area represents the portion of the window that is not obscured by system bars.

```cs
Thickness SafeAreaPadding { get; }
```

### SystemBarColor
Gets or sets the color of the platform's system bars. Returns null if the platform doesn't support setting the system bar color.

```cs
Color? SystemBarColor { get; set; }
```

## Events

### SafeAreaChanged
Occurs when the safe area for the current window changes. This can happen when system bars are shown or hidden, or when the window's size or orientation changes.

```cs
event EventHandler<SafeAreaChangedArgs>? SafeAreaChanged;
```

---

# SafeAreaChangedArgs
SafeAreaChangedArgs is a class that provides data for the SafeAreaChanged event.

## Properties 

### SafeAreaPadding
Gets the new safe area padding.

```
public Thickness SafeAreaPadding { get; }
```

---

# SystemBarTheme
SystemBarTheme is an enumeration with values that represent light and dark themes for the system bar.

## Values

### Light
The system bar has a light background and a dark foreground.

### Dark
The system bar has a dark background and a light foreground.





