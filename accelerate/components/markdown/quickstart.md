# Markdown Quick Start Guide

This guide provides a practical introduction to rendering Markdown in Avalonia applications using the `Avalonia.Controls.Markdown` package.


## Installation

See the [Installation Guide](../../installation.md) for step-by-step instructions on configuring the NuGet package source and license key.

- [Option 1: Configure via nuget.config](../../installation.md#option-1-configure-via-nugetconfig-recommended)
- [Option 2: Configure via Visual Studio](../../installation.md#option-2-configure-via-visual-studio)

Add the Markdown package to your project:

```bash
dotnet add package Avalonia.Controls.Markdown
```

## Basic Usage

### XAML Example

```xml
<Markdown Text="# Hello, Markdown!"/>
```

### C# Example

```csharp
using Avalonia.Controls;

var markdown = new Markdown
{
    Text = "# Hello, Markdown!"
};
```

## Styling

You can override named resources for custom styling. See the [Markdown Styling and Customization](styling.md) page for details.

## Related Links
- [Markdown Overview](markdown.md)
