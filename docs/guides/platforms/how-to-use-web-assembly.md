---
id: how-to-use-web-assembly
title: Web Assembly
---


# 👉 Web Assembly

Run in the browser with WebAssembly

It is currently very early days and not ready for production, however if you want to test this exciting new feature please take the following steps.

1. Install `wasm-experimental` and `wasm-tools` workload tools. See [dotnet documentation](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-workload-install).

```bash
dotnet workload install wasm-experimental wasm-tools
```

1. Install or update the dotnet templates to the latest version.

```bash
dotnet new install avalonia.templates
```

1. Create a new directory for the project.

```bash
mkdir WebTest
cd WebTest
```

1. Generate a new project that supports running in the browser.

```bash
dotnet new avalonia.xplat
```

1. In order to run simply do:

```bash
cd WebTest.Web
dotnet run
```

1. In the console output you will see HTTP and HTTPS links to open the app.

## Interop

It is possible to call JavaScript code from the Avalonia Web application. Avalonia app is compatible with standard **\[JSImport]/\[JSExport]** interop from Microsoft. You can find more information on [their documentation](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/import-export-interop?view=aspnetcore-7.0).

## Legacy Blazor backend

Starting from Avalonia 11.0 [Avalonia.Web](https://www.nuget.org/packages/Avalonia.Web/) package relies on build-in .NET interop with better stability and performance. Legacy Blazor backend is still available for compatability and can be referenced using [Avalonia.Web.Blazor](https://www.nuget.org/packages/Avalonia.Web.Blazor/) package.

## Troubleshooting

If you have not performed the step to install required workloads, you will encounter errors when running the app in your browser later (e.g. `System.DllNotFoundException: libSkiaSharp`) and you will need to rebuild again before the app will run.
