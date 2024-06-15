---
description: REFERENCE - Built-in Control
---

import exampleScreenshot from '/img/reference/controls/itemscontrol/itemscontrol-with-custom-layout-and-formatting.gif';

# Items Control 元素集合控件

元素集合控件是用于显示重复数据的控件（例如列表框）的基础。它本身不包含内置的格式化或交互功能；但你可以结合数据绑定、样式和数据模板使用，创建一个完全自定义的重复数据控件。

:::info
要查看 _Avalonia UI_ 内置的所有重复数据控件的完整列表，请查看[这里](repeating-data-controls.md)。
:::

## 常用属性

你可能最常使用这些属性：

<table><thead><tr><th width="316">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>ItemsSource</code></td><td>用作控件数据源的绑定集合。</td></tr><tr><td><code>ItemsControl.ItemTemplate</code></td><td>附加属性元素，包含单个元素的数据模板。</td></tr></tbody></table>

## 示例

此示例将一个可观察的餐具项集合绑定到一个元素控件，其中通过数据模板提供了一些自定义布局和格式化：

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">餐具列表：</TextBlock>
  <ItemsControl ItemsSource="{Binding CrockeryList}" >
    <ItemsControl.ItemTemplate>
    <DataTemplate>
      <Border Margin="0,10,0,0"
          CornerRadius="5"
          BorderBrush="Gray" BorderThickness="1"
          Padding="5">
        <StackPanel Orientation="Horizontal">
          <TextBlock Text="{Binding Title}"/>
          <TextBlock Margin="5 0" FontWeight="Bold" 
                      Text="{Binding Number}"/>
        </StackPanel>
      </Border>
    </DataTemplate>
    </ItemsControl.ItemTemplate>
    </ItemsControl>
</StackPanel>
```

```csharp title='C# ViewModel'
using AvaloniaControls.Models;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace AvaloniaControls.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        public ObservableCollection<Crockery> CrockeryList { get; set; }
        
        public MainWindowViewModel()
        {
            CrockeryList = new ObservableCollection<Crockery>(new List<Crockery>
            {
                new Crockery("晚餐盘", 12),
                new Crockery("小碟", 12),
                new Crockery("早餐碗", 6),
                new Crockery("杯子", 10),
                new Crockery("茶碟", 10),
                new Crockery("马克杯", 6),
                new Crockery("牛奶壶", 1)
            });    
        }
    }
}
```

```csharp title='C# 数据源的类定义'
public class Crockery
{
    public string Title { get; set; }
    public int Number{ get; set; }

    public Crockery(string title, int number)
    {
        Title = title;
        Number = number;
    }
}
```

视图水平方向可调整大小，但内容在过高时会被隐藏。这个控件没有内置滚动条（与 `ListBox` 不同）。

<img src={exampleScreenshot} alt="" />

## 更多信息

:::info
要查看关于此控件的完整 API 文档，请查看[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/ItemsControl/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`ItemsControl.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ItemsControl.cs)
:::


