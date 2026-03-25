---
id: focus-manager
title: Focus Manager
description: Manage keyboard focus in your Avalonia application using the FocusManager service to track, set, and clear the currently focused element.
doc-type: reference
---

The [`FocusManager`](/api/avalonia/input/focusmanager) service is responsible for managing keyboard focus in your application. It keeps track of the currently focused element and the current focus scope.

You can access `FocusManager` through an instance of [`TopLevel`](/api/avalonia/controls/toplevel) or `Window`. For more details on accessing `TopLevel`, visit the [TopLevel](/docs/fundamentals/top-level) page.

```csharp
var focusManager = window.FocusManager;
```

## Methods

### `GetFocusedElement()`

Returns the currently focused `IInputElement`, or `null` if no element has focus.

```csharp
IInputElement? GetFocusedElement()
```

You can use this method to inspect which control currently holds keyboard focus:

```csharp
var focused = focusManager.GetFocusedElement();
if (focused is TextBox textBox)
{
    // The user is currently editing a text box
}
```

### `ClearFocus()`

Removes keyboard focus from the currently focused element. After calling this method, `GetFocusedElement()` returns `null` until another element receives focus.

```csharp
void ClearFocus()
```

## Tips

### Focusing a control

You typically do not need the `FocusManager` service to focus a control. Instead, call the `Focus` method directly on the control:

```csharp
bool hasFocused = button.Focus();
```

The `Focus` method returns `false` if the control is not visible or its `Focusable` property is set to `false`.

### Listening for global focus changes

The `FocusManager.GetFocusedElement` method returns the currently focused control at a single point in time, so it is not suitable for reacting to focus changes as they happen. To listen for focus changes globally across all top levels, subscribe to the routed event:

```csharp
InputElement.GotFocusEvent.Raised.Subscribe(args =>
{
    var (sender, e) = args;
    // Handle focus change
});
```

### Tab navigation order

Controls are navigated in the order they appear in the visual tree by default. To change the tab order, set the `TabIndex` property on your controls:

```xml
<StackPanel>
    <TextBox TabIndex="2" PlaceholderText="Second" />
    <TextBox TabIndex="1" PlaceholderText="First" />
    <TextBox TabIndex="3" PlaceholderText="Third" />
</StackPanel>
```

### Preventing a control from receiving focus

Set `Focusable` to `False` to exclude a control from keyboard navigation:

```xml
<Button Content="Not focusable" Focusable="False" />
```

### Focus on load

To focus a specific control when your view loads, override `OnLoaded` and call `Focus` on the target control:

```csharp
protected override void OnLoaded(RoutedEventArgs e)
{
    base.OnLoaded(e);
    myTextBox.Focus();
}
```

## See also

- [Focus](/docs/input-interaction/focus): Focus system overview and focus events.
- [TopLevel](/docs/fundamentals/top-level): Accessing platform services from `TopLevel`.
