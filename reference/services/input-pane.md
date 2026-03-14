---
id: input-pane
title: Input Pane
description: Reference for Avalonia's IInputPane service, which provides information about the platform's on-screen keyboard state and bounds.
doc-type: reference
---

# Input pane

The `IInputPane` service allows you to monitor the platform's input pane (for example, a software keyboard or on-screen keyboard) and react to changes in its state and bounds. This is useful when you need to adjust your layout so that the on-screen keyboard does not obscure important content.

You can access the `IInputPane` through an instance of `TopLevel` or `Window`. For more details on accessing `TopLevel`, visit the [TopLevel](/docs/fundamentals/top-level) page.

```csharp
var inputPane = TopLevel.GetTopLevel(control).InputPane;
```

:::note
Currently, Avalonia does not automatically adjust the root view or scrolling position based on the state of the input pane. You should use the `IInputPane` API and adjust your app layout accordingly.

Automatic adjustment is planned for future 11.x releases.
:::

## Properties

### `State`

Returns the current state of the input pane. Possible values are:

- `InputPaneState.Closed`
- `InputPaneState.Opened`

```csharp
InputPaneState State { get; }
```

### `OccludedRect`

Returns the current bounds of the input pane as a `Rect`. You can use this value to determine how much of your layout is covered by the keyboard.

```csharp
Rect OccludedRect { get; }
```

:::note
The return value is in client coordinates relative to the current `TopLevel`. An empty rectangle is returned when the input pane is floating or detached and positioned on top of the view.
:::

## Events

### `StateChanged`

Occurs when the input pane's state changes (for example, when the on-screen keyboard opens or closes).

```csharp
event EventHandler<InputPaneStateEventArgs>? StateChanged;
```

The `InputPaneStateEventArgs` includes the following properties:

| Property | Description |
|---|---|
| `NewState` | The new `InputPaneState` of the input pane. |
| `StartRect` | The initial bounds of the input pane before the transition. |
| `EndRect` | The final bounds of the input pane after the transition. |
| `AnimationDuration` | The duration of the input pane's state change animation. |
| `Easing` | The easing function applied to the state change animation. |

You can use `AnimationDuration` and `Easing` to create a smooth transition in your layout that matches the keyboard animation.

## Platform compatibility

| Feature        | Windows | macOS | Linux | Browser | Android |  iOS |
|---|---|---|---|---|---|---|
| `State` | ✓ | ✗ | ✗ | ✓* | ✓ | ✓ |
| `OccludedRect` | ✓ | ✗ | ✗ | ✓*  | ✓ | ✓ |
| `StateChanged` | ✓ | ✗ | ✗ | ✓* | ✓ | ✓ |
| `StateChanged.StartRect` | ✗ | ✗ | ✗ | ✓* | ✓ | ✓ |
| `StateChanged.AnimationDuration` | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| `StateChanged.Easing` | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |

\* Only mobile Chromium browsers support the `IInputPane` API.

## See also

- [TopLevel](/docs/fundamentals/top-level)
- [TextBox](../controls/detailed-reference/textbox.md)
- [AutoCompleteBox](../controls/detailed-reference/autocompletebox.md)