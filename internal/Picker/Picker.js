/**
 * A internal Picker component.
 *
 * @module agate/internal/Picker
 * @exports Picker
 * @exports PickerDecorator
 */

import {adaptEvent, forEventProp, forward, handle, oneOf} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import IdProvider from '@enact/ui/internal/IdProvider';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import clamp from 'ramda/src/clamp';
import compose from 'ramda/src/compose';
import React from 'react';

import $L from '../$L';
import Skinnable from '../../Skinnable';

import css from './Picker.module.less';

const PickerRoot = Touchable('div');
const PickerButtonItem = Spottable('div');

const handleChange = direction => handle(
	adaptEvent(
		(ev, {min, max, step, value}) => ({
			value: clamp(min, max, value + (direction * step))
		}),
		forward('onChange')
	)
);

const increment = handleChange(1);
const decrement = handleChange(-1);

/**
 * The base component for {@link agate/internal/Picker.Picker}.
 *
 * @class Picker
 * @memberof agate/internal/Picker
 * @ui
 * @private
 */
const PickerBase = kind({
	name: 'Picker',

	propTypes: /** @lends agate/internal/Picker.Picker.prototype */ {
		/**
		 * The maximum value selectable by the picker (inclusive).
		 *
		 * The range between `min` and `max` should be evenly divisible by
		 * [step]{@link agate/internal/Picker.Picker.step}.
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
		 * [step]{@link agate/internal/Picker.Picker.step}.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		min: PropTypes.number.isRequired,

		/**
		 * Accessibility hint
		 *
		 * For example, `hour`, `year`, and `meridiem`
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		accessibilityHint: PropTypes.string,

		/**
		 * Overrides the `aria-valuetext` for the picker. By default, `aria-valuetext` is set
		 * to the current value. This should only be used when the parent controls the value of
		 * the picker directly through the props.
		 *
		 * @type {String|Number}
		 * @memberof agate/internal/Picker.Picker.prototype
		 * @public
		 */
		'aria-valuetext': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

		/**
		 * Children from which to pick
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
		 * Customize component style
		 *
		 * @type {Object}
		 * @private
		 */
		css: PropTypes.object,

		/**
		 * Sets the hint string read when focusing the decrement button.
		 *
		 * @default 'previous item'
		 * @type {String}
		 * @public
		 */
		decrementAriaLabel: PropTypes.string,

		/**
		 * Disables the picker.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The picker id reference for setting aria-controls.
		 *
		 * @type {String}
		 * @private
		 */
		id: PropTypes.string,

		/**
		 * Sets the hint string read when focusing the increment button.
		 *
		 * @default 'next item'
		 * @type {String}
		 * @public
		 */
		incrementAriaLabel: PropTypes.string,

		/**
		 * A function to run when the control should increment or decrement.
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
		 * @default 'vertical'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * Allow the picker to only increment or decrement by a given value.
		 *
		 * A step of `2` would cause a picker to increment from 10 to 12 to 14, etc. It must evenly
		 * divide into the range designated by `min` and `max`.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		step: PropTypes.number,

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
		accessibilityHint: '',
		orientation: 'vertical',
		step: 1,
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
		activeClassName: ({styler}) => styler.join('active', 'item'),
		className: ({orientation, styler}) => styler.append(orientation),
		currentValueText: ({accessibilityHint, 'aria-valuetext': ariaValueText, children, value}) => {
			if (ariaValueText != null) {
				return ariaValueText;
			}

			let valueText = value;

			if (children && Array.isArray(children)) {
				if (children[value] && children[value].props) {
					valueText = children[value].props.children;
				} else {
					valueText = children[value];
				}
			}

			if (accessibilityHint) {
				valueText = `${valueText} ${accessibilityHint}`;
			}

			return valueText;
		},
		decrementAriaLabel: ({decrementAriaLabel = $L('previous item')}) => decrementAriaLabel,
		incrementAriaLabel: ({incrementAriaLabel = $L('next item')}) => incrementAriaLabel,
		valueId: ({id}) => `${id}_value`
	},

	render: (props) => {
		const {
			activeClassName,
			children: values,
			currentValueText,
			decrementAriaLabel: decAriaLabel,
			handleDecrement,
			handleFlick,
			handleIncrement,
			incrementAriaLabel: incAriaLabel,
			min,
			max,
			step,
			value,
			valueId,
			...rest
		} = props;
		const currentValue = Array.isArray(values) ? values[value] : value;
		const decrementValue = clamp(min, max, Array.isArray(values) ? values[value - step] : value - step);
		const incrementValue = clamp(min, max, Array.isArray(values) ? values[value + step] : value + step);
		const isFirst = value <= min;
		const isLast = value >= max;
		const decrementAriaLabel = `${currentValueText} ${decAriaLabel}`;
		const incrementAriaLabel = `${currentValueText} ${incAriaLabel}`;

		delete rest.accessibilityHint;
		delete rest['aria-valuetext'];

		return (
			<PickerRoot {...rest} onFlick={handleFlick}>
				<PickerButtonItem
					aria-controls={valueId}
					aria-disabled={isFirst}
					aria-label={decrementAriaLabel}
					className={css.itemDecrement}
					disabled={isFirst}
					onClick={handleDecrement}
				>
					<div className={css.label}>
						{isFirst ? '' : decrementValue}
					</div>
				</PickerButtonItem>
				<div
					aria-valuetext={currentValueText}
					className={activeClassName}
					id={valueId}
					role="spinbutton"
				>
					<div className={css.label}>
						{currentValue}
					</div>
				</div>
				<PickerButtonItem
					aria-controls={valueId}
					aria-disabled={isLast}
					aria-label={incrementAriaLabel}
					className={css.itemIncrement}
					disabled={isLast}
					onClick={handleIncrement}
				>
					<div className={css.label}>
						{isLast ? '' : incrementValue}
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
 * @memberof agate/internal/Picker
 * @mixes ui/Changeable.Changeable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const PickerDecorator = compose(
	IdProvider({generateProp: null}),
	Changeable,
	Skinnable
);

const Picker = PickerDecorator(PickerBase);

export default Picker;
export {
	Picker,
	PickerBase,
	PickerDecorator
};
