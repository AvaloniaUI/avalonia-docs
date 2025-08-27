import LayoutMarginsPaddingAlignmentBasicScreenshot from '/img/basics/user-interface/building-layouts/layout-margins-padding/layout-margins-padding-alignment-graphic1.png';
import LayoutMarginsPaddingAlignmentBasicAnnotatedScreenshot from '/img/basics/user-interface/building-layouts/layout-margins-padding/layout-margins-padding-alignment-graphic2.png';
import LayoutHorizontalAlignmentScreenshot from '/img/basics/user-interface/building-layouts/layout-margins-padding/layout-horizontal-alignment-graphic.png';
import LayoutVerticalAlignmentScreenshot from '/img/basics/user-interface/building-layouts/layout-margins-padding/layout-vertical-alignment-graphic.png';
import LayoutMarginsPaddingAlignmentComplexAnnotatedScreenshot from '/img/basics/user-interface/building-layouts/layout-margins-padding/layout-margins-padding-alignment-graphic3.png';

# Выравнивание, Внешние и Внутренние отступы

Компонент Avalonia предоставляет несколько свойств, которые используются для точного позиционирования дочерних элементов. В этой теме рассматриваются четыре наиболее важных свойства: `HorizontalAlignment`, `Margin`, `Padding` и `VerticalAlignment`. Понимание действия этих свойств важно, поскольку они обеспечивают основу для управления положением элементов в приложениях Avalonia.

### Введение в позиционирование элементов

Существует множество способов позиционирования элементов с использованием Avalonia. Однако достижение идеального макета выходит за рамки простого выбора правильного элемента `Panel`. Тонкий контроль позиционирования требует понимания свойств `HorizontalAlignment`, `Margin`, `Padding` и `VerticalAlignment`.

Следующая иллюстрация показывает сценарий макета, использующий несколько свойств позиционирования.

<img src={LayoutMarginsPaddingAlignmentBasicScreenshot} alt="Пример позиционирования"/>

На первый взгляд, элементы `Button` на этой иллюстрации могут казаться размещенными случайным образом. Однако их положения на самом деле точно контролируются с помощью комбинации отступов, выравниваний и полей.

Следующий пример описывает, как создать макет, показанный на предыдущей иллюстрации. Элемент `Border` инкапсулирует родительский `StackPanel` со значением `Padding`, равным 15 независимым от устройства пикселям. Это объясняет узкую полосу `LightBlue`, которая окружает дочерний `StackPanel`. Дочерние элементы `StackPanel` используются для иллюстрации каждого из различных свойств позиционирования, подробно описанных в этой теме. Три элемента `Button` используются для демонстрации как свойства `Margin`, так и `HorizontalAlignment`.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication2.MainWindow"
        Title="AvaloniaApplication2">
  <Border Background="LightBlue"
          BorderBrush="Black"
          BorderThickness="2"
          Padding="15">
    <StackPanel Background="White"
                HorizontalAlignment="Center"
                VerticalAlignment="Top">
      <TextBlock Margin="5,0"
                 FontSize="18"
                 HorizontalAlignment="Center">
        Alignment, Margin and Padding Sample
      </TextBlock>
      <Button HorizontalAlignment="Left" Margin="20">Button 1</Button>
      <Button HorizontalAlignment="Right" Margin="10">Button 2</Button>
      <Button HorizontalAlignment="Stretch">Button 3</Button>
    </StackPanel>
  </Border>
</Window>

