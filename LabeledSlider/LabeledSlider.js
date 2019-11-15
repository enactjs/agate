/**
 * An interactive numeric range picker with increment decrement labels
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

import Icon from '../Icon';
import Skinnable from '../Skinnable';
import Slider from '../Slider/';

import componentCss from './LabeledSlider.module.less';

const Text = ({children, ...rest}) => (<div {...rest}>{children}</div>);

const renderLabel = (label, className, Component) => {
	return (
		<div className={className}>
			{typeof label === 'string' && <Component>{label}</Component> || label}
		</div>
	);
};

const getLabel = (labelIcon, labelText, className) => {
	if (labelIcon || labelText) {
		return labelIcon ?
			renderLabel(labelIcon, className, Icon) :
			renderLabel(labelText, className, Text);
	} else {
		return null;
	}
};

/**
 * A stateless Slider with IconButtons or texts to increment and decrement the value. In most circumstances,
 * you will want to use the stateful version: {@link moonstone/LabeledSlider.LabeledSlider}.
 *
 * @class LabeledSliderBase
 * @memberof moonstone/LabeledSlider
 * @extends moonstone/Slider.Slider
 * @extends moonstone/Icon.Icon
 * @mixes moonstone/Skinnable.Skinnable
 * @mixes spotlight/Spottable.Slottable
 * @ui
 * @public
 */
const LabeledSliderBase = kind({
	name: 'LabeledSlider',

	propTypes: /** @lends moonstone/LabeledSlider.LabeledSliderBase.prototype */ {
		/**
		 * Assign a custom icon for the decrementer. All strings supported by [Icon]{@link moonstone/Icon.Icon} are
		 * supported.
		 *
		 * @type {String|Component}
		 * @public
		 */
		decrementIcon: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node
		]),

		/**
		 * Assign a custom text or a a node for the decrementer.
		 *
		 * @type {String|Component}
		 * @public
		 */
		decrementText: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node
		]),

		/**
		 * Assign a custom icon for the incrementer. All strings supported by [Icon]{@link moonstone/Icon.Icon} are
		 * supported.
		 *
		 * @type {String|Component}
		 * @public
		 */
		incrementIcon: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node
		]),

		/**
		 * Assign a custom text or a node for the incrementer.
		 *
		 * @type {String|Component}
		 * @public
		 */
		incrementText: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node
		])
	},

	styles: {
		css: componentCss,
		className: 'labeledSlider',
		publicClassNames: ['labeledSlider']
	},

	computed: {
		className: ({decrementIcon, incrementIcon, styler}) => styler.append({icons: !!(decrementIcon && incrementIcon)}),
		decrementLabel: ({decrementIcon, decrementText}) => (
			getLabel(decrementIcon, decrementText, decrementIcon ? componentCss.decrementIcon : componentCss.decrementText)
		),
		incrementLabel: ({incrementIcon, incrementText}) => (
			getLabel(incrementIcon, incrementText, incrementIcon ? componentCss.incrementIcon : componentCss.incrementText)
		)
	},

	render: ({
		className,
		decrementLabel,
		incrementLabel,
		style,
		...rest
	}) => {
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
					css={componentCss}
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
	LabeledSlider,
	LabeledSliderBase
};
