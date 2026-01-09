# Markdown Quick Start Guide

This guide provides a practical introduction to rendering Markdown in Avalonia applications using the `Avalonia.Controls.Markdown` package.


## Installation

See the [Installation Guide](/accelerate/installation.md) for step-by-step instructions on how to install Accelerate components.

Add the Markdown package to your project:

```bash
dotnet add package Avalonia.Controls.Markdown
```

Add the resources by referencing the shipped `Default.axaml` theme via a `StyleInclude`. Example (add to `App.axaml` inside the `Application.Styles` section):

```xml
<Application.Styles>
   <StyleInclude Source="avares://Avalonia.Controls.Markdown/Themes/Default.axaml" />
   <!-- other styles -->
</Application.Styles>
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
