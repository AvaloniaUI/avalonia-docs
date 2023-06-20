---
description: REFERENCE - Built-in Controls
---

# Repeat Button

The repeat button is a control that has the added feature of regularly generating click events while the button is being pressed down.

## Useful Properties

You will probably use these properties most often:

| Property | Description                                                                              |
| -------- | ---------------------------------------------------------------------------------------- |
| Delay    | The time (milliseconds) to wait before repeated click generation begins. Default is 300. |
| Interval | The time (milliseconds) between clicks being generated. Default is 100.                  |

## Example

This example shows a repeat button generating click events with the default interval and delay.



```
<Grid Margin="20" RowDefinitions="50,*">
  <RepeatButton Grid.Row="0" Click="ClickHandler">Press and hold down</RepeatButton>
  <ScrollViewer Grid.Row="1">
    <TextBlock  Margin="0 10" x:Name="message">Ready...</TextBlock>
  </ScrollViewer>
</Grid>
```


{% tab title="C#" %}
```csharp
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    public void ClickHandler(object sender, RoutedEventArgs args)
    {
        message.Text += "\rButton clicked!";
    }
}
```



<!--figure><img src="../../../.gitbook/assets/repeatbutton.gif" alt=""><figcaption></figcaption></figure-->

## More Information

{% hint style="info" %}
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/RepeatButton/).
{% endhint %}

{% hint style="info" %}
View the source code on _GitHub_ [`RepeatButton.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/RepeatButton.cs)
{% endhint %}
