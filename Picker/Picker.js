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
 * @exports PickerDecorator
 */

import {adaptEvent, forEventProp, forward, handle, oneOf} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import clamp from 'ramda/src/clamp';
import compose from 'ramda/src/compose';
import React from 'react';

import PickerCore, {PickerItem} from '../internal/Picker';
import Skinnable from '../Skinnable';

import css from './Picker.module.less';

// const PickerRoot = Touchable('div');
// const PickerButtonItem = Spottable('div');

const handleChange = direction => handle(
	adaptEvent(
		(ev, {value, children}) => ({
			value: clamp(0, React.Children.count(children) - 1, value + direction)
		}),
		forward('onChange')
	)
);
const increment = handleChange(1);
const decrement = handleChange(-1);

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
		 * Index of the selected child.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		value: PropTypes.number,

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
		 * Orientation of the picker.
		 *
		 * Controls whether the buttons are arranged horizontally or vertically around the value.
		 *
		 * * Values: `'horizontal'`, `'vertical'`
		 *
		 * @type {String}
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

	},

	defaultProps: {
		value: 0
	},

	computed: {
		max: ({children}) => children && children.length ? children.length - 1 : 0,
		children: ({children}) => React.Children.map(children, (child) => {
			return (
				<PickerItem
					marqueeOn='hover'
				>
					{child}
				</PickerItem>
			);
		}),
		disabled: ({children, disabled}) => React.Children.count(children) > 1 ? disabled : true,
		value: ({value, children}) => {
			const max = children && children.length ? children.length - 1 : 0;
			return clamp(0, max, value);
		},
	},

	render: (props) => {
		const {children, value, max, ...rest} = props;

		return (
			<PickerCore {...rest} min={0} max={max} index={value} step={1} value={value}>
				{children}
			</PickerCore>
		);
}
});

/**
 * Applies Agate specific behaviors to [PickerBase]{@link agate/Picker.PickerBase}.
 *
 * @hoc
 * @memberof agate/Picker
 * @mixes ui/Changeable.Changeable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const PickerDecorator = compose(
	Changeable,
	Skinnable
);

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
 * @mixes agate/Picker.PickerDecorator
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
	PickerBase,
	PickerDecorator
};
