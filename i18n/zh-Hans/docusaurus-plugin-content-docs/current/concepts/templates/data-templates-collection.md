---
description: CONCEPTS - Data Templates
---

import DataTemplatesCollectionStudentScreenshot from '/img/concepts/templates/datatemplates-collection-student.png';

# 数据模板集合

_Avalonia UI_中的每个控件都有一个`DataTemplates`（数据模板）集合，您可以在其中放置任意数量的数据模板定义。然后，您可以根据类类型选择要用于显示的模板。 

当一个控件在其`ContentTemplate`属性中没有直接设置数据模板（如上一页所示）时，它将从其`DataTemplates`集合中选择一个与正在显示的对象的类匹配的模板。这适用于窗口。

数据模板是根据类型匹配的：当显示的对象的类与模板的`DataType`（数据类型）属性中指定的完全限定类名相同时，就会进行匹配。

因此，您可以修改前面的示例以使用`DataTemplates`集合，如下所示：

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
        <TextBlock Grid.Row="0" Grid.Column="0">姓:</TextBlock>
        <TextBlock Grid.Row="0" Grid.Column="1" Text="{Binding FirstName}"/>
        <TextBlock Grid.Row="1" Grid.Column="0">名:</TextBlock>
        <TextBlock Grid.Row="1" Grid.Column="1" Text="{Binding LastName}"/>
      </Grid>
    </DataTemplate>
  </Window.DataTemplates>
  
  <local:Student FirstName="Jane" LastName="Deer"/>
</Window>
```

这将得到与上一页完全相同的显示效果：

<img src={DataTemplatesCollectionStudentScreenshot} alt=""/>

