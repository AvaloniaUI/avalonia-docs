---
description: TUTORIALS - Music Store App
---

# Итоги

В данном руководстве вы узнали, как с помощью _Avalonia UI_ создавать графонистое настольное приложение.

## Архитектурное решение приложения

В данном руководстве используется архитектурное решение на основе паттерна MVVM,
в котором используется фреймворк _ReactiveUI_, который управляет несколькими окнами прямо из кода.

Application state is kept in the 'top level' view model, and can be persisted to disk. 
The main window and search dialog are composed from in _Avalonia UI_ window controls, 
built-in controls and user controls.

Состояние приложения хранится во `view model` 'top level' и может быть сохранено на диске.
Основное окно, а также диалоговое окно поиска, состоит из обычных, встроенных и пользовательских `controls`.

Данное руководство нацелено на настольные платформы, такие как _Apple Mac OS_ или _Windows_.

:::info
Подробнее о разработке под платформу iOS (Apple), см. [здесь](../../guides/platforms/ios).
:::

:::info
Подробнее о разработке под мобильную платформу Android, см. [здесь](../../guides/platforms/android).
:::

## Дополнительные материалы

Полный список руководств по _Avalonia UI_, см. [здесь](..).
