# Grid

В Avalonia, можно указать настройки строк и столбцов через строки, избегая избыточного синтаксиса WPF:

```xml
<Grid ColumnDefinitions="Auto,*,32" RowDefinitions="*,Auto">
```

Обычно, `Grid` используется в WPF для наложения Control поверх другого.
В Avalonia, вы можете использовать более легковесный `Panel`.