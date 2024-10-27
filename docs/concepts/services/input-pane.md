---
id: input-pane
title: Input Pane
---

# Input Pane <MinVersion version="11.1" />

The `InputPane` allows developers to listen for the platform's input pane (e.g., software keyboard or on-screen keyboard) current state and boundaries.

The `InputPane` can be access through an instance of `TopLevel` or `Window`, for more details on accessing `TopLevel` please visit [TopLevel](../toplevel) page:
```cs
var inputPane = TopLevel.GetTopLevel(control).InputPane;
```

:::note
Currently, Avalonia does not automatically adjust root view and scrolling position depending on state of the input pane. Instead, it is recommended for developers to use IInputPane API and adjust their apps accordingly.

Automatic adjustment is planned for future 11.* releases.
:::

## Properties 

### State
The current input pane state.
Possible values:
- `InputPaneState.Closed`
- `InputPaneState.Opened`

```cs
InputPaneState State { get; }
```

### OccludedRect
The current input pane bounds.

```cs
Rect OccludedRect { get; }
```

:::note
Return value is in client coordinates relative to the current top level.
Empty rectangle will be returned in case of floating/detached input pane, that is positioned on top of the view.
:::

## Events

### StateChanged
Occurs when the input pane's state has changed.

```cs
event EventHandler<InputPaneStateEventArgs>? StateChanged;
```

Notably, event arguments include several useful parameters:
- `InputPaneStateEventArgs.NewState` - new state of the input pane.
- `InputPaneStateEventArgs.StartRect` - initial bounds of the input pane.
- `InputPaneStateEventArgs.EndRect` - final bounds of the input pane.
- `InputPaneStateEventArgs.AnimationDuration` - duration of the input pane's state change animation.
- `InputPaneStateEventArgs.Easing` - easing of the input pane's state changed animation.

Having `AnimationDuration` and `Easing` allows developer to create a transition between two states.

## Platform compatibility:

| Feature        | Windows | macOS | Linux | Browser | Android |  iOS | Tizen |
|---------------|-------|-------|-------|-------|-------|-------|-------|
| `State` | ✔ | ✖ | ✖ | ✔* | ✔ | ✔ | ✖ |
| `OccludedRect` | ✔ | ✖ | ✖ | ✔*  | ✔ | ✔ | ✖ |
| `StateChanged` | ✔ | ✖ | ✖ | ✔* | ✔ | ✔ | ✖ |
| `StateChanged.StartRect` | ✖ | ✖ | ✖ | ✔* | ✔ | ✔ | ✖ |
| `StateChanged.AnimationDuration` | ✖ | ✖ | ✖ | ✖ | ✔ | ✔ | ✖ |
| `StateChanged.Easing` | ✖ | ✖ | ✖ | ✖ | ✔ | ✔ | ✖ |

\* - only mobile Chromium browsers support IInputPane API.