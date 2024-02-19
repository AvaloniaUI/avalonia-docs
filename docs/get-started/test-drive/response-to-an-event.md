---
id: respond-to-an-event
title: Respond to an Event
---

import SolutionCodeBehindScreenshot from '/img/get-started/test-drive/solution-code-behind.png';
import ButtonIntellisenseClickScreenshot from '/img/get-started/test-drive/button-intellisense-click.png';
import EventDebugOutputScreenshot from '/img/get-started/test-drive/event-debug-output.png';

There are a number of ways you can implement actions in an Avalonia application. On this page, you will see how to use one of the simplest: how to write event handling code for a button click.

To start, you will write a button click event handler that does not interact with any of the other controls.

## Code-behind

The XAML file for the main window has a C# code-behind file associated with it. If you're using an IDE, you can find this file in the **Solution Explorer** - it is a sub-item of the `.axaml` file.

<img className="center" src={SolutionCodeBehindScreenshot} alt="" />

To change the code-behind for the main window:

- Open the `MainWindow.axaml.cs` file

You will see some C# code like this:

```csharp
using Avalonia.Controls;

namespace GetStartedApp
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
    }
}
```


The partial class `MainWindow` corresponds to the window object that is created by Avalonia UI as a result of the XAML you already have. You can find this class name in the XAML window tag:

```xml
<Window 
    ...
    x:Class="GetStartedApp.MainWindow" >
</Window>
```

To add an event handler for the button, follow this procedure:

- Locate the  `MainWindow` constructor in the code-behind file for the main window (see above instructions).
- After the constructor add the following code:

```csharp
public void ButtonClicked(object source, RoutedEventArgs args)
{
    Debug.WriteLine("Click!");
}
```

This will require some additional using statements:

```cs
using Avalonia.Interactivity;
using System.Diagnostics;
```

- Switch to the XAML file and locate the `<Button>` tag.
- Enter the click attribute at the end of the tag, as follows:

```xml
<Button
   ...
   Click="ButtonClicked">
</Button>
```

:::tip
If you're using an IDE you will see the Avalonia UI Intellisense as you type.

<img className="center" src={ButtonIntellisenseClickScreenshot} alt="" />
:::

- Run the app and click the button.

You should see the result on the Output window for Debug, like this:

<img className="center" src={EventDebugOutputScreenshot} alt="" />

On the next page, you will see how to use code-behind to read and change the properties of Avalonia UI controls at runtime.
