---
id: defining-properties
title: Defining Properties
---

import DefiningPropertyPreviewScreenshot from '/img/guides/custom-controls/defining-property-preview.png';

# Styled Property

If you are creating a custom control, you will usually want it to have properties that can be set by the _Avalonia UI_ styling system.

:::info
For more information about how to use styles in _Avalonia UI_, see the guide [here](../../basics/user-interface/styling).
:::

On this page, you will see how to implement a property so that it can be changed by the _Avalonia UI_ styling system. This is a two step process:

* Register a styled property.
* Provide the getter/setter for the property.

### Register a Styled Property

You register a styled property by defining a `public static read-only` field of type `StyledProperty<T>` and set it's value using the `AvaloniaProperty.Register` method.

:::warning
The name of this static field **MUST** be the same name as the public attribute, followed by "`Property`" at the end.
Failure to follow this naming convention may result in "*Unable to find suitable setter or adder for property*" errors during compilation.
:::

### Styled Property Register Example

```csharp
public static readonly StyledProperty<string> ExampleProperty =
    AvaloniaProperty.Register<MyCustomControl, string>(nameof(Example), "Default value here");

public string Example
{
    get => GetValue(ExampleProperty);
    set => SetValue(ExampleProperty, value);
}
```

:::info
Note that the getter/setter of the public property uses the special Avalonia UI `GetValue` and `SetValue` methods and should not be changed to something else nor do any extra work inside of the get/set.
:::

Then, _Avalonia UI_ will look for an attribute in the XAML, like this:

```xml
<MyCustomControl Example="value" ... >
```

### Styled property in a custom control example

With a styled property in place, you can control the background color of the custom control from the window styles collection:

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:cc="using:AvaloniaCCExample.CustomControls"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaCCExample.MainWindow"
        Title="Avalonia Custom Control">

  <Window.Styles>
    <Style Selector="cc|MyCustomControl">
      <Setter Property="Background" Value="Yellow"/>
    </Style>
  </Window.Styles>

  <cc:MyCustomControl Height="200" Width="300"/>

</Window>
```

```csharp title='MyCustomControl.cs'
using Avalonia;
using Avalonia.Controls;
using Avalonia.Media;

namespace AvaloniaCCExample.CustomControls
{
    public class MyCustomControl : Control
    {
        public static readonly StyledProperty<IBrush?> BackgroundProperty =
            Border.BackgroundProperty.AddOwner<MyCustomControl>();

        public IBrush? Background
        {
            get { return GetValue(BackgroundProperty); }
            set { SetValue(BackgroundProperty, value); }
        }

        public sealed override void Render(DrawingContext context)
        {
            if (Background != null)
            {
                var renderSize = Bounds.Size;
                context.FillRectangle(Background, new Rect(renderSize));
            }
            base.Render(context);
        }
    }
}
```

The styled property will work both at run-time and in the preview panel.

<img src={DefiningPropertyPreviewScreenshot} alt=''/>

:::info
For more advanced information about how to create a custom control, see [here](../custom-controls/how-to-create-advanced-custom-controls.md).
:::
