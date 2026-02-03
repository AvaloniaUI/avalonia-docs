---
index: adding-icons
title: Adding icons
---

## UI icons

In Avalonia, using icons in your user interface can help to improve the look of your application and can make it more user-friendly. Icons can provide a visual representation of actions or content, making it easier for users to understand the functionality of your application.

Icons can be added to your Avalonia application in various ways. This guide will cover three common methods: using image files, using icon fonts, and using path icons.

### Using Image Files
One way to use icons in Avalonia is by using image files. You can use various formats like PNG, JPG, or BMP. Here's an example of how to use an image file as an icon:

```xml
<Image Width="16" Height="16" Source="avares://MyApp/Assets/icon.png" />
```

In this example, an `Image` control is used to display an image from the application's resources as an icon. The `Source` property of the `Image` control is set to a resource URI that points to the image file.

### Using Icon Fonts

Another way to use icons in Avalonia is by using icon fonts. Icon fonts allow you to use scalable vector icons that can be customized with CSS in terms of size, color, drop shadow, etc. Here's an example of how to use an icon font in Avalonia:

```xml
<TextBlock FontFamily="avares://MyApp/Assets/#FontAwesome" Text="&#xf030;" />
```

In this example, a `TextBlock` control is used to display an icon from the `FontAwesome` icon font. The `FontFamily` property of the `TextBlock` control is set to a resource URI that points to the font file, and the Text property is set to the Unicode value of the desired icon.

### Using Path Icons

Path icons can draw icons from `Geometry` which includes using paths from the scalable vector graphics (SVG) format that can be customized with size and color. See the [reference](/docs/reference/controls/path-icon) for how to use this control.

### Best Practices

While using icons can enhance the usability of your application, it is important to use them wisely. Keep the following tips in mind when using icons:

* Ensure that the icons are of a suitable size and clearly visible against the background.
* Use universally recognized icons for common actions to make your application more intuitive.

## Menu icons

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