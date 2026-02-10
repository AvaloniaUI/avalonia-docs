---
id: creating-data-templates-in-code
title: Creating data templates in code
---

## `FuncDataTemplate`

_Avalonia UI_ supports creating a data template in code. You can do this by using the `FuncDataTemplate<T>` class that supports the `IDataTemplate` interface.

At its simplest you can create a data template by passing a lambda function that creates a control to the `FuncDataTemplate<T>` constructor, like this:

```csharp
var template = new FuncDataTemplate<Student>((value, namescope) =>
    new TextBlock
    {
        [!TextBlock.TextProperty] = new Binding("FirstName"),
    });
```

Which is equivalent to the XAML:

```xml
<DataTemplate DataType="{x:Type local:Student}">
    <TextBlock Text="{Binding FirstName}"/>
</DataTemplate>
```

## Taking more control in code

If you need take more control over a data template in code, you can write a class that implements the `IDataTemplate` interface yourself. This will allow you to present the properties of your bound data type in whatever way you require.

To use the `IDataTemplate`interface you must implement the following two members in your data template class:

* `public bool Match(object data) { ... }` - implement this member to check whether the provided bound data matches your `IDataTemplate` or not. Return true if the bound data type matches, otherwise false.
* `public Control Build(object param) { ... }` - implement this member to build and return the control that will present your data.

## Example

This is a simple implementation of the `IDataTemplate` interface to display some string data in a text block:

```csharp
using Avalonia.Controls.Templates;
...
public class MyDataTemplate : IDataTemplate
{
    public Control Build(object param)
    {
        return new TextBlock() { Text = (string)param };
    }

    public bool Match(object data)
    {
        return data is string;
    }
}
```

You can now use the class `MyDataTemplate` in your view, like this:

```xml
<!-- xmlns:dataTemplates="using:MyApp.DataTemplates" -->

<ContentControl Content="{Binding MyContent}">
	<ContentControl.ContentTemplate>
		<dataTemplates:MyDataTemplate />
	</ContentControl.ContentTemplate>
</ContentControl>

## More examples

[Advanced uses of the `FuncDataTemplate<T>`class](https://github.com/AvaloniaUI/Avalonia.Samples/blob/main/src/Avalonia.Samples/DataTemplates/FuncDataTemplateSample).

[Advanced implementations of the `IDataTemplate` interface](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/IDataTemplateSample).
