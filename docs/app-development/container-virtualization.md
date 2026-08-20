---
id: container-virtualization
title: Container virtualization
description: Reuse item containers and their control trees while scrolling a VirtualizingStackPanel, and the lifecycle rules that come with it.
doc-type: how-to
---

A virtualizing panel normally recycles the *container* of an item, such as a `ListBoxItem`, but not the controls your data template built inside it. Those controls are discarded when the item scrolls out of view and built again for the next item. Container virtualization keeps them, so a container and its control tree are reused together and only the bindings change.

This is opt-in per data template, and it works only inside a `VirtualizingStackPanel`.

:::info
This API is not part of a released Avalonia version yet. It is proposed in [pull request #20993](https://github.com/AvaloniaUI/Avalonia/pull/20993).
:::

## What the opt-in changes

Without the opt-in, recycling a container clears its `Content` and `ContentTemplate`. The control tree the template produced is detached and rebuilt for the next item.

With the opt-in, the panel groups containers into pools by a *recycle key* that your template supplies. A container is only ever reused for data with the same key, so the control tree it already holds can stay in place. Preparing an item then costs a `DataContext` change instead of a subtree build.

## Opt in from XAML

Set `EnableVirtualization` on the `DataTemplate` you assign to `ItemTemplate`:

```xml
<ListBox ItemsSource="{Binding Rows}">
  <ListBox.ItemTemplate>
    <DataTemplate DataType="vm:RowViewModel"
                  EnableVirtualization="True"
                  MaxPoolSizePerKey="8">
      <Grid ColumnDefinitions="Auto,*,Auto">
        <TextBlock Text="{Binding Title}" />
        <TextBlock Grid.Column="1" Text="{Binding Detail}" />
        <TextBlock Grid.Column="2" Text="{Binding Value}" />
      </Grid>
    </DataTemplate>
  </ListBox.ItemTemplate>
  <ListBox.ItemsPanel>
    <ItemsPanelTemplate>
      <VirtualizingStackPanel />
    </ItemsPanelTemplate>
  </ListBox.ItemsPanel>
</ListBox>
```

A XAML `DataTemplate` keys its pool on `DataType`, and on the runtime type of the data when `DataType` is not set. `MaxPoolSizePerKey` caps how many idle containers are kept per key, and defaults to `5`.

:::caution
The template must be reachable through `ItemTemplate` or `DisplayMemberBinding`. A `DataTemplate` placed in a `DataTemplates` collection does not opt in, even with `EnableVirtualization` set to `True`, because the items control does not copy collection templates onto its containers.
:::

## Opt in from code

A `FuncDataTemplate` opts in through `RecycleKeySelector`, which returns the pool key for a piece of data:

```csharp
var template = new FuncDataTemplate<RowViewModel>((row, _) => BuildRow(row))
{
    RecycleKeySelector = data => (data as RowViewModel)?.Kind,
    MaxPoolSizePerKey = 8,
    MinPoolSizePerKey = 2,
};
```

Returning `null` for a piece of data opts that data out again, and it falls back to normal container recycling.

## Choose a recycle key

The key must identify the *shape of the control tree* your template produced, not the type of the data.

- If the template always builds the same tree, `data => data?.GetType()` is the natural key.
- If the template branches on a property to build different trees, key on that property. All four row kinds in the example above are one CLR class, so `Kind` is the correct key and the type is not.

A container built for one shape must never be handed data of another shape. It would keep the wrong tree and display the wrong controls.

## Lifecycle callbacks do not fire per item

:::danger
Containers are not removed from the visual tree when they scroll out of view. The panel sets `IsVisible` to `false` and keeps the container in its `Children` collection, and with the opt-in the controls your template built stay attached to that container.

As a result, `Loaded`, `Unloaded`, `AttachedToVisualTree`, and `DetachedFromVisualTree` fire once for those controls, for the first item they ever displayed. They do not fire again as the container is reused for other items, and `Unloaded` and `DetachedFromVisualTree` do not fire when an item scrolls away.

Any control that initializes per item in `Loaded` or `OnAttachedToVisualTree`, or that releases state in `Unloaded` or `OnDetachedFromVisualTree`, breaks under this opt-in. It initializes once against the first item and never cleans up. Media players, map and chart controls, and anything that subscribes to a service on load are common cases.
:::

Two ways to work with this:

- Move per-item work to `DataContextChanged` or to property change handlers, which run every time the container receives a new item.
- Leave the template opted out if it contains a control you do not own and cannot change. Recycling then behaves as it always has.

## Mixed row kinds

A flat list of different row kinds cannot use one `DataTemplate`. Implement `IVirtualizingDataTemplate` on a template selector so each kind gets its own pool:

```csharp
public class RowTemplateSelector : IVirtualizingDataTemplate
{
    [Content]
    public List<IDataTemplate> Templates { get; } = new();

    public int MaxPoolSizePerKey { get; set; } = 6;

    public int MinPoolSizePerKey { get; set; } = 3;

    public object? GetKey(object? data) => data?.GetType();

    public bool Match(object? data) => FindTemplate(data) is not null;

    public Control? Build(object? data) => FindTemplate(data)?.Build(data);

    public Control? Build(object? data, Control? existing) => existing ?? Build(data);

    private IDataTemplate? FindTemplate(object? data) =>
        Templates.FirstOrDefault(t => t.Match(data));
}
```

`Build(object?, Control?)` must return `existing` when it is not `null`. Rebuilding the tree there would undo the pooling.

Assign the selector as the item template, and supply one template per row kind as its content:

```xml
<pages:RowTemplateSelector x:Key="RowTemplates">
  <DataTemplate DataType="vm:HeadlineRow">...</DataTemplate>
  <DataTemplate DataType="vm:ImageRow">...</DataTemplate>
</pages:RowTemplateSelector>
```

```xml
<ListBox ItemsSource="{Binding Rows}"
         ItemTemplate="{StaticResource RowTemplates}" />
```

## Pre-build containers on attach

Building the first containers of a pool happens while the user scrolls. `EnableWarmup` moves that work to the moment the panel is attached:

```xml
<ItemsPanelTemplate>
  <VirtualizingStackPanel EnableWarmup="True" />
</ItemsPanelTemplate>
```

Warmup is off by default. It pre-builds `MinPoolSizePerKey` containers for each key the panel has met, so a row kind that first appears deep in the list is covered when the reader reaches it. The property is read when the panel attaches, so changing it later has no effect on a panel that is already showing items.

## When the opt-in pays off

The saving is the subtree that no longer gets rebuilt, so it scales with how much your row contains.

- Rows with many controls, bindings, and text runs benefit. In one benchmark of 5,000 heterogeneous rows on desktop x64, scrolling was about 3.4 times faster and allocated 83% fewer bytes, with container preparation counts unchanged.
- Rows that hold a single control or two gain nothing measurable. Rebuilding such a tree is already cheap, and the pooling only adds bookkeeping.

Measure your own list before opting in. The work avoided is control construction, binding setup, and text layout, all of which cost proportionally more on phones than on desktop.

## Memory held per item

`VirtualizingStackPanel` records the measured size of every item it has measured, so that the scroll extent stays stable when the user revisits part of the list. The record holds one entry per item measured, not per realized container, and it is released when the collection is reset or reordered.

The measured cost is about 44 bytes per item, so a list of 100,000 items that the user has scrolled end to end retains roughly 4.2 MB.

## Turn it off

Container virtualization can be disabled process-wide. This is a kill switch for diagnosing a problem, not the opt-in:

```csharp
ContainerVirtualization.IsEnabled = false;
```

With it set to `false`, every `ItemsControl` falls back to normal container recycling, whatever the templates ask for.

## See also

- [Performance optimization](/docs/app-development/performance)
- [ListBox](/controls/data-display/collections/listbox)
- [ItemsControl](/controls/data-display/collections/itemscontrol)
- [Introduction to data templates](/docs/data-templates/introduction-to-data-templates)
- [Creating data templates in code](/docs/data-templates/creating-data-templates-in-code)
