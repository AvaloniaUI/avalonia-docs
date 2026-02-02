# Frequently Asked Questions

## Is it possible to connect multiple instances to the Developer Tools?

Yes, while a single instance of Developer Tools is running and activated, you can connect one or many apps to it.
Each new connection will open a new Developer Tools window, working independently from each other.

## Does it work with Browser/Android/iOS?

It does work with mobile and browser applications.
See [Attaching Browser or Mobile application](./advanced/attaching-browser-or-mobile.md) for more details.

## Can I use Developer Tools and DiagnosticsPackage with NativeAOT app?

Yes. DiagnosticsPackage is fully trimming friendly. Even though it does use reflection, the tool was tested with AOT.

## Does `AvaloniaUI.DiagnosticsSupport` replace `Avalonia.Diagnostics` package? Or do I need both?

You only need `AvaloniaUI.DiagnosticsSupport`.
`Avalonia.Diagnostics` is an old package used for legacy developer tools. It can be safely removed from the project.
If for some reason necessary, both packages can be referenced, but you might want to setup different gestures for each tool.

## Can everybody build project referencing `AvaloniaUI.DiagnosticsSupport`, even without a license?

Yes, `AvaloniaUI.DiagnosticsSupport` is an integration package, a bridge between `Developer Tools` and user app. On its own, it doesn't require any license, and can be referenced in public projects.

But to actually open `Developer Tools`, you would need the license and Avalonia portal account.

## Is it necessary to exclude `AvaloniaUI.DiagnosticsSupport` package from Release/Production build?

Tool can be useful for internal testing of Release builds. And it's not necessary to only include it with Debug builds.

Unlike the legacy Avalonia DevTools, this package is not shipped with heavy dependencies that might break Release compilation.

But it is still advised to exclude this package on production builds for security and bundle size reasons.

To do that, `Condition="'$(Configuration)' == 'Debug'"'` can be used:
```xml
<PackageReference Include="AvaloniaUI.DiagnosticsSupport" Version="" Condition="'$(Configuration)' == 'Debug'" />
```

Combined with `#if DEBUG` for the `this.AttachDeveloperTools()` or `.WithDeveloperTools()`.

## Are arm64 and x86 builds of the tool available or planned?

Only **x64** builds for Windows and Linux are available at the moment.
macOS build is an universal bundle with both **x64** and **arm64** architectures.

## I have another question. Where can I ask it?

Feel free to leave your questions or feedback on [Community Hub](https://avaloniaui.community/dev-tools-hvq32ub8) and [Avalonia Support](https://support.avaloniaui.net/).
