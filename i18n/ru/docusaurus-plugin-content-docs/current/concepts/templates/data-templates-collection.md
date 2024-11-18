---
description: CONCEPTS - Data Templates
---

import DataTemplatesCollectionStudentScreenshot from '/img/concepts/templates/datatemplates-collection-student.png';

# Data Templates Collection

Every control in _Avalonia UI_ has a `DataTemplates` collection where you can place any number of data template definitions. You can then choose the template to use for display by class type. 

When a control does not have a data template set directly in its `ContentTemplate` property (as on the previous page); then it will choose a template from in its `DataTemplates` collection that matches the class of the object being displayed.  This applies to a window.

Data templates are matched by type: a match occurs when the class of the object being displayed is the same as the fully-qualified class name specified in the `DataType` property of a template.

So you can modify the previous sample to use the `DataTemplates` collection, as follows:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:local="using:MySample"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="MySample.MainWindow"
        Title="MySample">
  <Window.DataTemplates>
    <DataTemplate DataType="{x:Type local:Student}">
      <Grid ColumnDefinitions="Auto,Auto" RowDefinitions="Auto,Auto">
        <TextBlock Grid.Row="0" Grid.Column="0">First Name:</TextBlock>
        <TextBlock Grid.Row="0" Grid.Column="1" Text="{Binding FirstName}"/>
        <TextBlock Grid.Row="1" Grid.Column="0">Last Name:</TextBlock>
        <TextBlock Grid.Row="1" Grid.Column="1" Text="{Binding LastName}"/>
      </Grid>
    </DataTemplate>
  </Window.DataTemplates>
  
  <local:Student FirstName="Jane" LastName="Deer"/>
</Window>
```

This results in exactly the same display as on the previous page:

<img src={DataTemplatesCollectionStudentScreenshot} alt=""/>

