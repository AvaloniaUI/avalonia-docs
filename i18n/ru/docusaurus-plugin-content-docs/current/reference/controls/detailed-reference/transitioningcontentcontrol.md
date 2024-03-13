---
description: REFERENCE - Built-in Controls
---

import TransitioningContentControlFadeScreenshot from '/img/reference/controls/detailed-reference/transitioningcontentcontrol/transitioningcontentcontrol-fade.webp';
import TransitioningContentControlSlideScreenshot from '/img/reference/controls/detailed-reference/transitioningcontentcontrol/transitioningcontentcontrol-slide.webp';

# Transitioning Content Control

The transitioning content control can use a page transition to animate a content change on an inner control.

You can use this control to display a collection of different images in a slideshow.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="332">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Content</code></td><td>The content to display in the control.</td></tr><tr><td><code>TransitioningContentControl. ContentTemplate</code></td><td>A data template used to display the content.</td></tr><tr><td><code>TransitioningContentControl. PageTransition</code></td><td>The page transition to be used to animate the content changes. There will be a default page transition provided by the applied theme. To disable the transition, set this property to null.</td></tr></tbody></table>

## Example

In this example, the view model contains a collection of different images to show them in a slideshow. The following XAML will use the default page transition to change the image (in the data template) whenever the bound `SelectedImage` property changes:

```xml
<TransitioningContentControl Content="{Binding SelectedImage}" >
    <TransitioningContentControl.ContentTemplate>
        <DataTemplate DataType="Bitmap">
            <Image Source="{Binding}" />
        </DataTemplate>
    </TransitioningContentControl.ContentTemplate>
</TransitioningContentControl>
```

<img src={TransitioningContentControlFadeScreenshot} alt="" />

In this example, a different page transition has been specified to slide the images horizontally:

```xml
<TransitioningContentControl Content="{Binding SelectedImage}" >
    <TransitioningContentControl.PageTransition>
        <PageSlide Orientation="Horizontal" Duration="0:00:00.500" />
    </TransitioningContentControl.PageTransition>
    <TransitioningContentControl.ContentTemplate>
        <DataTemplate DataType="Bitmap">
            <Image Source="{Binding}"  />
        </DataTemplate>
    </TransitioningContentControl.ContentTemplate>
</TransitioningContentControl>
```

<img src={TransitioningContentControlSlideScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.ReactiveUI/TransitioningContentControl/).
:::

:::info
View the source code on _GitHub_ [`TransitioningContentControl.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TransitioningContentControl.cs)
:::
