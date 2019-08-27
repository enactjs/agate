/**
 * Agate styled item with an icon and a label below.
 *
 * @example
 * <SliderItem decrementIcon="minus" incrementIcon="plus" />
 *
 * @module agate/SliderItem
 * @exports SliderItem
 * @exports SliderItemBase
 */

import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import Pure from '@enact/ui/internal/Pure';
import Changeable from '@enact/ui/Changeable';
import Touchable from '@enact/ui/Touchable';
import Spottable from '@enact/spotlight/Spottable';
import React from 'react';

import Skinnable from '../Skinnable';
import {SliderBase} from '../Slider';
import {emitChange} from '../Slider/utils';
import {SlotItemBase} from '../SlotItem';

import SliderButton from './SliderButton';
import componentCss from './SliderItem.module.less';

const Slider = Spottable(Skinnable(SliderBase));

const sliderButtonDisabled = ({disabled, min, max, value = min}) => disabled || (max ? value >= max : value <= min);

/**
 * A focusable component that combines marquee-able text content with a synchronized
 * marquee-able text label.
 *
 * @class SliderItemBase
 * @memberof agate/SliderItem
 * @extends agate/Item.ItemBase
 * @mixes spotlight/Spottable.Spottable
 * @mixes ui/Touchable.Touchable
 * @mixes agate/Marquee.MarqueeController
 * @ui
 * @public
 */
const SliderItemBase = kind({
	name: 'SliderItem',

	propTypes: /** @lends agate/SliderItem.SliderItemBase.prototype */ {
		/**
		 * The node to be displayed as the main content of the item.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		children: PropTypes.node.isRequired,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `labeledItem` - The root class name
		 * * `icon` - Applied to the icon
		 * * `label` - Applied to the label
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The icon to be displayed on the left.
		 *
		 * @type {String}
		 * @public
		 */
		decrementIcon: PropTypes.string,

		/**
		 * The icon to be displayed on the left.
		 *
		 * @type {String}
		 * @public
		 */
		incrementIcon: PropTypes.string,

		/**
		 * The label to be displayed along with the text.
		 *
		 * @type {Node}
		 * @public
		 */
		label: PropTypes.node
	},

	defaultProps: {
		backgroundProgress: 0,
		max: 100,
		min: 0,
		noFill: false,
		orientation: 'horizontal',
		step: 1,
		tooltip: false
	},

	styles: {
		css: componentCss,
		className: 'iconItem',
		publicClassNames: true
	},

	handlers: {
		onDecrement: emitChange(-1),
		onIncrement: emitChange(1)
	},

	computed: {
		slotBefore: ({css, decrementIcon, disabled, min, onDecrement, value}) => decrementIcon ? <SliderButton
			className={css.decrementButton}
			disabled={sliderButtonDisabled({disabled, min, value})}
			onTap={onDecrement}
		>
			{decrementIcon}
		</SliderButton> : null,
		slotAfter: ({css, disabled, incrementIcon, max, min, onIncrement, value}) => incrementIcon ? <SliderButton
			className={css.incrementButton}
			disabled={sliderButtonDisabled({disabled, min, max, value})}
			onTap={onIncrement}
		>
			{incrementIcon}
		</SliderButton> : null
	},

	render: ({active,
		'aria-hidden': ariaHidden,
		backgroundProgress,
		css,
		decrementAriaLabel,
		decrementDisabled,
		decrementIcon,
		disabled,
		focused,
		id,
		incrementAriaLabel,
		incrementDisabled,
		incrementIcon,
		knobStep,
		max,
		min,
		noFill,
		onActivate,
		onChange,
		onDecrement,
		onDecrementSpotlightDisappear,
		onDragEnd,
		onDragStart,
		onIncrement,
		onIncrementSpotlightDisappear,
		onSpotlightDisappear,
		orientation,
		spotlightDisabled,
		step,
		tooltip,
		value,
		...rest
	}) => {
		delete rest.onDecrement;
		delete rest.onIncrement;
		delete rest.decrementIcon;
		delete rest.incrementIcon;

		return (
			<SlotItemBase
				{...rest}
			>
				<Slider
					active={active}
					aria-hidden={ariaHidden}
					backgroundProgress={backgroundProgress}
					className={css.slider}
					disabled={disabled}
					focused={focused}
					id={id}
					knobStep={knobStep}
					max={max}
					min={min}
					noFill={noFill}
					onActivate={onActivate}
					onChange={onChange}
					onDragEnd={onDragEnd}
					onDragStart={onDragStart}
					onSpotlightDisappear={onSpotlightDisappear}
					orientation={orientation}
					spotlightDisabled={spotlightDisabled}
					step={step}
					tooltip={tooltip}
					value={value}
				/>
			</SlotItemBase>
		);
	}
});

const SliderItemDecorator = compose(
	Changeable,
	Spottable,
	Pure,
	Touchable,
	Skinnable
);

/**
 * A Agate styled labeled item with built-in support for marqueed text.
 *
 * @class SliderItem
 * @memberof agate/SliderItem
 * @extends agate/SliderItem.SliderItemBase
 * @ui
 * @public
 */
const SliderItem = SliderItemDecorator(SliderItemBase);

export default SliderItem;
export {SliderItem, SliderItemBase};
