---
description: TUTORIALS - Music Store App
---

# Dialog Return

On this page, you’ll complete the logic for returning a selected album from the search dialog _MusicStoreWindow_ back to the main window. This will be done using the CommunityToolkit.Mvvm messaging system, allowing the dialog to communicate back without tight coupling.
## Create the MusicStoreClosedMessage Class
Firstly, let's create a message class that will carry the selected album from the dialog to the window handler.
- Inside previously created **/Messages** folder create file **MusicStoreClosedMessage.cs**
- Into newly created file add the following code:
```csharp
using Avalonia.MusicStore.ViewModels;

namespace Avalonia.MusicStore.Messages;

public class MusicStoreClosedMessage(AlbumViewModel selectedAlbum)
{
public AlbumViewModel SelectedAlbum { get; } = selectedAlbum;
}
```

## Register the Message Handler in MusicStoreWindow
To close the dialog and return the selected album to the main window, you’ll register a handler that listens for a MusicStoreClosedMessage.
- Locate and open the MusicStoreWindow.axaml.cs file.
- Add the following code to the constructor:

```csharp
using Avalonia.Controls;
using Avalonia.MusicStore.Messages;
using CommunityToolkit.Mvvm.Messaging;

namespace Avalonia.MusicStore.Views
{
    public partial class MusicStoreWindow : Window
    {
        public MusicStoreWindow()
        {
            InitializeComponent();

            // Register a handler to listen for the message sent by the view model
            WeakReferenceMessenger.Default.Register<MusicStoreWindow, MusicStoreClosedMessage>(this,
                static (window, message) =>
                {
                    // Close the dialog and return the selected album
                    window.Close(message.SelectedAlbum);
                });
        }
    }
}

```
When MusicStoreViewModel sends a MusicStoreClosedMessage, this handler will close the dialog and return the selected album using Avalonia’s dialog result system.

## Define the Command in MusicStoreViewModel

Now you will add a relay command to the music store view model. You will bind this command to the **Buy Album** button on the music store view.  

- Locate and open the **MusicStoreViewModel.cs** file.
- Add the following RelayCommand method to the class, as shown:

```csharp
[RelayCommand]
private void BuyMusic()
{
    if (SelectedAlbum != null)
    {
        WeakReferenceMessenger.Default.Send(new MusicStoreClosedMessage(SelectedAlbum));
    }
}

```
This command is exposed to the view as BuyMusicCommand. When invoked, it sends a MusicStoreClosedMessage with the currently selected album.

## Bind the Command to the Button

Your next step is bind the **Buy Album** button to the relay command in the music store view model, follow this procedure:

- Locate and open the **MusicStoreView .axaml** file. 
- Add the data binding `Command="{Binding BuyMusicCommand}"` to the button element.



- Click **Debug** to compile and run the project.
- Click the icon button.
- Type some search text.
- Click an album to select it.
- Click **Buy Album**.

You will see the dialog close, but nothing happens in the main window! On the next page you will learn how to add the selected album to a collection in the main window.
