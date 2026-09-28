---
id: menu-how-to
title: "How to: Work with menus"
description: Learn how to use the Menu, ContextMenu, and NativeMenu controls in Avalonia, including commands, keyboard shortcuts, dynamic items, checked items, submenus, and right-click context menus.
doc-type: how-to
---

This guide covers [`Menu`](/controls/menus/menu) and [`ContextMenu`](/controls/menus/contextmenu) patterns in Avalonia, such as commands, keyboard shortcuts, dynamic menus, checked items, submenus, and right-click context menus.

## Basic menu bar

For a conventional menu bar, place a `Menu` inside a `DockPanel` docked to the top of your window.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:vm="using:BasicMenuBar">
  <UserControl.DataContext>
    <vm:MainViewModel />
  </UserControl.DataContext>

  <DockPanel>

    <Menu DockPanel.Dock="Top">
      <MenuItem Header="_File">
        <MenuItem Header="_New" Command="{Binding NewCommand}" />
        <MenuItem Header="_Open..." Command="{Binding OpenCommand}" />
        <MenuItem Header="_Save" Command="{Binding SaveCommand}" />
        <Separator />
        <MenuItem Header="E_xit" Command="{Binding ExitCommand}" />
      </MenuItem>
      <MenuItem Header="_Edit">
        <MenuItem Header="_Undo" Command="{Binding UndoCommand}" />
        <Separator />
        <MenuItem Header="Cu_t" Command="{Binding CutCommand}" />
        <MenuItem Header="_Copy" Command="{Binding CopyCommand}" />
        <MenuItem Header="_Paste" Command="{Binding PasteCommand}" />
      </MenuItem>
    </Menu>

    <ContentControl>
      <TextBlock Text="Main window content goes here" Padding="20" Background="Gray" />
    </ContentControl>

  </DockPanel>
</UserControl>
```

```csharp
using System;
using System.Windows.Input;

namespace BasicMenuBar;

public class MainViewModel
{
    // Replace each empty lambda with your command logic.
    public ICommand NewCommand { get; } = new RelayCommand(() => { });
    public ICommand OpenCommand { get; } = new RelayCommand(() => { });
    public ICommand SaveCommand { get; } = new RelayCommand(() => { });
    public ICommand ExitCommand { get; } = new RelayCommand(() => { });
    public ICommand UndoCommand { get; } = new RelayCommand(() => { });
    public ICommand CutCommand { get; } = new RelayCommand(() => { });
    public ICommand CopyCommand { get; } = new RelayCommand(() => { });
    public ICommand PasteCommand { get; } = new RelayCommand(() => { });
}

// A minimal ICommand for the purposes of this preview. 
// You can use CommunityToolkit.Mvvm in a real app.
public class RelayCommand : ICommand
{
    private readonly Action _execute;

    public RelayCommand(Action execute) => _execute = execute;

    public event EventHandler? CanExecuteChanged { add { } remove { } }

    public bool CanExecute(object? parameter) => true;

    public void Execute(object? parameter) => _execute();
}
```

</XamlPreview>
<br />

:::tip Tips
- This sample defines its own `RelayCommand` class to allow it to run as an in-browser preview. In your app, you can use the [`RelayCommand` attribute from CommunityToolkit.Mvvm](/docs/input-interaction/commanding).
- The underscore before a letter defines the accelerator key (<kbd>Alt</kbd>+<kbd>key</kbd>). For example, `_File` lets a user press <kbd>Alt</kbd>+<kbd>F</kbd> to open the File menu.
- Use a `Separator` between `MenuItem` entries to insert a visual divider and group related actions.
:::

## Menu with keyboard shortcuts

### Displaying shortcut hint text

Use `InputGesture` to display a shortcut hint next to a menu item.

Note that `InputGesture` only displays the text. For the shortcut to function, you must separately register the actual key binding that invokes the command.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:vm="using:KeyboardShortcutsMenuBar">
  <UserControl.DataContext>
    <vm:MainViewModel />
  </UserControl.DataContext>

  <DockPanel>

    <Menu DockPanel.Dock="Top">
      <MenuItem Header="_Edit">
        <MenuItem Header="Cu_t" Command="{Binding CutCommand}"
                  InputGesture="Ctrl+X" />
        <MenuItem Header="_Copy" Command="{Binding CopyCommand}"
                  InputGesture="Ctrl+C" />
        <MenuItem Header="_Paste" Command="{Binding PasteCommand}"
                  InputGesture="Ctrl+V" />
      </MenuItem>
    </Menu>

    <ContentControl>
      <TextBlock Text="Main window content goes here" Padding="20" Background="Gray" />
    </ContentControl>

  </DockPanel>
</UserControl>
```

