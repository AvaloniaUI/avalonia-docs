---
description: TUTORIALS - To Do List App
---

import ToDoDataContextResolvedArchitectureDiagram from '/img/gitbook-import/assets/image (20) (3).png';
import ToDoDataContextResolvedScreenshot from '/img/gitbook-import/assets/image (5) (1) (2).png';

# Add a Data Context

On this page, you will set the data context of the to do list view to be the `ToDoList` property.

To set the data context, follow this procedure:

- Locate the **MainWindow.axaml** file in the **Views** folder.
- Remove the `<Design.DataContext>` tag completely.
- Add the `x:DataType="vm:MainWindowViewModel"` attribute to `<Window>` element.
- Locate the content `<views:ToDoListView/>`
- Add the attribute `DataContext="{Binding ToDoList}"` as follows:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:ToDoList.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
        xmlns:views="clr-namespace:ToDoList.Views"
        x:Class="ToDoList.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="Avalonia To Do List">
  <views:ToDoListView DataContext="{Binding ToDoList}"/>
</Window>
```

The arrangement of views and view models now has an additional data context; defined as a binding, that will allow the _Avalonia UI_ binder to locate the `ToDoList` property on the `ToDoListViewModel` object. This object has already been instantiated in code during app initialization.

So here is the arrangement after the data context binding has been resolved:

<img className="center" src={ToDoDataContextResolvedArchitectureDiagram} alt="" />

Now if you run the app, the _Avalonia UI_ binder has a suitable data context for the items control binding; and the items show up in the view:

<img className="center" src={ToDoDataContextResolvedScreenshot} alt="" />
