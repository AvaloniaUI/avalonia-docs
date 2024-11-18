---
id: troubleshooting
title: 故障排除
---

## 我的控件主题无法找到

如果您在使用 Avalonia 时发现控件无法找到主题，请确保它返回了与控件主题的 `x:Key` 和 `TargetType` 匹配的[样式键](styles#style-key)。

## 我的控件主题影响了其他控件

许多 Avalonia 控件由多个 Avalonia 控件组合而成。如果您创建了一个适用于某种类型所有控件的样式或控件主题，可能会导致意外的结果。例如，如果您在 `Window` 中创建了一个针对 `TextBlock` 类型的样式，该样式将应用于窗口中的所有 `TextBlock` 控件，即使该 `TextBlock` 是其他控件（例如 `ListBox`）的一部分。

## 应用程序窗口透明或未渲染任何内容

请确保您已安装并包含 Avalonia 主题在您的应用程序中
如果您使用内置的 [Fluent](themes/fluent.md) 或 [Simple](themes/simple.md) 主题，请访问对应的页面以了解如何安装它们。

如果您使用的是第三方主题，请联系其维护者。