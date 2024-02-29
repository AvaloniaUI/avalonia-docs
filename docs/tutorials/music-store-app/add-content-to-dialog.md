---
description: TUTORIALS - Music Store App
---

import MusicStoreDialogContentDiagram from '/img/gitbook-import/assets/image (9) (3).png';

# Add Dialog Content

On the this page you will learn how to add some content to the dialog window. This will be some controls for the search and a dialog close button; together with a list of placeholders for the album covers - these will eventually be loaded as the results of the search.

To arrange the dialog controls, you will use the dock panel layout control, that is part of the _Avalonia UI_ built-in controls. This will keep the search controls at the top of the dialog, and the button at the bottom, whatever the height. The list will be the 'fill' area of the dock panel, so it will always take up all the remaining content zone.

<img className="center" src={MusicStoreDialogContentDiagram} alt="" />

:::info
For full information on the dock panel control, see the reference [here](../../reference/controls/dockpanel.md).
:::

The dock panel itself will be located on an _Avalonia UI_ user control. This is so the code that shows the dialog can be separated from the code that operates the controls within the dialog.

:::info
This is a common pattern of UI Composition, to read about this concept, see [here](../../concepts/ui-composition.md).
:::

Follow this procedure to add the user control and constituent controls for the dialog:

- Stop the app if it is still running.
- In the solution explorer, right-click the **/Views** folder and then click **Add**.
- Click **Avalonia User Control**.
- When prompted for the name, type 'MusicStoreView'.
- Press enter.
- Alter the XAML for the user control's content zone as follows:

```xml
<UserControl ... >
  <DockPanel>
    <StackPanel DockPanel.Dock="Top">
      <TextBox Watermark="Search for Albums...." />
      <ProgressBar IsIndeterminate="True"  />
    </StackPanel>
      <Button Content="Buy Album" 
              DockPanel.Dock="Bottom" 
              HorizontalAlignment="Center" />
      <ListBox/>
  </DockPanel>
</UserControl>
```

Inside the dialog the user will be able to search for albums, but this will use a Web API, and may take some time to return. It is for this reason that you have added a progress bar. The progress bar will be active during the search - to provide visual feedback to the user.

Also, to ensure that the app remains responsive during the search, you will implement the operation itself as both asynchronous and cancellable.  You will add this functionality later in the tutorial.

Now the next step is for you to add the new user control to the content zone of the dialog window.

To add the user control, follow this procedure:

- Locate and open the **MusicStoreWindow.axaml** file.
- Add the namespace for the views to the `<Window>` element:

```xml
<Window ...
    xmlns:views="using:Avalonia.MusicStore" >    
```

- Inside the panel element, add an element for new user control:

```xml
<Panel Margin="40">
   <views:MusicStoreView/>
</Panel>
```

You will see the controls appear in the preview pane.

On the next page, you will learn how to use a mock for the album search feature - this is so that you can create the view and view model for the results, and leave the implementation of the real search until later.
