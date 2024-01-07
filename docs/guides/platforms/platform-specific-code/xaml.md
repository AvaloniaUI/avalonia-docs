---
id: xaml
title: Platform-Specific XAML
---

## OnPlatform Markup Extension

### Overview
The OnPlatform markup extension in Avalonia allows developers to specify different values for a property based on the operating system on which the application is running. This is particularly useful for creating cross-platform applications that need to adapt their UI or behavior according to the platform.

### Basic usage in markup extension syntax

You can specify values for each platform and a default value that will be used if no specific platform match is found:

```xml
<TextBlock Text="{OnPlatform Default='Unknown', Windows='Im Windows', macOS='Im macOS', Linux='Im Linux'}"/>
```

Alternatively, you can use constructor syntax to define the default value directly, skipping `Default` keyword. Platform-specific properties still need to be defined:

```xml
<TextBlock Text="{OnPlatform 'Hello World', Android='Im Android'}"/>
```

You can use this markup extension with any other type, not only strings:

```xml
<Border Height="{OnPlatform 10, Windows=50.5}"/>
```

### Specifying Type Arguments

You can use custom TypeArguments to explicitly specify the type for the values:

```xml
<TextBlock Tag="{OnPlatform '0, 0, 0, 0', Windows='10, 10, 10, 10', x:TypeArguments=Thickness}"/>
```

In this sample above, `Tag` property has type of `object`, so compiler doesn't have enough information to parse input strings. Without specifying TypeArguments, property will have value of `string` on all platforms. But since we have `TypeArguments` here, compiler will parse them as `Thickness` values.

### Nested Markup Extensions

The OnPlatform extension supports nesting other markup extensions within it:

```xml
<Border Background="{OnPlatform Default={StaticResource DefaultBrush}, Windows={StaticResource WindowsBrush}}"/>
```

### XML Syntax

OnPlatform can also be used in XML syntax for defining property values:

```xml
<StackPanel>
    <OnPlatform>
        <OnPlatform.Default>
            <ToggleButton Content="Hello World" />
        </OnPlatform.Default>
        <OnPlatform.iOS>
            <ToggleSwitch Content="Hello iOS" />
        </OnPlatform.Windows>
    </OnPlatform>
</StackPanel>
```

Note, in this sample, `OnPlatform` is a child of `StackPanel`. But in runtime only single actual control will be created (`ToggleButton` or `ToggleSwitch`) and added to the StackPanel.

### Complex Property Setters

Similarly to the previous sample, OnPlatform can be part of complex property setters within a ResourceDictionary or other dictionaries or collections:

```xml
<ResourceDictionary>
    <OnPlatform x:Key="MyBrush">
        <OnPlatform.Default>
            <SolidColorBrush Color="Blue" />
        </OnPlatform.Default>
        <OnPlatform.iOS>
            <SolidColorBrush Color="Yellow" />
        </OnPlatform.Windows>
    </OnPlatform>
</ResourceDictionary>
```

### XML Combining Syntax

To avoid branches duplication, it is possible to define multiple platforms in a single branch. Another useful example would be including platform-specific styles:

```xml
<Application.Styles>
    <!-- Always included -->
    <FluentTheme />

    <!-- Only one branch is executed in runtime -->
    <OnPlatform>
        <!-- if (Android || iOS) -->
        <On Options="Android, iOS">
            <StyleInclude Source="/Styles/Mobile.axaml" />
        </On>
        <!-- else -->
        <On Options="Default">
            <StyleInclude Source="/Styles/Default.axaml" />
        </On>
    </OnPlatform>
</Application.Styles>
```

### Additional details

`OnPlatform` markup extension works in a similar way to how switch-case works in C# code. Compiler will generate branches for all possible values, but only one branch will be executed at runtime depending on the condition.

It is also useful to remember that if an application is built with a specific [Runtime Identifier](https://learn.microsoft.com/en-us/dotnet/core/rid-catalog) and with [Trimming Enabled](https://learn.microsoft.com/en-us/dotnet/core/deploying/trimming/trimming-options), `OnPlatform` extension will have its branches trimmed only to those that are possible. For example, if `OnPlatform` had branches for Windows and macOS, but was built for Windows only, other branches will be removed, which also reduces application size.


## OnFormFactor Markup Extension

The `OnFormFactor` markup extension functions similarly to the `OnPlatform` and has the same general syntax. The main difference is that it allows defining values not per platform, but per device form factor, such as Desktop and Mobile:

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <TextBlock Text="{OnFormFactor 'Default value', Mobile='Im Mobile', Desktop='Im Desktop'}"/>
</UserControl>
```

`OnFormFactor` doesn't have any compile-time trimming optimizations, as form factor cannot be known in compile time. None of these markup extensions are dynamic; once a value is set, it will not be changed.