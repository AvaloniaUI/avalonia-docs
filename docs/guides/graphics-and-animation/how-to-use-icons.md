---
id: how-to-use-icons
title: How To Use Icons
---


# How To Use Icons

In Avalonia, using icons in your user interface can help to improve the look of your application and can make it more user-friendly. Icons can provide a visual representation of actions or content, making it easier for users to understand the functionality of your application. This guide will show you how to add and use icons in your Avalonia application.


## Using Icons in Avalonia
Icons can be added to your Avalonia application in various ways. This guide will cover two common methods: using image files and using icon fonts.

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

## Best Practices

While using icons can enhance the usability of your application, it is important to use them wisely. Keep the following tips in mind when using icons:

* Ensure that the icons are of a suitable size and clearly visible against the background.
* Use universally recognized icons for common actions to make your application more intuitive.





