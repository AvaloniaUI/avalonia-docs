---
id: main-window
title: The Main Window
---

import LayoutZonesDiagram from '/img/gitbook-import/assets/image (25) (2) (1).png';
import MainWindowScreenshot from '/img/get-started/the-main-window/main-window-screenshot.png';
import RunningAppWindowScreenshot from '/img/get-started/the-main-window/runningrapp-window-screenshot.png';
import VsDesignerScreenshot from '/img/get-started/the-main-window/vs-designer-screenshot.png';
import VsPreviewPaneScreenshot from '/img/get-started/the-main-window/image (6) (2).png';

You can now start your tour of an Avalonia project. We'll start with the main application window. Open the **MainWindow.axaml** file.

:::info
Notice that in Avalonia, XAML files have the extension **.axaml** (and not .xaml). This represents 'Avalonia XAML' and the file extension was introduced for technical reasons.
:::

## What is Happening?

In the **MainWindow.axaml** XAML file, the `<Window>...</Window>` XAML tag represents an Avalonia window. Like other Avalonia controls; the window will be drawn on the target platform with 4 **layout zones**: margin, border, padding and content.

<img className="center" src={LayoutZonesDiagram} alt="" />

In the current application, the content zone of the window references another view: **<views:MainView />**. This is a reference to the **MainView.axaml** file, which is a user control that will be displayed in the content zone of the window.

## The MainView User Control

Inside this user control, you will see a `<TextBlock>...</TextBlock>` XAML tag. This represents a text block control. The `Text` property of the text block is bound to the **Greeting** property of the **MainViewModel** class. This is a property that will be set in the constructor of the view model class.
```
<TextBlock Text="{Binding Greeting}" HorizontalAlignment="Center" VerticalAlignment="Center"/>
```

You can change the text in the file **MainViewModel.cs** to see the change reflected in the user interface.

<img className="center" src={MainWindowScreenshot} alt="" />
<img className="center" src={RunningAppWindowScreenshot} alt="" />

:::info
For more information about the concept of control layout zones, see [here](../../concepts/layout/layout-zones).
:::

## The Visual Studio Designer

If you're using Visual Studio you should see the XAML code and preview pane.
Navigate to the **MainWindow.axaml** file and click the **Design View** button at the top of the editor window.

<img className="center" src={VsDesignerScreenshot} alt="" />

:::info
There may be a red exclamation icon (top left) and the message **The designer is loading...**. This indicates that the project must be built before the preview pane will respond.
:::

- Build the project.
- Scroll the preview pane to the left to view the preview outline and the text displayed in the top left corner.

<img className="center" src={VsPreviewPaneScreenshot} alt="" />

- Remove the binding `{Binding Greeting}` and change the text `<TextBlock Text="`my text`" ...`

You will see the new text in the preview pane change as you type. This is an example of the Avalonia **design-time preview behaviour** that will help you develop user interface presentation accurately and quickly.

- Run the project to see your new text also appear at runtime.

На следующей странице вы узнаете, как добавить обычную кнопку на экран.
