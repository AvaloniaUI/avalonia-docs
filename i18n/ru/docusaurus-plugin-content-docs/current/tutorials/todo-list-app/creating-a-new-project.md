---
description: TUTORIALS - To Do List App
---

import ToDoCreateNewProjectScreenshot from '/img/gitbook-import/assets/image (43).png';
import ToDoNewSolutionScreenshot from '/img/gitbook-import/assets/image (3) (1) (1).png';

# Создание нового проекта

На этой странице вы узнаете, как можно создать проект для приложения *"To Do List"*.
Есть 2 варианта:

1. **Visual Studio Extension Template**: 
Если вы предпочитаете использовать Visual Studio, то следуйте инструкции, представленной ниже.

2. **.NET Core CLI Command**: Если вы предпочитаете использовать командную строку,
то вы можете использовать команды .NET Core CLI, как показано ниже.

## Visual Studio

Перед началом работы, убедитесь, что у вас установлено расширение _Avalonia UI_ для Visual Studio.

:::info
Подробную информацию об установке расширения _Avalonia UI_, см. [здесь](../../get-started/install-the-avalonia-extension.md).
:::

<p><img className="center" src={ToDoCreateNewProjectScreenshot} alt="" /></p>

После завершения установки расширения, следуйте инструкции ниже:

- Запустите _Microsoft Visual Studio_
- Нажмите **Create a new project**
- В поле **Search for Templates**, введите 'Avalonia'
- Нажмите  **Avalonia MVVM Application**
- Нажмите **Next**
- В поле **Project name**, укахиже 'ToDoList' как имя проекта и нажмите **Create**

Созданное решение будет иметь следующий вид:

<img className="center" src={ToDoNewSolutionScreenshot} alt="" />

## .NET Core CLI

Перед началом работы, убедитесь, что у вас установлено шаблоны _Avalonia UI_ для .NET Core.

:::info
Подробную информацию об установке шаблонов _Avalonia UI_, см. [здесь](../../get-started/getting-started.md).
:::

После установки шаблонов, вы можете создать приложение на их основе:

```bash
dotnet new avalonia.mvvm -o ToDoList -n ToDoList
```

Созданный проект будет иметь следующий вид:

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

## Структура проекта с паттерном MVVM

Данный раздел является общим для Visual Studio и CLI.

Как вы могли заметить, каждая концепция паттерна MVVM (models, views, и view models) имеет собственные папки, а также некоторые дополнительные файлы и папки.

* Папка `/Assets` содержит бинарные ассеты для вашего приложения. Размешенные в ней файлы, будут автоматически включены в приложение в виде ресурсов.
* Папка `/Models` пока пуста, в дальнейшем, следуя руководству, вы добавите сюда файл.
* Папка `/ViewModels` содержит базовый класс для `view models` и view model по-умочанию для основного окна приложения.
* Папка `/Views` содержит AXAML-файл основного окна. Позже, вы добавите в нее дополнительные файлы.
* Файл `App.axaml` используется для XAML стилей и шаблонов данных, которые применяются на все приложение. 
В данном руководстве вы не будете менять данный файл.
* Файл `Program.cs` является точкой входа при запуске приложения.
В нем вы можете настроить дополнительные параметры платформы для _Avalonia UI_.
В данном руководстве вы не будете менять данный файл.
* Файл `ViewLocator.cs` определяет вспомогательный класс, который используется в файле `App.axaml`.
Его значение будет объяснено позже, в рамках руководства.

## Файлы AXAML

Для собственных XAML-файлов, _Avalonia UI_ использует расширение `.axaml`.
Они создаются с помощью Visual Studio и более поздних версий шаблонов .NET Core CLI.
Если вы ранее использовали более старые шаблоны .NET Core CLI, то расширение файлом может быть `.xaml`.

:::info
Подробнее об Avalonia UI XAML, см. [здесь](../../basics/user-interface/introduction-to-xaml.md).
:::
