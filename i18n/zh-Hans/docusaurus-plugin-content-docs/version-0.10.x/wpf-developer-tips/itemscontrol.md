---
info: itemscontrol
title: ItemsControl
---

In WPF, `ItemsControl` and derived classes such as `ListBox` have two separate items properties: `Items` and `ItemsSource`. Avalonia however just has a single one: `Items` which is same as WPF `ItemsSource` property.

## Before
```csharp
contextMenu.Items.Add(runItem);
```

## After
```csharp
var list = contextMenu.Items as IList;
list?.Add(runItem);
```