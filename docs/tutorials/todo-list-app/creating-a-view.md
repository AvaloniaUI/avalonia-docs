---
description: TUTORIALS - To Do List App
---

import ToDoCreateANewViewScreenshot from '/img/gitbook-import/assets/image (1) (1).png';

# Create a New View

On this page, you will add a view to display the list of to do items, with a button to add a new item.

To get the tutorial started, you will use hard-coded data for the list items. Later you will connect the view to some data in the view model.

In _Avalonia UI_, the UI element corresponding to a MVVM view can be either a window or a user control. This new view will be user control, and later you will use the main window to display it.

### Visual Studio

Follow these instructions to add a new user control:

- In the **Solution Explorer** locate and right-click the **Views** folder.
- Click **Add** and then **New Item**
- Click **Avalonia** under **C# Items** and then click **User Control (Avalonia)**
- In **Name** enter 'ToDoListView'
- Click **Add**

### .NET Core CLI

Run the following command from the root folder of your project, that is the folder that contains the `Program.cs` file and the `/Views` folder:

```
dotnet new avalonia.usercontrol -o Views -n ToDoListView  --namespace ToDoList.Views
```

### The User Control

You will see the new AXAML file created in the `/Views` folder

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
             x:Class="ToDoList.Views.ToDoListView">
  Welcome to Avalonia!
</UserControl>
```

You will also find a `ToDoListView.axaml.cs` file containing the code-behind for the view (in Visual Studio this is nested under the AXAML file. The code-behind looks like this:

```csharp
using Avalonia.Controls;

namespace ToDoList.Views
{
    public partial class ToDoListView : UserControl
    {
        public ToDoListView()
        {
            InitializeComponent();
        }
    }
}
```

You are not going to change the code-behind file in this tutorial, but notice that the user control class is called `ToDoListView` and it is located in the `ToDoList.Views` namespace.

### Resize the Preview Pane

To make the design-time preview look more like a mobile phone in portrait orientation, locate the design-time width and height properties for the user control and set them as shown:

<pre class="language-markup"><code class="lang-markup">
<strong>&#x3C;UserControl</strong>
<strong>...</strong>
<strong>d:DesignWidth="250" d:DesignHeight="450"</strong>
<strong>... ></strong>
</code></pre>

Repeat the process with the main window.

### Edit the User Control

Edit the contents of `Views/TodoListView.axaml` to contain the following:

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
             x:Class="ToDoList.Views.ToDoListView">
  <DockPanel>
    <Button DockPanel.Dock="Bottom"
            HorizontalAlignment="Stretch"
            HorizontalContentAlignment="Center">
        Add Item
    </Button>
    <StackPanel>
      <CheckBox Margin="4">Walk the dog</CheckBox>
      <CheckBox Margin="4">Buy some milk</CheckBox>
    </StackPanel>
  </DockPanel>
</UserControl>
```

If you are using the Visual Studio extension you should see the contents of the control displayed in the previewer after completing a build:

<img className="center" src={ToDoCreateANewViewScreenshot} alt="" />
