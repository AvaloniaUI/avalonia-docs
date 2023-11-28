---
id: resources
title: How To Use Resources
---


# 👉 How To Use Resources

You will often need to standardise graphical fundamentals such as (but not limited to) brushes and colors in your applications. You can define these as resources at various levels in your _Avalonia UI_ application, as well as in files that can be included as required.

Resources are always defined inside a resource dictionary. This means that each resource has a key attribute.

The level of a resource dictionary defines the scope of the resources in it: resources are available in the file where they are defined, and below. So you can tailor the scope of resources by choosing where to locate a resource dictionary.

## Declaring Resources

For example, you may want brush colors to be standardized across the whole application. In this case you can declare a resource dictionary in the application XAML **App.axaml** file, like this

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.App">
    // highlight-start
  <Application.Resources>
    <SolidColorBrush x:Key="Warning">Yellow</SolidColorBrush>
  </Application.Resources>
    // highlight-end
</Application>
```

Alternatively, you may want a set of resources to apply only to a specific window or user control. In this case you will define a resource dictionary in the window or user control file. For example:

```xml title="MyUserControl.axaml"
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.MyUserControl">
    // highlight-start
  <UserControl.Resources>
    <SolidColorBrush x:Key="Warning">LightYellow</SolidColorBrush>
  </UserControl.Resources>
    // highlight-end
</UserControl>
```

In fact you can define resources at control level if required:

```xml title="MainWindow.axaml"
<Window xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.MainWindow">
  <StackPanel>
    // highlight-start
    <StackPanel.Resources>
      <SolidColorBrush x:Key="Warning">PaleGoldenRod</SolidColorBrush>
    </StackPanel.Resources>
    // highlight-end
  </StackPanel>
</Window>
```

You can also declare resources to be specific to a style. 

```xml title="MyStyle.axaml"
<Style Selector="TextBlock.warning">
  <Style.Resources>
    <SolidColorBrush x:Key="Warning">Yellow</SolidColorBrush>
  </Style.Resources>
  <Setter ... />
</Style>
```

:::note
Keep in mind, this resource is not visible outside of the this specific style block, meaning it won't make every TextBlock with a "warning" class aware of this resource outside of the Style block.
:::

It is also possible to define resources for specific theme variants: Dark, Light or custom. From the example below, `BackgroundBrush` and `ForegroundBrush` will have different values depending on the current theme variant set by the system or application. For more information about theme variants please read [Theme Variants](how-to-use-theme-variants) page.

```xml
<ResourceDictionary>
    <ResourceDictionary.ThemeDictionaries>
        <ResourceDictionary x:Key='Light'>
            <SolidColorBrush x:Key='BackgroundBrush'>White</SolidColorBrush>
            <SolidColorBrush x:Key='ForegroundBrush'>Black</SolidColorBrush>
        </ResourceDictionary>
        <ResourceDictionary x:Key='Dark'>
            <SolidColorBrush x:Key='BackgroundBrush'>Black</SolidColorBrush>
            <SolidColorBrush x:Key='ForegroundBrush'>White</SolidColorBrush>
        </ResourceDictionary>
    </ResourceDictionary.ThemeDictionaries>
</ResourceDictionary>
```

## Resource Dictionary Files

You can improve the organisation of your _Avalonia UI_ application project by defining resource dictionaries in their own files. This makes resource definitions easy to locate and maintain.

Resources located in a resource dictionary file are accessible to the entire application.

To add a resource dictionary file, follow this procedure:

-  Right-click your project at the location where you want the new file created.
-  Click **Add**, then **New Item**.
-  Click **Avalonia** in the list on the left:

<img src="/img/gitbook-import/assets/image (8) (1) (2).png" alt=""/>

-  Click **Resource Dictionary (Avalonia)**.
-  Type the file name you want to use.
-  Click **Add**.

You can now add the resources you want to define in the position indicated. It looks like this:

```xml
<ResourceDictionary xmlns="https://github.com/avaloniaui"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <!-- Add Resources Here -->
</ResourceDictionary>
```

## Using Resources

You can use a resource from a resources dictionary that is in scope using the `{DynamicResource}` mark-up extension.

For example, to use a resource directly on the background attribute of a border element, use the following XAML :

```xml
<Border Background="{DynamicResource Warning}">
  Look out!
</Border>
```

### Static Resource

Alternatively you can choose to use the `StaticResource` mark-up extension. For example:

```xml
<Border Background="{StaticResource Warning}">
  Look out!
