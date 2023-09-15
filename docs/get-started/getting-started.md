s---
id: getting-started
title: Starting with the CLI
---

If you build your projects with the .NET CLI, then follow the procedures here to install the _Avalonia UI_ templates and create your first application.

## Install Avalonia UI Templates

To install the _Avalonia UI_ templates, run the following command:

```bash
dotnet new install Avalonia.Templates
```

:::info
Note: For .NET 6.0 and earlier, you must use `--install` instead.
:::

## Create a new Application

Once the templates are installed, you can create a new _Avalonia UI_ application by running the following command:

```bash
dotnet new avalonia.app -o MyApp
```

This will create a new folder called `MyApp` containing your application files. To run the application, navigate to the `MyApp` folder and run:

```bash
cd MyApp
dotnet run
```

That is all there is to it! Your _Avalonia UI_ application is now up and running. Next you can open the `MyApp` folder to start improving and building your application further.
