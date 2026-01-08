---
id: contentcontrol
title: ContentControl 内容控件
---

import ControlContentStudentScreenshot from '/img/reference/controls/contentcontrol/contentcontrol-student.png';

## 常用属性

| 属性      | 描述                   |
| --------- | ---------------------- |
| `Content` | 控件中显示的内容       |

## 参考文献

[ContentControl](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_ContentControl)

## 源代码

[ContentControl.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ContentControl.cs)

## 显示内容

最简单的情况下，内容控件显示分配给其 [`Content`](https://api-docs.avaloniaui.net/docs/P_Avalonia_Controls_ContentControl_Content) 属性的数据。

例如：

```xml
<ContentControl Content="Hello World!"/>
```

将显示字符串 "Hello World!"。`Content` 属性是控件的默认属性，因此上述示例也可以写为：

```xml
<ContentControl>Hello World!</ContentControl>
```

如果你将一个控件分配给内容控件，则它将显示该控件，例如：

```xml
<ContentControl>
  <Button>Click Me!</Button>
</ContentControl>
```

### 使用模板显示内容

到目前为止还算普通。内容控件在与数据绑定和数据模板结合使用时变得有用。通过设置 `ContentTemplate` 属性，可以指定 `Content` 属性中的数据如何显示。例如，给定以下视图模型：

```csharp
namespace Example
{
    public class MainWindowViewModel : ViewModelBase
    {
        object content = new Student("Jane", "Deer");

        public object Content
        {
            get => content;
            set => this.RaiseAndSetIfChanged(ref content, value);
        }
    }

    public class Student
    {
        public Student(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
        }

        public string FirstName { get; }
        public string LastName { get; }
    }
}
```

> 注意：以下示例假设 `MainWindowViewModel` 的一个实例被分配给窗口的 `DataContext`。有关更多信息，请参阅[关于 `DataContext`](/docs/basics/data/data-binding/data-context)的部分。

我们可以使用 `ContentTemplate` 属性在内容控件中显示学生的名和姓：

```xml
<Window xmlns="https://github.com/avaloniaui">
  <ContentControl Content="{Binding Content}">
    <ContentControl.ContentTemplate>
      <DataTemplate>
        <Grid ColumnDefinitions="Auto,Auto" RowDefinitions="Auto,Auto">
          <TextBlock Grid.Row="0" Grid.Column="0">First Name:</TextBlock>
          <TextBlock Grid.Row="0" Grid.Column="1" Text="{Binding FirstName}"/>
          <TextBlock Grid.Row="1" Grid.Column="0">Last Name:</TextBlock>
          <TextBlock Grid.Row="1" Grid.Column="1" Text="{Binding LastName}"/>
        </Grid>
      </DataTemplate>
    </ContentControl.ContentTemplate>
  </ContentControl>
</Window>
```

<img className="center" src={ControlContentStudentScreenshot} alt="学生的名和姓" />

有关更多信息，请查看[数据模板](/docs/basics/data/data-templates.md)部分。
