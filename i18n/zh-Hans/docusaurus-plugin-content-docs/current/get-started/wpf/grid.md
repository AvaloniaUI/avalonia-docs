# Grid

在Avalonia中，可以使用字符串来指定列和行定义，避免了WPF中笨重的语法：

```xml
<Grid ColumnDefinitions="Auto,*,32" RowDefinitions="*,Auto">
```

在WPF中，`Grid`的一个常见用法是将两个控件堆叠在一起。在Avalonia中，为此，您可以直接使用`Panel`，它比`Grid`更轻量级。

