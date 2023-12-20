---
id: index
title: Создание кроссплатформенных приложений
---


Данное руководство познакомит вас с проектироваанием кроссплатформенных приложений на Avalonia,
для максимизации переиспользования кода и обеспечения согласованности UI
между всеми основными платформами: Windows, Linux, macOS, iOS, Android и WebAssembly.

В отличии от Xamarin.Forms и MAUI, которые позволяют создавать приложение с

Unlike the Xamarin.Forms and MAUI approach,
which tends to yield applications with a lowest-common-denominator feature-set
and a generic-looking user interface, 
Avalonia UI encourages leveraging its drawn UI capabilities.
It allows developers to write their data storage and business logic code once, 
while offering a responsive and high-performing UI across all platforms.
В данном документе указаны основные архитектурные подходы для достижения этих целей.
This document discusses a general architectural approach to achieve this goal.


Ниже, в краткой форме указаны ключевые моменты при создании кроссплатфоренных приложений на Avalonia:

1. **Используйте .NET** - Разрабатывайте ваше приложение на C#, F# или VB.NET.
Существующий код, написанный на .NET с использованием Avalonia, 
можно легко портировать на Windows, Linux, macOS, iOS, Android и WebAssembly
2. **Применяйте паттерн MVVM** -
Разрабатывайте пользовательский интерфейс приложение с паттерном `Model/View/ViewModel (MVVM)`.
Данный подход позволяет отделить "Model" и "View" друг от друга,
используя "ViewModel" в качестве посредника.
Благодаря этому, гарантируется независимость логики UI от выбранной платформы,
что спосбствует переиспользованию кода и улучшению его сопровождения.
3. **Используйте графические возможности Avalonia** -
Avalonia не зависит от нативных элементов UI. Подобно Flutter, она отрисовывает его с нуля.
Такой подход не только обеспечивает внешнее единообразие на всех платформах,
но и высокий уровень настроек, позволяя адаптировать UI под ваши потребности.
4. **Баланс между основным и платформозависимым кодом** - 
ключом к достижению максимальному переиспользованию кода, является баланс между
основным и платформозависимым кодом.
The key to achieving high code reuse is striking the right balance
between platform-agnostic core code and platform-specific code.
Основной код должен включать в себя все, что не взаимодействует напрямую с выбранной платформой.















