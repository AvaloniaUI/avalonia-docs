---
description: CONCEPTS
---

import ItemsControlCanvasScreenshot from '/img/concepts/itemscontrol-with-canvas.png';

# 自定义 ItemsPanel

所有 `ItemsControl` 都有一个用于布局其项的项容器面板。可以重写控件使用的面板类型，以实现控件中项的自定义/替代布局。本文档提供了一些示例，展示了如何以及为什么要这样做。

- [`ItemsControl`](./../reference/controls/itemscontrol)
- [`TreeView`](./../reference/controls/detailed-reference/treeview-1)
- [`Carousel`](./../reference/controls/carousel)
- [`Menu`](./../reference/controls/menu)
- [`ComboBox`](./../reference/controls/combobox)
- [`ListBox`](./../reference/controls/listbox) 

## 示例
此示例将可观察集合中的 `Rectangle`（基于 Tile VM 数据）绑定到 `ItemsControl`。ItemsControl.ItemPanel 设置为 `Canvas`，我们使用样式来在 `Canvas` 中定位 `Rectangle`。

```xml
<ItemsControl ItemsSource="{Binding TileList}">
  <ItemsControl.ItemsPanel>
    <ItemsPanelTemplate>
      <Canvas Width="50" Height="50" Background="Yellow" Margin="3"/>
    </ItemsPanelTemplate>
  </ItemsControl.ItemsPanel>
  <ItemsControl.ItemTemplate>
    <DataTemplate>
      <Rectangle Fill="Green" Height="{Binding Size}" Width="{Binding Size}"/>
    </DataTemplate>
  </ItemsControl.ItemTemplate>
  <ItemsControl.Styles>
    <Style Selector="ContentPresenter"  x:DataType="vm:Tile">
      <Setter Property="Canvas.Left" Value="{Binding TopX}"/>
      <Setter Property="Canvas.Top" Value="{Binding TopY}"/>
    </Style>
  </ItemsControl.Styles>
</ItemsControl>
```

```csharp title='C# 视图模型'
using AvaloniaControls.Models;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace AvaloniaControls.ViewModels
{
    public class MainWindowViewModel
    {
        public ObservableCollection<Tile> TileList { get; set; }
        
        public MainWindowViewModel()
        {
            TileList = new ObservableCollection<Tile>(new List<Tile>
            {
                new Tile(10, 10, 10),
                new Tile(10, 20, 20),
                new Tile(10, 30, 30),
            });    
        }
    }
}
```

```csharp title='C# 项类'
public record Tile(int Size, int TopX, int TopY);
```

<img src={ItemsControlCanvasScreenshot} alt="" />
