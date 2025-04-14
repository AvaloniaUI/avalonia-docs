# Frequently Asked Questions

## Is it possible to connect multiple instances to the Developer Tools?

Yes, while a single instance of Developer Tools is running and activated, you can connect one or many apps to it.
Each new connection will open a new Developer Tools window, working independently from each other.

## Does it work with Browser/Android/iOS?

It does work with mobile and browser applications.
See [Attaching Browser or Mobile application](./advanced/attaching-browser-or-mobile.md) for more details.

## Can I use Developer Tools and DiagnosticsPackage with NativeAOT app?

Yes. DiagnosticsPackage is fully trimming friendly. Even though it does use reflection, the tool was tested with AOT.

## Can everybody build project referencing `AvaloniaUI.DiagnosticsSupport`, even without a license?

Yes, `AvaloniaUI.DiagnosticsSupport` is an integration package, a bridge between `Developer Tools` and user app. On its own, it doesn't require any license, and can be referenced in public projects.

But to actually open `Developer Tools`, you would need the license and Avalonia portal account.

## Is it necessary to exclude `AvaloniaUI.DiagnosticsSupport` package from Release/Production build?

Tool can be useful for internal testing of Release builds. And it's not necessary to only include it with Debug builds.

Unlikely the legacy Avalonia DevTools, this package is not shipped with heavy dependencies that might break Release compilation.

But it is still advised to exclude this package on production builds for security and bundle size reasons.

To do that, `Condition="'$(Configuration)' == 'Debug'"'` can be used. But modern option with IncludeAssets/PrivateAssets is recommended to keep .NET SDK restore process stable with packages lock files:
```xml
<PackageReference Include="AvaloniaUI.DiagnosticsSupport" Version="">
  <IncludeAssets Condition="'$(Configuration)' != 'Debug'">None</IncludeAssets>
  <PrivateAssets Condition="'$(Configuration)' != 'Debug'">All</PrivateAssets>
</PackageReference>
```

Combined with `#if DEBUG` for the `this.AttachDeveloperTools()`.

## Is AvaloniaUI Developer Tools open source?

No, it's not.

## Are arm64 and x86 builds of the tool available or planned?

Only **x64** builds for Windows, macOS and Linux are available at the moment. Where **arm64** is supported via platform emulation.

We have plans to eventually release native **arm64** builds.

No **x86** builds are available nor planned.

## I have another question. Where can I ask it?

Feel free to leave your questions or feedback on [AvaloniaUI/AvaloniaUI.DeveloperTools](https://github.com/AvaloniaUI/AvaloniaUI.DeveloperTools/ ) repository.
