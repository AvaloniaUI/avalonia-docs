---
description: TUTORIALS - Music Store App
---

import MusicStoreAddWindowScreenshot from '/img/tutorials/music-store-app/opening-a-dialog/add-window.png';
import MusicStoreDialogOpenedScreenshot from '/img/tutorials/music-store-app/opening-a-dialog/dialog-opened.png';

# Open a Dialog

On this page you will learn how to open another window in your app. The new window will eventually contain a search facility, and a button to add one of the album covers found to a list in the main window.  This new window will be opened as a dialog - that is it will prevent activity in the main window while it is showing.

## Add a New Dialog Window

There is nothing special about a window view file that makes it into a dialog; that is up to the way in which the window is controlled by the app. You will use Avalonia UI features and _CommunityToolkit.Mvvm_ to manage this. So the first step is to create a new window for the app.

To create a new window, follow this procedure:

- Stop the app if it is still running.
- In the solution explorer, right-click the **/Views** folder and then click **Add**.
- Click **Avalonia Window**.
- When prompted for the name, type 'MusicStoreWindow'
- Press enter.

<p><img className="image-medium-zoom" src={MusicStoreAddWindowScreenshot} alt="" /></p>

## Dialog Window Styling

To style the new dialog window so that it matches the main window, follow this procedure:

- Locate and open the **MusicStoreWindow.axaml** file.
- Change this code as follows to add the acrylic blur background, extended into the title bar (as before) as shown:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="Avalonia.MusicStore.Views.MusicStoreWindow"
        Title="MusicStoreWindow"
        TransparencyLevelHint="AcrylicBlur"
        ExtendClientAreaToDecorationsHint="True">
    <Panel>
        <ExperimentalAcrylicBorder IsHitTestVisible="False">
            <ExperimentalAcrylicBorder.Material>
                <ExperimentalAcrylicMaterial
                    BackgroundSource="Digger"
                    TintColor="Black"
                    TintOpacity="1"
                    MaterialOpacity="0.65" />
            </ExperimentalAcrylicBorder.Material>
        </ExperimentalAcrylicBorder>

        <Panel Margin="40">

        </Panel>
    </Panel>
</Window>
```

## Dialog Input and Output

The application logic for the dialog will be controlled by its own view model. This will be created and linked to the dialog window view whenever the dialog is to be shown.

Similarly, the result of the users interaction with the dialog will eventually have to be passed back to the application logic for the main window for processing.

At this stage you will create two empty view model classes to act as placeholders for the dialog view model, and the dialog return (selected album) object. To create these view models, follow this procedure:

- In the solution explorer, right-click the **/ViewModels** folder and then click **Add**.
- Click **Class**.
- Name the class 'MusicStoreViewModel' and click **Add**.
- Right-click again the **/ViewModels** folder and then click **Add** a second time.
- Click **Class**.
- Name the class 'AlbumViewModel' and click **Add**.

## Show Dialog

Now you have a new window for the dialog, and some view model classes for its interaction; there are two steps to create the dialog interaction:

* The main window view model starts the interaction.
* The main window view knows how to start the interaction.

Firstly, to alter the main window view model code so it starts the interaction to show the dialog, follow this procedure:

- Locate and open the **MainWindowViewModel.cs** file.
- Add a declaration for the interaction with the new dialog window, as shown:

```csharp
public Func<MusicStoreViewModel, Task<AlbumViewModel?>>? OnShowDialog { get; set; }
```
This is a delegate that the view will assign. It allows the ViewModel to request a dialog without needing to know how it's displayed.

- Update the _AddAlbumAsync_ method to define an asynchronous command as shown:

```csharp

        [RelayCommand]
        private async Task AddAlbumAsync()
        {
            var store = new MusicStoreViewModel();

            if (OnShowDialog is not null)
            {
                var result = await OnShowDialog(store);
            }
        }
    }
```

At this point, the code for the interaction is still incomplete. If you attempt to run the app now and click the icon button, nothing will happen yet — because the dialog handler hasn't been connected.

Your next step is to make sure that the main window view knows how to start the interaction. This is implemented in the code-behind file for the main window view.  Follow this procedure:

- Locate and open the code-behind **MainWindow.axaml.cs** file. (You may need to expand the **MainWindow.axaml** file to find it.)
- Add the following code to the constructor to handle dialog interaction:

```csharp
using Avalonia;
using Avalonia.Controls;
using Avalonia.MusicStore.ViewModels;

namespace Avalonia.MusicStore.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            this.Opened += (_, _) =>
            {
                if (DataContext is MainWindowViewModel vm)
                {
                    vm.OnShowDialog = async (musicStoreVm) =>
                    {
                        var dialog = new MusicStoreWindow
                        {
                            DataContext = musicStoreVm
                        };

                        return await dialog.ShowDialog<AlbumViewModel?>(this);
                    };
                }
            };
        }
    }
}
```
The added code in the Opened event connects the ViewModel OnShowDialog property to a real method that shows the dialog window.
Specifically, it assigns a function that:
- Creates a new instance of the MusicStoreWindow.
- Sets the window’s DataContext to the dialog’s view model (MusicStoreViewModel).
- Shows the dialog and returns the selected AlbumViewModel result back to the view model.

Now:
- Click **Debug** to compile and run the project.
- Click the icon button.

It all works - but the dialog window opens at the same size as the main window, and offset from it.

## Dialog Position and Size

In the last step here, you will make the dialog smaller that the main window, and open centered on it. You will also make the main window open in the center of the user's screen.

Follow this procedure:

- Stop the app if it is still running.
- Locate and open the **MainWindow.axaml** file.
- Add an attribute to the `<Window>` element to set the start-up position:

```xml
<Window ...
    WindowStartupLocation="CenterScreen">
```

- Locate and open the **MusicStoreWindow.axaml** file.
- Add attributes for the width and height of the dialog, set at 1000 and 550 respectively.
- Add the start-up position attribute set to `CenterOwner`, as shown:

```xml
<Window ...
    Width="1000" Height="550"
    WindowStartupLocation="CenterOwner">
```

- Click **Debug** to compile and run the project.
- Click the icon button.

<p><img className="image-medium-zoom" src={MusicStoreDialogOpenedScreenshot} alt="" /></p>

The dialog window is now opened centered inside the main window.

On the next page, you will learn how to add some content to the dialog window to represent a search for albums, and present the results.
