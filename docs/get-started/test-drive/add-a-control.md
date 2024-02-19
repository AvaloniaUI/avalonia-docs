---
id: add-a-control
title: Add a Control 
---

import Highlight from '@site/src/components/Highlight';
import CalculateButton from '/img/get-started/test-drive/calculate-button.png';
import ButtonIntellisenseScreenshot from '/img/get-started/test-drive/button-intellisense.png';

So far the main window of your application displays only a text string. On this page, you will learn how to add some of the built-in controls that are part of Avalonia.

## Button

Avalonia contains a built-in control that creates a button. Follow this procedure to replace the text string you currently have in the content zone of the window, with a button control.

- Stop the app if it is running.
- Locate the 
`<TextBlock Text="text" HorizontalAlignment="Center" VerticalAlignment="Center"/>`	
in the `MainView.axaml` file.. 
- Delete the entire line.
- Insert a 'Button' tag as shown:
```xml
  <Button>Calculate</Button>
```
<img className="center" src={CalculateButton} alt="" />

:::tip
If you're using a previewer, you will see the button appear in the preview pane as soon as the XAML is valid. You can also try out a mouse move-over and click on the button to see the different colors it displays in different states.
:::

- Run the app to confirm that the presentation and behaviour of the button is the same at runtime.

## Control Attributes

The XAML code for Avalonia controls uses attributes to specify presentation and behaviour. The attributes can set properties, call methods and event handlers in the controls created by the XAML.

For example, you  will notice that the button you just implemented is rendered hard against the left edge of the window. This is a result of the default value of its horizontal alignment property (which is left). Follow this procedure to set the horizontal alignment to centered instead.

- Add a new attribute to the Button tag as follows:

```xml
<Button HorizontalAlignment="Center">Calculate</Button>
```

:::tip
If you're using an IDE, notice how the Avalonia Intellisense guides you as you add attributes to the XAML.

<img className="center" src={ButtonIntellisenseScreenshot} alt="" />
:::

The button should now move to the center of the window content zone (both horizontally and vertically).

:::info
For full information about the complete range of Avalonia UI built-in controls, and their attributes, see the reference section [here](../../reference/controls).
:::

On the next page, you will learn how to create a more complex layout.