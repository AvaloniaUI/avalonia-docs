---
id: binding-classes
title: How To Bind Style Classes
---

import BindStyleClassSampleScreenshot from '/img/guides/data-binding/bind-style-class.png';

# How To Bind Style Classes

This guide will show you how to apply style classes to a control depending on the Boolean value of a data binding.

To do this, you will need some classes defined in a `<Styles>` collection that target the control class you are using.

You can then conditionally apply the classes to a control using special classes syntax and a data binding. The syntax is like this:

```
<SomeControl Classes.class1="{Binding IsClass1Active}">
```

## Example

In this example, two styles with class selectors have been defined. These give a text block either a red or a green background. The style class binding assigns `class1` when the `IsClass1` property of an item is true. Using the negation operator, `class2` is assigned when the `IsClass1` property is false.

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
