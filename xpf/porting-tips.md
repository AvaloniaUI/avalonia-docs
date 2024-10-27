---
id: porting-tips
title: Porting Tips
---

The following are things to watch out *before* starting the work to port your WPF app to XPF:

## Project Files

1. Convert all projects to .NET 7.0 and above. The old project file format that precedes the new [.NET SDK style csproj](https://web.archive.org/web/20230712075209/https://learn.microsoft.com/en-us/dotnet/core/project-sdk/overview) will not work outside of Windows.
2. We highly recommend doing (1) on Windows first to avoid having to wrangle with hard to debug windows-specific dependency issues on other platforms. Please try to replace or remove deprecated features from .NET 7.0 such as AppDomain, CodeDOM, WCF, `System.Web`, XmlSerializer, and hard Windows-only API’s like `System.Management.Instrumentation`, `System.Drawing.Common` etc. on your app with cross-platform friendly alternatives.
3. While doing (1), watch out for any custom MSBuild Tasks that your app may have. Make sure any said Tasks still work on .NET 7.0 by running `dotnet build`. Don’t test inside Visual Studio so that you can confirm it works outside.
4. Convert all PCL (Portable Class Libraries) into `netstandard` libraries.
5. Remove any `ApplicationDefinition` entries from the `.csproj`.
6. Remove `PropertyGroup` elements that look like [this](https://github.com/microsoft/WPF-Samples/blob/main/Clipboard/ClipboardViewer/ClipboardViewer.csproj#L7-L18) and use the default configuration provided by the SDK where possible

## Dependencies

7. If you had a .NET Framework-based nuget package, please try to find a newer version (`netstandard2.0`, `netcoreapp2.0`+, `net5.0`+) of said package. Most of the time even those .NET Framework packages work cross platform too but it’s not a guarantee. 
8. If there are `Reference` items that are linked to a standalone `dll` on your app's project file, try to find an alternative for it on NuGet as described on (4). If it’s a managed assembly then often times it will work but again, no guarantee.
9. If you have any native binaries, please try to find a managed equivalent or, if you have the sources for those native bins: try to recompile them to the target platforms you desire. Make sure to use [NativeLibrary APIs](https://web.archive.org/web/20230326113052/https://developers.redhat.com/blog/2019/09/06/interacting-with-native-libraries-in-net-core-3-0) to interop to those afterwards.
10. We recommend updating your dependencies to the latest version; especially 3rd party components such as Actipro, DevExpress, Syncfusion, Telerik etc.

## Windows

11. We discourage any form of custom chrome window controls (e.g. WPF's WindowChrome, MahApps's MetroWindow, DevExpress's DXWindow) and anything that customizes window borders or behaviors because it’s not guaranteed to fit into the target platform’s UI design (e.g., a custom MetroWindow on a macOS). The best design for XPF target platforms is single view app (e.g., like a website or a mobile application).

## Resources & Settings

12. Resource Files (`.resx`) don't get regenerated outside of Visual Studio. We suggest making use of alternatives to localization like JSON files etc. or other solutions that works independently of Visual Studio. (Subject to review once .NET 8.0 is out)
13. Visual Studio Text Templates (T4, *.template files) are also deprecated on .NET 7.0. Please use source generators as an alternative.
14. Images or Bitmaps in Resource Files (`.resx`) are not compatible with the .NET 7.0: consider using WPF's resources scheme instead.
15. Avoid using `App.Config` / `System.Configuration.ConfigurationManager` due to it not persisting correctly on platforms that doesn’t allow writes on the same location as the executing assembly (macOS, mobile, WASM, etc.) and use a 3rd party/in-house solution to write persistent configuration data for your apps. 

## Filesystem Access

16. Make sure that your file access code can handle case-sensitive filesystems and uses `Path.DirectorySeparatorChar` instead of hardcoding the directory separators. 

## Unsupported Controls

17. Avoid using WPF's Spell checking and XPS features since those are not supported by XPF.
18. If you have any advanced & specialized WPF features that you want to work on your app like Shaders, 3D, Media, etc., Please contact us so that we can help you figure out the best way forward.