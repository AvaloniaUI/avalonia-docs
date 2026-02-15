---
id: developer-tools
title: Developer tools
tags:
  - accelerate
---

# Reporting issues with the developer tools

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

Developer Tools uses GitHub repository to track any bugs and feature requests: [AvaloniaUI/AvaloniaUI.DeveloperTools](https://github.com/AvaloniaUI/AvaloniaUI.DeveloperTools/issues).

Before opening an issue, please make sure to collect any useful information.
At the very least, please include:

1. Steps to reproduce.
2. Operating System information.
3. Avalonia version.
4. Any non-default `DeveloperToolsOptions` options.
5. Developer Tools and Diagnostics Support logs (see below).

## Obtaining Developer Tools logs

Developer Tools main instance collects logs, batches them and saves them on the disc.
Location is platform specific

Windows:

```
%LocalAppData%\AvaloniaUI\com.AvaloniaUI.Net.DeveloperTools\Logs\
```

Linux:

```
~/.local/share/AvaloniaUI/com.AvaloniaUI.Net.DeveloperTools/Logs/
```

MacOS:

```
~/Library/Application Support/AvaloniaUI/com.AvaloniaUI.Net.DeveloperTools/Logs/
```

## Obtaining Diagnostics Support logs

Diagnostics Support is an integration library which is running in the user process and establishes connection with the Developer Tools process.

By default, it does not write any logs.

To enable logging you need to setup it in `DeveloperToolsOptions`:

```csharp
application.AttachDeveloperTools(o =>
{
    // `DiagnosticLogger` is a public abstract class, which can be implemented by user code.
    // `CreateConsole` returns a built-in Console.Out/Error based implementation.
    o.DiagnosticLogger = DiagnosticLogger.CreateConsole()
})
```
