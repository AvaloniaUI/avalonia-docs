---
id: file-dialogs
title: Диалоговые окна файлов
---

Функциональность диалоговых окон файлов доступна через API сервиса [`StorageProvider`](../../concepts/services/storage-provider), который доступен из классов `Window` или `TopLevel`. Эта страница показывает только базовое использование, а для получения дополнительной информации об этом API, пожалуйста, посетите страницу StorageProvider.

<GitHubSampleLink title="File Dialogs" link="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/FileOps"/>

## OpenFilePickerAsync

Этот метод открывает диалоговое окно выбора файла, позволяющее пользователю выбрать файл. `FilePickerOpenOptions` определяет параметры, передаваемые в диалоговое окно операционной системы.

```cs
public class MyView : UserControl
{
    private async void OpenFileButton_Clicked(object sender, RoutedEventArgs args)
    {
        // Получаем верхний уровень из текущего элемента управления. Альтернативно можно использовать ссылку на Window.
        var topLevel = TopLevel.GetTopLevel(this);

        // Запускаем асинхронную операцию для открытия диалогового окна.
        var files = await topLevel.StorageProvider.OpenFilePickerAsync(new FilePickerOpenOptions
        {
            Title = "Открыть текстовый файл",
            AllowMultiple = false
        });

        if (files.Count >= 1)
        {
            // Открываем поток чтения из первого файла.
            await using var stream = await files[0].OpenReadAsync();
            using var streamReader = new StreamReader(stream);
            // Читаем всё содержимое файла как текст.
            var fileContent = await streamReader.ReadToEndAsync();
        }
    }
}
```

---

## SaveFilePickerAsync

Этот метод открывает диалоговое окно сохранения файла, позволяющее пользователю сохранить файл. `FilePickerSaveOptions` определяет параметры, передаваемые в диалоговое окно операционной системы.

### Пример

```cs
public class MyView : UserControl
{
    private async void SaveFileButton_Clicked(object sender, RoutedEventArgs args)
    {
        // Получаем верхний уровень из текущего элемента управления. Альтернативно можно использовать ссылку на Window.
        var topLevel = TopLevel.GetTopLevel(this);

        // Запускаем асинхронную операцию для открытия диалогового окна.
        var file = await topLevel.StorageProvider.SaveFilePickerAsync(new FilePickerSaveOptions
        {
            Title = "Сохранить текстовый файл"
        });

        if (file is not null)
        {
            // Открываем поток записи в файл.
            await using var stream = await file.OpenWriteAsync();
            using var streamWriter = new StreamWriter(stream);
            // Записываем некоторое содержимое в файл.
            await streamWriter.WriteLineAsync("Hello World!");
        }
    }
}
```

Для получения дополнительной информации о сервисе StorageProvider, включая информацию о том, как сохранить доступ к выбранным файлам и какие возможные параметры поддерживаются, пожалуйста, посетите страницу документации [`StorageProvider`](../../concepts/services/storage-provider) и подстраницы.

:::note
Приведенные примеры напрямую обращаются к API [`StorageProvider`](../../concepts/services/storage-provider) внутри ViewModel в учебных целях. В реальном приложении рекомендуется придерживаться принципов MVVM, создавая сервисные классы и размещая их с помощью Dependency Injection / Inversion of Control (DI/IoC). Обратитесь к проектам [IoCFileOps](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/IoCFileOps) и DepInject для примеров того, как этого достичь.
:::





















