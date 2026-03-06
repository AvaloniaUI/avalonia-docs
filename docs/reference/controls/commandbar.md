---
title: CommandBar
description: REFERENCE - Built-in Controls
---

import CommandBarLabelBottomScreenshot from '/img/reference/controls/commandbar/commandbar-label-bottom.png';
import CommandBarLabelRightScreenshot from '/img/reference/controls/commandbar/commandbar-label-right.png';
import CommandBarLabelCollapsedScreenshot from '/img/reference/controls/commandbar/commandbar-label-collapsed.png';
import CommandBarSecondaryCommandsScreenshot from '/img/reference/controls/commandbar/commandbar-secondary-commands.png';
import CommandBarContentScreenshot from '/img/reference/controls/commandbar/commandbar-content.png';
import CommandBarToggleButtonScreenshot from '/img/reference/controls/commandbar/commandbar-toggle-button.png';

# CommandBar

`CommandBar` is a toolbar that displays a row of primary command buttons with an optional overflow menu for secondary commands. Primary commands are always visible in the bar. Secondary commands appear in a popup revealed by the overflow button (`...`). When `IsDynamicOverflowEnabled` is `true`, primary commands that do not fit in the available width are automatically moved to the overflow.

The items in a `CommandBar` implement the `ICommandBarElement` interface. The built-in implementations are `AppBarButton`, `AppBarToggleButton`, and `AppBarSeparator`.

## CommandBar Properties

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `PrimaryCommands` | `IList<ICommandBarElement>?` | `null` | Commands displayed directly in the bar. |
| `SecondaryCommands` | `IList<ICommandBarElement>?` | `null` | Commands displayed in the overflow popup. |
| `Content` | `object?` | `null` | Custom content displayed at the leading edge of the bar, before the commands. |
| `DefaultLabelPosition` | `CommandBarDefaultLabelPosition` | `Bottom` | How labels are positioned on all command buttons. See the values table below. |
| `IsDynamicOverflowEnabled` | `bool` | `false` | When `true`, primary commands that do not fit are automatically moved to the overflow popup. |
| `OverflowButtonVisibility` | `CommandBarOverflowButtonVisibility` | `Auto` | Controls when the overflow button is shown. See the values table below. |
| `IsOpen` | `bool` | `false` | Whether the overflow popup is currently open. Bindable. |
| `IsSticky` | `bool` | `false` | When `true`, the overflow popup stays open after a command is invoked. |
| `HasSecondaryCommands` | `bool` | computed | Read-only. `true` when the overflow popup contains at least one command. |
| `IsOverflowButtonVisible` | `bool` | computed | Read-only. `true` when the overflow button is currently rendered. |
| `VisiblePrimaryCommands` | `ReadOnlyObservableCollection<ICommandBarElement>` | computed | Read-only. Primary commands currently visible in the bar (not moved to overflow). |
| `OverflowItems` | `ReadOnlyObservableCollection<ICommandBarElement>` | computed | Read-only. Items currently shown in the overflow popup (secondary commands plus any dynamic overflow items). |

## CommandBar Events

| Event | Description |
| ----- | ----------- |
| `Opening` | Raised when the overflow popup is about to open. |
| `Opened` | Raised when the overflow popup has opened. |
| `Closing` | Raised when the overflow popup is about to close. |
| `Closed` | Raised when the overflow popup has closed. |

## DefaultLabelPosition Values

| Value | Description |
| ----- | ----------- |
| `Bottom` | Default. Label is displayed below the icon. |
| `Right` | Label is displayed to the right of the icon. Useful for wider bars where horizontal space is available. |
| `Collapsed` | No label is shown. Icon only. Add a `ToolTip.Tip` for accessibility. |

## OverflowButtonVisibility Values

| Value | Description |
| ----- | ----------- |
| `Auto` | Default. The overflow button appears only when `SecondaryCommands` is non-empty or dynamic overflow is active. |
| `Visible` | The overflow button is always shown, even when there are no secondary commands. |
| `Collapsed` | The overflow button is never shown. |

## AppBarButton Properties

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `Label` | `string?` | `null` | Text label shown below or beside the icon, depending on `DefaultLabelPosition`. |
| `Icon` | `object?` | `null` | Icon content. Typically a `PathIcon`. |
| `IsCompact` | `bool` | `false` | When `true`, the label is hidden and the button takes less space. Set automatically by `CommandBar`. |
| `DynamicOverflowOrder` | `int` | `0` | Priority for dynamic overflow. Items with a higher value move to overflow first. Items with the same value overflow together. |
| `IsInOverflow` | `bool` | `false` | Read-only. `true` when the button is currently shown in the overflow popup. |

`AppBarButton` also supports `Command`, `CommandParameter`, and the standard `Click` event inherited from `Button`.

