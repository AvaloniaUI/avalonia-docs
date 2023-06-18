---
id: respond-to-an-event
title: Respond to an Event
---

import Highlight from '@site/src/components/Highlight';

There are a number of ways you can implement actions in an _Avalonia UI_ application. On this page, you will see how to use one of the simplest: how to write event handling code for a button click.

To start, you will write a button click event handler that does not interact with any of the other controls.

## Code-behind

The XAML file for the main window has a C# code-behind file associated with it. You can find this file in the <Highlight color="#25c2a0">**Solution Explorer**</Highlight> - it is a sub-item of the AXAML file.

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/respond-to-an-event/image (59).png" alt="" />
</div>

To change the code-behind for the main window:

* [ ] Double-click the <Highlight color="#25c2a0">**MainWindow.axaml.cs**</Highlight> file in the <Highlight color="#25c2a0">**Solution Explorer**</Highlight>

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

* [ ] Locate the  `MainWindow` constructor in the code-behind file for the main window (see above instructions).
* [ ] After the constructor add the following code:

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

* [ ] Switch to the XAML file and locate the &#60;Button&#62; tag.
* [ ] Enter the click attribute at the end of the tag, as follows:

```xml
<Button
   ...
   Click="ButtonClicked">
</Button>
```

You will see the Avalonia UI Intellisense as you type.

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/respond-to-an-event/image (25) (2).png" alt="" />
</div>

* [ ] Run the app and click the button.

You should see the result on the Output window for Debug, like this:

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/respond-to-an-event/image (54).png" alt="" />
</div>

On the next page, you will see how to use code-behind to read and change the properties of Avalonia UI controls at runtime.
