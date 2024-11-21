---
id: textbox
title: TextBox
---

import TextBoxSingleLineScreenshot from '/img/controls/textbox/textbox_basic.png';
import TextBoxPasswordScreenshot from '/img/controls/textbox/textbox_password.png';
import TextBoxWatermarkScreenshot from '/img/controls/textbox/textbox_watermark.png';
import TextBoxMultilineScreenshot from '/img/controls/textbox/textbox_multiline.png';

The `TextBox` control is an editable text field where a user can input text.

## Reference

[TextBox](http://reference.avaloniaui.net/api/Avalonia.Controls/TextBox/)

## Source code

[TextBox.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TextBox.cs)

## Examples

### Basic one line TextBox

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="AvaloniaAppTemplate">
    <StackPanel Margin="10">
        <TextBox />
    </StackPanel>
</Window>
```

produces the following output in **Windows 10**

<img className="center" src={TextBoxSingleLineScreenshot} alt="" />

### Password input TextBox

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="AvaloniaAppTemplate">
    <StackPanel Margin="10">
        <TextBox PasswordChar="#" />
    </StackPanel>
</Window>
```

produces the following output in **Windows 10** when text is input

<img className="center" src={TextBoxPasswordScreenshot} alt="" />

When using the Fluent theme, you can apply the style class, `revealPasswordButton`, and the TextBox will provide an eye 👁 glyph for the user to show the plane text temporally. Please note, the `TextBox` may be written to but not copied from.

```xml
<TextBox Classes="revealPasswordButton" PasswordChar="•" />
```

### TextBox with watermark

Avalonia can show a "watermark" in a `TextBox`, which is a piece of text that is displayed when the `TextBox` is empty \(in HTML5 this is called a _placeholder_\)

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="AvaloniaAppTemplate">
    <StackPanel Margin="10">
        <TextBox Watermark="Street address" />
    </StackPanel>
</Window>
```

produces the following output in **Windows 10**

<img className="center" src={TextBoxWatermarkScreenshot} alt="" />

### Multiline TextBox

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaAppTemplate.MainWindow"
        Title="AvaloniaAppTemplate">
    <Grid Margin="10">
        <TextBox AcceptsReturn="True" TextWrapping="Wrap" />
    </Grid>
</Window>
```

produces the following output in **Windows 10** when text is input

<img className="center" src={TextBoxMultilineScreenshot} alt="" />

### TextInput Event Handling

By default the [TextInput](http://reference.avaloniaui.net/api/Avalonia.Input/InputElement/37F81F6F) event does nothing if you assign directly to it. This is due to the TextBox itself handling the event from the underlying InputElement.

If you wish to access the TextInput event, then you will have to use the TextBox.AddHandler method to intercept the event via event tunneling.

```csharp
MyTextInput.AddHandler(TextInputEvent, MyTextInput_InputHandler, RoutingStrategies.Tunnel);
```

To see more details about this behavior, read [routed events](../input/routed-events.md) documentation page.
