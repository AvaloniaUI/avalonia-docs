---
id: how-to-bind-to-an-observable
title: How To Bind to an Observable
---


# How To Bind to an Observable

Content in preparation.

You can subscribe to the result of a task or an observable by using the `^` stream binding operator.

## Example 1: Binding to an observable

For example if `DataContext.Name` is an `IObservable<string>` then the following example will bind to the length of each string produced by the observable as each value is produced

```xml
<TextBlock Text="{Binding Name^.Length}"/>
```