```csharp
using System;
using System.Windows.Input;

namespace KeyboardShortcutsMenuBar;

public class MainViewModel
{
    public ICommand CutCommand { get; } = new RelayCommand(() => { });
    public ICommand CopyCommand { get; } = new RelayCommand(() => { });
    public ICommand PasteCommand { get; } = new RelayCommand(() => { });
}

// A minimal ICommand for the purposes of this preview. 
// You can use CommunityToolkit.Mvvm in a real app.
public class RelayCommand : ICommand
{
    private readonly Action _execute;

    public RelayCommand(Action execute) => _execute = execute;

    public event EventHandler? CanExecuteChanged { add { } remove { } }

    public bool CanExecute(object? parameter) => true;

    public void Execute(object? parameter) => _execute();
}
```

</XamlPreview>

### Creating the key binding

To ensure the keyboard shortcut works even when the menu is closed, register the `KeyBinding` on the window or parent control.

```xml
<Window.KeyBindings>
    <KeyBinding Gesture="Ctrl+S" Command="{Binding SaveCommand}" />
    <KeyBinding Gesture="Ctrl+Shift+S" Command="{Binding SaveAsCommand}" />
</Window.KeyBindings>
```

:::warning
If you set `InputGesture` without a matching `KeyBinding`, the shortcut text appears in the menu, but pressing the key combination does nothing.
:::

### Platform-aware shortcuts

You can make key bindings adapt to the target platform, e.g., <kbd>Cmd</kbd> replacing <kbd>Ctrl</kbd> on macOS. To do this, define different key bindings per platform, or use Avalonia's `KeyModifiers.Meta`.

```csharp
var gesture = RuntimeInformation.IsOSPlatform(OSPlatform.OSX)
    ? new KeyGesture(Key.S, KeyModifiers.Meta)
    : new KeyGesture(Key.S, KeyModifiers.Control);
```

## Menu with icons

Add icons to your menu items using the `MenuItem.Icon` property. You can use `PathIcon` for a vector icon:

```xml
<MenuItem Header="Copy">
    <MenuItem.Icon>
        <PathIcon Data="{StaticResource copy_icon}" />
    </MenuItem.Icon>
</MenuItem>
```

Or `Image` for a bitmap icon:

```xml
<MenuItem Header="Copy">
    <MenuItem.Icon>
        <Image Source="/Assets/copy.png" Width="16" Height="16" />
    </MenuItem.Icon>
</MenuItem>
```

:::tip
`PathIcon` scales cleanly at any DPI and is the recommended approach for most icons. Use `Image` only for complex artwork that cannot be drawn as a vector path.
:::

## Toggle menu items

For menu items that toggle on and off, such as text formatting or word wrap, you can use a checkbox to indicate whether it is active. To do so, place a `CheckBox` inside `MenuItem.Icon`.

<Tabs>

<TabItem value="xaml" label="MainWindow.axaml">

```xml
<MenuItem Header="Word Wrap"
          Command="{Binding ToggleWordWrapCommand}">
    <MenuItem.Icon>
        <CheckBox IsChecked="{Binding IsWordWrapEnabled}"
                  BorderThickness="0"
                  Background="Transparent"
                  Content="" />
    </MenuItem.Icon>
</MenuItem>
```

</TabItem>

<TabItem value="csharp" label="MainViewModel.cs">

```csharp
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace ToggleMenuItems.ViewModels;

public partial class MainViewModel : ViewModelBase
{
    [RelayCommand]
    private void ToggleWordWrap()
    {
        IsWordWrapEnabled = !IsWordWrapEnabled;
    }
    
    [ObservableProperty]
    private bool _isWordWrapEnabled;
}
```

