---
id: create-a-project
title: Создание и Запуск Проекта
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import RiderSplashScreenshot from '/img/get-started/test-drive/rider-splashscreen.png';
import RiderSolutionScreenshot from '/img/get-started/test-drive/rider-solution.png';
import VsFindAvaloniaTemplateScreenshot from '/img/get-started/test-drive/vs-find-avalonia-template-screenshot.png';
import VsNewAvaloniaProjectScreenshot from '/img/get-started/test-drive/vs-new-avalonia-project-screenshot.png';
import RiderRunScreenshot from '/img/get-started/test-drive/rider-run.png';
import InitialWindowScreenshot from '/img/get-started/test-drive/initial-window.png';

## Установка шаблонов

Перед началом работы, убедитесь, что у вас [установлены шаблоны Avalonia](../install.md):

```bash
dotnet new install Avalonia.Templates
```

## Создание проекта

В начале, мы выберем самый простой шаблон Avalonia: `Avalonia Application` (или `avalonia.app` в CLI).

<Tabs>
  <TabItem value="cli" label="Command Line" default>
Выполните команду:

```bash
dotnet new avalonia.app -o GetStartedApp
```

Команда создаст новый проект в папке `GetStartedApp` (если папки с таким именем нет, то она будет создана).
  </TabItem>
  <TabItem value="rider" label="Rider">

- В окне запуска Rider, выберите **New Solution**

<img className="center" src={RiderSplashScreenshot} width="600"/>

- В боковой панели скрольте вниз и выберите **Avalonia App**
- В поле **Solution Name**  введите `GetStartedApp`
- Нажмите **Create**

Шаблон создаст новое решение и проект.

<img className="center" src={RiderSolutionScreenshot} width="600"/>

  </TabItem>
  <TabItem value="vs" label="Visual Studio">

- В **Visual Studio** нажмите **Create a new project**.
- В поле поиска введите `Avalonia`.
- Выберите **Avalonia Application** и нажмите **Next**.

<img className="center" src={VsFindAvaloniaTemplateScreenshot} />

- Укажите название проекта `GetStartedApp`, затем нажмите **Create**.

- На следующем экране вы можете выберать целевые платформы: нажмите **Desktop**, а затем **Next**.

- На следубщем экране вы можете выбрать шаблон проектирования: нажмите **ReactiveUI**, а затем **Create**.

Шаблон создаст решение и два новых проекта.
`GetStartedApp` - основной проект, совместно используемый каждой платформой.
`GetStartedApp.Desktop` - платформо-зависимый проект, в данном случае для `Desktop`

<img className="center" src={VsNewAvaloniaProjectScreenshot} />

  </TabItem>
</Tabs>

## Запуск проекта

Теперь вы можете запустить проект!

<Tabs>
  <TabItem value="cli" label="Command Line" default>
Выберите и запустите проект `GetStartedApp`:

```bash
dotnet run
```
  </TabItem>
  <TabItem value="rider" label="Rider">

В Rider нажмите **Run** на панели инструментов:

<img className="center" src={RiderRunScreenshot} />

  </TabItem>
  <TabItem value="vs" label="Visual Studio">

Нажмите правой кнопкой мыши по проекту `GetStartedApp.Desktop`, выберите **Set as Startup Project**.

  Для запуска проекта нажмите `F5`.

  </TabItem>
</Tabs>

Решение будет собрано и запущено.

Теперь вы можете запустить ваше первое приложение на Avalonia!

<img className="center" src={InitialWindowScreenshot} />
