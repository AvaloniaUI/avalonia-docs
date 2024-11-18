---
description: CONCEPTS
---

# 输入

Avalonia在抽象层面上操作指针设备。

实现`ICommandSource`的各种控件都有一个`HotKey`属性。

控件通常检测和响应用户输入。Avalonia的输入系统使用[直接和路由事件](../input/routed-events)来支持文本输入、焦点管理和鼠标定位。

应用程序通常具有复杂的输入要求。Avalonia提供了一个[命令系统](../../basics/user-interface/adding-interactivity)，将用户输入操作与响应这些操作的代码分离开来。
