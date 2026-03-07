---
id: control-content
title: Control content
description: Learn how Avalonia UI displays different types of content in controls, and why custom objects need a DataTemplate.
doc-type: explanation
---

import ControlContentButtonScreenshot from '/img/concepts/data-concepts/data-templates/control-content/content-button.png';
import ControlContentStringScreenshot from '/img/concepts/data-concepts/data-templates/control-content/content-string.png';
import ControlContentTypeScreenshot from '/img/concepts/data-concepts/data-templates/control-content/content-type.png';

Avalonia UI controls that accept content, such as `Window`, `Button`, and `ContentControl`, can display a variety of objects. When you place a control or a simple string into the content zone, Avalonia already knows how to render it: controls draw themselves, and strings are rendered as text. This default behavior is sufficient for many scenarios, and you do not need to define a `DataTemplate` in those cases.

However, when you assign a custom object (for example, an instance of a class you have defined) as content, Avalonia has no built-in knowledge of how to present it visually. In that situation, it falls back to calling `.ToString()`, which typically shows only the fully-qualified class name. To control the visual representation of your custom objects, you need to provide a `DataTemplate`. The sections below walk you through this progression.

:::info
The concept of the zones of an Avalonia UI control is discussed in [Layout](/docs/layout/).
:::

## Displaying a control

You have probably seen what happens if you put a button control into the content zone of an Avalonia UI window. For example:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="MySample.MainWindow"
        Title="MySample">
  <Button HorizontalAlignment="Center">Hello World!</Button>
</Window>
```

The window displays the button, in this case centred both horizontally (specified) and vertically (by default). It looks like this:

<img src={ControlContentButtonScreenshot} alt="A window displaying a centred button with the text Hello World."/>

## Displaying a string

If you put a string into the window content zone, for example:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="MySample.MainWindow"
        Title="MySample">
  Hello World!
</Window>
```

The window displays the string:

<img src={ControlContentStringScreenshot} alt="A window displaying the text Hello World as a string."/>

## Displaying a custom object

What happens if you try to display an object from a class that you have defined? For example, consider this `Student` class:

```csharp
namespace MySample
{
    public class Student
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }
}
```

With the XML namespace `local` defined as the `MySample` namespace, you can place a `Student` object in the content zone of the window:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:local="using:MySample"
        x:Class="MySample.Views.MainWindow">
  <local:Student FirstName="Jane" LastName="Deer"/>
</Window>
```

However, you will see only the fully-qualified class name for the student object:

<img src={ControlContentTypeScreenshot} alt="A window displaying the fully-qualified class name MySample.Student instead of meaningful content."/>

This is not very helpful. It happens because Avalonia UI has no definition of how to display an object of class `Student`, and it is not a control, so it falls back to the `.ToString()` method and all you see is the fully-qualified class name. To solve this problem, you need to define a data template that tells Avalonia how to render your custom type.

## See also

- [Content templates](content-templates.md)
- [Data template collection](data-template-collection.md)
- [Introduction to data templates](introduction-to-data-templates.md)
