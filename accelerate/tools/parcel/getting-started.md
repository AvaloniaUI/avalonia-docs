# Getting Started

## Prerequisites

| Requirement | Version/Details |
|------------|-----------------|
| .NET Runtime | 6.0 or newer |
| Windows | 10 or newer |
| macOS | 13 or newer |
| Linux | X11 and glibc 2.27 or musl 1.22.2 compatible distros |

## Step 1: Installing AvaloniaUI Parcel

`AvaloniaUI Parcel` is currently a native [.NET tool](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools), with update mechanism provided by the SDK.
This guide demonstrates global installation of the tool. But local installation is possible with a limitation: this tool will only work from the same working directory or descendant as the tool installation solution/project.

<Tabs>
<TabItem value="net10" label=".NET 10+" default>

```bash
dotnet tool install --global AvaloniaUI.Parcel
```

The Developer Tools will notify you when a new version is available. It can be then updated by running `dotnet tool update` command.

<details>
<summary>Developer tools update command</summary>

```bash
dotnet tool update --global AvaloniaUI.Parcel
```

</details>


</TabItem>
<TabItem value="net6" label=".NET 8">

Before .NET 10, you have to install specific package depending on the running platform.

**Windows:**

```bash
dotnet tool install --global AvaloniaUI.Parcel.Windows
```

**macOS:**

```bash
dotnet tool install --global AvaloniaUI.Parcel.macOS
```

**Linux:**

```bash
dotnet tool install --global AvaloniaUI.Parcel.Linux
```

The Developer Tools will notify you when a new version is available. It can be then updated by running `dotnet tool update` command.

<details>
<summary>Developer tools update commands</summary>

**Windows:**

```bash
dotnet tool update --global AvaloniaUI.Parcel.Windows
```

**macOS:**

```bash
dotnet tool update --global AvaloniaUI.Parcel.macOS
```

**Linux:**

```bash
dotnet tool update --global AvaloniaUI.Parcel.Linux
```

</details>

</TabItem>
</Tabs>

## Step 2: Run the tool

After installation, you can launch it from terminal using:

```bash
parcel
```

This command will run GUI application where you can open or create parcel projects.

Alternatively, it's possible to run CLI commands from terminal on existing parcel project:

```bash
parcel pack ./SampleApp.parcel -r osx-x64 -p dmg -o ./artifacts
```

This command will bundle, sign and package application into a dmg file from the pre-configured parcel project.

:::note
CLI is not available in free community license.
:::

## Step 3: Activate the tool

Once the Parcel has opened, you will be asked to input `AvaloniaUI Portal` credentials that were used to license the tool.

For the CLI, you can set `--licenseKey` option or `PARCEL_LICENSE_KEY` env variable.

## Further Reading

- [Parcel CLI reference](cli-reference.md)
- [Model Context Protocol](mcp.md)
- [Windows packaging](./windows/index.md)
- [macOS packaging](./apple/index.md)
- [Linux packaging](./linux/index.md)
