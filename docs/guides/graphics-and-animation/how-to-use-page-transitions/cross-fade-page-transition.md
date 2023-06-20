---
id: cross-fade-page-transition
title: Cross Fade Page Transition
---

# Cross Fade Page Transition

The cross fade page transition fades out the current page and fades in the new page by animating the opacity.

{% tabs %}
{% tab title="XAML" %}
```markup
<CrossFade Duration="0:00:00.500" />
```
{% endtab %}

{% tab title="C#" %}
```csharp
var transition = new CrossFade(TimeSpan.FromMilliseconds(500));
```
{% endtab %}
{% endtabs %}

## More Information

:::info
For the complete API documentation about this transition, see [here](http://reference.avaloniaui.net/api/Avalonia.Animation/PageSlide/).
:::

:::info
View the source code on _GitHub_ [`CrossFade.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Animation/CrossFade.cs)
:::
