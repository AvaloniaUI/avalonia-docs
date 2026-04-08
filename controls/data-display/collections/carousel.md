---
id: carousel
title: Carousel
description: A reference for the Carousel control in Avalonia, which displays items one at a time with animated page transitions, navigation methods, and data-binding support.
doc-type: reference
---

import CarouselScreenshot from '/img/reference/controls/carousel/carousel.gif';

The `Carousel` has an items collection and displays each item as a page, in sequence, so that it fills the control. You can use it to build slide shows, onboarding flows, or any UI where your users step through content one page at a time.

## Useful properties

You will probably use these properties most often:

| Property | Description |
|---|---|
| `ItemsSource` | The bound collection that is used as the data source for the control. |
| `ItemTemplate` | A `DataTemplate` applied to each item, allowing you to control how items look. |
| `PageTransition` | The transition animation played when the displayed item changes. |
| `SelectedIndex` | The zero-based index of the currently displayed item. |
| `SelectedItem` | The currently displayed item from the bound collection. |
| `ItemsPanel` | The container panel used to arrange items. See [ItemsControl](/controls/data-display/collections/itemscontrol) for details on customising the items panel. |

## Example

This example has three images in the items collection, with buttons to move the display forwards and back. The buttons have click event handlers in the C# code-behind.

```xml title='XAML'
<Panel>
    <Carousel Name="slides">
        <Carousel.PageTransition>
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

<img src={CarouselScreenshot} alt="Carousel control cycling through slides" />

## Binding to a collection

Use `ItemsSource` to bind the `Carousel` to a data collection and provide a custom `DataTemplate`:

```xml title='XAML'
<Carousel ItemsSource="{Binding Slides}" SelectedIndex="{Binding CurrentSlide}">
    <Carousel.PageTransition>
        <CrossFade Duration="0:00:00.300" />
    </Carousel.PageTransition>
    <Carousel.ItemTemplate>
        <DataTemplate>
            <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center">
                <TextBlock Text="{Binding Title}" FontSize="24" FontWeight="Bold" />
                <TextBlock Text="{Binding Description}" TextWrapping="Wrap" />
            </StackPanel>
        </DataTemplate>
    </Carousel.ItemTemplate>
</Carousel>
```

The view model exposes the collection and the current index:

```csharp title='C#'
public class SlidesViewModel : ViewModelBase
{
    public ObservableCollection<Slide> Slides { get; } = new()
    {
        new Slide("Welcome",   "Get started with Avalonia."),
        new Slide("Features",  "Cross-platform, high-performance UI."),
        new Slide("Community", "Join the Avalonia community today."),
    };

    private int _currentSlide;
    public int CurrentSlide
    {
        get => _currentSlide;
        set => this.RaiseAndSetIfChanged(ref _currentSlide, value);
    }
}
```

Because `SelectedIndex` is bound two-way by default, you can advance the carousel from your view model by changing `CurrentSlide`, or let the control update the property when the user navigates with buttons.

## Page transitions

You set the animation that plays between items by assigning a transition to the `PageTransition` property. Avalonia ships with several built-in transitions:

| Transition | Description |
|---|---|
| `PageSlide` | Slides content in from a specified direction. You can set `Orientation` to `Horizontal` (default) or `Vertical`. |
| `CrossFade` | Fades out the current item and fades in the new item by animating opacity. |
| `CompositePageTransition` | Combines multiple transitions so they run together. |

### `PageSlide` example

```xml title='XAML'
<Carousel.PageTransition>
    <PageSlide Duration="0:00:00.500" Orientation="Horizontal" />
</Carousel.PageTransition>
```

### `CrossFade` example

```xml title='XAML'
<Carousel.PageTransition>
    <CrossFade Duration="0:00:00.300" />
</Carousel.PageTransition>
```

### Composite transition example

You can layer transitions together using `CompositePageTransition`:

```xml title='XAML'
<Carousel.PageTransition>
    <CompositePageTransition>
        <CrossFade Duration="0:00:00.500" />
        <PageSlide Duration="0:00:00.500" Orientation="Horizontal" />
    </CompositePageTransition>
</Carousel.PageTransition>
```

### Disabling transitions

To switch items without any animation, set `PageTransition` to `{x:Null}`:

```xml title='XAML'
<Carousel PageTransition="{x:Null}" />
```

For a full guide on page transitions (including how to create custom transitions), see [Setting page transitions](/docs/graphics-animation/page-transitions).

## Navigation

You can change the displayed item in several ways:

| Technique | Description |
|---|---|
| `Next()` | Advance to the next item in the collection. |
| `Previous()` | Move back to the previous item. |
| `SelectedIndex` | Set or bind the zero-based index of the item to display. |
| `SelectedItem` | Set or bind the item object directly. |

### Navigating with buttons (code-behind)

The simplest approach is to call `Next()` and `Previous()` from button click handlers, as shown in the [example](#example) above.

### Navigating with data binding

Bind `SelectedIndex` to a property on your view model so you can control navigation from application logic:

```xml title='XAML'
<Carousel ItemsSource="{Binding Pages}" SelectedIndex="{Binding PageIndex}" />
```

```csharp title='C#'
public int PageIndex
{
    get => _pageIndex;
    set => this.RaiseAndSetIfChanged(ref _pageIndex, value);
}

public void GoToNext()
{
    if (PageIndex < Pages.Count - 1)
        PageIndex++;
}

public void GoToPrevious()
{
    if (PageIndex > 0)
        PageIndex--;
}
```

## See also

- [Setting page transitions](/docs/graphics-animation/page-transitions)
- [TransitioningContentControl](/controls/data-display/transitioningcontentcontrol)
- [ItemsControl](/controls/data-display/collections/itemscontrol)
- [ListBox](/controls/data-display/collections/listbox)
- [Carousel API reference](/api/avalonia/controls/carousel)
- [`Carousel.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Carousel.cs)
