---
description: CONCEPTS - Data Templates
---

import DataTemplatesScopeScreenshot from '/img/concepts/templates/datatemplates-scope.png';

# 重复使用数据模板

如果您在`Window.DataTemplates`集合中定义了数据模板（如前一页所示），则可以在窗口中的任何位置重用它。然而，您还可以扩展数据模板的重用范围，让其在应用程序的任何窗口中都可用。

这是因为_Avalonia UI_会在逻辑树中执行层次搜索来选择数据模板。最广泛的搜索从一个控件开始，然后扩展到任何父控件（递归），然后查找窗口（如前一页所示），最后查找应用程序本身的数据模板集合。

:::info
有关_Avalonia UI_中逻辑树概念的更多信息，请参阅[这里](../ui-composition.md)。
:::

因此，如果您想要在应用程序的任何窗口中重用模板：请在`app.axaml`文件中定义模板并放入`Application.DataTemplates`集合中。

为了演示这一点，首先添加另一个视图模型，如下所示：

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

然后在`app.axaml`文件中添加一个`Teacher`类型的数据模板：

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

然后在窗口的内容区域使用一个`Teacher`的本地定义：

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

尽管窗口中没有`Teacher`的数据模板，Avalonia UI 会找到您在应用程序中定义的模板，并且显示效果如预期：

<img src={DataTemplatesScopeScreenshot} alt="Teacher Display"/>

:::warning
请确保在每个数据模板中指定`DataType`，无论它在哪里定义，因为如果_Avalonia UI_无法找到匹配您数据的数据模板，则什么都不会显示！
:::

>
