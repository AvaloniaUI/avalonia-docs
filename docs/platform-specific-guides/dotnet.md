---
id: dotnet
title: Platform-specific .NET
---

## Overview 

Conditional compilation in .NET allows different parts of the code to be compiled or omitted based on certain conditions. This is particularly useful in .NET when dealing with code that needs to behave differently on various platforms or under different development environments.

None of these solutions are specific to Avalonia, and they can be used with any type of projects.

## Runtime Conditions

.NET 6 and newer provide a set of APIs to get operating system in runtime - [OperatingSystem](https://learn.microsoft.com/en-us/dotnet/api/system.operatingsystem).

Commonly used static methods of this class are:
| Method | Description |
| --- | --- |
| IsWindows()	 | Indicates whether the current application is running on Windows. |
| IsLinux() |	Indicates whether the current application is running on Linux. |
| IsMacOS() |	Indicates whether the current application is running on macOS. |
| IsAndroid() |	Indicates whether the current application is running on Android. |
| IsIOS() |	Indicates whether the current application is running on iOS or MacCatalyst. |
| IsBrowser() |	Indicates whether the current application is running as WASM in a browser. |
| IsOSPlatform(String) | 	Indicates whether the current application is running on the specified platform. |

These methods do not require any changes in the project structure, and can be used anywhere.
The disadvantage of using them, it is not possible to separate platform specific APIs in compile time. As otherwise it would require platform specific dependencies to be referenced in a common assembly.

This approach is recommended for simpler scenarios, or when it's desired to keep simple project structure. In the last case, 

:::note
It's the only possible approach to write a conditional .NET code for Linux OS. As .NET doesn't have a special Target Framework for Linux.
:::

## Conditional compilation

C# specifically allows to have conditional compilation with `#if`, `#elif`, `#else`, `#endif` - [C# preprocessor directives](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/preprocessor-directives#conditional-compilation).

`DEBUG` compile time constant is a well known one. But it's not really useful with writing platform specific code.
Depending on the project time, C# compiler might define additional constants per each [OS specific Target Framework](https://learn.microsoft.com/en-us/dotnet/standard/frameworks#net-5-os-specific-tfms) used in the project:

|Target Framework | Constant |
|----|----|
| net8.0 | - |
| net8.0-windows | WINDOWS |
| net8.0-macos | MACOS |
| net8.0-browser | BROWSER |
| net8.0-ios | IOS |
| net8.0-android | ANDROID |
| net8.0-tizen | TIZEN |

From this table, we can see couple of notes:
1. If project doesn't use any OS specific Target Framework, none of these constants will be defined
2. **There is no constant for LINUX**, as there is no `net8.0-linux` Target Framework as of now. Note, it might be changed in the future versions of .NET.
3. Additionally, `net8.0-browser` is only available starting with .NET 8 SDK. Other Target Frameworks are supported with .NET 6 or higher.

:::note
Similar approach can be used to define special code compilation for .NET Framework or .NET Standard projects, if it's required. Visit Microsoft [Cross-platform targeting
](https://learn.microsoft.com/en-us/dotnet/standard/library-guidance/cross-platform-targeting) documentation for more information.
:::

### Practical example

Let's imagine, we want to use platform APIs from C# code. It can be Avalonia APIs, or Xamarin APIs, or anything else really.
First of all, expected Target Frameworks needs to be defined in the project. To keep it simple, we will have three possible target framework - "net8.0" (default), "net8.0-ios" and "net8.0-android" in `.csproj` file:

```xml
<PropertyGroup>
    <TargetFrameworks>net8.0;net8.0-ios;net8.0-android</TargetFrameworks>
</PropertyGroup>
```

And then it's possible to create a method like this:
```csharp
public enum DeviceOrientation
{
    Undefined,
    Landscape,
    Portrait
}

public static DeviceOrientation GetOrientation()
{
#if ANDROID
            IWindowManager windowManager = Android.App.Application.Context.GetSystemService(Context.WindowService).JavaCast<IWindowManager>();
            SurfaceOrientation orientation = windowManager.DefaultDisplay.Rotation;
            bool isLandscape = orientation == SurfaceOrientation.Rotation90 || orientation == SurfaceOrientation.Rotation270;
            return isLandscape ? DeviceOrientation.Landscape : DeviceOrientation.Portrait;
#elif IOS
            UIInterfaceOrientation orientation = UIApplication.SharedApplication.StatusBarOrientation;
            bool isPortrait = orientation == UIInterfaceOrientation.Portrait || orientation == UIInterfaceOrientation.PortraitUpsideDown;
            return isPortrait ? DeviceOrientation.Portrait : DeviceOrientation.Landscape;
#else
            return DeviceOrientation.Undefined;
#endif
}
```

:::note
This sample code is referenced from the Microsoft documentation: https://learn.microsoft.com/en-us/dotnet/maui/platform-integration/invoke-platform-code?view=net-maui-8.0#conditional-compilation
:::


## Platform specific projects

Similarly to the previous approach, it is possible to create bootstrap projects per each platform, and keep shared project with main logic and layouts.
For example, default Avalonia.Xplat template creates solution with following projects:

| Project | Target Framework |
| --- | --- |
| Project.Shared | net8.0 |
| Project.Desktop | net8.0 |
| Project.Android | net8.0-android |
| Project.iOS | net8.0-ios |
| Project.Browser | net8.0-browser |

Desktop project combines Windows, macOS and Linux. While mobile and browser platforms have their own projects.
This is default approach for Avalonia projects. If desired, developers can split Desktop project into multiple as well.
Although, it should be kept in mind, that .NET SDK doesn't have any target framework for Linux yet, so it still would have to use generic `net8.0` target framework.

Commonly, when any platform specific code is required, a new interface is created in shared project, with different implementations per each platform.
Adapting previous sample would look like this:
```csharp title='Project.Shared IDeviceOrientation.cs'
public interface IDeviceOrientation
{
    DeviceOrientation GetOrientation();
}
```

```csharp title='Project.Android AndroidDeviceOrientation.cs'
public class AndroidDeviceOrientation : IDeviceOrientation
{
    public DeviceOrientation GetOrientation()
    {
        IWindowManager windowManager = Android.App.Application.Context.GetSystemService(Context.WindowService).JavaCast<IWindowManager>();
        SurfaceOrientation orientation = windowManager.DefaultDisplay.Rotation;
        bool isLandscape = orientation == SurfaceOrientation.Rotation90 || orientation == SurfaceOrientation.Rotation270;
        return isLandscape ? DeviceOrientation.Landscape : DeviceOrientation.Portrait;
    }
}
```

```csharp title='Project.iOS iOSDeviceOrientation.cs'
public class iOSDeviceOrientation : IDeviceOrientation
{
    public DeviceOrientation GetOrientation()
    {
        UIInterfaceOrientation orientation = UIApplication.SharedApplication.StatusBarOrientation;
        bool isPortrait = orientation == UIInterfaceOrientation.Portrait || orientation == UIInterfaceOrientation.PortraitUpsideDown;
        return isPortrait ? DeviceOrientation.Portrait : DeviceOrientation.Landscape;
    }
}
```

Each implementation then can be registered using dependency injection library of choice, or using a static registry property.