---
id: how-to-use-web-assembly
title: Web Assembly
---


# 👉 Web Assembly

Run in the browser with WebAssembly

1. Install `wasm-tools` workload tools. See [dotnet documentation](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-workload-install). If you have an older .NET SDK, it might ask you to install other workloads like `wasm-experimental` as well.

```bash
dotnet workload install wasm-tools
```

1. Install or update the dotnet templates to the latest version.

```bash
dotnet new install avalonia.templates
```

1. Create a new directory for the project.

```bash
mkdir BrowserTest
cd BrowserTest
```

1. Generate a new project that supports running in the browser.

```bash
dotnet new avalonia.xplat
```

1. In order to run simply do:

```bash
cd BrowserTest.Browser
dotnet run
```

1. In the console output you will see HTTP and HTTPS links to open the app.

## Interop

It is possible to call JavaScript code from the Avalonia Web application. Avalonia app is compatible with standard **\[JSImport]/\[JSExport]** interop from Microsoft. You can find more information on [their documentation](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/import-export-interop?view=aspnetcore-7.0).

## Legacy Blazor backend

Starting from Avalonia 11.0 [Avalonia.Browser](https://www.nuget.org/packages/Avalonia.Browser/) package relies on build-in .NET interop with better stability and performance. Legacy Blazor backend is still available for compatibility and can be referenced using [Avalonia.Browser.Blazor](https://www.nuget.org/packages/Avalonia.Browser.Blazor/) package.

## Troubleshooting

If you have not performed the step to install required workloads, you might encounter errors when running the app in your browser later (e.g. `System.DllNotFoundException: libSkiaSharp`) and you will need to rebuild again before the app will run.

Keep in mind, that WebAssembly in general as a technology is limited. .NET Multithreading is not supported by any browser and is only available starting .NET 8. Any normal app also has to comply with Browser sandboxing mechanism. And while Avalonia does its best to keep performance high, any WebAssembly GUI apps in some cases might be slow or with older browsers.
