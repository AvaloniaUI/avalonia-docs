---
description: CONCEPTS - Input
---

import KeyMouseScreenshot from '/img/reference/controls/input/KeyMouseBindingTest.gif';

# KeyBinding and MouseBinding 
- This section explains how to place shortcut keys that often appear in business tools in various controls.
- As an example, binding with double-click or the Enter key on a simple list box.
- It also works for DataGrid.

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'code-behind', value: 'cs', },
      { label: 'ViewModel', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<UserControl ..>
    <StackPanel>
        <ListBox
            DoubleTapped="ListBox_DoubleTapped"
            ItemsSource="{Binding OperatingSystems}"
            SelectedItem="{Binding OS}">
            <ListBox.KeyBindings>
                <!--  Enter  -->
                <KeyBinding Command="{Binding PrintItem}" Gesture="Enter" />
                <!--
                    MouseBindings are not supported.
                    Instead, handle it in the view's code-behind. (DoubleTapped event)
                -->
            </ListBox.KeyBindings>
        </ListBox>
        <TextBlock Text="{Binding Result}">
            <TextBlock.ContextMenu>
                <ContextMenu>
                    <!--  Right Click  -->
                    <MenuItem Command="{Binding Clear}" Header="Clear" />
                </ContextMenu>
            </TextBlock.ContextMenu>
        </TextBlock>
    </StackPanel>
</UserControl>
```

</TabItem>
<TabItem value="code-behind">

```cs
public partial class MainView : UserControl
{
    public MainView()
    {
        InitializeComponent();
    }

    private void ListBox_DoubleTapped(object? sender, Avalonia.Input.TappedEventArgs e)
    {
        if (DataContext is MainViewModel vm)
        {
            vm.PrintItem.Execute(null);
        }
    }
}
```
</TabItem>  

<TabItem value="ViewModel">

```cs
public class MainViewModel : ViewModelBase
{
    public List<string> OperatingSystems =>
    [
        "Windows",
        "Linux",
        "Mac",
    ];
    public string OS { get; set; } = string.Empty;

    [Reactive]
    public string Result { get; set; } = string.Empty;

    public ICommand PrintItem { get; }
    public ICommand Clear { get; }

    public MainViewModel()
    {
        PrintItem = ReactiveCommand.Create(() => Result = OS);
        Clear = ReactiveCommand.Create(() => Result = string.Empty);
    }
}
```
</TabItem>  
</Tabs>

<img src={KeyMouseScreenshot} alt="" />
