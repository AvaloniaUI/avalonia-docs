---
id: data-validation
title: Data validation
description: Validate user input in Avalonia using DataAnnotationsValidationPlugin.
doc-type: overview
---

This page explains how to use Avalonia to validate data input by users.

## Data annotations validation plugin

Avalonia's `DataAnnotationsValidationPlugin` allows you to validate any [`Validation-Attributes`](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.validationattribute) associated with the `Properties` of your `ViewModel`.

You can validate built-in validation attributes, [`CustomValidationAttribute`](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.customvalidationattribute), or your own attributes derived from `ValidationAttribute`.

### Enable `DataAnnotationsValidationPlugin`

Since Avalonia v12, the data annotations validation plugin is disabled by default. To enable the plugin:

1. Go to the `Program.cs` file of your project.
2. Within the `AppBuilder`, add this line:

```csharp
.WithDataAnnotationsValidation()
```

If you are migrating an earlier project that manually specified the removal of the data annotations validation plugin with `BindingPlugins.DataValidators.Remove(plugin);`, you can now delete this configuration from your initialization completion method. It is no longer needed.

### Example: The property `EMail` is required and must be a valid e-mail-address

:::note
`RaiseAndSetIfChanged` is a ReactiveUI method. This example requires ReactiveUI to work.
:::

```csharp
[Required]
[EmailAddress]
public string? EMail
{
    get { return _EMail; }
    set { this.RaiseAndSetIfChanged(ref _EMail, value); }
}
```

## Customize the appearance of the validation message

The [`DataValidationErrors class`](/api/avalonia/controls/datavalidationerrors) is used to display validation error messages. It can be placed as a control inside the `ControlTemplate` of any control that supports data validation, such as a `TextBox`.

Set a `Style` in your .axaml file to customize the appearance of the error message.

### Example: Custom data validation error message

```xml
<Style Selector="DataValidationErrors">
  <Setter Property="Template">
    <ControlTemplate>
      <DockPanel LastChildFill="True">
        <ContentControl DockPanel.Dock="Right"
                        ContentTemplate="{TemplateBinding ErrorTemplate}"
                        DataContext="{TemplateBinding Owner}"
                        Content="{Binding (DataValidationErrors.Errors)}"
                        IsVisible="{Binding (DataValidationErrors.HasErrors)}"/>
        <ContentPresenter Name="PART_ContentPresenter"
                          Background="{TemplateBinding Background}"
                          BorderBrush="{TemplateBinding BorderBrush}"
                          BorderThickness="{TemplateBinding BorderThickness}"
                          CornerRadius="{TemplateBinding CornerRadius}"
                          ContentTemplate="{TemplateBinding ContentTemplate}"
                          Content="{TemplateBinding Content}"
                          Padding="{TemplateBinding Padding}"/>
      </DockPanel>
    </ControlTemplate>
  </Setter>
  <Setter Property="ErrorTemplate">
    <DataTemplate x:DataType="{x:Type x:Object}">
      <Canvas Width="14" Height="14" Margin="4 0 1 0" 
              Background="Transparent">
        <Canvas.Styles>
          <Style Selector="ToolTip">
            <Setter Property="Background" Value="LightRed"/>
            <Setter Property="BorderBrush" Value="Red"/>
          </Style>
        </Canvas.Styles>
        <ToolTip.Tip>
          <ItemsControl ItemsSource="{Binding}"/>
        </ToolTip.Tip>
        <Path Data="M14,7 A7,7 0 0,0 0,7 M0,7 A7,7 0 1,0 14,7 M7,3l0,5 M7,9l0,2" 
              Stroke="Red" 
              StrokeThickness="2"/>
      </Canvas>
    </DataTemplate>
  </Setter>
</Style>
```

## See also

- [Data Binding](/docs/data-binding/introduction-to-data-binding): Binding data to controls.
- [Community Toolkit MVVM](https://learn.microsoft.com/en-us/windows/communitytoolkit/mvvm/observablevalidator): Using `ObservableValidator` for validation.
