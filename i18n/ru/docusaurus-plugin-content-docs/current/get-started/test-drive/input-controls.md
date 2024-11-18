---
id: input-controls
title: Input Controls (Controls для ввода данных)
---

import InputControlsScreenshot from '/img/get-started/test-drive/input-controls.png';

На этой странице вы узнаете, как добавить Input Controls.
Цель: расположить по вертикали несколько сгруппированных по горизонтали Controls, таких как метка и Input Control.

Для создания такой разметки, вам потребуется использовать `Grid`,
внутри которого будут размещены Input Controls и их названия.

На рисунке ниже показан конечный вариант интерфейса с отображением линий Grid.
Линии показаны для наглядности, в обычной ситуации, вы не будете отображать их в программе.

<img className="center" src={InputControlsScreenshot} alt="" />

Для создания макета с помощью Grid, выполните следующие действия:

* Завершите работу приложения, если оно запущено.
* Найдите тег `<StackPanel>` и удалите его вместе со всем содержимым.
* Добавте тег `<Grid>`, как показано ниже:

```xml
<Grid ShowGridLines="True" Margin="5"
      ColumnDefinitions="120, 100" 
      RowDefinitions="Auto, Auto, Auto">  
</Grid>
```

Таким образом, мы задали размеры столбцов и строк для Grid, а также включили отображение линий сетки. (линии сетки будут отображаться прямыми линиями, поскольку внутри Grid ничего нет)

- Добавьте `<Label>` и Input Controls в ячейки Grid, как показано ниже:

```xml
<Grid ShowGridLines="True" Margin="5"
      ColumnDefinitions="120, 100" 
      RowDefinitions="Auto, Auto, Auto">
   <Label Grid.Row="0" Grid.Column="0">Celsius</Label>
   <TextBox Grid.Row="0" Grid.Column="1"/>
   <Label Grid.Row="1" Grid.Column="0">Fahrenheit</Label>
   <TextBox Grid.Row="1"  Grid.Column="1"/>
</Grid>
```

Теперь вы можете выровнять Controls внутри Grid, используя их свойство Margin.

- Также переместите кнопку в Grid, как показано ниже:

```xml
<Grid ShowGridLines="True"  Margin="5" 
      ColumnDefinitions="120, 100" 
      RowDefinitions="Auto, Auto, Auto">
     <Label Grid.Row="0" Grid.Column="0" Margin="10">Celsius</Label>
     <TextBox Grid.Row="0" Grid.Column="1" Margin="0 5" Text="0"/>
     <Label Grid.Row="1" Grid.Column="0" Margin="10">Fahrenheit</Label>
     <TextBox Grid.Row="1"  Grid.Column="1" Margin="0 5" Text="0"/>
     <Button Grid.Row="2" Grid.Column="1" Margin="0 5">Calculate</Button>
</Grid>
```

- Запустите приложение и насладитесь результатом.



:::info
Подробную информацию по всем встроенным Controls и из аттрибуетам, см. [здесь](../../reference/controls/).
:::

На следующей странице вы узнаете, как настроить размеры окна в панели предварительного просмотра.
