---
id: webassembly
title: WebAssembly
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

## Deployment

For information on publishing and deploying your WebAssembly app, see [Deploying WebAssembly](../deployment/webassembly.mdx).

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

- [Deploying WebAssembly](../deployment/webassembly.mdx)
- [WebAssembly troubleshooting](../../troubleshooting/platform-specific-issues/webassembly.md)
