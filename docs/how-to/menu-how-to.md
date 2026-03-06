---
id: menu-how-to
title: "How to: Work with Menus"
---

This guide covers Menu and ContextMenu patterns: commands, keyboard shortcuts, dynamic menus, checked items, submenus, and right-click context menus.

## Basic Menu Bar

Place a `Menu` inside a `DockPanel` docked to the top:

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

The underscore before a letter defines the accelerator key (Alt+key).

## Menu with Keyboard Shortcuts

Use `InputGesture` to display a shortcut hint. Note: this only displays the text; you must also register the actual key binding separately.

```xml
<MenuItem Header="_Save" Command="{Binding SaveCommand}"
          InputGesture="Ctrl+S" />
<MenuItem Header="Save _As..." Command="{Binding SaveAsCommand}"
          InputGesture="Ctrl+Shift+S" />
```

Register the key binding on the window or a parent control:

```xml
<Window.KeyBindings>
    <KeyBinding Gesture="Ctrl+S" Command="{Binding SaveCommand}" />
    <KeyBinding Gesture="Ctrl+Shift+S" Command="{Binding SaveAsCommand}" />
</Window.KeyBindings>
```

## Menu with Icons

Add icons using `MenuItem.Icon`:

```xml
<MenuItem Header="Copy">
    <MenuItem.Icon>
        <PathIcon Data="{StaticResource copy_regular}" />
    </MenuItem.Icon>
</MenuItem>
```

Or use an `Image`:

```xml
<MenuItem Header="Open">
    <MenuItem.Icon>
        <Image Source="/Assets/open.png" Width="16" Height="16" />
    </MenuItem.Icon>
</MenuItem>
```

## Checked Menu Items

Use `ToggleButton` behavior with a `MenuItem`:

```xml
<MenuItem Header="Word Wrap"
          Icon="{Binding WordWrapIcon}"
          Command="{Binding ToggleWordWrapCommand}">
    <MenuItem.Icon>
        <CheckBox IsChecked="{Binding IsWordWrapEnabled}"
                  BorderThickness="0" Background="Transparent"
                  Content="" />
    </MenuItem.Icon>
</MenuItem>
```

A simpler approach using a view model and a checkmark icon:

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

## Submenus

Nest `MenuItem` elements to create submenus:

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

## Dynamic Menu from a Collection

Bind `ItemsSource` to generate menu items from data:

```csharp
public ObservableCollection<RecentFile> RecentFiles { get; } = new();

public class RecentFile
{
    public string Name { get; set; }
    public string Path { get; set; }
    public ICommand OpenCommand { get; set; }
}
```

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

Alternatively, use `DataTemplates`:

```xml
<MenuItem Header="Recent Files" ItemsSource="{Binding RecentFiles}">
    <MenuItem.DataTemplates>
        <DataTemplate DataType="vm:RecentFile">
            <TextBlock Text="{Binding Name}" />
        </DataTemplate>
    </MenuItem.DataTemplates>
</MenuItem>
```

## Context Menu

Attach a context menu to any control using `ContextMenu`:

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

Use `CommandParameter` with a binding to pass context:

```xml
<ListBox.ContextMenu>
    <ContextMenu>
        <MenuItem Header="Delete"
                  Command="{Binding DeleteCommand}"
                  CommandParameter="{Binding $parent[ListBox].SelectedItem}" />
    </ContextMenu>
</ListBox.ContextMenu>
```

## Context Menu in Code

Attach or modify a context menu in code-behind:

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

## Opening and Closing Events

Handle menu lifecycle events:

```xml
<ContextMenu Opening="ContextMenu_Opening" Closing="ContextMenu_Closing">
```

```csharp
private void ContextMenu_Opening(object sender, System.ComponentModel.CancelEventArgs e)
{
    // Customize items based on current state
    // Set e.Cancel = true to prevent opening
}
```

## ContextFlyout Alternative

Use `ContextFlyout` for richer content than a simple menu:

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
A control cannot have both a `ContextMenu` and a `ContextFlyout` at the same time.
:::

## NativeMenu (macOS)

On macOS, use `NativeMenu` for the system menu bar:

```xml
<NativeMenu.Menu>
    <NativeMenu>
        <NativeMenuItem Header="About MyApp" Command="{Binding AboutCommand}" />
        <NativeMenuItemSeparator />
        <NativeMenuItem Header="Preferences..." Command="{Binding PreferencesCommand}" />
    </NativeMenu>
</NativeMenu.Menu>
```

## See Also

- [Menu Control Reference](/controls/menus/menu): Property tables and examples.
- [ContextMenu Control Reference](/controls/menus/contextmenu): Attached context menu.
- [NativeMenu Control Reference](/controls/menus/nativemenu): macOS native menu bar.
- [Keyboard and Hotkeys](/docs/input-interaction/keyboard-and-hotkeys): Key bindings.
