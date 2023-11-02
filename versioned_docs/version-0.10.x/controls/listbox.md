---
id: listbox
title: ListBox
---

The `ListBox` is an `ItemsControl` which displays items in a multi-line list box and allows individual selection.

The items to display in the `ListBox` are specified using the `Items` property. This property will often be bound to a collection on the control's `DataContext`:

```markup
<ListBox ItemsSource="{Binding MyItems}"/>
```

## Customizing the item display

You can customize how an item is displayed by specifying an `ItemTemplate`. For example to display each item inside a red border with rounded corners:

```markup
<ListBox ItemsSource="{Binding MyItems}">
    <ListBox.ItemTemplate>
        <DataTemplate>
            <Border Background="Red" CornerRadius="4" Padding="4">
                <TextBlock Text="{Binding}"/>
            </Border>
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

## Containers

Each item displayed in a `ListBox` will be wrapped in a `ListBoxItem` - this is called the _container_. The container hosts the content specified in the `ItemTemplate` but it is not part of the `ItemTemplate` itself. It is the container that contains the logic for displaying selected items.

Sometimes you will want to customize the container itself. You can do this by including a style targeting `ListBoxItem` in the `ListBox`:

```markup
<ListBox ItemsSource="{Binding Items}">
    <ListBox.Styles>
        <!-- Give the ListBoxItems a fixed with of 100 and right-align them -->
        <Style Selector="ListBoxItem">
            <Setter Property="Width" Value="100"/>
            <Setter Property="HorizontalAlignment" Value="Right"/>
        </Style>
    </ListBox.Styles>
</ListBox>
```

In WPF and UWP this is done via the `ItemContainerStyle` - this property does not exist in Avalonia; you should use the method outlined above.

## Selection

There are several properties related to selection on `ListBox`:

It is recommended that you only bind one of the `SelectedIndex`, `SelectedItem`, `SelectedItems` or `Selection` properties.

### SelectionMode

Controls the type of selection that can be made on the `ListBox`:

| Property | Description |
| :--- | :--- |
| `Single` | Only a single item can be selected \(default\) |
| `Multiple` | Multiple items can be selected |
| `Toggle` | Item selection can be toggled by tapping/spacebar. When not enabled, shift or ctrl must be used to select multiple items |
| `AlwaysSelected` | An item will always be selected as long as there are items to select. |

These values can be combined, e.g.:

```markup
<ListBox SelectionMode="Multiple,Toggle"/>
```

### SelectedIndex

Exposes the index of the selected item, or in the case of multiple selection the first selected item. You will often want to bind this to a view model if your list `SelectionMode` is set to `Single`.

```markup
<ListBox SelectedIndex="{Binding SelectedIndex}"/>
```

```csharp
public MyViewModel : ReactiveObject
{
    int selectedIndex;

    public int SelectedIndex
    {
        get => selectedIndex;
        set => this.RaiseAndSetIfChanged(ref selectedIndex, value);
    }
}
```

By default bindings to this property are two-way.

### SelectedItem

Exposes the selected item in the `Items` collection, or in the case of multiple selection the first selected item. You will often want to bind this to a view model if your list `SelectionMode` is set to `Single`.

```markup
<ListBox SelectedItem="{Binding SelectedItem}"/>
```

```csharp
public MyViewModel : ReactiveObject
{
    MyItem selectedItem;

    public MyItem SelectedItem
    {
        get => selectedItem;
        set => this.RaiseAndSetIfChanged(ref selectedItem, value);
    }
}
```

By default bindings to this property are two-way.

Do not bind to this property if your `Items` collection contains duplicates as it is impossible to distinguish between duplicate values.

### Selection

The `Selection` property exposes an `ISelectionModel` object with various methods to track multiple selected items. You can create a `SelectionModel` object in your view model and bind it to this property and subsequently control the selection from your view model.

`ISelectionModel` is optimized for large collections. Because of this it is recommended that you use this property in preference to `SelectedItems` for performance reasons.

Once `Selection` is bound to a `SelectionModel`, `SelectedItems` will no longer function.

`SelectionModel` also exposes batching functionality through its `Update()` method and a `SelectionChanged` event which details exactly which items have been selected and deselected.

```markup
<ListBox ItemsSource="{Binding Items}" Selection="{Binding Selection}"/>
```

```csharp
public class MyViewModel
{
    public MyViewModel()
    {
        Items = CreateItems();

        // SelectionModel.Source can be set to Items here, or if it is left null it will be set by
        // the `ListBox` when bound.
        Selection = new SelectionModel();
        Selection.SelectionChanged += SelectionChanged;

        // Select item 10 in Items.
        Selection.Select(10);
    }

    public ObservableCollection<MyItem> Items { get; }
    public SelectionModel Selection { get; }

    // A method bound to e.g. a button which will select the first 100 items.
    public void SelectFirst100() => Selection.SelectRange(0, 99);

    // Switch to single selection via the view model.
    public void SwitchToSingleSelect() => Selection.SingleSelect = true;

    void SelectionChanged(object sender, SelectionModelSelectionChangedEventArgs e)
    {
        // ... handle selection changed
    }
}
```

By default bindings to this property are one-way.

### SelectedItems

This property holds the selected items in an `IList`. It can be bound to any list that implements `IList` but it will usually be bound to a collection which also implements `INotifyCollectionChanged` such as `ObservableCollection<>`.

For various reasons the performance of `SelectedItems` can be very poor, particularly on large collections. It is recommended that you use the `Selection` property instead.

```markup
<ListBox SelectedItems="{Binding SelectedItems}"/>
```

```csharp
public MyViewModel : ReactiveObject
{
    public ObservableCollection<MyItem> SelectedItems { get; } = new ObservableCollection<MyItem>();
}
```

## Preventing Horizontal Scrolling

By default if an item is too wide to display in the `ListBox`, a horizontal scrollbar will be displayed. If instead you want items to be constrained to the width of the `ListBox` \(for example if you want wrapping text in the items\) you can disable the horizontal scrollbar by setting `ScrollViewer.HorizontalScrollBarVisibility="Disabled"`.

```markup
<ListBox ItemsSource="{Binding MyItems}" Width="250" ScrollViewer.HorizontalScrollBarVisibility="Disabled">
    <ListBox.ItemTemplate>
        <DataTemplate>
            <Border Background="Red" CornerRadius="4" Padding="4">
                <TextBlock Text="{Binding}" TextWrapping="Wrap"/>
            </Border>
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

## Source code

[ListBox.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ListBox.cs)
