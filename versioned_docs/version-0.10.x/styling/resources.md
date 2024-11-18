---
id: resources
title: Resources
---

Often, styles and controls will need to share resources such as \(but not limited to\) brushes and colors. You can put such resources in the `Resources` dictionary which is available on every style and control and then refer to these resources elsewhere.

## Declaring resources

If a resource is to be available to your entire application, you can define it in `App.xaml`/`App.axaml`:

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.App">
  <Application.Resources>
    <SolidColorBrush x:Key="Warning">Yellow</SolidColorBrush>
  </Application.Resources>
</Application>
```

Alternatively you can declare resources on a `Window` or `UserControl`: the resource will be available to the `Window`/`UserControl` and its children:

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.MyUserControl">
  <UserControl.Resources>
    <SolidColorBrush x:Key="Warning">Yellow</SolidColorBrush>
  </UserControl.Resources>
</UserControl>
```

Or in fact any control at all:

```xml
<Window xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.MainWindow">
  <StackPanel>
    <StackPanel.Resources>
      <SolidColorBrush x:Key="Warning">Yellow</SolidColorBrush>
    </StackPanel.Resources>
  </StackPanel>
</Window>
```

You can also declare resources on styles:

```xml
<Style Selector="TextBlock.warn">
  <Style.Resources>
    <SolidColorBrush x:Key="Warning">Yellow</SolidColorBrush>
  </Style.Resources>
</Style>
```

## Referencing resources

You can references resources from controls using the `{DynamicResource}` markup extensions, e.g.:

```xml
<Border Background="{DynamicResource Warning}">
  Look out!
</Border>
```

Alternatively there is the `StaticResource` markup extension which has a few limitations with respect to `DynamicResource`:

* It will not respond to changes in the resource
* The resource needs to be declared in the same XAML file

In return, `StaticResource` doesn't need to add an event handler to listen for changes in resources which means it uses slightly less memory.

## Overriding resources

Resources are resolved by walking up the logical tree from the point of the `DynamicResource` or `StaticResource` until a resource with the requested key is found. This means that resources can be "overridden" in sub-trees of the application, for example:

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.MyUserControl">
  <UserControl.Resources>
    <SolidColorBrush x:Key="Warning">Yellow</SolidColorBrush>
  </UserControl.Resources>

  <StackPanel>
    <StackPanel.Resources>
      <SolidColorBrush x:Key="Warning">Orange</SolidColorBrush>
    </StackPanel.Resources>

    <Border Background="{DynamicResource Warning}">
      Look out!
    </Border>
  </StackPanel>
</UserControl>
```

Here's the `Border`'s background will be `Orange` because its parent `StackPanel` has "overridden" the `Warning` resource from the `Yellow` declared on the `UserControl`.

## Merged resource dictionaries

The `Resources` property on each control and style is of type `ResourceDictionary`. Resource dictionaries can also include other resource dictionaries by making use of the `MergedDictionaries` property. To include a resource dictionary in another you can use the `ResourceInclude` class, e.g.:

```xml
<Window.Resources>
  <ResourceDictionary>
    <ResourceDictionary.MergedDictionaries>
      <ResourceInclude Source='/AnotherResourceDictionary.xaml'/>
    </ResourceDictionary.MergedDictionaries>
    <SolidColorBrush x:Key="Warning">Yellow</SolidColorBrush>
  </ResourceDictionary>
</Window.Resources>
```

Where `AnotherResourceDictionary` is a XAML file with a root of `ResourceDictionary` and is included as an [asset](../getting-started/assets.md) in the application.

## Resource resolution

As mentioned above, resources are resolved by walking up the logical tree from the point of the `DynamicResource` or `StaticResource` until a resource with the requested key is found. However the presence of styles and merged dictionaries complicates this somewhat. The precedence is as follows:

* Control resources
  * Merged dictionaries
* Style resources
  * Merged dictionaries

For the example application below, resource lookup for a resource defined on the `Border` control would follow the order indicated in `[]` brackets:

```text
Application
 |- Resources [11]
     |- Merged dictionary [12]
     |- Merged dictionary [13]
 |- Styles
     |- Resources [14]
         |- Merged dictionary [15]
         |- Merged dictionary [16]

Window
 |- Resources [6]
     |- Merged dictionary [7]
 |- Styles
     |- Resources [8]
         |- Merged dictionary [9]
         |- Merged dictionary [10]
 |- StackPanel
     |- Resources [1]
         |- Merged dictionary [2]
         |- Merged dictionary [3]
     |- Styles
         |- Resources [4]
             |- Merged dictionary [5]
     |- Border
```

## Theme resources

Themes will usually define brushes, colors and other settings as resources. By changing these resources one can e.g. switch from a dark to a light theme. The resources defined will usually be specific to the theme in use but you can see the resources defined by the default theme [here](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Themes.Fluent/Accents/BaseResources.xaml).
