---
id: set-up-an-editor
title: Set Up an Editor
---

import AvaloniaVsExtensionMarketplaceScreenshot from '/img/get-started/avalonia-vs-extension-marketplace.png';
import AvaloniaVsExtensionNuGetScreenshot from '/img/get-started/avalonia-vs-extension-nuget.png';

# Set Up an Editor

You can create an Avalonia application using any code editor, but using an IDE will give you support for authoring Avalonia XAML files with a previewer and code completion.

## Visual Studio

If you're developing Avalonia with Visual Studio you should install the [Avalonia for Visual Studio](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaVS) extension.

<img className="center" src={AvaloniaVsExtensionMarketplaceScreenshot} alt="Avalonia Extension shown in the Marketplace" />

The extension provides enhanced editor support for Avalonia XAML together with a previewer.

To install the Avalonia for Visual Studio extension:

* In Visual Studio click **Manage Extensions** on the **Extensions** menu
* In the **Search** box, type "Avalonia"
* Click **Download** and follow the instructions (you will need to close Visual Studio to complete the installation)

<img className="center" src={AvaloniaVsExtensionNuGetScreenshot} alt="Avalonia extension shown in the Manage Extensions window" />

:::info
Alternatively you can [download the extension from the Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaVS).
:::

:::info
If you are using VS2019 or VS2017 you will need to [download the version of extension for older Visual Studio versions](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaforVisualStudio).
:::

## JetBrains Rider

The [JetBrains Rider](https://www.jetbrains.com/rider/) IDE has built-in support for Avalonia XAML starting in 2020.3 including first-class support for Avalonia-specific XAML features and custom code inspections. Now that Rider is free for individual use, we strongly recommend it as the primary IDE for Avalonia development, especially for developers on macOS and Linux.

Rider offers the most complete and polished development experience for Avalonia, with built-in features including:

* Advanced XAML completion and navigation
* Rich code analysis and quick-fixes
* Comprehensive debugging tools
* Built-in performance profiling

### AvaloniaRider Plugin

The 3rd party [AvaloniaRider](https://plugins.jetbrains.com/plugin/14839-avaloniarider) plugin adds the [Avalonia file templates](./install.md) to Rider, as well as enables live XAML preview functionality.

While Rider includes native Avalonia XAML support out of the box, This plugin provides a live preview of your XAML changes as you type, similar to the preview feature available in Visual Studio and Visual Studio Code.

Note that the plugin is optional - you can develop Avalonia applications in Rider without it, but the live preview capability and file templates makes XAML development more efficient.

## Visual Studio Code

The Avalonia for [Visual Studio Code Extension](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.vscode-avalonia) contains basic support for Avalonia XAML autocomplete and previewer. While functional, the development experience is not as rich as what you'll find in Rider or Visual Studio. For developers on macOS and Linux requiring a full IDE experience, we recommend using JetBrains Rider instead.

If you still prefer to use VS Code, you can install the extension from the [Visual Studio Code marketplace](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.vscode-avalonia).

## Editor Comparison

For the best Avalonia development experience:

* **Windows**: Use either Visual Studio or JetBrains Rider
* **macOS/Linux**: Use JetBrains Rider
* **Lightweight Editor**: Visual Studio Code can be used but offers a more limited feature set
