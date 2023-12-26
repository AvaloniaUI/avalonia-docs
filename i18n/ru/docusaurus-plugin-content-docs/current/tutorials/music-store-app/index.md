---
description: TUTORIALS
---

import MusicStoreFinishedAppScreenshot from '/img/tutorials/music-store-app/image-20210310184538120.png';

# Прилжение "Music Store" App"

In this tutorial you will create a desktop app based on the idea of a music store.
The app is highly graphical - it presents images of album covers, 
and uses semi-transparent 'acrylic' blurred window backgrounds to give a very up-to-date look. 
By the end of the tutorial, you will be able search the iTunes online list of albums, 
and select albums for your own list.

В этом руководстве вы создадите настольное приложение, основанное на идее музыкального магазина.
Приложение отличается высокой графичностью - в нем представлены изображения обложек альбомов
и используются полупрозрачные "акриловые" размытые фоны окон, чтобы придать ему очень современный вид.
К концу урока вы сможете выполнять поиск в онлайн-списке альбомов iTunes
и выбирать альбомы для своего собственного списка.

<p><img className="image-zoom-medium" src={MusicStoreFinishedAppScreenshot} alt="" /></p>

In this tutorial you will use the MVVM pattern with the _ReactiveUI_ framework to manage multiple application windows.
Also you will use advanced asynchronous techniques to implement the album search and other features,
so that application responsiveness is maintained.

В этом руководстве вы будете использовать шаблон MVVM с фреймворком _ReactiveUI_ 
для управления несколькими окнами приложений.
Также вы будете использовать передовые асинхронные методы для реализации поиска по альбомам и других функций,
чтобы поддерживать отзывчивость приложения.

:::warning
Данное руководство требует более глубоких знаний.
Если у вас небольшой опыт работы с паттерном MVVM,
то рекомендуем ознакомиться с руководством 'Приложение To Do List (рус: Список дел)' по [ссылке](../todo-list-app/).
:::

:::info
Подробнее о MVVM и его использовании в _Avalonia UI_, см. [здесь](../../concepts/the-mvvm-pattern/).
:::

Данное руководство содержит инструкции для IDE _Rider_ на macOS;
Тем не менее, все они похожи и для других операционных систем, 
например, вы можете использовать _Visual Studio_ на _Microsoft Windows_.

:::info
Готовый код приложения вы можете найти [здесь](https://github.com/AvaloniaUI/MusicStoreTutorial/). 
:::
