import LayoutMarginsPaddingAlignmentBasicScreenshot from '/img/basics/user-interface/building-layouts/layout-margins-padding/layout-margins-padding-alignment-graphic1.png';
import LayoutMarginsPaddingAlignmentBasicAnnotatedScreenshot from '/img/basics/user-interface/building-layouts/layout-margins-padding/layout-margins-padding-alignment-graphic2.png';
import LayoutHorizontalAlignmentScreenshot from '/img/basics/user-interface/building-layouts/layout-margins-padding/layout-horizontal-alignment-graphic.png';
import LayoutVerticalAlignmentScreenshot from '/img/basics/user-interface/building-layouts/layout-margins-padding/layout-vertical-alignment-graphic.png';
import LayoutMarginsPaddingAlignmentComplexAnnotatedScreenshot from '/img/basics/user-interface/building-layouts/layout-margins-padding/layout-margins-padding-alignment-graphic3.png';

# Alignment、Margin 和 Padding

Avalonia 控件暴露了用于精确定位子元素的几个属性。本章节讨论了四个最重要的属性：`HorizontalAlignment`、`Margin`、`Padding`和`VerticalAlignment`。理解这些属性的效果很重要，因为它们是控制元素在Avalonia应用程序中的位置的基础。

### 元素定位

Avalonia定位元素有许多使用方式。然而，实现理想的布局不仅仅是选择正确的`Panel`元素，精确控制定位还需要理解`HorizontalAlignment`、`Margin`、`Padding`和`VerticalAlignment`属性。

下图展示了一个使用了多个定位属性的布局方案。

<img src={LayoutMarginsPaddingAlignmentBasicScreenshot} alt="Positioning Example"/>

乍一看，本图中的`Button`元素可能是随机放置的。然而，它们的位置实际上是通过组合使用边距(margin)、对齐(alignment)和填充(padding)来精确控制的。

以下示例描述了如何创建上图中的布局。一个`Border`元素封装了一个父元素`StackPanel`，`Padding`值为15个设备独立像素。这就说明了围绕子`StackPanel`的狭窄的`LightBlue`部分。`StackPanel`的子元素用于说明本章节中详细介绍的每个不同的定位属性。三个`Button`元素用于演示`Margin`和`HorizontalAlignment`属性。

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

下图提供了上述示例中使用的各种定位属性的全貌图。本章节的后续部分会更详细地描述如何使用每个定位属性。

<img src={LayoutMarginsPaddingAlignmentBasicAnnotatedScreenshot} alt="Positioning Properties"/>

### 理解Alignment属性

`HorizontalAlignment`和`VerticalAlignment`属性描述了一个子元素应该如何在父元素分配的布局空间内定位。通过一起使用这些属性，你可以精确地定位子元素。例如，`DockPanel`的子元素可以指定四种不同的水平对齐方式。`Left`、`Right`、`Center`或者`Stretch`（拉伸）以填补可用空间。类似的值也可用于垂直定位。

元素上明确设置的`Height`和`Width`属性的优先级高于`Stretch`属性。如果明确设置了`Height`和`Width`，再将`HorizontalAlignment`设置为`Stretch`，这样会忽略`Stretch`属性。

#### HorizontalAlignment属性

`HorizontalAlignment`属性声明了要应用于子元素的水平对齐特性。下表列出了`HorizontalAlignment`属性的可选值。

| 成员             | 描述                                             |
|:---------------|:-----------------------------------------------|
| `Left`         | 子元素与父元素分配的布局空间的左侧对齐。                           |
| `Center`       | 子元素与父元素分配的布局空间的中心对齐。                           |
| `Right`        | 子元素与父元素分配的布局空间的右侧对齐。                           |
| `Stretch` （默认） | 子元素被拉伸以填充父元素分配的布局空间。明确的`Width`和`Height`值优先级更高。 |

下面的示例展示了如何将`HorizontalAlignment`属性应用于`Button`元素。为了更好地说明各种渲染行为，每种特性值的效果都被展示了出来。

```xml
<Button HorizontalAlignment="Left">Button 1 (Left)</Button>
<Button HorizontalAlignment="Right">Button 2 (Right)</Button>
<Button HorizontalAlignment="Center">Button 3 (Center)</Button>
<Button HorizontalAlignment="Stretch">Button 4 (Stretch)</Button>
```

