---
id: combobox-how-to
title: "How to: Work with ComboBox"
---

This guide covers common ComboBox scenarios: binding to collections, custom templates, editable combo boxes, and enum binding.

## Basic Binding

Bind a ComboBox to a collection and track the selected item:

```xml
<ComboBox ItemsSource="{Binding Countries}"
          SelectedItem="{Binding SelectedCountry}"
          PlaceholderText="Select a country" />
```

```csharp
public partial class MainViewModel : ObservableObject
{
    public ObservableCollection<string> Countries { get; } = new()
    {
        "United States", "United Kingdom", "Germany", "Japan", "Australia"
    };

    [ObservableProperty]
    private string? _selectedCountry;
}
```

## Custom Item Template

Display complex objects with a custom template:

```xml
<ComboBox ItemsSource="{Binding Users}"
          SelectedItem="{Binding SelectedUser}"
          PlaceholderText="Select a user">
    <ComboBox.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Spacing="8">
                <Border Width="24" Height="24" CornerRadius="12"
                        Background="#6366F1">
                    <TextBlock Text="{Binding Initials}" Foreground="White"
                               HorizontalAlignment="Center"
                               VerticalAlignment="Center" FontSize="10" />
                </Border>
                <StackPanel>
                    <TextBlock Text="{Binding Name}" />
                    <TextBlock Text="{Binding Role}" FontSize="11" Foreground="Gray" />
                </StackPanel>
            </StackPanel>
        </DataTemplate>
    </ComboBox.ItemTemplate>
</ComboBox>
```

## Binding to an Enum

Display all values of an enum in a ComboBox:

```csharp
public enum Priority { Low, Normal, High, Critical }

public partial class TaskViewModel : ObservableObject
{
    public Priority[] PriorityOptions { get; } = Enum.GetValues<Priority>();

    [ObservableProperty]
    private Priority _selectedPriority = Priority.Normal;
}
```

```xml
<ComboBox ItemsSource="{Binding PriorityOptions}"
          SelectedItem="{Binding SelectedPriority}" />
```

### With display names

If you want human-readable labels instead of enum names:

```csharp
public record PriorityOption(Priority Value, string Label);

public PriorityOption[] PriorityOptions { get; } = new[]
{
    new PriorityOption(Priority.Low, "Low Priority"),
    new PriorityOption(Priority.Normal, "Normal"),
    new PriorityOption(Priority.High, "High Priority"),
    new PriorityOption(Priority.Critical, "Critical!"),
};

[ObservableProperty]
private PriorityOption _selectedPriority;
```

```xml
<ComboBox ItemsSource="{Binding PriorityOptions}"
          SelectedItem="{Binding SelectedPriority}">
    <ComboBox.ItemTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Label}" />
        </DataTemplate>
    </ComboBox.ItemTemplate>
</ComboBox>
```

## Binding to SelectedValue

When you need just a property of the selected item rather than the whole object:

```xml
<ComboBox ItemsSource="{Binding Countries}"
          SelectedValueBinding="{Binding Code}"
          SelectedValue="{Binding SelectedCountryCode}">
    <ComboBox.ItemTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Name}" />
        </DataTemplate>
    </ComboBox.ItemTemplate>
</ComboBox>
```

## Static Items in XAML

For a small fixed set of options, define items directly:

```xml
<ComboBox SelectedIndex="0">
    <ComboBoxItem Content="Small" />
    <ComboBoxItem Content="Medium" />
    <ComboBoxItem Content="Large" />
</ComboBox>
```

## Editable ComboBox (AutoCompleteBox)

Avalonia's `ComboBox` does not have a built-in editable mode like WPF. For type-to-search functionality, use `AutoCompleteBox`:

```xml
<AutoCompleteBox ItemsSource="{Binding AllCities}"
                 Text="{Binding SearchText}"
                 PlaceholderText="Search for a city..."
                 FilterMode="Contains"
                 MinimumPrefixLength="1" />
```

`AutoCompleteBox` filters the list as the user types and supports custom filtering:

```xml
<AutoCompleteBox ItemsSource="{Binding Users}"
                 FilterMode="Custom"
                 TextFilter="{Binding UserFilter}"
                 PlaceholderText="Search users...">
    <AutoCompleteBox.ItemTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Name}" />
        </DataTemplate>
    </AutoCompleteBox.ItemTemplate>
</AutoCompleteBox>
```

## Styling

### Custom dropdown width

```xml
<Style Selector="ComboBox /template/ Popup">
    <Setter Property="MinWidth" Value="300" />
</Style>
```

### Custom placeholder style

```xml
<Style Selector="ComboBox:not(:selected) /template/ ContentControl#PlaceholderTextBlock">
    <Setter Property="Foreground" Value="Gray" />
</Style>
```

## See Also

- [ComboBox Control Reference](/controls/input/selectors/combobox): Property tables and examples.
- [How to Bind to a Collection](/docs/data-binding/how-to-bind-to-a-collection): Collection binding basics.
- [Data Templates](/docs/data-templates/introduction-to-data-templates): Customizing item display.
