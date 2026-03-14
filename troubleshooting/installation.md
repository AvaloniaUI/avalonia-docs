---
id: installation
title: Installation troubleshooting
description: Solutions for common issues when installing the .NET SDK, Avalonia templates, and NuGet package sources.
doc-type: troubleshooting
---

This page covers the most common problems you may encounter when installing the .NET SDK or the Avalonia project templates, along with step-by-step solutions.

## .NET is not a recognized program

If your terminal reports that `dotnet` is not recognized, the .NET SDK is either not installed or not on your system `PATH`.

### Step 1: Check whether the SDK is installed

Run the following command:

```bash
dotnet --list-sdks
```

If a .NET SDK is correctly installed, this returns output similar to the following:

```text
8.0.202 [C:\Program Files\dotnet\sdk]
```

If you see an error instead, download and install the .NET SDK from the [official .NET website](https://dotnet.microsoft.com/en-us/download/dotnet).

### Step 2: Restart your terminal

After installing the SDK, close and reopen your terminal (or start a new shell session). Installers update the system `PATH`, but existing terminal sessions do not pick up the change automatically.

### Step 3: Verify the PATH (if the issue persists)

If `dotnet` is still not recognized after restarting your terminal, confirm that the SDK install directory is included in your `PATH` environment variable.

Typical install locations:

| OS      | Default path                          |
|---------|---------------------------------------|
| Windows | `C:\Program Files\dotnet`             |
| macOS   | `/usr/local/share/dotnet`             |
| Linux   | `/usr/share/dotnet` or `$HOME/.dotnet`|

On **Windows**, open **System Properties > Environment Variables** and check that the path above appears in the `Path` variable. On **macOS** and **Linux**, check your shell profile file (for example, `~/.bashrc`, `~/.zshrc`, or `~/.bash_profile`) for a line that exports the dotnet directory.

:::tip
On macOS, if you installed .NET through the official installer and the command is still not found, try running:

```bash
export PATH="$PATH:/usr/local/share/dotnet"
```

Add that line to your shell profile to make it permanent.
:::

### Step 4: Check for multiple SDK installations

If you have multiple .NET SDK versions or installation methods (for example, Homebrew and the official installer on macOS), they can conflict. Run:

```bash
which dotnet
```

Make sure the returned path points to the installation you expect. If it does not, adjust your `PATH` so the correct installation takes priority.

## `Avalonia.Templates` package cannot be found

If `dotnet new install Avalonia.Templates` fails with a "not found" error, your NuGet package source configuration may be missing the public NuGet feed.

### Step 1: List your NuGet sources

Run this command:

```bash
dotnet nuget list source
```

Check that the output includes the following entry:

```text
nuget.org [Enabled]
https://api.nuget.org/v3/index.json
```

### Step 2: Add the NuGet source if it is missing

If `nuget.org` does not appear in the list, add it:

```bash
dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org
```

Then retry the template installation:

```bash
dotnet new install Avalonia.Templates
```

### Step 3: Re-enable a disabled source

If `nuget.org` appears in the list but shows `[Disabled]`, enable it:

```bash
dotnet nuget enable source nuget.org
```

### Step 4: Check network and firewall settings

If the source is listed and enabled but the install still fails, check the following:

- **Corporate proxy or VPN**: Your network may block access to `api.nuget.org`. Contact your network administrator or try connecting from a different network.
- **Firewall rules**: Ensure outbound HTTPS traffic to `api.nuget.org` (port 443) is allowed.
- **DNS resolution**: Run `ping api.nuget.org` to verify that the domain resolves correctly.

### Step 5: Clear the NuGet cache

Corrupted or stale cache data can occasionally cause install failures. Clear the cache and try again:

```bash
dotnet nuget locals all --clear
dotnet new install Avalonia.Templates
```

## Template install succeeds but templates do not appear

If `dotnet new install Avalonia.Templates` reports success but `dotnet new list` does not show any Avalonia templates, you may have a template engine cache issue.

Try reinstalling:

```bash
dotnet new uninstall Avalonia.Templates
dotnet new install Avalonia.Templates
```

If you use Visual Studio with the Avalonia extension, note that the extension bundles its own copy of the templates. The `dotnet new install` step is only required for command-line or non-Visual Studio IDE workflows.

## Permission errors during installation

On macOS and Linux, you may see permission errors when installing templates or the .NET SDK.

- Avoid using `sudo` with `dotnet new install`. The .NET template engine stores templates in your user profile directory and does not require elevated permissions.
- If you previously ran the install with `sudo`, the template cache may be owned by root. Reset ownership with:

```bash
sudo chown -R $(whoami) ~/.templateengine
```

## See also

- [Install Avalonia](/docs/get-started/install-avalonia)
- [Set up your IDE](/docs/get-started/set-up-your-ide)
- [App performance issues](/troubleshooting/app-performance-issues)
