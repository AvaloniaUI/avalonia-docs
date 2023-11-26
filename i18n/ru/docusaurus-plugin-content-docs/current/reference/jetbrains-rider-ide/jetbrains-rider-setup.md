---
описание: СПРАВКА
---

import RiderWelcomeScreenshot from '/img/gitbook-import/assets/jetbrains-rider-setup-1-rider-welcome.png';
import RiderConfigurePluginReposScreenshot from '/img/gitbook-import/assets/jetbrains-rider-setup-2-configure-plugin-repos.png'
import RiderEnterPluginRepoScreenshot from '/img/gitbook-import/assets/jetbrains-rider-setup-3-enter-plugin-repo.png';
import RiderInstallAvaloniaPluginScreenshot from '/img/gitbook-import/assets/jetbrains-rider-setup-4-plugin-install.png';

# Настройка JetBrains Rider

Для добавления _Avaloni UI_ в 
To set up _JetBrains Rider_ for developing with _Avalonia UI,_ follow this procedure:&#x20;

- Загрузите и установите .NET SDK с сайта _Microsoft_. 
- Он включает в себя среду выполнения, инструменты разработки (компилятор и т.д.), необходимые для создания приложений на _Avalonia UI_.
- Установите шаблоны _Avalonia UI_, запустив команду `dotnet new install Avalonia.Templates` from the command prompt on your machine.

:::info
Актуальную версию .NET SDK можно скачать [здесь](https://dotnet.microsoft.com/download).
:::

:::info
Для версий SDK ниже .NET 7, необходимо выполнить команду `dotnet new -i Avalonia.Templates`
:::

Примерный результат команды:\

```bash
$ dotnet new install Avalonia.Templates
  Determining projects to restore...
  Restored /Users/danwalmsley/.templateengine/dotnetcli/v5.0.200/scratch/restore.csproj (in 706 ms).

Templates                                     Short Name            Language    Tags
.....

Avalonia Resource Dictionary                  avalonia.resource                 ui/xaml/avalonia/avaloniaui
Avalonia Styles                               avalonia.styles                   ui/xaml/avalonia/avaloniaui

Examples:
    dotnet new mvc --auth Individual
    dotnet new mstest
    dotnet new --help
    dotnet new avalonia.mvvm --help
$
```

:::info
Для загрузки _JetBrains Rider, см. [здесь](https://www.jetbrains.com/rider/).
:::

Rider предоставляет наибольшее удобство при работе с _Avalonia UI_.
Он доступен на Windows, Linux и macOS. Rider поддердивает XAML "из коробки". 
Чтобы использовать функцию предварительного просмотра XAML, необходимо установить плагин для Avalonia.

## Установка плагина для Avalonia

После запуска Rider, на экране появится надвись **Welcome to JetBrains Rider**.

- Нажмите **Configure**, а потом, в открывшемся меню, выберете **Plugins** 
- 
<img src={RiderWelcomeScreenshot} alt="" />

Откроется окно **Preferences**.
- Нажмите значок настроек (шестеренка) и выберете в выпадающем меню **Manage Plugin Repositories...**.

<img src={RiderConfigurePluginReposScreenshot} alt="" />

- В окне **Custom Plugin Repositories**, нажмите на значок (+) и введите URL-адрес `https://plugins.jetbrains.com/plugins/dev/14839`, нажмите **OK**.

<img src={RiderEnterPluginRepoScreenshot} alt="" />

- Вернитесь в окно **Preferences**, нажмите **Marketplace** и введите в поле поиска'Avalonia'. Найдите и выберете **AvaloniaRider**, после чего нажмите **Install**.

<img src={RiderInstallAvaloniaPluginScreenshot} alt="" />

- После завершения установки, нажмите **Restart IDE** (кнопка появится).

Теперь _JetBrains Rider_ настроен для разработки приложений на _Avalonia UI_.
