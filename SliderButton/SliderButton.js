/**
 * Provides an Agate-themed button group.
 *
 * @example
 * <SliderButton>{['Light Speed', 'Ridiculous Speed', 'Ludicrous Speed']}</SliderButton>
 *
 * @module agate/SliderButton
 * @exports SliderButton
 * @exports SliderButtonBase
 * @exports SliderButtonDecorator
 */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import Pure from '@enact/ui/internal/Pure';
import compose from 'ramda/src/compose';
import {Cell, Row} from '@enact/ui/Layout';
import UiSlider from '@enact/ui/Slider';
import PropTypes from 'prop-types';

import Skinnable from '../Skinnable';

import SliderButtonBehaviorDecorator from './SliderButtonBehaviorDecorator';

import componentCss from './SliderButton.module.less';

/**
 * Renders the slider knob.
 *
 * @class SliderKnob
 * @memberof agate/SliderButton
 * @ui
 * @private
 */
const SliderKnob = kind({
	name: 'SliderKnob',
	propTypes: /** @lends agate/SliderButton.SliderKnob.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Value of SliderButton.
		 *
		 * @type {Number}
		 * @public
		 */
		value: PropTypes.number
	},
	styles: {
		css: componentCss,
		className: 'knob'
	},
	computed: {
		style: ({style, value}) => {
			// const factor = Math.abs((value - Math.round(value))) / 4;
			return {
				'--knob-value': value,
				// transform: `scale(${1 + factor}, ${1 - factor})`,
				...style
			};
		}
	},
	render: ({...rest}) => {
		delete rest.value;
		// eslint-disable-next-line enact/prop-types
		delete rest.tooltipComponent;
		return (
			<div
				{...rest}
			/>
		);
	}
});

/**
 * Renders the slider progress.
 *
 * @class SliderProgress
 * @memberof agate/SliderButton
 * @ui
 * @private
 */
const SliderProgress = kind({
	name: 'SliderProgress',
	propTypes: /** @lends agate/SliderButton.SliderProgress.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Value of SliderProgress.
		 *
		 * @type {String[]}
		 * @public
		 */
		values: PropTypes.arrayOf(PropTypes.string)
	},
	styles: {
		css: componentCss,
		className: 'track'
	},
	render: ({children, css, values, ...rest}) => {
		// eslint-disable-next-line enact/prop-types
		delete rest.progressAnchor;
		// eslint-disable-next-line enact/prop-types
		delete rest.backgroundProgress;
		return (
			<Row {...rest} align="center">
				{children}
				{values ? values.map(child => (
					<Cell className={css.client} key={child}>
						{child}
					</Cell>
				)) : null}
			</Row>
		);
	}
});

/**
 * Renders the base level DOM structure of the component.
 *
 * @class SliderButtonBase
 * @memberof agate/SliderButton
 * @extends ui/Slider.Slider
 * @ui
 * @public
 */
const SliderButtonBase = kind({
	name: 'SliderButton',
	propTypes: /** @lends agate/SliderButton.SliderButtonBase.prototype */ {
		/**
		 * The value options of SliderButtonBase.
		 *
		 * @type {Array}
		 * @required
		 * @public
		 */
		children: PropTypes.array.isRequired,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object
	},
	styles: {
		css: componentCss,
		className: 'sliderButton',
		publicClassNames: true
	},
	computed: {
		max: ({children}) => (children && children.length ? children.length - 1 : 0),
		style: ({children, style}) => {
			return {
				'--sliderbutton-item-count': (children && children.length || 0),  // We're adding 1 here because it's more of a JS neuance that we want to abstract away from the styling.
				...style
			};
		}
	},
	render: ({css, children, max, ...rest}) => {
		return (
			<UiSlider
				{...rest}
				css={css}
				knobComponent={
					<SliderKnob css={css} />
				}
				progressBarComponent={
					<SliderProgress values={children} />
				}
				step={1}
				min={0}
				max={max}
			/>
		);
	}
});

/**
 * Agate specific behaviors to apply to [SliderButton]{@link agate/SliderButton.SliderButtonBase}.
 *
 * @hoc
 * @memberof agate/SliderButton
 * @mixes ui/Changeable.Changeable
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const SliderButtonDecorator = compose(
	Pure,
	Changeable,
	SliderButtonBehaviorDecorator,
	Spottable,
	Skinnable
);

/**
 * Renders a slider that appears as a series of connected buttons.
 *
 * @class SliderButton
 * @memberof agate/SliderButton
 * @extends agate/SliderButton.SliderButtonBase
 * @mixes agate/SliderButton.SliderButtonDecorator
 * @ui
 * @public
 */
const SliderButton = SliderButtonDecorator(SliderButtonBase);

export default SliderButton;
export {
	SliderButton,
	SliderButtonBase,
	SliderButtonDecorator
};
