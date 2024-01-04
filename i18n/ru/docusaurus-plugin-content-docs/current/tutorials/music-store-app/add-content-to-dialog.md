---
description: TUTORIALS - Music Store App
---

import MusicStoreDialogContentDiagram from '/img/gitbook-import/assets/image (9) (3).png';

# Добавление содержимого диалогового окна

На это страницу вы узнаете, как добавить содержимое в диалоговое окно.
On the this page you will learn how to add some content to the dialog window. 
This will be some controls for the search and a dialog close button; together with 
a list of placeholders for the album covers - these will eventually be loaded as the results of the search.

To arrange the dialog controls, you will use the dock panel layout control, 
that is part of the _Avalonia UI_ built-in controls. This will keep the search controls at the top of the dialog, 
and the button at the bottom, whatever the height. The list will be the 'fill' area of the dock panel, 
so it will always take up all the remaining content zone.

<img className="center" src={MusicStoreDialogContentDiagram} alt="" />

:::info
Подробнее об элементе `dock panel`, см. [здесь](../../reference/controls/dockpanel.md).
:::

`Dock panel` будет расположена внутри `user control` из _Avalonia UI_.
Это сделано для того, чтобы отделить код отображения диалогового окна
от кода управляющего его `controls`.

:::info
Подробнее о `UI Composition (рус: Составлении ГШ)`, см. [здесь](../../concepts/ui-composition.md).
:::

Для добавления `user control` и составных `controls` диалогового окна, выполните следующие действия:

- Остановите приложение, если оно запущено.
- В обозревателе решений нажмите ПКМ по папке **/Views** и выберите **Add**.
- Нажмите **Avalonia User Control**.
- При появлении запроса на ввод, укажите 'MusicStoreView'.
- Нажмите `Enter`.
- Измените в XAML зону содержимого `user control`, как показано ниже:

```xml
<UserControl ... >
  <DockPanel>
    <StackPanel DockPanel.Dock="Top">
      <TextBox Watermark="Search for Albums...." />
      <ProgressBar IsIndeterminate="True"  />
    </StackPanel>
      <Button Content="Buy Album" 
              DockPanel.Dock="Bottom" 
              HorizontalAlignment="Center" />
      <ListBox/>
  </DockPanel>
</UserControl>
```

Inside the dialog the user will be able to search for albums, but this will use a Web API, 
and may take some time to return. It is for this reason that you have added a progress bar. 
The progress bar will be active during the search - to provide visual feedback to the user.

Also, to ensure that the app remains responsive during the search,
you will implement the operation itself as both asynchronous and cancellable. 
You will add this functionality later in the tutorial.

Now the next step is for you to add the new user control to the content zone of the dialog window.

Для добавления `user control`, выполните следующие действия:

- Найдите и откройте файл **MusicStoreWindow.axaml**.
- Add the namespace for the views to the `<Window>` element:

```xml
<Window ...
    xmlns:views="using:Avalonia.MusicStore.Views" >    
```

- Inside the panel element, add an element for new user control:

```xml
<Panel Margin="40">
   <views:MusicStoreView/>
</Panel>
```

Вы увидите, что `controls` появятся на панели предпросмотра.

На следующей страницу вы узнаете, как имитировать фунцию поиска альбомов,
чтобы создать `view` и `view model` для просмотра результатов,
а реализацию реального поиска оставить на потом.
