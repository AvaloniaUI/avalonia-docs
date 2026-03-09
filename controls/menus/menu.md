---
id: menu
title: Menu
---

import MenuTopDockScreenshot from '/img/controls/menu/menu-top-dock.gif';
import MenuIconScreenshot from '/img/controls/menu/menu-icon.gif';

The menu control can add menu structure to an application. You will usually place a menu at the top edge of a dock panel control, so that it is drawn at the top of a window.

:::info
For reference information about the dock panel, see [DockPanel](/controls/layout/panels/dockpanel).
:::

## Menu items

A menu element will usually contain a set of nested `<MenuItem>` elements. The first level of menu items defines the horizontal part of the menu. Subsequent levels of menu items are drop-downs.

The caption of a menu item is set by the `Header` property. The content zone of a menu item can contain sub-items if required.

You can add menu separator lines by including a `<Separator>` element or by adding a menu item with its header set to the minus sign, like this:

```xml
<MenuItem Header="-" />
```

## Useful properties

You will probably use these properties most often:

<table>
  <thead>
    <tr>
      <th width="147.33333333333331">Element</th>
      <th width="190">Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Menu</code></td>
      <td><code>DockPanel.Dock</code></td>
      <td>Position the menu on the top edge of a dock panel.</td>
    </tr>
    <tr>
      <td><code>MenuItem</code></td>
      <td><code>Header</code></td>
      <td>The menu item caption.</td>
    </tr>
    <tr>
      <td><code>MenuItem</code></td>
      <td><code>InputGesture</code></td>
      <td>The displayed key shortcut for the menu item. Setting this property does not cause the input gesture to be handled by the menu item, it displays the gesture text in the menu.</td>
    </tr>
    <tr>
      <td><code>MenuItem</code></td>
      <td><code>Command</code></td>
      <td>The command to be executed when the menu item is clicked or selected with the keyboard.</td>
    </tr>
    <tr>
      <td><code>MenuItem</code></td>
      <td><code>MenuItem.Icon</code></td>
      <td>Contains an icon graphic to display alongside the menu item.</td>
    </tr>
    <tr>
      <td><code>Separator</code></td>
      <td></td>
      <td>A menu item separator line.</td>
    </tr>
    <tr>
      <td></td>
      <td><code>ItemPanel</code></td>
      <td>The container panel to place items in. By default, this is a StackPanel. See [this page](/docs/custom-controls/custom-itemspanel) to customise the ItemsPanel.</td>
    </tr>
    <tr>
      <td></td>
      <td><code>Styles</code></td>
      <td>The style that is applied to any child element of the ItemControl.</td>
    </tr>
  </tbody>
</table>

## Example

This example creates a menu docked at the top edge of a window.

<img src={MenuTopDockScreenshot} alt="" />

```xml
<Window ...>
    <DockPanel>
    <Menu DockPanel.Dock="Top">
      <MenuItem Header="_File">
        <MenuItem Header="_Open..."/>
        <Separator/>
        <MenuItem Header="_Exit"/>
      </MenuItem>
      <MenuItem Header="_Edit">
        <MenuItem Header="Copy"/>
        <MenuItem Header="Paste"/>
      </MenuItem>
    </Menu>
    <TextBlock/>
  </DockPanel>
</Window>
```

## Accelerator keys

An accelerator key is identified by a character in the header preceded by an underscore. For example:

```xml
 <MenuItem Header="_File">
```

It allows the user to access a menu item quickly. It is also sometimes called a hot key, access key or mnemonic. Letters, numbers, and accented characters are all supported as access keys.

The user can access this feature by first pressing the Alt key, and then the accelerator key (or they can be pressed together). This is demonstrated in the second of the menu sequences in the example above.

You will see that accelerator keys, where defined, are underlined on the menu as soon as the Alt key is pressed. Then any sub-menus are dropped down as soon as the accelerator key above is pressed.

Once keyboard interaction has been initiated with the Alt key, the user can also navigate the menus using the keyboard arrow keys. Menu items may be selected using the Enter key on the keyboard.

## Menu commands

To initiate an action, the command property of a menu item can be bound to an `ICommand` object. The command will be executed when the menu item is clicked or selected with the keyboard. For example:

```xml
<Menu>
    <MenuItem Header="_File">
        <MenuItem Header="_Open..." Command="{Binding OpenCommand}"/>
    </MenuItem>
</Menu>
```

:::info
For guidance on how to bind to commands, see [Adding interactivity](/docs/input-interaction/adding-interactivity).
:::

## Toggle and radio menu items

Set the `ToggleType` property on a `MenuItem` to create checkable or radio-style menu items:

```xml
<MenuItem Header="_View">
    <MenuItem Header="Show Toolbar" ToggleType="CheckBox" IsChecked="{Binding ShowToolbar}" />
    <MenuItem Header="Show Status Bar" ToggleType="CheckBox" IsChecked="{Binding ShowStatusBar}" />
    <Separator />
    <MenuItem Header="Light" ToggleType="Radio" GroupName="Theme"
              IsChecked="{Binding IsLightTheme}" />
    <MenuItem Header="Dark" ToggleType="Radio" GroupName="Theme"
              IsChecked="{Binding IsDarkTheme}" />
</MenuItem>
```

| ToggleType | Behavior |
|---|---|
| `None` | Standard menu item (default). |
| `CheckBox` | Toggles `IsChecked` independently. |
| `Radio` | Only one item in the same `GroupName` can be checked at a time. |

## Menu icons

A menu icon can be displayed by placing an image or a path icon in the `<MenuItem.Icon>` attached property.

<img src={MenuIconScreenshot} alt="" />

```xml
<MenuItem Header="_Edit">
  <MenuItem Header="Copy">
     <MenuItem.Icon>
        <PathIcon Data="{StaticResource copy_regular}"/>
     </MenuItem.Icon>
  </MenuItem>
  <MenuItem Header="Paste">
     <MenuItem.Icon>
        <PathIcon Data="{StaticResource clipboard_paste_regular}"/>
     </MenuItem.Icon>
  </MenuItem>
</MenuItem>
```

:::info
For more detailed guidance on how to add icons to your menus, see [Adding icons](/docs/graphics-animation/adding-icons).
:::

## See also

- [Menu API reference](/api/avalonia/controls/menu)
- [`Menu.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Menu.cs)
