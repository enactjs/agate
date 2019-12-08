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

import Skinnable from '../Skinnable';

import css from './Picker.module.less';

const PickerRoot = Touchable('div');
const PickerButtonItem = Spottable('div');

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
		value: PropTypes.number
	},

	defaultProps: {
		value: 0
	},

	styles: {
		css,
		className: 'picker',
		publicClassNames: true
	},

	handlers: {
		handleDecrement: decrement,
		handleFlick: handle(
			forEventProp('direction', 'vertical'),
			// ignore "slow" flicks by filtering out velocity below a threshold
			oneOf(
				[({velocityY}) => velocityY < 0, increment],
				[({velocityY}) => velocityY > 0, decrement]
			)
		),
		handleIncrement: increment
	},

	computed: {
		activeClassName: ({styler}) => styler.join('active', 'item')
	},

	render: (props) => {
		const {activeClassName, children: values, handleDecrement, handleFlick, handleIncrement, value, ...rest} = props;
		const isFirst = value <= 0;
		const isLast = value >= React.Children.count(values) - 1;

		return (
			<PickerRoot {...rest} onFlick={handleFlick}>
				<PickerButtonItem
					className={css.itemTop}
					onClick={handleDecrement}
					disabled={isFirst}
				>
					<div className={css.label}>
						{isFirst ? '' : values[value - 1]}
					</div>
				</PickerButtonItem>
				<div className={activeClassName}>
					<div className={css.label}>
						{values[value]}
					</div>
				</div>
				<PickerButtonItem
					className={css.itemBottom}
					onClick={handleIncrement}
					disabled={isLast}
				>
					<div className={css.label}>
						{isLast ? '' : values[value + 1]}
					</div>
				</PickerButtonItem>
			</PickerRoot>
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
