---
description: REFERENCE - Built-in Controls
---

import SliderScreenshot from '/img/reference/controls/slider/slider.gif';
import SliderMaxValueScreenshot from '/img/reference/controls/slider/slider-max-value.gif';

# Slider

The slider control presents its numerical value as the relative position of a slider button along the length of a track. The position is relative to maximum and minimum values.

Drag interaction on the slider button can alter the value between the maximum and minimum values. Keyboard and click interactions can also nudge the value.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="197">Property</th><th>Description</th></tr></thead><tbody><tr><td>Maximum</td><td>Sets the maximum value.</td></tr><tr><td>Minimum</td><td>Sets the minimum value.</td></tr></tbody></table>

## Example

In this example the slider value is displayed in the text block below, using binding to a control.

:::info
To review how to bind one control to another, see the guide [here](../../guides/data-binding/binding-to-controls.md).
:::

Here the maximum and minimum values are default (0 and 100 respectively).

```xml
<StackPanel Margin="20">
  <TextBlock Text="{Binding #slider.Value}" 
              HorizontalAlignment="Center"/>
  <Slider x:Name="slider" />
</StackPanel>
```

The slider looks like this on Windows:

<img src={SliderScreenshot} alt="" />

## Binding to TextBox
In this example, the slider value is bound to the text box above using binding to the control.

### Views
```xml
<StackPanel>
  <TextBlock Text="Damage: " />
  <TextBox Text="{Binding Damage}" />
  <TextBlock Text="MaxDamage: " />
  <TextBox Text="{Binding MaxDamage}" />
  <Slider Maximum="{Binding MaxDamage}" Value="{Binding Damage}" />
  <Button Command="{Binding UnlimitedDamage}" Content="∞" />
</StackPanel>
```
### ViewModels
- You can choose [ReactiveUI](../../concepts/reactiveui/index.md) or [CommunityToolkit](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/) when creating a project.
- The ViewModel code will change depending on which one you select.
- It doesn't matter which you choose, but here i will only detail how to binding using ReactiveUI.

```cs
using ReactiveUI;
using System.Windows.Input;
public class MainViewModel : ViewModelBase
{
    private int _damage;
    public int Damage
    {
        get => _damage;
        set => this.RaiseAndSetIfChanged(ref _damage, value);
    }
    private int _maxDamage;
    public int MaxDamage
    {
        get => _maxDamage;
        set => this.RaiseAndSetIfChanged(ref _maxDamage, value);
    }
```

- using [ReactiveUI.Fody.Helpers](https://www.reactiveui.net/docs/handbook/view-models/boilerplate-code.html) NOTE: Fody.Helpers is not required (optional).

:::info
On how to add a nuget package, you can follow steps from the Nuget page or [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio), [Rider](https://www.jetbrains.com/help/rider/Using_NuGet.html) documentation.
:::

```cs
using ReactiveUI.Fody.Helpers;
public class MainViewModel : ViewModelBase
{
    [Reactive]
    public int Damage { get; set; }
    [Reactive]
    public int MaxDamage { get; set; }
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

<img src={SliderMaxValueScreenshot} alt="" />

## More Information

For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/Slider/).

View the source code on _GitHub_ [`Slider.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Slider.cs)
