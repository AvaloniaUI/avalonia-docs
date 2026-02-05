---
id: splitbutton
title: SplitButton
---

# SplitButton

import SplitButtonPaletteFlyoutScreenshot from '/img/controls/buttons/splitbutton/splitbutton-palette-flyout.png';

The `SplitButton` functions as a [`Button`](/controls/input/buttons/button) with primary and secondary parts that can each be pressed separately. The primary part behaves like normal `Button` and the secondary part opens a [`Flyout`](/controls/menus/flyouts) with additional actions.

## Is this the right control?

A `SplitButton` should only be composed of similar actions. Fundamentally, this control is used to group common actions together where one has clear priority over the others. The most common action should be the default and what is shown in the primary part of the SplitButton. Less-common actions should be added to the flyout which is shown when the secondary (drop down) part is pressed.

:::info
The user-selection action should be invoked immediately when pressing either the primary part or a secondary action in the flyout. All pressed actions, whether primary or secondary, are immediate.
:::

## Common properties

| Property  | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `Content` | The content to display in the primary part                     |
| `Flyout`  | The `Flyout` which shows up when the secondary part is clicked |
| `Command` | A command to be invoked when the primary button is clicked     |

## Pseudoclasses

| Pseudoclass    | Description                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:pressed`     | Set when the entire `SplitButton` is pressed using a keyboard input such as Space or Enter. In this state no distinction is made between primary or secondary parts |
| `:flyout-open` | Set when the `Flyout` is open                                                                                                                                       |

## API Reference

[SplitButton](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_SplitButton)

## Source code

[SplitButton.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/SplitButton/SplitButton.cs)

## Examples

### Basic example

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             Padding="20">
  <SplitButton Content="Content">
    <SplitButton.Flyout>
        <MenuFlyout Placement="Bottom">
            <MenuItem Header="Item 1">
                <MenuItem Header="Subitem 1" />
                <MenuItem Header="Subitem 2" />
                <MenuItem Header="Subitem 3" />
            </MenuItem>
            <MenuItem Header="Item 2"
                      InputGesture="Ctrl+A" />
            <MenuItem Header="Item 3" />
        </MenuFlyout>
    </SplitButton.Flyout>
  </SplitButton>
</UserControl>
```

</XamlPreview>

### Color selection example

A common use case of a `SplitButton` is for coloring text within an editor. Pressing the primary part of the `SplitButton` will apply the current color to the selected text. Pressing the secondary part will open a `Flyout` and allow another color to be specified and applied. Again note that when another color is specified in the `Flyout`, the selected text color will immediately change and the current color will be updated as well.

<img src={SplitButtonPaletteFlyoutScreenshot} alt=""/>

```xml
<!-- We have the following DataTemplate defined -->
<DataTemplate DataType="Color">
   <Border CornerRadius="4" Width="20" Height="20" BorderBrush="Gray" BorderThickness="1">
    <Border.Background>
       <SolidColorBrush Color="{Binding}" />
   </Border.Background>
  </Border>
</DataTemplate>
```

```xml
<!-- SelectedColor, ChangeColorCommand and AvailableColors are properties of our ViewModel -->
<SplitButton Content="{Binding SelectedColor}" 
             Command="{Binding ChangeColorCommand}">
  <SplitButton.Flyout>
    <Flyout Placement="Bottom">
      <ListBox ItemsSource="{Binding AvailableColors}" 
               SelectedItem="{Binding SelectedColor}" 
               Height="200" Width="200">
        <ListBox.ItemsPanel>
          <ItemsPanelTemplate>
            <WrapPanel />
          </ItemsPanelTemplate>
        </ListBox.ItemsPanel>
      </ListBox>
    </Flyout>
  </SplitButton.Flyout>
</SplitButton>
```

### Export button sample

Another common example of the `SplitButton` could be an export button. When the primary part is pressed, data will be exported using default settings. However, if the secondary part is pressed, additional export options could be specified like ‘Export to PNG’, ‘Export to JPG’, etc.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             Padding="20">
  <SplitButton Content="Export to PDF"
               Command="{Binding ExportCommand}"
               CommandParameter=".pdf">
     <SplitButton.Flyout>
          <MenuFlyout Placement="RightEdgeAlignedTop">
              <MenuItem Header="Export to PNG"
                        Command="{Binding ExportCommand}"
                        CommandParameter=".png" />
              <MenuItem Header="Export to JPG"
                        Command="{Binding ExportCommand}"
                        CommandParameter=".jpg" />
         </MenuFlyout>
      </SplitButton.Flyout>
  </SplitButton>
</UserControl>
```

</XamlPreview>

