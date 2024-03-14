---
description: TUTORIALS - Music Store App
---

import MusicStoreDarkModePreviewScreenshot from '/img/tutorials/music-store-app/creating-a-modern-looking-window/dark-mode-preview.png';
import MusicStoreAcrylicMaterialScreenshot from '/img/tutorials/music-store-app/creating-a-modern-looking-window/acrylic-material.png';
import MusicStoreFullAcrylicWindowScreenshot from '/img/tutorials/music-store-app/creating-a-modern-looking-window/full-acrylic-window.png';

# Window Styling

On this page, you will make the main window look modern by applying a dark theme, and an acrylic blur to the window background.

## Dark Mode

Follow this procedure to style the main window in 'dark' mode:

- Stop the app if it is still running.
- Locate and open the file **App.axaml**.
- In the XAML, change the `RequestedThemeVariant` attribute in the `<Application>` element from "Default" to "Dark"

```xml
<Application ...
    RequestedThemeVariant="Dark">
```

- Now locate and open the **MainWindow.axaml** file in the **/Views** folder.

Notice that the preview pane is still showing the window in 'light' mode. The application will require a rebuild for the new mode to show in the preview pane.

- Click **Build Startup Project** on the **Build** menu.

The preview pane now changes to the dark mode.

<p><img className="image-medium-zoom" src={MusicStoreDarkModePreviewScreenshot} alt="" /></p>

## Acrylic Blur

Follow this procedure to style the background of the main window with an acrylic blur:

- Locate and open the **MainWindow.axaml** file in the **/Views** folder.
- Find the end of the opening tag of the `<Window>` element.
- After the `Title="Avalonia.MusicStore"` attribute, add two new attributes as follows:

```xml
<Window ...
        Title="Avalonia.MusicStore"

        TransparencyLevelHint="AcrylicBlur"
        Background="Transparent">
```

- To apply the acrylic effect to the whole window, replace the `<TextBlock>` element in the content zone of the main window with the following XAML for a panel:

```xml
<Window ... >
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
       </Panel>
   </Window>
```

- Click **Debug** (top right of the IDE) to compile and run the project.

<p><img className="image-medium-zoom" src={MusicStoreAcrylicMaterialScreenshot} alt="" /></p>

Notice that, as expected, the acrylic window effect covers the content zone of the main window. However the effect does not yet extend to the title bar.

:::warning
Note that _Linux_ users can not yet take advantage of the following code due to limitations of the X11 version. The tutorial code will run and the window will still work on _Linux_, but the full effect will not be realised.
:::

Follow this procedure to extend the acrylic blur effect onto the title bar:

- Stop the app if is still running.
- Find the end of the opening tag of the `<Window>` element again.
- Add the `ExtendClientAreaToDecorationsHint` attribute as shown:

```xml
   <Window ...
           TransparencyLevelHint="AcrylicBlur"
           Background="Transparent"

           ExtendClientAreaToDecorationsHint="True">
```

- Click **Debug** to compile and run the project.

<p><img className="image-medium-zoom" src={MusicStoreFullAcrylicWindowScreenshot} alt="" /></p>

Now you have the acrylic blur effect extending into the title bar. On the next page you will learn how to add and layout a control in the window.
