---
id: control-content
title: Control content
description: Understand how controls display non-control content and why data templates are needed.
doc-type: explanation
---

import ControlContentButtonScreenshot from '/img/concepts/data-concepts/data-templates/control-content/content-button.png';
import ControlContentStringScreenshot from '/img/concepts/data-concepts/data-templates/control-content/content-string.png';
import ControlContentTypeScreenshot from '/img/concepts/data-concepts/data-templates/control-content/content-type.png';

You have probably seen what happens if you put a button control into the content zone of an _Avalonia UI_ window.

:::info
For more about the zones of an _Avalonia UI_ control, see [Layout](/docs/layout/).
:::

For example:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="MySample.MainWindow"
        Title="MySample">
  <Button HorizontalAlignment="Center" >Hello World!</Button>
</Window>
```

The window displays the button - in this case centred both horizontally (specified) and vertically (by default). It looks like this:

<img src={ControlContentButtonScreenshot} alt="Window displaying a centered Hello World button"/>

And if you put a string into the window content zone, for example:

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

The window will display the string:

<img src={ControlContentStringScreenshot} alt="Window displaying a Hello World string"/>

But what happens if you try to display an object from a class that you have defined in the window?

For example, using the class definition `Student`

```csharp
namespace MySample
{
    public class Student
    {
        public string FirstName { get; set;} = String.Empty;
        public string LastName { get; set;} = String.Empty;
    }
}
```

And the XML namespace `local` defined as the `MySample` namespace (from above), you can define a student object in the content zone of the window; as follows:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:local="using:MySample"
        x:Class="MySample.Views.MainWindow">
  <local:Student FirstName="Jane" LastName="Deer"/>
</Window>
```

But you will see only the fully-qualified class name for the student object:

<img src={ControlContentTypeScreenshot} alt="Window displaying the fully-qualified class name of a Student object"/>

This is not very helpful! It happens because _Avalonia UI_ has no definition of how to display an object of class `Student` - and it is not a control - so it falls back on the `.ToString()` method, and all you see is the fully-qualified class name.

## See also

- [Content Templates](content-templates): Using `ContentTemplate` to define how data is displayed.
- [Data Template Collection](data-template-collection): Defining multiple templates by type.
- [Introduction to Data Templates](introduction-to-data-templates): Overview of data templates in Avalonia.
