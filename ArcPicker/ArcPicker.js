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

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Arc from '../Arc';
import {Marquee, MarqueeController} from '../Marquee';
import Skinnable from '../Skinnable';
import {ThemeContext} from '../ThemeDecorator';

import ArcPickerBehaviorDecorator from './ArcPickerBehaviorDecorator';

import css from './ArcPicker.module.less';

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
		 * @type {Array}
		 * @required
		 * @public
		 */
		children: PropTypes.array.isRequired,

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
		 * Whether or not the component is focused.
		 *
		 * @type {Boolean}
		 * @private
		 */
		isFocused: PropTypes.bool,

		/**
		 * Determines what triggers the marquee to start its animation.
		 *
		 * @type {('focus'|'hover'|'render')}
		 * @public
		 */
		marqueeOn: PropTypes.oneOf(['focus', 'hover', 'render']),

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
		marqueeOn: 'render',
		radius: 150,
		startAngle: 50,
		strokeWidth: 6
	},

	contextType: ThemeContext,

	styles: {
		css,
		className: 'arcPicker'
	},

	computed: {
		arcSegments: (props, context) => {
			const {accent: accentColor} = context || {};
			const {backgroundColor, children, endAngle, foregroundColor, isFocused, onClick, radius, selectionType, startAngle, strokeWidth, value} = props;

			if (!Array.isArray(children)) return [];
			return (
				children.map((option, index) => {
					// Calc `arcStartAngle`, `arcEndAngle` based on `startAngle` and `endAngle` for every <Arc />
					const pauseAngle = 2;
					const arcSegments = children.length;
					const arcStartAngle = startAngle + (endAngle - startAngle) / arcSegments * index;
					const arcEndAngle = startAngle + (endAngle - startAngle) / arcSegments * (index + 1) - pauseAngle;
					const color = (selectionType === 'cumulative' && value > option || value === option) ? (isFocused && accentColor || foregroundColor) : backgroundColor;

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

	render: ({arcSegments, disabled, marqueeOn, slotCenter, value, ...rest}) => {
		delete rest.backgroundColor;
		delete rest.children;
		delete rest.endAngle;
		delete rest.foregroundColor;
		delete rest.isFocused;
		delete rest.onClick;
		delete rest.selectionType;
		delete rest.startAngle;

		return (
			// eslint-disable-next-line jsx-a11y/role-has-required-aria-props
			<div aria-disabled={disabled} aria-valuetext={value} role="slider" {...rest} disabled={disabled}>
				{arcSegments}
				<Marquee className={css.valueDisplay} marqueeOn={marqueeOn} alignment="center">{slotCenter}</Marquee>
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
	MarqueeController({marqueeOnFocus: true}),
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
