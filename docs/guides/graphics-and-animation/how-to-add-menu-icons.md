---
id: how-to-add-menu-icons
title: How To Add Menu Icons
---


# How To Add Menu Icons

In Avalonia, you can enhance the appearance and user experience of your application by adding icons to menu items. Icons can provide a visual clue for the action performed by the menu item, making it easier for users to navigate through your application. This guide will walk you through how to add icons to menu items in Avalonia.

## Adding Icons to Menu Items

The `MenuItem.Icon` property is used to set an icon for a menu item. You can use various kinds of image sources for the icon, including resource URIs, file paths, or web URLs. Here's an example of how to add an icon to a menu item:

```xml
<Menu>
  <MenuItem Header="File">
    <MenuItem Header="Open" Command="{Binding OpenCommand}">
      <MenuItem.Icon>
        <Image Width="16" Height="16" Source="avares://MyApp/Assets/open_icon.png" />
      </MenuItem.Icon>
    </MenuItem>
  </MenuItem>
</Menu>
```

In this example, the `MenuItem.Icon` property is set to an `Image` control that displays an image from the application resources. The `Source` property of the `Image` control is set to a resource URI that represents the image source. The `Width` and `Height` properties are set to control the size of the image.

