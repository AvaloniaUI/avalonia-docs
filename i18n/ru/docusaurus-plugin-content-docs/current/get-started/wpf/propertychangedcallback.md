# PropertyChangedCallback

Подписка изменений на DependencyProperties в WPF, довольно непростая.
Когда вы регистрируете `DependencyProperty`, вы можете указать статический `PropertyChangedCallback`,
но если вы хотите подписатьcя на измнения из других источников, [все становится сложнее и неизбежно приводит к ошибкам](https://stackoverflow.com/questions/23682232).

В Avalonia нет регистрации `PropertyChangedCallback`, вместо этого,
класс [добавляет подписку через статический конструктор для Control, аналогично классу событий](../../guides/data-binding/binding-from-code#subscribing-to-a-property-on-any-object).

