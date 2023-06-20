---
description: CONCEPTS
---

# 💡 Control Trees

_Avalonia UI_ creates control trees from the XAML files in an application so that it can render the UI presentation and manage the application functionality.  &#x20;

## Logical Tree

The logical control tree represents the application controls (including the main window) in the hierarchy in which they are defined in the XAML. For example: and control (button) inside another control (stack panel) in a window will have the 3-layer logical tree shown here:

<!--<figure><img src="../.gitbook/assets/image (61).png" alt=""><figcaption></figcaption></figure>-->

While your application is running, you can show the _Avalonia Dev Tools_ window (hit F12). This displays the logical tree on its <mark style="color:green;">**Logical Tree**</mark> tab.

## Visual Tree&#x20;

The visual control tree contains everything that is actually being run by _Avalonia UI_. It shows all the properties set on the controls, and all the additional parts that have been added by _Avalonia UI_ in order to present the UI and manage the application functionality. &#x20;

<!--<figure><img src="../.gitbook/assets/image (15) (2).png" alt=""><figcaption></figcaption></figure>-->

You can see the visual control tree on the <mark style="color:green;">**Visual Tree**</mark> tab of the _Avalonia Dev Tools_ window.

## Events&#x20;

An essential part of application functionality management performed by _Avalonia UI_, is the generation and propagation of events. The <mark style="color:green;">**Events**</mark> tab logs the source and propagation of events as you move around, and otherwise interact with the running application.

<!--<figure><img src="../.gitbook/assets/image (1) (1) (2).png" alt=""><figcaption></figcaption></figure>-->
