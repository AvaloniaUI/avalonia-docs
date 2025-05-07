---
id: container-queries
title: Container Queries
---

# Container Queries <MinVersion version="11.3" /> 

Container Queries allows styles to be activated for control based on the size of an ancestor, which acts as a container. 

:::tip
Avalonia's Container Queries are similar to CSS's Container Queries, with a more limited functionality to suit platforms and form factors Avalonia supports. They can also behave like media queries if the Toplevel is set as a container.
:::

## How It Works

Container queries rely on there being an ancestor control being set as a container. Changes to the size of the container activate styles based on queries. Those queries can check either the width or height of the container, or both. Any control can be a container, but a control set as a container can not be affected by styles hosted by a container query linked to it. When a query is activated, all styles hosted in the query will also be activated based on their selectors.

## How To Use Queries

### Declaring Container Queries
Container queries can be defined in XAML as the direct child of a control's `Styles` property like this:

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

They can also be part of a `ControlTheme`'s styles:

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
The `Name` property defines the name of the container it will attach to. This isn't a unique identifier, and multiple container queries can use the same name.
The `Query` defines the rules to activate the containing size. See [Queries](#queries) below.

This make them quite easy to use in themes targeting difference screen sizes, or themes thathave different forms depending on the space available in its parent. This comes with a few restrictions. 
1. Container Queries can't be hosted in a `Style` element.
   The following is invalid.
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
2. Styles declared in Queries can not affect the container or its ancestors. This is different from normal `Styles` being able to affect their parent control. Because container queries rely on the actual size of the container, having the container be affected by styles activated by its queries can cause cyclic behaviors where the container's size is being updated continuously by two or more queries.

### Declaring Containers
Container queries only work if a control that's a descendant of the `ContainerQuery`'s host is declared as container. Setting the `Container.Name` and `Container.Sizing` attached properties of any control will declare that control as a container, like this:

```xml
<Button
    Container.Name="container-name"
    Container.Sizing="container-sizing
/>

```

`Container.Name` defines the name of the container. It isn't unique to that container, and multiple controls in the same scope can have the same container name, and they will all be affected by the same container queries.

`Container.Sizing` defines the sizing strategy of the container for queries. The container's final size depends on the value. Its an enum with the following values

* `Normal`: The container's size isn't queried. This is the default value. The control follows normal measurement and arrangement.
* `Width`: The container's width is queried. The container will use the maximum width allowed by its parent, and that value is used in all related container queries. In most cases, the final width is the max width allowed.
* `Height`: Same as `Width`, but only the container's height is queried.
* `WidthAndHeight`: Both width and height of the container is queried.

Depending on the sizing stratedy, the container will use the maximum avialable size as its desired size.

### Queries
The following queries are available.
* `min-width`: equivalent to `x >= width`
* `min-height`: equivalent to `x >= height`
* `min-width`: equivalent to `x <= width`
* `max-height`: equivalent to `x <= height`
* `height`: equivalent to `x == width`
* `width`: equivalent to `x == height`

The following is an example of using multiple container queries with different queries:

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
Multiple queries can be combine with `,` for OR combination, or `and` for AND combination.

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

This way, you can make queries for size ranges.