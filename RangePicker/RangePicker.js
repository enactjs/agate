/**
 * A component for selecting a number from a range of numbers.
 *
 * @example
 * <RangePicker defaultValue={70} min={0} max={100}></RangePicker>
 *
 * @module agate/RangePicker
 * @exports RangePicker
 * @exports RangePickerBase
 * @exports RangePickerDecorator
 */

import kind from '@enact/core/kind';
import {clamp} from '@enact/core/util';
import Changeable from '@enact/ui/Changeable';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import PickerCore from '../internal/Picker';
import PickerItem from "../internal/Picker/PickerItem";

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
		 * Overrides the `aria-valuetext` for the picker. By default, `aria-valuetext` is set
		 * to the current value. This should only be used when the parent controls the value of
		 * the picker directly through the props.
		 *
		 * @name aria-valuetext
		 * @type {String|Number}
		 * @memberof agate/RangePicker.RangePicker.prototype
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
		 * Disables animation.
		 *
		 * By default, the picker will animate transitions between items, provided a `width` is
		 * defined.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noAnimation: PropTypes.bool,

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
		 * @type {'horizontal'|'vertical'}
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
		 * Allows picker to continue from the start of the list after it reaches the end and
		 * vice-versa.
		 *
		 * @type {Boolean}
		 * @public
		 */
		wrap: PropTypes.bool
	},

	computed: {
		disabled: ({disabled, max, min}) => min >= max ? true : disabled,
		value: ({min, max, value}) => {
			return clamp(min, max, value);
		}
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
 * Sets the hint string read when focusing the decrement button.
 *
 * @name decrementAriaLabel
 * @memberof agate/RangePicker.RangePicker.prototype
 * @default 'previous item'
 * @type {String}
 * @public
 */

/**
 * Sets the hint string read when focusing the increment button.
 *
 * @name incrementAriaLabel
 * @memberof agate/RangePicker.RangePicker.prototype
 * @default 'next item'
 * @type {String}
 * @public
 */

/**
 * Applies Agate specific behaviors to [RangePickerBase]{@link agate/RangePicker.RangePickerBase} components.
 *
 * @hoc
 * @memberof agate/RangePicker
 * @mixes ui/Changeable.Changeable
 * @public
 */
const RangePickerDecorator = compose(
	Pure,
	Changeable
);

/**
 * A component that lets the user select a number from a range of numbers.
 *
 * By default, `RangePicker` maintains the state of its `value` property. Supply the `defaultValue`
 * property to control its initial value. If you wish to directly control updates to the component,
 * supply a value to `value` at creation time and update it in response to `onChange` events.
 *
 * @class RangePicker
 * @memberof agate/RangePicker
 * @extends agate/RangePicker.RangePickerBase
 * @mixes agate/RangePicker.RangePickerDecorator
 * @ui
 * @public
 */
const RangePicker = RangePickerDecorator(RangePickerBase);

/**
 * Default value
 *
 * @name defaultValue
 * @memberof agate/RangePicker.RangePicker.prototype
 * @type {Number}
 * @public
 */

export default RangePicker;
export {
	RangePicker,
	RangePickerBase,
	RangePickerDecorator
};
