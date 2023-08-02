---
id: platform-settings
title: Platform Settings
---

`PlatformSettings` 类表示访问特定平台设置和信息的约定。其中一些设置可能会在运行时由用户在操作系统中全局更改。

可以通过 `TopLevel` 或 `Window` 实例来访问 `PlatformSettings`，有关访问 `TopLevel` 的更多详细信息，请访问 [TopLevel](../toplevel) 页面：

```cs
var platformSettings = window.PlatformSettings;
```

## 方法

### GetTapSize(PointerType type)
返回指针按下位置周围的矩形大小，以设备无关像素表示，此大小是指针抬起必须发生在其中的矩形区域，以注册触摸手势。

```cs 
Size GetTapSize(PointerType type);
```

### GetDoubleTapSize(PointerType type)
返回指针按下位置周围的矩形大小，以设备无关像素表示，此大小是指针抬起必须发生在其中的矩形区域，以注册双击手势。

```cs
Size GetDoubleTapSize(PointerType type);
```

### GetDoubleTapTime(PointerType type)
返回双击手势的第一次和第二次点击之间可能发生的最大时间间隔。

```cs
TimeSpan GetDoubleTapTime(PointerType type);
```

### GetColorValues()
返回当前系统颜色值，包括暗模式和强调色。

```cs
PlatformColorValues GetColorValues();
```

:::tip
虽然内置的 FluentTheme 支持在强调色之间自动切换，但此方法在应用自定义逻辑时非常有用，以使用操作系统颜色设置。
:::

## 属性

### HoldWaitDuration
指针按下和触发 `Holding` 事件之间的持续时间。

```cs
TimeSpan HoldWaitDuration { get; }
```

### HotkeyConfiguration
Avalonia 应用程序中特定于平台的热键配置。

```cs
PlatformHotkeyConfiguration HotkeyConfiguration { get; }
```

:::tip
当应用程序需要处理已知手势（如复制、粘贴或剪切）时，HotkeyConfiguration 尤其有用。
:::

```cs
protected override void OnKeyDown(KeyEventArgs e)
{
    var hotkeys = TopLevel.GetTopLevel(this).PlatformSettings.HotkeyConfiguration;
    if (hotkeys.Copy.Any(g => g.Matches(e)))
    {
        // 处理复制热键。
    }
}
```

## 事件

### ColorValuesChanged
当前系统颜色值更改时触发此事件。这包括暗模式和强调色的更改。

```cs
event EventHandler<PlatformColorValues>? ColorValuesChanged;
```
使用 `IPlatformSettings` 接口来使您的应用程序行为适应用户特定的平台设置。




