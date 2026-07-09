---
id: index
title: Hot reload
description: Add the AvaloniaUI.DiagnosticsSupport.HotReload package to apply live XAML and C# edits to a running Avalonia app.
doc-type: how-to
tags:
  - avalonia plus
  - avalonia pro
  - avalonia enterprise
  - hot reload
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Hot reload applies edits to `.axaml` and `.cs` files in a running Avalonia application without restarting it. The `AvaloniaUI.DiagnosticsSupport.HotReload` package plugs into the .NET Hot Reload pipeline: when you save a file, matching controls, styles, resources and data templates are rebuilt in place.

## What hot reload updates

With the hot reload package, these edits are applied live to your running application:

| Change | Behavior |
| --- | --- |
| Controls (files with `x:Class`) | Existing instances in the visual tree are rebuilt in place, keeping their positions where possible. |
| Styles | Application-level and control-level styles are reapplied. Selector and setter changes take effect at once. |
| Resource dictionaries | Merged dictionaries are reloaded and dependents are refreshed. |
| Data templates | Templates are regenerated and controls bound to them are refreshed. |
| `{StaticResource}` references | Rewritten to `{DynamicResource}` during hot reload, so resource edits propagate without a restart. |

## Prerequisites

Before you begin, make sure you have:

1. **Avalonia 12.0 or newer.**
2. **A valid Avalonia license key** that includes access to `AvaloniaUI.DiagnosticsSupport.HotReload`. You can get a key from the [Avalonia customer portal](https://portal.avaloniaui.net/). The same key may cover other licensed Avalonia packages, such as `Charts` or `TreeDataGrid`.
3. **A hot reload driver.** Either the `dotnet watch` command or an IDE that supports .NET Hot Reload (such as Visual Studio). See [Step 3](#step-3-run-with-hot-reload).

## Getting started

1. Install the `AvaloniaUI.DiagnosticsSupport.HotReload` NuGet package by running `dotnet add package`.


2. To keep hot reload out of release builds, go to your `.csproj` file and wrap the `<PackageReference>` for the hot reload package in a `Debug` condition. This ensures it never ships.


3. Include your Avalonia license key in the executable project file (`.csproj`). Your license key is available from the [Avalonia portal](https://portal.avaloniaui.net).


## Running with hot reload

Start your application through a tool that supports .NET Hot Reload.

<Tabs>
<TabItem value="watch" label="dotnet watch" default>

Run `dotnet watch` on the platform head project. It rebuilds and applies changes when you save.

```bash
dotnet watch --project YourApp.Desktop
```

This is the most reliable driver and works the same across every editor and platform.

:::note
On mobile platforms, `dotnet watch` requires .NET 11 or newer.
:::

</TabItem>
<TabItem value="vs" label="Visual Studio">

Start the app with the debugger (<kbd>F5</kbd>). After each edit, use **Apply Code Changes** (the hot reload button) on the toolbar, or turn on **Hot Reload on File Save** from the button's dropdown menu.

</TabItem>
<TabItem value="vscode" label="VS Code">

Install the [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) extension, which brings .NET Hot Reload to VS Code.

Then, you can either:

- Run the app with `dotnet watch` from the integrated terminal, or
- Start a debug session (<kbd>F5</kbd>) with hot reload applying when you save a file.

</TabItem>
<TabItem value="rider" label="Rider">

Although JetBrains Rider has a hot reload feature, it does not drive .NET metadata updates. Instead, you can either:

- Run the app with `dotnet watch` from Rider's terminal, or
- Enable the [file-system watcher](#enabling-the-file-system-watcher) and start the app normally.

</TabItem>
</Tabs>

### Enabling the file-system watcher

Avalonia hot reload can still pick up `.axaml` edits with a built-in file-system watcher, even if .NET Hot Reload is not attached. This can occur if you run the app outside `dotnet watch`, or if you are using Rider.

To enable the file-system watcher, add an MSBuild property in your `.csproj`:

```xml
<PropertyGroup>
  <AvaloniaHotReloadEnableFileWatcher>true</AvaloniaHotReloadEnableFileWatcher>
</PropertyGroup>
```

:::tip
The file-system watcher can hot-reload `.axaml` files without .NET Hot Reload, but not `.cs` files. If you need hot reload for your C# code-behind, pair the watcher with `dotnet watch`.
:::

Verifying hot reload

With the app running:

1. Open an `.axaml` file. Change a property, for example, a `Background` color or some text. Save the file.
2. Watch the running window. It should update without losing its current view.
3. Open the matching `.axaml.cs` file. Adjust an event handler. Save the file.
4. Trigger the event.
5. In the running window, confirm that the adjusted event reflects your edit. Diagnostic output is written to the trace log under the `HotReload` category.

:::info
C# changes follow the standard .NET Hot Reload rules.
:::


## Initializing manually

The auto-setup method described above covers most usages of hot reload. If you need a custom lifecycle, multiple `Application` instances, or deferred startup, you can instead call the initializer manually:

```csharp
using AvaloniaUI.DiagnosticsSupport.HotReload;

HotReloadExtensions.InitializeHotReload(
    Application.Current!,
    enableFileWatcher: true,
    rewriteStaticResources: true);
```

The engine initializes once per process, so later calls have no effect. To surface hot reload activity in your logging, subscribe to `HotReloadDiagnostics.EntryLogged`.

## Limitations

- WebAssembly is not supported. Hot reload works on desktop and mobile platforms only.
- C# edits follow the normal [.NET Hot Reload rules](https://learn.microsoft.com/en-us/visualstudio/debugger/hot-reload). Adding fields or changing method signatures counts as a rude edit and needs a restart.
- Controls are rebuilt rather than mutated, so non-XAML states are reset when a control reloads.

## See also

- [Installing the Avalonia Plus developer tools](/tools/developer-tools/installation)
- [Data templates](/docs/data-templates/introduction-to-data-templates)
- [Write and debug running code with Hot Reload in Visual Studio (C#, Visual Basic, C++)](https://learn.microsoft.com/en-us/visualstudio/debugger/hot-reload)
