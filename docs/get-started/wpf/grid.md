# Grid

Column and row definitions can be specified in Avalonia using strings, avoiding the clunky syntax in WPF:

```xml
<Grid ColumnDefinitions="Auto,*,32" RowDefinitions="*,Auto">
```

A common use of `Grid` in WPF is to stack two controls on top of each other. For this purpose in Avalonia you can just use a `Panel` which is more lightweight than `Grid`.

<XpfAd/>