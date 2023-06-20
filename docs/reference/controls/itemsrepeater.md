---
description: REFERENCE - Built-in Controls
---

# Items Repeater

The items repeater can display repeating data from a bound data source. It has both a layout template and a data template.&#x20;

{% hint style="info" %}
The items repeater is a port of the UWP `ItemsRepeater` control. For further information see [here](https://docs.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/items-repeater). The only difference is that the data source in the _Avalonia UI_ control is called `Items` (not `ItemsSource`).&#x20;
{% endhint %}

The default layout template is a vertical stack layout, so that items appear in a vertical list.

## Example <a href="#examples" id="examples"></a>

This example binds an observable collection of crockery items to an items repeater control, where some custom layout and formatting for each item is provided by the data template:&#x20;

{% tabs %}
{% tab title="XAML" %}
```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">List of crockery:</TextBlock>
  <ItemsRepeater  Items="{Binding CrockeryList}" >
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
{% endtab %}

{% tab title="C# View Model" %}
```csharp
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
{% endtab %}

{% tab title="C# Item Class" %}
```csharp
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
{% endtab %}
{% endtabs %}

<figure><img src="../../.gitbook/assets/image (2) (6).png" alt=""><figcaption></figcaption></figure>

By default an items repeater will render the items in a vertical stack layout. You can display the items horizontally by overriding this using a `<ItemsRepeater.Layout>` element, which must contain a stack layout. For example:

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">List of crockery:</TextBlock>
  <ScrollViewer HorizontalScrollBarVisibility="Auto">
    <ItemsRepeater Items="{Binding CrockeryList}" Margin="0 20">
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

The items display horizontally, and those too far to the right would be hidden if it were not for the scroll viewer element added around the items repeater.   &#x20;

<figure><img src="../../.gitbook/assets/repeater.gif" alt=""><figcaption></figcaption></figure>

## More Information

{% hint style="info" %}
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/ItemsRepeater/).
{% endhint %}

{% hint style="info" %}
View the source code on _GitHub_ [`ItemsRepeater.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls.ItemsRepeater/Controls/ItemsRepeater.cs)
{% endhint %}
