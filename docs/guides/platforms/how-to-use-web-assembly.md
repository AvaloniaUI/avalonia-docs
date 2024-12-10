---
id: how-to-use-web-assembly
title: Web Assembly
---


# 👉 Web Assembly

Run in the browser with WebAssembly

1. Install `wasm-tools` workload tools. See [dotnet documentation](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-workload-install).

```bash
dotnet workload install wasm-tools
```

:::note
If you are running `net8.0-browser` application on .NET 9 SDK, you should install `wasm-tools-net8` workload instead.
If you have an older .NET SDK, it might ask you to install other workloads like `wasm-experimental` as well.
:::

2. Install or update the dotnet templates to the latest version.

```bash
dotnet new install avalonia.templates
```

3. Create a new directory for the project.

```bash
mkdir BrowserTest
cd BrowserTest
```

4. Generate a new project that supports running in the browser. To lookup the available templates via `dotnet new list` see [dotnet documentation](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new-sdk-templates).

```bash
dotnet new avalonia.xplat
```

5. In the console output you will see HTTP and HTTPS links to open the app.
In order to run, simply do the following:

```bash
cd BrowserTest.Browser
dotnet run

# Output:
# App url: http://127.0.0.1:53576/
# App url: https://127.0.0.1:53577/
# Debug at url: http://127.0.0.1:53576/_framework/debug
# Debug at url: https://127.0.0.1:53577/_framework/debug
```

### Deployment
In the `BrowserTest.Browser` directory, run:
```bash
dotnet publish
```

After project was published, .NET SDK creates an app bundle directory with `index.html` file and compiled application files.
With latest .NET 9 SDK, this directory is located at `bin/Release/net9.0-browser/publish/wwwroot`.
Now you can serve your app from this directory using your favorite web server (such as Azure Static Web Apps).

:::note
On older .NET SDK versions, app bundle was located in different directory: `bin/Release/net8.0-browser/browser-wasm/AppBundle` (search for `AppBundle`).
:::

:::warning
Currently using `dotnet publish` with the `-o` or `--output` flag does not produce the AppBundle folder in the output directory. (See [this issue](https://github.com/dotnet/runtime/issues/94319).) You'll still have to grab it out of the `bin` directory at the path specified by the publish output.
:::

#### Testing AppBundle locally

You can serve your wasm app from this directly using the [dotnet-serve](https://github.com/natemcmaster/dotnet-serve) tool as follows:
```bash
dotnet tool install --global dotnet-serve

dotnet serve -d:bin/Release/net8.0-browser/browser-wasm/publish

# Output: 
# Starting server, serving bin/Release/net8.0-browser/browser-wasm/publish
# Listening on any IP:
#   http://localhost:49875
```

## Interop

It is possible to call JavaScript code from the Avalonia Web application. Avalonia app is compatible with standard **\[JSImport]/\[JSExport]** interop from Microsoft. You can find more information on [their documentation](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/import-export-interop?view=aspnetcore-7.0).

## Legacy Blazor backend

Starting from Avalonia 11.0 [Avalonia.Browser](https://www.nuget.org/packages/Avalonia.Browser/) package relies on build-in .NET interop with better stability and performance. Legacy Blazor backend is still available for compatibility and can be referenced using [Avalonia.Browser.Blazor](https://www.nuget.org/packages/Avalonia.Browser.Blazor/) package.

## Troubleshooting

If you have not performed the step to install required workloads, you might encounter errors when running the app in your browser later (e.g. `System.DllNotFoundException: libSkiaSharp`) and you will need to rebuild again before the app will run.

Keep in mind, that WebAssembly in general as a technology is limited. .NET Multithreading is not supported by any browser and is only available starting .NET 8. Any normal app also has to comply with Browser sandboxing mechanism. And while Avalonia does its best to keep performance high, any WebAssembly GUI apps in some cases might be slow or with older browsers.
