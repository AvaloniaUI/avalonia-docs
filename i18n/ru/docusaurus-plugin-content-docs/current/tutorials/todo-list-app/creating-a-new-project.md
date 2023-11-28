---
description: TUTORIALS - To Do List App
---

import ToDoCreateNewProjectScreenshot from '/img/gitbook-import/assets/image (43).png';
import ToDoNewSolutionScreenshot from '/img/gitbook-import/assets/image (3) (1) (1).png';

# Create a New Project

On this page, you will learn how to create a new project for the To-Do List app. There are two methods to choose from:

1. **Visual Studio Extension Template**: If you prefer using Visual Studio, follow the instructions below to create your project.

2. **.NET Core CLI Command**: Alternatively, if you prefer command-line tools, you can use the .NET Core CLI command. Here's how:

## Visual Studio

Before you start, check if you have installed the _Avalonia UI_ extension for Visual Studio.

:::info
For full instructions about the extension, see [here](../../get-started/install-the-avalonia-extension.md).
:::

<p><img className="center" src={ToDoCreateNewProjectScreenshot} alt="" /></p>

With the extension installed, start this tutorial by following these instructions:

- Start _Microsoft Visual Studio_
- Click **Create a new project**
- In **Search for Templates**, enter 'Avalonia'
- Click  **Avalonia MVVM Application**
- Click **Next**
- In **Project name**, enter 'ToDoList' as the project name and click **Create**

The newly created solution will look like this:

<img className="center" src={ToDoNewSolutionScreenshot} alt="" />

## .NET Core CLI

Before you start, check if you have installed the _Avalonia UI_ templates for .NET Core.

:::info
For full instructions about starting with the CLI, see [here](../../get-started/getting-started.md).
:::

With the templates installed, you can create the application from the template:

```bash
dotnet new avalonia.mvvm -o ToDoList -n ToDoList
```

The newly created project will look like this:

```bash
ToDoList
 |- Assets
 |   |- avalonia-logo.ico
 |- Models
 |- ViewModels
 |   |- MainWindowViewModel.cs
 |   |- ViewModelBase.cs
 |- Views
 |   |- MainWindow.axaml
 |   |  |- MainWindow.axaml.cs
 |- App.axaml
 |   |- App.axaml.cs
 |- app.manifest
 |- Program.cs
 |- ViewLocator.cs
 |- ToDoList.csproj
```

## MVVM Project Structure

This section applies to both Visual Studio and CLI.

You can see there are folders for each of the concepts in the MVVM pattern (models, views, and view models) as well as some other files and folders.

* The `/Assets` folder contains binary assets for your application such as icons and bitmaps. Files placed here will automatically be included as resources in the application.
* The `/Models` folder is currently empty, you will add a file here later in this tutorial.
* The `/ViewModels` folder contains a base class for view models and a rudimentary view model for the application's main window.
* The `/Views` folder contains the application main window AXAML file. You will add other view files here during this tutorial.
* The `App.axaml` file is for XAML styles and data templates that apply to the whole application. You will not change this file in this tutorial.
* The `Program.cs` file is the entry point for the execution of the application. You can configure additional platform options for _Avalonia UI_ here if necessary, however, you will not change this file in this tutorial.
* The `ViewLocator.cs` file is a special helper class, and it is used in the `App.axaml` file. The significance of this file will be explained later in this tutorial.

## AXAML Files

_Avalonia UI_ uses the file extension `.axaml` for its XAML files, and this includes those created by the Visual Studio solution template and more recent versions of the .NET Core CLI templates. If you previously used older .NET Core CLI templates, the extension may be `.xaml`.

:::info
For more background on Avalonia UI XAML see [here](../../basics/user-interface/introduction-to-xaml.md).
:::
