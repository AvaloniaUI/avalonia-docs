---
id: binding-classes
title: 如何绑定样式类
---

import BindStyleClassSampleScreenshot from '/img/guides/data-binding/bind-style-class.png';

# 如何绑定样式类

本指南将向您展示如何根据数据绑定的布尔值为控件应用样式类。

要做到这一点，您需要在一个 `<Styles>` 集合中定义一些针对您正在使用的控件类的类。

然后，您可以使用特殊的类语法和数据绑定有条件地将类应用于控件。语法如下：

```
<SomeControl Classes.class1="{Binding IsClass1Active}">
```

## 示例

在这个示例中，已经定义了两个带有类选择器的样式。这些样式为文本块提供了红色或绿色的背景。当项目的 `IsClass1` 属性为真时，样式类绑定将分配 `class1`。使用否定运算符，当 `IsClass1` 属性为假时，将分配 `class2`。

```xml title='XAML'
<StackPanel Margin="20">
  <ListBox ItemsSource="{Binding ItemList}">
    <ListBox.Styles>
      <Style Selector="TextBlock.class1">
        <Setter Property="Background" Value="OrangeRed" />
      </Style>
      <Style Selector="TextBlock.class2">
        <Setter Property="Background" Value="PaleGreen" />
      </Style>
    </ListBox.Styles>
    <ListBox.ItemTemplate>
      <DataTemplate>
        <StackPanel>
          <TextBlock
              Classes.class1="{Binding IsClass1 }"
              Classes.class2="{Binding !IsClass1 }"
              Text="{Binding Title}"/>
        </StackPanel>
      </DataTemplate>
    </ListBox.ItemTemplate>
  </ListBox>
</StackPanel>
```

```csharp title='C#'
public class MainWindowViewModel : ViewModelBase
{
    public ObservableCollection<ItemClass> ItemList { get; set; }

    public MainWindowViewModel()
    {
        ItemList = new ObservableCollection<ItemClass>(new List<ItemClass>
        {
            new ItemClass("Item 1", false),
            new ItemClass("Item Two", false),
            new ItemClass("Third Item", true),
            new ItemClass("Item #4", false),
               
        });
    }
}
```

```csharp title='ItemClass.cs'
public class ItemClass
{
    public string Title { get; set; }
    public bool IsClass1 { get; set; }

    public ItemClass(string title, bool isClass1 )
    {
        Title = title;
        IsClass1 = isClass1;
    }
}
```

<img src={BindStyleClassSampleScreenshot} alt=""/>