## AppBarToggleButton Properties

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `Label` | `string?` | `null` | Text label. |
| `Icon` | `object?` | `null` | Icon content. Typically a `PathIcon`. |
| `IsChecked` | `bool?` | `false` | Whether the button is in the checked state. Nullable for three-state support. |
| `IsCompact` | `bool` | `false` | When `true`, the label is hidden. |
| `DynamicOverflowOrder` | `int` | `0` | Priority for dynamic overflow. |
| `IsInOverflow` | `bool` | `false` | Read-only. `true` when shown in overflow. |

`AppBarToggleButton` raises `IsCheckedChanged` when its state changes.

## AppBarSeparator

`AppBarSeparator` draws a visual divider between groups of commands. It has no label or icon. It implements `ICommandBarElement` so it can be placed in `PrimaryCommands` or `SecondaryCommands`.

## Example

### Basic CommandBar in XAML

```xml
<CommandBar>
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Save" Click="OnSaveClick">
            <AppBarButton.Icon>
                <PathIcon Data="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
            </AppBarButton.Icon>
        </AppBarButton>
        <AppBarButton Label="Share" Click="OnShareClick">
            <AppBarButton.Icon>
                <PathIcon Data="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19C20.92,17.39 19.61,16.08 18,16.08Z" />
            </AppBarButton.Icon>
        </AppBarButton>
    </CommandBar.PrimaryCommands>
    <CommandBar.SecondaryCommands>
        <AppBarButton Label="Export" Click="OnExportClick" />
        <AppBarButton Label="Print"  Click="OnPrintClick" />
    </CommandBar.SecondaryCommands>
</CommandBar>
```

### Primary and Secondary Commands with Separators

```xml
<CommandBar>
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="New">
            <AppBarButton.Icon>
                <PathIcon Data="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </AppBarButton.Icon>
        </AppBarButton>
        <AppBarButton Label="Save">
            <AppBarButton.Icon>
                <PathIcon Data="M15,9H5V5H15M12,19A3..." />
            </AppBarButton.Icon>
        </AppBarButton>
        <AppBarSeparator />
        <AppBarToggleButton Label="Bold" IsCheckedChanged="OnBoldChanged">
            <AppBarToggleButton.Icon>
                <PathIcon Data="M15.6,10.79C17.04,10.07..." />
            </AppBarToggleButton.Icon>
        </AppBarToggleButton>
        <AppBarToggleButton Label="Italic" IsCheckedChanged="OnItalicChanged">
            <AppBarToggleButton.Icon>
                <PathIcon Data="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z" />
            </AppBarToggleButton.Icon>
        </AppBarToggleButton>
        <AppBarSeparator />
        <AppBarButton Label="Share">
            <AppBarButton.Icon>
                <PathIcon Data="M18,16.08C17.24,16.08..." />
            </AppBarButton.Icon>
        </AppBarButton>
    </CommandBar.PrimaryCommands>
    <CommandBar.SecondaryCommands>
        <AppBarButton Label="Export" Click="OnExportClick" />
        <AppBarButton Label="Print"  Click="OnPrintClick" />
        <AppBarSeparator />
        <AppBarButton Label="Delete" Click="OnDeleteClick" />
    </CommandBar.SecondaryCommands>
</CommandBar>
```

<img src={CommandBarSecondaryCommandsScreenshot} alt="" />

### Custom Content Area

The `Content` property places custom content at the leading edge of the bar, before the commands:

```xml
<CommandBar>
    <CommandBar.Content>
        <TextBlock Text="Document Editor"
                   VerticalAlignment="Center"
                   Margin="8,0" />
    </CommandBar.Content>
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Save"  Click="OnSaveClick" />
        <AppBarButton Label="Undo"  Click="OnUndoClick" />
    </CommandBar.PrimaryCommands>
</CommandBar>
```

<img src={CommandBarContentScreenshot} alt="" />

### Label Positions

```xml
<!-- Default: label below icon -->
<CommandBar DefaultLabelPosition="Bottom">
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Save" />
        <AppBarButton Label="Share" />
    </CommandBar.PrimaryCommands>
</CommandBar>

<!-- Label to the right of the icon -->
<CommandBar DefaultLabelPosition="Right">
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Save" />
        <AppBarButton Label="Share" />
    </CommandBar.PrimaryCommands>
</CommandBar>

<!-- Icon only, no label -->
<CommandBar DefaultLabelPosition="Collapsed" OverflowButtonVisibility="Collapsed">
    <CommandBar.PrimaryCommands>
        <AppBarButton ToolTip.Tip="Save" />
        <AppBarButton ToolTip.Tip="Share" />
    </CommandBar.PrimaryCommands>
</CommandBar>
```

When using `Collapsed`, always add `ToolTip.Tip` to preserve accessibility.

<img src={CommandBarLabelBottomScreenshot} alt="" />

<img src={CommandBarLabelRightScreenshot} alt="" />

<img src={CommandBarLabelCollapsedScreenshot} alt="" />

