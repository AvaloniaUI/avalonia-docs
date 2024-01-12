---
description: TUTORIALS - Music Store App
---

import MusicStoreDialogContentDiagram from '/img/gitbook-import/assets/image (9) (3).png';

# Добавление содержимого диалогового окна

На это страницу вы узнаете, как добавить содержимое в диалоговое окно.
Речь идет о `controls` для поиска, а также кнопки закрытия дилогового окна.
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

Внутри диалогового окна, пользователь может вести поиск альбомов посредствам Web API.
Но данная процедура занимает время, в связи с чем мы добавили шкалу прогресса,
которая будет активна во время поиска. Даный аспект повышает отзывчивость интерфейса для пользователя.

Также, чтобы гарантировать отзывчивость приложения во время поиска, 
мы реализуем данную операцию как асинхронную, с возможностью отмены поиска.
В рамках руководства, мы реализуем этот функционал позже.

Нашим следующим шагом, будет добавление нового `user control` в зону содержимого диалогового окна.

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
