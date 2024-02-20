---
id: data-validation
title: Data Validation
---

# Data Validation

Avalonia offers different data validation options. In this section we will show you how you can validate the `Properties` of your `ViewModel` and how you can style the displayed error message.

## Validating a property

Avalonia uses [`DataValidationPlugins`](http://reference.avaloniaui.net/api/Avalonia.Data.Core.Plugins/IDataValidationPlugin/) to validate the `Properties` you bound to. Out of the box Avalonia provide these three validation plugins:

* [DataAnnotations - ValidationPlugin](data-validation.md#dataannotations---validationplugin)
* [INotifyDataErrorInfo - ValidationPlugin](data-validation.md#inotifydataerrorinfo---validationplugin)
* [Exception - ValidationPlugin](data-validation.md#exception---validationplugin)

### DataAnnotations - ValidationPlugin

You can decorate the `Properties` of your `ViewModel` with different [`Validation-Attributes`](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.validationattribute). You can use the build-in ones, use the [`CustomValidationAttribute`](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.customvalidationattribute) or create your own by derive from `ValidationAttribute`.

**Sample: The property EMail is required and must be a valid e-mail-address**

```cs
[Required]
[EmailAddress]
public string? EMail
{
    get { return _EMail; }
    set { this.RaiseAndSetIfChanged(ref _EMail, value); }
}
```

### INotifyDataErrorInfo - ValidationPlugin

Avalonia also supports validation of classes that implement [`INotifyDataErrorInfo`](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.inotifydataerrorinfo). Several `MVVM`-libraries are using this interface for their data validation, for example the [Microsoft.Toolkit.Mvvm](https://learn.microsoft.com/en-us/windows/communitytoolkit/mvvm/observablevalidator)-package and the [`ReactiveUI.Validation`](https://github.com/reactiveui/ReactiveUI.Validation#inotifydataerrorinfo-support)-package. For usage instructions please visit the documentation of the `MVVM`-package of your choice.

:::info
Some libraries like the `Microsoft.Toolkit.Mvvm` use `DataAnnotations` for their validation. This may result in conflicts with the [DataAnnotations - ValidationPlugin](data-validation.md#dataannotations---validationplugin). Please see [Manage ValidationPlugins](data-validation.md#manage-validationplugins) how to solve this issue.
:::

### Exception - ValidationPlugin

One more option to validate a property is to raise an [`Exception`](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/creating-and-throwing-exceptions) inside the setter of your property.

**Sample: Validate the property EMail using `Exceptions`**

```cs
public string? EMail
{
    get { return _EMail; }
    set 
    {
        if (string.IsNullOrEmpty(value))
        {
            throw new ArgumentNullException(nameof(EMail), "This field is required");
        }
        else if (!value.Contains('@'))
        {
            throw new ArgumentException(nameof(EMail), "Not a valid E-Mail-Address");
        }
        else
        { 
            this.RaiseAndSetIfChanged(ref _EMail, value); 
        } 
    }
}
```

:::danger
Exceptions inside the getter of your property are not allowed and will result in a crash of your application.
:::

## Customize the appearance of the validation message

To display the validation messages, Avalonia has a control called [`DataValidationErrors`](http://reference.avaloniaui.net/api/Avalonia.Controls/DataValidationErrors/). This control is typically placed inside the `ControlTemplate` of all `Controls` that supports data validation, like `TextBox`, `Slider` and other. You can create your own `Style` of the `DataValidationErrors`-control in order to customize the representation of the error messages.

**Example Style for DataValidationErrors**

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
    <DataTemplate>
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

<!-- ![custom validation style](broken-reference) -->

**Custom validation style**

## Manage ValidationPlugins

if needed to, you can enable or disable a specific `ValidationPlugin` in your App. This can be useful if for example your MVVM-framework uses `DataAnnotations` to validate the property via `INotifyDataErrorInfo`. In that case you would see the message twice. Use the `BindingPlugins.DataValidators`-collection to add or remove a specific `ValidationPlugin`.

**Example: Remove the DataAnnotations validator**

```cs
public override void OnFrameworkInitializationCompleted()
{
    // Get an array of plugins to remove
    var dataValidationPluginsToRemove =
        BindingPlugins.DataValidators.OfType<DataAnnotationsValidationPlugin>().ToArray();

    // remove each entry found
    foreach (var plugin in dataValidationPluginsToRemove)
    {
        BindingPlugins.DataValidators.Remove(plugin);
    }

    // Continue with normal startup
    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
    {
        desktop.MainWindow = new MainWindow()
        {
            DataContext = MainWindowViewModel.Instance
        };
    }

    base.OnFrameworkInitializationCompleted();
}
```
