import React from 'react';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {Cell, Row} from '@enact/ui/Layout';
import UiSlider from '@enact/ui/Slider';

import Skinnable from '../Skinnable';

import componentCss from './SliderButton.module.less';

const SliderKnob = kind({
	name: 'SliderKnob',
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
	render: ({css, factor, size, value, ...rest}) => {
		delete rest.tooltipComponent;
		delete rest.orientation;
		delete rest.proportion;
		return (
			<div
				{...rest}
			/>
		);
	}
});

const SliderProgress = kind({
	name: 'SliderProgress',
	styles: {
		css: componentCss,
		className: 'track'
	},
	render: ({children, css, values, ...rest}) => {
		delete rest.backgroundProgress;
		delete rest.orientation;
		delete rest.progress;
		delete rest.progressAnchor;

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

const SliderButtonBase = kind({
	name: 'SliderButton',
	propTypes: {
		children: PropTypes.array.isRequired
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


const SliderButtonDecorator = compose(
	Pure,
	Spottable,
	Skinnable
);


const SliderButton = SliderButtonDecorator(SliderButtonBase);


export default SliderButton;
export {
	SliderButton,
	SliderButtonBase,
	SliderButtonDecorator
};
