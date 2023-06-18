---
id: the-main-window
title: The Main Window 
---

import Highlight from '@site/src/components/Highlight';

You can now start your tour of the parts on an _Avalonia UI_ project by trying the XAML designer for the main application window.

Locate and double-click the file <Highlight color="#25c2a0">**MainWindow.axaml**</Highlight> to display the XAML UI code and preview pane.

:::info
Notice that in _Avalonia UI_, XAML files have the extension <Highlight color="#25c2a0">**.axaml**</Highlight> (and not .xaml). This represents 'Avalonia XAML' and the file extension was introduced for technical reasons.
:::

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/the-main-window/image (22) (1).png" alt="" />
</div>

:::info
Notice the red exclamation icon (top left) and the message <Highlight color="#25c2a0">**The designer is loading...**</Highlight>. This indicates that the project must be built before the preview pane will respond.
:::

* [ ] Build the project.
* [ ] Scroll the preview pane to the left to view the preview outline and the text displayed in the top left corner.

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/the-main-window/image (6) (2).png" alt="" />
</div>

* [ ] Locate the <Highlight color="#25c2a0">`Welcome to Avalonia!`</Highlight>message text in the XAML pane, and make a change.

You will see the new text in the preview pane change as you type. This is an example of the _Avalonia UI_ **design-time preview behaviour** that will help you develop user interface presentation accurately and quickly.

* [ ] Run the project to see your new text also appear at runtime.

## What is Happening?

In the <Highlight color="#25c2a0">**MainWindow.axaml**</Highlight> XAML file, the `<Window>...</Window>` XAML tag codes for a new _Avalonia UI_ window. Like other _Avalonia UI_ controls; the window will be drawn on the target platform with 4 **layout zones**: margin, border, padding and content.

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/the-main-window/image (25) (2) (1).png" alt="" />
</div>

In your current application, the content zone of the window has only a simple string comprising your latest message; so that is what is displayed.

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/the-main-window/image (15) (1) (1).png" alt="" />
</div>

At this stage, you do not have a margin, border or any padding defined, so the message appears right up against the top left corner of the window. 

:::info
For more information about the concept of control layout zones, see [here](../concepts/layout/layout-zones.md).
:::

On the next page you will see how to add a simple button to the window.