### Dynamic Overflow

Enable `IsDynamicOverflowEnabled` so commands automatically move to overflow when the bar is too narrow. Use `DynamicOverflowOrder` to control which commands move first. Higher values overflow first:

```xml
<CommandBar IsDynamicOverflowEnabled="True">
    <CommandBar.PrimaryCommands>
        <!-- DynamicOverflowOrder 0: stays visible the longest -->
        <AppBarButton Label="New"    DynamicOverflowOrder="0" />
        <AppBarButton Label="Save"   DynamicOverflowOrder="0" />
        <!-- DynamicOverflowOrder 1: moves to overflow next -->
        <AppBarButton Label="Share"  DynamicOverflowOrder="1" />
        <!-- DynamicOverflowOrder 2: moves to overflow first -->
        <AppBarButton Label="Bold"   DynamicOverflowOrder="2" />
        <AppBarButton Label="Italic" DynamicOverflowOrder="2" />
    </CommandBar.PrimaryCommands>
</CommandBar>
```

### Overflow Button Visibility

```xml
<!-- Auto: shown only when needed (default) -->
<CommandBar OverflowButtonVisibility="Auto" />

<!-- Always visible -->
<CommandBar OverflowButtonVisibility="Visible" />

<!-- Never visible -->
<CommandBar OverflowButtonVisibility="Collapsed" />
```

### Sticky Overflow Menu

Keep the overflow popup open after the user invokes a command:

```csharp
commandBar.IsSticky = true;
```

### Controlling Overflow Programmatically

```csharp
// Open the overflow popup
commandBar.IsOpen = true;

// Close it
commandBar.IsOpen = false;
```

### Responding to Overflow Events

```csharp
commandBar.Opened  += (s, e) => Console.WriteLine("Overflow opened");
commandBar.Closed  += (s, e) => Console.WriteLine("Overflow closed");
```

### CommandBar in a ContentPage

Place the bar in `ContentPage.TopCommandBar` so it sits above the page content:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MyApp.EditorPage"
             Header="Editor">

    <ContentPage.TopCommandBar>
        <CommandBar>
            <CommandBar.PrimaryCommands>
                <AppBarButton Label="Undo" Click="OnUndoClick" />
                <AppBarButton Label="Redo" Click="OnRedoClick" />
            </CommandBar.PrimaryCommands>
            <CommandBar.SecondaryCommands>
                <AppBarButton Label="Find and Replace" Click="OnFindClick" />
                <AppBarButton Label="Export"           Click="OnExportClick" />
            </CommandBar.SecondaryCommands>
        </CommandBar>
    </ContentPage.TopCommandBar>

    <TextBox AcceptsReturn="True" Text="{Binding Content}" />

</ContentPage>
```

### CommandBar via NavigationPage Attached Property

When the page is inside a `NavigationPage`, use `NavigationPage.TopCommandBar` to place the bar inside the navigation bar area:

```xml
<ContentPage xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MyApp.ListPage"
             Header="Items"
             NavigationPage.TopCommandBar="{x:Reference Bar}">

    <CommandBar x:Name="Bar">
        <CommandBar.PrimaryCommands>
            <AppBarButton Label="Add"    Click="OnAddClick" />
            <AppBarButton Label="Search" Click="OnSearchClick" />
        </CommandBar.PrimaryCommands>
        <CommandBar.SecondaryCommands>
            <AppBarButton Label="Sort by Name" Click="OnSortByNameClick" />
            <AppBarButton Label="Sort by Date" Click="OnSortByDateClick" />
        </CommandBar.SecondaryCommands>
    </CommandBar>

    <ListBox ItemsSource="{Binding Items}" />

</ContentPage>
```

### MVVM Command Binding

```xml
<CommandBar>
    <CommandBar.PrimaryCommands>
        <AppBarButton Label="Save"
                      Command="{Binding SaveCommand}">
            <AppBarButton.Icon>
                <PathIcon Data="M15,9H5V5H15M12,19..." />
            </AppBarButton.Icon>
        </AppBarButton>
        <AppBarButton Label="Delete"
                      Command="{Binding DeleteCommand}"
                      IsEnabled="{Binding HasSelection}">
            <AppBarButton.Icon>
                <PathIcon Data="M19,4H15.5L14.5..." />
            </AppBarButton.Icon>
        </AppBarButton>
    </CommandBar.PrimaryCommands>
</CommandBar>
```

### Toggle Button State Handling

```csharp
private void OnBoldChanged(object? sender, RoutedEventArgs e)
{
    if (sender is AppBarToggleButton btn)
    {
        bool isBold = btn.IsChecked == true;
        ApplyBold(isBold);
    }
}
```

<img src={CommandBarToggleButtonScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_CommandBar).
:::

:::info
View the source code on _GitHub_ [`CommandBar.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/CommandBar/CommandBar.cs)
:::
