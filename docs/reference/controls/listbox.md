---
description: REFERENCE - Built-in Controls
---

# List Box

The list box displays items from an items source collection, on multiple lines, and allows individual or multiple selection.

The items in the list can be composed, bound and templated.

The list height expands to fit all the items unless set specifically (using the height attribute), or set by a containing control, such as the dock panel.

{% hint style="info" %}
To learn more about the dock panel, see the reference page [here](dockpanel.md).
{% endhint %}

When the height is constrained, and the total item height is larger, then the built-in scroll viewer in the list box will display a vertical scrollbar.

Similarly when the width of any item exceeds the width of the list box, then the built-in scroll viewer in the list box will display a horizontal scrollbar (unless prevented - see below).

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="289">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Items</code></td><td></td></tr><tr><td><code>SelectedIndex</code></td><td>The (zero-based) index of the selected item, or in the case of multiple selection the first selected item.</td></tr><tr><td><code>SelectedItem</code></td><td>The selected item (object) from the items collection, or in the case of multiple selection the first selected item.</td></tr><tr><td><code>SelectedItems</code></td><td>The selected items in a list.</td></tr><tr><td><code>Selection</code></td><td>An <code>ISelectionModel</code> object with various methods to track multiple selected items. This is is optimized for a large items collection.</td></tr><tr><td><code>SelectionMode</code></td><td>The mode of selection, see table below.</td></tr><tr><td><p><code>ScrollViewer.Horizontal</code></p><p><code>ScrollBarVisibility</code></p></td><td>The horizontal scrollbar visibility for the built-in scroll viewer. Options are 'Disabled' (default), 'Auto', 'Hidden' and 'Visible'. When disabled, overflow is hidden. </td></tr><tr><td><p><code>ScrollViewer.Vertical</code></p><p><code>ScrollBarVisibility</code></p></td><td>The vertical scrollbar visibility for the built-in scroll viewer. Options are 'Disabled', 'Auto' (default), 'Hidden' and 'Visible'. When disabled, overflow is hidden. </td></tr></tbody></table>

{% hint style="info" %}
To optimize performance when the items collection is large, use of the `ISelectionModel` is recommended.&#x20;
{% endhint %}

## Selection Mode <a href="#selectionmode" id="selectionmode"></a>

The following selection modes are available for the list box:

<table><thead><tr><th width="237">Selection Mode</th><th>Description</th></tr></thead><tbody><tr><td><code>Single</code></td><td>Only a single item can be selected (default).</td></tr><tr><td><code>Multiple</code></td><td>Multiple items can be selected.</td></tr><tr><td><code>Toggle</code></td><td>Item selection can be toggled by tapping/spacebar. When not enabled, shift or ctrl must be used to select multiple items.</td></tr><tr><td><code>AlwaysSelected</code></td><td>An item will always be selected as long as there are items to select.</td></tr></tbody></table>

These values can be combined, for example:

```markup
<ListBox SelectionMode="Multiple,Toggle"
```

## Example

This simple example has the `Items` property set to an array in the C# code-behind.

{% tabs %}
{% tab title="XAML" %}
```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">Choose an animal:</TextBlock>
  <ListBox x:Name="animals"/>
</StackPanel>
```
{% endtab %}

{% tab title="C#" %}
```csharp
using Avalonia.Controls;
using System.Linq;

namespace AvaloniaControls.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            animals.Items = new string[]
                {"cat", "camel", "cow", "chameleon", "mouse", "lion", "zebra" }
            .OrderBy(x => x);
        }
    }
}
```
{% endtab %}
{% endtabs %}

<!--figure><img src="../../.gitbook/assets/listbox1.gif" alt=""><figcaption></figcaption></figure-->

## Item Template <a href="#customizing-the-item-display" id="customizing-the-item-display"></a>

You can customize how an item is displayed by using an **data template** inside the list box `ItemTemplate` element.&#x20;

{% hint style="info" %}
To review the concepts behind **data template**, see [here](../../concepts/templates/).
{% endhint %}

This example displays each item inside a blue border with rounded corners. The C# code-behind is the same as before:

{% tabs %}
{% tab title="XAML" %}
```xml
<DockPanel Margin="20">
  <TextBlock Margin="0 5" DockPanel.Dock="Top">Choose an animal:</TextBlock>
  <ListBox x:Name="animals">
    <ListBox.ItemTemplate>
      <DataTemplate>
        <Border BorderBrush="Blue" BorderThickness="1" 
                CornerRadius="4" Padding="4">
          <TextBlock Text="{Binding}"/>
        </Border>
      </DataTemplate>
    </ListBox.ItemTemplate>
  </ListBox>
</DockPanel>
```
{% endtab %}

{% tab title="C#" %}
```csharp
using Avalonia.Controls;
using System.Linq;

namespace AvaloniaControls.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            animals.Items = new string[]
                {"cat", "camel", "cow", "chameleon", "mouse", "lion", "zebra" }
            .OrderBy(x => x);
        }
    }
}
```
{% endtab %}
{% endtabs %}

The list is the fill area of the dock panel here, so its height is set to the remaining. This shows the scrollbar in the list box.&#x20;

<!--figure><img src="../../.gitbook/assets/listbox2.gif" alt=""><figcaption></figcaption></figure-->

## Item Styling <a href="#containers" id="containers"></a>

Each item displayed in a list box is drawn inside a `ListBoxItem` element. You can see this using the _Avalonia UI Dev Tools_ (F12), using the **Visual Tools** tab. For example:

<!--figure><img src="../../.gitbook/assets/image (6) (1) (4).png" alt=""><figcaption></figcaption></figure-->

The `ListBoxItem` element acts as a container for the content specified in a `ListBox.ItemTemplate` element; but it is not ever defined in the XAML, instead it is generated by _Avalonia UI_.

This means you can target a style to customize the `ListBoxItem` elements in a list box. For example, to give the list items a fixed width of 200 and then right-align them:

{% tabs %}
{% tab title="XAML" %}
```xml
<DockPanel Margin="20">
  <TextBlock Margin="0 5" DockPanel.Dock="Top">Choose an animal:</TextBlock>
  <ListBox x:Name="animals">
    <ListBox.Styles>
      <Style Selector="ListBoxItem">
        <Setter Property="Width" Value="200"/>
        <Setter Property="HorizontalAlignment" Value="Right"/>
      </Style>
    </ListBox.Styles>
  </ListBox>
</DockPanel>
```
{% endtab %}

{% tab title="C#" %}
```csharp
using Avalonia.Controls;
using System.Linq;

namespace AvaloniaControls.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            animals.Items = new string[]
                {"cat", "camel", "cow", "chameleon", "mouse", "lion", "zebra" }
            .OrderBy(x => x);
        }
    }
}code
```
{% endtab %}
{% endtabs %}

<!--figure><img src="../../.gitbook/assets/listbox3.gif" alt=""><figcaption></figcaption></figure-->

### More Information <a href="#selecteditems" id="selecteditems"></a>

{% hint style="info" %}
For the complete API documentation about this control, see [here](https://reference.avaloniaui.net/api/Avalonia.Controls/ListBox/).
{% endhint %}

{% hint style="info" %}
View the source code on _GitHub_ [`ListBox.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ListBox.cs)
{% endhint %}
