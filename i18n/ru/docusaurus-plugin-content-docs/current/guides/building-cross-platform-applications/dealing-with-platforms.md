---
id: dealing-with-platforms
title: Работа с несколькими платформами
---

## Managing Platform Differences & Capabilities

Platform differences aren't just an issue in cross-platform development; 
even devices within the same platform can possess diverse capabilities.

Most notably, this includes differences in screen size, but numerous other device characteristics may also vary, 
requiring the application to verify certain capabilities and adapt its behavior based on their presence (or absence).
This is espically important when designing for cross paradigm situations,
with desktop and mobile operating systems providing very different interaction models.  

Therefore, all applications must be equipped to handle a graceful scaling back of functionality,
or risk presenting a minimal feature set that does not leverage the full potential of the underlying platform. 

### Примеры различия платформ

Существует ряд фундаментальных характеристик, которые являются универсальными,
от чего могут использоваться в вашем приложении на любой платформе.
Таким образом, общими частями можно считать:

* Экран для отображения пользовательского интерфейса.
* Некоторые виды устройств ввода. К примеру, сенсоры для смартфонов, а мышь и клавиатура для компьютеров. 
* Отображение данных во `views`.
* Изменение данных.
* Возможность навигации.

### Платформозависимые особенности

Помимо универсальных характеристик, вам также надо учитывать ключевые различия между платформами.
Вам потребуется проанализировать такие ситуации и написать код специально для их обработки:

* **Размеры экрана**: В то время как некоторые платформы (к примеру iOS) имеют стандартизированные размеры экраны,
что позволяет относительно легко сверстать пользовательский интерфейс,
дугие платформы (к примеру Desktop или WebAssembly) имеют самые разнообразные размеры экрана,
что затрудняет верстку пользовательского интерфейса.

* **Навигационные метафоры**: Они могут сильно отличаться как между разными платформами (к примеру, аппаратная кнопка 'back(рус: назад)'), 
так и в рамках одной платформы (к примеру, различия между Android 2 и 4, iPhone и iPad).

* **Клавиатура**: Некоторые устройства имеют отдельную физическую клавиатура, в то время как другие используют виртуальную.
Такие нюансы вы должны отслеживать в коде, поскольку виртуальная клавиатура, при появлении, закрывает часть экрана.

Указанные ранее различия, стоит учитывать при разработке вашего приложения для различных платформ на Avalonia.
Пусть вы и должны стремиться к максимальному переиспользованию вашего кода,
вам также следует избегать и полного использования одно и того же кода для всех платформ.
Вместо этого, для каждой платформы настройте UI так, чтобы им было удобно пользоваться.

### Dealing with Platform Divergence

Поддержки нескольких платформ из общей кодовой базы, можно добиться через абстрагирования особенностей платформ.

* **Platform Abstraction**: This approach leverages the Business Façade pattern to provide uniform access across platforms.
It abstracts the unique platform implementations into a single, cohesive API.
The primary advantage is the ability to write platform-agnostic code, enhancing code reusability and maintainability. 
However, this approach may not fully exploit the unique features and capabilities of each platform.

<!--
:::tip
[Avalonia.Essentials](https://github.com/AvaloniaUI/Avalonia.Essentials) 
предоставляет готовые абстракции для распостраненных функций смартфонов, включая: 

* Акселерометр
* Барометр
* Батарея
* Камера
* Connectivity
* Фонарик
* Геолокация
* Гироскоп
* Ориентация
:::
-->

## Platform Abstraction

In Avalonia, you can employ class abstractions to streamline your development process across different platforms. 
This can be achieved using interfaces or base classes defined in the shared code, 
then implemented or extended in platform-specific projects.

### Interfaces

The utilization of interfaces empowers you to create platform-specific classes that can be incorporated
into your shared libraries for code reuse.

#### Как это работает
The interface is defined within the shared code and passed into the shared library as a parameter or property.
The platform-specific applications can then implement the interface, allowing shared code to process it effectively.

#### Преимущества
The main advantage of this approach is that the implementation can contain platform-specific code
and even reference platform-specific external libraries, offering high flexibility.

####  Недостатки
A potential disadvantage is the need to create and pass implementations into the shared code. 
If the interface is employed deep within the shared code, 
it may have to be passed through multiple method parameters, which might lead to a more complex call chain. 
If the shared code uses numerous different interfaces, they all must be created and set within the shared code.

### Наследование
Your shared code can implement abstract or virtual classes that could be extended in one or more platform-specific projects. 
This technique resembles the use of interfaces but provides some already implemented behaviors.

#### Как это работает
By using inheritance, you can create base classes in your shared code that can be optionally extended in your platform-specific projects. 
However, as C# allows only single inheritance, this approach may influence your future API design. 
Hence, use inheritance with caution.

#### Преимущества и недостатки
The advantages and disadvantages of using interfaces apply equally to inheritance. 
However, an additional advantage of inheritance is that the base class can contain some implementation code.
This potentially could provide an entire platform-agnostic implementation that can be optionally extended as needed.

