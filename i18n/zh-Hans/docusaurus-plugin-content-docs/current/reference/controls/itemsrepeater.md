---
description: REFERENCE - Built-in Controls
---

import ItemsRepeaterVerticalScreenshot from '/img/reference/controls/itemsrepeater/itemsrepeater-vertical.png';
import ItemsRepeaterHorizontalScreenshot from '/img/reference/controls/itemsrepeater/itemsrepeater-horizontal.gif';

# ItemsRepeater 元素重复器

元素重复器可以从绑定的数据源显示重复数据。它具有布局模板和数据模板。

:::info
元素重复器是 UWP `ItemsRepeater` 控件的移植版本。更多信息请参见[这里](https://docs.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/items-repeater)。
:::

:::info
元素重复器已移至[这里](https://www.nuget.org/packages/Avalonia.Controls.ItemsRepeater)。
:::

默认的布局模板是垂直堆叠布局，因此元素会以垂直列表的形式显示。

## 示例

此示例将一个可观察的餐具项集合绑定到元素重复器控件，其中每个元素的自定义布局和格式由数据模板提供：

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">餐具列表：</TextBlock>
  <ItemsRepeater ItemsSource="{Binding CrockeryList}">
    <ItemsRepeater.ItemTemplate>
      <DataTemplate>
        <Border Margin="0,10,0,0"
            CornerRadius="5"
            BorderBrush="Blue" BorderThickness="1"
            Padding="5">
          <StackPanel Orientation="Horizontal">
            <TextBlock Text="{Binding Title}"/>
            <TextBlock Margin="5 0" FontWeight="Bold" 
                        Text="{Binding Number}"/>
          </StackPanel>
        </Border>
      </DataTemplate>
    </ItemsRepeater.ItemTemplate>
  </ItemsRepeater>
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
                new Crockery("小盘", 12),
                new Crockery("早餐碗", 6),
                new Crockery("杯子", 10),
                new Crockery("茶托", 10),
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
    public int Number { get; set; }

    public Crockery(string title, int number)
    {
        Title = title;
        Number = number;
    }
}
```

<img src={ItemsRepeaterVerticalScreenshot} alt="" />

默认情况下，元素重复器将以垂直堆叠布局渲染元素。你可以通过使用 `<ItemsRepeater.Layout>` 元素覆盖此设置，使元素水平显示。例如：

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">餐具列表：</TextBlock>
  <ScrollViewer HorizontalScrollBarVisibility="Auto">
    <ItemsRepeater ItemsSource="{Binding CrockeryList}" Margin="0 20">
      <ItemsRepeater.Layout>
        <StackLayout Spacing="40"
            Orientation="Horizontal" />
      </ItemsRepeater.Layout>
      <ItemsRepeater.ItemTemplate>
        <DataTemplate>
          <Border Margin="0,10,0,0"
              CornerRadius="5"
              BorderBrush="Blue" BorderThickness="1"
              Padding="5">
            <StackPanel Orientation="Horizontal">
              <TextBlock Text="{Binding Title}"/>
              <TextBlock Margin="5 0" FontWeight="Bold" 
                          Text="{Binding Number}"/>
            </StackPanel>
          </Border>
        </DataTemplate>
      </ItemsRepeater.ItemTemplate>
    </ItemsRepeater>
  </ScrollViewer>
</StackPanel>
```

元素水平显示，如果没有添加围绕元素重复器的滚动查看器元素，那么过于靠右的元素将会被隐藏。

<img src={ItemsRepeaterHorizontalScreenshot} alt="" />

## 更多信息

:::info
有关此控件的完整 API 文档，请参见[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/ItemsRepeater/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`ItemsRepeater.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls.ItemsRepeater/Controls/ItemsRepeater.cs)
:::