前面的代码生成了与下图类似的布局。每种`HorizontalAlignment`值的定位效果在图中可见。

<img src={LayoutHorizontalAlignmentScreenshot} alt='HorizontalAlignment Sample'/>

#### VerticalAlignment属性

`VerticalAlignment`属性声明了要应用于子元素的垂直对齐特性。下表列出了`VerticalAlignment`属性的可选值。

| 成员            | 描述                                             |
|:--------------|:-----------------------------------------------|
| `Top`         | 子元素与父元素分配的布局空间的顶部对齐。                           |
| `Center`      | 子元素与父元素分配的布局空间的中心对齐。                           |
| `Bottom`      | 子元素与父元素分配的布局空间的底部对齐。                           |
| `Stretch`（默认） | 子元素被拉伸以填充父元素分配的布局空间。明确的`Width`和`Height`值优先级更高。 |

下面的示例展示了如何将`VerticalAlignment`属性应用于`Button`元素。为了更好地说明各种渲染行为，每种特性值的效果都被展示了出来。在本示例中，使用具有可见网格线的`Grid`元素作为父元素，以更好地说明每种属性值的布局行为。

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

前面的代码生成了与下图类似的布局。每种`VerticalAlignment`值的定位效果在图中可见。

<img src={LayoutVerticalAlignmentScreenshot} alt='VerticalAlignment property sample'/>

### 理解Margin属性

`Margin`属性描述了元素与其子元素或同级元素之间的距离。`Margin`值可以是相同的，通过使用像`Margin="20"`的语法，元素将使用相同的20个设备独立像素的`Margin`。`Margin`值也可以是四个不同的值，每个值描述了应用于左、上、右和下的不同边距（按顺序），如`Margin="0,10,5,25"`。正确使用`Margin`属性可以非常精确地控制元素的渲染位置及其相邻元素和子元素的渲染位置。

非零的边距应用在元素的`Bounds`之外的空间。

下面的示例展示了如何在一组`Button`元素周围应用相同的边距。这些`Button`元素的间距是均匀的，每个方向都有10像素的边距缓冲。

```xml
<Button Margin="10">Button 7</Button>
<Button Margin="10">Button 8</Button>
<Button Margin="10">Button 9</Button>
```

在许多情况下，统一的边距是不合适的。在这些情况下，可以应用非统一间距。以下示例展示了如何将非统一边距应用于子元素。边距按该顺序描述：左、上、右、下。

```xml
<Button Margin="0,10,0,10">Button 1</Button>
<Button Margin="0,10,0,10">Button 2</Button>
<Button Margin="0,10,0,10">Button 3</Button>
```

#### 理解Padding属性

`Padding`在大多数方面与`Margin`相似。`Padding`属性仅暴露在少数类上，主要是为了方便。`Border`、`TemplatedControl`、和`TextBlock`是暴露了`Padding`属性的类的范例。`Padding`属性通过指定的`Thickness`值扩大了子元素的有效尺寸。

以下示例展示了如何将`Padding`应用于父`Border`元素。

```xml
<Border Background="LightBlue"
        BorderBrush="Black"
        BorderThickness="2"
        CornerRadius="45"
        Padding="25">
```

#### 在应用程序中使用Alignment、Margin和Padding

`HorizontalAlignment`、`Margin`、`Padding`和`VerticalAlignment`提供创建复杂UI所需的定位控制。您可以使用每个属性的效果来改变子元素的位置，从而实现灵活地创建动态应用程序和提升用户体验。

下面的示例演示了本章节中详细介绍的每个概念。在本章节第一个示例的基础上，这个示例添加了一个`Grid`元素作为第一个示例中`Border`的子元素。`Padding`应用于父`Border`元素。`Grid`用于三个子`StackPanel`元素之间划分空间。`Button`元素再次被用来展示`Margin`和`HorizontalAlignment`的各种效果。`TextBlock`元素被添加到每个`ColumnDefinition`中，以更好地定义应用于每一列中`Button`元素的各种属性。

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

编译时，前面的应用程序生成的UI与下图类似。各种属性值的影响在元素之间的间距中很明显，每列元素的重要属性值展示在`TextBlock`元素中。

<img src={LayoutMarginsPaddingAlignmentComplexAnnotatedScreenshot} alt="Several positioning properties in one application"/>

