/**
 * A component for selecting a number from a range of numbers.
 *
 * @example
 * <RangePicker defaultValue={70} min={0} max={100}></RangePicker>
 *
 * @module agate/RangePicker
 * @exports RangePicker
 * @exports RangePickerBase
 */

import kind from '@enact/core/kind';
import {clamp} from '@enact/core/util';
import Changeable from '@enact/ui/Changeable';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import React from 'react';

import PickerCore, {PickerItem} from '../internal/Picker';

/**
 * RangePicker base component.
 *
 * @class RangePickerBase
 * @memberof agate/RangePicker
 * @ui
 * @public
 */
const RangePickerBase = kind({
	name: 'RangePicker',

	propTypes: /** @lends agate/RangePicker.RangePickerBase.prototype */ {
		/**
		 * The maximum value selectable by the picker (inclusive).
		 *
		 * The range between `min` and `max` should be evenly divisible by
		 * [step]{@link agate/RangePicker.RangePickerBase.step}.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		max: PropTypes.number.isRequired,

		/**
		 * The minimum value selectable by the picker (inclusive).
		 *
		 * The range between `min` and `max` should be evenly divisible by
		 * [step]{@link agate/RangePicker.RangePickerBase.step}.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		min: PropTypes.number.isRequired,

		/**
		 * Current value.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		value: PropTypes.number.isRequired,

		/**
		 * The `aria-valuetext` for the picker.
		 *
		 * By default, `aria-valuetext` is set to the current selected child value.
		 *
		 * @type {String}
		 * @memberof agate/RangePicker.RangePickerBase.prototype
		 * @public
		 */
		'aria-valuetext': PropTypes.string,

		/**
		 * Children from which to pick.
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Class name for component.
		 *
		 * @type {String}
		 * @public
		 */
		className: PropTypes.string,

		/**
		 * Disables the picker.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Called when `value` changes.
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * Orientation of the picker.
		 *
		 * Controls whether the buttons are arranged horizontally or vertically around the value.
		 *
		 * * Values: `'horizontal'`, `'vertical'`
		 *
		 * @type {String}
		 * @default 'horizontal'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * The smallest value change allowed for the picker.
		 *
		 * For example, a step of `2` would cause the picker to increment from 0 to 2 to 4, etc.
		 * It must evenly divide into the range designated by `min` and `max`.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		step: PropTypes.number,

		/**
		 * The width of the picker.
		 *
		 * A number can be used to set the minimum number of characters to be shown. Setting a
		 * number to less than the number of characters in the longest value will cause the width to
		 * grow for the longer values.
		 *
		 * A string can be used to select from pre-defined widths:
		 *
		 * * `'small'` - numeric values
		 * * `'medium'` - single or short words
		 * * `'large'` - maximum-sized pickers taking full width of its parent
		 *
		 * By default, the picker will size according to the longest valid value.
		 *
		 * @type {String|Number}
		 * @public
		 */
		width: PropTypes.oneOfType([
			PropTypes.oneOf([null, 'small', 'medium', 'large']),
			PropTypes.number
		]),
	},

	computed: {
		disabled: ({disabled, max, min}) => min >= max ? true : disabled,
		width: ({max, min, width}) => (width || Math.max(max.toString().length, min.toString().length)),
		value: ({min, max, value}) => {
			return clamp(min, max, value);
		},
	},

	render: ({value, ...rest}) => {
		return (
			<PickerCore {...rest} index={0} value={value}>
				<PickerItem key={value} marqueeDisabled style={{direction: 'ltr'}}>{value}</PickerItem>
			</PickerCore>
		);
	}
});

/**
 * A component that lets the user select a number from a range of numbers.
 *
 * By default, `RangePicker` maintains the state of its `value` property. Supply the `defaultValue`
 * property to control its initial value. If you wish to directly control updates to the component,
 * supply a value to `value` at creation time and update it in response to `onChange` events.
 *
 * @class RangePicker
 * @memberof agate/RangePicker
 * @mixes ui/Changeable.Changeable
 * @ui
 * @public
 */
const RangePicker = Pure(
	Changeable(
		RangePickerBase
	)
);

/**
 * Default value
 *
 * @name defaultValue
 * @memberof agate/RangePicker.RangePicker.prototype
 * @type {Number}
 * @public
 */

export default RangePicker;
export {RangePicker, RangePickerBase};
