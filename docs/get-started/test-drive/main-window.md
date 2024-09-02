---
id: main-window
title: The Main Window
---

import LayoutZonesDiagram from '/img/concepts/layout/layout-zones.png';
import ViewModelScreenshot from '/img/get-started/test-drive/main-window-viewmodel.png';
import AppRunningScreenshot from '/img/get-started/test-drive/main-window-app-running.png';
import VsPreviewerScreenshot from '/img/get-started/test-drive/vs-previewer.png';
import VsPreviewPaneScreenshot from '/img/get-started/test-drive/vs-preview-pane.png';

You can now start your tour of an Avalonia project. We'll start with the main application window. Open the **MainWindow.axaml** file.

:::info
Notice that in Avalonia, XAML files have the extension **.axaml** (and not .xaml). This represents 'Avalonia XAML' and the file extension was introduced for technical reasons.
:::

## What is Happening?

In the **MainWindow.axaml** XAML file, the `<Window>...</Window>` XAML tag represents an Avalonia window. Like other Avalonia controls; the window will be drawn on the target platform with 4 **layout zones**: margin, border, padding and content.

<img src={LayoutZonesDiagram} alt="" />


## The MainWindow control

Inside **MainWindow.axaml**, you will see a `<TextBlock>...</TextBlock>` XAML tag. This represents a text block control. The `Text` property of the text block is bound to the **Greeting** property of the **MainWindowViewModel** class. This is a property that will be set in the constructor of the view model class.
```
<TextBlock Text="{Binding Greeting}" HorizontalAlignment="Center" VerticalAlignment="Center"/>
```

You can change the text in the file **MainWindowViewModel.cs** to see the change reflected in the user interface.

<img className="center" src={ViewModelScreenshot} alt="" />
<img className="center" src={AppRunningScreenshot} alt="" />

:::info
For more information about the concept of control layout zones, see [here](../../concepts/layout/layout-zones).
:::

## The Visual Studio Designer

If you're using Visual Studio you should see the XAML code and preview pane.
Navigate to the **MainWindow.axaml** file and click the **Split View** button at the top of the editor window.

<img className="center" src={VsPreviewerScreenshot} alt="" />

:::info
There may be a red exclamation icon (top left) and the message **The designer is loading...**. This indicates that the project must be built before the preview pane will respond.
:::

- Build the project.
- You will see a preview of the greeting message in the center of the designer section.

<img className="center" src={VsPreviewPaneScreenshot} alt="" />

- Remove the binding `{Binding Greeting}` and change the value of the text attribute, e.g.

    `<TextBlock Text="Hello world!" .../>`

You will see the new text in the preview pane change as you type. This is an example of the Avalonia **design-time preview behaviour** that will help you develop user interface presentation accurately and quickly.

- Run the project to see your new text also appear at runtime.

On the next page you will see how to add a simple button to the window.
