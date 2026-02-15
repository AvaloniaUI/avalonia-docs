---
id: column-types
title: Column types
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

## TextColumn

`TextColumn` displays property values as text. Values are converted to strings using `ToString()` for display. For editable columns, text input is converted back to the property type using `Convert.ChangeType()`.

**Generic parameters:**
- `TModel` (`Person`): Your model type
- `TValue` (`string`, `int`, `DateTime`, etc.): The property type

**Constructor parameters:**
- `header`: The column header text
- `getter`: An expression that returns the property value
- `setter` (optional): An action to update the property value. If omitted, the column is read-only.
- `width` (optional): The column width (defaults to `GridLength.Auto` if omitted)
- `options` (optional): A `TextColumnOptions<TModel>` instance for additional configuration

**Examples:**

```csharp
// Read-only columns
new TextColumn<Person, string>("First Name", x => x.FirstName)
new TextColumn<Person, int>("Age", x => x.Age)
new TextColumn<Person, DateTime>("Birth Date", x => x.BirthDate)

// Editable column
new TextColumn<Person, int>("Age", x => x.Age, (person, value) => person.Age = value)
```

**TextColumnOptions:**

```csharp
new TextColumn<Person, DateTime>(
    "Birth Date",
    x => x.BirthDate,
    width: new GridLength(150),
    options: new TextColumnOptions<Person>
    {
        StringFormat = "{0:yyyy-MM-dd}",
        TextAlignment = TextAlignment.Center,
        TextTrimming = TextTrimming.CharacterEllipsis,
        TextWrapping = TextWrapping.NoWrap,
        IsTextSearchEnabled = true,
        CanUserResizeColumn = true,
        CanUserSortColumn = true,
        MinWidth = new GridLength(100),
        MaxWidth = new GridLength(300),
        BeginEditGestures = BeginEditGestures.F2 | BeginEditGestures.DoubleTap
    })
```

Available options:
- `StringFormat`: Format string for displaying values (e.g., `"{0:C}"` for currency)
- `Culture`: Culture for formatting (defaults to `CultureInfo.CurrentCulture`)
- `TextAlignment`: Horizontal text alignment (`Left`, `Center`, `Right`)
- `TextTrimming`: How text is trimmed when too long
- `TextWrapping`: How text wraps within the cell
- `IsTextSearchEnabled`: Whether the column participates in text searches
- `CanUserResizeColumn`: Whether the user can resize the column
- `CanUserSortColumn`: Whether the user can sort by clicking the header
- `AllowTriStateSorting`: Whether to allow ascending/descending/unsorted states
- `MinWidth`/`MaxWidth`: Minimum and maximum column widths
- `CompareAscending`/`CompareDescending`: Custom comparison functions for sorting
- `BeginEditGestures`: Gestures that trigger edit mode (`None`, `F2`, `Tap`, `DoubleTap`, `WhenSelected`)

## CheckBoxColumn

`CheckBoxColumn` displays boolean values as checkboxes.

**Generic parameter:**
- `TModel` (`Person`): Your model type

**Constructor parameters:**
- `header`: The column header text
- `getter`: An expression that gets the boolean property value from the model
- `setter` (optional): An action that sets the property value in the model. If omitted, the column is read-only.
- `width` (optional): The column width (defaults to `GridLength.Auto` if omitted)
- `options` (optional): A `CheckBoxColumnOptions<TModel>` instance for additional configuration

**Examples:**

```csharp
// Read-only checkbox
new CheckBoxColumn<Person>("Firstborn", x => x.IsFirstborn)

// Editable checkbox
new CheckBoxColumn<Person>("Firstborn", x => x.IsFirstborn, (o, v) => o.IsFirstborn = v)
```

**CheckBoxColumnOptions:**

```csharp
new CheckBoxColumn<Person>(
    "Firstborn",
    x => x.IsFirstborn,
    (o, v) => o.IsFirstborn = v,
    width: new GridLength(80),
    options: new CheckBoxColumnOptions<Person>
    {
        CanUserResizeColumn = false,
        CanUserSortColumn = true,
        MinWidth = new GridLength(50),
        MaxWidth = new GridLength(100),
        BeginEditGestures = BeginEditGestures.Tap
    })
```

