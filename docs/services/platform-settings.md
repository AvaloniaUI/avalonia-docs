---
id: platform-settings
title: Platform Settings
---

The `PlatformSettings` class represents a contract for accessing platform-specific settings and information. Some of these settings might be changed by the user globally in the OS in runtime. 

Access `PlatformSettings` through the `GetPlatformSettings` extension method on any `Visual`. For more details on accessing `TopLevel`, visit the [TopLevel](/docs/fundamentals/top-level) page.

```csharp
var platformSettings = myControl.GetPlatformSettings();
```

## Methods

### GetTapSize(PointerType type)
Returns the size of the rectangle around the location of a pointer down that a pointer up must occur within to register a tap gesture, in device-independent pixels.

```csharp
Size GetTapSize(PointerType type);
```

### GetDoubleTapSize(PointerType type)
Returns the size of the rectangle around the location of a pointer down that a pointer up must occur within to register a double-tap gesture, in device-independent pixels.

```csharp
Size GetDoubleTapSize(PointerType type);
```

### GetDoubleTapTime(PointerType type)
Returns the maximum time that may occur between the first and second click of a double-tap gesture.

```csharp
TimeSpan GetDoubleTapTime(PointerType type);
```

### GetColorValues()
Returns the current system color values, including dark mode and accent colors.

```csharp
PlatformColorValues GetColorValues();
```

:::tip
While build-in FluentTheme supports automatic switching between accent colors, this method is useful to apply custom logic with OS color settings.
:::

## Properties

### HoldWaitDuration
The duration between pointer press and when the `Holding` event is fired.

```csharp
TimeSpan HoldWaitDuration { get; }
```

### HotkeyConfiguration
The configuration for platform-specific hotkeys in an Avalonia application.

```csharp
PlatformHotkeyConfiguration HotkeyConfiguration { get; }
```

:::tip
HotkeyConfiguration is especially useful when application needs to handle well known gestures like Copy, Paste or Cut.
:::

```csharp
protected override void OnKeyDown(KeyEventArgs e)
{
    var hotkeys = this.GetPlatformSettings()?.HotkeyConfiguration;
    if (hotkeys.Copy.Any(g => g.Matches(e)))
    {
        // Handle Copy hotkey.
    }
}
```


## Events

### ColorValuesChanged
Raised when current system color values are changed. This includes changes to dark mode and accent colors.

```csharp
event EventHandler<PlatformColorValues>? ColorValuesChanged;
```
Use the `IPlatformSettings` interface to adapt your application's behavior to user-specific platform settings.

## See also

- [TopLevel](/docs/fundamentals/top-level): Accessing platform services from controls.

