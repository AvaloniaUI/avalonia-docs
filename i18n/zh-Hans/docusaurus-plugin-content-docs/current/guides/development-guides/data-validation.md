---
id: data-validation
title: 数据验证
---

# 数据验证

Avalonia 提供了不同的数据验证选项。在本节中，我们将向您展示如何验证您的 `ViewModel` 的**属性**，以及如何样式化显示的错误消息。

## 验证属性

Avalonia 使用 [`DataValidationPlugins`](http://reference.avaloniaui.net/api/Avalonia.Data.Core.Plugins/IDataValidationPlugin/) 来验证您绑定的**属性**。Avalonia 提供了以下三个内置的验证插件：

* [DataAnnotations - ValidationPlugin](data-validation.md#dataannotations---validationplugin)
* [INotifyDataErrorInfo - ValidationPlugin](data-validation.md#inotifydataerrorinfo---validationplugin)
* [Exception - ValidationPlugin](data-validation.md#exception---validationplugin)

### DataAnnotations - ValidationPlugin

您可以使用不同的 [`Validation-Attributes`](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.validationattribute) 来装饰您的 `ViewModel` 的**属性**。您可以使用内置的验证属性，使用 [`CustomValidationAttribute`](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.customvalidationattribute) 或者通过派生自 `ValidationAttribute` 来创建自己的验证属性。

**示例：属性 EMail 是必需的，并且必须是有效的电子邮件地址**

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

Avalonia 还支持实现 [`INotifyDataErrorInfo`](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.inotifydataerrorinfo) 接口的类的验证。一些 `MVVM`-库使用此接口进行数据验证，例如 [Microsoft.Toolkit.Mvvm](https://learn.microsoft.com/en-us/windows/communitytoolkit/mvvm/observablevalidator) 库和 [`ReactiveUI.Validation`](https://github.com/reactiveui/ReactiveUI.Validation#inotifydataerrorinfo-support) 库。有关使用说明，请参阅您选择的 `MVVM`-库的文档。

:::info
像 `Microsoft.Toolkit.Mvvm` 这样的库使用 `DataAnnotations` 进行验证。这可能会与 [DataAnnotations - ValidationPlugin](data-validation.md#dataannotations---validationplugin) 冲突。请参阅 [管理 ValidationPlugins](data-validation.md#manage-validationplugins) 来解决此问题。
:::

### Exception - ValidationPlugin

验证属性的另一种选项是在属性的 setter 中引发 [`Exception`](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/creating-and-throwing-exceptions)。

**示例：使用 `Exceptions` 验证属性 EMail**

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
不允许在属性的 getter 中使用异常，否则将导致应用程序崩溃。
:::

## 自定义验证消息的外观

为了显示验证消息，Avalonia 提供了一个名为 [`DataValidationErrors`](http://reference.avaloniaui.net/api/Avalonia.Controls/DataValidationErrors/) 的控件。这个控件通常放置在所有支持数据验证的 `Controls` 的 `ControlTemplate` 中，比如 `TextBox`、`Slider` 和其他控件。您可以创建自己的 `DataValidationErrors` 控件的样式来自定义错误消息的显示方式。

**DataValidationErrors 的示例样式**

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

**自定义验证样式**

## 管理 ValidationPlugins

如果需要，您可以在您的应用程序中启用或禁用特定的 `ValidationPlugin`。如果您的 MVVM 框架使用 `DataAnnotations` 来通过 `INotifyDataErrorInfo` 验证属性，那么您可能会看到两次验证消息。使用 `BindingPlugins.DataValidators` 集合来添加或移除特定的 `ValidationPlugin`。

**示例：移除 DataAnnotations 验证器**

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
