---
id: debugging-xamlil
title: How To Debug the XAML compiler
---

# How To Debug the XAML compiler

You can debug the _Avalonia UI_ XAML compiler by adding the `AvaloniaXamlIlDebuggerLaunch` element (and the true value) to the `<PropertyGroup>` element of your project file. For example:

```xml
<Project Sdk="Microsoft.NET.Sdk">  
  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net5.0</TargetFramework>
    <Nullable>enable</Nullable>
    <AvaloniaXamlIlDebuggerLaunch>true</AvaloniaXamlIlDebuggerLaunch>
  </PropertyGroup>
  ...
</Project>
```

If you now build and run the project in Visual Studio you will see a window like this:

<!-- ![](https://user-images.githubusercontent.com/53405089/132686320-958f30a6-49f8-498f-853c-b9dd17262b54.png) -->

In other IDEs, a message will appear in the build output window indicating the Process Identification (PID) of the process to attach a debugger to (and the elapsed time).&#x20;

{% hint style="danger" %}
If you do not attach a debugger within one minute of starting the build, then a timeout message will be reported and the build will continue without the debug.
:::
