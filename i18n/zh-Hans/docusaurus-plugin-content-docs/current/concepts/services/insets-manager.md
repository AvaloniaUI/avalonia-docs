---
id: insets-manager
title: Insets Manager
---

`InsetsManager` 允许您与平台的系统栏进行交互，并处理移动窗口的安全区域变化。

`InsetsManager` 可以通过 `TopLevel` 或 `Window` 的实例来访问，有关访问 `TopLevel` 的更多详细信息，请访问 [TopLevel](../toplevel) 页面：
```cs
var insetsManager = TopLevel.GetTopLevel(control).InsetsManager;
```

:::note
截至目前，此服务仅在移动和浏览器后端上实现。如果您需要调整桌面窗口装饰，请使用 `Window.ExtendClientAreaToDecorationsHint`、`Window.ExtendClientAreaChromeHints` 和 `Window.ExtendClientAreaTitleBarHeightHint` 属性。
:::

## 属性

### IsSystemBarVisible
获取或设置一个值，指示系统栏是否可见。如果平台不支持显示或隐藏系统栏，则返回 null。

```cs
bool? IsSystemBarVisible { get; set; }
```

### DisplayEdgeToEdge
获取或设置一个值，指示窗口是否应在任何可见的系统栏后绘制到边缘。

```cs
bool DisplayEdgeToEdge { get; set; }
```

### SafeAreaPadding
获取当前的安全区域填充。安全区域代表窗口不被系统栏遮挡的部分。

```cs
Thickness SafeAreaPadding { get; }
```

### SystemBarColor
获取或设置平台系统栏的颜色。如果平台不支持设置系统栏颜色，则返回 null。

```cs
Color? SystemBarColor { get; set; }
```

## 事件

### SafeAreaChanged
当前窗口的安全区域发生变化时触发此事件。这可能发生在系统栏显示或隐藏时，或者窗口的大小或方向发生变化时。

```cs
event EventHandler<SafeAreaChangedArgs>? SafeAreaChanged;
```

---

# SafeAreaChangedArgs
SafeAreaChangedArgs 是一个类，提供 SafeAreaChanged 事件的数据。

## 属性

### SafeAreaPadding
获取新的安全区域填充。

```
public Thickness SafeAreaPadding { get; }
```

---

# SystemBarTheme
SystemBarTheme 是一个枚举，其值代表系统栏的浅色和深色主题。

## 值

### Light
系统栏具有浅色背景和深色前景。

### Dark
系统栏具有深色背景和浅色前景。





