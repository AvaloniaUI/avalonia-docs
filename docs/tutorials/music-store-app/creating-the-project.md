---
id: creating-the-project
title: Create the Project
---

### Creating a New Project <a id="creating-a-new-project"></a>

From the Rider Welcome Screen, click on `New Solution`. This will open a dialog with Project Types on the left and some input fields on the right.

At the bottom on the left hand side under the heading `Other` you will see `Avalonia .NET Core MVVM App` select it and then type `Avalonia.MusicStore` as the `Solution Name`. Everything else can be left as default.

Click the `Create` button.

  <div style={{textAlign: 'center'}}>
    <img src="/img/tutorials/music-store-app/creating-the-project/CreateSolution.png" />
  </div>

A new project will be created with the following structure.

  <div style={{textAlign: 'center'}}>
    <img src="/img/tutorials/music-store-app/creating-the-project/project-structure.png" />
  </div>

The folders are:

| Folder Name | Description |
| :--- | :--- |
| Assets | Contains any embedded assets that are compiled into the program. `Images`, `Icons`, `Fonts` etc, anything that the UI might need to display, |
| Models | This is an empty folder intended for code that is domain specific, non-ui code. Interaction with a database or web api, code to talk to a hardware device. Things like that. |
| ViewModels | This is a folder for all the `ViewModels` of the project. Viewmodels should only contain UI logic. Button is enabled when the user has typed something. Open a dialog when the user clicks here, show an error if the user enters too high a number type of logic. |
| Views | This is a folder for all the `Views` of the project. Views are like HTML for native application, they describe the look and layout of your UI, but not the UI logic. |

Some of the important files are:

| File Name | Description |
| :--- | :--- |
| ViewModelBase.cs | This is a base class that all ViewModels should inherit. It implements the way the ViewModels signal changes to the Views to update the UI. \(google `INotifyPropertyChanged` for more on that.\) |
| MainWindowViewModel.cs | This is the ViewModel for your `MainWindow` |
| MainWindow.axaml | This is the `xaml` UI code that describes how the `MainWindow` looks and its contents. |
| App.axaml | This is a `xaml` file that sets up the application, it chooses the theme the UI will use and declares the `ViewLocator` `DataTemplate`. |
| Program.cs | `Main` method where the program starts and `Avalonia` is configured and started. |
| ViewLocator.cs | `ViewLocator` is a special `DataTemplate`. When some `Data` appears in the UI, it quickly looks to see if a `View` exists for it. This is done by naming convention. If the datas `Type` is `MyDataViewModel` then the `ViewLocator` will use the `View` named `MyDataView` \(if it exists\) in that part of the UI. This is very powerful for list based controls \(`ItemsControl`, `ListBox`, etc\) and `ContentControl`. |

### Compiling and Running the Project <a id="compiling-and-running-the-project"></a>

Press the debug button top right of the IDE to compile and run the project.

  <div style={{textAlign: 'center'}}>
    <img src="/img/tutorials/music-store-app/creating-the-project/debug-button.png" />
  </div>

This will show a Window that looks like:

  <div style={{textAlign: 'center'}}>
    <img src="/img/tutorials/music-store-app/creating-the-project/image-20210310192926578.png" />
  </div>

A little plain but we now have a running application, and a blank canvas to start from.