```

Следующая диаграмма предоставляет детальный вид различных свойств позиционирования, которые используются в предыдущем примере. Последующие разделы в этой теме описывают более подробно, как использовать каждое свойство позиционирования.

<img src={LayoutMarginsPaddingAlignmentBasicAnnotatedScreenshot} alt="Свойства позиционирования"/>

### Понимание свойств выравнивания

Свойства `HorizontalAlignment` и `VerticalAlignment` описывают, как дочерний элемент должен быть расположен в выделенном пространстве макета родительского элемента. Используя эти свойства вместе, вы можете точно позиционировать дочерние элементы. Например, дочерние элементы `DockPanel` могут указать четыре различных горизонтальных выравнивания: `Left` (Слева), `Right` (Справа), `Center` (По центру) или `Stretch` (Растянуть) для заполнения доступного пространства. Аналогичные значения доступны для вертикального позиционирования.

Явно установленные свойства `Height` и `Width` для элемента имеют приоритет над значением свойства `Stretch`. Попытка установить `Height`, `Width` и значение `HorizontalAlignment` равное `Stretch` приведет к игнорированию запроса `Stretch`.

#### Свойство HorizontalAlignment

Свойство `HorizontalAlignment` определяет характеристики горизонтального выравнивания, применяемые к дочерним элементам. В следующей таблице показаны все возможные значения свойства `HorizontalAlignment`.

| Значение                   | Описание                                                                                                                                                            |
|:---------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Left`                     | Дочерние элементы выравниваются по левому краю выделенного пространства макета родительского элемента.                                                              |
| `Center`                   | Дочерние элементы выравниваются по центру выделенного пространства макета родительского элемента.                                                                   |
| `Right`                    | Дочерние элементы выравниваются по правому краю выделенного пространства макета родительского элемента.                                                             |
| `Stretch` \(По умолчанию\) | Дочерние элементы растягиваются, чтобы заполнить выделенное пространство макета родительского элемента. Явно указанные значения `Width` и `Height` имеют приоритет. |

Следующий пример показывает, как применить свойство `HorizontalAlignment` к элементам `Button`. Каждое значение атрибута показано для лучшей иллюстрации различных вариантов отображения.

```xml
<Button HorizontalAlignment="Left">Button 1 (Left)</Button>
<Button HorizontalAlignment="Right">Button 2 (Right)</Button>
<Button HorizontalAlignment="Center">Button 3 (Center)</Button>
<Button HorizontalAlignment="Stretch">Button 4 (Stretch)</Button>
```

Приведенный выше код создает макет, подобный следующему изображению. Эффекты позиционирования для каждого значения `HorizontalAlignment` видны на иллюстрации.

<img src={LayoutHorizontalAlignmentScreenshot} alt='Пример HorizontalAlignment'/>

#### Свойство VerticalAlignment

Свойство `VerticalAlignment` описывает характеристики вертикального выравнивания, применяемые к дочерним элементам. В следующей таблице показаны все возможные значения свойства `VerticalAlignment`.

| Значение                   | Описание                                                                                                                                                            |
|:---------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Top`                      | Дочерние элементы выравниваются по верхнему краю выделенного пространства макета родительского элемента.                                                            |
| `Center`                   | Дочерние элементы выравниваются по центру выделенного пространства макета родительского элемента.                                                                   |
| `Bottom`                   | Дочерние элементы выравниваются по нижнему краю выделенного пространства макета родительского элемента.                                                             |
| `Stretch` \(По умолчанию\) | Дочерние элементы растягиваются, чтобы заполнить выделенное пространство макета родительского элемента. Явно указанные значения `Width` и `Height` имеют приоритет. |

Следующий пример показывает, как применить свойство `VerticalAlignment` к элементам `Button`. Каждое значение атрибута показано для лучшей иллюстрации различных вариантов отображения. Для целей этого примера элемент `Grid` с видимыми линиями сетки используется в качестве родительского, чтобы лучше проиллюстрировать поведение макета для каждого значения свойства.

```xml
<Border Background="LightBlue" BorderBrush="Black" BorderThickness="2" Padding="15">
    <Grid Background="White" ShowGridLines="True">
      <Grid.RowDefinitions>
        <RowDefinition Height="25"/>
        <RowDefinition Height="50"/>
        <RowDefinition Height="50"/>
        <RowDefinition Height="50"/>
        <RowDefinition Height="50"/>
      </Grid.RowDefinitions>
      <TextBlock Grid.Row="0" Grid.Column="0"
                 FontSize="18"
                 HorizontalAlignment="Center">
        VerticalAlignment Sample
      </TextBlock>
      <Button Grid.Row="1" Grid.Column="0" VerticalAlignment="Top">Button 1 (Top)</Button>
      <Button Grid.Row="2" Grid.Column="0" VerticalAlignment="Bottom">Button 2 (Bottom)</Button>
      <Button Grid.Row="3" Grid.Column="0" VerticalAlignment="Center">Button 3 (Center)</Button>
      <Button Grid.Row="4" Grid.Column="0" VerticalAlignment="Stretch">Button 4 (Stretch)</Button>
    </Grid>
