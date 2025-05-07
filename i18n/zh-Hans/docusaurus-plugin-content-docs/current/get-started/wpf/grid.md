# Grid

在 Avalonia 中，可以使用字符串来指定列和行定义，避免了 WPF 中笨重的语法：

```xml
<Grid ColumnDefinitions="Auto,*,32" RowDefinitions="*,Auto">
```

在 WPF 中，`Grid` 的一个常见用法是将两个控件堆叠在一起。在 Avalonia 中，为此，您可以直接使用 `Panel`，它比 `Grid` 更轻量级。

