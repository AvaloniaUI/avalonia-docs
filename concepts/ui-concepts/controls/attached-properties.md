---
id: attached-properties
title: Attached properties
description: Understand how attached properties let parent controls define properties that child controls can set, enabling layout positioning and attached behaviors.
doc-type: explanation
---

import AttachedControlDiagram from '/img/concepts/ui-concepts/controls/attached-control.png';
import AttachedLayoutPropertyDiagram from '/img/concepts/ui-concepts/controls/attached-layout-property.png';

Avalonia controls support the **attached property** concept. An attached property is a property defined by one control (typically a parent or container) that you set on a different control (typically a child). This allows parent controls to read configuration values from their children without requiring every child type to declare those properties itself.

## XAML syntax

In XAML, you set attached properties as attributes on the child control element using dot notation:

```xml
<ContainerClassName.AttachedPropertyName>value</ContainerClassName.AttachedPropertyName>
```

Or as an inline attribute:

```xml
<ChildControl ContainerClassName.AttachedPropertyName="value" />
```

For example, to place a `Button` in the second row of a `Grid`:

```xml
<Grid>
  <Grid.RowDefinitions>
    <RowDefinition Height="Auto" />
    <RowDefinition Height="*" />
  </Grid.RowDefinitions>

  <TextBlock Grid.Row="0" Text="Header" />
  <Button Grid.Row="1" Content="Click me" />
</Grid>
```

Here, `Grid.Row` is an attached property defined by `Grid` but set on the `Button` and `TextBlock` children. The `Grid` reads these values during layout to determine where each child should appear.

## C# syntax

In code-behind, you use the static `SetValue` and `GetValue` methods to work with attached properties:

```csharp
// Set Grid.Row on a button
Grid.SetRow(myButton, 1);

// Read Grid.Row from a button
int row = Grid.GetRow(myButton);
```

## Common use cases

Attached properties appear in two main scenarios in Avalonia.

### Attached controls

An additional control is attached to a host control for a specific purpose. You can use this pattern when a control allows only a single child in its content zone. The attached control is not counted as part of the content; the container uses it separately. Common examples include context menus, tooltips, and flyouts.

<img src={AttachedControlDiagram} alt="Diagram showing an attached control relationship where a tooltip is attached to a host button"/>

For example, you can attach a `ToolTip` to any control:

```xml
<Button Content="Hover over me">
  <ToolTip.Tip>
    <TextBlock Text="This is a tooltip" />
  </ToolTip.Tip>
</Button>
```

### Layout positioning

Layout containers use attached properties to learn how they should arrange each child. The child sets the property value, and the parent reads it during its layout pass. Common examples include `Grid` (row and column positioning), `DockPanel` (dock direction), and `Canvas` (absolute positioning).

<img src={AttachedLayoutPropertyDiagram} alt="Diagram showing attached layout properties where child controls provide positioning information to a parent layout container"/>

For example, `DockPanel.Dock` tells a `DockPanel` where to place each child:

```xml
<DockPanel>
  <Button DockPanel.Dock="Top" Content="Top" />
  <Button DockPanel.Dock="Bottom" Content="Bottom" />
  <Button Content="Fill" />
</DockPanel>
```

## How attached properties work

Attached properties are registered using `AvaloniaProperty.RegisterAttached<TOwner, THost, TValue>()`. The owner type defines the property, and the host type specifies which controls can receive it. When you set an attached property in XAML, the XAML parser calls the owner's static setter method (for example, `Grid.SetRow`). During layout or rendering, the parent control reads the value back using the corresponding getter.

This decoupled design means you can add new layout or behavioral features to existing controls without modifying their class definitions.

:::info
For a full list of Avalonia built-in controls, see the [controls reference](/controls).
:::

## See also

- [How to create attached properties](/docs/custom-controls/attached-properties)
- [Layout](/concepts/ui-concepts/layout)
- [Control trees](/concepts/ui-concepts/controls/control-trees)
