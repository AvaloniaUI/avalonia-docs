---
id: focus-manager
title: Focus Manager
---

The `FocusManager` class is responsible for managing the keyboard focus for the application. It keeps track of the currently focused element and the current focus scope. This class implements the `IFocusManager` interface.


## Methods

### FocusManager()
Static constructor that sets up a global handler for pointer pressed events.

```cs
static FocusManager()
```

### GetFocusedElement()
Returns the currently focused element.

```
IInputElement? GetFocusedElement()
```

### Focus(IInputElement? control, NavigationMethod method = NavigationMethod.Unspecified, KeyModifiers keyModifiers = KeyModifiers.None)

Tries to focus the provided control. If the control is part of a focus scope, the scope will be set to the current focus scope. If the control is null, the focus will be set to the topmost focus scope.

```cs
bool Focus(
    IInputElement? control, 
    NavigationMethod method = NavigationMethod.Unspecified,
    KeyModifiers keyModifiers = KeyModifiers.None)
```

### ClearFocus()
Clears the currently focused element.

```cs
void ClearFocus()
```

### GetFocusedElement(IFocusScope scope)
Returns the currently focused element in the specified focus scope.

```cs
IInputElement? GetFocusedElement(IFocusScope scope)
```

### SetFocusedElement(IFocusScope scope, IInputElement? element, NavigationMethod method = NavigationMethod.Unspecified, KeyModifiers keyModifiers = KeyModifiers.None)
Sets the currently focused element in the specified focus scope. If the specified scope is the current scope then the keyboard focus will change.

```cs
bool SetFocusedElement(
    IFocusScope scope,
    IInputElement? element,
    NavigationMethod method = NavigationMethod.Unspecified,
    KeyModifiers keyModifiers = KeyModifiers.None)
```

### SetFocusScope(IFocusScope scope)
Notifies the focus manager of a change in focus scope.

```cs
void SetFocusScope(IFocusScope scope)
``

### RemoveFocusScope(IFocusScope scope)
Removes the specified focus scope from the manager.

```cs
void RemoveFocusScope(IFocusScope scope)
```

### GetIsFocusScope(IInputElement e)
Determines whether the specified element is a focus scope.

```cs
bool GetIsFocusScope(IInputElement e)
```

### GetFocusManager(IInputElement? element)
Gets the focus manager associated with the specified element.

```cs
FocusManager? GetFocusManager(IInputElement? element)
```

## Properties

### Scope
The current focus scope.

```cs 
IFocusScope? Scope { get; private set; }
```

