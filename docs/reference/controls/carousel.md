---
description: REFERENCE - Built-in Controls
---

import CarouselScreenshot from '/img/reference/controls/carousel/carousel.gif';

# Carousel

The carousel has an items collection, and displays each item as a page, in sequence, so that it fills the control.

You can use the carousel control to create a slide show.

## Useful Properties

You will probably use these properties most often:

<table>
  <thead>
    <tr>
      <th width="316">Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ItemsSource</code></td>
      <td>The bound collection that is used as the data source for the control.</td>
    </tr>
    <tr>
      <td><code>ItemsControl.ItemTemplate</code></td>
      <td>The item template, contains a DataTemplate which will be applied to individual items and can be used to change how items look.</td>
    </tr>
    <tr>
      <td><code>ItemsControl.ItemPanel</code></td>
      <td>The container panel to place items in. See [this page](../../concepts/custom-itemspanel) to customise the ItemsPanel.</td>
    </tr>
    <tr>
      <td><code>ItemsControl.Styles</code></td>
      <td>The style that is applied to any child element of the ItemControl.</td>
    </tr>
  </tbody>
</table>

## Example

This example has three images in the items collection, with buttons to move the display forwards and back. The buttons have click event handlers in the C# code-behind.

```xml
<Panel>
    <Carousel Name="slides" >
      <Carousel.PageTransition >
        <CompositePageTransition>
          <PageSlide Duration="0:00:01.500" Orientation="Horizontal" />
        </CompositePageTransition>
      </Carousel.PageTransition>
      <Carousel.Items>
        <Image Source="avares://AvaloniaControls/Assets/pipes.jpg" />
        <Image Source="avares://AvaloniaControls/Assets/controls.jpg" />
        <Image Source="avares://AvaloniaControls/Assets/vault.jpg" />
      </Carousel.Items>
    </Carousel>
    <Panel Margin="20">
      <Button Background="White" Click="Previous">&lt;</Button>
      <Button Background="White" Click="Next" 
              HorizontalAlignment="Right">&gt;</Button>
    </Panel>
  </Panel>
```

```csharp title='C#'
using Avalonia.Controls;
using Avalonia.Interactivity;

namespace AvaloniaControls.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        public void Next(object source, RoutedEventArgs args)
        {
            slides.Next();
        }

        public void Previous(object source, RoutedEventArgs args) 
        {
            slides.Previous();
        }
    }
}
```

<img src={CarouselScreenshot} alt="" />

## More Information

For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/Carousel/).

View the source code on _GitHub_ [`Carousel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Carousel.cs)
