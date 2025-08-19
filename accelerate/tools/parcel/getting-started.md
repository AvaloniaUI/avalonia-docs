# Getting Started

## Prerequisites

| Requirement | Version/Details |
|------------|-----------------|
| .NET Runtime | 6.0 or newer |
| Windows | 10 or newer |
| macOS | 13 or newer |
| Linux | X11 and glibc 2.27 or musl 1.22.2 compatible distros |

No admin/sudo permissions are required to run the tool. Firewall l exception might need to be configured, if you plan to use Developer Tools remotely.

## Step 1: Installing AvaloniaUI Parcel

`AvaloniaUI Parcel` is currently a native [.NET tool](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools), with update mechanism provided by the SDK.
This guide demonstrates global installation of the tool. But local installation is possible with a limitation: this tool will only work from the same working directory or descendant as the tool installation solution/project.

For macOS:

```bash
dotnet tool install --global AvaloniaUI.Parcel.macOS
```

For Windows:

```bash
dotnet tool install --global AvaloniaUI.Parcel.Windows
```

For Linux:

```bash
dotnet tool install --global AvaloniaUI.Parcel.Linux
```

The Developer Tools will notify you when a new version is available. It can be then updated by running `dotnet tool update` command.

<details>
<summary>Developer tools update commands</summary>

To update on macOS:

```bash
dotnet tool update --global AvaloniaUI.Parcel.macOS
```

To update on Windows:

```bash
dotnet tool update --global AvaloniaUI.Parcel.Windows
```

To update on Linux:

```bash
dotnet tool update --global AvaloniaUI.Parcel.Linux
```
</details>

