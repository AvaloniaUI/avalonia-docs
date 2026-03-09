---
id: menu-how-to
title: "How to: Work with Menus"
description: Learn how to use Menu, ContextMenu, and NativeMenu controls in Avalonia, including commands, keyboard shortcuts, dynamic items, checked items, submenus, and right-click context menus.
doc-type: how-to
---

This guide covers [`Menu`](/api/avalonia/controls/menu) and [`ContextMenu`](/api/avalonia/controls/contextmenu) patterns in Avalonia, including commands, keyboard shortcuts, dynamic menus, checked items, submenus, and right-click context menus.

## Basic menu bar

Place a `Menu` inside a `DockPanel` docked to the top of your window:

```xml
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
    <ContentControl Content="{Binding CurrentView}" />
</DockPanel>
```

The underscore before a letter defines the accelerator key (Alt+key). For example, `_File` lets users press Alt+F to open the File menu.

:::tip
Use a `Separator` element between [`MenuItem`](/api/avalonia/controls/menuitem) entries to create a visual divider that groups related actions.
:::

## Menu with keyboard shortcuts

Use `InputGesture` to display a shortcut hint next to a menu item. Note that `InputGesture` only displays the text. You must also register the actual key binding separately for the shortcut to function.

```xml
<MenuItem Header="_Save" Command="{Binding SaveCommand}"
          InputGesture="Ctrl+S" />
<MenuItem Header="Save _As..." Command="{Binding SaveAsCommand}"
          InputGesture="Ctrl+Shift+S" />
```

Register the key binding on the window or a parent control so the shortcut works even when the menu is closed:

```xml
<Window.KeyBindings>
    <KeyBinding Gesture="Ctrl+S" Command="{Binding SaveCommand}" />
    <KeyBinding Gesture="Ctrl+Shift+S" Command="{Binding SaveAsCommand}" />
</Window.KeyBindings>
```

:::caution
If you set `InputGesture` without a matching `KeyBinding`, the shortcut text appears in the menu but pressing the key combination does nothing. Always pair the two.
:::

### Platform-aware shortcuts

On macOS, you may want to use Cmd instead of Ctrl. You can handle this by defining different key bindings per platform or by using Avalonia's `KeyModifiers.Meta` in code:

```csharp
var gesture = RuntimeInformation.IsOSPlatform(OSPlatform.OSX)
    ? new KeyGesture(Key.S, KeyModifiers.Meta)
    : new KeyGesture(Key.S, KeyModifiers.Control);
```

## Menu with icons

Add icons to your menu items using the `MenuItem.Icon` property. You can use a `PathIcon` with a geometry resource:

```xml
<MenuItem Header="Copy">
    <MenuItem.Icon>
        <PathIcon Data="{StaticResource copy_regular}" />
    </MenuItem.Icon>
</MenuItem>
```

Or use an `Image` for bitmap icons:

```xml
<MenuItem Header="Open">
    <MenuItem.Icon>
        <Image Source="/Assets/open.png" Width="16" Height="16" />
    </MenuItem.Icon>
</MenuItem>
```

:::tip
`PathIcon` scales cleanly at any DPI and is the recommended approach for most icons. Reserve `Image` for complex bitmap artwork that cannot be represented as a vector path.
:::

## Checked menu items

You can simulate a checked menu item by placing a `CheckBox` inside `MenuItem.Icon`:

```xml
<MenuItem Header="Word Wrap"
          Command="{Binding ToggleWordWrapCommand}">
    <MenuItem.Icon>
        <CheckBox IsChecked="{Binding IsWordWrapEnabled}"
                  BorderThickness="0" Background="Transparent"
                  Content="" />
    </MenuItem.Icon>
</MenuItem>
```

A simpler approach uses a view model property with a checkmark icon that toggles visibility:

```csharp
[ObservableProperty]
private bool _isWordWrapEnabled;

[RelayCommand]
private void ToggleWordWrap()
{
    IsWordWrapEnabled = !IsWordWrapEnabled;
}
```

```xml
<MenuItem Header="Word Wrap" Command="{Binding ToggleWordWrapCommand}">
    <MenuItem.Icon>
        <PathIcon Data="{StaticResource checkmark_regular}"
                  IsVisible="{Binding IsWordWrapEnabled}" />
    </MenuItem.Icon>
</MenuItem>
```

:::note
If your menu item should act like a radio button (only one item active in a group), manage the state in your view model by deselecting the other options when one is selected.
:::

## Submenus

Nest `MenuItem` elements to create submenus. Avalonia displays a flyout arrow and opens a child popup on hover:

```xml
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
```

Avoid nesting submenus more than two levels deep, as deeply nested menus are difficult for users to navigate.

## Dynamic menus from a collection

Bind `ItemsSource` to generate menu items dynamically from a data collection. This is useful for scenarios like recent files, window lists, or plugin-contributed actions.

Define your data model and collection:

```csharp
public ObservableCollection<RecentFile> RecentFiles { get; } = new();

public class RecentFile
{
    public string Name { get; set; }
    public string Path { get; set; }
    public ICommand OpenCommand { get; set; }
}
```

