---
description: TUTORIALS - Music Store App
---

import MusicStoreBeforeTemplateScreenshot from '/img/gitbook-import/assets/image (6) (1) (3) (1).png';
import MusicStoreBeforeWrapPanelScreenshot from '/img/tutorials/music-store-app/add-content-to-dialog/image-20210310010932979.png';
import MusicStoreWrapPanelScreenshot from '/img/tutorials/music-store-app/add-content-to-dialog/image-20210310011526700.png';

# Album View

On this page you will continue developing the search results list for the app by replacing the text currently shown with graphical album tiles.

## Icon Resource

The first step here is to add a resource for the 'music note' icon. You will use this to act as a placeholder icon for the album covers in the app - they will eventually be replaced by the downloaded album cover artwork. 

To add the music note icon resource, follow this procedure:

- Stop the app if it is still running.
- Navigate to the _Avalonia UI_ _GitHub_ to find the list of Fluent Icons at [https://avaloniaui.github.io/icons.html](https://avaloniaui.github.io/icons.html)
- Use your browser's text search to locate the name of the icon 'music_regular'. There should be some code similar to:

```xml
<StreamGeometry x:Key="music_regular">M11.5,2.75 C11.5,2.22634895 12.0230228,1.86388952 12.5133347,2.04775015 L18.8913911,4.43943933 C20.1598961,4.91511241 21.0002742,6.1277638 21.0002742,7.48252202 L21.0002742,10.7513533 C21.0002742,11.2750044 20.4772513,11.6374638 19.9869395,11.4536032 L13,8.83332147 L13,17.5 C13,17.5545945 12.9941667,17.6078265 12.9830895,17.6591069 C12.9940859,17.7709636 13,17.884807 13,18 C13,20.2596863 10.7242052,22 8,22 C5.27579485,22 3,20.2596863 3,18 C3,15.7403137 5.27579485,14 8,14 C9.3521238,14 10.5937815,14.428727 11.5015337,15.1368931 L11.5,2.75 Z M8,15.5 C6.02978478,15.5 4.5,16.6698354 4.5,18 C4.5,19.3301646 6.02978478,20.5 8,20.5 C9.97021522,20.5 11.5,19.3301646 11.5,18 C11.5,16.6698354 9.97021522,15.5 8,15.5 Z M13,3.83223733 L13,7.23159672 L19.5002742,9.669116 L19.5002742,7.48252202 C19.5002742,6.75303682 19.0477629,6.10007069 18.3647217,5.84393903 L13,3.83223733 Z</StreamGeometry>
```

- Copy all of the code for the icon.
- Locate and open the **Icons.axaml** file that you created earlier.
- Paste the copied`<StreamGeometry>` element inside `<Style.Resources>` element.

## Album View

The next step is to create a graphical 'tile' view for an album. You will then cause this to be used instead of the text that currently shows for each album in the list.

To create the graphical 'tile' view, follow this procedure:

- In the solution explorer, right-click the **/Views** folder and then click **Add**. 
- Click **Avalonia User Control**.
- When prompted for the name, type 'AlbumView'.
- Press enter.
- Add the attribute `Width="200"` to the `<UserControl>` element.
- Alter the XAML for the user control's content zone as follows:

```xml
<StackPanel Spacing="5" Width="200">
    <Border CornerRadius="10" ClipToBounds="True">
        <Panel Background="#7FFF22DD">
            <Image Width="200" Stretch="Uniform" />
            <Panel Height="200">
                <PathIcon Height="75" Width="75" Data="{StaticResource music_regular}" />
            </Panel>
        </Panel>
    </Border>    
</StackPanel>
```

The preview pane will now show the new tile view with the music note icon placed in the center.

## View Locator

The album view model will eventually contain data for the name of an album, the artist, and its downloaded cover art, but at this stage you will continue to use just the placeholder music note icon. 

As you saw on the last page, at this point the album list currently just shows the (fully qualified) name of the album view model class.

<img className="center" src={MusicStoreBeforeTemplateScreenshot} alt="" />

In this step you will be using the view locator class (**ViewLocator.cs** file) that was added to the project by the solution template. This class was registered (by the solution template) as a data template at the highest level in the app in the **App.axaml** file. The data template registration looks like this:

```
<Application ...
             xmlns:local="using:Avalonia.MusicStore"
             ... >
    <Application.DataTemplates>
        <local:ViewLocator/>
    </Application.DataTemplates>
    ...
</Application>
```

The view locator can therefore always be found by _Avalonia UI,_ when it searches for a data template.

:::info
For more details about the **data template** concept, see [here](../../concepts/templates/).
:::

The view locator acts as a data template for a view model (in this case the album view model) under the conditions that:

* the view model inherits from the `ViewModelBase` class,
* and there is a view that exists with the same base name.

The view `AlbumView` and the view model `AlbumViewModel` already have the same base name 'Album' and the view `AlbumView` exists. So the only remaining condition for the view locator to work is that the view model has to inherit from the `ViewModelBase` class.

Follow this procedure:

- Locate and open the **AlbumViewModel.cs** file you created earlier.
- Add the code for the class to inherit from `ViewModelBase` as shown:

```csharp
public class AlbumViewModel : ViewModelBase
{        
}
```

- Click **Debug** to compile and run the project.
- Click the icon button.

<p><img className="image-medium-zoom" src={MusicStoreBeforeWrapPanelScreenshot} alt="" /></p>

The view locator is finding the view `AlbumView` to use as a data template for the list items.

## List Items Panel Template

In this step you will tidy up the list display so that the album covers wrap around to fill all the space available.

A list box has a property that contains a template control for laying out the list items. By default this is a stack panel. To make the album covers wrap around to fill all the space, you can change the panel template to be a wrap panel.

You will also add some style attributes to the list box.

To tidy up the list, follow this procedure:

- Stop the app if it is still running.
- Locate and open the **MusicStoreView.axaml** file.
- Expand the `<ListBox>` element so that it has start and end tags.
- Add the `<ListBox.ItemsPanel>` XAML shown:

```xml
<ListBox ItemsSource="{Binding SearchResults}" SelectedItem="{Binding SelectedAlbum}"
    Background="Transparent" Margin="0 20">
    <ListBox.ItemsPanel>
        <ItemsPanelTemplate>
            <WrapPanel />
        </ItemsPanelTemplate>
    </ListBox.ItemsPanel>
</ListBox>
```

- Click **Debug** to compile and run the project.
- Click the icon button.

<p><img className="image-medium-zoom" src={MusicStoreWrapPanelScreenshot} alt="" /></p>

On the next page, you will add some business logic in the form of a data service, so that you can get real album data from the search.
