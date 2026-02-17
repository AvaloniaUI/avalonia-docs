---
id: visual-studio-extension
title: Avalonia for Visual Studio extension
sidebar_label: Visual Studio extension
---

import TestXamlPreviewer from '/img/guides/ui-development/preview-and-design-time/test-xaml-previewer.png';

## Features

The Avalonia for Visual Studio extension provides an enhanced way of working with Avalonia XAML files. It does this by providing:

- An enhanced editor with deep integrations for a rich editing experience.
- A Previewer so you can see what the UI will look like without having to run the application.

## Installation

See our [Getting Started guide](/docs/get-started#choosing-an-ide) for instructions to install the Avalonia for Visual Studio extension.

### Enhanced Editor

The editor for Avalonia XAML includes the following capabilities:

- Smarter, more helpful Intellisense while typing.
- Error highlighting and fix suggestions.
- Automatic XAML namespace imports.
- Full colorization of the XAML.
- "Go To Definition" navigation.
- Intelligent hover tips.
- Automatic document formatting.
- Outlining of the document so you can collapse elements.

### Previewer

The previewer allows you to see what the UI of the open document will look like without needing to run the application.

For more information, please see [Previewing your UI design](/docs/ui-development/preview-and-design-time).

<Image light={TestXamlPreviewer} alt="A screenshot demonstrating a test of the Avalonia XAML previewer." maxWidth={400} cornerRadius="true"/>

## Settings

Multiple options are provided to allow you to configure the way the editor and previewer behave.

These can be accessed by selecting **Options** from the **Tools** menu inside Visual Studio.

![Options dialog](/img/vs-extension/visual-studio-avalonia-options.png)

|  Setting              | Description | Options       |
|-----------------------|-------------|---------------|
| Default Document View | What is displayed when a document is opened | Split (Default) - Both the code and the previewer<br />Design - Just the previewer<br /> Source - Just the source code |
| Split Orientation     | Whether to split the orientation horizontally or vertically | Horizontal (Default) - The editor and previewer are displayed side by side<br />Vertical - The editor and previewer are displayed one above the other |
| Swapped               | Whether the default position of the editor and previewer should be inverted when opening a document in 'Split' mode | True if checked |
| Default Zoom level    | How to size the content in the  | 100% (Default)<br />Various percentages<br />Fit to Width - Allow the preview to take the full width of the available space<br />Fit All - Fill the entire previewer |
| Minimum Log Verbosity | The minimum LogLevel for information output by the extension | Trace<br />Debug<br />Information (Default)<br />Warning<br />Error<br />Critical<br />None |
