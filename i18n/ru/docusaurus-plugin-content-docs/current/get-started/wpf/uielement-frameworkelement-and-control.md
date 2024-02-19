# UIElement, FrameworkElement и Control

`UIElement` и `FrameworkElement` из WPF - это не шаблонные, базовые классы Control,
которые в Avalonia соответствуют классу `Control`.
`Control` из WPF - является шаблонным Control, которому в Avalonia соответствует `TemplatedControl`.

- В WPF/UWP, для создания нового шаблонного Control, вам нужна использовать `Control`, а в Avalonia `TemplatedControl.`
- В WPF/UWP, для создания пользовательского Control, вам нужна использовать `FrameworkElement`, а в Avalonia `Control.`

Подведем итоги:

| WPF                |    | Avalonia           |
|--------------------|----|--------------------|
| `UIElement`        | 🠞 |  `Control`         |
| `FrameworkElement` | 🠞 | `Control`          |
| `Control`          | 🠞 | `TemplatedControl` |