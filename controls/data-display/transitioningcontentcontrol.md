---
id: transitioningcontentcontrol
title: TransitioningContentControl
description: A content control that animates transitions when its content changes, supporting cross-fades, slides, and composite page transitions.
doc-type: reference
---

import TransitioningContentControlFadeScreenshot from '/img/controls/transitioningcontentcontrol/transitioningcontentcontrol-fade.webp';
import TransitioningContentControlSlideScreenshot from '/img/controls/transitioningcontentcontrol/transitioningcontentcontrol-slide.webp';

The [`TransitioningContentControl`](/api/avalonia/controls/transitioningcontentcontrol) displays a single piece of content at a time and plays an animated page transition whenever that content changes. It extends [`ContentControl`](contentcontrol), so you can use it anywhere you would use a regular content control.

A common use case is building an image slideshow, but `TransitioningContentControl` is equally useful for switching between views in a navigation scenario.

## Common properties

You will probably use these properties most often:

| Property | Description |
|---|---|
| `Content` | The content to display in the control. |
| `ContentTemplate` | A `DataTemplate` used to display the content. |
| `PageTransition` | The page transition used to animate content changes. The applied theme provides a default transition. Set this property to `{x:Null}` to disable the transition entirely. |
| `IsTransitionReversed` | When set to `true`, the transition plays in reverse (for example, sliding out instead of sliding in). |

## Built-in page transitions

Avalonia ships with several page transitions you can apply to `TransitioningContentControl`:

| Transition | Description |
|---|---|
| `CrossFade` | Fades out the old content while fading in the new content simultaneously. |
| `PageSlide` | Slides content in from a given direction. Supports `Horizontal` and `Vertical` orientation. |
| `CompositePageTransition` | Combines multiple transitions so they run together. |

You can also create your own custom transition by implementing `IPageTransition`. See [Setting page transitions](../../docs/graphics-animation/page-transitions) for full details.

## Examples

### Default transition (cross-fade)

In this example, the view model contains a collection of images. The following XAML uses the default page transition to animate the image whenever the bound `SelectedImage` property changes:

```xml
<TransitioningContentControl Content="{Binding SelectedImage}">
    <TransitioningContentControl.ContentTemplate>
        <DataTemplate DataType="Bitmap">
            <Image Source="{Binding}" />
        </DataTemplate>
    </TransitioningContentControl.ContentTemplate>
</TransitioningContentControl>
```

<img src={TransitioningContentControlFadeScreenshot} alt="TransitioningContentControl with default cross-fade transition" />

### Horizontal slide transition

You can replace the default transition by setting `PageTransition`. Here a `PageSlide` slides images horizontally:

```xml
<TransitioningContentControl Content="{Binding SelectedImage}">
    <TransitioningContentControl.PageTransition>
        <PageSlide Orientation="Horizontal" Duration="0:00:00.500" />
    </TransitioningContentControl.PageTransition>
    <TransitioningContentControl.ContentTemplate>
        <DataTemplate DataType="Bitmap">
            <Image Source="{Binding}" />
        </DataTemplate>
    </TransitioningContentControl.ContentTemplate>
</TransitioningContentControl>
```

<img src={TransitioningContentControlSlideScreenshot} alt="TransitioningContentControl with horizontal page-slide transition" />

### Cross-fade with a custom duration

```xml
<TransitioningContentControl Content="{Binding CurrentView}">
    <TransitioningContentControl.PageTransition>
        <CrossFade Duration="0:00:00.300" />
    </TransitioningContentControl.PageTransition>
</TransitioningContentControl>
```

### Disabling the transition

Set `PageTransition` to null if you want content to switch instantly with no animation:

```xml
<TransitioningContentControl Content="{Binding CurrentView}"
                             PageTransition="{x:Null}" />
```

## View switching with data templates

`TransitioningContentControl` is commonly used to animate navigation between views. Bind `Content` to a view model property and provide a `DataTemplate` for each view model type. When the property changes, the control resolves the correct template and transitions to the new view automatically.

```xml
<TransitioningContentControl Content="{Binding CurrentPage}">
    <TransitioningContentControl.PageTransition>
        <PageSlide Duration="0:00:00.300" Orientation="Horizontal" />
    </TransitioningContentControl.PageTransition>
    <TransitioningContentControl.DataTemplates>
        <DataTemplate DataType="vm:HomeViewModel">
            <views:HomeView />
        </DataTemplate>
        <DataTemplate DataType="vm:SettingsViewModel">
            <views:SettingsView />
        </DataTemplate>
    </TransitioningContentControl.DataTemplates>
</TransitioningContentControl>
```

For a complete walkthrough, see [How to set up basic navigation](../../docs/how-to/navigation-how-to).

## See also

- [ContentControl](contentcontrol)
- [Setting page transitions](../../docs/graphics-animation/page-transitions)
- [How to set up basic navigation](../../docs/how-to/navigation-how-to)
- [Carousel](collections/carousel)
- [`TransitioningContentControl` API reference](https://reference.avaloniaui.net/api/Avalonia.ReactiveUI/TransitioningContentControl/)
- [`TransitioningContentControl` source code](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TransitioningContentControl.cs)
