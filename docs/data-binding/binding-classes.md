---
id: binding-classes
title: How to bind style classes
description: Bind style classes to boolean properties to conditionally apply styling to Avalonia controls.
doc-type: how-to
---

import BindStyleClassSampleScreenshot from '/img/guides/data/bind-style-class.png';

This guide shows you how to apply style classes to a control depending on the boolean value of a data binding.

To do this, you need classes defined in a `<Styles>` collection that target the control class you are using.

You can then conditionally apply the classes to a control using the special `Classes.` syntax and a data binding. The syntax looks like this:

```xml
<SomeControl Classes.myClass="{Binding IsMyClassActive}">
```

### Multiple class bindings

You can bind multiple classes to the same control. Each class binding operates independently, so you can combine them freely:

```xml
<TextBlock Classes.error="{Binding HasError}"
           Classes.highlight="{Binding IsHighlighted}"
           Classes.large="{Binding IsLarge}" />
```

### Negation operator

You can use the negation operator (`!`) in a binding expression to apply a class when a boolean property is `false`. This is useful when you want to toggle between two mutually exclusive classes without creating an additional view model property:

```xml
<TextBlock Classes.classA="{Binding IsOptionA}"
           Classes.classB="{Binding !IsOptionA}" />
```

In this example, `classA` is applied when `IsOptionA` is `true`, and `classB` is applied when `IsOptionA` is `false`.

## Example

In this example, two styles with class selectors have been defined. These give a `TextBlock` either a red or a green background. The `Classes.class1` binding assigns `class1` when the `IsClass1` property of an item is `true`. Using the negation operator, `class2` is assigned when `IsClass1` is `false`.

```xml
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
              Classes.class1="{Binding IsClass1}"
              Classes.class2="{Binding !IsClass1}"
              Text="{Binding Title}"/>
        </StackPanel>
      </DataTemplate>
    </ListBox.ItemTemplate>
  </ListBox>
</StackPanel>
```

```csharp title='MainWindowViewModel.cs'
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

    public ItemClass(string title, bool isClass1)
    {
        Title = title;
        IsClass1 = isClass1;
    }
}
```

<img src={BindStyleClassSampleScreenshot} alt="Sample app showing style classes toggled by data binding"/>

## See also

- [Styles](/docs/styling/styles)
- [Data binding syntax](/docs/data-binding/data-binding-syntax)
