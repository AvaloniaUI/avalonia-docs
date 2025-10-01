# TreeDataGrid Quick Start Guide

## Overview

The Avalonia `TreeDataGrid` is a control which displays hierarchical and tabular data together in a single view. It is a combination of a `TreeView` and `DataGrid` control.

The control has two modes of operation:

- **Hierarchical**: data is displayed in a tree with optional columns
- **Flat**: data is displayed in a 2D table, similar to other DataGrid controls

## Installation

Avalonia Accelerate packages are via [nuget.org](https://www.nuget.org/packages/Avalonia.Controls.TreeDataGrid). To add the `Avalonia.Controls.TreeDataGrid` package to your project:

```bash
dotnet add package Avalonia.Controls.WebView
```

### Add the License Key

Include your Avalonia UI license key in the executable project file (`.csproj`):

```xml
<ItemGroup>
  <AvaloniaUILicenseKey Include="YOUR_LICENSE_KEY" />
</ItemGroup>
```

:::tip
For multi-project solutions, you can store your license key in an [environment variable](https://learn.microsoft.com/en-us/visualstudio/msbuild/how-to-use-environment-variables-in-a-build) or a [shared props file](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory?view=vs-2022#directorybuildprops-example) to avoid duplication.
:::

## Install the Theme

The theme for `TreeDataGrid` must be installed into your `App.axaml` in order for anything to appear:

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp"
             RequestedThemeVariant="Default">
    <Application.Styles>
        <FluentTheme />
        // highlight-next-line
        <StyleInclude Source="avares://Avalonia.Controls.TreeDataGrid/Themes/Fluent.axaml"/>
    </Application.Styles>
</Application>
```

## Basic Usage

See:

- Quick Start - [Flat TreeDataGrid](quickstart-flat); or
- Quick Start - [Hierarchical TreeDataGrid](quickstart-hierarchical)