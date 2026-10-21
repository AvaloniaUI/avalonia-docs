---
id: binding-validation
title: Validation in data binding
description: Validate bound data using DataAnnotations, INotifyDataErrorInfo, or exception-based approaches.
doc-type: how-to
---

Avalonia supports data validation through the standard .NET validation mechanisms. When a bound property fails validation, the control displays an error indicator and the validation message.

## Validation with data annotations

### Create the view model

The simplest approach uses `System.ComponentModel.DataAnnotations` attributes on your view model properties in combination with the `ObservableValidator` base class from `CommunityToolkit.Mvvm`. The below example demonstrates this approach with a `RegistrationViewModel` that validates user input on a registration form.

The `[NotifyDataErrorInfo]` attribute causes `CommunityToolkit.Mvvm` to validate the property when it changes and raise the appropriate `INotifyDataErrorInfo` events.

```csharp title="RegistrationViewModel.cs"
using System.ComponentModel.DataAnnotations;
using CommunityToolkit.Mvvm.ComponentModel;

public partial class RegistrationViewModel : ObservableValidator
{
    [ObservableProperty]
    [NotifyDataErrorInfo]
    [Required(ErrorMessage = "Name is required")]
    [MinLength(2, ErrorMessage = "Name must be at least 2 characters")]
    private string _name = "";

    [ObservableProperty]
    [NotifyDataErrorInfo]
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    private string _email = "";

    [ObservableProperty]
    [NotifyDataErrorInfo]
    [Range(18, 120, ErrorMessage = "Age must be between 18 and 120")]
    private int _age;
}
```

### Display the validation on the UI

