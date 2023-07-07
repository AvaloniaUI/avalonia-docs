---
id: create-a-project
title: Create and Run a Project
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/test-drive/rider-splashscreen.png" width="600"/>
</div>

- In the sidebar, scroll down and select **Avalonia App**
- Type `GetStartedApp` in the **Solution Name** field
- Click **Create**

The template will create a new solution and project.

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/test-drive/rider-solution.png"/>
</div>

  </TabItem>
  <TabItem value="vs" label="Visual Studio">

- In **Visual Studio**, click **Create a new project**.
- Type `Avalonia` in the search box.
- Click **Avalonia Application** then click **Next**.

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/choose-a-solution-template/image (31) (1) (1).png" />
</div>

- Name the project `GetStartedApp`, and click **Create**.

The template will create a new solution and project.

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/choose-a-solution-template/image (27) (1).png" />
</div>
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

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/test-drive/rider-run.png"/>
</div>
  </TabItem>
  <TabItem value="vs" label="Visual Studio">

- In **Visual Studio**, click **Create a new project**.
- Type `Avalonia` in the search box.
- Click **Avalonia Application** then click **Next**.

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/choose-a-solution-template/image (31) (1) (1).png" />
</div>

- Name the project `GetStartedApp`, and click **Create**.

The template will create a new solution and project.

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/choose-a-solution-template/image (27) (1).png" />
</div>
  </TabItem>
</Tabs>

You should now be running your first Avalonia application!

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/test-drive/initial-window.png" />
</div>
