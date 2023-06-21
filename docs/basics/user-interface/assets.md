---
id: assets
title: Assets and Images
---

# Assets

Many applications need to include assets such as bitmaps, styles and resource dictionaries. Resource dictionaries contain graphical fundamentals that can be declared in XAML. Styles can also be written in XAML, but bitmap assets are binary files, for example PNG and JPEG formats.

Assets are included in an application when it is built in a number of ways:

* _Included Assets -_ are files that are external to the executable.
* _Embedded Assets -_ are included as part of the executable during the build.
* _Library Assets -_ are embedded a separate assembly.

## Included Assets

<img src="../.gitbook/assets/image (8).png" alt=""/>

You include assets in an application by using the `<AvaloniaResource>` element in your project file.

For example, the Avalonia .NET Core MVVM App solution template creates a folder called `Assets` (containing the `avalonia-logo.ico` file) and adds an element to the project file to include any files located there. As follows:

```markup
<ItemGroup>
  <AvaloniaResource Include="Assets\**"/>
</ItemGroup>
```

You can include whatever files you want by adding additional `<AvaloniaResource>` elements in this item group.

:::tip
The element name `AvaloniaResource` here only indicates that the assets will be internally stored as .NET resources by the build. However, in _Avalonia UI_ terms, these files are called 'Assets' to distinguish them from 'XAML resources'.
:::

For guidance on how to use XAML resources in you application, see [here](../guides/styles-and-resources/resources.md).

:::info
For more detail about .NET resources, see the _Microsoft_ documentation [here](https://docs.microsoft.com/en-us/visualstudio/ide/managing-application-resources-dotnet).
:::

### Referencing Included Assets <a href="#referencing-assets" id="referencing-assets"></a>

Once asset files are included, they can be referenced as needed in the XAML that defines your UI. For example, these assets are referenced by specifying their relative path:

```markup
<Image Source="icon.png"/>
<Image Source="images/icon.png"/>
<Image Source="../icon.png"/>
```

As an alternative, you can use the rooted path:

```markup
<Image Source="/Assets/icon.png"/>
```

## Embedded Assets

<img src="../.gitbook/assets/image (1).png" alt=""/>

Assets can also be included in .NET applications by using the `<EmbeddedResource>` element in the project file. This causes the file to be included in the assembly as a manifest resource.

:::info
For more detail about manifest resources, see the _Microsoft_ documentation [here](https://docs.microsoft.com/en-us/dotnet/api/system.reflection.assembly.getmanifestresourcenames).
:::

### Referencing Embedded Assets <a href="#referencing-assets" id="referencing-assets"></a>

You reference manifest resources using the `resm:` URL scheme and a fully qualified path. For example:

```markup
<Image Source="resm:MyApp.Assets.icon.png"/>
```

The name of an asset is automatically generated during the build from the assembly name, the file path, the filename and extension - all separated with periods.

## Library Assets

<img src="../.gitbook/assets/image.png" alt=""/>

Assets in a library have been either included or embedded during the library build.

If embedded, they can be referenced using a pattern similar to any locally embedded assets, just with an additional assembly name suffix. For example:

```markup
<Image Source="resm:MyLibrary.Assets.icon2.png?assembly=MyLibrary"/>
```

If the asset is included in a different assembly from the XAML file, then you use the `avares:` URI scheme. For example, if the asset is contained in an assembly called `MyAssembly.dll`, then you use:

```markup
<Image Source="avares://MyAssembly/Assets/icon.png"/>
```

If Avalonia is unable to find a manifest resource, check the resource name using [`Assembly.GetManifestResourceNames`](https://docs.microsoft.com/en-us/dotnet/api/system.reflection.assembly.getmanifestresourcenames).

### Asset Type Conversion

Avalonia UI has built-in converters which can load assets for bitmaps, icons and fonts out of the box. So an assets Uri can be automatically converted to any of following:

* Image - `IImage` type
* Bitmap - `IBitmap` type
* Window Icon - `WindowIcon` type
* Font - `FontFamily` type

### Loading Assets in Code <a href="#loading-assets-from-code" id="loading-assets-from-code"></a>

You can write code to load assets using the `IAssetLoader` interface. For example:

```csharp
var assets = AvaloniaLocator.Current.GetService<IAssetLoader>();
var bitmap = new Bitmap(assets.Open(new Uri(uri)));
```

The `uri` variable in the above code can contain any valid URI, including `avares:` and `resm:` schemes (as described above).

_Avalonia UI_ does not provide support for `file://`, `http://`, or `https://` schemes. If you want to load files from disk or the Web, you must implement that functionality yourself or use community implementations.

:::info
Avalonia UI has a community implementation for an image loader at [https://github.com/AvaloniaUtils/AsyncImageLoader.Avalonia](https://github.com/AvaloniaUtils/AsyncImageLoader.Avalonia)
:::
