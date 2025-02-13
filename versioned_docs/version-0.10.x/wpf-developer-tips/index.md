---
info: index
title: WPF Developer Tips
---

Avalonia is in general very similar to WPF, but you will find differences. Here are the most common:

* [Styling](styling)
* [DataTemplates](datatemplates)
* [HierachicalDataTemplate.md](hierachicaldatatemplate)
* [UIElement, FrameworkElement and Control
](uielement-frameworkelement-and-control)
* [DependencyProperty](dependencyproperty)
* [Grid](grid)
* [ItemsControl](itemscontrol)
* [Tunnelling Events](tunnelling-events)
* [Class Handlers](class-handlers)
* [PropertyChangedCallback](propertychangedcallback)
* [RenderTransforms & RenderTransformorigin](rendertransforms-and-rendertransformorigin)


# Dispatcher changes

If you use `Application.Current.Dispatcher`, you should use `Dispatcher.UIThread` instead which provide similar facilities.

**WPF**
```csharp
Application.Current.Dispatcher.InvokeAsync(handler, DispatcherPriority.Background);
```

**Avalonia**
```csharp
Dispatcher.UIThread.InvokeAsync(handler, DispatcherPriority.Background);
```

If you previously access dispatcher on the control itself, you should use global static instance `Dispatcher.UIThread` too.

**WPF**
```csharp
this.Dispatcher.InvokeAsync(handler, DispatcherPriority.Background);
```

**Avalonia**
```csharp
Dispatcher.UIThread.InvokeAsync(handler, DispatcherPriority.Background);
```

In more details, it's explained in the [Accessing the UI thread](../guides/basics/accessing-the-ui-thread.md) article.

# Visibility of elements

WPF has uses `Visibility` property which can be `Collapsed`, `Hidden` or `Visible`. Avalonia uses simpler and more intuitive model `bool IsVisible`.

# Binding

**WPF**
```xml
<TextBox Name="MyTextbox" Text="{Binding ElementName=searchTextBox, Path=Text}"" />
```

**Avalonia**
```xml
<TextBox Name="MyTextbox" Text="{Binding #searchTextBox.Text}" />
```

# Handling attachment to visual tree

There no events like `Loaded`/`Unloaded` in Avalonia, but you can override `OnAttachedToVisualTree`/`OnDetachedFromVisualTree` on the control, to know when control attached to virtual tree, or detatched from it. Alternatively you can use `TemplateApplied` instead of `Loaded` event.

**WPF**
```csharp
Unloaded += OnControl_Unloaded;
Loaded += OnControl_Loaded;

private void OnControl_Loaded(object sender, RoutedEventArgs e)
{
    // Handle control loaded event.
}

private void OnControl_Unloaded(object sender, RoutedEventArgs e)
{
    // Handle control unload event.
}
```

**Avalonia**
```csharp
TemplateApplied += OnControl_Loaded;
private void OnControl_Loaded(object sender, RoutedEventArgs e)
{

}
// or
protected override void OnAttachedToVisualTree(VisualTreeAttachmentEventArgs e)
{
    // Handle control loaded event.
}

// Use this instead of Unloaded event.
protected override void OnDetachedFromVisualTree(VisualTreeAttachmentEventArgs e)
{
    // Handle control unload event.
}
```
That mean that you cannot subscribe to tree attachment/detachment events for other controls.


# Tooltips

Avalonia controls does not have `ToolTip` property like WPF. Instead you should use `ToolTip.Tip`

**WPF**
```csharp
<Button ToolTip="Save file as..." />
```

**Avalonia**
```csharp
<Button ToolTip.Tip="Save file as..." />
```

# TextRun decorations

**WPF**
```csharp
TextRunProperties.SetTextDecorations(TextDecorations.Underline);
```

**Avalonia**
```csharp
TextRunProperties.Underline = true;
```
