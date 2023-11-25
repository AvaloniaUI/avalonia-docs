---
id: wiring-up-the-views
title: Wiring up the Views
---

import ToDoWiredViewScreenshot from '/img/tutorials/todo-list-app/wiring-up-the-views/wiring-up-views-run.png';

Now that we've got the view models set up, we need to make our views use these view models. We do this by making use of Avalonia's [data binding](../../getting-started/programming-with-avalonia/data-binding) feature.

## Update MainWindow

We're exposing the list in `MainWindowViewModel.List` so let's use that property to display the list in `MainWindow.axaml`.

Views/MainWindow.axaml

```markup
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="Todo.Views.MainWindow"
        Icon="/Assets/avalonia-logo.ico"
        Width="200" Height="300"
        Title="Avalonia Todo"
        Content="{Binding List}">
</Window>
```

The main change is that instead of using a `<views:TodoListView/>` control as the content of the window, we're now binding the window's content to the `MainWindowViewModel.List` property, which contains our list:

```markup
Content="{Binding List}"
```

`{Binding}` is a markup extension which instantiates a [binding](../../data-binding/bindings) to a property on a control's `DataContext`. You'll remember that in `App.axaml.cs` we [assigned an instance of `MainWindowViewModel` to the window's `DataContext` property](creating-a-model-and-viewmodel#create-an-instance-of-todolistviewmodel).

The `Window.Content` property can either be set by placing a control as a child of the `Window` \([as we were doing previously](creating-a-view#display-the-view-in-the-window)\), or by assigning a value to the `Content` property. Both of these syntaxes are equivalent, meaning that writing:

```markup
<Window xmlns="https://github.com/avaloniaui">Hello World!</Window>
```

Is _exactly_ the same as writing:

```markup
<Window xmlns="https://github.com/avaloniaui" Content="Hello World!"/>
```

## Update TodoListView

Now we need to make `TodoListView` get the list of TODO items from the view model:

Views/TodoListView.axaml

```markup
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d" d:DesignWidth="200" d:DesignHeight="300"
             x:Class="Todo.Views.TodoListView">
  <DockPanel>
    <Button DockPanel.Dock="Bottom"
            HorizontalAlignment="Center">
      Add an item
    </Button>
    <ItemsControl Items="{Binding Items}">
      <ItemsControl.ItemTemplate>
        <DataTemplate>
          <CheckBox Margin="4"
                    IsChecked="{Binding IsChecked}"
                    Content="{Binding Description}"/>
        </DataTemplate>
      </ItemsControl.ItemTemplate>
    </ItemsControl>
  </DockPanel>
</UserControl>
```

The first thing to notice here is that we've changed the `<StackPanel>` control to an `ItemsControl`:

```markup
<ItemsControl Items="{Binding Items}">
```

The `ItemsControl` is a very simple control which displays each item in the collection assigned to its `Items` property. Here each item will be an instance of our model `TodoItem` as that's what `TodoListViewModel.Items` exposes.

How each item is displayed is controlled by the `ItemTemplate`. The `ItemTemplate` takes a [`DataTemplate`](https://avaloniaui.net/docs/templates/datatemplate) whose content is repeated for each item. In this case we display each item as a `CheckBox`, with the check state bound to the `IsChecked` property of the `TodoItemViewModel` and the content bound to the `Description`. We also set a `Margin` as before to space the items out a little:

```markup
<ItemsControl.ItemTemplate>
  <DataTemplate>
    <CheckBox Margin="4"
              IsChecked="{Binding IsChecked}"
              Content="{Binding Description}"/>
  </DataTemplate>
</ItemsControl.ItemTemplate>
```

## Run the application

If you now run the application you will see the items in the \(fake\) database displayed.

<img className="center" src={ToDoWiredViewScreenshot} alt="" />
