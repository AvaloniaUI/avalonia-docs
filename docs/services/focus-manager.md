---
id: focus-manager
title: Focus Manager
---

The `FocusManager` service is responsible for managing the keyboard focus for the application. It keeps track of the currently focused element and the current focus scope. 

The `FocusManager` can be access through an instance of `TopLevel` or `Window`, for more details on accessing `TopLevel` please visit [TopLevel](/docs/fundamentals/top-level) page.

```cs
var focusManager = window.FocusManager;
```

## Methods

### GetFocusedElement()
Returns the currently focused element.

```cs
IInputElement? GetFocusedElement()
```

### ClearFocus()
Clears the currently focused element.

```cs
void ClearFocus()
```

## Tips

### Focusing a control

Developers usually don't need a `FocusManager` service to focus a control. 
It can be achieved with a method call directly on the control:
```cs
var hasFocused = button.Focus();
```

`Focus` method might return `false` is control is not visible and has `Focusable` property set to false.

### Listening for global focus changes

While `FocusManager.GetFocusedElement` method allows to get currently focused control, it's not suitable as an event.
Instead, please use `InputElement.GotFocusEvent.Raised.Subscribe(handler)` method. Note, it listens events globally across all top levels.

### Tab navigation order

Controls are navigated in the order they appear in the visual tree by default. To change the tab order, use the `TabIndex` property:

```xml
<StackPanel>
    <TextBox TabIndex="2" PlaceholderText="Second" />
    <TextBox TabIndex="1" PlaceholderText="First" />
    <TextBox TabIndex="3" PlaceholderText="Third" />
</StackPanel>
```

### Preventing a control from receiving focus

Set `Focusable="False"` to exclude a control from keyboard navigation:

```xml
<Button Content="Not focusable" Focusable="False" />
```

### Focus on load

To focus a specific control when a view loads:

```csharp
protected override void OnLoaded(RoutedEventArgs e)
{
    base.OnLoaded(e);
    myTextBox.Focus();
}
```

## See Also

- [Focus](/docs/input-interaction/focus): Focus system overview and focus events.
- [Keyboard and Hotkeys](/docs/input-interaction/keyboard-and-hotkeys): Key bindings and keyboard navigation.