/**
 * Agate styled fan speed control components and behaviors.
 *
 * @example
 * <FanSpeedControl icon="fan" max={10} />
 *
 * @module agate/FanSpeedControl
 * @exports FanSpeedControl
 * @exports FanSpeedControlBase
 */

import kind from '@enact/core/kind';
import Changeable from '@enact/ui/Changeable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import ArcPicker from '../ArcPicker';
import Icon from '../Icon';
import Skinnable from '../Skinnable';

import css from './FanSpeedControl.module.less';

/**
 * An Agate component for displaying fan speed {@link agate/FanSpeedControl}.
 *
 * @class FanSpeedControlBase
 * @memberof agate/ArcPicker
 * @ui
 * @private
 */
const FanSpeedControlBase = kind({
	name: 'FanSpeedControlBase',

	propTypes: /** @lends agate/FanSpeedControl.FanSpeedControlBase.prototype */ {
		/**
		 * ArcPicker icon.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.string,

		/**
		 * The maximum value of FanSpeed.
		 *
		 * @type {Number}
		 * @public
		 */
		max: PropTypes.number,

		/**
		 * The minimum value of FanSpeed.
		 *
		 * @type {Number}
		 * @public
		 */
		min: PropTypes.number,

		/**
		 * Called when value is changed.
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * The maximum size of ArcPicker. The number of arc segments to be rendered.
		 *
		 * @type {Number}
		 * @public
		 */
		onClick: PropTypes.func,

		/**
		 * Value of ArcPicker.
		 *
		 * @type {Number}
		 * @public
		 */
		value: PropTypes.number
	},

	defaultProps: {
		value: 1
	},

	styles: {
		css,
		className: 'fanSpeedControl'
	},

	render ({icon, max, min, onChange, value, ...rest}) {
		const values = [];

		for (let i = min; i <= max; i++) {
			values.push(i);
		}

		return (
			<div {...rest}>
				<ArcPicker
					endAngle={312}
					max={max}
					min={min}
					onChange={onChange}
					options={values}
					selectionType="cumulative"
					value={value}
				>
					<Icon className={css.fanIcon} css={css}>{icon}</Icon>
					<span className={css.fanValue}>{value}</span>
				</ArcPicker>
			</div>
		);
	}
});

const FanSpeedControlDecorator = compose(
	Changeable,
	Skinnable
);

const FanSpeedControl = FanSpeedControlDecorator(FanSpeedControlBase);

export default FanSpeedControl;
export {
	FanSpeedControl,
	FanSpeedControlBase,
	FanSpeedControlDecorator
};
