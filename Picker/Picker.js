/**
 * A component for selecting values from a list of values.
 *
 * @example
 * <Picker>
 * 	{['A', 'B', 'C']}
 * </Picker>
 *
 * @module agate/Picker
 * @exports Picker
 * @exports PickerBase
 */

import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import clamp from 'ramda/src/clamp';
import React from 'react';

import {PickerBase as PickerCore, PickerDecorator} from '../internal/Picker';

/**
 * The base `Picker` component.
 *
 * This version is not [`spottable`]{@link spotlight/Spottable.Spottable}.
 *
 * @class PickerBase
 * @memberof agate/Picker
 * @ui
 * @public
 */
const PickerBase = kind({
	name: 'Picker',

	propTypes: /** @lends agate/Picker.PickerBase.prototype */ {
		/**
		 * Picker value list.
		 *
		 * @type {Array}
		 * @required
		 * @public
		 */
		children: PropTypes.array.isRequired,

		/**
		 * Disables the picker.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Called when the `value` changes.
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * Index of the selected child.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		value: PropTypes.number
	},

	defaultProps: {
		value: 0
	},

	computed: {
		disabled: ({children, disabled}) => React.Children.count(children) > 1 ? disabled : true,
		max: ({children}) => children && children.length ? children.length - 1 : 0,
		value: ({value, children}) => {
			const max = children && children.length ? children.length - 1 : 0;
			return clamp(0, max, value);
		}
	},

	render: (props) => {
		const {children, max, value, ...rest} = props;

		return (
			<PickerCore {...rest} min={0} max={max} step={1} value={value}>
				{children}
			</PickerCore>
		);
	}
});

/**
 * Overrides the `aria-valuetext` for the picker. By default, `aria-valuetext` is set
 * to the current value. This should only be used when the parent controls the value of
 * the picker directly through the props.
 *
 * @name aria-valuetext
 * @type {String|Number}
 * @memberof agate/Picker.Picker.prototype
 * @public
 */

/**
 * Sets the hint string read when focusing the decrement button.
 *
 * @name decrementAriaLabel
 * @memberof agate/Picker.Picker.prototype
 * @default 'previous item'
 * @type {String}
 * @public
 */

/**
 * Sets the hint string read when focusing the increment button.
 *
 * @name incrementAriaLabel
 * @memberof agate/Picker.Picker.prototype
 * @default 'next item'
 * @type {String}
 * @public
 */

/**
 * Orientation of the picker.
 *
 * Controls whether the buttons are arranged horizontally or vertically around the value.
 *
 * * Values: `'horizontal'`, `'vertical'`
 *
 * @name orientation
 * @memberof agate/Picker.Picker.prototype
 * @type {String}
 * @default 'vertical'
 * @public
 */

/**
 * A Picker component that allows selecting values from a list of values.
 *
 * By default, `Picker` maintains the state of its `value` property. Supply the `defaultValue`
 * property to control its initial value. If you wish to directly control updates to the component,
 * supply a value to `value` at creation time and update it in response to `onChange` events.
 *
 * @class Picker
 * @memberof agate/Picker
 * @extends agate/Picker.PickerBase
 * @ui
 * @public
 */
const Picker = PickerDecorator(PickerBase);

/**
 * Default index of the selected child.
 *
 * *Note*: Changing `defaultValue` after initial render has no effect.
 *
 * @name defaultValue
 * @memberof agate/Picker.Picker.prototype
 * @type {Number}
 * @public
 */

export default Picker;
export {
	Picker,
	PickerBase
};
