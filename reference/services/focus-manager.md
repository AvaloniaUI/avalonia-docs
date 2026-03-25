---
id: focus-manager
title: Focus Manager
description: Reference for the FocusManager service in Avalonia, which tracks and controls keyboard focus and focus scopes.
doc-type: reference
---

The `FocusManager` service is responsible for managing keyboard focus for your application. It tracks the currently focused element and the current focus scope.

You can access the `FocusManager` through an instance of `TopLevel` or `Window`. For more details on accessing `TopLevel`, visit the [TopLevel](/docs/fundamentals/top-level) page.

```csharp
var focusManager = window.FocusManager;
```

## Methods

### `GetFocusedElement()`

Returns the currently focused `IInputElement`, or `null` if no element has focus.

```csharp
IInputElement? GetFocusedElement()
```

Use this method when you need to inspect which element currently holds keyboard focus:

```csharp
var focused = window.FocusManager.GetFocusedElement();
if (focused is TextBox textBox)
{
    // The user is currently editing text.
}
```

### `ClearFocus()`

Removes focus from the currently focused element. After calling this method, `GetFocusedElement()` returns `null` until another element receives focus.

```csharp
void ClearFocus()
```

This is useful when you want to dismiss an on-screen keyboard on mobile platforms or ensure that no control is capturing keyboard input:

```csharp
window.FocusManager.ClearFocus();
```

## Common patterns

### Focusing a control directly

You typically do not need the `FocusManager` to set focus on a control. Instead, call the `Focus()` method directly on the control:

```csharp
bool hasFocused = myTextBox.Focus();
```

The `Focus()` method returns `false` if the control is not visible or if its `Focusable` property is set to `false`.

### Focusing a control when a view loads

A common requirement is to focus a specific control as soon as a view appears. You can do this by handling the `Loaded` event or using `AttachedToVisualTree`:

```csharp
public class MyView : UserControl
{
    protected override void OnLoaded(RoutedEventArgs e)
    {
        base.OnLoaded(e);
        myTextBox.Focus();
    }
}
```

Alternatively, in AXAML you can use the `Interactions.Loaded` behavior or a custom `AttachedProperty` to set initial focus declaratively.

### Listening for global focus changes

The `GetFocusedElement()` method returns the currently focused control at the time you call it, but it does not notify you when focus changes. To observe focus changes globally, subscribe to the routed `GotFocus` event:

```csharp
InputElement.GotFocusEvent.Raised.Subscribe(args =>
{
    var (sender, e) = args;
    Console.WriteLine($"Focus moved to: {sender}");
});
```

:::note
This subscription listens for focus events globally across all top levels in your application.
:::

### Conditionally reacting to focus state

You can combine `GetFocusedElement()` with control identity checks to run logic based on which control is focused:

```csharp
var focused = window.FocusManager.GetFocusedElement();
if (focused == searchBox)
{
    // Show search suggestions.
}
```

For styling based on focus state, use the `:focus`, `:focus-within`, or `:focus-visible` pseudoclasses in your AXAML styles instead of querying `FocusManager` in code.

## See also

- [Focus](/concepts/ui-concepts/user-input/focus) for a conceptual overview of focus, tab navigation, and directional navigation.
- [TopLevel](/docs/fundamentals/top-level) for details on accessing top-level services like `FocusManager`.
- [Input events](/docs/events/input-events) for information on handling keyboard and pointer events.