</Border>
```

A static resource is different in that it will not respond to changes in the resource made in code (at runtime). Once loaded a static cannot be altered.

The benefit of using a static resource is that it has less work to do so it will be slightly faster to load, and it uses slightly less memory.

## Resource Priority

_Avalonia UI_ resolves what resource to use by searching upwards in the **logical control tree** from the level of a `DynamicResource` or `StaticResource` mark-up, looking for the resource key.

This means that resources with the same key have priority based on their proximity to the resource mark-up being resolved. Resource definitions further up the logical control tree are therefore effectively 'overridden' by those that are closer. For example, consider this XAML:

```xml
<UserControl ... >
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

Here the border control is using the resource with the key 'Warning'. This is defined twice - once at the level of the enclosing stack panel, and again at user control level. _Avalonia UI_ will determine that the border background should be be orange because its parent stack panel is first in a search upwards in the logical control tree from the border itself.

## Include and Merge Resources

Resources can be included from a resource dictionary file, and merged with the resources defined in another file (even if there are not any).

<img src="/img/gitbook-import/assets/image (1) (3).png" alt=""/>

This means that you can implement styles in one file, and use resources defined in another. This keeps your styling consistent, and your application solution well organised and easy to maintain.

To include the resources dictionary from a file in a styles file, add the following XAML:

```xml
<Styles.Resources>
    <ResourceDictionary>
      <ResourceDictionary.MergedDictionaries>
        <ResourceInclude Source="/Assets/AppResources.axaml"/>
      </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
  </Styles.Resources>
```

In the above example, the resources file `AppResources.axaml` is located in the `/Assets` project folder. You can then define the styles using the resources, for example:

```xml
<Style Selector="Button.btn-info">
    <Setter Property="Background" Value="{StaticResource InfoColor}"/>
</Style>
```

Where the resource `InfoColor` is defined as a `SolidColorBrush` in the imported file.

:::info
Note that the resource has been referenced using `StaticResource` because it must not change - the requirement here is to keep the styling consistent.
:::

## Merged Resources Priority 

As you saw previously, resources are resolved by searching up the logical control tree from the point of mark-up until a resource with the requested key is found.

However the presence of styles and merged dictionaries defined at the various levels of an application, introduces extra priority rules as follows:

* Control resources -> Merged dictionaries
* Style resources -> Merged dictionaries
* App resources -> Merged dictionaries

For example, in the theoretical application below, the search for a resource used on the border control (at the bottom) will follow the order indicated in square `[]` brackets:

```
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

Starting at the border, the first resources searched are any defined in the parent (stack panel) control. After that any merged dictionaries at the same level are considered - in the sequence that they appear in the XAML.

The search then moves on to search any styles defined in the parent (stack panel) control, followed by any merged dictionaries at that level.

The search moves upwards in the logical control tree, behaving at each level in a similar manner. It finally reaches application-level resources and styles.

## Consuming Resources from code

Avalonia provides different options to access Resources from code. 

:::note

`ResourceNode` in the below samples can be any node that supports `Resource`, like `Appliction.Current`, `Window`, `UserControl`, ... 

:::

- **ResourceNode.Resources["TheKey"]**: <br/>
  This will directly access the underlaying `Dictionary`. Be aware: Merged Dictionaries and parents will not be scanned. 
- **ResourceNode.TryGetResource**: <br/>
  This function will try to get a specific resource and return `true` if successful, otherwise `false`. Merged dictionaries will be scanned, but it will not follow the logical tree. 
- **ResourceNode.TryFindResource**:  <br/>
  This extension method will try to get a specific resource and return `true` if successful, otherwise `false`. Merged dictionaries and the logical tree will be scanned as well.
- **ResourceNode.GetResourceObservable**: <br/>
  This will return an [`IObservable`](https://learn.microsoft.com/en-us/dotnet/api/System.IObservable-1) which can be used to observe changes on the resource. For example you could bind to it.

```cs
// In this sample we have defined the resource in App.axaml and we want to look up the value in the MainWindow constructor.
//
//    </Application.Resources>
//         <x:String x:Key="TheKey">HelloWorld</x:String>
//    </Application.Resources>

public MainWindow()
{
    InitializeComponent();

    // found1 = false | result1 = null
    var found1 = this.TryGetResource("TheKey", this.ActualThemeVariant, out var result1);

    // found2 = true | result2 = "Hello World" 
    var found2 = this.TryFindResource("TheKey", this.ActualThemeVariant, out var result2);

    // Dound the resource to a TextBlock from code behind
    myTextBlock.Bind(TextBlock.TextProperty, Resources.GetResourceObservable("TheKey"));

    // this will update myTextBlock.Text via the bound observable
    this.Resources["TheKey"] = "Hello from code behind"; 
}
```
