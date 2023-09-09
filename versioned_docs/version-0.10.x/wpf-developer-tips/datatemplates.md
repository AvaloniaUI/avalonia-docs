---
info: datatemplates
title: DataTemplates
---

As styles aren't stored in `Resources`, neither are `DataTemplates`. Instead, `DataTemplates` are placed in a `DataTemplates` collection on each control \(and on `Application`\):

```markup
<UserControl xmlns:viewmodels="clr-namespace:MyApp.ViewModels;assembly=MyApp">
    <UserControl.DataTemplates>
        <DataTemplate DataType="viewmodels:FooViewModel">
            <Border Background="Red" CornerRadius="8">
                <TextBox Text="{Binding Name}"/>
            </Border>
        </DataTemplate>
    </UserControl.DataTemplates>
    <!-- Assuming that DataContext.Foo is an object of type
         MyApp.ViewModels.FooViewModel then a red border with a corner
         radius of 8 containing a TextBox will be displayed here -->
    <ContentControl Content="{Binding Foo}"/>
<UserControl>
```

Data templates in Avalonia can also target interfaces and derived classes \(which cannot be done in WPF\) and so the order of `DataTemplate`s can be important: `DataTemplate`s within the same collection are evaluated in declaration order so you need to place them from most-specific to least-specific as you would in code.

## DataTemplateSelector 

In WPF you can create a `DataTemplateSelector` to select or create a `DataTemplate` based on the provided data. In Avalonia you cannot do this, but you can implement `IDataTemplate` which can be seen as a good replacement for the `DataTemplateSelector`. Please find a sample [here](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/IDataTemplateSample).