</TabItem>

</Tabs>

An alternative approach is to bind a `PathIcon` to the same `IsWordWrapEnabled` property to create an icon that indicates when the toggle is active. 

```xml
<MenuItem Header="Word Wrap"
          Command="{Binding ToggleWordWrapCommand}">
    <MenuItem.Icon>
        <PathIcon Data="{StaticResource checkmark}"
                  IsVisible="{Binding IsWordWrapEnabled}" />
    </MenuItem.Icon>
</MenuItem>
```

:::tip
If your menu item should act like a radio button, with only one item active out of a group of three or more, manage the state in your view model by deselecting the other options when one is selected.
:::

## Submenus

Nest `MenuItem` elements to create submenus. Avalonia displays a flyout arrow and opens a child popup on hover.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:vm="using:SubmenuSample">
  <UserControl.DataContext>
    <vm:MainViewModel />
  </UserControl.DataContext>

  <DockPanel>

    <Menu DockPanel.Dock="Top">
      <MenuItem Header="View">
        <MenuItem Header="Zoom">
          <MenuItem Header="Zoom In" Command="{Binding ZoomInCommand}" />
          <MenuItem Header="Zoom Out" Command="{Binding ZoomOutCommand}" />
          <MenuItem Header="Reset Zoom" Command="{Binding ResetZoomCommand}" />
        </MenuItem>
      <MenuItem Header="Panels">
        <MenuItem Header="Explorer" Command="{Binding ToggleExplorerCommand}" />
        <MenuItem Header="Output" Command="{Binding ToggleOutputCommand}" />
    </MenuItem>
</MenuItem>
    </Menu>

    <ContentControl>
      <TextBlock Text="Main window content goes here" Padding="20" Background="Gray" />
    </ContentControl>

  </DockPanel>
</UserControl>
```

```csharp
using System;
using System.Windows.Input;

namespace SubmenuSample;

public class MainViewModel
{
    // Replace each empty lambda with your command logic.
    public ICommand ZoomInCommand { get; } = new RelayCommand(() => { });
    public ICommand ZoomOutCommand { get; } = new RelayCommand(() => { });
    public ICommand ResetZoomCommand { get; } = new RelayCommand(() => { });
    public ICommand ToggleExplorerCommand { get; } = new RelayCommand(() => { });
    public ICommand ToggleOutputCommand { get; } = new RelayCommand(() => { });
}

// A minimal ICommand for the purposes of this preview. 
// You can use CommunityToolkit.Mvvm in a real app.
public class RelayCommand : ICommand
{
    private readonly Action _execute;

    public RelayCommand(Action execute) => _execute = execute;

    public event EventHandler? CanExecuteChanged { add { } remove { } }

    public bool CanExecute(object? parameter) => true;

    public void Execute(object? parameter) => _execute();
}
```

</XamlPreview>

## Dynamic menus from a collection

Bind `ItemsSource` to generate menu items from a data collection. This can be used for recent files, window lists, plugin actions or similar dynamic functions.

Below is an example that generates a list of recent files. An independent `Models/RecentFile.cs` class is used with an `ObservableCollection` in the main view model to create the collection, which can then be bound using `ItemContainerTheme` to map properties.

Note that the `ControlTheme` inside `ItemContainerTheme` must have its data type set to the `RecentFile` model.

<Tabs>

<TabItem value="window" label="MainWindow.axaml">

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:DynamicMenuSample.ViewModels"
        xmlns:models="using:DynamicMenuSample.Models"
        x:Class="DynamicMenuSample.Views.MainWindow"
        x:DataType="vm:MainViewModel">

  <Menu>
    <MenuItem Header="Recent Files" ItemsSource="{Binding RecentFiles}">
      <MenuItem.ItemContainerTheme>
        <ControlTheme TargetType="MenuItem"
                      BasedOn="{StaticResource {x:Type MenuItem}}"
                      x:DataType="models:RecentFile">
          <Setter Property="Header"
                  Value="{Binding Name}" />
          <Setter Property="Command" 
                  Value="{Binding OpenCommand}" />
          <Setter Property="CommandParameter"
                  Value="{Binding Path}" />
        </ControlTheme>
      </MenuItem.ItemContainerTheme>
    </MenuItem>
  </Menu>

</Window>
```

