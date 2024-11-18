---
description: GUIDES - WPF Conversion
---

# Data Templates (рус: Шаблоны Данных)
 
В Avalonia UI, шаблоны данных не хранятся внутри ресурсов приложения.
(Это верно и для стилей, см. [здесь](styling).)

Вместо этого, шаблоны данных помещаются в коллекцию `DataTemplates` у Control, или внутрь ... (и в `Application`):

К примеру, указанный ниже код, добавит шаблон данных для отображения данных класса `MyViewModel`:

```xml
<UserControl xmlns:viewmodels="using:MyApp.ViewModels"
             x:DataType="viewmodels:ControlViewModel">
    <UserControl.DataTemplates>
        <DataTemplate DataType="viewmodels:FooViewModel">
            <Border Background="Red" CornerRadius="8">
                <TextBox Text="{Binding Name}"/>
            </Border>
        </DataTemplate>
    </UserControl.DataTemplates>
    <!-- Assuming that ControlViewModel.Foo is an object of type
         MyApp.ViewModels.FooViewModel then a red border with a corner
         radius of 8 containing a TextBox will be displayed here.
         DataType is required only if you use Compiled Bindings, so it can be type-checked.  -->
    <ContentControl Content="{Binding Foo}"/>
<UserControl>
```

В Avalonia, шаблоны данных могут привязываться к интерфейсам и производным классам, чего нельзя сделать в WPF.
По этой причине, в `DataTemplate` важен порядок при использовании вложенных данных (также, как вы сделали бы это в коде).

## Data Template Selector (рус: Селектор Шаблона Данных)

В WPF, вы можете использовать `DataTemplateSelector` для выбора или создания `DataTemplate` на основе проброшенных данных.
В Avalonia так сделать нельзя, но вы можете реализовать `IDataTemplate`, который можно рассматривать как хороший аналог `DataTemplateSelector`. Пример см. [здесь](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/IDataTemplateSample).
