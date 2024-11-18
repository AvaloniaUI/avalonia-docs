---
description: CONCEPTS - Data Templates
---

# Creating in Code

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

## More Examples

:::info
Have a look at some more advanced uses of the `FuncDataTemplate<T>`class in the _Avalonia UI_ sample project [here](https://github.com/AvaloniaUI/Avalonia.Samples/blob/main/src/Avalonia.Samples/DataTemplates/FuncDataTemplateSample).
:::
