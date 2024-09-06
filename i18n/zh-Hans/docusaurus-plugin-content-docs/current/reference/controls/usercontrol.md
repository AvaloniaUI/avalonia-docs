---
id: usercontrol
title: UserControl 用户控件
---

`UserControl` 控件是一种 [ContentControl](contentcontrol)，它代表了一组在预定义布局中可重用的控件。

实际上，`UserControl` 在 `ContentControl` 的基础上提供的功能非常有限。不同之处在于，通常不会直接创建 `UserControl` 类的实例；相反，通常会为应用程序要显示的每个“视图”创建一个 `UserControl` 类的新子类。

### 常见属性

| 属性 | 描述 |
| :--- | :--- |
| `Content` | 控件中显示的内容 |

### 参考资料

[UserControl](http://reference.avaloniaui.net/api/Avalonia.Controls/UserControl/)

### 源代码

[UserControl.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/UserControl.cs)