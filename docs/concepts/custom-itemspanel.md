---
description: CONCEPTS
---

import ItemsControlCanvasScreenshot from '/img/concepts/itemscontrol-with-canvas.png';

# Custom ItemsPanel

All `ItemsControl`s have an item container panel which is used to layout their items. It is possible to override the type of panel used by the control to achieve custom/alternative layouts of items in a control. This document provides some examples showcasing how and why you would do this.
 
- [`ItemsControl`](./../reference/controls/itemscontrol)
- [`TreeView`](./../reference/controls/detailed-reference/treeview-1)
- [`Carousel`](./../reference/controls/carousel)
- [`Menu`](./../reference/controls/menu)
- [`ComboBox`](./../reference/controls/combobox)
- [`ListBox`](./../reference/controls/listbox) 

## Example
This example binds an observable collection of `Rectangle`s (based on the Tile VM data) to an `ItemsControl`. ItemsControl.ItemPanel is set to a `Canvas` and we use a style to position the `Rectangle` within the `Canvas`.

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

```csharp title='C# View Model'
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

```csharp title='C# Item Class'
public record Tile(int Size, int TopX, int TopY);
```

<img src={ItemsControlCanvasScreenshot} alt="" />