---
description: TUTORIALS - To Do List App
---

# Create a New Project

On this page you will learn how to create a new project for the to do list app.&#x20;

## Visual Studio <a href="#visual-studio" id="visual-studio"></a>

Before you start, check you have installed the _Avalonia UI_ extension for Visual Studio.

:::info
For full instructions about the extension, see [here](../../get-started/install-the-avalonia-extension.md).&#x20;
:::

<div style={{textAlign: 'center'}}>
  <img src="../../.gitbook/assets/image (43).png" alt=""/>
</div>

<figure><figcaption></figcaption></figure>

With the extension installed, start this tutorial by following these instructions:&#x20;

- Start _Microsoft Visual Studio_
- Click **Create a new project**
- In **Search for Templates**, enter 'Avalonia'
- Click  **Avalonia MVVM Application**
- Click **Next**
- In **Project name**, enter 'ToDoList', and click **Create**

The newly created solution will look like this:&#x20;

<div style={{textAlign: 'center'}}>
  <img src="../../.gitbook/assets/image (3) (1) (1).png" alt=""/>
</div>

## .NET Core CLI <a href="#net-core-cli" id="net-core-cli"></a>

Before you start, check you have installed the _Avalonia UI_ templates for .NET Core.

:::info
For full instructions about the starting with the CLI, see [here](../../get-started/getting-started.md).&#x20;
:::

With the templates installed, you can create the application from the template:

```bash
dotnet new avalonia.mvvm -o ToDoList -n ToDoList
```

The newly created project will be look like this:

```bash
ToDoList
 |- App.axaml
 |- App.axaml.cs
 |- Assets
 |   |- avalonia-logo.ico
 |- Models 
 |- nuget.config 
 |- Program.cs
 |- ToDoList.csproj
 |- ViewLocator.cs
 |- ViewModels
 |   |- MainWindowViewModel.cs
 |   |- ViewModelBase.cs
 |- Views
 |   |- MainWindow.axaml
 |   |- MainWindow.axaml.cs
```

## MVVM Project Structure

This section applies to both Visual Studio and CLI.&#x20;

You can see there are folders for each of the concepts in the MVVM pattern (models, views and view models) as well as some other files and folders.&#x20;

* The `/Assets` folder contains binary assets for your application such as icons and bitmaps. Files placed here will automatically be included as resources in the application.
* The `/Models` folder is currently empty, you will add a file here later in this tutorial.
* The `/ViewModels` folder contains a base class for view models and a rudimentary view model for the application main window.
* The `/Views` folder contains the application main window AXAML file. You will add other view files here during this tutorial.
* The `App.axaml` file is for XAML styles and data templates that apply to the whole application. You will not change this file in this tutorial.
* The `Program.cs` file is the entry point for execution of the application. You can configure additional platform options for _Avalonia UI_ here if necessary, however you will not change this file in this tutorial.
* The `ViewLocator.cs` file is a special helper class, and it is used in the `App.axaml` file. The significance of this file will be explained later in this tutorial.

## AXAML Files

_Avalonia UI_ uses the file extension `.axaml` for its XAML files, and this includes those created by the Visual Studio solution template, and more recent versions of the .NET Core CLI templates. If you previously used older .NET Core CLI templates, then the extension may be `.xaml`.&#x20;

:::info
For more background on Avalonia UI XAML see [here](../../concepts/introduction-to-xaml.md).&#x20;
:::
