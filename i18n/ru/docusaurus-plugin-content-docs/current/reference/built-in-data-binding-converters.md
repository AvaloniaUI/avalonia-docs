---
description: REFERENCE
---

# Встроенные Преобразователи для привязанных данных

_Avalonia UI_ включает несколько самых частых преобрязователей для привязанных данных.
_Avalonia UI_ includes a number of built-in data binding converters for common scenarios:

| Преобразователь                     | Описание                                                                                                              |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| Оператор отрицания                  | Оператор `!`, может быть указан перед привязкой данных, чтобы инвертировать логическое значение. См. примечание ниже. |
| `StringConverters.IsNullOrEmpty`    | Возвращает `true`, если строка `null` или пустая.                                                                     |
| `StringConverters.IsNotNullOrEmpty` | Возвращает `false`, если строка `null` или пустая.                                                                    |
| `ObjectConverters.IsNull`           | Возвращает `true`, если строка `null`                                                                                 |
| `ObjectConverters.IsNotNull`        | Возвращает `false`, если строка `null`                                                                                |
| `BoolConverters.And`                | Возвращает `true`, если все вхождения возвращают `true`.                                                              |
| `BoolConverters.Or`                 | Возвращает `true`, если любое из вхождений возвращают `true`.                                                         |

## Примеры Операторов Отрицания

Ниже приведен пример блока текста, когда его привязанное значение равно `false`:

```xml
<StackPanel>
  <TextBox Name="input" IsEnabled="{Binding AllowInput}"/>
  <TextBlock IsVisible="{Binding !AllowInput}">Ввод запрещен</TextBlock>
</StackPanel>
```

Отрицание работает также и с не логическими значениями. Вначале связанное значение преобразуется в логический тип (используется функция `Convert.ToBoolean`), и затем к резульатту применяется отрицание.

Целочисленное `0` преобразуется в `false`, а все остальные целочисленные в `true`. Вы можете использовать оператор отрицания, чтобы вывести сообщение, когда коллекция пуста, к примеру:

```xml
<Panel>
  <ListBox ItemsSource="{Binding Items}"/>
  <TextBlock IsVisible="{Binding !Items.Count}">No results found</TextBlock>
</Panel>
```
Также, вы можете использовать двойное отрицание `!!`, чтобы сначала преобразовать значение из целочисленного в логическое, а потом инвертировать его.

Вы можете использовать такаой способ, чтобы скрыть элемент, если коллексция пуста (кол-во элементов `0`):

```xml
<Panel>
  <ListBox ItemsSource="{Binding Items}" IsVisible="{Binding !!Items.Count}"/>
</Panel>
```

## Дополнительные примеры преобразований

В примере ниже, элемент `TextBlock` будет скрыт, если значение привязанных данных равно `null` или пустое:

```xml
<TextBlock Text="{Binding MyText}"
           IsVisible="{Binding MyText, 
                       Converter={x:Static StringConverters.IsNotNullOrEmpty}}"/>
```

А этот пример скроет элемент `ContentControl`, если значение привязанных данных равно `null`:
And this example will hide the content control if the bound object is null or empty:

```xml
<ContentControl Content="{Binding MyContent}"
                IsVisible="{Binding MyContent, 
                            Converter={x:Static ObjectConverters.IsNotNull}}"/>
```

## Хотите знать больше?


:::info
Смотрите пример по преобразованию значение в Avalonia UI, [здесь](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/ValueConversionSample).
:::
