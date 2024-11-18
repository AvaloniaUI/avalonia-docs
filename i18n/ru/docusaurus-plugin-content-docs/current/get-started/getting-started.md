s---
id: getting-started
title: Starting with the CLI
---

If you build your projects with the .NET CLI, then follow the procedures here to install the _Avalonia UI_ templates and create your first application.

## Установка шаблонов Avalonia UI

To install the _Avalonia UI_ templates, run the following command:

```bash
dotnet new install Avalonia.Templates
```

:::info
Для .NET 6.0 или более ранней версии, замените `install` на `--install`
:::

## Создание нового Приложения

Once the templates are installed, you can create a new _Avalonia UI_ application by running the following command:

```bash
dotnet new avalonia.app -o MyApp
```

Данная команда создаст папку с именем `MyApp`, включающую файлы вашего приложения. Для запуска приложения, перейдите в папку `MyApp` и выполните команду:

```bash
dotnet run
```

Поздравляем, ваше приложение запущено!
