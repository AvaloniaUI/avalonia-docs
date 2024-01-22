---
id: create-a-project
title: Create and Run a Project
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import RiderSplashScreenshot from '/img/get-started/test-drive/rider-splashscreen.png';
import RiderSolutionScreenshot from '/img/get-started/test-drive/rider-solution.png';
import VsFindAvaloniaTemplateScreenshot from '/img/get-started/test-drive/vs-find-avalonia-template-screenshot.png';
import VsNewAvaloniaProjectScreenshot from '/img/get-started/test-drive/vs-new-avalonia-project-screenshot.png';
import RiderRunScreenshot from '/img/get-started/test-drive/rider-run.png';
import InitialWindowScreenshot from '/img/get-started/test-drive/initial-window.png';

## Install Templates

Before starting, ensure that you have [installed the Avalonia templates](../install.md):

```bash
dotnet new install Avalonia.Templates
```

## Create the Project

To get started, we're going to use the MVVM Avalonia template: `Avalonia MVVM Application` (or `avalonia.mvvm` in the CLI).

<Tabs>
  <TabItem value="cli" label="Command Line" default>
Run the command:

```bash
dotnet new avalonia.mvvm -o GetStartedApp
```

This will create a new folder called `GetStartedApp` containing the new project.
  </TabItem>
  <TabItem value="rider" label="Rider">

- On the Rider startup screen, select **New Solution**

<img className="center" src={RiderSplashScreenshot} width="600"/>

- In the sidebar, scroll down and select **Avalonia App**
- Type `GetStartedApp` in the **Solution Name** field
- Click **Create**

The template will create a new solution and project.

<img className="center" src={RiderSolutionScreenshot} width="600"/>

  </TabItem>
  <TabItem value="vs" label="Visual Studio">

- In **Visual Studio**, click **Create a new project**.
- Type `Avalonia` in the search box.
- Click **Avalonia Application** then click **Next**.

<img className="center" src={VsFindAvaloniaTemplateScreenshot} />

- Name the project `GetStartedApp`, and click **Create**.

- The next screen allows selecting the platforms you wish to target: click **Desktop** then click **Next**.

- The next screen allows selecting a design pattern: click **ReactiveUI** then click **Create**.

The template will create a new solution and two new projects. `GetStartedApp` is the main project that is shared between each platform. `GetStartedApp.Desktop` is the platform-specific project for the desktop platform.

<img className="center" src={VsNewAvaloniaProjectScreenshot} />

  </TabItem>
</Tabs>

## Run the Project

We're now ready to run the project!

<Tabs>
  <TabItem value="cli" label="Command Line" default>
Go into the `GetStartedApp` directory and run:

```bash
dotnet run
```
  </TabItem>
  <TabItem value="rider" label="Rider">

Press the **Run** button in the Rider toolbar:

<img className="center" src={RiderRunScreenshot} />

  </TabItem>
  <TabItem value="vs" label="Visual Studio">

  Right-click on the `GetStartedApp.Desktop` project and select **Set as Startup Project**.

  Hit `F5` to run the project.

  </TabItem>
</Tabs>

The solution will build and run.

You should now be running your first Avalonia application!

<img className="center" src={InitialWindowScreenshot} />
