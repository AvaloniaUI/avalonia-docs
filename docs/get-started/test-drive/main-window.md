---
id: main-window
title: The Main Window
---

import LayoutZonesDiagram from '/img/gitbook-import/assets/image (25) (2) (1).png';
import MainWindowScreenshot from '/img/get-started/the-main-window/image (15) (1) (1).png';
import VsDesignerScreenshot from '/img/get-started/the-main-window/image (22) (1).png';
import VsPreviewPaneScreenshot from '/img/get-started/the-main-window/image (6) (2).png';

You can now start your tour of an Avalonia project. We'll start with the main application window. Open the **MainWindow.axaml** file.

:::info
Notice that in Avalonia, XAML files have the extension **.axaml** (and not .xaml). This represents 'Avalonia XAML' and the file extension was introduced for technical reasons.
:::

## What is Happening?

In the **MainWindow.axaml** XAML file, the `<Window>...</Window>` XAML tag represents an Avalonia window. Like other Avalonia controls; the window will be drawn on the target platform with 4 **layout zones**: margin, border, padding and content.

<img className="center" src={LayoutZonesDiagram} alt="" />

In your current application, the content zone of the window has only a simple string comprising your latest message; so that is what is displayed.

<img className="center" src={MainWindowScreenshot} alt="" />

At this stage, you do not have a margin, border or any padding defined, so the message appears right up against the top left corner of the window. 

:::info
For more information about the concept of control layout zones, see [here](../../concepts/layout/layout-zones).
:::

## The Visual Studio Designer

If you're using Visual Studio you should see the XAML code and preview pane.

<img className="center" src={VsDesignerScreenshot} alt="" />

:::info
Notice the red exclamation icon (top left) and the message **The designer is loading...**. This indicates that the project must be built before the preview pane will respond.
:::

- Build the project.
- Scroll the preview pane to the left to view the preview outline and the text displayed in the top left corner.

<img className="center" src={VsPreviewPaneScreenshot} alt="" />

- Locate the `Welcome to Avalonia!`message text in the XAML pane, and make a change.

You will see the new text in the preview pane change as you type. This is an example of the Avalonia **design-time preview behaviour** that will help you develop user interface presentation accurately and quickly.

- Run the project to see your new text also appear at runtime.

On the next page you will see how to add a simple button to the window.
