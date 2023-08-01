---
id: focus-manager
title: Focus Manager
---

`FocusManager`服务负责管理应用程序的键盘焦点。它会跟踪当前聚焦的元素和当前焦点范围。

通过`TopLevel`或`Window`的实例可以访问`FocusManager`，有关访问`TopLevel`的更多细节，请访问[TopLevel](../toplevel)页面：
```cs
var focusManager = window.FocusManager;
```

## 方法

### GetFocusedElement()

返回当前聚焦的元素。

```cs
IInputElement? GetFocusedElement()
```

### ClearFocus()

清除当前聚焦的元素。

```cs
void ClearFocus()
```

## 提示

### 聚焦控件

通常开发人员不需要使用`FocusManager`服务来聚焦控件。
可以直接通过调用控件的方法实现：
```cs
var hasFocused = button.Focus();
```

如果控件不可见并且`Focusable`属性设置为false，`Focus`方法可能返回`false`。

### 监听全局焦点变化

虽然`FocusManager.GetFocusedElement`方法允许获取当前聚焦的控件，但它不适合作为事件使用。
相反，请使用`InputElement.GotFocusEvent.Raised.Subscribe(handler)`方法。注意，它会在所有顶级窗口中全局监听事件。