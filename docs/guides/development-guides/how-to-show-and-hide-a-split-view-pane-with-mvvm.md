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

Those are the files you will be editing the most. Please note that additional files may need to be created as you proceed through this guide.

:::info
Although in this guide we will be using the MainWindow.axaml and MainWindowViewModel.cs files, this guide will work for every additional View and ViewModel you may create.
:::

## Adding the SplitView panel to the MainWindow
Open the MainWindow.xaml file. The default MVVM project template will generate a project populated with the following default files:
``` xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:ciao.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="YourNamespace.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="Mainwindow">

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
Now, create the SplitView and define the basics of how you want it to behave (for more information on how this control works see [here](https://docs.avaloniaui.net/docs/reference/controls/splitview)) 
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
            <Button />
            <TextBlock VerticalAlignment="Center" Margin="15, 0, 0, 0" FontSize="25" Text="Settings"/>
        </StackPanel>
    </SplitView.Pane>
</SplitView>
```

### Adding some content to the SplitView
We will add a TextBlock in the main part of the SplitView, outside the Pane. In future, you may replace the TextBlock with the content you need. This part of the SplitView will always be visible.
``` xml
<SplitView PanePlacement="Right" DisplayMode="CompactInline">
    <SplitView.Pane>
        <StackPanel VerticalAlignment="Top" Margin="5" Orientation="Horizontal">
            <Button />
            <TextBlock VerticalAlignment="Center" Margin="15, 0, 0, 0" FontSize="25" Text="Settings"/>
        </StackPanel>
    </SplitView.Pane>
    <TextBlock HorizontalAlignment="Center" VerticalAlignment="Center" Text="MainWindow" FontSize="25"/>
</SplitView>
```

## Binding the SplitView's `IsPaneOpen` property to a ViewModel's property.
First, create a boolean property with a private backing field in the ViewModel which will contains the boolean value. Now, make it notify every change to the field to the UI. Remember to initialize the backing property with the value you need in the VewModel's constructor.
To make the it notify the UI of every change you can use two different approaches:
<br>
<br>
**If you are using Reactive UI**
By default in an MVVM project with Reactive UI each ViewModel inherits from a ViewModelBase which inherits from the ReactiveObject class. By doing so in every ViewModel there will be the necessary methods to notify the UI. For more informations see [here](https://docs.avaloniaui.net/docs/concepts/reactiveui/reactive-view-model).
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
```

**If you are _not_ using Reactive UI**
If you are not using Reactive UI, instead you can use the built in interface INotifyPropertyChanged. Keep in mind that you need to implement it in your ViewModels as follows:
``` C#
public event PropertyChangedEventHandler PropertyChanged;
protected virtual void OnPropertyChanged(string propertyName)
{
    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
}
```
For more informations about this interface please see [here](https://docs.avaloniaui.net/docs/guides/data-binding/inotifypropertychanged).
Below the code for the property and it's backing field without Reactive UI:
``` C#
private bool _isSplitViewPaneOpen;
public bool IsSplitViewPaneOpen
{
    get => this._isSplitViewPaneOpen;
    set
    {
        this._isSplitViewPaneOpen = value;
        OnPropertyChanged(nameof(IsSplitViewPaneOpen));
    }
}
```
Finally, the code in the constructor will be the same for both versions:

``` C#
public MainWindowViewModel()
{
    // The default value of a boolean variable is false. Hence if you need the Pane to start closed you can avoid this initialization.
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
To do so the process is different based on if you are using Reactive UI or not:
<br>
<br>
**If you are using Reactive UI**
Create a public property of type ICommand in the ViewModel with just the "getter method".
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
**If you are _not_ using Reactive UI**
Create a normal public function with no return type (void) and add to it's body the logic:
``` C#
public void ChangeSplitViewPaneStatusCommand()
{
    this.IsSplitViewPaneOpen = !this.IsSplitViewPaneOpen;
}
```
:::info
In both the version with and without Reactive UI there will be the same logic: if the value is true it becomes false, and if it's false it becomes true.
:::
<br>
You should now have the following code in the ViewModel depending on the approach you chose:
<Tabs>
    <TabItem label="Reactive UI" default>
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
	// The default value of a boolean variable is false. Hence if you need the Pane to start closed you can avoid this initialization.
	this._isSplitViewPaneOpen = false;
	this.ChangeSplitViewPaneStatusCommand = ReactiveCommand.Create(() =>
	{
	    this.IsSplitViewPaneOpen = !this.IsSplitViewPaneOpen;
	});
    }
}
```
    </TabItem>
    
    <TabItem label="No Reactive UI">
``` C#
public class MainWindowViewModel : INotifyPropertyChanged
{
    private bool _isSplitViewPaneOpen;
    public bool IsSplitViewPaneOpen
    {
        get => this._isSplitViewPaneOpen;
        set
        {
            this._isSplitViewPaneOpen = value;
            OnPropertyChanged(nameof(IsSplitViewPaneOpen));
        }
    }

