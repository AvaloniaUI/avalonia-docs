---
id: set-up-an-editor
title: Настройка Редактора
---

import AvaloniaVsExtensionMarketplaceScreenshot from '/img/get-started/avalonia-vs-extension-marketplace.png';
import AvaloniaVsExtensionNuGetScreenshot from '/img/get-started/avalonia-vs-extension-nuget.png';

# Настройка редактора

Вы можете создавать приложения на Avalonia в любом редакторе кода, но мы настоятельно рекомендуем использовать IDE с поддержкой Avalonia XAML, предварительным просмотром и другими полеными функциями.

## JetBrains Rider


Среда разработки [JetBrains Rider](https://www.jetbrains.com/rider/), имеет встроенную поддержку Avalonia XAML [с версии 2020.3](https://www.jetbrains.com/rider/whatsnew/2020-3/#version-2020-3-avalonia-support), а также имеет отличнуюю поддержку специфичных для Avalonia XAML функций и пользовательского кода.

Для подробностей, ознакомьтесь с информацией о версии [JetBrains Rider 2020.3](https://www.jetbrains.com/rider/whatsnew/2020-3/#version-2020-3-avalonia-support)

Rider не имеет встроенного предпросмотра, но он находится в разработке. Смотрите [GitHub проект](https://github.com/ForNeVeR/AvaloniaRider) для дополнительной информации и инструкции по установке.

## Visual Studio

Для поддержки Avalonia, необходимо установить расширение [Avalonia для Visual Studio](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaVS).

<img className="center" src={AvaloniaVsExtensionMarketplaceScreenshot} alt="" />

Расширение поддерживает IntelliSense для Avalonia XAML и предварительный просмотр.

Установка расширения:

- В Visual Studio выбирете в меню **Расширения** -> **Управление расширениями**
- В поле **Поиск** введите "Avalonia"
- Нажмите **Загрузить** и следуйте инструкциям (для завершения установки, потребуется закрыть IDE)

<img className="center" src={AvaloniaVsExtensionNuGetScreenshot} alt="" />

:::info
Также вы можете скачать расширение [здесь](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaVS).
:::

:::info
Если вы используете VS201 или VS2019, то вам нужно скачать [старую версию расширения](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaforVisualStudio).
:::
