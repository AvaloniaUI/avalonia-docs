---
description: CONCEPTS - Data Templates
---

# Taking More Control in Code

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
```

## More Examples

:::info
Have a look at some more advanced implementations of the `IDataTemplate` interface in the _Avalonia UI_ sample project [here](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/IDataTemplateSample).
:::
