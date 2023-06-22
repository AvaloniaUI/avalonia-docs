---
id: image
title: Image
---

The `Image` control is a control for displaying raster images.

### Binding

Binding onto an `Image` control's `Source` property with a `string` must be done using a [binding converter](https://docs.avaloniaui.net/docs/data-binding/converting-binding-values) that will convert the `string` to an `IBitmap`.

### Examples

#### Swappable Image Button

An image button that changes images based on state is an example where binding to the `Image` control's `Source` property might seem necessary.

To have a button that swaps the image it's showing based on its state, you could either use a [binding converter](https://docs.avaloniaui.net/docs/data-binding/converting-binding-values) that converts a `string` into a `IBitmap`, or you could use the declarative approaches below, which don't use binding.

The declarative approaches keep images in memory and won't have to load them in on-demand, which will net you greater performance than a binding approach. You must declare every image you will use inside your XAML with the declarative approach.

**Binding Converter Approach**

```markup
<UserControl.Resources>
    <ext:BitmapAssetValueConverter x:Key="variableImage"/>
</UserControl.Resources>
```

```markup
<Image Width="75"
       Height="73"
       Source="{Binding PlaySource, Converter={StaticResource variableImage}}">
```

```csharp
/// <summary>
/// <para>
/// Converts a string path to a bitmap asset.
/// </para>
/// <para>
/// The asset must be in the same assembly as the program. If it isn't,
/// specify "avares://<assemblynamehere>/" in front of the path to the asset.
/// </para>
/// </summary>
public class BitmapAssetValueConverter : IValueConverter
{
    public static BitmapAssetValueConverter Instance = new BitmapAssetValueConverter();

    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value == null)
            return null;

        if (value is string rawUri && targetType.IsAssignableFrom(typeof(Bitmap)))
        {
            Uri uri;

            // Allow for assembly overrides
            if (rawUri.StartsWith("avares://"))
            {
                uri = new Uri(rawUri);
            }
            else
            {
                string assemblyName = Assembly.GetEntryAssembly().GetName().Name;
                uri = new Uri($"avares://{assemblyName}/{rawUri}");
            }

            var assets = AvaloniaLocator.Current.GetService<IAssetLoader>();
            var asset = assets.Open(uri);

            return new Bitmap(asset);
        }

        throw new NotSupportedException();
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotSupportedException();
    }
}
```

**Declarative Approaches**

**Using a Button**

View the ["Play Button" example](https://docs.avaloniaui.net/docs/controls/button#play-button) in the `Button` documentation.

**Using a ToggleButton**

View the ["Speaker Mute Button" example](https://docs.avaloniaui.net/docs/controls/togglebutton#speaker-mute-button) in the ToggleButton documentation.

### Reference

[Image](http://reference.avaloniaui.net/api/Avalonia.Controls/Image/)

### Source code

[Image.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Image.cs)
