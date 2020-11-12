# Change Log

The following is a curated list of changes in the Enact agate module, newest changes on the top.

## [unreleased]

### Added

- `agate/DatePicker` prop `onSpotlightDissapear` and `spotlightDisabled`
- `agate/Picker` prop `noAnimation` and `wrap`
- `agate/RangePicker` prop `noAnimation` and `wrap`
- `agate/TimePicker` prop `onSpotlightDissapear` and `spotlightDisabled`
- `agate/internal/DateComponentRangePicker` prop `accesabilityHint` and `wrap`
- `agate/internal/Picker` prop `onSpotlightDissapear`, `spotlightDisabled` and `wrap`
 
### Fixed

- `agate/DateTimePicker` returned value by onChange event
- `agate/Heading` to support `spacing` for Gallium and Silicon
- `agate/IncrementSlider` button color for Gallium skin
- `agate/Panels` to show close button properly for night mode
- `agate/Picker` to not use internal/Picker/PickerDecorator
- `agate/PopupMenu` to display distinguishable title
- `agate/LabeledIconButton` max-width so that huge sized icon will not be cut off
- `agate/SliderButton` to not show console error in sampler
- `agate/Spinner` to pause the animation when `paused` prop is true
- `agate/Spinner` to show correct layout of spinner when `type` is `loading` in `right-to-left` locale
- `agate/Spinner` to support `transparent` prop properly
- `agate/SwitchItem` icon position for all skins RTL locale and Electro/Titanium both LTR and RTL locale
- `agate/Picker` picker item width in horizontal for silicon
- `agate/TemperatureControl` to not be draggable when it's disabled

### Removed

- `agate/internal/DateTime` prop `locale` and `value`



## [1.0.0] - 2020-10-14

Initial release.