</Border>
```

Приведенный выше код создает макет, подобный следующему изображению. Эффекты позиционирования для каждого значения `VerticalAlignment` видны на иллюстрации.

<img src={LayoutVerticalAlignmentScreenshot} alt='Пример свойства VerticalAlignment'/>

### Понимание свойств отступов

Свойство `Margin` описывает расстояние между элементом и его дочерними элементами или соседями. Значения `Margin` могут быть одинаковыми с помощью синтаксиса вроде `Margin="20"`. С этим синтаксисом к элементу будет применен равномерный отступ `Margin` в 20 независимых от устройства пикселей. Значения `Margin` также могут принимать форму четырех различных значений, каждое из которых описывает отдельный отступ для применения слева, сверху, справа и снизу (в таком порядке), например, `Margin="0,10,5,25"`. Правильное использование свойства `Margin` позволяет очень точно контролировать положение отрисовки элемента и положение отрисовки его соседних элементов и дочерних элементов.

Ненулевой отступ применяет пространство за пределами `Bounds` (границ) элемента.

Следующий пример показывает, как применить равномерные отступы вокруг группы элементов `Button`. Элементы `Button` расположены равномерно с десятипиксельным буфером отступов в каждом направлении.

```xml
<Button Margin="10">Button 7</Button>
<Button Margin="10">Button 8</Button>
<Button Margin="10">Button 9</Button>
```

Во многих случаях равномерный отступ не подходит. В этих случаях можно применить неравномерные отступы. Следующий пример показывает, как применить неравномерные отступы к дочерним элементам. Отступы описываются в следующем порядке: слева, сверху, справа, снизу.

```xml
<Button Margin="0,10,0,10">Button 1</Button>
<Button Margin="0,10,0,10">Button 2</Button>
<Button Margin="0,10,0,10">Button 3</Button>
```

#### Понимание свойства Padding

Внутренние отступы (Padding) во многом похожи на `Margin`. Свойство Padding доступно только в нескольких классах, в основном для удобства: `Border`, `TemplatedControl` и `TextBlock` - это примеры классов, которые предоставляют свойство Padding. Свойство `Padding` увеличивает эффективный размер дочернего элемента на указанное значение `Thickness`.

Следующий пример показывает, как применить `Padding` к родительскому элементу `Border`.

```xml
<Border Background="LightBlue"
        BorderBrush="Black"
        BorderThickness="2"
        CornerRadius="45"
        Padding="25">
    <!-- Ваш код -->
