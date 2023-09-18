---
id: create-a-project
title: Create and Run a Project
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import RiderSplashScreenshot from '/img/get-started/test-drive/rider-splashscreen.png';
import RiderSolutionScreenshot from '/img/get-started/test-drive/rider-solution.png';
import VsFindAvaloniaTemplateScreenshot from '/img/get-started/choose-a-solution-template/image (31) (1) (1).png';
import VsNewAvaloniaProjectScreenshot from '/img/get-started/choose-a-solution-template/image (27) (1).png';
import RiderRunScreenshot from '/img/get-started/test-drive/rider-run.png';
import InitialWindowScreenshot from '/img/get-started/test-drive/initial-window.png';

## Install Templates

Before starting, ensure that you have [installed the Avalonia templates](../install.md):

```bash
dotnet new install Avalonia.Templates
```

## Create the Project

To get started, we're going to use the simplest Avalonia template: `Avalonia Application` (or `avalonia.app` in the CLI).

<Tabs>
  <TabItem value="cli" label="Command Line" default>
Run the command:

```bash
dotnet new avalonia.app -o GetStartedApp
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

The template will create a new solution and project.

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

- In **Visual Studio**, click **Create a new project**.
- Type `Avalonia` in the search box.
- Click **Avalonia Application** then click **Next**.

<img className="center" src={VsFindAvaloniaTemplateScreenshot} />

- Name the project `GetStartedApp`, and click **Create**.

The template will create a new solution and project.

<img className="center" src={VsNewAvaloniaProjectScreenshot} />

  </TabItem>
</Tabs>

You should now be running your first Avalonia application!

<img className="center" src={InitialWindowScreenshot} />
