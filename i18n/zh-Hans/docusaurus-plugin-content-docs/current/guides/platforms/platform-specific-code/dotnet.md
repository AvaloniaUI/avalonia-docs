---
id: dotnet
title: 特定平台的.NET
---
## 概述

.NET当中的条件编译允许根据某些条件编译或省略代码的不同部分。这对于处理需要在不同平台或开发环境中不同行为的代码时特别有用。

这些方案并不特定于Avalonia，可以用于任何类型的项目。

## 运行时条件

.NET 6 及更高版本提供了一组在运行时获取操作系统信息的API -
[OperatingSystem](https://learn.microsoft.com/en-us/dotnet/api/system.operatingsystem)。

这个类中常用的一些静态方法包括：

| 方法 | 描述 |
| --- | --- |
| IsWindows() | 指示当前应用程序是否在Windows上运行。 |
| IsLinux() | 指示当前应用程序是否在Linux上运行。 |
| IsMacOS() | 指示当前应用程序是否在macOS上运行。 |
| IsAndroid() | 指示当前应用程序是否在Android上运行。 |
| IsIOS() | 指示当前应用程序是否在iOS或MacCatalyst上运行。 |
| IsBrowser() | 指示当前应用程序是否在浏览器中以WASM形式运行。 |
| IsOSPlatform(String) | 指示当前应用程序是否在指定的平台上运行。 |

这些方法不需要对项目结构进行任何更改，并且可以在任何地方使用。
缺点是无法在编译时分离平台特定的API，这样就需要在公共的程序集中引用平台特定的依赖项。

这种方法适用于简单的场景，或者希望保持简单的项目结构。在后一种情况下

:::note
这是编写针对Linux操作系统的条件.NET代码的唯一可能方法，因为.NET没有专门针对Linux的目标框架。
:::

## 条件编译

C# 特别地允许使用 `#if`、`#elif`、`#else` 和 `#endif` 进行条件编译 - [C# 预处理器指令](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/preprocessor-directives#conditional-compilation)。

`DEBUG` 是一个众所周知的编译时常量。但编写平台特定的代码时它并不是特别有用。根据项目的需要，C# 编译器可能会为每个 [操作系统特定的 Target Framework](https://learn.microsoft.com/en-us/dotnet/standard/frameworks#net-5-os-specific-tfms) 定义额外的常量：

| 目标框架 | 常量 |
| ---- | ---- |
| net8.0 | - |
| net8.0-windows | WINDOWS |
| net8.0-macos | MACOS |
| net8.0-browser | BROWSER |
| net8.0-ios | IOS |
| net8.0-android | ANDROID |
| net8.0-tizen | TIZEN |

从上表中，我们可以注意到几点：
1. 如果项目没有使用任何特定于操作系统的目标Framework，则不会定义这些常量。
2. **没有针对 LINUX 的常量**，因为目前没有 `net8.0-linux` 的目标框架。请注意，这可能会在未来版本的 .NET 中发生变化。
3. 此外，`net8.0-browser` 仅在 .NET 8 SDK 中可用。其他目标框架支持 .NET 6 或更高版本。

:::note
类似的方法也可以用于定义 .NET Framework 或 .NET Standard 项目的特殊代码编译，如果需要的话。请访问 Microsoft [跨平台目标](https://learn.microsoft.com/en-us/dotnet/standard/library-guidance/cross-platform-targeting) 文档以获取更多信息。
:::

### 实际案例

假设我们想在 C# 代码中使用平台 API。它可以是 Avalonia API、Xamarin API 或其他任何 API。
首先，需要在项目中定义预期的目标框架。为了简单起见，我们在 `.csproj` 文件中定义三个可能的目标框架 - "net8.0"（默认）、"net8.0-ios" 和 "net8.0-android"：

```xml
<PropertyGroup>
    <TargetFrameworks>net8.0;net8.0-ios;net8.0-android</TargetFrameworks>
</PropertyGroup>
```

然后可以创建如下方法：
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
此示例代码引用自Microsoft文档：https://learn.microsoft.com/en-us/dotnet/maui/platform-integration/invoke-platform-code?view=net-maui-8.0#conditional-compilation
:::

## 平台特定的项目

类似于前面的方法，可以为每个平台创建引导项目，并保留包含主要逻辑和布局的共享项目。例如，默认的 Avalonia.Xplat模板会创建一个包含以下项目的解决方案：

| 项目 | 目标框架 |
| --- | --- |
| Project.Shared | net8.0 |
| Project.Desktop | net8.0 |
| Project.Android | net8.0-android |
| Project.iOS | net8.0-ios |
| Project.Browser | net8.0-browser |

Windows、macOS 和 Linux的桌面平台项目是统一的一个，而移动和浏览器平台则有自己的项目。
这是Avalonia项目的默认方式。如果需要，开发者也可以将桌面项目拆分为多个项目。
不过需要注意的是，.NET SDK 目前还没有针对Linux的目标框架，因此仍然需要使用通用的 `net8.0` 目标框架。

通常，当需要任何平台特定的代码时，会在共享项目中创建一个新的接口，并为每个平台提供不同的实现。
之前的示例将如下所示：
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

每个实现可以使用所选的依赖注入库或静态注册属性进行注册。