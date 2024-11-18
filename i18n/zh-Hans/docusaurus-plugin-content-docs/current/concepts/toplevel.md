---
description: CONCEPTS
---

# 顶级控件

顶级控件充当视觉根，并且是所有顶级控件（例如`Window`）的基类。它处理布局、样式和渲染的调度，以及跟踪客户端大小。大多数服务都通过顶级控件访问。

## 获取顶级控件

以下是两种常见的访问顶级控件实例的方法。

### 使用TopLevel.GetTopLevel

您可以使用TopLevel类的静态`GetTopLevel`方法获取包含当前控件的顶级控件。

```cs
var topLevel = TopLevel.GetTopLevel(control);
// 在此处，您可以从topLevel实例引用各种服务，如Clipboard或StorageProvider。
```

如果您在用户控件或较低级别的组件中工作并且需要访问顶级控件的服务，此方法可能会有所帮助。

:::note
如果`TopLevel.GetTopLevel`返回null，则可能控件尚未附加到根。为确保控件已附加，您应该处理`Control.Loaded`和`Control.Unloaded`事件，并从这些事件中跟踪当前顶级控件。
:::

### 使用Window类

由于`Window`类继承自`TopLevel`，因此您可以直接从`Window`实例访问服务：

```cs
var topLevel = window;
```

当您已经在窗口的上下文中工作时，例如在ViewModel或`Window`类中的事件处理程序中，通常会使用此方法。

## 常见属性

### ActualTransparencyLevel

获取平台能够提供的实际`WindowTransparencyLevel`。

```cs
WindowTransparencyLevel ActualTransparencyLevel { get; }
```

### ClientSize

获取窗口的客户端大小。

```cs
Size ClientSize { get; }
```

### Clipboard

获取平台的[Clipboard](./services/clipboard)实现。

```cs
IClipboard? Clipboard { get; }
```

### FocusManager

获取根的[焦点管理器](./services/focus-manager)。

```cs
IFocusManager? FocusManager { get; }
```

### FrameSize

获取顶级控件的总大小，包括系统框架（如果有）。

```cs
Size? FrameSize { get; }
```

### InsetsManager

获取平台的[InsetsManager](./services/insets-manager)实现。

```cs
IInsetsManager? InsetsManager { get; }
```

### PlatformSettings

表示访问顶级[平台特定设置](./services/platform-settings)的契约。

```cs
IPlatformSettings? PlatformSettings { get; }
```

### RendererDiagnostics

获取一个值，指示渲染器是否应绘制特定的诊断信息。

```cs
RendererDiagnostics RendererDiagnostics { get; }
```

### RenderScaling

获取用于渲染的缩放因子。

```cs
double RenderScaling { get; }
```

### RequestedThemeVariant

获取或设置控件（及其子元素）用于资源确定的UI主题变体。您使用ThemeVariant指定的UI主题可以覆盖应用程序级别的ThemeVariant。

```cs
ThemeVariant? RequestedThemeVariant { get; set; }
```

### StorageProvider

用于文件选择器和书签的[文件系统存储](./services/storage-provider/)服务。

```cs
IStorageProvider StorageProvider { get; }
```

### TransparencyBackgroundFallback

获取或设置当不支持透明度时，透明度将与之混合的`IBrush`。默认情况下，这是一个纯白色的画刷。

```cs
IBrush TransparencyBackgroundFallback { get; set; }
```

### TransparencyLevelHint

获取或设置TopLevel在可能的情况下应使用的`WindowTransparencyLevel`。接受多个值，按照回退顺序应用。例如，使用"Mica，Blur"，Mica仅在支持它的平台上应用，其余平台上使用Blur。默认值是一个空数组或"None"。

```cs
IReadOnlyList<WindowTransparencyLevel> TransparencyLevelHint { get; set; }
```

## 常见事件

### BackRequested

在按下物理返回按钮或请求后退导航时发生。

```cs
event EventHandler<RoutedEventArgs> BackRequested { add; remove; }
```

### Closed

窗口关闭时触发。

```cs
event EventHandler Closed;
```

### Opened

窗口打开时触发。

```cs
event EventHandler Opened;
```

### ScalingChanged

当TopLevel的缩放发生变化时发生。

```cs
event EventHandler ScalingChanged;
```

## 常见方法

### GetTopLevel

获取给定`Visual`所托管的`TopLevel`。

#### 参数

`control`
要查询其TopLevel的可视对象

```cs
static TopLevel? GetTopLevel(Visual? visual)
```

### RequestAnimationFrame

将回调排队，以在下一个动画刻度上调用

```cs
void RequestAnimationFrame(Action<TimeSpan> action)
```

### RequestPlatformInhibition

请求抑制`PlatformInhibitionType`。行为将保持抑制，直到返回值被释放。可用的`PlatformInhibitionType`集取决于平台。如果在不支持此类型的平台上抑制行为，则请求将不起作用。

```cs
async Task<IDisposable> RequestPlatformInhibition(PlatformInhibitionType type, string reason)
```

### TryGetPlatformHandle

尝试获取派生自TopLevel的控件的平台句柄。

```cs
IPlatformHandle? TryGetPlatformHandle()
```

## 更多信息

在_GitHub_上查看源代码 [`TopLevel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TopLevel.cs)"
