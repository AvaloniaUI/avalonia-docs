---
id: slider
title: Slider
---

import SliderMaxValueScreenshot from '/img/controls/slider/slider-max-value.gif';

The slider control presents its numerical value as the relative position of a slider button along the length of a track. The position is relative to maximum and minimum values.

Drag interaction on the slider button can alter the value between the maximum and minimum values. Keyboard and click interactions can also nudge the value.

## Useful properties

You will probably use these properties most often:

<table><thead><tr><th width="197">Property</th><th>Description</th></tr></thead><tbody><tr><td>Maximum</td><td>Sets the maximum value.</td></tr><tr><td>Minimum</td><td>Sets the minimum value.</td></tr></tbody></table>

## Example

In this example the slider value is displayed in the text block below, using binding to a control.

:::info
To review how to bind one control to another, see the guide [Binding to controls](/docs/data-binding/binding-to-controls).
:::

Here the maximum and minimum values are default (0 and 100 respectively).

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui"
            xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
            Margin="20">
  <TextBlock Text="{Binding #slider.Value}" 
              HorizontalAlignment="Center"/>
  <Slider x:Name="slider" />
</StackPanel>
```

</XamlPreview>

## Binding to TextBox
In this example, the slider value is bound to the text box above using binding to the control.

<img src={SliderMaxValueScreenshot} alt="" />

### Views

```xml
<StackPanel xmlns="https://github.com/avaloniaui">
  <TextBlock Text="Damage: " />
  <TextBox Text="{Binding Damage}" />
  <TextBlock Text="MaxDamage: " />
  <TextBox Text="{Binding MaxDamage}" />
  <Slider Maximum="{Binding MaxDamage}" Value="{Binding Damage}" />
  <Button Command="{Binding UnlimitedDamage}" Content="∞" />
</StackPanel>
```

### ViewModels

The ViewModel implements `INotifyPropertyChanged` to notify the view when property values change.

```cs
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;

public class MainViewModel : INotifyPropertyChanged
{
    private int _damage;
    public int Damage
    {
        get => _damage;
        set { if (_damage != value) { _damage = value; OnPropertyChanged(); } }
    }

    private int _maxDamage;
    public int MaxDamage
    {
        get => _maxDamage;
        set { if (_maxDamage != value) { _maxDamage = value; OnPropertyChanged(); } }
    }

    public event PropertyChangedEventHandler? PropertyChanged;
    protected void OnPropertyChanged([CallerMemberName] string? name = null)
        => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
```
- In the above configuration (i.e. when a change notification is bound between the Views and the ViewModels) can the values ​​in the view be updated seemless.
- You can also values ​​are updated in ViewModels.:
```cs
    public ICommand UnlimitedDamage { get; }
    public MainViewModel()
    {
        MaxDamage = 9999;
        UnlimitedDamage = ReactiveCommand.Create(
            () => Damage = MaxDamage = 0xFFFF);
    }
```

## See also

- [Slider API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Slider)
- [`Slider.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Slider.cs)
