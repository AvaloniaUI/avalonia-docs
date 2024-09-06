---
id: how-to-show-and-hide-a-split-view-pane-with-mvvm
title: How To Show and Hide a Split View Pane with MVVM
---

import FirstExample from '/img/guides/development-guides/How-to-show-and-hide-a-split-view-pane-with-MVVM/First-example.PNG';
import SecondExample from '/img/guides/development-guides/How-to-show-and-hide-a-split-view-pane-with-MVVM/Second-example.PNG';
import PaneHidden from '/img/guides/development-guides/How-to-show-and-hide-a-split-view-pane-with-MVVM/Pane-Hidden.PNG';
import PaneShown from '/img/guides/development-guides/How-to-show-and-hide-a-split-view-pane-with-MVVM/Pane-shown.PNG';

# How To Show and Hide a Split View Pane with MVVM
In this guide you will learn how to show and hide a split view panel using the MVVM pattern. If you are new to Avalonia UI please check out the following documents: [The MVVM pattern](https://docs.avaloniaui.net/docs/concepts/the-mvvm-pattern/) - [Avalonia UI and MVVM](https://docs.avaloniaui.net/docs/concepts/the-mvvm-pattern/avalonia-ui-and-mvvm).
To proceed in this guide you will need at least a basic understanding of what Data Binding is and how it works in Avalonia.

## Starting
First of all, you need to create an MVVM application project, which you can do by reading the following guide [Create and run a project](https://docs.avaloniaui.net/docs/get-started/test-drive/create-a-project).<br>
Once you created the project you should be presented with the following files:
- MainWindow.axaml
- MainWindowViewModel.cs

Those are the files you will be editing the most. (Please note that additional files may need to be created as you proceed through this guide.)

:::info
Although in this guide we will be using the MainWindow.axaml and MainWindowViewModel.cs files, this guide will work for every additional View and ViewModel you may create.
:::

## Adding the SplitView panel to the MainWindow
Open the MainWindow.xaml file. The file should have the following content in it by default:
``` xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:ciao.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="ciao.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="ciao">

    <Design.DataContext>
        <!-- This only sets the DataContext for the previewer in an IDE,
             to set the actual DataContext for runtime, set the DataContext property in code (look at App.axaml.cs) -->
        <vm:MainWindowViewModel/>
    </Design.DataContext>

    <TextBlock Text="{Binding Greeting}" HorizontalAlignment="Center" VerticalAlignment="Center"/>

</Window>
```

For the sake of simplicity we will be deleting the default TextBlock and its value in the MainWindowViewModel.
<br>
Now, create the SplitView and define the basics of how you want it to behave (for more informations on how this control works see [here](https://docs.avaloniaui.net/docs/reference/controls/splitview)) 
``` xml
<SplitView PanePlacement="Right" DisplayMode="CompactInline">
</SplitView>
```
If you used this same code you should see the following window when starting the application. The light grey panel on the right is the one you will be expanding at the end of this guide.
<img className="screenshot-full" src={FirstExample} alt="First example" />

## Adding the SplitView's pane
Now that we have the SplitView we need to create its pane, which is the part that will be hidden when the split view is closed.
``` xml
<SplitView PanePlacement="Right" DisplayMode="CompactInline">
    <SplitView.Pane>
	<!-- content -->
    </SplitView.Pane>
</SplitView>
```
We will now add some additional elements to the pane. First a StackPanel, then a button and a textbox with the text "Settings". The following configurations will ensure that the button and the text are aligned.
``` xml
<SplitView PanePlacement="Right" DisplayMode="CompactInline">
    <SplitView.Pane>
        <StackPanel VerticalAlignment="Top" Margin="5" Orientation="Horizontal">
            <Button>
            </Button>
            <TextBlock VerticalAlignment="Center" Margin="15, 0, 0, 0" FontSize="25" Text="Settings"/>
        </StackPanel>
    </SplitView.Pane>
</SplitView>
```

### Adding some content to the SplitView
To make things more clear, we will add a TextBlock in the main part of the SplitView, outside the Pane. In the future you may replace the TextBlock with the content you need. This part of the SplitView will always be visible.
``` xml
<SplitView PanePlacement="Right" DisplayMode="CompactInline">
    <SplitView.Pane>
        <StackPanel VerticalAlignment="Top" Margin="5" Orientation="Horizontal">
            <Button>
            </Button>
            <TextBlock VerticalAlignment="Center" Margin="15, 0, 0, 0" FontSize="25" Text="Settings"/>
        </StackPanel>
    </SplitView.Pane>
    <TextBlock HorizontalAlignment="Center" VerticalAlignment="Center" Text="MainWindow" FontSize="25"/>
</SplitView>
```

## Binding the SplitView's `IsPaneOpen` property to a ViewModel's property.
First, create a boolean property with a private backing field in the ViewModel which will contains the boolean value. Now, by using Reactive UI, make it notify every change to the field to the UI. Remember to initialize the backing property with the value you need in the VewModel's constructor.
:::info
By default in an MVVM project each ViewModel inherits from a ViewModelBase which inherits from the ReactiveObject class. By doing so in every ViewModel there will be the necessary methods to notify the UI. For more informations see [here](https://docs.avaloniaui.net/docs/concepts/reactiveui/reactive-view-model).
:::
``` C#
private bool _isSplitViewPaneOpen;
public bool IsSplitViewPaneOpen
{
    get => this._isSplitViewPaneOpen;
    set
    {
        this.RaiseAndSetIfChanged(ref this._isSplitViewPaneOpen, value);
    }
}
public MainWindowViewModel()
{
    this._isSplitViewPaneOpen = false;
}
```
Now that we have the property with its backing field initialized, we can bind it to the SplitView's property: add the following code to the SplitView tag.
``` xml
IsPaneOpen="{Binding IsSplitViewPaneOpen}"
```
You should now have the following configuration:
``` xml
<SplitView PanePlacement="Right" DisplayMode="CompactInline" IsPaneOpen="{Binding IsSplitViewPaneOpen}">
```

## Configuring the button
At this point all we need to do is make the button open and close the SplitView's pane when clicked.
To do so create a public property of type ICommand in the ViewModel with just the "getter method".
``` C#
public ICommand ChangeSplitViewPaneStatusCommand { get; }
```
And initialize it in the constructor.
``` C#
this.ChangeSplitViewPaneStatusCommand = ReactiveCommand.Create(() =>
{
    this.IsSplitViewPaneOpen = !this.IsSplitViewPaneOpen;
});
```
In this example I will be using a very simple logic: if the value is true it becomes false, and if it's false it becomes true.
<br>
You should now have the following code in the ViewModel:

``` C#
public class MainWindowViewModel : ViewModelBase
{
    private bool _isSplitViewPaneOpen;
    public bool IsSplitViewPaneOpen
    {
        get => this._isSplitViewPaneOpen;
        set
        {
            this.RaiseAndSetIfChanged(ref this._isSplitViewPaneOpen, value);
        }
    }

    public ICommand ChangeSplitViewPaneStatusCommand { get; }

    public MainWindowViewModel()
    {
        this._isSplitViewPaneOpen = false;
        this.ChangeSplitViewPaneStatusCommand = ReactiveCommand.Create(() =>
        {
            this.IsSplitViewPaneOpen = !this.IsSplitViewPaneOpen;
        });
    }
}
```
Now, to make the button invoke the command you just need to bind it. (For more informations see [here](https://docs.avaloniaui.net/docs/guides/data-binding/how-to-bind-to-a-command-with-reactiveui))
``` xml
<Button Command="{Binding ChangeSplitViewPaneStatusCommand}">
```
By doing so the command will be invoked each time the button is clicked and will update the IsSplitViewPaneOpen's value accordingly.
<br><br>
**If you followed this guide step by step you should now have something like this:**
<img className="screenshot-full" src={SecondExample} alt="Second example" />

## Adding content to the button
Finally, you now just need to add some content to the button that indicates whether you need to show or hide the SplitView's pane. In this guide we will be using the following characters:
- '<' to indicate the pane will be shown on click.
- '>' to indicate the pane will be hidden on click.

### Implement a converter
To do this step we will need the char to change as the Pane goes from shown to hidden and viceversa. To do so we need to create a converter function that will return the necessary char to the button when clicked.<br>
In the `Models` folder create a class named SplitViewIconConverter and make it inherit from the IMultiValueConverter interface.<br>
:::info
We will use a MultiValueConverter because we need it to be called whenever the IsSplitViewPaneOpen value is changed. (For more information on how IMultiValueConverter behaves see [here](https://docs.avaloniaui.net/docs/guides/data-binding/how-to-bind-multiple-properties))  
:::
<br>
First, implement the interface as follows:
``` C#
public object? Convert(IList<object?> values, Type targetType, object? parameter, CultureInfo culture)
{
    throw new NotImplementedException();
}
```
Second, define how the method will behave based on the value which will be passed to it in the IList object. We will assume that the first value of the list will be the value of `IsSplitViewPaneOpen`, and will treat it accordingly. When the value is true the method will return '>', otherwise it will return '<'.
``` C#
public object? Convert(IList<object?> values, Type targetType, object? parameter, CultureInfo culture)
{
    if(values.Any(x => x is null or UnsetValueType or not bool))
        return BindingOperations.DoNothing;

    bool value = (bool)values[0];

    if (value)
        return ">";

    return "<";
}
```
:::warning
Since we need only one value in this code we will assume that every single value passed to this function should be a boolean. 
:::
### Bind the converter to the button content.
Lastly, all that's left to do is bind the converter to the button's content. To do so import the namespace of the converter in the MainWindow.axaml file by adding the following line
``` xml
xmlns:convs="clr-namespace:how_to_show_and_hide_a_split_view_pane_with_mvvm.Models"
```
So that the Window tag will look something like this.
``` xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:how_to_show_and_hide_a_split_view_pane_with_mvvm.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="how_to_show_and_hide_a_split_view_pane_with_mvvm.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="how_to_show_and_hide_a_split_view_pane_with_mvvm"

		xmlns:convs="clr-namespace:how_to_show_and_hide_a_split_view_pane_with_mvvm.Models"
		>
```
Now add the converter to the static resources of the Window by doing the following.
``` xml
<Window.Resources>
    <convs:SplitViewIconConverter x:Key="SplitViewIconConverter"/>
</Window.Resources>
```
Bind the button's content to the converter and pass the IsSplitViewPaneOpen property as a parameter to the converter.
``` xml
<Button Command="{Binding ChangeSplitViewPaneStatusCommand}">
    <Button.Content>
        <MultiBinding Converter="{StaticResource SplitViewIconConverter}">
            <Binding Path="IsSplitViewPaneOpen"/>
        </MultiBinding>
    </Button.Content>
</Button>
```
<br>
The final MainWindow code should look like this:

``` xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:how_to_show_and_hide_a_split_view_pane_with_mvvm.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="how_to_show_and_hide_a_split_view_pane_with_mvvm.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="how_to_show_and_hide_a_split_view_pane_with_mvvm"

		xmlns:convs="clr-namespace:how_to_show_and_hide_a_split_view_pane_with_mvvm.Models"
		>

    <Design.DataContext>
        <!-- This only sets the DataContext for the previewer in an IDE,
             to set the actual DataContext for runtime, set the DataContext property in code (look at App.axaml.cs) -->
        <vm:MainWindowViewModel/>
    </Design.DataContext>

	<Window.Resources>
		<convs:SplitViewIconConverter x:Key="SplitViewIconConverter"/>
	</Window.Resources>
	
		<SplitView PanePlacement="Right" DisplayMode="CompactInline" IsPaneOpen="{Binding IsSplitViewPaneOpen}">
			<SplitView.Pane>
				<StackPanel VerticalAlignment="Top" Margin="5" Orientation="Horizontal">
					<Button Command="{Binding ChangeSplitViewPaneStatusCommand}">
						<Button.Content>
							<MultiBinding Converter="{StaticResource SplitViewIconConverter}">
								<Binding Path="IsSplitViewPaneOpen"/>
							</MultiBinding>
						</Button.Content>
					</Button>
					<TextBlock VerticalAlignment="Center" Margin="15, 0, 0, 0" FontSize="25" Text="Settings"/>
				</StackPanel>
			</SplitView.Pane>
			<TextBlock HorizontalAlignment="Center" VerticalAlignment="Center" Text="MainWindow" FontSize="25"/>
		</SplitView>
</Window>
```
:::warning
If you want to approach the problem by using just a normal converter and passing the IsSplitViewPaneOpen property to it as parameter, don't try to do that since ConverterParameter does not currently support binding. 
:::
## Final result:
**Pane hidden**
<img className="screenshot-full" src={PaneHidden} alt="Pane hidden" />
**Pane shown**
<img className="screenshot-full" src={PaneShown} alt="Pane shown" />
