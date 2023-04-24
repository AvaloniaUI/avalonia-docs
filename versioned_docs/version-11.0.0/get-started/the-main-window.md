---
description: GET STARTED
---

# ⚡ The Main Window

You can now start your tour of the parts on an _Avalonia UI_ project by trying the XAML designer for the main application window.&#x20;

Locate and double-click the file **MainWindow.axaml** to display the XAML UI code and preview pane.&#x20;

{% hint style="info" %}
Notice that in _Avalonia UI_, XAML files have the extension **.axaml** (and not .xaml). This represents 'Avalonia XAML' and the file extension was introduced for technical reasons.&#x20;
{% endhint %}

![](./img/image%20(22)%20(1).png)

{% hint style="info" %}
Notice the red exclamation icon (top left) and the message **The designer is loading...**. This indicates that the project must be built before the preview pane will respond.
{% endhint %}

* [ ] Build the project.
* [ ] Scroll the preview pane to the left to view the preview outline and the text displayed in the top left corner.

![](./img/image%20(6)%20(2).png)

* [ ] Locate the `Welcome to Avalonia!`message text in the XAML pane, and make a change.

You will see the new text in the preview pane change as you type. This is an example of the _Avalonia UI_ **design-time preview behaviour** that will help you develop user interface presentation accurately and quickly.

* [ ] Run the project to see your new text also appear at runtime.

## What is Happening?

In the **MainWindow.axaml** XAML file, the `<Window>...</Window>` XAML tag codes for a new _Avalonia UI_ window. Like other _Avalonia UI_ controls; the window will be drawn on the target platform with 4 **layout zones**: margin, border, padding and content.&#x20;

![](./img/image%20(25)%20(2)%20(1).png)

In your current application, the content zone of the window has only a simple string comprising your latest message; so that is what is displayed.&#x20;

![](./img/image%20(15)%20(1)%20(1).png)

At this stage, you do not have a margin, border or any padding defined, so the message appears right up against the top left corner of the window. &#x20;

:::info
For more information about the concept of control layout zones, see [here](../concepts/layout/layout-zones.md).
:::

On the next page you will see how to add a simple button to the window.
