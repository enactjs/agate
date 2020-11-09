# Change Log

The following is a curated list of changes in the Enact agate module, newest changes on the top.

## [unreleased]

### Added
- `agate/Marquee` new component
- `agate/Button` marquee decorator
- `agate/Button` tooltip decorator
- `agate/Button` iconOnly, iconPosition, minWidth props

### Changed
- `agate/Button` minWidth computed with IconButtonDecorator HoC
 
### Fixed
- `agate/DateTimePicker` returned value by onChange event
- `agate/Heading` to support `spacing` for Gallium and Silicon
- `agate/IncrementSlider` button color for Gallium skin
- `agate/Panels` to show close button properly for night mode
- `agate/PopupMenu` to display distinguishable title
- `agate/LabeledIconButton` max-width so that huge sized icon will not be cut off
- `agate/Spinner` to pause the animation when `paused` prop is true
- `agate/SwitchItem` icon position for all skins RTL locale and Electro/Titanium both LTR and RTL locale
- `agate/Picker` picker item width in horizontal for silicon

## [1.0.0] - 2020-10-14

Initial release.
