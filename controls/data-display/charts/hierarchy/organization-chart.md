---
id: organization-chart
title: Organization Chart
description: Represents organizational structure and reporting relationships in a hierarchical layout, showing positions, roles, and rank levels.
doc_type: reference
tags:
  - accelerate
---

import chartsHierarchicalOrganization from '/img/controls/charts/charts-hierarchical-organization.png';

:::info
[Charts](/controls/data-display/charts/index) are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

Organization charts represent the structure of an organization, clarifying reporting relationships, relative ranks, and positions/job roles.

<Image light={chartsHierarchicalOrganization} maxWidth={400} position="center" cornerRadius="true" alt="Organization chart with a top-level CEO node branching down to department heads showing reporting relationships." />

## When to Use
- **Company Directory**: Visualizing the reporting structure of a business.
- **Project Hierarchy**: Mapping out product owners, developers, and stakeholders.
- **Family Trees**: Displaying genealogical relationships and lineages.

## Code Example

### XAML
```xml
<controls:OrganizationChart Name="OrganizationChartSample" Title="Company Structure" Height="400"
                            ItemsSource="{Binding OrgChartData}" LabelPath="Name" ChildrenPath="Reports" />
```

### Data Model (C#)
```csharp
public class Employee
{
    public string Name { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public ObservableCollection<Employee> Reports { get; set; } = new();
}

public ObservableCollection<Employee> OrgChartData { get; } = new()
{
    new Employee { Name = "Jane Doe", Position = "CEO", Reports = {
        new Employee { Name = "John Smith", Position = "CTO" },
        new Employee { Name = "Alice Wong", Position = "COO" }
    }}
};
```

## Common Properties

| Property | Description | Default |
| :--- | :--- | :--- |
| `ItemsSource` | The hierarchical data source (root nodes). | `null` |
| `LabelPath` | Property name for the node labels. | `null` |
| `ChildrenPath` | Path to the collection of child nodes. | `null` |
| `Orientation` | `Horizontal` or `Vertical` layout. | `Vertical` |
| `Stroke` | Color of the connecting lines. | Theme-dependent |