</Border>
```

#### Использование Выравнивания, Внешних и Внутренних отступов в приложении

`HorizontalAlignment`, `Margin`, `Padding` и `VerticalAlignment` обеспечивают контроль позиционирования, необходимый для создания сложного пользовательского интерфейса. Вы можете использовать эффекты каждого свойства для изменения позиционирования дочерних элементов, обеспечивая гибкость при создании динамических приложений и пользовательского опыта.

Следующий пример демонстрирует каждую из концепций, подробно описанных в этой теме. Основываясь на инфраструктуре, найденной в первом примере этой темы, этот пример добавляет элемент `Grid` в качестве дочернего к элементу `Border` из первого примера. К родительскому элементу `Border` применяется `Padding`. `Grid` используется для разделения пространства между тремя дочерними элементами `StackPanel`. Элементы `Button` снова используются для показа различных эффектов `Margin` и `HorizontalAlignment`. Элементы `TextBlock` добавлены к каждому `ColumnDefinition`, чтобы лучше определить различные свойства, применяемые к элементам `Button` в каждом столбце.

```xml
<Border Background="LightBlue"
        BorderBrush="Black"
        BorderThickness="2"
        CornerRadius="45"
        Padding="25">
    <Grid Background="White" ShowGridLines="True">
      <Grid.ColumnDefinitions>
        <ColumnDefinition Width="Auto"/>
        <ColumnDefinition Width="*"/>
        <ColumnDefinition Width="Auto"/>
      </Grid.ColumnDefinitions>

    <StackPanel Grid.Column="0" Grid.Row="0"
                HorizontalAlignment="Left"
                Name="StackPanel1"
                VerticalAlignment="Top">
        <TextBlock FontSize="18" HorizontalAlignment="Center" Margin="0,0,0,15">StackPanel1</TextBlock>
        <Button Margin="0,10,0,10">Button 1</Button>
        <Button Margin="0,10,0,10">Button 2</Button>
        <Button Margin="0,10,0,10">Button 3</Button>
        <TextBlock>ColumnDefinition.Width="Auto"</TextBlock>
        <TextBlock>StackPanel.HorizontalAlignment="Left"</TextBlock>
        <TextBlock>StackPanel.VerticalAlignment="Top"</TextBlock>
        <TextBlock>StackPanel.Orientation="Vertical"</TextBlock>
        <TextBlock>Button.Margin="0,10,0,10"</TextBlock>
    </StackPanel>

    <StackPanel Grid.Column="1" Grid.Row="0"
                HorizontalAlignment="Stretch"
                Name="StackPanel2"
                VerticalAlignment="Top"
                Orientation="Vertical">
        <TextBlock FontSize="18" HorizontalAlignment="Center" Margin="0,0,0,15">StackPanel2</TextBlock>
        <Button Margin="10,0,10,0">Button 4</Button>
        <Button Margin="10,0,10,0">Button 5</Button>
        <Button Margin="10,0,10,0">Button 6</Button>
        <TextBlock HorizontalAlignment="Center">ColumnDefinition.Width="*"</TextBlock>
        <TextBlock HorizontalAlignment="Center">StackPanel.HorizontalAlignment="Stretch"</TextBlock>
        <TextBlock HorizontalAlignment="Center">StackPanel.VerticalAlignment="Top"</TextBlock>
        <TextBlock HorizontalAlignment="Center">StackPanel.Orientation="Horizontal"</TextBlock>
        <TextBlock HorizontalAlignment="Center">Button.Margin="10,0,10,0"</TextBlock>
    </StackPanel>

    <StackPanel Grid.Column="2" Grid.Row="0"
                HorizontalAlignment="Left"
                Name="StackPanel3"
                VerticalAlignment="Top">
        <TextBlock FontSize="18" HorizontalAlignment="Center" Margin="0,0,0,15">StackPanel3</TextBlock>
        <Button Margin="10">Button 7</Button>
        <Button Margin="10">Button 8</Button>
        <Button Margin="10">Button 9</Button>
        <TextBlock>ColumnDefinition.Width="Auto"</TextBlock>
        <TextBlock>StackPanel.HorizontalAlignment="Left"</TextBlock>
        <TextBlock>StackPanel.VerticalAlignment="Top"</TextBlock>
        <TextBlock>StackPanel.Orientation="Vertical"</TextBlock>
        <TextBlock>Button.Margin="10"</TextBlock>
    </StackPanel>
  </Grid>
</Border>
```

При компиляции предыдущее приложение создает пользовательский интерфейс, который выглядит как на следующей иллюстрации. Эффекты различных значений свойств очевидны в интервалах между элементами, а значимые значения свойств для элементов в каждом столбце показаны внутри элементов `TextBlock`.

<img src={LayoutMarginsPaddingAlignmentComplexAnnotatedScreenshot} alt="Несколько свойств позиционирования в одном приложении"/>

