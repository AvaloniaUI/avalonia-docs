---
id: menuflyout
title: MenuFlyout
---

import MenuFlyoutScreenshot from '/img/reference/controls/menuflyout/menuflyout-button.gif';

A `MenuFlyout` allows you to host a simple menu as the flyout for a control. You might use this as an alternative to the [ContextMenu](/controls/menus/contextmenu).

The properties of a menu flyout are the same as for a [Flyout](/controls/layout/containers/flyout).

## Example

This is a simple example of the menu flyout:

<XamlPreview>

```xml
<Button xmlns="https://github.com/avaloniaui"
        Content="Button"
        HorizontalAlignment="Center">
  <Button.Flyout>
    <MenuFlyout>
      <MenuItem Header="Open"/>
      <MenuItem Header="-"/>
      <MenuItem Header="Close"/>        
    </MenuFlyout>
  </Button.Flyout>
</Button>
```

</XamlPreview>

:::info
Note the `<Separator/>` element will not work in a menu flyout. To make a separator line, use a `<MenuItem>` element with the header set to '-' as shown above.
:::

## With Commands and Icons

```xml
<Button Content="Actions">
    <Button.Flyout>
        <MenuFlyout>
            <MenuItem Header="Open" Command="{Binding OpenCommand}">
                <MenuItem.Icon>
                    <PathIcon Data="{StaticResource open_regular}" />
                </MenuItem.Icon>
            </MenuItem>
            <MenuItem Header="-" />
            <MenuItem Header="Delete" Command="{Binding DeleteCommand}"
                      CommandParameter="{Binding SelectedItem}" />
        </MenuFlyout>
    </Button.Flyout>
</Button>
```

## Dynamic MenuFlyout

This is an example for a `MenuFlyout` that is created dynamically during runtime based on a collection `MyMenuItems` with items of type `MyMenuItemViewModel`.

```xml
<Button Content="Button">
  <Button.Flyout>
    <MenuFlyout ItemsSource="{Binding MyMenuItems}">
      <MenuFlyout.ItemContainerTheme>
        <ControlTheme TargetType="MenuItem" BasedOn="{StaticResource {x:Type MenuItem}}" 
          x:DataType="l:MyMenuItemViewModel">

          <Setter Property="Header" Value="{Binding Header}"/>
          <Setter Property="ItemsSource" Value="{Binding Items}"/>
          <Setter Property="Command" Value="{Binding Command}"/>
          <Setter Property="CommandParameter" Value="{Binding CommandParameter}"/>
          
        </ControlTheme>
      </MenuFlyout.ItemContainerTheme>
    </MenuFlyout>
  </Button.Flyout>
</Button>
```

## See also

- [MenuFlyout API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_MenuFlyout)
- [`MenuFlyout.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Flyouts/MenuFlyout.cs)
