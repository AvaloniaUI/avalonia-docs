---
id: splitview
title: SplitView
---

import SplitViewScreenshot from '/img/controls/splitview/image (9).png';

Represents a container with two views; one view for the main content and another view that is typically used for navigation commands.

```xml
<SplitView IsPaneOpen="True"
           DisplayMode="Inline"
           OpenPaneLength="296">
    <SplitView.Pane>
        <TextBlock Text="Pane"
                   FontSize="24"
                   VerticalAlignment="Center"
                   HorizontalAlignment="Center"/>
    </SplitView.Pane>

    <Grid>
        <TextBlock Text="Content"
                   FontSize="24"
                   VerticalAlignment="Center"
                   HorizontalAlignment="Center"/>
    </Grid>
</SplitView>
```

<img className="center" src={SplitViewScreenshot} alt="" />

A split view's content area is always visible. The pane can expand and collapse or remain in an open state, and can present itself from either the left side or right side of an app window. The pane has four modes:

* **Overlay**

  The pane is hidden until opened. When open, the pane overlays the content area.

* **Inline**

  The pane is always visible and doesn't overlay the content area. The pane and content areas divide the available screen real estate.

* **CompactOverlay**

  A narrow portion of the pane is always visible in this mode, which is just wide enough to show icons. The default closed pane width is 48px, which can be modified with `CompactPaneLength`. If the pane is opened, it will overlay the content area.

* **CompactInline**

  A narrow portion of the pane is always visible in this mode, which is just wide enough to show icons. The default closed pane width is 48px, which can be modified with `CompactPaneLength`. If the pane is opened, it will reduce the space available for content, pushing the content out of its way.

## API Reference

[SplitView](http://reference.avaloniaui.net/api/Avalonia.Controls/SplitView/)

## Source code

[SplitView.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/SplitView.cs)
