---
id: how-to-show-and-hide-a-split-view-pane-with-mvvm
title: How To Show and Hide a Split View Pane with MVVM
---

import FirstExample from '/img/guides/development-guides/How-to-show-and-hide-a-split-view-pane-with-MVVM/First-example.PNG';
import SecondExample from '/img/guides/development-guides/How-to-show-and-hide-a-split-view-pane-with-MVVM/Second-example.PNG';

# How To Show and Hide a Split View Pane with MVVM
In this guide you will learn how to show and hide a split view panel using the MVVM pattern. If you are new to Avalonia UI please check out the following documents: [The MVVM patter](https://docs.avaloniaui.net/docs/concepts/the-mvvm-pattern/) - [Avalonia UI and MVVM](https://docs.avaloniaui.net/docs/concepts/the-mvvm-pattern/avalonia-ui-and-mvvm).
To proceed in this guide you will need at least a basic understanding of what Data Binding is and how it works in Avalonia.
If you are coming from WPF, then the mechanism is nearly the same, except for some differences that will not be covered in this guide.

## Starting
First of all, you need to create an MVVM application project, which you can do by reading the following guide [Create and run a project](https://docs.avaloniaui.net/docs/get-started/test-drive/create-a-project).<br>
Once you created the project you should be presented with the following files:
- MainWindow.axaml
- MainWindowViewModel.cs

Those are the files that you will be editing, except for the one that you will be creating during this guide.

:::info
Although here I will be using the MainWindow.axaml and MainWindowViewModel.cs files, this guide will work for every other View and its respective ViewModel.
:::

## Adding the SplitView panel to the MainWindow
The starting point will be something like this:
``` xml
add
```

For the sake of simplicity I will be deleting everything in the main window and adding the SplitView panel.
<br>
Start by creating the panel and by defining the basics of how you want it to behave (for more informations on how this control works see [here](https://docs.avaloniaui.net/docs/reference/controls/splitview)) 
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

    </SplitView.Pane>
</SplitView>
```
We will now add some additional elements to the pane. First we will add a StackPanel, then a button and a textbox with the text "Settings". The following configurations will ensure that the button and the text are aligned.
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
To make things more clear, I will add a TextBlock in the main part of the SplitView, which will be the content you may add and that will be alway visible.
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
Fist of all, create a boolean property with a private backing field in the ViewModel which will contains the boolean value. Now, by using Reactive UI, make it notify every change to the backing field to the UI. Remember to initialize the backing property with the value you need in the VewModel's constructor.
:::info
By default in an MVVM project each ViewModel inherit from a ViewModelBase which inherits from the ReactiveObject class. By doing so in every ViewModel there will be the necessary methods to notify the UI. For more informations see [here](https://docs.avaloniaui.net/docs/concepts/reactiveui/reactive-view-model).
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
Now, to make the button invoke the command you just need to bind it. (For more informations see [here](https://docs.avaloniaui.net/docs/0.10.x/data-binding/binding-to-commands))
``` xml
<Button Command="{Binding ChangeSplitViewPaneStatusCommand}">
```
By doing so the command will be invoked each time the button is clicked and will update the IsSplitViewPaneOpen's value accordingly.
<br><br>
**If you followed this guide step by step you should now have something like this:**
<img className="screenshot-full" src={SecondExample} alt="Second example" />
