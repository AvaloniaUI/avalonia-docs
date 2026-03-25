---
id: combobox-how-to
title: "How to: Work with ComboBox"
description: Bind collections, create custom templates, use editable combo boxes, and bind enums with the Avalonia ComboBox control.
doc-type: how-to
---

This guide covers common [`ComboBox`](/api/avalonia/controls/combobox) scenarios including binding to collections, creating custom item templates, working with enums, and using [`AutoCompleteBox`](/api/avalonia/controls/autocompletebox) for type-to-search functionality.

## Basic binding

To bind a `ComboBox` to a collection and track the selected item, set `ItemsSource` to your collection property and bind `SelectedItem` to a property on your view model. Use `PlaceholderText` to display a hint when nothing is selected:

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

:::tip
Use `ObservableCollection<T>` instead of `List<T>` when you need the `ComboBox` to update automatically as items are added or removed at runtime.
:::

## Custom item template

When your items are complex objects, use `ComboBox.ItemTemplate` to control how each item appears in the dropdown. This lets you display multiple properties, icons, or any custom layout:

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

When you use a custom item template with complex objects, the `ComboBox` displays the selected item using the same template. If you want different layouts for the selected item and the dropdown items, you can use a `DataTemplateSelector` or apply styles that target items inside the popup.

## Binding to an enum

You can populate a `ComboBox` with all values of an enum by calling `Enum.GetValues<T>()` and exposing the result as an array:

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

By default, the `ComboBox` displays the raw enum member names (for example, `"High"` rather than `"High Priority"`). If you want human-readable labels, wrap each value in a record and provide an `ItemTemplate`:

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

## Binding to `SelectedValue`

When you need just a single property of the selected item rather than the whole object, use `SelectedValueBinding` to specify which property to extract and `SelectedValue` to bind the result. This is useful when your items are complex objects but you only need to store an ID or code:

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

## Static items in XAML

For a small fixed set of options that do not change at runtime, you can define items directly in XAML using `ComboBoxItem` elements. Set `SelectedIndex` to pre-select an item by position:

```xml
<ComboBox SelectedIndex="0">
    <ComboBoxItem Content="Small" />
    <ComboBoxItem Content="Medium" />
    <ComboBoxItem Content="Large" />
</ComboBox>
```

:::tip
Static items work well for settings screens or forms where the options are known at design time. For dynamic or data-driven options, use `ItemsSource` binding instead.
:::

## Editable combo box (`AutoCompleteBox`)

Avalonia's `ComboBox` does not have a built-in editable mode. If you need type-to-search functionality where the user can filter options by typing, use `AutoCompleteBox` instead:

```xml
<AutoCompleteBox ItemsSource="{Binding AllCities}"
                 Text="{Binding SearchText}"
                 PlaceholderText="Search for a city..."
                 FilterMode="Contains"
                 MinimumPrefixLength="1" />
```

`AutoCompleteBox` filters the list as the user types. You can choose from several built-in filter modes (`StartsWith`, `Contains`, `ContainsCaseSensitive`, and others), or provide a custom filter:

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

If the dropdown panel is too narrow for your content, you can set a minimum width on the `Popup` inside the `ComboBox` template:

```xml
<Style Selector="ComboBox /template/ Popup">
    <Setter Property="MinWidth" Value="300" />
</Style>
```

### Custom placeholder style

You can change the appearance of the placeholder text that appears when no item is selected:

```xml
<Style Selector="ComboBox:not(:selected) /template/ ContentControl#PlaceholderTextBlock">
    <Setter Property="Foreground" Value="Gray" />
</Style>
```

## See also

- [How to bind to a collection](/docs/data-binding/how-to-bind-to-a-collection): Collection binding basics.
- [Introduction to data templates](/docs/data-templates/introduction-to-data-templates): Customizing how items are displayed.
- [Collection views](/docs/data-binding/collection-views): Sorting, filtering, and grouping bound collections.
