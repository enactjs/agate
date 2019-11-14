/**
 * An interactive numeric range picker with increment decrement
 *
 * @example
 * <LabeledSlider
 *   decrementIcon="minus"
 *   defaultValue={-25}
 *   incrementIcon="plus"
 *   knobStep={25}
 *   max={100}
 *   min={-100}
 *   step={5}
 * />
 *
 * @module moonstone/LabeledSlider
 * @exports LabeledSlider
 * @exports LabeledSliderBase
 */

import kind from '@enact/core/kind';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';
import Slider from '../Slider/Slider';

import componentCss from './LabeledSlider.module.less';

/**
 * A stateless Slider with IconButtons to increment and decrement the value. In most circumstances,
 * you will want to use the stateful version: {@link moonstone/LabeledSlider.LabeledSlider}.
 *
 * @class LabeledSliderBase
 * @memberof moonstone/LabeledSlider
 * @extends moonstone/Slider.SliderBase
 * @mixes moonstone/Skinnable.Skinnable
 * @mixes spotlight/Spottable.Spottable
 * @ui
 * @public
 */
const LabeledSliderBase = kind({
	name: 'LabeledSlider',

	propTypes: /** @lends moonstone/LabeledSlider.LabeledSliderBase.prototype */ {
		/**
		 * Assign a custom icon for the decrementer. All strings supported by [Icon]{@link moonstone/Icon.Icon} are
		 * supported. Without a custom icon, the default is used, and is automatically changed when
		 * [vertical]{@link moonstone/LabeledSlider.LabeledSlider#vertical} is changed.
		 *
		 * @type {String}
		 * @public
		 */
		decrementIcon: PropTypes.node,

		/**
		 * Assign a custom icon for the incrementer. All strings supported by [Icon]{@link moonstone/Icon.Icon} are
		 * supported. Without a custom icon, the default is used, and is automatically changed when
		 * [vertical]{@link moonstone/LabeledSlider.LabeledSlider#vertical} is changed.
		 *
		 * @type {String}
		 * @public
		 */
		incrementIcon: PropTypes.node
	},

	defaultProps: {
		decrementLabel: null,
		incrementLabel: null,
		orientation: 'horizontal'
	},

	styles: {
		css: componentCss,
		className: 'labeledSlider',
		publicClassNames: ['labeledSlider']
	},

	computed: {
		className: ({decrementIcon, incrementIcon, orientation, styler}) => styler.append(orientation, {icons: !!(decrementIcon && incrementIcon)}),
		decrementLabel: ({decrementIcon, decrementText}) => ((decrementIcon || decrementText) ?
			<div className={decrementIcon && componentCss.decrementIcon || componentCss.decrementText}>
				{decrementIcon || decrementText}
			</div> : null
		),
		incrementLabel: ({incrementIcon, incrementText}) => ((incrementIcon || incrementText) ?
			<div className={incrementIcon && componentCss.incrementIcon || componentCss.incrementText}>
				{incrementIcon || incrementText}
			</div> : null
		)
	},

	render: ({
		className,
		decrementLabel,
		incrementLabel,
		orientation,
		style,
		...rest
	}) => {
		const icons = rest.decrementIcon && rest.incrementIcon && true;

		delete rest.decrementIcon;
		delete rest.decrementText;
		delete rest.incrementIcon;
		delete rest.incrementText;

		return (
			<div className={className} style={style}>
				{decrementLabel}
				<Slider
					{...rest}
					className={componentCss.slider}
				/>
				{incrementLabel}
			</div>
		);
	}
});

const LabeledSliderDecorator = compose(
	Skinnable,
	Slottable({slots: ['decrementIcon', 'decrementText', 'incrementIcon', 'incrementText']})
);

const LabeledSlider = LabeledSliderDecorator(LabeledSliderBase);

export default LabeledSlider;
export {
	LabeledSliderBase as LabeledSlider,
	LabeledSliderBase
};
