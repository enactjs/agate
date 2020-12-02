/**
 * Agate styled fan speed control components and behaviors.
 *
 * @example
 * <FanSpeedControl icon="fan" max={5} min={1} />
 *
 * @module agate/FanSpeedControl
 * @exports FanSpeedControl
 * @exports FanSpeedControlBase
 * @exports FanSpeedControlDecorator
 */

import kind from '@enact/core/kind';
import {extractAriaProps} from '@enact/core/util';
import Changeable from '@enact/ui/Changeable';
import PropTypes from 'prop-types';
import {compose, range} from 'ramda';
import React from 'react';

import ArcPicker from '../ArcPicker';
import Icon from '../Icon';
import Skinnable from '../Skinnable';

import css from './FanSpeedControl.module.less';

/**
 * An Agate component for displaying fan speed.
 * This component is most often not used directly but may be composed within another component as it
 * is within [FanSpeedControl]{@link agate/FanSpeedControl.FanSpeedControl}.
 *
 * @class FanSpeedControlBase
 * @memberof agate/FanSpeedControl
 * @extends agate/ArcPicker.ArcPicker
 * @ui
 * @public
 */
const FanSpeedControlBase = kind({
	name: 'FanSpeedControlBase',

	propTypes: /** @lends agate/FanSpeedControl.FanSpeedControlBase.prototype */ {
		/**
		 * FanSpeedControl icon.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.string,

		/**
		 * The maximum value of FanSpeedControl.
		 *
		 * @type {Number}
		 * @public
		 */
		max: PropTypes.number,

		/**
		 * The minimum value of FanSpeedControl.
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
		 * Called when the path area is clicked.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onClick: PropTypes.func,

		/**
		 * Value of FanSpeedControl.
		 *
		 * @type {Number}
		 * @default 1
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

	computed: {
		children: ({min, max}) => range(min, max + 1),
		className: ({icon, styler}) => styler.append({noIcon: !icon})
	},

	render: ({children, disabled, icon, max, min, onChange, value, ...rest}) => {
		const ariaProps = extractAriaProps(rest);

		return (
			<div {...rest}>
				<ArcPicker
					{...ariaProps}
					disabled={disabled}
					endAngle={312}
					max={max}
					min={min}
					onChange={onChange}
					selectionType="cumulative"
					slotCenter={
						<>
							<Icon className={css.fanIcon} css={css}>{icon}</Icon>
							<span className={css.fanValue}>{value}</span>
						</>
					}
					value={value}
				>{children}</ArcPicker>
			</div>
		);
	}
});

/**
 * Applies Agate specific behaviors to [FanSpeedControlBase]{@link agate/FanSpeedControl.FanSpeedControlBase} components.
 *
 * @hoc
 * @memberof agate/FanSpeedControl
 * @mixes ui/Changeable.Changeable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const FanSpeedControlDecorator = compose(
	Changeable,
	Skinnable
);

/**
 * FanSpeedControl with Agate styling and
 * [`FanSpeedControlDecorator`]{@link agate/FanSpeedControl.FanSpeedControlDecorator} applied.
 *
 * Usage:
 * ```
 * <FanSpeedControl
 *   icon="fan"
 *   max={10}
 *   min={1}
 *   value={4}
 * />
 * ```
 *
 * @class FanSpeedControl
 * @memberof agate/FanSpeedControl
 * @extends agate/FanSpeedControl.FanSpeedControlBase
 * @mixes agate/FanSpeedControl.FanSpeedControlDecorator
 * @ui
 * @public
 */
const FanSpeedControl = FanSpeedControlDecorator(FanSpeedControlBase);

export default FanSpeedControl;
export {
	FanSpeedControl,
	FanSpeedControlBase,
	FanSpeedControlDecorator
};
