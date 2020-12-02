/**
 * Agate styled arc picker components and behaviors.
 *
 * @example
 * <ArcPicker backgroundColor="#cccccc">
 * 	{[1,2,3,4,5]}
 * </ArcPicker>
 *
 * @module agate/ArcPicker
 * @exports ArcPicker
 * @exports ArcPickerBase
 * @exports ArcPickerDecorator
 */

import {forward} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Arc from '../Arc';
import Skinnable from '../Skinnable';

import ArcPickerBehaviorDecorator from './ArcPickerBehaviorDecorator';

import css from './ArcPicker.module.less';

const isDown = is('down');
const isUp = is('up');

/**
 * An Agate component for displaying an arc picker.
 * This component is most often not used directly but may be composed within another component as it
 * is within [ArcPicker]{@link agate/ArcPicker.ArcPicker}.
 *
 * @class ArcPickerBase
 * @memberof agate/ArcPicker
 * @ui
 * @public
 */
const ArcPickerBase = kind({
	name: 'ArcPickerBase',

	propTypes: /** @lends agate/ArcPicker.ArcPickerBase.prototype */ {
		/**
		 * The value options of ArcPicker.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		children: PropTypes.node.isRequired,

		/**
		 * The color of the unselected arcs.
		 *
		 * @type {String}
		 * @default #eeeeee
		 * @public
		 */
		backgroundColor: PropTypes.string,

		/**
		 * Whether or not the component is in a disabled state.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The end angle(in degrees) of the arc.
		 *
		 * The value should be between 0 and 360 and should be greater than startAngle.
		 *
		 * @type {Number}
		 * @default 310
		 * @public
		 */
		endAngle: PropTypes.number,

		/**
		 * The color of the selected arcs.
		 *
		 * @type {String}
		 * @default #444444
		 * @public
		 */
		foregroundColor: PropTypes.string,

		/**
		 * Called when the path area is clicked.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onClick: PropTypes.func,

		/**
		 * The radius of the arc circle.
		 *
		 * @type {Number}
		 * @default 150
		 * @public
		 */
		radius: PropTypes.number,

		/**
		 * The selection type of ArcPicker.
		 *
		 * @type {('cumulative'|'single')}
		 * @public
		 */
		selectionType: PropTypes.oneOf(['cumulative', 'single']),

		/**
		 * Nodes to be inserted in the center of the ArcPicker.
		 *
		 * @type {Node}
		 * @public
		 */
		slotCenter: PropTypes.node,

		/**
		 * The start angle(in degrees) of the arc.
		 *
		 * The value should be between 0 and 360.
		 *
		 * @type {Number}
		 * @default 50
		 * @public
		 */
		startAngle: PropTypes.number,

		/**
		 * The stroke width of the arc picker.
		 *
		 * @type {Number}
		 * @default 6
		 * @public
		 */
		strokeWidth: PropTypes.number,

		/**
		 * Value of ArcPicker.
		 *
		 * @type {Number|String}
		 * @public
		 */
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	},

	defaultProps: {
		backgroundColor: '#eeeeee',
		endAngle: 310,
		foregroundColor: '#444444',
		radius: 150,
		startAngle: 50,
		strokeWidth: 6
	},

	styles: {
		css,
		className: 'arcPicker'
	},

	handlers: {
		onKeyDown: (ev, props) => {
			const {children, disabled, onClick, value} = props;
			const index = children.findIndex(child => child === value);

			forward('onKeyDown', ev, props);

			if (!disabled) {
				if (isDown(ev.keyCode)) {
					onClick(children[Math.max(index - 1, 0)])(ev);
				} else if (isUp(ev.keyCode)) {
					onClick(children[Math.min(index + 1, children.length - 1)])(ev);
				}
			}
		}
	},

	computed: {
		arcSegments: (props) => {
			const {backgroundColor, children, endAngle, foregroundColor, onClick, radius, selectionType, startAngle, strokeWidth, value} = props;

			return (
				children.map((option, index) => {
					// Calc `arcStartAngle`, `arcEndAngle` based on `startAngle` and `endAngle` for every <Arc />
					const pauseAngle = 2;
					const arcSegments = children.length;
					const arcStartAngle = startAngle + (endAngle - startAngle) / arcSegments * index;
					const arcEndAngle = startAngle + (endAngle - startAngle) / arcSegments * (index + 1) - pauseAngle;

					const color = (selectionType === 'cumulative' && value > option || value === option) ? foregroundColor : backgroundColor;

					return (
						<Arc
							className={css.arc}
							color={color}
							endAngle={arcEndAngle}
							key={index}
							onClick={onClick(option)}
							radius={radius}
							startAngle={arcStartAngle}
							strokeWidth={strokeWidth}
						/>
					);
				}));
		},
		style: ({radius, style}) => {
			const size = ri.scaleToRem(radius * 2);
			return {...style, height: size, width: size};
		}
	},

	render: ({arcSegments, disabled, slotCenter, value, ...rest}) => {
		delete rest.backgroundColor;
		delete rest.children;
		delete rest.endAngle;
		delete rest.foregroundColor;
		delete rest.onClick;
		delete rest.selectionType;
		delete rest.startAngle;

		return (
			// eslint-disable-next-line jsx-a11y/role-has-required-aria-props
			<div aria-disabled={disabled} aria-valuetext={value} role="slider" {...rest} disabled={disabled}>
				{arcSegments}
				<div className={css.valueDisplay}>
					{slotCenter}
				</div>
			</div>
		);
	}
});

/**
 * Applies Agate specific behaviors to [ArcPickerBase]{@link agate/ArcPicker.ArcPickerBase} components.
 *
 * @hoc
 * @memberof agate/ArcPicker
 * @mixes ui/Changeable.Changeable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ArcPickerDecorator = compose(
	Changeable,
	ArcPickerBehaviorDecorator,
	Spottable,
	Skinnable
);

/**
 * An arc picker component, ready to use in Agate applications.
 *
 * Usage:
 * ```
 * <ArcPicker backgroundColor="#444444" endAngle={200} foregroundColor="#eeeeee" selectionType="single" startAngle={0} />
 * ```
 *
 * @class ArcPicker
 * @memberof agate/ArcPicker
 * @extends agate/ArcPicker.ArcPickerBase
 * @mixes agate/ArcPicker.ArcPickerDecorator
 * @ui
 * @public
 */
const ArcPicker = ArcPickerDecorator(ArcPickerBase);

export default ArcPicker;
export {
	ArcPicker,
	ArcPickerBase,
	ArcPickerDecorator
};
