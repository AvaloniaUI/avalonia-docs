---
id: webassembly
title: WebAssembly issues
sidebar_label: WebAssembly
---

## `System.DllNotFoundException: libSkiaSharp`

This error typically means the `wasm-tools` workload is not installed. Install it and rebuild:

```bash
dotnet workload install wasm-tools
```

If the error persists after installing the workload, add the `WasmBuildNative` property to your project file:

```xml
<PropertyGroup>
    <WasmBuildNative>true</WasmBuildNative>
</PropertyGroup>
```

Then perform a clean rebuild.

## General limitations

WebAssembly is a sandboxed environment with some inherent limitations:

- Your app runs inside the browser sandbox. File system access, network access, and other OS-level APIs are restricted to what the browser permits.
- .NET multithreading in the browser is only available starting with .NET 8, and requires specific browser support.
- GUI performance can be lower than native platforms, particularly on older browsers.
