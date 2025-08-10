---
description: КОНЦЕПЦИИ
---

import ItemsControlCanvasScreenshot from '/img/concepts/itemscontrol-with-canvas.png';

# Пользовательская панель элементов (ItemsPanel)

Все элементы управления `ItemsControl` имеют панель-контейнер элементов, которая используется для компоновки их элементов. Возможно переопределить тип панели, используемой элементом управления, чтобы достичь пользовательских/альтернативных вариантов компоновки элементов в элементе управления. Этот документ предоставляет несколько примеров, демонстрирующих, как и зачем это делать.
 
- [`ItemsControl`](./../reference/controls/itemscontrol)
- [`TreeView`](./../reference/controls/treeview-1)
- [`Carousel`](./../reference/controls/carousel)
- [`Menu`](./../reference/controls/menu)
- [`ComboBox`](./../reference/controls/combobox)
- [`ListBox`](./../reference/controls/listbox) 

## Пример
Этот пример связывает коллекцию Observable с `Rectangle` (на основе данных модели представления Tile) с элементом управления `ItemsControl`. ItemsControl.ItemPanel установлен на `Canvas`, и мы используем стиль для позиционирования `Rectangle` внутри `Canvas`.

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

```csharp title='C# Модель представления'
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

```csharp title='C# Класс элемента'
public record Tile(int Size, int TopX, int TopY);
```

<img src={ItemsControlCanvasScreenshot} alt="" />