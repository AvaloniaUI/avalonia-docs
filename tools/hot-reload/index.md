---
id: index
title: Hot reload for Avalonia
sidebar_label: Getting started
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

Hot reload applies edits to your `.axaml` and `.cs` files to a running Avalonia application without restarting it. The `AvaloniaUI.DiagnosticsSupport.HotReload` package plugs into the .NET Hot Reload pipeline: when you save a file, matching controls, styles, resources, and data templates are rebuilt in place.

## What hot reload updates

When your application runs under .NET Hot Reload, the package applies these edits live:

| Change | Behavior |
| --- | --- |
| Controls (files with `x:Class`) | Existing instances in the visual tree are rebuilt in place, keeping their position where possible. |
| Styles | Application-level and control-level styles are re-applied, so selector and setter changes take effect at once. |
| Resource dictionaries | Merged dictionaries are reloaded and dependents are refreshed. |
| Data templates | Templates are regenerated and controls bound to them are refreshed. |
| `{StaticResource}` references | Rewritten to `{DynamicResource}` during hot reload, so resource edits propagate without a restart. |

## Prerequisites

Before you begin, make sure you have:

1. **Avalonia 12.0 or newer.**
2. **A valid Avalonia license key** that lists `AvaloniaUI.DiagnosticsSupport.HotReload` among its products. You can get a key from the [Avalonia customer portal](https://portal.avaloniaui.net/). The same key can cover other licensed AvaloniaUI libraries, such as Charts or TreeDataGrid.
3. **A hot reload driver.** Either the `dotnet watch` command or an IDE that supports .NET Hot Reload (such as Visual Studio). See [Step 3](#step-3-run-with-hot-reload).

## Step 1: Add the package

Add the package to your Avalonia application project with the .NET CLI:

```bash
dotnet add package AvaloniaUI.DiagnosticsSupport.HotReload
```

The CLI adds an unconditional reference. To keep hot reload out of release builds, open the project and wrap the generated `<PackageReference>` in a `Debug` condition so it never ships:

```xml
<ItemGroup Condition="'$(Configuration)' == 'Debug'">
  <PackageReference Include="AvaloniaUI.DiagnosticsSupport.HotReload" Version="..." />
</ItemGroup>
```

:::tip
In a multi-project app (for example, a shared UI library with `.Desktop`, `.Android`, and `.iOS` heads), add the reference to the shared project so every head inherits it.
:::

No startup code is required. The package registers itself through a source-generated module initializer and activates once your `Application` instance is available.

## Step 2: Add your license key

The package validates its license at runtime against the build timestamp embedded in your application. The key must be present at build time, or hot reload throws `AvaloniaLicensingException` the first time it activates.

Declare the key in your application's `.csproj`:

```xml
<ItemGroup>
  <AvaloniaUILicenseKey Include="$(AvaloniaUILicenseKey)" />
</ItemGroup>
```

Then supply the key value as an MSBuild property, an environment variable, or through your CI secret store:

```xml
<PropertyGroup>
  <AvaloniaUILicenseKey>your-license-key</AvaloniaUILicenseKey>
</PropertyGroup>
```

## Step 3: Run with hot reload

Start your application through a tool that drives .NET Hot Reload.

<Tabs>
<TabItem value="watch" label="dotnet watch" default>

Run `dotnet watch` on the platform head project. It rebuilds and applies changes as you save:

```bash
dotnet watch --project YourApp.Desktop
```

This is the most reliable driver and works the same across every editor and platform.

:::note
On the mobile platforms, `dotnet watch` requires .NET 11 or newer.
:::

</TabItem>
<TabItem value="vs" label="Visual Studio">

Start the app with the debugger (<kbd>F5</kbd>). After each edit, use **Apply Code Changes** (the hot reload button) on the toolbar, or turn on **Hot Reload on File Save** from the button's dropdown so changes apply automatically when you save.

</TabItem>
<TabItem value="vscode" label="VS Code">

Install the [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) extension, which brings .NET Hot Reload to VS Code. You can either:

- Run the app with `dotnet watch` from the integrated terminal, or
- Start a debug session (<kbd>F5</kbd>) and rely on Hot Reload when you save a file.

</TabItem>
<TabItem value="rider" label="Rider">

JetBrains Rider's hot reload does not drive the .NET metadata updates that XAML reloading depends on. Use one of these instead:

- Run the app with `dotnet watch` from Rider's terminal, or
- Enable the [file-system watcher](#enable-the-file-system-watcher) below and start the app normally.

</TabItem>
</Tabs>

### Enable the file-system watcher

When the .NET Hot Reload agent is not attached, for example under Rider or when you run the app outside `dotnet watch`, the package can still pick up `.axaml` edits with a built-in file-system watcher. Enable it with an MSBuild property in your `.csproj`:

```xml
<PropertyGroup>
  <AvaloniaHotReloadEnableFileWatcher>true</AvaloniaHotReloadEnableFileWatcher>
</PropertyGroup>
```

The watcher reloads `.axaml` files on save even without the .NET Hot Reload agent. C# hot reload still requires the agent, so pair the watcher with `dotnet watch` if you also want live code-behind edits.

## Step 4: Edit a file and verify

With the app running:

1. Open an `.axaml` file, change a property (for example, a `Background` color or a piece of text), and save.
2. Watch the running window update without losing its current view.
3. Open the matching `.axaml.cs` file, adjust an event handler, and save. C# changes apply under the standard .NET Hot Reload rules.

If the window reflects your edit, hot reload is working. Diagnostic output is written to the trace log under the `HotReload` category, which is useful when a change does not appear.

## What you can edit live

Once the app is running, these are common edits that apply without a restart:

- **Resource brushes and values.** Change a color, brush, or font size in a resource dictionary and every control that references it updates. Both `{DynamicResource}` and `{StaticResource}` references pick up the change, because static references are rewritten during hot reload.
- **Data templates.** Change the icon, colors, spacing, or layout of a [data template](/docs/data-templates/introduction-to-data-templates), and every control that uses it, including list items and content presenters, rebuilds with the new template.
- **Control markup.** Adjust the layout, add or remove elements, or edit text in a view (a file with `x:Class`). The live instance is rebuilt in place.
- **Styles.** Edit a selector or setter in an application-level or control-level style, and the new styling is re-applied at once.
- **Code-behind.** Change an event handler or method body in an `.axaml.cs` file. C# edits apply under the standard .NET Hot Reload rules.

## Advanced: initialize manually

Auto-setup covers almost every application. For a custom lifecycle, multiple `Application` instances, or deferred startup, call the initializer yourself:

```csharp
using AvaloniaUI.DiagnosticsSupport.HotReload;

HotReloadExtensions.InitializeHotReload(
    Application.Current!,
    enableFileWatcher: true,
    rewriteStaticResources: true);
```

The engine initializes once per process, so later calls have no effect. To surface hot reload activity in your own logging, subscribe to `HotReloadDiagnostics.EntryLogged`.

## Limitations

- WebAssembly is not supported. Hot reload works on the desktop and mobile platforms only.
- C# edits follow the normal .NET Hot Reload rules. Adding fields or changing method signatures counts as a rude edit and needs a restart.
- Control instances are rebuilt rather than mutated, so non-XAML state on a reloaded control is reset.

## See also

- [Installing the Avalonia Plus developer tools](/tools/developer-tools/installation)
- [Data templates](/docs/data-templates/introduction-to-data-templates)
