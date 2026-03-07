---
id: developer-tools
title: Developer tools issues
sidebar_label: Developer tools
description: Troubleshoot common Developer Tools problems including connection failures, missing logs, and diagnostic configuration.
doc-type: troubleshooting
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

## Reporting issues

Developer Tools uses a GitHub repository to track bugs and feature requests: [AvaloniaUI/AvaloniaUI.DeveloperTools](https://github.com/AvaloniaUI/AvaloniaUI.DeveloperTools/issues).

Before you open an issue, collect the following information at a minimum:

1. Steps to reproduce the problem.
2. Your operating system and version.
3. The Avalonia version your application targets.
4. Any non-default `DeveloperToolsOptions` values you have configured.
5. Developer Tools and Diagnostics Support logs (see below).

## Developer Tools does not launch or attach

If Developer Tools fails to open or does not attach to your application, check the following:

- **Confirm the NuGet package is installed.** Your project must reference the `Avalonia.Diagnostics` package (or, for the standalone tool, ensure you have installed Developer Tools separately). Verify the package version matches your Avalonia version.
- **Check that `AttachDeveloperTools` is called.** In your `App.axaml.cs` or startup code, make sure you call `application.AttachDeveloperTools()`. Without this call, the diagnostics support library is never initialized.
- **Verify the process is not blocked by a firewall or antivirus.** The standalone Developer Tools process communicates with your application over a local connection. Security software can occasionally block this traffic.
- **Look for port conflicts.** If another process is using the same port, the connection may fail silently. Check the Diagnostics Support logs (described below) for connection errors.
- **Restart both processes.** If you updated Avalonia or the Developer Tools package, close your application and the Developer Tools process, then relaunch both.

## Obtaining Developer Tools logs

The Developer Tools process collects logs, batches them, and saves them to disk. The log directory is platform-specific.

**Windows:**

```text
%LocalAppData%\AvaloniaUI\com.AvaloniaUI.Net.DeveloperTools\Logs\
```

**Linux:**

```text
~/.local/share/AvaloniaUI/com.AvaloniaUI.Net.DeveloperTools/Logs/
```

**macOS:**

```text
~/Library/Application Support/AvaloniaUI/com.AvaloniaUI.Net.DeveloperTools/Logs/
```

If the log directory does not exist, Developer Tools may not have run successfully. Try launching it manually and check for errors in your terminal or console output.

### Log files are empty or missing

- Logs are written in batches, so a very short session may not produce output. Keep Developer Tools open for at least a few seconds before closing.
- On Linux, confirm that the `~/.local/share` directory is writable by your user account.
- On macOS, confirm that the `~/Library/Application Support` directory has not been restricted by system privacy settings.

## Obtaining Diagnostics Support logs

Diagnostics Support is the integration library that runs inside your application process and establishes a connection with the Developer Tools process.

By default, it does not write any logs. To enable logging, configure `DeveloperToolsOptions` when you attach:

```csharp
application.AttachDeveloperTools(o =>
{
    // DiagnosticLogger is a public abstract class that you can implement in your own code.
    // CreateConsole returns a built-in implementation that writes to Console.Out and Console.Error.
    o.DiagnosticLogger = DiagnosticLogger.CreateConsole();
});
```

Once enabled, diagnostic messages appear in your application's standard output. If you are running from an IDE, check the **Output** or **Debug Console** window.

### Custom logger implementations

If console output is not practical (for example, in a production diagnostic scenario), you can subclass `DiagnosticLogger` and route messages to a file or logging framework:

```csharp
public class FileDiagnosticLogger : DiagnosticLogger
{
    private readonly StreamWriter _writer;

    public FileDiagnosticLogger(string path)
    {
        _writer = new StreamWriter(path, append: true);
    }

    protected override void Log(string message)
    {
        _writer.WriteLine($"{DateTime.UtcNow:O} {message}");
        _writer.Flush();
    }
}
```

Then pass your custom logger in the options:

```csharp
application.AttachDeveloperTools(o =>
{
    o.DiagnosticLogger = new FileDiagnosticLogger("/tmp/avalonia-diag.log");
});
```

## Common issues

| Symptom | Possible cause | Resolution |
|---|---|---|
| Developer Tools window opens but shows no visual tree | The application has not finished initializing | Wait for the main window to appear, or call `AttachDeveloperTools` after `OnFrameworkInitializationCompleted` |
| "Connection refused" in diagnostic logs | Port conflict or firewall blocking local traffic | Check for port conflicts and firewall rules |
| Logs directory exists but contains no recent files | Developer Tools crashed before flushing the log batch | Reproduce the issue and keep Developer Tools open longer before closing |
| Breakpoints or property edits do not take effect | Version mismatch between `Avalonia.Diagnostics` and your Avalonia runtime | Ensure all Avalonia packages use the same version |

## See also

- [Developer Tools installation](../../tools/developer-tools/installation.md)
- [Attaching applications](../../tools/developer-tools/attaching-applications.md)
- [Developer Tools options](../../tools/developer-tools/options.md)
- [Elements tool](../../tools/developer-tools/elements-tool.md)
- [Debugging data bindings](../../docs/data-binding/binding-debugging.md)