</TabItem>

<TabItem value="view-model" label="MainViewModel.cs">

```csharp
using System.Collections.ObjectModel;
using DynamicMenuSample.Models;

namespace DynamicMenuSample.ViewModels;

public partial class MainViewModel : ViewModelBase
{
    public ObservableCollection<RecentFile> RecentFiles { get; } = new();
}

```

</TabItem>

<TabItem value="model" label="RecentFile.cs">

```csharp
using System.Windows.Input;

namespace DynamicMenuSample.Models;

public class RecentFile
{
    public string? Name { get; set; }
    public string? Path { get; set; }
    public ICommand? OpenCommand { get; set; }
}

```

</TabItem>

</Tabs>

As an alternative to `ItemContainerTheme`, you can use `DataTemplates`:

```xml
<MenuItem Header="Recent Files" ItemsSource="{Binding RecentFiles}">
  <MenuItem.DataTemplates>
    <DataTemplate DataType="models:RecentFile">
      <TextBlock Text="{Binding Name}" />
    </DataTemplate>
  </MenuItem.DataTemplates>
</MenuItem>
```

### Showing an empty-state message

Add a placeholder item that is displayed if the collection is empty:

```csharp
public IEnumerable<object> RecentFilesOrPlaceholder =>
    RecentFiles.Any()
        ? RecentFiles
        : new object[] { new MenuItem { Header = "(No recent files)", IsEnabled = false } };
```

### Updating dynamic menus

In the above example, `RecentFiles` is an `ObservableCollection`, meaning it updates automatically whenever you add or remove items.

If you need to replace an entire collection, raise `PropertyChanged` so the binding refreshes.

## Context menu

The `ContextMenu` property allows you to attach a context menu to another control. The menu opens when the user right-clicks, or performs an equivalent gesture.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:vm="using:ContextMenuSample">
  <UserControl.DataContext>
    <vm:MainViewModel />
  </UserControl.DataContext>

  <ListBox ItemsSource="{Binding Items}"
           SelectedItem="{Binding SelectedItem}">

    <!-- Must have an ItemTemplate or the items won't display. -->
    <ListBox.ItemTemplate>
      <DataTemplate DataType="vm:Item">
        <TextBlock Text="{Binding Name}" />
      </DataTemplate>
    </ListBox.ItemTemplate>

    <ListBox.ContextMenu>
      <ContextMenu>
        <MenuItem Header="Edit"
                  Command="{Binding EditCommand}" />
        <MenuItem Header="Delete"
                  Command="{Binding DeleteCommand}" />
        <Separator />
        <MenuItem Header="Properties"
                  Command="{Binding PropertiesCommand}" />
      </ContextMenu>
    </ListBox.ContextMenu>
  </ListBox>

</UserControl>
```

```csharp
using System;
using System.Collections.ObjectModel;
using System.Windows.Input;

namespace ContextMenuSample;

public class MainViewModel
{
    // Replace each empty lambda with your command logic.
    public ICommand EditCommand { get; } = new RelayCommand(() => { });
    public ICommand DeleteCommand { get; } = new RelayCommand(() => { });
    public ICommand PropertiesCommand { get; } = new RelayCommand(() => { });

    // Create the collection that displays in the ListBox.
    public ObservableCollection<Item> Items { get; set; } = new()
    {
        new Item("Item 1"),
        new Item("Item 2"),
        new Item("Item 3"),
    };

    // Define the selected item.
    private Item? _selectedItem;

    public Item? SelectedItem { get; set; }
}

// A basic item to fill out the collection.
public class Item
{
    public string Name { get; set; }

    public Item(string name)
    {
        Name = name;
    }
}

// A minimal ICommand for the purposes of this preview. 
// You can use CommunityToolkit.Mvvm in a real app.
public class RelayCommand : ICommand
{
    private readonly Action _execute;

    public RelayCommand(Action execute) => _execute = execute;

    public event EventHandler? CanExecuteChanged { add { } remove { } }

    public bool CanExecute(object? parameter) => true;

