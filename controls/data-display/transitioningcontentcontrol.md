---
id: transitioningcontentcontrol
title: TransitioningContentControl
---

import TransitioningContentControlFadeScreenshot from '/img/controls/transitioningcontentcontrol/transitioningcontentcontrol-fade.webp';
import TransitioningContentControlSlideScreenshot from '/img/controls/transitioningcontentcontrol/transitioningcontentcontrol-slide.webp';

The `TransitioningContentControl` can use a page transition to animate a content change on an inner control.

You can use this control to display a collection of different images in a slideshow.

## Useful properties

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

## Available page transitions

You can use any of these built-in transitions:

| Transition | Description |
|---|---|
| `CrossFade` | Fades out old content while fading in new content. |
| `PageSlide` | Slides content in from a direction. Supports `Horizontal` and `Vertical` orientation. |
| `CompositePageTransition` | Combines multiple transitions. |

### CrossFade example

```xml
<TransitioningContentControl Content="{Binding CurrentView}">
    <TransitioningContentControl.PageTransition>
        <CrossFade Duration="0:0:0.3" />
    </TransitioningContentControl.PageTransition>
</TransitioningContentControl>
```

### Disabling the transition

Set `PageTransition` to null to switch content instantly:

```xml
<TransitioningContentControl Content="{Binding CurrentView}"
                             PageTransition="{x:Null}" />
```

## Common use: view switching

The `TransitioningContentControl` is commonly used with `DataTemplates` to animate between different views:

```xml
<TransitioningContentControl Content="{Binding CurrentPage}">
    <TransitioningContentControl.PageTransition>
        <PageSlide Duration="0:0:0.3" Orientation="Horizontal" />
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

## See also

- [TransitioningContentControl API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_TransitioningContentControl)
- [`TransitioningContentControl.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TransitioningContentControl.cs)
