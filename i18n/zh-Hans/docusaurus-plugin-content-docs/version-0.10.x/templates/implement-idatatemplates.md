---
id: implement-idatatemplates
title: Implementing IDataTemplate
---

If you need more control over your `DataTemplate` you can do this by creating a class which implements the `IDataTemplate`-interface. With this interface you can create your own `DataTemplate` not only respecting the `DataType` of your data, but also its properties or whatever you like. 

To use this interface you must implement the following two members in your class:
- `public bool Match(object data) { ... }` you need to check in this method if the provided data matches your `IDataTemplate` or not. You need to return true if the data matches, otherwise false.
- `public IControl Build(object param) { ... }` In this method you need to build and return the control which represents your data. 

## Samples

### Basic Example

Below is a very basic sample implementation of the `IDataTemplate`-interface:

```csharp
// remember to import the needed namespace
// using Avalonia.Controls.Templates;

public class MyDataTemplate : IDataTemplate
{
    public IControl Build(object param)
    {
        // build the control to display
        return new TextBlock() { Text = (string)param };
    }

    public bool Match(object data)
    {
        // Check if we can accept the provided data
        return data is string;
    }
}
```

You can now use the class `MyDataTemplate` in your view like this:

```markup
<!-- remember to add the needed prefix in your view -->
<!-- xmlns:dataTemplates="using:MyApp.DataTemplates" -->

<ContentControl Content="{Binding MyContent}">
	<ContentControl.ContentTemplate>
		<dataTemplates:MyDataTemplate />
	</ContentControl.ContentTemplate>
</ContentControl>
```


### Advanced Samples

[Implementing IDataTemplate](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/IDataTemplateSample)