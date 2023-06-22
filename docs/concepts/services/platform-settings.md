---
id: platform-settings
title: Platform Settings
---

The `PlatformSettings` class represents a contract for accessing platform-specific settings and information. Some of these settings might be changed by the user globally in the OS in runtime. `PlatformSettings` can be accessed via an instance of `TopLevel` or directly from the `Window` class. Here are two ways to access the `PlatformSettings`.

## Using TopLevel.GetTopLevel
The `GetTopLevel` method of the `TopLevel` class retrieves the top-level control that contains the current control. From the obtained `TopLevel` instance, you can then access the `PlatformSettings`:

var topLevel = TopLevel.GetTopLevel(control);
var platformSettings = topLevel.PlatformSettings;

This method is handy when you are operating within a user control or a lower-level component and need access to the `PlatformSettings`.

## Using the Window Class
As the `Window` class inherits from `TopLevel`, you can directly access the `PlatformSettings` from an instance of `Window`:

var platformSettings = window.PlatformSettings;

This method is commonly used when you're already working within the context of a window, such as in a ViewModel or an event handler within the `Window` class.


## Methods

### GetTapSize(PointerType type)
Returns the size of the rectangle around the location of a pointer down that a pointer up must occur within in order to register a tap gesture, in device-independent pixels.

```cs 
Size GetTapSize(PointerType type);
```

### GetDoubleTapSize(PointerType type)
Returns the size of the rectangle around the location of a pointer down that a pointer up must occur within in order to register a double-tap gesture, in device-independent pixels.

```cs
Size GetDoubleTapSize(PointerType type);
```

### GetDoubleTapTime(PointerType type)
Returns the maximum time that may occur between the first and second click of a double-tap gesture.

```
TimeSpan GetDoubleTapTime(PointerType type);
```

### GetColorValues()
Returns the current system color values, including dark mode and accent colors.

```cs
PlatformColorValues GetColorValues();
```

## Properties

### HoldWaitDuration
The duration between pointer press and when an event is fired.

```cs
TimeSpan HoldWaitDuration { get; }
```

### HotkeyConfiguration
The configuration for platform-specific hotkeys in an Avalonia application.

```cs
PlatformHotkeyConfiguration HotkeyConfiguration { get; }
```

## Events

### ColorValuesChanged
Raised when current system color values are changed. This includes changes to dark mode and accent colors.

```cs
event EventHandler<PlatformColorValues>? ColorValuesChanged;
```
Use the `IPlatformSettings` interface to adapt your application's behavior to user-specific platform settings.




