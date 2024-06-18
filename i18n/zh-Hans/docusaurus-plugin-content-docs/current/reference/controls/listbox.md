---
description: REFERENCE - Built-in Controls
---

import ListBoxStringScreenshot from '/img/reference/controls/listbox/listbox-string.gif';
import ListBoxDataTemplateScreenshot from '/img/reference/controls/listbox/listbox-datatemplate.gif';
import ListBoxDevToolsScreenshot from '/img/reference/controls/listbox/listbox-devtools.png';
import ListBoxItemStyleScreenshot from '/img/reference/controls/listbox/listbox-item-style.gif';

# ListBox 列表框

列表框从元素源集合中显示多行元素，并允许选择单个或多个。

列表中的元素可以组合、绑定和模板化。

列表的高度会扩展以适应所有元素，除非特别设置（使用高度属性），或由容器控件设置，例如边缘布局面板。

:::info
要了解更多关于边缘布局面板的信息，请参阅参考页面[这里](dockpanel.md)。
:::

当高度受限且总元素高度较大时，列表框中的内置滚动查看器将显示垂直滚动条。

同样，当任何元素的宽度超出列表框的宽度时，内置滚动查看器将显示水平滚动条（除非被阻止 - 见下文）。

## 常用属性

你可能最常使用这些属性：

| 属性 | 描述 |
| --- | --- |
| `Items` | 作为数据源的元素集合 |
| `SelectedIndex` | 选中元素的（从零开始的）索引，或在多选的情况下为第一个选中的元素。 |
| `SelectedItem` | 从元素集合中选中的元素（对象），或在多选的情况下为第一个选中的元素。 |
| `SelectedItems` | 列表中选中的元素。 |
| `Selection` | 一个 `ISelectionModel` 对象，带有跟踪多个选中元素的各种方法。这适用于大型元素集合。 |
| `SelectionMode` | 选择模式，见下表。 |
| `ScrollViewer.HorizontalScrollBarVisibility` | 内置滚动查看器的水平滚动条可见性。选项包括 'Disabled'（默认）、'Auto'、'Hidden' 和 'Visible'。当禁用时，溢出被隐藏。 |
| `ScrollViewer.VerticalScrollBarVisibility` | 内置滚动查看器的垂直滚动条可见性。选项包括 'Disabled'、'Auto'（默认）、'Hidden' 和 'Visible'。当禁用时，溢出被隐藏。 |

:::info
当元素集合较大时，推荐使用 `ISelectionModel` 以优化性能。
:::

## 选择模式

列表框可用的选择模式如下：

| 选择模式 | 描述 |
| --- | --- |
| `Single` | 只能选择单个元素（默认）。 |
| `Multiple` | 可以选择多个元素。 |
| `Toggle` | 可以通过点击/空格键切换元素选择。如果未启用，必须使用 shift 或 ctrl 来选择多个元素。 |
| `AlwaysSelected` | 只要有元素可选，则总会有一个元素被选中。 |

这些值可以组合使用，例如：

```xml
<ListBox SelectionMode="Multiple,Toggle">
```

## 示例

这个简单的示例设置了 `Items` 属性，该属性在 C#  code-behind 设置为一个数组。

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">选择一个动物：</TextBlock>
  <ListBox x:Name="animals"/>
</StackPanel>
```

```csharp title='C#'
using Avalonia.Controls;
using System.Linq;

namespace AvaloniaControls.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            animals.ItemsSource = new string[]
                {"cat", "camel", "cow", "chameleon", "mouse", "lion", "zebra" }
            .OrderBy(x => x);
        }
    }
}
```

<img src={ListBoxStringScreenshot} alt="" />

## 数据模板

你可以通过在列表框的 `ItemTemplate` 元素中使用**数据模板**来自定义元素的显示方式。

:::info
要回顾**数据模板**背后的概念，请参阅[这里](../../concepts/templates/)。
:::

这个示例在带圆角的蓝色边框内显示每个元素。C# code-behind 与之前相同：

```xml
<DockPanel Margin="20">
  <TextBlock Margin="0 5" DockPanel.Dock="Top">选择一个动物：</TextBlock>
  <ListBox x:Name="animals">
    <ListBox.ItemTemplate>
      <DataTemplate>
        <Border BorderBrush="Blue" BorderThickness="1" 
                CornerRadius="4" Padding="4">
          <TextBlock Text="{Binding}"/>
        </Border>
      </DataTemplate>
    </ListBox.ItemTemplate>
  </ListBox>
</DockPanel>
```

```csharp title='C#'
using Avalonia.Controls;
using System.Linq;

namespace AvaloniaControls.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            animals.ItemsSource = new string[]
                {"cat", "camel", "cow", "chameleon", "mouse", "lion", "zebra" }
            .OrderBy(x => x);
        }
    }
}
```

列表是边缘布局面板的填充区域，因此其高度设置为剩余部分。这显示了列表框中的滚动条。

<img src={ListBoxDataTemplateScreenshot} alt="" />

## 元素样式

在列表框中显示的每个元素都绘制在 `ListBoxItem` 元素内。你可以使用 _Avalonia UI 开发工具_ (F12)，使用**视觉工具**选项卡查看这一点。例如：

<img src={ListBoxDevToolsScreenshot} alt="" />

`ListBoxItem` 元素充当在 `ListBox.ItemTemplate` 元素中指定的内容的容器；但它从未在 XAML 中定义，而是由 _Avalonia UI_ 生成的。

这意味着你可以定位一个样式来自定义列表框中的 `ListBoxItem` 元素。例如，给列表项设置固定宽度为 200，然后右对齐它们：

```xml
<DockPanel Margin="20">
  <TextBlock Margin="0 5" DockPanel.Dock="Top">选择一个动物：</TextBlock>
  <ListBox x:Name="animals">
    <ListBox.Styles>
      <Style Selector="ListBoxItem">
        <Setter Property="Width" Value="200"/>
        <Setter Property="HorizontalAlignment" Value="Right"/>
      </Style>
    </ListBox.Styles>
  </ListBox>
</DockPanel>
```

```csharp title='C#'
using Avalonia.Controls;
using System.Linq;

namespace AvaloniaControls.Views
{
    public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        animals.ItemsSource = new string[]
            {"cat", "camel", "cow", "chameleon", "mouse", "lion", "zebra" }
        .OrderBy(x => x);
    }
}
```

<img src={ListBoxItemStyleScreenshot} alt="" />

### 更多信息

:::info
完整的 API 文档关于这个控件，请查看[这里](https://reference.avaloniaui.net/api/Avalonia.Controls/ListBox/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`ListBox.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ListBox.cs)
:::