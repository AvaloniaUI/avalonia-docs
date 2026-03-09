---
id: binding-validation
title: Validation in data binding
description: Validate bound data using DataAnnotations, INotifyDataErrorInfo, or exception-based approaches.
doc-type: how-to
---

Avalonia supports data validation through the standard .NET validation mechanisms. When a bound property fails validation, the control displays an error indicator and the validation message.

## Validation with data annotations

The simplest approach uses `System.ComponentModel.DataAnnotations` attributes on your view model properties. This works with CommunityToolkit.Mvvm's `ObservableValidator` base class:

```csharp
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

The `[NotifyDataErrorInfo]` attribute causes CommunityToolkit.Mvvm to validate the property when it changes and raise the appropriate `INotifyDataErrorInfo` events.

Bind the properties with `TwoWay` mode:

```xml
<StackPanel Spacing="8">
    <TextBox Text="{Binding Name}" PlaceholderText="Name" />
    <TextBox Text="{Binding Email}" PlaceholderText="Email" />
    <NumericUpDown Value="{Binding Age}" PlaceholderText="Age" />
</StackPanel>
```

When validation fails, the control displays a red border and the error message appears in a tooltip by default.

## INotifyDataErrorInfo

`INotifyDataErrorInfo` is the standard .NET interface for property-level validation. Avalonia automatically picks up validation errors from any view model that implements it:

```csharp
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

Create custom validation attributes for reusable validation logic:

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

Use it on your view model:

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

By default, Avalonia shows validation errors with:
- A red border around the control
- A tooltip containing the error message when hovering
- A red adorner in the control's corner

Validation errors are also automatically exposed to screen readers and other assistive technologies through the [`DataValidationErrors`](/api/avalonia/controls/datavalidationerrors) automation peer. See [Accessibility](/docs/app-development/accessibility#data-validation-errors) for details.

### Customizing error display

Use the `DataValidationErrors` control to customize how errors are shown. Restyle the `DataValidationErrors` template through a control theme:

```xml
<Style Selector="DataValidationErrors">
    <Setter Property="Template">
        <ControlTemplate>
            <DockPanel>
                <ContentControl DockPanel.Dock="Top"
                                ContentTemplate="{TemplateBinding ErrorTemplate}"
                                DataContext="{TemplateBinding Owner}"
                                Content="{Binding (DataValidationErrors.Errors)}"
                                IsVisible="{Binding (DataValidationErrors.HasErrors)}" />
                <ContentPresenter Name="PART_ContentPresenter"
                                  Background="{TemplateBinding Background}"
                                  BorderBrush="{TemplateBinding BorderBrush}"
                                  BorderThickness="{TemplateBinding BorderThickness}"
                                  Padding="{TemplateBinding Padding}"
                                  Content="{TemplateBinding Content}" />
            </DockPanel>
        </ControlTemplate>
    </Setter>
    <Setter Property="ErrorTemplate">
        <DataTemplate>
            <ItemsControl ItemsSource="{Binding}" Margin="0,0,0,4">
                <ItemsControl.ItemTemplate>
                    <DataTemplate>
                        <TextBlock Text="{Binding ErrorContent}"
                                   Foreground="Red" FontSize="12" />
                    </DataTemplate>
                </ItemsControl.ItemTemplate>
            </ItemsControl>
        </DataTemplate>
    </Setter>
</Style>
```

### Showing errors below the control

A common pattern places error messages below the input field instead of in a tooltip:

```xml
<Style Selector="DataValidationErrors">
    <Setter Property="ErrorTemplate">
        <DataTemplate>
            <TextBlock Foreground="#EF4444" FontSize="12" Margin="0,2,0,0">
                <TextBlock.Text>
                    <MultiBinding StringFormat="{}{0}">
                        <Binding Path="[0].ErrorContent" />
                    </MultiBinding>
                </TextBlock.Text>
            </TextBlock>
        </DataTemplate>
    </Setter>
</Style>
```

## Validating on submit

To validate the entire form when the user clicks a submit button:

```csharp
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

`ValidateAllProperties()` runs all validation attributes on all properties at once, which is useful for catching errors on fields the user has not yet interacted with.

## Exception-based validation

Avalonia also catches exceptions thrown during binding updates and displays them as validation errors. This can be useful for simple type conversion validation:

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

While this works, `INotifyDataErrorInfo` is the preferred approach because it supports multiple errors per property and async validation.

## See also

- [Data Binding Syntax](/docs/data-binding/data-binding-syntax): Binding modes and parameters.
- [INotifyPropertyChanged](/docs/data-binding/inotifypropertychanged): Change notification for view models.
- [The MVVM Pattern](/docs/fundamentals/the-mvvm-pattern): View model patterns and CommunityToolkit.Mvvm.