Bind the collection using `ItemContainerTheme` to map properties:

```xml
<MenuItem Header="Recent Files" ItemsSource="{Binding RecentFiles}">
    <MenuItem.ItemContainerTheme>
        <ControlTheme TargetType="MenuItem" BasedOn="{StaticResource {x:Type MenuItem}}">
            <Setter Property="Header" Value="{Binding Name}" />
            <Setter Property="Command" Value="{Binding OpenCommand}" />
            <Setter Property="CommandParameter" Value="{Binding Path}" />
        </ControlTheme>
    </MenuItem.ItemContainerTheme>
</MenuItem>
```

Alternatively, use `DataTemplates` if you only need to customize the displayed content:

```xml
<MenuItem Header="Recent Files" ItemsSource="{Binding RecentFiles}">
    <MenuItem.DataTemplates>
        <DataTemplate DataType="vm:RecentFile">
            <TextBlock Text="{Binding Name}" />
        </DataTemplate>
    </MenuItem.DataTemplates>
</MenuItem>
```

### Showing an empty-state message

When your collection might be empty, you can swap in a disabled placeholder item:

```csharp
public IEnumerable<object> RecentFilesOrPlaceholder =>
    RecentFiles.Any()
        ? RecentFiles
        : new object[] { new MenuItem { Header = "(No recent files)", IsEnabled = false } };
```

### Updating dynamic menus

Because `RecentFiles` is an `ObservableCollection`, the menu updates automatically when you add or remove items. If you replace the entire collection, raise `PropertyChanged` so the binding refreshes.

## Context menu

Attach a context menu to any control using the `ContextMenu` property. The menu opens when the user right-clicks (or performs the platform-equivalent gesture):

```xml
<ListBox ItemsSource="{Binding Items}" SelectedItem="{Binding SelectedItem}">
    <ListBox.ContextMenu>
        <ContextMenu>
            <MenuItem Header="Edit" Command="{Binding EditCommand}" />
            <MenuItem Header="Delete" Command="{Binding DeleteCommand}" />
            <Separator />
            <MenuItem Header="Properties" Command="{Binding PropertiesCommand}" />
        </ContextMenu>
    </ListBox.ContextMenu>
</ListBox>
```

### Passing the clicked item

Use `CommandParameter` with a binding to pass the relevant item to your command:

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
The `$parent[ListBox]` syntax walks up the visual tree to find the nearest `ListBox` ancestor. This is necessary because `ContextMenu` exists in a separate visual tree from its placement target.
:::

### Disabling items based on state

If your command implements `ICommand.CanExecute`, the `MenuItem` is automatically disabled when `CanExecute` returns `false`. With the CommunityToolkit MVVM source generators, you can use the `[RelayCommand(CanExecute = ...)]` attribute:

```csharp
[RelayCommand(CanExecute = nameof(CanDelete))]
private void Delete(object item)
{
    // delete logic
}

private bool CanDelete(object item) => item is not null;
```

## Context menu in code

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

```xml
<ContextMenu Opening="ContextMenu_Opening" Closing="ContextMenu_Closing">
```

```csharp
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

Use `ContextFlyout` when you need richer content than a simple list of menu items. A flyout can contain any layout of controls:

```xml
<Border Background="LightGray" Padding="20">
    <Border.ContextFlyout>
        <Flyout>
            <StackPanel Spacing="8" Width="200">
                <TextBlock Text="Custom flyout content" FontWeight="Bold" />
                <TextBox PlaceholderText="Enter value..." />
                <Button Content="Apply" />
            </StackPanel>
        </Flyout>
    </Border.ContextFlyout>
    <TextBlock Text="Right-click for flyout" />
</Border>
```

:::caution
A control cannot have both a `ContextMenu` and a `ContextFlyout` at the same time. If you set both, only one will work. Choose `ContextMenu` for standard menu item lists and `ContextFlyout` for custom layouts.
:::

## [`NativeMenu`](/api/avalonia/controls/nativemenu) (macOS)

On macOS, use `NativeMenu` to integrate with the system menu bar that appears at the top of the screen. This provides a native look and feel that macOS users expect:

```xml
<NativeMenu.Menu>
    <NativeMenu>
        <NativeMenuItem Header="About MyApp" Command="{Binding AboutCommand}" />
        <NativeMenuItemSeparator />
        <NativeMenuItem Header="Preferences..." Command="{Binding PreferencesCommand}" />
    </NativeMenu>
</NativeMenu.Menu>
```

:::note
`NativeMenu` is ignored on platforms other than macOS. You can safely include it in your AXAML without conditional compilation. On Windows and Linux, use the standard `Menu` control instead.
:::

## See also

- [Hotkeys](../input-interaction/hotkeys.md): Registering keyboard shortcuts and key bindings.
- [Commanding](../input-interaction/commanding.md): Using commands with controls.
- [Data binding to commands](../data-binding/binding-to-commands.md): Binding commands in MVVM patterns.
