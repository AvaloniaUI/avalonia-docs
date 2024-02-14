---
description: TUTORIALS - Music Store App
---

# Dialog Return

On the this page you add code to return a selected album from the search dialog to the main window.

## Buy Album Command

The first step here is for you to add a reactive command to the music store view model. You will bind this to the **Buy Album** button on the music store view.  

Follow this procedure to add the reactive command:

- Stop the app if it is running.
- Locate and open the **MusicStoreViewModel.cs** file.
- Add the reactive command declaration, as shown:

```csharp
public ReactiveCommand<Unit, AlbumViewModel?> BuyMusicCommand { get; }
```

- Add code to the constructor to initialize the reactive command, as shown:

```csharp
public MusicStoreViewModel()
{
    BuyMusicCommand = ReactiveCommand.Create(() =>
    {
         return SelectedAlbum;
    });
    
    ...
}
```

Notice you are using `ReactiveCommand` here. This is provided by the _ReactiveUI_ framework to implement some of the MVVM interactions. Specifically, it will allow us to pass an argument of class `AlbumViewModel` back to the main window view model, when the button is clicked.

## Button Data Binding

Your next step is bind the **Buy Album** button to the reactive command in the music store view model, follow this procedure:

- Locate and open the **MusicStoreView .axaml** file. 
- Add the data binding `Command="{Binding BuyMusicCommand}"` to the button element.

## Close the Dialog

In this step, you will add some window management so that the dialog closes when the user clicks the **Buy Album** button. This is needed in addition to the data binding you just added.

As you saw during coding for the dialog open, you implement window management in the code-behind for a window, and use features of the `ReactiveWindow` from the _ReactiveUI_ framework.

To add code to close the dialog, follow this procedure:

- Locate and open the **MusicStoreWindow.axaml.cs** file.
- Add a reference to the system `using System;`
- Change the base class so the view inherits from `ReactiveWindow<MusicStoreViewModel>`.
- Then add the following line to the end of the constructor:

```csharp
this.WhenActivated(action => action(ViewModel!.BuyMusicCommand.Subscribe(Close)));
```

The _ReactiveUI_ `WhenActivated` method defines what happens when the window is activated (becomes visible on the screen). The lambda expression will be called, and it is passed an action that is disposable, so that it can be unsubscribed when the window is no longer active.

Your music store window code-behind should now look like this.

```csharp
using Avalonia.ReactiveUI;
using AvaloniaApplication11.ViewModels;
using ReactiveUI;
using System;

namespace Avalonia.MusicStore.Views
{
    public partial class MusicStoreWindow : ReactiveWindow<MusicStoreViewModel>
    {
        public MusicStoreWindow()
        {
            InitializeComponent();
            
            // This line is needed to make the previwer happy (the previewer plugin cannot handle the following line).
            if (Design.IsDesignMode) return;
            
            this.WhenActivated(d => d(ViewModel!.BuyMusicCommand.Subscribe(Close)));
        }
    }
}
```

- Click **Debug** to compile and run the project.
- Click the icon button.
- Type some search text.
- Click an album to select it.
- Click **Buy Album**.

You will see the dialog close, but nothing happens in the main window! On the next page you will learn how to add the selected album to a collection in the main window.