Available options:
- `CanUserResizeColumn`: Whether the user can resize the column
- `CanUserSortColumn`: Whether the user can sort by clicking the header
- `AllowTriStateSorting`: Whether to allow ascending/descending/unsorted states
- `MinWidth`/`MaxWidth`: Minimum and maximum column widths
- `CompareAscending`/`CompareDescending`: Custom comparison functions for sorting
- `BeginEditGestures`: Gestures that trigger edit mode (`None`, `F2`, `Tap`, `DoubleTap`, `WhenSelected`)

## HierarchicalExpanderColumn

`HierarchicalExpanderColumn` displays hierarchical tree data with an expander control to show/hide child items. This column type can only be used with `HierarchicalTreeDataGridSource` (use `FlatTreeDataGridSource` for non-hierarchical data).

The expander column wraps another column (the "inner" column) which defines what content appears next to the expander icon. Typically this is a `TextColumn`, but it can be any column type.

**Generic parameter:**
- `TModel` (`Person`): Your model type

**Constructor parameters:**
- `inner`: The column that defines the content displayed next to the expander (e.g., `TextColumn` to show text). The expander column uses the width and options from this inner column.
- `childSelector`: An expression that returns the child items for a row (e.g., `x => x.Children`)
- `hasChildrenSelector` (optional): An expression to check if a row has children without loading them (useful for lazy loading)
- `isExpandedSelector` (optional): An expression to bind the expanded state to a property in your model

**Examples:**

```csharp
// Basic usage
new HierarchicalExpanderColumn<Person>(
    new TextColumn<Person, string>("First Name", x => x.FirstName),
    x => x.Children
)

// With all parameters
new HierarchicalExpanderColumn<FileNode>(
    new TextColumn<FileNode, string>("Name", x => x.Name),
    x => x.Children,
    x => x.HasChildren,  // Check without loading children
    x => x.IsExpanded    // Bind to model property
)
```

## TemplateColumn

`TemplateColumn` uses data templates to render cell content, allowing complete control over appearance and behavior.

**Generic parameter:**
- `TModel` (`Person`): Your model type

**Constructor parameters:**
- `header`: The column header
- `cellTemplate`: Data template for displaying cells
- `cellEditingTemplate`: Data template for editing cells (optional - if not provided, the display template is used)
- `width`: Column width (optional)
- `options`: Additional column options (optional)

**Two ways to specify templates:**

**1. Using a `FuncDataTemplate` in code:**

```csharp
new TemplateColumn<Person>(
    "Selected",
    new FuncDataTemplate<Person>((_, _) => new CheckBox
    {
        [!CheckBox.IsCheckedProperty] = new Binding("IsSelected"),
    }))
```

**2. Using a XAML resource:**

```xml
<TreeDataGrid Name="fileViewer" Source="{Binding Files.Source}">
    <TreeDataGrid.Resources>
           
        <!-- Defines a named template for the column -->
        <DataTemplate x:Key="CheckBoxCell">
            <CheckBox IsChecked="{Binding IsSelected}"/>
        </DataTemplate>
        
    </TreeDataGrid.Resources>
</TreeDataGrid>
```

```csharp
// CheckBoxCell is the key of the template defined in XAML.
new TemplateColumn<Person>("Selected", "CheckBoxCell");

// With separate edit template
new TemplateColumn<Person>("Selected", "CheckBoxCell", "CheckBoxCellEdit");
```

**TemplateColumnOptions:**

```csharp
new TemplateColumn<Person>(
    "Custom",
    "CustomTemplate",
    width: new GridLength(150),
    options: new TemplateColumnOptions<Person>
    {
        IsTextSearchEnabled = true,
        TextSearchValueSelector = person => person.DisplayName,
        CanUserResizeColumn = true,
        MinWidth = new GridLength(100)
    })
```

Available options:
- `IsTextSearchEnabled`: Whether the column participates in text searches
- `TextSearchValueSelector`: Function to extract searchable text from the model
- `CanUserResizeColumn`: Whether the user can resize the column
- `CanUserSortColumn`: Whether the user can sort by clicking the header
- `AllowTriStateSorting`: Whether to allow ascending/descending/unsorted states
- `MinWidth`/`MaxWidth`: Minimum and maximum column widths
- `CompareAscending`/`CompareDescending`: Custom comparison functions for sorting
- `BeginEditGestures`: Gestures that trigger edit mode (`None`, `F2`, `Tap`, `DoubleTap`, `WhenSelected`)

## See also

- [TreeDataGrid](/controls/data-display/structured-data/treedatagrid/index)