---
id: creating-a-new-project
title: Creating a new project
---

## Visual Studio

The easiest way to get started with Avalonia from Visual Studio is to [install the extension](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaforVisualStudio) from the Visual Studio Marketplace. Once that is installed, you can create an Avalonia MVVM application:

  <div style={{textAlign: 'center'}}>
    <img src="/img/tutorials/todo-list-app/creating-a-new-project/image%20%285%29.png" alt="Decription" />
  </div>

-  Start Visual Studio
-  Select "Create a new project" from the start window or `File -> New -> Project` from the main menu
-  Search for "Avalonia" and select "Avalonia MVVM Application"
-  Click "Next"
-  Enter "Todo" as the Project name
-  Click "Create"

## .NET Core CLI

First install the Avalonia templates for .NET Core by following the instructions [here](https://github.com/AvaloniaUI/avalonia-dotnet-templates).

Now you can create the application from the template:

```bash
dotnet new avalonia.mvvm -o Todo -n Todo
```

## Project structure

The newly created project will be pre-filled with a number of files and directories:

```bash
Todo
 |- App.axaml
 |- App.axaml.cs
 |- Assets
 |   |- avalonia-logo.ico
 |- Models 
 |- nuget.config 
 |- Program.cs
 |- Todo.csproj
 |- ViewLocator.cs
 |- ViewModels
 |   |- MainWindowViewModel.cs
 |   |- ViewModelBase.cs
 |- Views
 |   |- MainWindow.axaml
 |   |- MainWindow.axaml.cs
```

You can see there are directories for each of the concepts in the MVVM pattern \(models, views and view models\) as well as couple of other files and directories:

* The **Assets** directory holds the binary assets for your application such as icons and bitmaps. Files placed in this directory will automatically be included as resources in the application.
* The **Models** directory is currently empty, but as the name suggests this is where we'll be putting our models.
* The **ViewModels** directory is pre-filled with a base class for view models and a view model for the application main window.
* The **Views** directory just contains the application main window for now.
* The **App.axaml** file is where XAML styles and templates that will apply to the entire application will be placed.
* The **Program.cs** file is the entry point for execution of the application. Here you can configure the platform options for Avalonia if necessary.
* The **ViewLocator.cs** file is used to look up views for view models. This will be explained in more detail later.

:::info
**.xaml or .axaml?**

In this tutorial we will use the `.axaml` file extension for XAML files which is what will be created by the Visual Studio extension. If you're using the .NET Core CLI, the extension will be `.xaml`. See the [Intro to XAML](https://docs.avaloniaui.net/guides/basics/introduction-to-xaml#xaml-or-axaml-file) page for information on why this happens.
:::
