---
description: CONCEPTS - Data Templates
---

import ContentTemplateStudentScreenshot from '/img/concepts/templates/contenttemplate-student.png';

# Content Template

The purpose of a data template is that it defines how _Avalonia UI_ should display an object created from a class that you have defined, and that is not a control, or a simple string.

Using a data template is a two-stage process:

1. Define the data template
2. Choose the data template for the content

One way to use a data template is to set the `ContentTemplate` property of a control directly. This works on a window (because like any control it inherits from `ContentControl`).

You can define a data template (for no particular class) using the `DataTemplate` tag, a composition of built-in controls, and some bindings. For example:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:local="using:MySample"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="MySample.MainWindow"
        Title="MySample">
  <Window.ContentTemplate>
    <DataTemplate>
      <StackPanel>
        <Grid ColumnDefinitions="Auto,Auto" RowDefinitions="Auto,Auto">
          <TextBlock Grid.Row="0" Grid.Column="0">First Name:</TextBlock>
          <TextBlock Grid.Row="0" Grid.Column="1" Text="{Binding FirstName}"/>
          <TextBlock Grid.Row="1" Grid.Column="0">Last Name:</TextBlock>
          <TextBlock Grid.Row="1" Grid.Column="1" Text="{Binding LastName}"/>
        </Grid>
      </StackPanel>
    </DataTemplate>
  </Window.ContentTemplate>
  
  <local:Student FirstName="Jane" LastName="Deer"/>
</Window>
```

In the above, the bindings refer to the properties of any class present in the content zone of the window. Here the window content is the same student object as you used before; but when you run this code, _Avalonia UI_ now displays:

<img src={ContentTemplateStudentScreenshot} alt=""/>

Using a data template in this way, you have both defined and chosen the data template for the content in the same place - by setting the `ContentTemplate` property of the window directly.

The code works correctly because the object in the window's content zone happens to have the properties specified in the bindings. As an exercise: introduce a binding for a property that does not exist on the student class. (Your app will still work, but it ignores the property it cannot find.)

On the next page, you will see how to define multiple data templates, and choose the correct template from the class of the object in the window's content zone.

