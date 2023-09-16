---
description: TUTORIALS - To Do List App
---

import ToDoFinalArchitectureDiagram from '/img/gitbook-import/assets/image (2) (3).png';

# 结论

在本页面中，您将了解为什么以这种方式实现应用程序，并推荐一些进一步阅读。

## 应用程序解决方案架构

本教程使用了一个应用程序解决方案架构，该架构采用MVVM模式，并在主窗口的内容之间进行交换以在页面之间导航，同时保留“顶层”视图模型以提供应用程序状态。页面（视图）由 _Avalonia UI_ 用户控件组成。

<img className="center" src={ToDoFinalArchitectureDiagram} alt=""/>

这个教程应用程序针对的是 `Windows` 平台，其中存在主窗口，因此可能看起来是一种过于复杂的方法。

然而，在其他目标平台上，没有主窗口。一个应用程序必须被安排为一系列视图。

:::info
要了解有关面向 iOS(Apple)平台的应用程序的更多信息，请参阅[这里](../../guides/platforms/ios/).
:::

:::info
要了解有关面向 Android 移动设备的应用程序的更多信息，请参阅[这里](../../guides/platforms/android/).
:::

## 进一步阅读

有关 _Avalonia UI_ 教程的完整列表，请参阅[这里](..).
