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
- Add the following code to the class, as shown:

```csharp
public event Action<AlbumViewModel>? AlbumPurchased;

[RelayCommand]
private void BuyMusic()
{
    if (SelectedAlbum != null)
    {
        AlbumPurchased?.Invoke(SelectedAlbum);
    }
}
```
This method is automatically exposed to the view as a bindable command named BuyMusicCommand. When the Buy Album button is clicked, this command is invoked and raises the AlbumPurchased event if an album is selected.
.

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

This method is automatically exposed to the view as a bindable command named BuyMusicCommand. When the Buy Album button is clicked, this command is invoked and raises the AlbumPurchased event if an album is selected.

## Button Data Binding

Your next step is bind the **Buy Album** button to the reactive command in the music store view model, follow this procedure:

- Locate and open the **MusicStoreView .axaml** file. 
- Add the data binding `Command="{Binding BuyMusicCommand}"` to the button element.

## Close the Dialog

In this step, you will add some window management so that the dialog closes when the user clicks the **Buy Album** button. This is needed in addition to the data binding you just added. 
Now you’ll ensure the dialog window is closed when the Buy Album button is clicked and a selection is made. As you saw during coding for the dialog open, you implement window management in the code-behind for a window.

To add code to close the dialog, follow this procedure:

- Locate and open the **MusicStoreWindow.axaml.cs** file.
- Add this logic to subscribe to the event and close the dialog:

```csharp
protected override void OnDataContextChanged(EventArgs e)
        {
            base.OnDataContextChanged(e);

            if (DataContext is MusicStoreViewModel vm)
            {
                vm.AlbumPurchased += (album) =>
                {
                    Close(album);
                };
            }
        }
```
Close(album) returns the album to the caller (the main window) using Avalonia’s dialog result system. The AlbumPurchased event acts as the bridge from the view model to the view logic.

Your music store window code-behind should now look like this.

```csharp
using System;
using Avalonia.Controls;
using Avalonia.MusicStore.ViewModels;

namespace Avalonia.MusicStore.Views
{
    public partial class MusicStoreWindow : Window
    {
        public MusicStoreWindow()
        {
            InitializeComponent();
        }

        protected override void OnDataContextChanged(EventArgs e)
        {
            base.OnDataContextChanged(e);

            if (DataContext is MusicStoreViewModel vm)
            {
                vm.AlbumPurchased += (album) =>
                {
                    Close(album);
                };
            }
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
