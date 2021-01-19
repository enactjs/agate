# Change Log

The following is a curated list of changes in the Enact agate module, newest changes on the top.

## [unreleased]

### Added

- `agate/ArcPicker` and `agate/ArcSlider` prop `disabled` to be inactive
- `agate/ArcSlider` prop `aria-valuetext` to override `aria-valuetext` for it
- `agate/Button` prop `iconOnly`, `iconPosition` and `minWidth`
- `agate/DateTimePicker` prop `dayAriaLabel`, `hourAriaLabel`, `meridiemAriaLabel`, `minuteAriaLabel`, `monthAriaLabel`, and `yearAriaLabel`
- `agate/Heading` prop `marqueOn` to determine when marquee begins
- `agate/Popup` content padding and margin with `closeButton`
- `agate/Switch` prop `disabled` to disable switch and become non-interactive
- `agate/Switch` prop `disabled` to set whether the control is in the 'on' or 'off' state

### Changed

- `agate/Heading` to support marquee

### Fixed

- `agate/DatePicker` transition direction for day when month is changed
- `agate/Dropdown` to show focused icon color for Silicon skin
- `agate/LabeledIconButton` to display label text on multiple lines (removed marquee)
- `agate/LabeledIconButton` `max-width` to display huge sized icon correctly
- `agate/TimePicker` transition direction for meridiem when hour is changed

## [1.1.1] - 2020-12-23

### Fixed

- Sampler build failure

## [1.1.0] - 2020-12-22

### Added

- `agate/Button` prop `iconOnly`, `iconPosition`, and `minWidth`
- `agate/Checkbox` prop `disabled`, `indeterminate`, and `indeterminateIcon`
- `agate/CheckboxItem` prop `disabled`, `indeterminate`, `indeterminateIcon`, and `slotbefore`
- `agate/DatePicker` prop `onSpotlightDisappear` and `spotlightDisabled`
- `agate/Marquee` component
- `agate/Picker` prop `noAnimation` and `wrap`
- `agate/RangePicker` prop `noAnimation` and `wrap`
- `agate/ThemeDecorator` context `ThemeContext` to apply `accent` color to `agate/ArcPicker` and `agate/ArcSlider` when they're focused
- `agate/TimePicker` prop `onSpotlightDisappear` and `spotlightDisabled`

### Changed

- `agate/ArcPicker`, `agate/ArcSlider`, `agate/FanSpeedControl`, `agate/TemperatureControl`, and `agate/WindDirectionControl` to read out audio guidance when focused via 5-way keys
- `agate/FullscreenPopup` prop `duration` to support any valid CSS value

### Fixed

- `agate/ArcPicker` to display correct `font-size` and `font-weight`
- `agate/Button` to marquee when focused
- `agate/Button` to show a tooltip when hovered
- `agate/DateTimePicker` returned value by onChange event
- `agate/Dropdown` to support closing dropdown with back key
- `agate/FanSpeedControl` to center text when there is no icon
- `agate/Heading` to support `spacing` for Gallium and Silicon
- `agate/IncrementSlider` button color for Gallium skin
- `agate/Input` run time error when using `dismissOnEnter`
- `agate/Keypad` to not show console error in sampler
- `agate/Keypad`, `agate/MediaPlayer`, and `agate/ToggleButton` to have buttons with proper width
- `agate/LabeledIconButton` button shape to circular
- `agate/MediaPlayer` to not show console error when next or previous button is pressed several times during playing
- `agate/Panels` to show close button properly for night mode
- `agate/Picker` picker item width in horizontal for silicon
- `agate/PopupMenu` to display distinguishable title
- `agate/SliderButton` to not show console error in sampler
- `agate/Spinner` to pause the animation when `paused` prop is true
- `agate/Spinner` to show correct layout when `type` is `loading` in `right-to-left` locale
- `agate/Spinner` to support `transparent` prop properly
- `agate/SwitchItem` icon position for all skins in RTL locale and Electro/Titanium in all locales
- `agate/TemperatureControl` to not be draggable when it's disabled

## [1.0.0] - 2020-10-14

Initial release.
