---
id: installation
title: Installation
---

## .NET is not a recognized program

First, ensure the .NET SDK is installed. Run this command:

```
dotnet --list-sdks
```

If a .NET SDK is correctly installed, this returns an output similar to the following:

```
8.0.202 [C:\Program Files\dotnet\sdk]
```

If the terminal continues to report that .NET is missing, try restarting the terminal.

## `Avalonia.Templates` package cannot be found

Ensure NuGet is correctly set up. Run this command:

```
dotnet nuget list source
```

Check that the output displays the following as a registered source:

```
nuget.org [Enabled]
https://api.nuget.org/v3/index.json
```

If this source is not listed, add it using this command:

```
dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org
```

If the package install continues to fail even with NuGet listed as a registered source, check your network connectivity or firewall settings.