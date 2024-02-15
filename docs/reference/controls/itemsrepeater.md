---
title: ItemsRepeater
description: REFERENCE - Built-in Controls
---

import ItemsRepeaterVerticalScreenshot from '/img/reference/controls/itemsrepeater/itemsrepeater-vertical.png';
import ItemsRepeaterHorizontalScreenshot from '/img/reference/controls/itemsrepeater/itemsrepeater-horizontal.gif';

# ItemsRepeater

The `ItemsRepeater` can display repeating data from a bound data source. It has both a layout template and a data template.

:::info
The items repeater is a port of the UWP `ItemsRepeater` control. For further information see [here](https://docs.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/items-repeater).
:::

:::info
The items repeater was moved [here](https://www.nuget.org/packages/Avalonia.Controls.ItemsRepeater)
:::

The default layout template is a vertical stack layout, so that items appear in a vertical list.

## Example

This example binds an observable collection of crockery items to an items repeater control, where some custom layout and formatting for each item is provided by the data template:

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">List of crockery:</TextBlock>
  <ItemsRepeater  ItemsSource="{Binding CrockeryList}" >
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

```csharp title='C# View Model'
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
                new Crockery("dinner plate", 12),
                new Crockery("side plate", 12),
                new Crockery("breakfast bowl", 6),
                new Crockery("cup", 10),
                new Crockery("saucer", 10),
                new Crockery("mug", 6),
                new Crockery("milk jug", 1)
            });    
        }
    }
}
```

```csharp title='C# Item Class'
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

<img src={ItemsRepeaterVerticalScreenshot} alt="" />

By default, an items repeater will render the items in a vertical stack layout. You can display the items horizontally by overriding this using a `<ItemsRepeater.Layout>` element, which must contain a stack layout. For example:

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">List of crockery:</TextBlock>
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

The items display horizontally, and those too far to the right would be hidden if it were not for the scroll viewer element added around the items repeater.   

<img src={ItemsRepeaterHorizontalScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/ItemsRepeater/).
:::

:::info
View the source code on _GitHub_ [`ItemsRepeater.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls.ItemsRepeater/Controls/ItemsRepeater.cs)
:::
