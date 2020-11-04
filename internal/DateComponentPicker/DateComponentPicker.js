import kind from '@enact/core/kind';
import {mapAndFilterChildren} from '@enact/core/util';
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import PropTypes from 'prop-types';
import React from 'react';

import PickerCore from '../Picker';

import css from './DateComponentPicker.module.less';

const Picker = Spottable(PickerCore);

/**
 * {@link agate/internal/DataComponentPicker.DateComponentPickerBase} allows the selection of one
 * part of the date or time using a {@link agate/internal/Picker.Picker}.
 *
 * @class DateComponentPickerBase
 * @memberof agate/internal/DateComponentPicker
 * @ui
 * @private
 */
const DateComponentPickerBase = kind({
	name: 'DateComponentPicker',

	propTypes: /** @lends agate/internal/DateComponentPicker.DateComponentPickerBase.prototype */ {
		/**
		 * Display values representing the `value` to select
		 *
		 * @type {String[]}
		 * @required
		 * @public
		 */
		children: PropTypes.arrayOf(PropTypes.string).isRequired,

		/**
		 * The value of the date component
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		value: PropTypes.number.isRequired,

		/**
		 * Sets the hint string read when focusing the picker.
		 *
		 * @type {String}
		 * @public
		 */
		accessibilityHint: PropTypes.string,

		/**
		 * Overrides the `aria-valuetext` for the picker. By default, `aria-valuetext` is set
		 * to the current selected child and accessibilityHint text.
		 *
		 * @type {String}
		 * @public
		 */
		'aria-valuetext': PropTypes.string,

		/*
		 * When `true`, allow the picker to continue from the opposite end of the list of options.
		 *
		 * @type {Boolean}
		 * @public
		 */
		wrap: PropTypes.bool
	},

	styles: {
		css,
		className: 'dateComponentPicker'
	},

	computed: {
		children: ({children}) => mapAndFilterChildren(children, (child) => (
			<div>{child}</div>
		)),
		max: ({children}) => React.Children.count(children) - 1
	},

	render: ({accessibilityHint, 'aria-valuetext': ariaValuetext, children, max, value, wrap, ...rest}) => (
		<Picker
			{...rest}
			css={css}
			accessibilityHint={accessibilityHint}
			aria-valuetext={(accessibilityHint == null) ? ariaValuetext : null}
			index={value}
			max={max}
			min={0}
			orientation="vertical"
			step={1}
			value={value}
			wrap={wrap}
		>
			{children}
		</Picker>
	)
});

/**
 * {@link agate/internal/DateComponentPickerBase.DateComponentPicker} allows the selection of one part of
 * the date (date, month, or year). It is a stateful component but allows updates by providing a new
 * `value` via props.
 *
 * @class DateComponentPicker
 * @memberof agate/internal/DateComponentPicker
 * @mixes ui/Changeable.Changeable
 * @ui
 * @private
 */
const DateComponentPicker = Changeable(
	DateComponentPickerBase
);

export default DateComponentPicker;
export {
	DateComponentPicker,
	DateComponentPickerBase
};
