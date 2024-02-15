---
id: assets
title: Assets and Images
---

import AssetFileDiagram from '/img/basics/user-interface/asset-file.png';
import AssetLibraryDiagram from '/img/basics/user-interface/asset-library.png';

# Assets

Many applications need to include assets such as bitmaps, styles and resource dictionaries. Resource dictionaries contain graphical fundamentals that can be declared in XAML. Styles can also be written in XAML, but bitmap assets are binary files, for example PNG and JPEG formats.

## Including assets

<img src={AssetFileDiagram} alt=''/>

You include assets in an application by using the `<AvaloniaResource>` element in your project file.

For example, the Avalonia .NET Core MVVM App solution template creates a folder called `Assets` (containing the `avalonia-logo.ico` file) and adds an element to the project file to include any files located there. As follows:

```xml
<ItemGroup>
  <AvaloniaResource Include="Assets\**"/>
</ItemGroup>
```

You can include whatever files you want by adding additional `<AvaloniaResource>` elements in this item group.

:::tip
The element name `AvaloniaResource` here only indicates that the assets will be internally stored as .NET resources by the build. However, in _Avalonia UI_ terms, these files are called 'Assets' to distinguish them from 'XAML resources'.
:::


### Referencing Included Assets

Once asset files are included, they can be referenced as needed in the XAML that defines your UI. For example, these assets are referenced by specifying their relative path:

```xml
<Image Source="icon.png"/>
<Image Source="images/icon.png"/>
<Image Source="../icon.png"/>
```

As an alternative, you can use the rooted path:

```xml
<Image Source="/Assets/icon.png"/>
```

## Library Assets

<img src={AssetLibraryDiagram} alt=''/>

If the asset is included in a different assembly from the XAML file, then you use the `avares:` URI scheme. For example, if the asset is contained in an assembly called `MyAssembly.dll` in a `Assets` folder, then you use:

```xml
<Image Source="avares://MyAssembly/Assets/icon.png"/>
```

### Asset Type Conversion

Avalonia UI has built-in converters which can load assets for bitmaps, icons and fonts out of the box. So an assets Uri can be automatically converted to any of following:

* Image - `Image` type
* Bitmap - `Bitmap` type
* Window Icon - `WindowIcon` type
* Font - `FontFamily` type

### Loading Assets in Code

You can write code to load assets using the `AssetLoader` static class. For example:

```csharp
var bitmap = new Bitmap(AssetLoader.Open(new Uri(uri)));
```

The `uri` variable in the above code can contain any valid URI with `avares:` scheme (as described above).

_Avalonia UI_ does not provide support for `file://`, `http://`, or `https://` schemes. If you want to load files from disk or the Web, you must implement that functionality yourself or use community implementations.

:::info
Avalonia UI has a community implementation for an image loader at [https://github.com/AvaloniaUtils/AsyncImageLoader.Avalonia](https://github.com/AvaloniaUtils/AsyncImageLoader.Avalonia)
:::
