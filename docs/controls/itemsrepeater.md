---
id: itemsrepeater
title: ItemsRepeater
---

A data-driven collection control that incorporates a flexible layout system, custom views, and virtualization.

`ItemsRepeater` is a port of the UWP `ItemsRepeater` control. More documentation can be found at:

[https://docs.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/items-repeater](https://docs.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/items-repeater) [https://docs.microsoft.com/en-us/uwp/api/microsoft.ui.xaml.controls.itemsrepeater?view=winui-2.3](https://docs.microsoft.com/en-us/uwp/api/microsoft.ui.xaml.controls.itemsrepeater?view=winui-2.3)

The only difference between the two controls is that in Avalonia the `ItemsSource` is called `Items`.

### Examples <a id="examples"></a>
Imagine that you want to Show a list of Players shaped like so

```csharp
public class Player
{
    public string Name { get; set; }
    public Player(string name)
    {
        Name = name;
    }
}
```

And in your `ViewModel` they look like this
```csharp
public List<Player> Players { get; set; } = new() {
            new("Maurizio"),
            new("Giacomo"),
            new("Mario"),
        };
```

By default an `ItemsRepeater`, without defining a `Layout` will render them Stacked Vertically.

```xml
<ItemsRepeater Items="{Binding Players}">
    <ItemsRepeater.ItemTemplate>
        <DataTemplate>
            <Border Margin="0,10,0,0"
                Padding="5">
                <TextBlock Text="{Binding Name}"/>
            </Border>
        </DataTemplate>
    </ItemsRepeater.ItemTemplate>
</ItemsRepeater>
```
And they will look like so

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/itemsrepeater/itemsrepeatervertical.png" alt="Decription" />
  </div>

If you want them to be rendered Horizontally, you need to specify a `Layout` property and the xaml should look a bit like so:
```xml
<ItemsRepeater Items="{Binding Players}">
    <ItemsRepeater.Layout>
        <StackLayout Spacing="40"
            Orientation="Horizontal" />
    </ItemsRepeater.Layout>
    <ItemsRepeater.ItemTemplate>
        <DataTemplate>
            <Border BorderBrush="Blue"
                Margin="0,10,0,0"
                BorderThickness="1"
                Padding="5">
                <TextBlock Text="{Binding Name}"/>
            </Border>
        </DataTemplate>
    </ItemsRepeater.ItemTemplate>
</ItemsRepeater>
```
this will look like this:
  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/itemsrepeater/itemsrepeaterhorizontal.png" alt="Decription" />
  </div>

In the `Layout` property you can also specify `Spacing` between the items, but you cannot define `Classes` nor other complex styles, those needs to be defined on the `ItemsRepeater` if needed.



## Reference <a id="reference"></a>

[ItemsRepeater](http://reference.avaloniaui.net/api/Avalonia.Controls/ItemsRepeater/)

## Source code <a id="source-code"></a>

[ItemsRepeater.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Repeater/ItemsRepeater.cs)
