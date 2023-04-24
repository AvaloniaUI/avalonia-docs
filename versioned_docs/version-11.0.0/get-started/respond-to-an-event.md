---
description: GET STARTED
---

# ⚡ Respond to an Event

There are a number of ways you can implement actions in an _Avalonia UI_ application. On this page, you will see how to use one of the simplest: how to write event handling code for a button click.&#x20;

To start, you will write a button click event handler that does not interact with any of the other controls.&#x20;

## Code-behind&#x20;

The XAML file for the main window has a C# code-behind file associated with it. You can find this file in the **Solution Explorer** - it is a sub-item of the AXAML file.

![](./img/image%20(59).png)

To change the code-behind for the main window:&#x20;

* [ ] Double-click the  [**MainWindow.axaml.cs**](#user-content-fn-1)[^1]  file in the **Solution Explorer**&#x20;

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

<pre class="language-xml"><code class="lang-xml"><strong>&#x3C;Window 
</strong><strong>    ...
</strong><strong>    x:Class="GetStartedApp.MainWindow" >
</strong><strong>&#x3C;/Window>
</strong></code></pre>

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

```csharp
using Avalonia.Interactivity;
using System.Diagnostics;
```

* [ ] Switch to the XAML file and locate the ```<Button>``` tag.
* [ ] Enter the click attribute at the end of the tag, as follows:

```xml
<Button
   ...
   Click="ButtonClicked">
</Button>
```

You will see the Avalonia UI Intellisense as you type.

![](./img/image%20(25)%20(2).png)

* [ ] Run the app and click the button.&#x20;

You should see the result on the Output window for Debug, like this:

![](./img/image%20(54).png)

On the next page, you will see how to use code-behind to read and change the properties of Avalonia UI controls at runtime.&#x20;

&#x20;   &#x20;

[^1]: 
