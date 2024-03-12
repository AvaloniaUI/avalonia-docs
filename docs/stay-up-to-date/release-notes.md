---
id: release-notes
title: Release Notes
---

You can find release notes for all version on https://github.com/AvaloniaUI/Avalonia/releases
## 11.0.7

https://www.nuget.org/packages/Avalonia/11.0.7

**Full Changelog**: 11.0.6...11.0.7

### What's Changed
* Fixed issue: Default font family name cannot be null or empty by @mihnea-radulescu in https://github.com/AvaloniaUI/Avalonia/pull/12817
* Fixed missing resources for TimePicker & DatePicker in simple theme by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/12851
* Fixed memory leak in Animatable transitions by @DmitryZhelnin in https://github.com/AvaloniaUI/Avalonia/pull/12861
* Fixed issue with VirtualizingPanel's RemoveInternalChildRange() by @liwuqingxin in https://github.com/AvaloniaUI/Avalonia/pull/12877
* Fixed Xaml Compiler error when code-behind class contains a DllImport method by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/12882
* Fixed memory leak in TopLevel's Cursor property subscriptions by @DmitryZhelnin in https://github.com/AvaloniaUI/Avalonia/pull/12996
* Added Clear function to Date and Time pickers by @rabbitism in https://github.com/AvaloniaUI/Avalonia/pull/13082
* Fixed typo in ItemsControlFromItemContainer by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/13118
* Updated RenderDataRectangleNode.HitTest for proper hit-testing of rounded rectangles by @billhenn in https://github.com/AvaloniaUI/Avalonia/pull/13797
* Fixed initialization property order in SelectedItemsControl by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/13800
* Implemented helper OutputApiDiff target by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/13818
* Unsubscribed Android back handler when toplevel is disposed by @emmauss in https://github.com/AvaloniaUI/Avalonia/pull/13831
* Fixed DataGrid IList editing issue by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/13845
* Fixed TextLine run bounds union calculation by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/13847
* Fixed TabItem.TabStripPlacement not being set for new tab items by @pavelovcharov in https://github.com/AvaloniaUI/Avalonia/pull/13849
* Hackfix for calling SelectAll with SelectedItem binding by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/13868
* Fix OutOfMemory crash with LowLatencyDxgiSwapChain enabled by @ShadowMarker789 https://github.com/AvaloniaUI/Avalonia/pull/13869
* Added transition leak tests by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/13870
* Fixed ToggleSwitch dragging by @Splitwirez in https://github.com/AvaloniaUI/Avalonia/pull/13893
* Fixed Adorner Layer Clipping by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/13921
* Fixed BoxShadow style changes not triggering render updates on ContentPresenter by @Al12rs in https://github.com/AvaloniaUI/Avalonia/pull/13932
* Added feature to allow treating Avalonia Access Unstable Private APIs Warning as Error by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/13937
* OpenglControl - Don't queue update if control is not attached by @emmauss in https://github.com/AvaloniaUI/Avalonia/pull/13938
* Fixed iOS Dispatcher by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/13942
* Used ShowNoActivate in Win32NativeControlHost by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/13966
* Don't override ContextMenu.Placement when Open is called from code by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/13967
* Don't share style instances with Or selector by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/13969
* Fixed IOSStorageFolder permission problem by @sghctoma in https://github.com/AvaloniaUI/Avalonia/pull/13976
* Fixed Border and Shape border re-rendering when changing Brush value by @SKProCH in https://github.com/AvaloniaUI/Avalonia/pull/13980
* Fixed DBus Exception on window close by @affederaffe in https://github.com/AvaloniaUI/Avalonia/pull/13997
* Updated Tmds.DBus.SourceGenerator to 0.0.13 by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/14010
* Fixed Relative line drawing in Geometries by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/14013
* Removed missing MVID warning on XAML compilation by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/14014
* Fixed color of selected DataGridRow by @zavaleriy in https://github.com/AvaloniaUI/Avalonia/pull/14026
* Fixed regression in rendering of non-clear type text by @danwalmsley in https://github.com/AvaloniaUI/Avalonia/pull/14080
* Don't crash on IsCurrent checks by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/14089
* Implemented ApiInformation checks by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/14090
* Fixed XML Docs: Renamed inheritdocs to inheritdoc by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/14093
* Added an event to detect when an Application icon is clicked by @danwalmsley in https://github.com/AvaloniaUI/Avalonia/pull/14106
* Improved TextBox behavior on Ctrl+Backspace down event by @exGensImpl in https://github.com/AvaloniaUI/Avalonia/pull/14138
* Added InheritDataTypeFromItems for AutoCompleteBox.ValueMemberBinding by @gehongyan in https://github.com/AvaloniaUI/Avalonia/pull/14162
* Fixed exception when SelectedValueBinding evaluates to null by @TomEdwardsEnscape in https://github.com/AvaloniaUI/Avalonia/pull/14171
* Updated SkiaSharp to 2.88.7 to fix a memory exception by @MontagueM in https://github.com/AvaloniaUI/Avalonia/pull/14179
* Ported DragMove logic from WPF by @jmacato in https://github.com/AvaloniaUI/Avalonia/pull/14186
---

