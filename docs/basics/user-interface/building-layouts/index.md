---
description: CONCEPTS
---

# Layout

## Panels

Avalonia includes a group of elements that derive from `Panel`. These `Panel` elements enable many complex layouts. For example, stacking elements can easily be achieved by using the `StackPanel` element, while more complex and free flowing layouts are possible by using a `Canvas`.

The following table summarizes the available `Panel` controls:

| Name            | Description                                                                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Panel`         | Lays out all children to fill the bounds of the `Panel`                                                                                                                                                                                                                   |
| `Canvas`        | Defines an area within which you can explicitly position child elements by coordinates relative to the Canvas area.                                                                                                                                                       |
| `DockPanel`     | Defines an area within which you can arrange child elements either horizontally or vertically, relative to each other.                                                                                                                                                    |
| `Grid`          | Defines a flexible grid area that consists of columns and rows.                                                                                                                                                                                                           |
| `RelativePanel` | Arranges child elements relative to other elements or the panel itself.                                                                                                                                                                                                   |
| `StackPanel`    | Arranges child elements into a single line that can be oriented horizontally or vertically.                                                                                                                                                                               |
| `WrapPanel`     | Positions child elements in sequential position from left to right, breaking content to the next line at the edge of the containing box. Subsequent ordering occurs sequentially from top to bottom or right to left, depending on the value of the Orientation property. |

In WPF, `Panel` is an abstract class and laying out multiple controls to fill the available space is usually done with a `Grid` with no rows/columns. In Avalonia `Panel` is a usable control that has the same layout behavior as a `Grid` with no rows/columns, but with a lighter runtime footprint.

## Element Bounding Boxes

When thinking about layout in Avalonia, it is important to understand the bounding box that surrounds all elements. Each `Control` consumed by the layout system can be thought of as a rectangle that is slotted into the layout. The `Bounds` property returns the boundaries of an element's layout allocation. The size of the rectangle is determined by calculating the available screen space, the size of any constraints, layout-specific properties (such as margin and padding), and the individual behavior of the parent `Panel` element. Processing this data, the layout system is able to calculate the position of all the children of a particular `Panel`. It is important to remember that sizing characteristics defined on the parent element, such as a `Border`, affect its children.

## The Layout System

At its simplest, layout is a recursive system that leads to an element being sized, positioned, and drawn. More specifically, layout describes the process of measuring and arranging the members of a `Panel` element's `Children` collection. Layout is an intensive process. The larger the `Children` collection, the greater the number of calculations that must be made. Complexity can also be introduced based on the layout behavior defined by the `Panel` element that owns the collection. A relatively simple `Panel`, such as `Canvas`, can have significantly better performance than a more complex `Panel`, such as `Grid`.

Each time that a child control changes its position, it has the potential to trigger a new pass by the layout system. Therefore, it is important to understand the events that can invoke the layout system, as unnecessary invocation can lead to poor application performance. The following describes the process that occurs when the layout system is invoked.

1. A child UIElement begins the layout process by first having its core properties measured.
2. Sizing properties defined on `Control` are evaluated, such as `Width`, `Height`, and `Margin`.
3. `Panel`-specific logic is applied, such as `Dock` direction or stacking `Orientation`.
4. Content is arranged after all children have been measured.
5. The `Children` collection is drawn on the screen.
6. The process is invoked again if additional `Children` are added to the collection

This process and how it is invoked are defined in more detail in the following sections.

## Measuring and Arranging Children

The layout system completes two passes for each member of the `Children` collection, a measure pass and an arrange pass. Each child `Panel` provides its own `MeasureOverride` and `ArrangeOverride` methods to achieve its own specific layout behavior.

During the measure pass, each member of the `Children` collection is evaluated. The process begins with a call to the `Measure` method. This method is called within the implementation of the parent `Panel` element, and does not have to be called explicitly for layout to occur.

First, native size properties of the `Visual` such as `Clip` and `IsVisible` are evaluated. This generates a constraint that is passed to `MeasureCore`.

First, framework properties which affects the value of the constraint are processed. These properties generally describe the sizing characteristics of the underlying `Control`, such as its `Height`, `Width` and `Margin`. Each of these properties can change the space that is necessary to display the element. `MeasureOverride` is then called with the constraint as a parameter.

Because `Bounds` is a calculated value, you should be aware that there could be multiple or incremental reported changes to it as a result of various operations by the layout system. The layout system may be calculating required measure space for child elements, constraints by the parent element, and so on.

The ultimate goal of the measure pass is for the child to determine its `DesiredSize`, which occurs during the `MeasureCore` call. The `DesiredSize` value is stored by `Measure` for use during the content arrange pass.

The arrange pass begins with a call to the `Arrange` method. During the arrange pass, the parent `Panel` element generates a rectangle that represents the bounds of the child. This value is passed to the `ArrangeCore` method for processing.

The `ArrangeCore` method evaluates the `DesiredSize` of the child and evaluates any additional margins that may affect the rendered size of the element. `ArrangeCore` generates an arrange size, which is passed to the `ArrangeOverride` method of the `Panel` as a parameter. `ArrangeOverride` generates the finalSize of the child. Finally, the `ArrangeCore` method does a final evaluation of offset properties, such as margin and alignment, and puts the child within its layout slot. The child does not have to (and frequently does not) fill the entire allocated space. Control is then returned to the parent `Panel` and the layout process is complete.

## In This Section

* [Panels Overview](panels-overview.md)
* [Alignment, Margins and Padding](alignment-margins-and-padding.md)
* [Create a Custom Panel](../../../guides/custom-controls/create-a-custom-panel.md)
