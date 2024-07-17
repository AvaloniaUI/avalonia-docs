---
description: CONCEPTS
---

# Inline Styles and Templates

Avalonia provides [Style](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Styling/Style.cs) objects and template objects as a way to define the visual appearance of an element in resources, so that they can be used multiple times. For this reason, attributes in XAML that take the types [Style](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Styling/Style.cs) and [ITemplate](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Styling/ITemplate.cs) almost always make resource references to existing styles and templates rather than define new ones inline.

## Limitations of Inline Styles and Templates

In XAML, style and template properties can technically be set in one of two ways. You can use attribute syntax to reference a style that was defined within a resource, for example:

```<object Styles="{StaticResourcemyResourceKey}" .../>```. 

Or you can use property element syntax to define a style inline, for instance:

```<``` *object* ```>```

```<``` *object* ```.Styles>```

```<Style ...>```

```</``` *object* ```.Styles>```

```</``` *object* ```>```

The attribute usage is much more common. A style that is defined inline and not defined in resources is necessarily scoped to the containing element only, and cannot be re-used as easily because it has no resource key. In general a resource-defined style is more versatile and useful, and is more in keeping with the general Avalonia programming model principle of separating program logic in code from design in markup.

Usually there is no reason to set a style or template inline, even if you only intend to use that style or template in that location. Most elements that can take a style or template also support a content property and a content model. If you are only using whatever logical tree you create through styling or templating once, it would be even easier to just fill that content property with the equivalent child elements in direct markup. This would bypass the style and template mechanisms altogether.

Other syntaxes enabled by markup extensions that return an object are also possible for styles and templates. Two such extensions that have possible scenarios include [TemplateBinding](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Data/TemplateBinding.cs) and [Binding](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Markup/Avalonia.Markup/Data/Binding.cs).

