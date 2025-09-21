---
id: container-queries
title: Контейнерные запросы
---

# Контейнерные запросы <MinVersion version="11.3" /> 

Контейнерные запросы позволяют активировать стили для элемента управления на основе размера предка, который выступает в роли контейнера. 

:::tip
Контейнерные запросы Avalonia похожи на контейнерные запросы CSS, но с более ограниченной функциональностью, подходящей для платформ и форм-факторов, поддерживаемых Avalonia. Они также могут вести себя как медиа-запросы, если Toplevel установлен как контейнер.
:::

## Как это работает

Контейнерные запросы основываются на том, что элемент управления-предок установлен как контейнер. Изменения размера контейнера активируют стили на основе запросов. Эти запросы могут проверять ширину или высоту контейнера, или и то, и другое. Любой элемент управления может быть контейнером, но элемент управления, установленный как контейнер, не может быть затронут стилями, размещенными в контейнерном запросе, связанном с ним. Когда запрос активируется, все стили, размещенные в запросе, также будут активированы на основе их селекторов.

## Как использовать запросы

### Объявление контейнерных запросов
Контейнерные запросы могут быть определены в XAML как прямой дочерний элемент свойства `Styles` элемента управления, следующим образом:

```xml
<StackPanel Orientation="Horizontal">
  <StackPanel.Styles>
    <ContainerQuery Name="container"
                    Query="max-width:400">
      <Style Selector="Button">
        <Setter Property="Background"
                Value="Red"/>
      </Style>
    </ContainerQuery>
  </StackPanel.Styles>
<StackPanel>
```

Они также могут быть частью стилей `ControlTheme`:

```xml
<ControlTheme x:Key="{x:Type ListBox}" TargetType="ListBox">
    ...
  <Setter Property="Template">
    <ControlTemplate>
      <Border Name="border"
              Container.Name="Test"
              Container.Sizing="WidthAndHeight"
              >
        <ScrollViewer Name="PART_ScrollViewer">
            ...
        </ScrollViewer>
      </Border>
    </ControlTemplate>
  </Setter>


  <ContainerQuery Name="Test"
                  Query="max-height:400">
    <Style Selector="ScrollViewer#PART_ScrollViewer">
      <Setter Property="Background"
              Value="Red"/>
    </Style>
  </ContainerQuery>
</ControlTheme>
```
Свойство `Name` определяет имя контейнера, к которому будет привязан запрос. Это не уникальный идентификатор, и несколько контейнерных запросов могут использовать одно и то же имя.
Свойство `Query` определяет правила для активации размера контейнера. См. [Запросы](#queries) ниже.

Это делает их довольно простыми в использовании в темах, ориентированных на разные размеры экрана, или в темах, которые имеют разные формы в зависимости от доступного пространства в родительском элементе. Это сопровождается несколькими ограничениями. 
1. Контейнерные запросы не могут быть размещены в элементе `Style`.
   Следующее является недопустимым.
```xml
<StackPanel Orientation="Horizontal">
  <StackPanel.Styles>
    <Style Selector="...">
      <ContainerQuery Name="container"
                      Query="max-width:400">
        <Style Selector="Button">
          <Setter Property="Background"
                  Value="Red"/>
        </Style>
      </ContainerQuery>
    </Style>
  </StackPanel.Styles>
<StackPanel>
```
2. Стили, объявленные в запросах, не могут влиять на контейнер или его предков. Это отличается от обычных `Styles`, которые могут влиять на родительский элемент управления. Поскольку контейнерные запросы зависят от фактического размера контейнера, если контейнер будет затронут стилями, активированными его запросами, это может вызвать циклическое поведение, когда размер контейнера постоянно обновляется двумя или более запросами.

### Объявление контейнеров
Контейнерные запросы работают только если элемент управления, являющийся потомком хоста `ContainerQuery`, объявлен как контейнер. Установка прикрепленных свойств `Container.Name` и `Container.Sizing` для любого элемента управления объявит этот элемент как контейнер, например так:

```xml
<Button
  Container.Name="container-name"
  Container.Sizing="container-sizing"
/>
```

`Container.Name` определяет имя контейнера. Оно не является уникальным для этого контейнера, и несколько элементов управления в одной области могут иметь одно и то же имя контейнера, и все они будут затронуты одними и теми же контейнерными запросами.

`Container.Sizing` определяет стратегию изменения размера контейнера для запросов. Окончательный размер контейнера зависит от значения. Это перечисление со следующими значениями:

* `Normal`: Размер контейнера не запрашивается. Это значение по умолчанию. Элемент управления следует обычному измерению и расположению.
* `Width`: Запрашивается ширина контейнера. Контейнер будет использовать максимальную ширину, разрешенную его родителем, и это значение используется во всех связанных контейнерных запросах. В большинстве случаев окончательная ширина - это максимально допустимая ширина.
* `Height`: То же, что и `Width`, но запрашивается только высота контейнера.
* `WidthAndHeight`: Запрашивается как ширина, так и высота контейнера.

В зависимости от стратегии изменения размера, контейнер будет использовать максимально доступный размер как желаемый размер.

### Запросы
Доступны следующие запросы:
* `min-width`: эквивалентно `x >= width`
* `min-height`: эквивалентно `x >= height`
* `max-width`: эквивалентно `x <= width`
* `max-height`: эквивалентно `x <= height`
* `height`: эквивалентно `x == width`
* `width`: эквивалентно `x == height`

Ниже приведен пример использования нескольких контейнерных запросов с разными запросами:

```xml
<ContainerQuery Name="uniformGrid"
                Query="max-width:400">
  <Style Selector="UniformGrid#ContentGrid">
    <Setter Property="Columns"
            Value="1"/>
  </Style>
</ContainerQuery>
<ContainerQuery Name="uniformGrid"
                Query="min-width:400">
  <Style Selector="UniformGrid#ContentGrid">
    <Setter Property="Columns"
            Value="2"/>
  </Style>
</ContainerQuery>
<ContainerQuery Name="uniformGrid"
                Query="min-width:800">
  <Style Selector="UniformGrid#ContentGrid">
    <Setter Property="Columns"
            Value="3"/>
  </Style>
</ContainerQuery>
```
Несколько запросов можно комбинировать с помощью `,` для комбинации ИЛИ или `and` для комбинации И.

```xml
<ContainerQuery Name="uniformGrid"
                Query="max-width:400,min-width:300">
  <Style Selector="UniformGrid#ContentGrid">
    <Setter Property="Columns"
            Value="1"/>
  </Style>
</ContainerQuery>
<ContainerQuery Name="uniformGrid"
                Query="min-width:400 and min-width:300">
  <Style Selector="UniformGrid#ContentGrid">
    <Setter Property="Columns"
            Value="2"/>
  </Style>
</ContainerQuery>
```

Таким образом, вы можете создавать запросы для диапазонов размеров.
