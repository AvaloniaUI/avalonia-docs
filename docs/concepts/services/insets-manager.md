---
id: insets-manager
title: Insets Manager
---

The `InsetsManager` allows you to interact with the platform's system bars and handle changes to the safe area of the window. It can be accessed via an instance of `TopLevel` or directly from the `Window` class. Here are two ways to access the `InsetsManager`.

## Using TopLevel.GetTopLevel
The `GetTopLevel` method of the `TopLevel` class retrieves the top-level control that contains the current control. From the obtained `TopLevel` instance, you can then access the `InsetsManager`:

```cs
var topLevel = TopLevel.GetTopLevel(control);
var insetsManager = topLevel.InsetsManager;
```

This method is handy when you are operating within a user control or a lower-level component and need access to the `InsetsManager`.

## Using the Window Class
As the `Window` class inherits from `TopLevel`, you can directly access the `InsetsManager` from an instance of `Window`:

```cs
var insetsManager = window.InsetsManager;
```
This method is commonly used when you're already working within the context of a window, such as in a ViewModel or an event handler within the `Window` class.

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

## Events

### SafeAreaChanged
Occurs when the safe area for the current window changes. This can happen when system bars are shown or hidden, or when the window's size or orientation changes.

```cs
event EventHandler<SafeAreaChangedArgs>? SafeAreaChanged;
```

---

# SafeAreaChangedArgs
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





