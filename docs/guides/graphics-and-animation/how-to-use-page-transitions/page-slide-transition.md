---
id: page-slide-transition
title: Page Slide Transition
---

# Page Slide Transition

The page slide transition moves the old page out of view, and the new page into view, for the given duration. You can specify the slide direction using the orientation property (default horizontal).

{% tabs %}
{% tab title="XAML" %}
```markup
<PageSlide Duration="0:00:00.500" Orientation="Vertical" />
```
{% endtab %}

{% tab title="C#" %}
```csharp
var transition = new PageSlide(TimeSpan.FromMilliseconds(500), 
                                PageSlide.SlideAxis.Vertical);
```
{% endtab %}
{% endtabs %}

## More Information

{% hint style="info" %}
For the complete API documentation about this transition, see [here](http://reference.avaloniaui.net/api/Avalonia.Animation/PageSlide/).
{% endhint %}

{% hint style="info" %}
View the source code on _GitHub_ [`PageSlide.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Animation/PageSlide.cs)
{% endhint %}
