---
description: REFERENCE - Built-in Controls
---

# Tree Data Grid Column Types

The tree data grid supports three different column types:

* Text Column
* Hierarchical Expander Column
* Template Column

### Text Column

A text column (class `TextColumn`) is useful when you want the cells in a column to have text values. A text column is created like this:

```csharp
new TextColumn<ItemClass, string>("Column Header", x => x.Property)
```

The first generic parameter here is the class of the items that make up the grid rows. The second generic parameter here is the type of the property.

![](https://user-images.githubusercontent.com/53405089/157456551-dd394781-903a-4c7b-8874-e631e21534a1.png)

The above is the signature of the `TextColumn` constructor. The first two parameters are required: the first is the column header, and the second is an expression to get the value of the property.

The `TextColumn` class implements the column interface `IColumn`.

### Hierarchical Expander Column

A hierarchical expander column (class: `HierarchicalExpanderColumn`) can only be used with the _hierarchical_ data mode of operation, and it must be used with the data source class `HierarchicalTreeDataGridSource`. This column type must contain an inner column (interface `IColumn`) to define its header and value property. A hierarchical expander column displays the expand and contract chevron buttons in a hierarchical tree data grid.

This column type is created like this:

```csharp
new HierarchicalExpanderColumn<ItemClass>(
    new TextColumn<ItemClass, string>("Column Header", x => x.Property), 
    x => x.Children)
```

The generic parameter is the class of the items that make up the grid rows. This is the same as the item class for the inner column.

![](https://user-images.githubusercontent.com/53405089/157536079-fd14f1ed-0a7d-438a-abba-fd56766709a9.png)

The above is the signature of the `HierarchicalExpanderColumn` constructor. The first parameter in the constructor is the inner column, and the second parameter is a (nullable) selector for any child elements.

### Template Column

The template column (class `TemplateColumn`) is a fully customizable way for you to create a column. It essentially forms a **data template** for the column.

You create a template column like this:

```csharp
new TemplateColumn<ItemClass>("Column Header",
       new FuncDataTemplate<T>((a,e) => new SomeControl()))
```

![](https://user-images.githubusercontent.com/53405089/157664231-8653bce9-f8d6-4fbc-8e78-e3ff93f1ace2.png)

The above is the signature of the `TemplateColumn`constructor.  It has two required parameters: the first is the column header, and the second is a function that returns `IDataTemplate`.

:::info
For more information about the concept of creating a **data template** in code, see [here](../../../../concepts/templates/creating-data-templates-in-code.md).
:::