Bind the properties with `TwoWay` mode on the relevant controls in XAML. If validation fails, the control shows its [validation error state](#validation-error-display).

```xml title="MainWindow.axaml"
<StackPanel Spacing="8">
    <TextBox Text="{Binding Name}" PlaceholderText="Name" />
    <TextBox Text="{Binding Email}" PlaceholderText="Email" />
    <NumericUpDown Value="{Binding Age}" PlaceholderText="Age" />
</StackPanel>
```

If you are using a specific view model for the data validation, such as `RegistrationViewModel` from the [previous section](#create-the-view-model), you must ensure it is set as the data context of the controls. Do this by declaring `x:DataType` and adding a `DataContext` in your XAML.

```xml title="MainWindow.axaml"
<StackPanel Spacing="8"
  // highlight-start
            x:DataType="vm:RegistrationViewModel">
  <StackPanel.DataContext>
    <vm:RegistrationViewModel />
  </StackPanel.DataContext>
  // highlight-end
  <TextBox Text="{Binding Name}" PlaceholderText="Name" />
  <TextBox Text="{Binding Email}" PlaceholderText="Email" />
  <NumericUpDown Value="{Binding Age}" Watermark="Age" />
</StackPanel>
```

## INotifyDataErrorInfo

`INotifyDataErrorInfo` is the standard .NET interface for property-level validation. Avalonia automatically picks up validation errors from any view model that implements it.

The below example demonstrates this method using a view model that validates login form input.

```csharp title="LoginViewModel.cs"
public class LoginViewModel : INotifyPropertyChanged, INotifyDataErrorInfo
{
    private string _username = "";
    private readonly Dictionary<string, List<string>> _errors = new();

    public string Username
    {
        get => _username;
        set
        {
            _username = value;
            ValidateUsername();
            OnPropertyChanged();
        }
    }

    private void ValidateUsername()
    {
        ClearErrors(nameof(Username));

        if (string.IsNullOrWhiteSpace(Username))
            AddError(nameof(Username), "Username is required");
        else if (Username.Length < 3)
            AddError(nameof(Username), "Username must be at least 3 characters");
    }

    // INotifyDataErrorInfo implementation
    public bool HasErrors => _errors.Count > 0;

    public event EventHandler<DataErrorsChangedEventArgs>? ErrorsChanged;

    public IEnumerable GetErrors(string? propertyName)
    {
        if (propertyName is not null && _errors.TryGetValue(propertyName, out var errors))
            return errors;
        return Array.Empty<string>();
    }

    private void AddError(string propertyName, string error)
    {
        if (!_errors.ContainsKey(propertyName))
            _errors[propertyName] = new List<string>();

        _errors[propertyName].Add(error);
        ErrorsChanged?.Invoke(this, new DataErrorsChangedEventArgs(propertyName));
    }

    private void ClearErrors(string propertyName)
    {
        if (_errors.Remove(propertyName))
            ErrorsChanged?.Invoke(this, new DataErrorsChangedEventArgs(propertyName));
    }

    // INotifyPropertyChanged...
    public event PropertyChangedEventHandler? PropertyChanged;
    protected void OnPropertyChanged([CallerMemberName] string? name = null)
        => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
}
```

## Custom validation attributes

### Create a custom attribute

You can create custom validation attributes. These can be reused for different validation operations throughout your app.

```csharp
public class NotEqualToAttribute : ValidationAttribute
{
    private readonly string _otherProperty;

    public NotEqualToAttribute(string otherProperty)
    {
        _otherProperty = otherProperty;
    }

    protected override ValidationResult? IsValid(
        object? value, ValidationContext context)
    {
        var otherValue = context.ObjectType
            .GetProperty(_otherProperty)?
            .GetValue(context.ObjectInstance);

        if (Equals(value, otherValue))
            return new ValidationResult(
                ErrorMessage ?? $"Must not equal {_otherProperty}");

        return ValidationResult.Success;
    }
}
```

### Use custom attribute in your view model

Set up a view model with the `ObservableValidator` base class [as demonstrated above](#create-the-view-model), but use your custom attribute as the validation attribute.

```csharp
[ObservableProperty]
[NotifyDataErrorInfo]
[Required]
private string _password = "";

[ObservableProperty]
[NotifyDataErrorInfo]
[Required]
[NotEqualTo(nameof(Password), ErrorMessage = "New password must differ from current")]
private string _newPassword = "";
```

## Validation error display

### Default behavior

Default validation error behavior depends on the application theme and the exact control.

The examples below use Fluent theme, where `TextBox` gets a colored border and an error message in the same color, and `NumericUpDown` gets an error message only. With Fluent theme, the default error colors are red in light mode, and yellow in dark mode.

Validation errors are automatically exposed to screen readers and other assistive technologies through the [`DataValidationErrors`](/api/avalonia/controls/datavalidationerrors) automation peer. See [Accessibility](/docs/app-development/accessibility#data-validation-errors) for details.

### Display tooltip errors in Fluent theme

Fluent theme ships with a `TooltipDataValidationErrors` setting. If you are using Fluent theme, but wish to display validation errors with an icon and tooltip, you can apply this setting in your application styles like shown below.

This validation error behavior is similar to the default in Simple theme.

```xml title="App.axaml"
<Application.Styles>
  <FluentTheme />

  <Style Selector="DataValidationErrors">
    <Setter Property="Theme"
            Value="{DynamicResource TooltipDataValidationErrors}" />
  </Style>
</Application.Styles>
```

### Customizing the error display

Use the `DataValidationErrors` control to customize how errors are shown. In your application styles, target `DataValidationErrors` with a `Style` to apply your desired changes to the template.

The below example shows a simple customization that displays the error text in blue instead of red or yellow.

```xml title="App.axaml"
<Application.Styles>
  <FluentTheme />

  <Style Selector="DataValidationErrors">
    <Setter Property="ErrorTemplate">
      <DataTemplate x:DataType="{x:Type x:Object}">
        <ItemsControl ItemsSource="{Binding}"
                      Foreground="Blue">
          <ItemsControl.Styles>
            <Style Selector="TextBlock">
              <Setter Property="TextWrapping" Value="Wrap" />
            </Style>
          </ItemsControl.Styles>
        </ItemsControl>
      </DataTemplate>
    </Setter>
  </Style>
</Application.Styles>
```

### Styling the `:error` pseudoclass

To make the `TextBox` borders blue so that they match the text, you must additionally style `TextBox` itself. This is necessary because the border is drawn by `TextBox` and not `DataValidationErrors`.

Target the `PART_BorderElement` element with your custom styling, a blue brush in this case. To ensure the styling only appears during an error state, use the `:error` [pseudoclass](/docs/styling/pseudoclasses).

The below example shows how to implement this styling when using Fluent theme.

```xml title="App.axaml"
<Application.Styles>
  <FluentTheme />

  <Style Selector="TextBox:error /template/ Border#PART_BorderElement">
    <Setter Property="BorderBrush" Value="Blue" />
  </Style>
</Application.Styles>
```

### Customizing the control template

For deeper customization, you can restyle the entire control template of `DataValidationErrors`. This example redesigns the control template so that no error message is displayed during validation errors.

```xml title="App.axaml"
<Application.Styles>
  <FluentTheme />

  <Style Selector="DataValidationErrors">
    <Setter Property="Template">
      <ControlTemplate>
        <ContentPresenter Name="PART_ContentPresenter"
                          Content="{TemplateBinding Content}"
                          ContentTemplate="{TemplateBinding ContentTemplate}" />
      </ControlTemplate>
    </Setter>
  </Style>
</Application.Styles>
```

## Validate all properties

`ValidateAllProperties()` runs all validation attributes on all properties at once. You can use this method to validate user input on an entire form, including fields the user has not yet interacted with.

```csharp title="RegistrationViewModel.cs"
using CommunityToolkit.Mvvm.Input;

public partial class RegistrationViewModel : ObservableValidator
{
    [RelayCommand(CanExecute = nameof(CanSubmit))]
    private void Submit()
    {
        ValidateAllProperties();

        if (HasErrors)
            return;

        // Proceed with submission
    }

    private bool CanSubmit() => !HasErrors;
}
```

## Exception-based validation

Avalonia also catches exceptions thrown during binding updates and displays them as validation errors. This can be useful for simple type conversion validation.

While this works, `INotifyDataErrorInfo` is the preferred approach because it supports multiple errors per property and async validation.

```csharp
private int _quantity;
public int Quantity
{
    get => _quantity;
    set
    {
        if (value < 0)
            throw new ArgumentException("Quantity cannot be negative");
        _quantity = value;
        OnPropertyChanged();
    }
}
```

## See also

- [Data Binding Syntax](/docs/data-binding/data-binding-syntax): Binding modes and parameters.
- [INotifyPropertyChanged](/docs/data-binding/inotifypropertychanged): Change notification for view models.
- [The MVVM Pattern](/docs/fundamentals/the-mvvm-pattern): View model patterns and CommunityToolkit.Mvvm.
