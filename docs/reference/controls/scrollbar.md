---
description: REFERENCE - Built-in Controls
---

# Scroll Bar

A scroll bar control can be displayed in a horizontal or vertical orientation. The default value (double) range for the scroll bar is 0-100.&#x20;

You can configure the range and how the value changes (small and large steps). Small steps can be controlled by the keyboard arrow keys, and large steps by mouse clicks in the scroll bar track, or by the page-up and page-down keys. &#x20;

## Useful Properties&#x20;

You will probably use these properties most often:

<table><thead><tr><th width="241">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Orientation</code></td><td>The orientation of the scroll bar.</td></tr><tr><td><code>VerticalAlignment</code></td><td>The vertical alignment of the scroll bar in its container. Choose from top, bottom, center and stretch.</td></tr><tr><td><code>HorizontalAlignment</code></td><td>The horizontal alignment of the scroll bar in its container. Choose from left, right, center and stretch.</td></tr></tbody></table>

{% hint style="warning" %}
To create a meaningful layout, you will need to use corresponding orientation and alignment properties. For example, a vertical orientation matches a horizontal alignment.&#x20;
{% endhint %}

## Example



```xml
<Panel>
  <Border Background="AliceBlue">
    <ScrollBar Visibility="Auto" 
             HorizontalAlignment="Left" 
             Scroll="ScrollHandler"></ScrollBar>
  </Border>
  <TextBlock Name="valueText" Margin="60">0</TextBlock>
</Panel>
```


{% tab title="C#" %}
```csharp
using Avalonia.Controls;
using Avalonia.Controls.Primitives;

namespace AvaloniaControls.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        public void ScrollHandler(object source, ScrollEventArgs args)
        {
            valueText.Text = args.NewValue.ToString();
        }
    }
}
```



With the example code-behind, the text block displays the value of the scrollbar.&#x20;

<!--figure><img src="../../.gitbook/assets/scrollbar (1).gif" alt=""><figcaption></figcaption></figure-->

## More Information

{% hint style="info" %}
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls.Primitives/ScrollBar/).
{% endhint %}

{% hint style="info" %}
View the source code on _GitHub_ [`ScrollBar.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Primitives/ScrollBar.cs)
{% endhint %}
