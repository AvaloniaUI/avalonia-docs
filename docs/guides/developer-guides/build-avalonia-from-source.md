---
id: build-avalonia-from-source
title: Build Avalonia from Source
---

## Prerequisites

---

```bash
git clone https://github.com/AvaloniaUI/Avalonia.git
cd Avalonia
git submodule update --init --recursive
```

## .NET Core (Windows, Linux and macOS)

---

### Install .NET Core

* [.NET Core - All Supported OS's](https://www.microsoft.com/net/core)

At least the following versions must be installed: 
* .NET Core 3.1 SDK
* .NET 6 SDK

### Build

```bash
cd samples/ControlCatalog.NetCore
dotnet restore
dotnet build
```

### Run

```bash
cd samples/ControlCatalog.NetCore
dotnet restore
dotnet run
```

## Special Requirements

---

### Windows

#### Install Visual Studio

* [Visual Studio 2019](https://www.visualstudio.com/en/downloads/)

#### Build

```bash
Open Avalonia.sln in Visual Studios 2019 or above.
```

### macOS

The native interop layer requires code generation, this can be triggered by:
`./build.sh --target CompileNative`
  