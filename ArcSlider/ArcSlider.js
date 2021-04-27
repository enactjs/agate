/**
 * Agate styled arc slider components and behaviors.
 *
 * @example
 * <ArcSlider />
 *
 * @module agate/ArcSlider
 * @exports ArcSlider
 * @exports ArcSliderBase
 * @exports ArcSliderDecorator
 */

import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import {clamp} from '@enact/core/util';
import Spottable from '@enact/spotlight/Spottable';
import Pure from '@enact/ui/internal/Pure';
import ri from '@enact/ui/resolution';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Arc from '../Arc';
import {angleToPosition} from '../Arc/utils';
import Skinnable from '../Skinnable';
import {ThemeContext} from '../ThemeDecorator';

import ArcSliderBehaviorDecorator from './ArcSliderBehaviorDecorator';
import {valueToAngle} from './utils';

import css from './ArcSlider.module.less';

/**
 * An arc slider component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [ArcSlider]{@link agate/ArcSlider.ArcSlider}.
 *
 * @class ArcSliderBase
 * @memberof agate/ArcSlider
 * @ui
 * @public
 */
const ArcSliderBase = kind({
	name: 'ArcSlider',

	propTypes: /** @lends agate/ArcSlider.ArcSliderBase.prototype */ {
		/**
		 * Overrides the `aria-valuetext` for the ArcSlider. By default, `aria-valuetext` is set
		 * to the current value.
		 *
		 * @type {String|Number}
		 * @public
		 */
		'aria-valuetext': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

		/**
		 * The color of the background arc.
		 *
		 * @type {String}
		 * @default #000000
		 * @public
		 */
		backgroundColor: PropTypes.string,

		/**
		 * Function that generates a reference to the arc svg.
		 *
		 * @type {Object|Function}
		 * @public
		 */
		componentRef: EnactPropTypes.ref,

		/**
		 * Whether or not the component is in a disabled state.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The end angle(in degrees) of the arc slider.
		 *
		 * The value should be between 0 and 360 and should be greater than startAngle.
		 *
		 * @type {Number}
		 * @default 250
		 * @public
		 */
		endAngle: PropTypes.number,

		/**
		 * The color of the foreground arc.
		 *
		 * @type {String}
		 * @default #0000ff
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
		 * The maximum value of the slider and should be greater than min.
		 *
		 * @type {Number}
		 * @default 100
		 * @public
		 */
		max: PropTypes.number,

		/**
		 * The minimum value of the slider.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		min: PropTypes.number,

		/**
		 * The radius of the arc circle.
		 *
		 * @type {Number}
		 * @default 150
		 * @public
		 */
		radius: PropTypes.number,

		/*
		 * State of possible skin variants.
		 *
		 * Used to set backgroundColor and foregroundColor.
		 *
		 * @type {Object}
		 * @private
		 */
		skinVariants: PropTypes.object,

		/**
		 * Nodes to be inserted in the center of the ArcSlider.
		 *
		 * @type {Node}
		 * @public
		 */
		slotCenter: PropTypes.node,

		/**
		 * The start angle(in degrees) of the arc slider.
		 *
		 * The value should be between 0 and 360.
		 *
		 * @type {Number}
		 * @default 30
		 * @public
		 */
		startAngle: PropTypes.number,

		/**
		 * The amount to increment or decrement the value.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		step: PropTypes.number,

		/**
		 * The stroke width of the arc slider.
		 *
		 * @type {Number}
		 * @default 6
		 * @public
		 */
		strokeWidth: PropTypes.number,

		/**
		 * The value of the slider.
		 *
		 * Defaults to the value of `min`.
		 *
		 * @type {Number}
		 * @public
		 */
		value: PropTypes.number
	},

	defaultProps: {
		endAngle: 250,
		max: 100,
		min: 0,
		radius: 150,
		startAngle: 30,
		step: 1,
		strokeWidth: 6
	},

	contextType: ThemeContext,

	styles: {
		css,
		className: 'arcSlider'
	},

	computed: {
		size : ({radius, strokeWidth}) => (radius * 2 - strokeWidth),
		style: ({radius, style}) => {
			const size = ri.scaleToRem(radius * 2);
			return {...style, height: size, width: size};
		},
		circleRadius: ({isFocused}) => isFocused ? 20 : 15,
		backgroundColor: ({backgroundColor, skinVariants}) => backgroundColor || (skinVariants && skinVariants.night ? '#444444' : '#888888'),
		foregroundColor: ({foregroundColor, skinVariants}) => foregroundColor || (skinVariants && skinVariants.night ? '#ffffff' : '#000000')
	},

	render: ({'aria-valuetext': ariaValuetext, backgroundColor, componentRef, circleRadius, disabled, endAngle, foregroundColor, max, min, radius, size, slotCenter, startAngle, strokeWidth, value, ...rest}) => {
		const valueAngle = valueToAngle(clamp(min, max, value), min, Math.max(min, max), startAngle, endAngle);
		const knobPosition = angleToPosition(valueAngle, radius - (strokeWidth / 2), size);

		delete rest.skinVariants;
		delete rest.step;

		return (
			// eslint-disable-next-line jsx-a11y/role-has-required-aria-props
			<div aria-disabled={disabled} aria-valuetext={ariaValuetext || value} role="slider" {...rest} disabled={disabled}>
				<Arc
					className={css.arc}
					color={backgroundColor}
					endAngle={endAngle}
					radius={radius}
					startAngle={valueAngle}
					strokeWidth={strokeWidth}
				/>
				<Arc
					className={css.arc}
					color={foregroundColor}
					endAngle={valueAngle}
					radius={radius}
					startAngle={startAngle}
					strokeWidth={strokeWidth}
					pointerEvents="auto"
					componentRef={componentRef}
				>
					<circle
						cx={knobPosition.x}
						cy={knobPosition.y}
						fill={foregroundColor}
						r={ri.scaleToRem(circleRadius)}
					/>
				</Arc>
				<div className={css.valueDisplay}>
					{slotCenter}
				</div>
			</div>
		);
	}
});

/**
 * Applies Agate specific behaviors to [ArcSliderBase]{@link agate/ArcSlider.ArcSliderBase} components.
 *
 * @hoc
 * @memberof agate/ArcSlider
 * @mixes agate/ArcSlider.ArcSliderBehaviorDecorator
 * @mixes ui/Touchable.Touchable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ArcSliderDecorator = compose(
	Pure,
	ArcSliderBehaviorDecorator,
	Touchable,
	Spottable,
	Skinnable({variantsProp: 'skinVariants'})
);

/**
 * An arc slider component, ready to use in Agate applications.
 *
 * Usage:
 * ```
 * <ArcSlider backgroundColor="blue" endAngle={200} foregroundColor="red" radius={150} startAngle={0} step={2} />
 * ```
 *
 * @class ArcSlider
 * @memberof agate/ArcSlider
 * @extends agate/ArcSlider.ArcSliderBase
 * @mixes agate/ArcSlider.ArcSliderDecorator
 * @ui
 * @public
 */
const ArcSlider = ArcSliderDecorator(ArcSliderBase);

export default ArcSlider;
export {
	ArcSlider,
	ArcSliderBase,
	ArcSliderDecorator
};