    public void Execute(object? parameter) => _execute();
}
```

</XamlPreview>

### Passing the clicked item

Use `CommandParameter` with a binding to pass the relevant item to your command.

```xml
<ListBox.ContextMenu>
  <ContextMenu>
    <MenuItem Header="Delete"
              Command="{Binding DeleteCommand}"
              CommandParameter="{Binding $parent[ListBox].SelectedItem}" />
  </ContextMenu>
</ListBox.ContextMenu>
```

:::tip
The `$parent[ListBox]` syntax walks up the visual tree to find the nearest `ListBox` ancestor. This is necessary because `ContextMenu` exists in a separate part of the tree from its placement target.
:::

### Disabling items based on state

If your command implements `ICommand.CanExecute`, the `MenuItem` is automatically disabled when `CanExecute` returns `false`. With the `CommunityToolkit.Mvvm` source generators, you can also use the `[RelayCommand(CanExecute = ...)]` attribute.

```csharp
[RelayCommand(CanExecute = nameof(CanDelete))]
private void Delete(object item)
{
    // Delete logic
}

private bool CanDelete(object item) => item is not null;
```

### Context menu in code

You can create or modify a context menu in code-behind:

```csharp
var contextMenu = new ContextMenu
{
    ItemsSource = new[]
    {
        new MenuItem { Header = "Cut", Command = CutCommand },
        new MenuItem { Header = "Copy", Command = CopyCommand },
        new MenuItem { Header = "Paste", Command = PasteCommand },
    }
};
myControl.ContextMenu = contextMenu;
```

## Opening and closing events

Handle menu lifecycle events to customize items at runtime or conditionally prevent the menu from opening:

```xml title="XAML"
<ContextMenu Opening="ContextMenu_Opening"
             Closing="ContextMenu_Closing">
```

```csharp title="C#"
private void ContextMenu_Opening(object? sender, CancelEventArgs e)
{
    // Customize items based on current state.
    // Set e.Cancel = true to prevent the menu from opening.
    if (sender is ContextMenu menu)
    {
        var canPaste = CheckClipboardContent();
        // Enable or disable items dynamically
    }
}

private void ContextMenu_Closing(object? sender, EventArgs e)
{
    // Clean up or log when the menu closes.
}
```

## `ContextFlyout` alternative

Use `ContextFlyout` when you need richer content than a simple list of menu items. A context flyout can contain additional controls, allowing more complex customization.

<XamlPreview>

```xml
<Border xmlns="https://github.com/avaloniaui"
        Background="Gray"
        Padding="20">
  <Border.ContextFlyout>
    <Flyout>
      <StackPanel Spacing="8"
                  Width="200">
        <TextBlock Text="Custom flyout content"
                   FontWeight="Bold" />
        <TextBox PlaceholderText="Enter value..." />
        <Button Content="Apply" />
      </StackPanel>
    </Flyout>
  </Border.ContextFlyout>
  <TextBlock Text="Right-click for flyout" />
</Border>
```

</XamlPreview>
<br />

:::caution
A control cannot have both a `ContextMenu` and a `ContextFlyout`. If you set both, only one will work.
:::

## `NativeMenu` (macOS)

On macOS, use [`NativeMenu`](/controls/menus/nativemenu) to integrate a native look with the system menu bar that appears at the top of the screen.

```xml
<NativeMenu.Menu>
  <NativeMenu>
    <NativeMenuItem Header="About MyApp"
                    Command="{Binding AboutCommand}" />
    <NativeMenuItemSeparator />
    <NativeMenuItem Header="Preferences..."
                    Command="{Binding PreferencesCommand}" />
  </NativeMenu>
</NativeMenu.Menu>
```

:::note
`NativeMenu` is ignored on platforms other than macOS. You can safely include it without conditional compilation. On Windows and Linux, use the standard [`Menu`](/controls/menus/menu) instead.
:::

## See also

- [Hotkeys](/docs/input-interaction/keyboard-and-hotkeys): Registering keyboard shortcuts and key bindings.
- [Commanding](/docs/input-interaction/commanding): Using commands with controls.
- [Data binding to commands](/docs/data-binding/binding-to-commands): Binding commands in MVVM patterns.
