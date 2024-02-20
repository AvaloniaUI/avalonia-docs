---
id: focus-manager
title: Focus Manager
---

The `FocusManager` service is responsible for managing the keyboard focus for the application. It keeps track of the currently focused element and the current focus scope. 

The `FocusManager` can be access through an instance of `TopLevel` or `Window`, for more details on accessing `TopLevel` please visit [TopLevel](../toplevel) page:
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