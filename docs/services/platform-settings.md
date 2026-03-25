---
id: platform-settings
title: Platform Settings
description: Access platform-specific settings such as tap sizes, double-tap timing, system colors, and hotkey configuration through the PlatformSettings service.
doc-type: reference
---

The `PlatformSettings` service provides access to platform-specific settings and information. Some of these settings can change at runtime if a user modifies their OS preferences, so your application can respond dynamically.

You access `PlatformSettings` through the `GetPlatformSettings` extension method on any `Visual`. For more details on accessing platform services, visit the [TopLevel](/docs/fundamentals/top-level) page.

```csharp title="Getting PlatformSettings"
var platformSettings = myControl.GetPlatformSettings();
```

## Methods

### `GetTapSize(PointerType type)`

Returns the size of the rectangle around a pointer-down location within which a pointer-up must occur to register a tap gesture. The value is in device-independent pixels.

```csharp
Size GetTapSize(PointerType type);
```

### `GetDoubleTapSize(PointerType type)`

Returns the size of the rectangle around a pointer-down location within which a pointer-up must occur to register a double-tap gesture. The value is in device-independent pixels.

```csharp
Size GetDoubleTapSize(PointerType type);
```

### `GetDoubleTapTime(PointerType type)`

Returns the maximum time allowed between the first and second tap of a double-tap gesture.

```csharp
TimeSpan GetDoubleTapTime(PointerType type);
```

### `GetColorValues()`

Returns the current system color values, including whether dark mode is active and what accent color the user has chosen.

```csharp
PlatformColorValues GetColorValues();
```

:::tip
While the built-in `FluentTheme` supports automatic switching between accent colors, you can use this method to apply custom logic based on OS color settings.
:::

## Properties

### `HoldWaitDuration`

Gets the duration between a pointer press and when the `Holding` event fires.

```csharp
TimeSpan HoldWaitDuration { get; }
```

### `HotkeyConfiguration`

Gets the platform-specific hotkey configuration for your Avalonia application. This property returns a `PlatformHotkeyConfiguration` object that contains the key gestures for common operations such as copy, paste, cut, select all, and undo.

```csharp
PlatformHotkeyConfiguration HotkeyConfiguration { get; }
```

:::tip
`HotkeyConfiguration` is especially useful when your application needs to handle well-known gestures like Copy, Paste, or Cut in a platform-aware way.
:::

The following example shows how you can check whether a key event matches the platform's Copy gesture:

```csharp title="Handling platform-specific hotkeys"
protected override void OnKeyDown(KeyEventArgs e)
{
    var hotkeys = this.GetPlatformSettings()?.HotkeyConfiguration;
    if (hotkeys is not null && hotkeys.Copy.Any(g => g.Matches(e)))
    {
        // Handle Copy hotkey.
    }
}
```

## Events

### `ColorValuesChanged`

Raised when the system color values change. This includes changes to dark mode and accent colors. You can subscribe to this event to update your application's appearance in real time.

```csharp
event EventHandler<PlatformColorValues>? ColorValuesChanged;
```

The following example subscribes to color changes and logs the new theme variant:

```csharp title="Responding to system color changes"
var platformSettings = myControl.GetPlatformSettings();
if (platformSettings is not null)
{
    platformSettings.ColorValuesChanged += (sender, values) =>
    {
        Debug.WriteLine($"Theme variant: {values.ThemeVariant}");
    };
}
```

## See also

- [TopLevel](/docs/fundamentals/top-level): Accessing platform services from controls.
- [Pointer events](/docs/input-interaction/pointer): Working with pointer input and gestures.
- [Gestures](/docs/input-interaction/gestures): Handling tap and other gesture events.

