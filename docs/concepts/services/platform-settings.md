---
id: platform-settings
title: Platform Settings
---

The `PlatformSettings` class represents a contract for accessing platform-specific settings and information. Some of these settings might be changed by the user globally in the OS in runtime. 

The `PlatformSettings` can be access through an instance of `TopLevel` or `Window`, for more details on accessing `TopLevel` please visit [TopLevel](../toplevel) page:
```cs
var platformSettings = window.PlatformSettings;
```

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

```cs
TimeSpan GetDoubleTapTime(PointerType type);
```

### GetColorValues()
Returns the current system color values, including dark mode and accent colors.

```cs
PlatformColorValues GetColorValues();
```

:::tip
While build-in FluentTheme supports automatic switching between accent colors, this method is useful to apply custom logic with OS color settings.
:::

## Properties

### HoldWaitDuration
The duration between pointer press and when the `Holding` event is fired.

```cs
TimeSpan HoldWaitDuration { get; }
```

### HotkeyConfiguration
The configuration for platform-specific hotkeys in an Avalonia application.

```cs
PlatformHotkeyConfiguration HotkeyConfiguration { get; }
```

:::tip
HotkeyConfiguration is especially useful when application needs to handle well known gestures like Copy, Paste or Cut.
:::

```cs
protected override void OnKeyDown(KeyEventArgs e)
{
    var hotkeys = TopLevel.GetTopLevel(this).PlatformSettings.HotkeyConfiguration;
    if (hotkeys.Copy.Any(g => g.Matches(e)))
    {
        // Handle Copy hotkey.
    }
}
```


## Events

### ColorValuesChanged
Raised when current system color values are changed. This includes changes to dark mode and accent colors.

```cs
event EventHandler<PlatformColorValues>? ColorValuesChanged;
```
Use the `IPlatformSettings` interface to adapt your application's behavior to user-specific platform settings.




