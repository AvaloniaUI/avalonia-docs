---
id: how-to-bind-to-an-observable
title: 如何绑定到可观察对象
---


# 如何绑定到可观察对象

内容正在准备中。

您可以使用 `^` 流绑定操作符订阅任务或可观察对象的结果。

## 示例1：绑定到可观察对象

例如，如果 `DataContext.Name` 是一个 `IObservable<string>`，那么以下示例将绑定到可观察对象产生的每个字符串的长度，随着每个值的产生而变化：

```xml
<TextBlock Text="{Binding Name^.Length}"/>
```
