---
id: input-pane
title: Input Pane 输入面板
---

# 输入面板 <MinVersion version="11.1" />

`InputPane` 允许开发者监听平台输入面板（例如，软键盘或屏幕键盘）的当前状态和边界。

`InputPane` 可以通过 `TopLevel` 或 `Window` 的实例访问，有关访问 `TopLevel` 的更多详细信息，请访问 [TopLevel](../toplevel) 页面：
```cs
var inputPane = TopLevel.GetTopLevel(control).InputPane;
```

:::note
目前Avalonia 不会根据输入面板的状态自动调整root视图和滚动位置。相反的，建议开发者使用 `IInputPane` API 并相应地调整他们的应用程序。

自动调整计划在未来的 11.* 版本中实现。
:::

## 属性

### State

当前输入面板状态。可能的值：
- `InputPaneState.Closed`
- `InputPaneState.Opened`

```cs
InputPaneState State { get; }
```

### OccludedRect

当前输入面板的边界。

```cs
Rect OccludedRect { get; }
```

:::note
返回值是以当前顶级窗口的客户端坐标表示的。如果输入面板是浮动或分离的，并位于视图顶部，则会返回一个空矩形。
:::

## 事件

### StateChanged

当输入面板的状态发生变化时触发。

```cs
event EventHandler<InputPaneStateEventArgs>? StateChanged;
```

值得注意的是，事件参数包括几个有用的参数：
- `InputPaneStateEventArgs.NewState` - 输入面板的新状态。
- `InputPaneStateEventArgs.StartRect` - 输入面板的初始边界。
- `InputPaneStateEventArgs.EndRect` - 输入面板的最终边界。
- `InputPaneStateEventArgs.AnimationDuration` - 输入面板状态变化动画的持续时间。
- `InputPaneStateEventArgs.Easing` - 输入面板状态变化动画的缓动效果。

拥有 `AnimationDuration` 和 `Easing` 允许开发者在两个状态之间创建过渡。

## 平台兼容性：

| 功能                  | Windows | macOS | Linux | 浏览器 | Android | iOS | Tizen |
|-----------------------|---------|-------|-------|--------|---------|-----|-------|
| `State`               | ✔       | ✖     | ✖     | ✔*     | ✔       | ✔   | ✖     |
| `OccludedRect`        | ✔       | ✖     | ✖     | ✔*     | ✔       | ✔   | ✖     |
| `StateChanged`        | ✔       | ✖     | ✖     | ✔*     | ✔       | ✔   | ✖     |
| `StateChanged.StartRect` | ✖     | ✖     | ✖     | ✔*     | ✔       | ✔   | ✖     |
| `StateChanged.AnimationDuration` | ✖    | ✖     | ✖     | ✖       | ✔       | ✔   | ✖     |
| `StateChanged.Easing` | ✖       | ✖     | ✖     | ✖       | ✔       | ✔   | ✖     |

\* - 仅移动版 Chromium 浏览器支持 `IInputPane` API。