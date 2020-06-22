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
import {ViewManager} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import clamp from 'ramda/src/clamp';
import compose from 'ramda/src/compose';
import equals from 'ramda/src/equals';
import React from 'react';
import shouldUpdate from 'recompose/shouldUpdate';

import $L from '../$L';
import Skinnable from '../../Skinnable';

import css from './Picker.module.less';

const PickerRoot = Touchable('div');
const PickerButtonItem = Spottable('div');

const PickerViewManager = shouldUpdate((props, nextProps) => {
	return (
		props.index !== nextProps.index ||
		!equals(props.children, nextProps.children)
	);
})(ViewManager);

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
		 * Index for internal ViewManager
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		index: PropTypes.number.isRequired,

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
		decrementAriaLabel: ({'aria-valuetext': valueText, children: values, decrementAriaLabel = $L('previous item'), value}) => {
			if (Array.isArray(values)) {
				return `${valueText != null ? valueText : values[value]} ${decrementAriaLabel}`;
			} else {
				return `${valueText != null ? valueText : value} ${decrementAriaLabel}`;
			}

		},
		valueId: ({id}) => `${id}_value`,
		incrementAriaLabel: ({'aria-valuetext': valueText, children: values, incrementAriaLabel = $L('next item'), value}) => {
			if (Array.isArray(values)) {
				return `${valueText != null ? valueText : values[value]} ${incrementAriaLabel}`;
			} else {
				return `${valueText != null ? valueText : value} ${incrementAriaLabel}`;
			}
		},
		currentValueText: ({'aria-valuetext': valueText, children: values, value}) => {
			if (Array.isArray(values)) {
				return `${typeof valueText !== 'undefined' ? valueText : values[value]}`;
			} else {
				return `${typeof valueText !== 'undefined' ? valueText : value}`;
			}
		}
	},

	render: (props) => {
		const {
			activeClassName,
			children: values,
			currentValueText,
			decrementAriaLabel,
			handleDecrement,
			handleFlick,
			handleIncrement,
			index,
			incrementAriaLabel,
			min,
			max,
			step,
			value,
			valueId,
			...rest
		} = props;
		const isFirst = value <= min;
		const isLast = value >= max;

		return (
			<PickerRoot {...rest} onFlick={handleFlick}>
				<PickerButtonItem
					aria-controls={valueId}
					aria-disabled={isFirst}
					aria-label={decrementAriaLabel}
					className={css.itemDecrement}
					onClick={handleDecrement}
					disabled={isFirst}
				>
					<div className={css.label}>
						{isFirst ? '' :  clamp(min, max, Array.isArray(values) ? values[value - step] : value - step)}
					</div>
				</PickerButtonItem>
				<div
					aria-valuetext={currentValueText}
					className={activeClassName}
					id={valueId}
					role="spinbutton"
				>
					<div className={css.label}>
						<PickerViewManager index={index}>
							{values}
						</PickerViewManager>
					</div>
				</div>
				<PickerButtonItem
					aria-controls={valueId}
					aria-disabled={isLast}
					aria-label={incrementAriaLabel}
					className={css.itemIncrement}
					onClick={handleIncrement}
					disabled={isLast}
				>
					<div className={css.label}>
						{isLast ? '' : clamp(min, max, Array.isArray(values) ? values[value + step] : value + step)}
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
	PickerDecorator
};
export PickerItem from './PickerItem';
