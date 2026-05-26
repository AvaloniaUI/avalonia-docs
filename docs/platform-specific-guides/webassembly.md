---
id: webassembly
title: WebAssembly
description: How to run Avalonia in the browser with WebAssembly, including project setup, platform options, and JavaScript interop.
doc-type: overview
---

Avalonia applications can run in the browser using WebAssembly (WASM). This page explains how to set up a project for browser deployment and how to use JavaScript interop.

## Setting up an Avalonia project for WebAssembly

1. Install the `wasm-tools` workload, which provides the build toolchain for compiling .NET to WebAssembly.

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

4. Generate a new project that supports running in the browser. You can run `dotnet new list` to see all available Avalonia templates.

```bash
dotnet new avalonia.xplat
```

5. In the console output you will see HTTP and HTTPS links to open the app.
To run the app:

```bash
cd BrowserTest.Browser
dotnet run

# Output:
# App url: http://127.0.0.1:53576/
# App url: https://127.0.0.1:53577/
# Debug at url: http://127.0.0.1:53576/_framework/debug
# Debug at url: https://127.0.0.1:53577/_framework/debug
```

## Configuring browser platform options

`BrowserPlatformOptions` controls how Avalonia renders and behaves in the browser. Pass an instance to `StartBrowserAppAsync` in your Browser project's `Program.cs`:

```csharp
internal sealed partial class Program
{
    private static Task Main(string[] args) => BuildAvaloniaApp()
        .StartBrowserAppAsync("out", new BrowserPlatformOptions
        {
            RenderingMode = new[]
            {
                BrowserRenderingMode.WebGL2,
                BrowserRenderingMode.Software2D
            }
        });

    public static AppBuilder BuildAvaloniaApp()
        => AppBuilder.Configure<App>();
}
```

The first argument to `StartBrowserAppAsync` is the `id` of the HTML element where Avalonia renders. Every option has a default, so set only the ones you need to change.

### Rendering mode

`RenderingMode` is an ordered list of graphics backends. Avalonia tries each one in turn and uses the first that initializes successfully, so the first entry has the highest priority. The default is `WebGL2`, then `WebGL1`, then `Software2D`.

| Mode | Description |
|---|---|
| `WebGL2` | GPU rendering through WebGL 2. The default GPU backend. |
| `WebGL1` | GPU rendering through WebGL 1. |
| `Software2D` | CPU rendering using the HTML 2D canvas. |

If none of the listed modes initialize, Avalonia throws an `InvalidOperationException`.

### Other options

| Option | Type | Default | Description |
|---|---|---|---|
| `RenderingMode` | `IReadOnlyList<BrowserRenderingMode>` | `WebGL2`, `WebGL1`, `Software2D` | Ordered list of graphics backends with fallback, described above. |
| `PreferManagedThreadDispatcher` | `bool?` | `true` | Creates a controlled dispatcher loop on the web worker thread. Used only when `WasmEnableThreads` is `true`. |
| `PreferFileDialogPolyfill` | `bool` | `false` | Forces the `native-file-system-adapter` polyfill for file dialogs instead of the browser's native implementation. |
| `FrameworkAssetPathResolver` | `Func<string, string>?` | `null` | Customizes the paths where Avalonia modules and the service locator are resolved. The default path depends on the backend (browser or Blazor). |
| `AvaloniaServiceWorkerScope` | `string?` | `null` | Sets the scope for the Avalonia service worker. Defaults to the current domain root. Used only when `RegisterAvaloniaServiceWorker` is enabled. |

:::caution
`RegisterAvaloniaServiceWorker` registers a service worker that can act as a save file picker fallback on browsers without native support. It is marked unstable and might not work reliably.
:::

## Deployment

For information on publishing and deploying your WebAssembly app, see [Deploying WebAssembly](/docs/deployment/webassembly).

## JavaScript interop

Avalonia Browser apps can call JavaScript from C# and expose C# methods to JavaScript using the standard `[JSImport]`/`[JSExport]` interop API from .NET. This API is part of the `System.Runtime.InteropServices.JavaScript` namespace and works in any .NET WebAssembly application.

### Setup

Add `AllowUnsafeBlocks` to your Browser project file. The .NET source generator that produces the interop bindings requires this:

```xml
<PropertyGroup>
    <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
</PropertyGroup>
```

### Calling JavaScript from C#

Use the `[JSImport]` attribute on a `partial` method to import a JavaScript function. The first argument is the JS function name, and the second is the module name used when loading it.

Create a JavaScript module (e.g., `wwwroot/js/interop.js`):

```javascript
export function showAlert(message) {
    globalThis.alert(message);
}

export function getCurrentUrl() {
    return globalThis.window.location.href;
}
```

Define C# methods that map to the JS functions:

```csharp
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

[SupportedOSPlatform("browser")]
public partial class JsInterop
{
    [JSImport("showAlert", "MyInterop")]
    public static partial void ShowAlert(string message);

    [JSImport("getCurrentUrl", "MyInterop")]
    public static partial string GetCurrentUrl();
}
```

Load the module at startup (typically in `Program.cs`) using `JSHost.ImportAsync`, then call the methods from anywhere in your app:

```csharp
using System.Runtime.InteropServices.JavaScript;

await JSHost.ImportAsync("MyInterop", "../js/interop.js");

// Now you can call:
JsInterop.ShowAlert("Hello from Avalonia!");
string url = JsInterop.GetCurrentUrl();
```

The module name passed to `JSHost.ImportAsync` must match the second argument in the `[JSImport]` attribute.

### Calling C# from JavaScript

Use the `[JSExport]` attribute to expose a C# method to JavaScript:

```csharp
[SupportedOSPlatform("browser")]
public partial class JsInterop
{
    [JSExport]
    public static string GetAppVersion() => "1.0.0";
}
```

From JavaScript, access the exported method through the .NET runtime:

```javascript
export async function callDotNet() {
    const { getAssemblyExports } = await globalThis.getDotnetRuntime(0);
    const exports = await getAssemblyExports("MyApp.dll");
    const version = exports.MyNamespace.JsInterop.GetAppVersion();
    console.log(version);
}
```

### Accessing global functions

To import a function from the global scope (rather than a module), prefix the function name with `globalThis` and omit the module name:

```csharp
[JSImport("globalThis.console.log")]
public static partial void ConsoleLog(string message);
```

### Type marshalling

.NET types are automatically marshalled to their JavaScript equivalents. For explicit control over marshalling, use the `[JSMarshalAs]` attribute:

```csharp
[JSImport("processData", "MyInterop")]
public static partial void ProcessData(
    [JSMarshalAs<JSType.Number>] long value);
```

You can pass `Action`/`Func` callbacks as parameters (marshalled as callable JS functions), and both JS and managed object references can be passed across the boundary as proxy objects.

## See also

- [Deploying WebAssembly](/docs/deployment/webassembly)
- [WebAssembly troubleshooting](/troubleshooting/platform-specific-issues/webassembly)