## 11.0.6

https://www.nuget.org/packages/Avalonia/11.0.6

**Full Changelog**: https://github.com/AvaloniaUI/Avalonia/compare/11.0.5...11.0.6

**Join Discussion**: https://github.com/AvaloniaUI/Avalonia/discussions/13841

### What's Changed
* Fix: RangeBase should not write coerced values back when DataContext is changing by @timunie in https://github.com/AvaloniaUI/Avalonia/pull/11918
* Fix TabItem memory leak by @DmitryZhelnin in https://github.com/AvaloniaUI/Avalonia/pull/12418
* Key handling improvements by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12549
* Use Tmds.DBus.SourceGenerator 0.0.10 by @affederaffe in https://github.com/AvaloniaUI/Avalonia/pull/12730
* Use the focus proxy window in X11 by @vlad-lubenskyi in https://github.com/AvaloniaUI/Avalonia/pull/12751
* Finding ancestor IScrollAnchorProvider instead ScrollViewer. by @Meloman19 in https://github.com/AvaloniaUI/Avalonia/pull/13079
* Fix ManagedFileChooser FileName issue by @rabbitism in https://github.com/AvaloniaUI/Avalonia/pull/13096
* Introduce DrawingContextHelper.RenderAsync method by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/13128
* Ambiguous error message when you load App.axaml by @prashantvc in https://github.com/AvaloniaUI/Avalonia/pull/13129
* Fix text hit testing for invisible runs by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/13135
* Obsolete CubicBezierEasing by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/13137
* #13123 Fix ButtonSpinnerLocation in SimpleTheme by @stogle in https://github.com/AvaloniaUI/Avalonia/pull/13142
* [Text] Fix hit testing issues by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/13155
* Remove viewport estimation from VirtualizingStackPanel by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/13169
* Fix viewport calculation with non-invertible render transform by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/13188
* Rethrow layout exceptions by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/13189
* Fix text wrapping for chinese etc. by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/13193
* fix(ImmutableSolidColorBrush): Missing assingment of ctor transform argument by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/13194
* Fix macOS clipboard formats mapping by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/13197
* Implement Next action in android IME by @emmauss in https://github.com/AvaloniaUI/Avalonia/pull/13222
* feat(Gestures): Allow using some `Gestures`  events in Xaml by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/13232
* Introduce TextBlock.LineSpacing by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/13243
* Fix OpenGlControlBase: Ensure _updateQueued is set to false when DoCleanup() is called by @laolarou726 in https://github.com/AvaloniaUI/Avalonia/pull/13260
* Add option to enable/disable input focus proxy for X11. by @jmacato in https://github.com/AvaloniaUI/Avalonia/pull/13273
* Add TextBox.ScrollToLine by @mgnslndh in https://github.com/AvaloniaUI/Avalonia/pull/13274
* X11 IME preedit, preedit cursor, input context improvements by @kekekeks in https://github.com/AvaloniaUI/Avalonia/pull/13282
* Fix TextLayout.OverhandLeading calculation by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/13287
* Fix watermark alignment of TextBox in the Simple theme #5802 by @mgnslndh in https://github.com/AvaloniaUI/Avalonia/pull/13295
* iBus support fixes by @kekekeks in https://github.com/AvaloniaUI/Avalonia/pull/13297
* Fix Sector Fill by @robloo in https://github.com/AvaloniaUI/Avalonia/pull/13304
* Make Avalonia.Browser work on .NET 8 by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/13312
* Implement IList on DataGridCollectionView. by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/13313
* Prevent gesture recognition when gesture is captured by @emmauss in https://github.com/AvaloniaUI/Avalonia/pull/13323
* Exclude access key markers from native menu titles on macOS. by @Steveice10 in https://github.com/AvaloniaUI/Avalonia/pull/13338
* Add tooltip support to NativeMenuItem. by @Steveice10 in https://github.com/AvaloniaUI/Avalonia/pull/13350
* Update HarfBuzzSharp by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/13357
* fix(CaptionButton): theme used hardcoded Background, Foreground and BorderBrush color by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/13373
* Fix ShapedTextRun Split by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/13385
* Fix some issues with focus scopes by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/13409
* Dispose CecilTypeSystem in XAML compiler task by @kekekeks in https://github.com/AvaloniaUI/Avalonia/pull/13429
* Tooltip inherits theme from control by @HermanKirshin in https://github.com/AvaloniaUI/Avalonia/pull/13454
* Fix TimePicker empty designator on 12 hour clock by @maprosen in https://github.com/AvaloniaUI/Avalonia/pull/13469
* Fix DateTimePicker scroll down by @maprosen in https://github.com/AvaloniaUI/Avalonia/pull/13482
* Fix dragging a slider with a tooltip by @TomEdwardsEnscape in https://github.com/AvaloniaUI/Avalonia/pull/13489
* Fixed passing current_folder to DBus for save file dialog by @HermanKirshin in https://github.com/AvaloniaUI/Avalonia/pull/13491
* Fix issue #11006 by correcting SelectionChanged event to be fired AFTER (not before) raising Prop. by @lnxon in https://github.com/AvaloniaUI/Avalonia/pull/13503
* Fix ImageBrush crash when source bitmap gets disposed by @kekekeks in https://github.com/AvaloniaUI/Avalonia/pull/13506
* fix: Navigation when CanExecute is fasle by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/13507
* DataGrid inertial scroll support (#13502) by @stogle in https://github.com/AvaloniaUI/Avalonia/pull/13511
* Fix for issue #13493 by @laolarou726 in https://github.com/AvaloniaUI/Avalonia/pull/13518
* fix: Potential TransformGroup memory leak by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/13529
* Avoid Adreno DXGI adapter on Win-ARM devices by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/13538
* Don't hide tooltip when pointer is over it.  by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/13565
* Fix: Allow ColorPicker-Fylout to swap position if needed by @timunie in https://github.com/AvaloniaUI/Avalonia/pull/13567
* Update scaling when Position is set directly on x11 by @emmauss in https://github.com/AvaloniaUI/Avalonia/pull/13590
* current_folder added to DBus open file / folder picker by @HermanKirshin in https://github.com/AvaloniaUI/Avalonia/pull/13596
* Win32 file picker fixes by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/13625
* fix:Previewer connection fails from VSCode by @prashantvc in https://github.com/AvaloniaUI/Avalonia/pull/13630
* Properly handle overhang with RTL FlowDirection by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/13631
* Deferred scrolling by @TomEdwardsEnscape in https://github.com/AvaloniaUI/Avalonia/pull/13644
* [WIP]Fix overhang leading calculation for negative values by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/13672
* Fix blocking  shutdown app with LibInput by @Seeung in https://github.com/AvaloniaUI/Avalonia/pull/13677
* Data grid handled events by @ltetak in https://github.com/AvaloniaUI/Avalonia/pull/13680
* Fix WasmExtraFilesToDeploy on non-Windows .NET 8 by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/13698
* Fix Design.IsDesignMode being false in BuildAvaloniaApp method by @Takoooooo in https://github.com/AvaloniaUI/Avalonia/pull/13699
* Update Xamarin.AndroidX by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/13708
* Ignore mouse move when left window by @ltetak in https://github.com/AvaloniaUI/Avalonia/pull/13724
* Allow users to change menu show delay by @WillisXue in https://github.com/AvaloniaUI/Avalonia/pull/13752
* Fix overlapping items in `VirtualizingStackPanel` by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/13765
* Fix `nth-child` styles on virtualized lists by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/13770
* Fix Animation.FillMode when cue isn't 0% or 100% by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/13775
* fix: Expander header icon flip when collapsing or expanding canceled by @memorydream in https://github.com/AvaloniaUI/Avalonia/pull/13780
* release Context by @Coloryr in https://github.com/AvaloniaUI/Avalonia/pull/13788
* Fix Some Virtualizing List Update Bugs by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/13795
* Added default excludes for AvaloniaXaml by @jp2masa in https://github.com/AvaloniaUI/Avalonia/pull/13809
* Update Avalonia.Browser.props by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/13820
* Fix some issues with tabbing into virtualized list by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/13826

---

## 11.0.5

https://www.nuget.org/packages/Avalonia/11.0.5

### What's Changed
* feat: Also allows using string instead of x:Type in ControlTemplate.TargetType by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/11575
* feat: Handle ClrPropertyInfo in StaticResourceExtension by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/12047
* fix DropDownButton glyph foreground color by @almightyju in https://github.com/AvaloniaUI/Avalonia/pull/12048
* Fix NotificationCard to determine the type of notification from an inherited INotification object by @Onebeld in https://github.com/AvaloniaUI/Avalonia/pull/12103
* Improve AutoCompleteBox performance by @timunie in https://github.com/AvaloniaUI/Avalonia/pull/12338
* Fix issue #12453, TextBox does not scroll at the end of line when entering CJK characters via IME by @lnxon in https://github.com/AvaloniaUI/Avalonia/pull/12454
* fix: AvaloniaVS can not resolve resource relative path in Previewer by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/12473
* ToggleSwitch: fix toggle on single touch tap on the knob part by @msneijders in https://github.com/AvaloniaUI/Avalonia/pull/12520
* When calculating geometry bounds take into account parameters that affect geometry bounds by @kekekeks in https://github.com/AvaloniaUI/Avalonia/pull/12606
* Allow setting a LineHeight that is smaller than the default by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/12613
* Fix TextTrimming in combination with TextWrapping by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/12614
* Fix for TextBlock.TextDecorations not inheriting down to inlines. by @billhenn in https://github.com/AvaloniaUI/Avalonia/pull/12624
* Fix changing `ItemsControl.ItemContainerTheme` by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/12630
* Update Rotate3DTransition.cs to fix flickering on backwards navigation by @yankun in https://github.com/AvaloniaUI/Avalonia/pull/12631
* Fix for AccessText underlines being very blurry by @billhenn in https://github.com/AvaloniaUI/Avalonia/pull/12634
* Revert Inline breaking change by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12638
* csproj cleanup by @SimonCropp in https://github.com/AvaloniaUI/Avalonia/pull/12657
* Call CaptureLost on gestures when pointer loses capture by @emmauss in https://github.com/AvaloniaUI/Avalonia/pull/12666
* Fix Inlines TextTrimming with embedded controls by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/12695
* Fix OnOpenGlInit getting called twice by @wannkunstbeikor in https://github.com/AvaloniaUI/Avalonia/pull/12713
* Updated Transition to use direct properties via use of new TransitionBase class by @billhenn in https://github.com/AvaloniaUI/Avalonia/pull/12716
* Fix popups in Windows being offset incorrectly by a workaround for another issue by @billhenn in https://github.com/AvaloniaUI/Avalonia/pull/12725
* Fix the scrollbar attaching to wrong scrollviewer, like scrollviewer . by @liwuqingxin in https://github.com/AvaloniaUI/Avalonia/pull/12732
* Introduce DrawingContext Push/PopRenderOptions by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/12734
* Added Avalonia.ForTestingOnly to InternalsVisibleTo list by @kekekeks in https://github.com/AvaloniaUI/Avalonia/pull/12750
* Fix property analyzer exception with object initializers in cctors by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12754
* Fix previewer security issue by @Takoooooo in https://github.com/AvaloniaUI/Avalonia/pull/12757
* Ensure GlyphRunImpl has consistent bounds by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12765
* [Mac] Fixes raw keyDown/textInput handling by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/12774
* Fix interpolator being called after last animation iteration by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12781
* fix: DataGrid scroll should behave the same as ScrollViewer by @timunie in https://github.com/AvaloniaUI/Avalonia/pull/12787
* Restore PathIcon Foreground setter in Fluent theme by @wieslawsoltes in https://github.com/AvaloniaUI/Avalonia/pull/12789
* creating only one gtk thread by @HermanKirshin in https://github.com/AvaloniaUI/Avalonia/pull/12830
* fixed restarting renderer when window is minimized and restored progr. by @HermanKirshin in https://github.com/AvaloniaUI/Avalonia/pull/12832
* Fixed blinking caret in case TextPresenter detached and attached again by @HermanKirshin in https://github.com/AvaloniaUI/Avalonia/pull/12846
* macOS: Disallow entering fullscreen when showing window. by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/12865
* macOS: Don't clear clipboard in SetText. by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/12866
* Fixes font family definitions that mix embedded and system fonts by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/12871
* Fix DataGrid' SelectedItems removing wrong item when DataGrid is grou. by @liwuqingxin in https://github.com/AvaloniaUI/Avalonia/pull/12875
* Fix focus loss issue with AutocompleteBox by @emmauss in https://github.com/AvaloniaUI/Avalonia/pull/12883
* MacOS file type filter in native file dialog by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/12899
* Change iOS initialization order by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/12915
* Detect recursion and check for cancellation in analyser `while` loops by @TomEdwardsEnscape in https://github.com/AvaloniaUI/Avalonia/pull/12916
* Trimmable runtime xaml loader by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/12937
* [X11] Don't convert the current time from long to int by @kekekeks in https://github.com/AvaloniaUI/Avalonia/pull/12941
* [Windows] [IME] Prevent duplicate input for some IMEs by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/12942
* Fix - TextPresenter ignores FontStretch property by @VladimirDrobyshev in https://github.com/AvaloniaUI/Avalonia/pull/12947
* Add support for setting tooltip text for TrayIcons on MacOS by @Takoooooo in https://github.com/AvaloniaUI/Avalonia/pull/12948
* Fix VirtualizingStackPanel and nth-child for the currently realizing item container by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12957
* FluentTheme: settable ListBoxItem.FontWeight/FontSize by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12958
* Added guards for compositor reentrancy and exposed batch lifetime events by @kekekeks in https://github.com/AvaloniaUI/Avalonia/pull/12968
* [Browser] [IME] Fix event handling by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/12970
* Fix HeadlessUnitTestSession creation race condition by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12979
* Fix FontManager crash by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/12982
* Fix XAML name generator with non-Avalonia XAML files by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/13001
* Fix unit tests culture by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/13016
* Fix ItemsControl logical child removal by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/13019
* In `Avalonia.Controls`, modernized `get`ter/`set`ter syntax by @Lehonti in https://github.com/AvaloniaUI/Avalonia/pull/13021
* Fix initial logical scrollable state by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/13066
* Fix offset expression animation by @Meloman19 in https://github.com/AvaloniaUI/Avalonia/pull/13071
* Add "EGL_ANGLE_flexible_surface_compatibility" ext check by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/13080
* Fix CalendarDatePicker two way binding syntax. by @rabbitism in https://github.com/AvaloniaUI/Avalonia/pull/13083
* fix: TemplateBinding clone should carry original Mode. by @rabbitism in https://github.com/AvaloniaUI/Avalonia/pull/13087
* Fix popup tests randomly failing after logical scrollable tests by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/13098
* [nuke] Use a regex to detect a release branch. by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/13106
* Update SkiaSharp to 2.88.6 to fix a critical security vulnerability by @spofdamon in https://github.com/AvaloniaUI/Avalonia/pull/13109
* fix parsing the baseline version for api diff. by @danwalmsley in https://github.com/AvaloniaUI/Avalonia/pull/13156
* Fix AccessKeyHandler matching on elements that are not effectively enabled. by @boydpatterson in https://github.com/AvaloniaUI/Avalonia/pull/13185
* Try to fix api validator by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/13213

**Full Changelog**: https://github.com/AvaloniaUI/Avalonia/compare/11.0.4...11.0.5

---

## 11.0.4

Just some bug fixes! Stability++

https://www.nuget.org/packages/Avalonia/11.0.4

### What's Changed
* [TransitioningContentControl] Manage his LogicalChildren by @danielmayost in https://github.com/AvaloniaUI/Avalonia/pull/12173
* Set PreserveSig to true for OleGetClipboard by @EgorRudakov2 in https://github.com/AvaloniaUI/Avalonia/pull/12553
* Fixed memory leaks in ContextMenu.cs by @adirh3 in https://github.com/AvaloniaUI/Avalonia/pull/12526
* Fix DataGridHeader style by @Flithor in https://github.com/AvaloniaUI/Avalonia/pull/12544
* remove legacy nuget feed no longer reachable. by @danwalmsley in https://github.com/AvaloniaUI/Avalonia/pull/12563
* fix macos keydown and textinput events being raised in the wrong order. by @danwalmsley in https://github.com/AvaloniaUI/Avalonia/pull/12560
* Fix for Track not arranging after IsDirectionReversed property changed. by @billhenn in https://github.com/AvaloniaUI/Avalonia/pull/12575
* Enhanced Clipping and Rendered Visuals Tracking in ServerCompositionVisual by @stepangovorko in https://github.com/AvaloniaUI/Avalonia/pull/12568
* Fix UI thread main loop cancellation from another thread on macOS by @de1acr0ix in https://github.com/AvaloniaUI/Avalonia/pull/12579
* Introduce RenderOptions.RequiresFullOpacityHandling by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/12572
* Updated ToggleSplitButton.IsChecked to bind TwoWay by default, same as ToggleButton. by @billhenn in https://github.com/AvaloniaUI/Avalonia/pull/12584
* Fixes TextBox measure logic for MaxLines scenario by @billhenn in https://github.com/AvaloniaUI/Avalonia/pull/12589
* ShowInTaskBar with Owned window: make consistent with WPF by @danwalmsley in https://github.com/AvaloniaUI/Avalonia/pull/12593

### New Contributors
* @EgorRudakov2 made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12553
* @Flithor made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12544
* @billhenn made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12575
* @stepangovorko made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12568
* @de1acr0ix made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12579

**Full Changelog**: https://github.com/AvaloniaUI/Avalonia/compare/11.0.3...11.0.4

---

## 11.0.3

Minor fixes and improvements

### What's Changed
* feat(NumericUpDown): TextAlignment by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/12368
* Make the animation display complete by @Coloryr in https://github.com/AvaloniaUI/Avalonia/pull/12364
* Add null check for TextInputMethodClient in OnSelectionChanged() method by @3dfxuser in https://github.com/AvaloniaUI/Avalonia/pull/12415
* Generate pdb for ref assemblies by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12410
* Fix not working hotkey on a custom control. closes #12323 by @flexxxxer in https://github.com/AvaloniaUI/Avalonia/pull/12347
* Fix DataContext not getting GC'd/Finalized. closes #12123 by @flexxxxer in https://github.com/AvaloniaUI/Avalonia/pull/12430
* Unwrap win32 data object by @kekekeks in https://github.com/AvaloniaUI/Avalonia/pull/12478
* Allow embedded root automation peers. by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/12330

### New Contributors
* @Coloryr made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12364
* @3dfxuser made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12415
* @flexxxxer made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12347

---

## 11.0.2

https://www.nuget.org/packages/Avalonia/11.0.2

### What's Changed
* Use embedded pdb for analyzers and build tasks by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12336
* Fix window incorrect positioning with window startup location CenterScreen on MacOS by @Takoooooo in https://github.com/AvaloniaUI/Avalonia/pull/12327
* Fixed issue where RowDetailsTemplate was getting the wrong DataContext by @Gundz in https://github.com/AvaloniaUI/Avalonia/pull/12174
* Catch dbus errors so that WatchAsync can register all names by @ThereGoesMySanity in https://github.com/AvaloniaUI/Avalonia/pull/12377

### New Contributors
* @Gundz made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12174

**Full Changelog**: https://github.com/AvaloniaUI/Avalonia/compare/11.0.1...11.0.2

---

## 11.0.1

Bug fixes only this time folks!

https://www.nuget.org/packages/Avalonia/11.0.1

### What's Changed
* Fix datagrid not updating when not attached to tree by @almightyju in https://github.com/AvaloniaUI/Avalonia/pull/12009
* Fix AutoCompleteBox not opening when the text box is empty by @AtomCrafty in https://github.com/AvaloniaUI/Avalonia/pull/12057
* Add event trigger time in DevTools. #11338 by @yll690 in https://github.com/AvaloniaUI/Avalonia/pull/12036
* Use CancellationToken in AvaloniaNameGenerator by @jankrib in https://github.com/AvaloniaUI/Avalonia/pull/12043
* Country or Region by @afunc233 in https://github.com/AvaloniaUI/Avalonia/pull/12070
* Fix EGL OpenGLControlBase on Win32 by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/12056
* Drop original internal XAML resources after merge by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12074
* Api validation tool by @maxkatz6 in https://github.com/AvaloniaUI/Avalonia/pull/12072
* Setting child of TestRoot once by @YohDeadfall in https://github.com/AvaloniaUI/Avalonia/pull/12094
* Add suppression for removed generated NamespaceInfo types by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12136
* Changed null checks to make use of nameof() by @Lehonti in https://github.com/AvaloniaUI/Avalonia/pull/12150
* Removed redundant Source check by @YohDeadfall in https://github.com/AvaloniaUI/Avalonia/pull/12035
* Fix composition render resources invalidation by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12146
* Rename ImportCompeted into ImportCompleted by @jgcodes2020 in https://github.com/AvaloniaUI/Avalonia/pull/12117
* fix textbox crash double clicking last empty line 12161 by @startewho in https://github.com/AvaloniaUI/Avalonia/pull/12171
* remove duplicates in InternalsVisibleTo by @viordash in https://github.com/AvaloniaUI/Avalonia/pull/12200
* fix combobox inside popup 11954 by @startewho in https://github.com/AvaloniaUI/Avalonia/pull/12186
* Fix SelectedValueBinding with items defined in XAML by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/12193
* Added support for Mica Light & Dark based on Win11 by @adirh3 in https://github.com/AvaloniaUI/Avalonia/pull/12196
* Allow to run previewer from command line via MSBuild target by @kekekeks in https://github.com/AvaloniaUI/Avalonia/pull/12206
* Fix typo in GetColorValues by @Sorien in https://github.com/AvaloniaUI/Avalonia/pull/12215
* X11 mate clipboard by @viordash in https://github.com/AvaloniaUI/Avalonia/pull/12002
* added clear function to combobox by @lhsrebel72 in https://github.com/AvaloniaUI/Avalonia/pull/12217
* Generate external symbol packages by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12216
* Remove unnecessary cast from RootAutomationNode. by @grokys in https://github.com/AvaloniaUI/Avalonia/pull/12222
* Modernizing syntax by @Lehonti in https://github.com/AvaloniaUI/Avalonia/pull/12226
* Special handling for macos dispatcher quirks by @kekekeks in https://github.com/AvaloniaUI/Avalonia/pull/12230
* Rework TextLine.GetNext/PreviousCharacterHit by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/12239
* Make dispatcher more usable on non-ui threads by @kekekeks in https://github.com/AvaloniaUI/Avalonia/pull/12240
* macOS native: fix destructors accessing freed .NET objects by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12248
* Fix window incorrect positioning with window startup location CenterScreen by @Takoooooo in https://github.com/AvaloniaUI/Avalonia/pull/12093
* Update Rotate3DTransition.cs to fix flickering by @yankun in https://github.com/AvaloniaUI/Avalonia/pull/12254
* Handle ScrollContentPresenter extent rounding errors by @MrJul in https://github.com/AvaloniaUI/Avalonia/pull/12256
* Support non-generic `AvaloniaProperty` in `GetObservable(converter)` by @tomenscape in https://github.com/AvaloniaUI/Avalonia/pull/12160
* Android - Text Input fixes by @emmauss in https://github.com/AvaloniaUI/Avalonia/pull/12270
* feat(DataGrid): Allow binding DataGridColumn Witdh  by @workgroupengineering in https://github.com/AvaloniaUI/Avalonia/pull/12088
* Fix TextLine.GetCharacterHitFromDistance for mixed buffers by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/12318
* Fix creating fields for attached properties called name. closes #12283 by @Mrxx99 in https://github.com/AvaloniaUI/Avalonia/pull/12294
* Fix windows with BorderOnly decoration being unresizable by @emmauss in https://github.com/AvaloniaUI/Avalonia/pull/12257
* Fix segfault on Linux when typing in a TexBox by @iq2luc in https://github.com/AvaloniaUI/Avalonia/pull/12313
* Adjust GetCharacterHitFromDistance to match what WPF expects by @Gillibald in https://github.com/AvaloniaUI/Avalonia/pull/12322

### New Contributors
* @yll690 made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12036
* @afunc233 made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12070
* @Lehonti made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12150
* @jgcodes2020 made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12117
* @lhsrebel72 made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12217
* @Mrxx99 made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12294
* @iq2luc made their first contribution in https://github.com/AvaloniaUI/Avalonia/pull/12313

**Full Changelog**: https://github.com/AvaloniaUI/Avalonia/compare/11.0.0...11.0.1

---

## 11.0.0

Our docs have had an overhaul also:
https://docs.avaloniaui.net/

See this guide on how to update your application.
https://docs.avaloniaui.net/docs/next/stay-up-to-date/upgrade-from-0.10

https://www.nuget.org/packages/Avalonia/11.0.0

### What's New

#### A11y (Accessibility)
This version of Avalonia takes major strides in making applications more accessible. We've added support for various accessibility tools, making it easier for everyone to use Avalonia applications.

#### IME (Input Method Editor) Support
We have introduced support for Input Method Editor (IME), this allows onscreen keyboards and input in all languages.

#### Compositing Renderer
The new compositing renderer enhances the graphical rendering capabilities, providing a more robust, efficient, and flexible rendering pipeline.

#### WebAssembly (WASM) Support
WASM support allows Avalonia applications to run directly in the browser, broadening our platform support and giving developers more freedom and flexibility.

#### iOS and Android Support
We've added support for both iOS and Android platforms. Developers can now build and run Avalonia applications on two of the most popular mobile platforms.

#### Full Rich Text support
You can now fully render rich text allowing you to render complex documents.

With the Text Inlines feature, you can easily construct complex formatted text blocks. It enables you to add annotations, hyperlinks, and other inline elements in your text.

#### Smooth Virtualization (Reworked ItemsControl)
We've completely reworked the ItemsControl to provide smooth virtualization. This improves the efficiency and user experience for controls with many items.

#### Performance Improvements
Avalonia 11.0 comes with significant performance improvements, enhancing the speed and efficiency of your applications.

#### Control Themes, Nested Styles, and Theme Variants
We've added the ability to theme controls, apply nested styles, and choose theme variants. This makes it easier to build beautiful and consistent UIs.

#### Bitmap Effects
The Bitmap Effects feature lets you apply visual effects to bitmaps. You can add blur, drop shadows, and other effects to images.

#### 3D Transforms
With 3D Transforms, you can now create stunning three-dimensional effects in your UI.

#### AOT (Ahead-Of-Time) Compilation and Trimming
AOT compilation enables your apps to run faster by compiling them before runtime. Trimming reduces the size of your apps by removing unused code.

#### GPU Interop
The GPU Interop feature allows Avalonia to work more efficiently with the GPU, improving rendering performance and visuals.

#### Experimental Metal Support
We're testing Metal support to improve performance on iOS and macOS devices.
