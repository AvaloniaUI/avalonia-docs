---
id: menu
title: Menu
---

The `Menu` control adds a top-level menu to an application. A `Menu` is usually placed in a `DockPanel` in a `Window`, docked to the top of the window:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
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
    </DockPanel>
</Window>
```

A menu will usually contain a set of nested `MenuItem`s. The first level of `MenuItem`s represent the items that will be displayed horizontally along the menu. The second level of `MenuItem`s represent the menu items that will be dropped down from the top-level and subsequent nested `MenuItem`s represent sub-menus.

The text of the `MenuItem` is displayed by the `Header` property; the inner content of the `MenuItem` is where the sub-items are placed.

Separators are added by including a `Separator` control or a `MenuItem` with a header of `"-"`.

## Accelerator Keys

An accelerator key is a key on your keyboard that you can press to quickly access a menu. It is also sometimes called a hot key, access key or mnemonic.

If you will press Alt with the example above you will see that some letters are underlined. You can use a combination of Alt + underlined letter to navigate within a menu. In Avalonia to identify the accelerator key, you will need to use `_` next character to this character would be an accelerator key.

## Menu Commands

Like `Button`, commands can be [bound](../data-binding/binding-to-commands) to `MenuItem`s. The command will be executed when the menu item is clicked or selected with the keyboard:

```xml
<Menu>
    <MenuItem Header="_File">
        <MenuItem Header="_Open..." Command="{Binding OpenCommand}"/>
    </MenuItem>
</Menu>
```

> See the [Binding to Commands](../data-binding/binding-to-commands) section for more information on binding to commands.

## Menu Icons

A menu icon can be displayed by placing an `Image` in the `Icon` property:

```xml
    <MenuItem Header="_Open...">
        <MenuItem.Icon>
            <Image Source="resm:MyApp.Assets.Open.png"/>
        </MenuItem.Icon>
    </MenuItem>
```

## Checkboxes

Similarly, a `CheckBox` can be displayed in the `Icon` property to make the `MenuItem` checkable:

```xml
    <MenuItem Header="_Open...">
        <MenuItem.Icon>
            <CheckBox BorderThickness="0"
                      IsHitTestVisible="False"
                      Command="{Binding ToggleCommand}">
                Toggle _Me
            </CheckBox>
        </MenuItem.Icon>
    </MenuItem>
```

## Dynamically Creating Menus

Menus can also be dynamically created using bindings and [`DataTemplate`](../wpf-developer-tips/datatemplates)s. To do this, you will usually create a view model to represent your `Window` with a set of commands relating to the menu commands:

```csharp
public class MainWindowViewModel
{
    public MainWindowViewModel()
    {
        OpenCommand = ReactiveCommand.CreateFromTask(Open);
        SaveCommand = ReactiveCommand.Create(Save);
        OpenRecentCommand = ReactiveCommand.Create<string>(OpenRecent);
    }

    public IReadOnlyList<MenuItemViewModel> MenuItems { get; set; }
    public ReactiveCommand<Unit, Unit> OpenCommand { get; }
    public ReactiveCommand<Unit, Unit> SaveCommand { get; }
    public ReactiveCommand<string, Unit> OpenRecentCommand { get; }

    public async Task Open()
    {
        var dialog = new OpenFileDialog();
        var result = await dialog.ShowAsync();

        if (result != null)
        {
            foreach (var path in result)
            {
                System.Diagnostics.Debug.WriteLine($"Opened: {path}");
            }
        }
    }

    public void Save()
    {
        System.Diagnostics.Debug.WriteLine("Save");
    }

    public void OpenRecent(string path)
    {
        System.Diagnostics.Debug.WriteLine($"Open recent: {path}");
    }
}
```

And a view model for the menu items

```csharp
public class MenuItemViewModel
{
    public string Header { get; set; }
    public ICommand Command { get; set; }
    public object CommandParameter { get; set; }
    public IList<MenuItemViewModel> Items { get; set; }
}
```

Next, you can create your menu structure using the view models. The following code when placed in a `Window` constructor will create a basic menu structure and assign it to the `Window`'s `DataContext`.

```csharp
public MainWindow()
{
    InitializeComponent();

    var vm = new MainWindowViewModel();

    vm.MenuItems = new[]
    {
        new MenuItemViewModel
        {
            Header = "_File",
            Items = new[]
            {
                new MenuItemViewModel { Header = "_Open...", Command = vm.OpenCommand },
                new MenuItemViewModel { Header = "Save", Command = vm.SaveCommand },
                new MenuItemViewModel { Header = "-" },
                new MenuItemViewModel
                {
                    Header = "Recent",
                    Items = new[]
                    {
                        new MenuItemViewModel
                        {
                            Header = "File1.txt",
                            Command = vm.OpenRecentCommand,
                            CommandParameter = @"c:\foo\File1.txt"
                        },
                        new MenuItemViewModel
                        {
                            Header = "File2.txt",
                            Command = vm.OpenRecentCommand,
                            CommandParameter = @"c:\foo\File2.txt"
                        },
                    }
                },
            }
        },
        new MenuItemViewModel
        {
            Header = "_Edit",
            Items = new[]
            {
                new MenuItemViewModel { Header = "_Copy" },
                new MenuItemViewModel { Header = "_Paste" },
            }
        }
    };

    DataContext = vm;
}
```

Finally assign the bindings to the view model in a `Style` within the menu:

```xml
<Menu Items="{Binding MenuItems}">
    <Menu.Styles>
        <Style Selector="MenuItem">
            <Setter Property="Header" Value="{Binding Header}"/>
            <Setter Property="Items" Value="{Binding Items}"/>
            <Setter Property="Command" Value="{Binding Command}"/>
            <Setter Property="CommandParameter" Value="{Binding CommandParameter}"/>
        </Style>
    </Menu.Styles>
</Menu>
```

## Reference

[Menu](http://reference.avaloniaui.net/api/Avalonia.Controls/Menu/)

## Source code

[Menu.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Menu.cs)