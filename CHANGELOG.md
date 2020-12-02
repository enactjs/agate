# Change Log

The following is a curated list of changes in the Enact agate module, newest changes on the top.

## [unreleased]

### Added

- `agate/Button` prop `iconOnly`, `iconPosition` and `minWidth`
- `agate/Checkbox` prop `disabled`, `indeterminate`, and `indeterminateIcon`
- `agate/CheckboxItem` prop `disabled`, `indeterminate`, `indeterminateIcon`, and `slotbefore`
- `agate/Marquee` component
 
### Fixed

- `agate/Button` to marquee when focused
- `agate/Button` to show a tooltip when hovered
- `agate/DateTimePicker` returned value by onChange event
- `agate/FanSpeedControl` to center text when there is no icon
- `agate/Heading` to support `spacing` for Gallium and Silicon
- `agate/IncrementSlider` button color for Gallium skin
- `agate/Input` run time error when using `dismissOnEnter`
- `agate/Keypad` to not show console error in sampler
- `agate/LabeledIconButton` max-width so that huge sized icon will not be cut off
- `agate/MediaPlayer` play function on handleNext and handlePrevious to handle events asynchronously
- `agate/Panels` to show close button properly for night mode
- `agate/Picker` picker item width in horizontal for silicon
- `agate/PopupMenu` to display distinguishable title
- `agate/SliderButton` to not show console error in sampler
- `agate/Spinner` to pause the animation when `paused` prop is true
- `agate/Spinner` to show correct layout of spinner when `type` is `loading` in `right-to-left` locale
- `agate/Spinner` to support `transparent` prop properly
- `agate/SwitchItem` icon position for all skins RTL locale and Electro/Titanium both LTR and RTL locale
- `agate/TemperatureControl` to not be draggable when it's disabled

## [1.0.0] - 2020-10-14

Initial release.
