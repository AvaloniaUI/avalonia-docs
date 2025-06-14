---
id: container-queries
title: 容器查询
---

# 容器查询 <MinVersion version="11.3" /> 

容器查询允许根据作为容器的祖先元素的大小来激活控件的样式。

:::tip
Avalonia 的容器查询类似于 CSS 的容器查询，但功能更有限，以适应 Avalonia 支持的平台和外形样式。如果将 Toplevel 设置为容器，它们也可以像媒体查询一样工作。
:::

## 工作原理

容器查询依赖于将祖先控件设置成容器。容器大小的更改会根据查询激活样式。这些查询可以检查容器的宽度或高度，或两者兼而有之。任何控件都可以是容器，但设置为容器的控件不能受链接到它的容器查询所托管的样式的影响。当查询被激活时，查询中托管的所有样式也将根据其选择器被激活。

## 如何使用查询

### 声明容器查询
容器查询可以在 XAML 中定义为控件 `Styles` 属性的直接子元素，如下所示：

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
<StackPanel>
```

它们也可以是 `ControlTheme` 样式的一部分：

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
`Name` 属性定义了它将附加到的容器的名称。这不是一个唯一的标识符，多个容器查询可以使用相同的名称。
`Query` 定义了激活包含大小的规则。请参阅下面的[查询](#查询)。

这使得它们在针对不同屏幕尺寸的主题，或根据其父元素中可用空间而具有不同形式的主题中非常易于使用。这带来了一些限制。
1. 容器查询不能托管在 `Style` 元素中。
   以下是无效的。
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
<StackPanel>
```
2. 在查询中声明的样式不能影响容器或其祖先。这与能够影响其父控件的普通 `Styles` 不同。因为容器查询依赖于容器的实际大小，让容器受到其查询激活的样式的影响可能会导致循环行为，即容器的大小被两个或多个查询连续更新。

### 声明容器
只有当作为 `ContainerQuery` 主机后代的控件被声明为容器时，容器查询才起作用。设置任何控件的 `Container.Name` 和 `Container.Sizing` 附加属性将声明该控件为容器，如下所示：

```xml
<Button
    Container.Name="container-name"
    Container.Sizing="container-sizing
/>
```

`Container.Name` 定义容器的名称。它对于该容器不是唯一的，同一作用域中的多个控件可以具有相同的容器名称，并且它们都将受到相同容器查询的影响。

`Container.Sizing` 定义了容器用于查询的大小调整策略。容器的最终大小取决于该值。它是一个具有以下值的枚举：

* `Normal`: 不查询容器的大小。这是默认值。控件遵循正常的测量和排列。
* `Width`: 查询容器的宽度。容器将使用其父元素允许的最大宽度，并且该值用于所有相关的容器查询。在大多数情况下，最终宽度是允许的最大宽度。
* `Height`: 与 `Width` 相同，但仅查询容器的高度。
* `WidthAndHeight`: 同时查询容器的宽度和高度。

根据大小调整策略，容器将使用最大可用大小作为其期望大小。

### 查询
以下查询可用。
* `min-width`: 等同于 `x >= width`
* `min-height`: 等同于 `x >= height`
* `max-width`: 等同于 `x <= width`
* `max-height`: 等同于 `x <= height`
* `height`: 等同于 `x == height`
* `width`: 等同于 `x == width`

以下是使用具有不同查询的多个容器查询的示例：

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
多个查询可以使用 `,` 进行 OR 组合，或使用 `and` 进行 AND 组合。

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

这样，您可以为大小范围创建查询。