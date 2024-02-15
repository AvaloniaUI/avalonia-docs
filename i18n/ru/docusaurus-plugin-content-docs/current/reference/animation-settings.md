---
description: REFERENCE
---

import SineEaseOutScreenshot from '/img/reference/animation-settings/sine-ease-out.png';

# Настройка Анимации

Полный список встроенных настроек анимации в Avalonia UI:

* Easing Functions (функция плавности)
* Fill Modes (Определение стилей до и после вопроизведения анимации)
* Playback Direction (Порядок воспроизведение)
* Repeat (Повторное воспроизведение)

## Easing Functions

<table><thead><tr><th width="216">Profile</th><th>Setting</th></tr></thead><tbody><tr><td><img src={SineEaseOutScreenshot} alt=""/></td><td><code>SineEaseOut</code></td></tr></tbody></table>

## Fill Modes

The fill mode attribute of an animation defines how the set property persists after running an animation, and on delays in between runs.

Варианты поведения:

| Значение   | Описание                                                                                                  |
|------------|-----------------------------------------------------------------------------------------------------------|
| `None`     | Value will not persist after animation nor the first value will be applied when the animation is delayed. |
| `Forward`  | The last interpolated value will be persisted to the target property.                                     |
| `Backward` | The first interpolated value will be displayed on animation delay.                                        |
| `Both`     | Будет использоваться `Forward` и `Backward` поведения.                                                    |

## Playback Direction

Порядок воспроизведения включает как направление, так и любые повторы.
Возможные параметры:

| Значение           | Описание                                                |
|--------------------|---------------------------------------------------------|
| `Normal`           | Анимация воспроизводится нормально.                     |
| `Reverse`          | Анимация воспроизводится в обратном направлении.        |
| `Alternate`        | Анимация воспроизводится сначала вперед, затем назад.   |
| `AlternateReverse` | Анимация воспроизводится сначала назад, затем вперед.   |

## Repeat

Задает количество повторов воспроизведения.

| Значение   | Описание                                                       |
|------------|----------------------------------------------------------------|
| `N`        | (N - целочисленное) - воспроизводит N раз. N может быть нулем. |
| `INFINITE` | Бесконечный повтор                                             |
