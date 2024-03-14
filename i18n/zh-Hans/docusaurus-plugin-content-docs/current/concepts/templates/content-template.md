---
description: CONCEPTS - Data Templates
---

import ContentTemplateStudentScreenshot from '/img/concepts/templates/contenttemplate-student.png';

# 内容模板

数据模板的目的是定义 _Avalonia UI_ 如何显示您所定义的类创建的对象，该对象不是控件或简单的字符串。

使用数据模板是一个两步的过程：

1. 定义数据模板
2. 为内容选择数据模板

使用数据模板的一种方式是直接设置控件的 `ContentTemplate` 属性。这适用于窗口（因为窗口像任何控件一样继承自 `ContentControl`）。

您可以使用 `DataTemplate` 标签定义数据模板（针对任何特定的类），它是内置控件和一些绑定的组合。例如：

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

在上面的示例中，绑定引用了窗口内容区域中的任何类的属性。这里窗口的内容是与之前相同的学生对象，但是当您运行这段代码时，_Avalonia UI_ 现在会显示如下内容：

<img src={ContentTemplateStudentScreenshot} alt="图片"/>

以这种方式使用数据模板，您在同一个地方定义并选择了内容的数据模板 - 通过直接设置窗口的 `ContentTemplate` 属性。

代码能够正常工作是因为窗口内容区域的对象恰好具有绑定中指定的属性。作为练习：尝试对学生类中不存在的属性进行绑定（您的应用程序仍然可以正常工作，但会忽略找不到的属性）。

在下一页中，您将了解如何定义多个数据模板，并根据窗口内容区域对象的类选择正确的模板。

