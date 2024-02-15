---
id: the-design-preview
title: The Design Preview (Предварительный просмотр)
---

import TemperatureDesignPreviewScreenshot from '/img/get-started/test-drive/temperature-design-preview.png';

На этой странице вы познакомитесь с аттрибутами окна, 
а затем используете некоторые из них для настройки его отображения на панели предварительного просмотра.


Проверьте в XAML наличие тега `<Window>`. Оно будет выглядеть следующим образом:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="400" d:DesignHeight="550"
        x:Class="GetStartedApp.MainWindow"
        Title="GetStartedApp">
```

Тег `<Window>` начинается с определения некоторых пространств имен XML, которые использует Avalonia.
Также используются алиасы 'x', 'd' и 'mc'.

Пространство имен 'd', позволяется указывать атрибуты для предварительного просмотра, такие как `d:DesignWidth` и `d:DesignHeight`. В примере выше, они указаны так, чтобы размеры походили на экран смартфона. (книжная ориентация)

После установки новых значений, предварительный просмотр должен выглядеть так:

<img className="center" src={TemperatureDesignPreviewScreenshot} alt="" />

На следующей странице вы узнаете, как добавить обработку пользовательских событий. (нажатие, касание и т.д.)