    public event PropertyChangedEventHandler PropertyChanged;
    protected virtual void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }

    public MainWindowViewModel()
    {
        // The default value of a boolean variable is false. Hence if you need the Pane to start closed you can avoid this initialization.
        this._isSplitViewPaneOpen = false;
    }
    public void ChangeSplitViewPaneStatusCommand()
    {
        this.IsSplitViewPaneOpen = !this.IsSplitViewPaneOpen;
    }
}
```
    </TabItem>
</Tabs

Now, to make the button invoke the command (or the function in case you're not using Reactive UI) you just need to bind it. The process is the same with and without Reactive UI.<br>
For more informations see [here](https://docs.avaloniaui.net/docs/guides/data-binding/how-to-bind-to-a-command-with-reactiveui) for Reactive UI and [here](https://docs.avaloniaui.net/docs/guides/data-binding/how-to-bind-to-a-command-without-reactiveui) without Reactive UI.
``` xml
<Button Command="{Binding ChangeSplitViewPaneStatusCommand}">
```
By doing so the command will be invoked each time the button is clicked and will update the IsSplitViewPaneOpen's value accordingly.
<br><br>
**If you followed this guide step by step you should now have the following window:**
<img className="screenshot-full" src={SecondExample} alt="Second example" />

## Adding content to the button
Finally, you now just need to add some content to the button that indicates whether you need to show or hide the SplitView's pane. In this guide we will be using the following characters:
- '<' to indicate the pane will be shown on click.
- '>' to indicate the pane will be hidden on click.

### Implement a converter
To do this step we will need the char to change as the Pane goes from shown to hidden and vice versa. To do so we need to create a converter function that will return the necessary char to the button when clicked.<br>
In the `Models` folder create a class named SplitViewIconConverter and make it inherit from the IValueConverter interface.<br>
:::info
For more information on how converters behave please see [here](https://docs.avaloniaui.net/docs/guides/data-binding/how-to-create-a-custom-data-binding-converter).
:::
<br>
First, implement the interface as follows:
``` C#
public object? Convert(object? value, Type targetType, object? parameter, CultureInfo culture)
{
    throw new NotImplementedException();
}

public object? ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture)
{
    throw new NotImplementedException();
}
```
Second, define how the method will behave based on the value which will be passed to it in the `value` parameter. When the value is true the method will return '>', otherwise it will return '<'. Please note that in this guide we will not use the function `ConvertBack`.
``` C#
public object? Convert(object? value, Type targetType, object? parameter, CultureInfo culture)
{
    if ((bool)value)
	return ">";

    return "<";
}
```
:::warning
In this code we are assuming that the converter will be used only with booleans.
:::
### Bind the converter to the button content.
Lastly, all that's left to do is bind the converter to the button's content. To do so import the namespace of the converter in the MainWindow.axaml file by adding the following line
``` xml
xmlns:convs="clr-namespace:YourNamespace.Models"
```
So that the Window tag will have the following content.
``` xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:YourNamespace.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="YourNamespace.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="how_to_show_and_hide_a_split_view_pane_with_mvvm"

	xmlns:convs="clr-namespace:YourNamespace.Models"
		>
```
:::warning
In the code above the namespace is YourNamespace. Please remember that if you want to use this code you must change it to what correspond to yours.
:::

Now add the converter to the static resources of the Window by doing the following.
``` xml
<Window.Resources>
    <convs:SplitViewIconConverter x:Key="SplitViewIconConverter"/>
</Window.Resources>
```
Bind the button's content to the converter and specify the Path to the value we need to pass to the converter. In this case the path is `IsSplitViewPaneOpen`.
``` xml
<Button Command="{Binding ChangeSplitViewPaneStatusCommand}" Content="{Binding Converter={StaticResource SplitViewIconConverter} Path=IsSplitViewPaneOpen} "/>
```
<br>
The final MainWindow code should look like this:

``` xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:YourNamespace.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="YourNamespace.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="how_to_show_and_hide_a_split_view_pane_with_mvvm"

	xmlns:convs="clr-namespace:YourNamespace.Models"
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
					<Button Command="{Binding ChangeSplitViewPaneStatusCommand}" Content="{Binding Converter={StaticResource SplitViewIconConverter} Path=IsSplitViewPaneOpen} "/>
					<TextBlock VerticalAlignment="Center" Margin="15, 0, 0, 0" FontSize="25" Text="Settings"/>
				</StackPanel>
			</SplitView.Pane>
			<TextBlock HorizontalAlignment="Center" VerticalAlignment="Center" Text="MainWindow" FontSize="25"/>
		</SplitView>
</Window>
```
:::warning
In the code above the namespace is YourNamespace. Please remember that if you want to use this code you must change it to what correspond to yours.
:::
## Final result:
**Pane hidden**
<img className="screenshot-full" src={PaneHidden} alt="Pane hidden" />
**Pane shown**
<img className="screenshot-full" src={PaneShown} alt="Pane shown" />
