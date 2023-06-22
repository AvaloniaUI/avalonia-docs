# Music Store App

:::info
The completed project can be found at [https://github.com/AvaloniaUI/Avalonia.MusicStore](https://github.com/AvaloniaUI/Avalonia.MusicStore).

It was created by [Dan Walmsley ](https://twitter.com/dwuk86)for a [webinar ](https://www.youtube.com/watch?v=kZCIporjJ70)hosted by [JetBrains](https://www.jetbrains.com/).
:::

In this tutorial, you will see just how easy it is to build great looking visual desktop applications using Avalonia.

This guide has instructions for Rider on macOS, however the steps will be almost the same on other operating systems, and reasonably similar on other IDEs such as Visual Studio.

Our livestream assumes some knowledge of [XAML](../../guides/basics/introduction-to-xaml.md), [MVVM ](../../guides/basics/mvvm.md)development, however this guide should fill in the gaps for beginners.

  <div style={{textAlign: 'center'}}>
    <img src="/img/tutorials/music-store-app/image-20210310184538120.png" />
  </div>


## A little background to Avalonia

Avalonia is a "[Template](../../docs/templates/)" based UI framework. This means that controls have `Templates` that describe how they look on the screen.

This is a different approach to other UI frameworks where native controls are used, for example a `Button` will take on the standard look of a button on its respective operating system.

Some apps require or desire a native look and feel. Others require a "pixel perfect" style and design. This pixel perfect approach is becoming more popular and common place. Good examples of this kind of application are "Slack" where the company's branding is clear throughout the UI. It also looks the exact same no matter which OS you run it on.

Avalonia is suited to these "Pixel Perfect" style apps, providing the advantage of native code and speed.

If you are already familiar with MVVM you may wish to skip this next section, if you're new to Avalonia read on.

### Model View ViewModel

The best architecture to use Avalonia with \(not compulsory, just works best\) is MVVM \(**M**odel **V**iew **V**iew**M**odel\).

It sounds complicated, and there are many over complicated guides and tutorials on the internet.

MVVM is simply a way to enforce [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns). For your quick demo tutorial app, this may seem overkill. Keeping UI and business logic separated in such a way. However the apps that you will soon be building, often start small but quickly grow. Your customers will spring new requirements on you, and you will need to shoe horn them into your software.

Following the MVVM approach will alleviate these difficulties and help keep your UI code scalable.

  <div style={{textAlign: 'center'}}>
    <img src="/img/tutorials/music-store-app/mvvm.png" />
  </div>

**How does MVVM work?**

Back to separation of concerns, in any GUI application there are at least 3 main concerns:

* UI - Layout, Style, Content
* UI Logic - How the controls interact with each other and the user.
* Business Logic - The actual functionality your application provides, dealing with a database, controlling some hardware you built for IOT, ordering products from your store.

**Why is it a good idea to keep these separated?**

If your code combines or mixes these 3 aspects together, it will tie the design of your UI directly to your business logic. This will make it incredibly difficult to make large changes to the way your application works. This was common place in the not too distant past.

**How does MVVM achieve this?**

**Model \(Business Logic\)**

All your business logic can be contained in plain classes, they can be designed and implemented however you want. Most project you already may have this. The general term we call these business logic classes is `Models`.

Your models can simply expose `methods` \(functions\), `properties` and use `events` to notify other parts of the MVVM architecture when something has changed in the system.

For example if your domain, is a music store. Perhaps your business logic provides a list of the top 10 albums. It may happen that the list changes and this change can be propagated by use of an `event`.

So now we have the `Model` part of MVVM, all self contained, the `models` know nothing about any of the other parts.

**ViewModel \(UI Logic\)**

Your user interface is essentially the way your `users` interact with your business logic or `models`. There needs to be a way for your UI to interact with the business logic. We do this using a `ViewModel`. A `ViewModel` knows about the `Model` that it represents. It does not know anything about the layout or design of the UI or `View` part.

A `ViewModel` is essentially special type of `Model` that represents all the `data` that will be displayed in the UI. It also represents all the `actions` that can be done with the UI. For example what happens when a button is clicked.

This keeps things like disabling buttons when the user hasn't input the correct information away from your business logic.

A `ViewModel` will `subscribe` to or `observe` events on a model so that it knows when something in your system has changed, with the intention that it can then update the UI so the `user` will know about it.

A `ViewModel` will also call or trigger functionality in response to user input like a `Button` being `clicked`.

**View \(UI\)**

The view provides the layout and content of the UI. It knows about the `ViewModel` and the information it provides that can be displayed in the UI.

The view describes how to "present" data and provides controls the user can interact with.

A `View` can retrieve `data` to display with the use of `Bindings` . `Bindings` can also be used for `interactions` to be communicated back to the `ViewModel` .

**Summary**

A model provides the business logic and talks to the ViewModel.

A ViewModel provides the UI logic and invokes the business logic in response to user input.

A View provides the look, layout and content of the UI.

Lets get started building something!

## In This Section

```mdx-code-block
import {DocsCardList} from '../../../../src/components/DocsCard';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocsCardList list={useCurrentSidebarCategory().items} />
```
