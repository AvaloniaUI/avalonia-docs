---
id: install
title: Install
---

## Preinstallation

Please start with the supported IDE of your choice installed. Avalonia supports Visual Studio, Rider, and Visual Studio 
Code.

## Install Avalonia UI Templates

The best way to get started with Avalonia is by creating an application using a project template.

To install the [Avalonia templates](https://github.com/AvaloniaUI/avalonia-dotnet-templates), run the following command:

```bash title='Bash'
dotnet new install Avalonia.Templates
```

:::note
For .NET 6.0 and earlier, replace `install` with `--install`
:::

To list the installed templates run

```bash title='Bash'
 dotnet new list
```

You should see the installed Avalonia templates:

```
Template Name                                 Short Name                  Language    Tags
--------------------------------------------  --------------------------  ----------  ---------------------------------------------------------
Avalonia App                                  avalonia.app                [C#],F#     Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia MVVM App                             avalonia.mvvm               [C#],F#     Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia Cross Platform Application           avalonia.xplat              [C#],F#     Desktop/Xaml/Avalonia/Web/Mobile
Avalonia Resource Dictionary                  avalonia.resource                       Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia Styles                               avalonia.styles                         Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia TemplatedControl                     avalonia.templatedcontrol   [C#],F#     Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia UserControl                          avalonia.usercontrol        [C#],F#     Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia Window                               avalonia.window             [C#],F#     Desktop/Xaml/Avalonia/Windows/Linux/macOS
```

## Create a new Application

Once the project templates are installed, you can create a new _Avalonia UI_ application from CLI by running the following command:

```bash title='Bash'
dotnet new avalonia.app -o MyApp
```

This will create a new folder called `MyApp` containing your application files. To run the application, navigate to the `MyApp` folder and run:

```bash title='Bash'
cd MyApp
dotnet run
```

The project templates will also allow for project creation from your IDE.

## Installation Troubleshooting

### Ensure .NET SDK is installed

```bash
dotnet --list-sdks

8.0.202 [C:\Program Files\dotnet\sdk] <-- Your version may vary
```

If `dotnet` is not a recognized program, then ensure you've installed your IDE first. Next, ensure that `dotnet` is 
associated with the terminal. On Windows, this involves checking environment variables: `echo %PATH%` in the command prompt or 
`echo $Env:PATH` in PowerShell.

### Ensure NuGet source is correct

If while installing the project templates, you receive an error stating the `Avalonia.Templates` package cannot be found, 
then ensure NuGet is correctly setup with .NET's standard global package source.

```bash
dotnet nuget list source

Registered Sources:
  1.  nuget.org [Enabled]
      https://api.nuget.org/v3/index.json
```

If this source is not listed, add it:

```bash
dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org
```

If the package install still fails despite NuGet being listed, then suspect a network connectivity or firewall issue.
