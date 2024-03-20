---
id: respond-to-an-event
title: Respond to an Event
---

import SolutionCodeBehindScreenshot from '/img/get-started/test-drive/solution-code-behind.png';
import EventDebugOutputScreenshot from '/img/get-started/test-drive/event-debug-output.png';

There are a number of ways you can implement actions in an Avalonia application. On this page, you will see how to use 
one of the simplest: how to write event handling code for a button click.

To start, you will write a button click event handler that does not interact with any of the other controls.

## Code-Behind

XAML files can have C# source files associated with it referred to as by "code-behind". Code-behind is used to access 
named controls and handle events for its associated XAML. When using an IDE, you can find this file in 
the **Solution Explorer** as a sub-item of the `.axaml` file.

<img className="center" src={SolutionCodeBehindScreenshot} alt="" />

To change the code-behind for `MainView`:

- Open the `MainView.axaml.cs` file

You should see C# code like this:

```csharp
using Avalonia.Controls;

namespace GetStartedApp.Views;
public partial class MainView : UserControl
{
    public MainView()
    {
        InitializeComponent();
    }
}
```

The partial class `MainView` corresponds to the `UserControl` created by Avalonia as a result of the XAML you already 
have. The namespace and class name must be the same in both XAML and code-behind. You can find this class name in the 
root XAML tag:

```xml
<UserControl x:Class="GetStartedApp.Views.MainView"
    ...>
</UserControl>
```

To add an event handler for the `Button`, follow this procedure:

- Locate the `MainView` constructor in the code-behind file (see above instructions).
- After the constructor, add the following code:

```csharp
public void ButtonClicked(object source, RoutedEventArgs args)
{
    Debug.WriteLine("Click!");
}
```

This will require the following using statements:

```cs
using Avalonia.Interactivity;
using System.Diagnostics;
```

- Switch to the XAML file and locate the `<Button>` tag.
- Enter the `Click` attribute at the end of the tag, as follows:

```xml
<Button Grid.Row="2" Grid.Column="1" Margin="0,5" Click="ButtonClicked">
    Calculate
</Button>
```

- Run the app and click the button.

You should see the result on the Output window for Debug, like this:

<img className="center" src={EventDebugOutputScreenshot} alt="" />

On the next page, you will see how to use code-behind to read and change the properties of Avalonia controls at runtime.
