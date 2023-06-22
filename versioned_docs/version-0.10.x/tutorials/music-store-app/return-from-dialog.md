---
id: return-from-dialog
title: Return from Dialog
---

## Returning from the Dialog

Now that the user can select one of our Albums, we need to be able to close the Dialog and return the result to the `ViewModel` that called the dialog.

Notice that our `MusicStoreViewModel` has a `SelectedAlbum` property that we added previously and that the `ListBox` on the `MusicStoreView` has its `SelectedItem` property bound to this `SelectedAlbum` property of the view model.

This means that when the user clicks to select an album, the listbox shows that it is selected by highlighting the item.

At the same time the `SelectedAlbum` property will be kept in sync and set to the `AlbumViewModel` instance that represents the `SelectedItem` of the `ListBox`.

The `Button` of the `MusicStoreView` has its `Command` property bound to `BuyMusicCommand`. This doesn't exist yet so lets add this to `MusicStoreViewModel` with the following code.

```csharp
public ReactiveCommand<Unit, AlbumViewModel?> BuyMusicCommand { get; }
```

Note we are using `ReactiveCommand` this is where we are using ReactiveUI to provide some of the plumbing for us. Avalonia expects commands to be of type `ICommand` and `ReactiveCommand` implements this interface.

Note that `ReactiveCommand<TParam, TResult>` has some type arguments. Commands can take a parameter, however we do not need a parameter in this case, so we use `Unit` which is kind of a dummy type, it contains no data. Reactive Commands can also return a result. This will be useful for returning the Album the user wants to buy.

Now add the following lines to the constructor of `MusicStoreViewModel` in order to instantiate the command and implement the code needed to return a result from the dialog:

```csharp
BuyMusicCommand = ReactiveCommand.Create(() =>
{
    return SelectedAlbum;
});
```

Simply when the button is clicked, this code will execute, and return the value assigned to `SelectedAlbum`.

So far so good, but how does the actual dialog get closed?

To close the dialog, we need to open `MusicStoreWindow.axaml.cs` and make a few changes.

Firstly make it inherit `ReactiveWindow<MusicStoreViewModel>` so that ReactiveUI can help us out.

Then add the following line to the end of the constructor.

```csharp
this.WhenActivated(d => d(ViewModel!.BuyMusicCommand.Subscribe(Close)));
```

This line says when the Window is activated \(becomes visible on the screen\), the lambda expression will be called.

The `d` is an action that we can pass a disposable to, so things can be unsubscribed when the Window is no longer active.

We pass to that a `Subscription` to our `ViewModel`s `BuyMusicCommand`. We subscribe it directly to the `Window`s `Close` method. A `using System;` directive is required for this step.

This means the result of the `BuyMusicCommand` will be passed to the `Close` method. Causing the Window to close and its result to be returned from the `ShowDialog` call we made in the `MainWindow.xaml.cs` code.

The entire `MusicStoreWindow.xaml.cs` should now look like this.

```csharp
using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;
using Avalonia.MusicStore.ViewModels;
using Avalonia.ReactiveUI;
using ReactiveUI;
using System;

namespace Avalonia.MusicStore.Views
{
    public partial class MusicStoreWindow : ReactiveWindow<MusicStoreViewModel>
    {
        public MusicStoreWindow()
        {
            InitializeComponent();
            this.WhenActivated(d => d(ViewModel!.BuyMusicCommand.Subscribe(Close)));
        }
    }
}
```

If you build and run the application we will now see that we can Select an Album by clicking on it, and pressing the Buy Music button will cause the dialog to close. The result will be returned to the `MainWindowViewModel` inside

```csharp
BuyMusicCommand = ReactiveCommand.CreateFromTask(async () =>
{
    var store = new MusicStoreViewModel();

    var result = await ShowDialog.Handle(store);
});
```

Lets come back to handling the result later.

For now, we need to get some real data into our application instead of the 3 dummy albums we have now.

