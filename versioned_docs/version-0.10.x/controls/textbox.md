---
id: textbox
title: TextBox
---

The `TextBox` control is an editable text field where a user can input text.

## Reference <a id="reference"></a>

[TextBox](http://reference.avaloniaui.net/api/Avalonia.Controls/TextBox/)

## Source code <a id="source-code"></a>

[TextBox.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TextBox.cs)

## Examples <a id="examples"></a>

### Basic one line TextBox <a id="basic-one-line-textbox"></a>

```markup
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

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/textbox/textbox_basic.png"  />
  </div>


### Password input TextBox <a id="password-input-textbox"></a>

```markup
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

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/textbox/textbox_password.png"  />
  </div>


### TextBox with watermark <a id="textbox-with-watermark"></a>

Avalonia can show a "watermark" in a `TextBox`, which is a piece of text that is displayed when the `TextBox` is empty \(in HTML5 this is called a _placeholder_\)

```markup
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

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/textbox/textbox_watermark.png"  />
  </div>


### Multiline TextBox <a id="multiline-textbox"></a>

```markup
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

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/textbox/textbox_multiline.png"  />
  </div>

### TextInput Event Handling <a id="textinput-event-handling"></a>

By default the [TextInput](http://reference.avaloniaui.net/api/Avalonia.Input/InputElement/37F81F6F) event does nothing if you assign directly to it. This is due to the TextBox itself handling the event from the underlying InputElement.

If you wish to access the TextInput event, then you will have to use the TextBox.AddHandler method to intercept the event via event tunneling.

```csharp
MyTextInput.AddHandler(TextInputEvent, MyTextInput_InputHandler, RoutingStrategies.Tunnel);
```

To see more details about this behavior, read [routed events](../input/routed-events.md) documentation page.
