---
description: CONCEPTS - Data Templates
---

import DataTemplatesScopeScreenshot from '/img/concepts/templates/datatemplates-scope.png';

# Reusing Data Templates

If you define a data template in the `Window.DataTemplates` collection (as on the previous page), you can reuse it anywhere in the window. However, you can also extend the reuse of a data template to any window in your application.

This works because _Avalonia UI_ performs a hierarchical search of its logical tree to choose a data template. At its most extensive, the search starts in a control, extends to any parent controls (recursively), then looks in the window (as on the previous page), and finally looks at the application itself for a data templates collection.

:::info
From more information on the logical tree concept in _Avalonia UI_ , see [here](../ui-composition.md).
:::

Therefore if you want to reuse a template in any window of your application: define templates in the `Application.DataTemplates` collection, located in the app.axaml file.

To see how this works, first add another view model as follows:

```csharp
namespace MySample
{
    public class Teacher
    {
        public string Name { get; set; } = String.Empty;
        public string Subject { get; set; } = String.Empty;
    }
}
```

And in the app.axaml file, add a data template for the type `Teacher`:

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:vm="using:MySample"
             x:Class="MySample.App"
             RequestedThemeVariant="Light">
    <Application.Styles>
        <FluentTheme />
    </Application.Styles>

  <Application.DataTemplates>
    <DataTemplate DataType="{x:Type vm:Teacher}">
      <Grid ColumnDefinitions="Auto,Auto" RowDefinitions="Auto,Auto">
        <TextBlock Grid.Row="0" Grid.Column="0">Name:</TextBlock>
        <TextBlock Grid.Row="0" Grid.Column="1" Text="{Binding Name}"/>
        <TextBlock Grid.Row="1" Grid.Column="0">Subject:</TextBlock>
        <TextBlock Grid.Row="1" Grid.Column="1" Text="{Binding Subject}"/>
      </Grid>
    </DataTemplate>
  </Application.DataTemplates>
</Application>
```

Use a local definition of a teacher in the window content zone:

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
  
  <local:Teacher Name="Dr Jones" Subject="Maths"/>
</Window>
```

Although there is no data template for a teacher in the window; Avalonia UI will find the template you defined in the application, and the display works as planned:

<img src={DataTemplatesScopeScreenshot} alt=""/>

:::warning
Remember to specify a `DataType` in every data template, wherever it is defined, because if _Avalonia UI_ fails to find a data template match for your data; then nothing will be displayed!
:::

>
