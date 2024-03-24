---
description: TUTORIALS - To Do List App
---

import ToDoCreateANewViewScreenshot from '/img/gitbook-import/assets/image (1) (1).png';

# Содание нового View

На этой страницу вы добавите `view` для отображения списка дел, а также кнопку для добавления новых.

В начале обучения, вы будете использовать захардкоженные данные списка.
Позже, вы научитесь связывать `view` и данные из `view model`, для решения этой проблемы.

В _Avalonia UI_, элемент UI соответствующий `view` для MVVM, является либо `window`, либо `user control`.
В качестве нового `view`, мы создадим `user control`, а позже добавим его отображение в основном окне.

### Visual Studio

Для добавление нового `user control`, выполните следующие действия:

- В **Solution Explorer** найдите и нажмите ПКМ на папке **Views** folder.
- Нажмите **Add**, а после **New Item**
- Нажмите **Avalonia** под **C# Items** и выберите **User Control (Avalonia)**
- В поле **Name** укажите 'ToDoListView'
- Нажмите **Add**

### .NET Core CLI

В корневой папке проекта, в ней содержатся файл `Program.cs` и папка `/Views`, выполните команду:

```
dotnet new avalonia.usercontrol -o Views -n ToDoListView  --namespace ToDoList.Views
```

### The User Control

В папке `/Views`, вы увидите новый AXAML-файл

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
             x:Class="ToDoList.Views.ToDoListView">
  Welcome to Avalonia!
</UserControl>
```

Также вы найдете файл `ToDoListView.axaml.cs`, содержащий код для одноименной `view` (в Visual Studio он вложен в AXAML-файл).
Код внутри файла:

```csharp
using Avalonia.Controls;

namespace ToDoList.Views
{
    public partial class ToDoListView : UserControl
    {
        public ToDoListView()
        {
            InitializeComponent();
        }
    }
}
```

В рамках руководства, мы не будем изменять этот файл, но обратите внимание,
что класс указанного `user control` называется `ToDoListView`, и расположен в пространстве имен `ToDoList.Views`.

### Изменение размера панели предварительного просмотра

Чтобы во время разработки, зона предварительного просмотра походила на экран смартфона,
в `user control` найдите атрибуты `DesignWidth` и `DesignHeight`, а после поменяйте их значения, как показано ниже:

<pre class="language-markup"><code class="lang-markup">
<strong>&#x3C;UserControl</strong>
<strong>...</strong>
<strong>d:DesignWidth="250" d:DesignHeight="450"</strong>
<strong>... ></strong>
</code></pre>

Повторите процесс для основного окна.

### Изменение User Control

Замените содержимое `Views/TodoListView.axaml` на следующее:

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
             x:Class="ToDoList.Views.ToDoListView">
  <DockPanel>
    <Button DockPanel.Dock="Bottom"
            HorizontalAlignment="Stretch"
            HorizontalContentAlignment="Center">
        Add Item
    </Button>
    <StackPanel>
      <CheckBox Margin="4">Walk the dog</CheckBox>
      <CheckBox Margin="4">Buy some milk</CheckBox>
    </StackPanel>
  </DockPanel>
</UserControl>
```

Если вы используете расширение Visual Studio, то должны увидеть изменения на панели предварительного просмотра,
сразу же после завершения сборки.

<img className="center" src={ToDoCreateANewViewScreenshot} alt="" />
