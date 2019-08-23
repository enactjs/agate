/**
 * Provides Agate-ez-themed Item component and interactive radio toggle icon.
 *
 * @module agate-ez/RadioItem
 * @exports RadioItem
 */

import React from 'react';
import PropTypes from 'prop-types';

import kind from '@enact/core/kind';
import Icon from '../Icon';
import Skinnable from '../Skinnable';
import SlotItem from '../SlotItem';

import Spottable from '@enact/spotlight/Spottable';
import Toggleable from '@enact/ui/Toggleable';
import Touchable from '@enact/ui/Touchable';
import compose from 'ramda/src/compose';

import componentCss from './RadioItem.module.less';

/**
 * Renders an `Item` with a radio-dot component. Useful to show a selected state on an Item.
 *
 * @class RadioItem
 * @memberof agate-ez/RadioItem
 * @extends agate/RadioItem.RadioItem
 * @ui
 * @public
 */
const RadioItemBase = kind({
	name: 'RadioItemBase',

	propTypes: /** @lends agate/Divider.DividerBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `radioIcon` - Class name for the radio toggle icon
		 * * `radioItem` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Specifies on which side (`'before'` or `'after'`) of the text the icon appears.
		 *
		 * @type {('before'|'after')}
		 * @default 'before'
		 * @public
		 */
		iconPosition: PropTypes.oneOf(['before', 'after']),

		/**
		 * If true the radio toggle will be selected.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool
	},

	defaultProps: {
		iconPosition: 'before',
		selected: false
	},

	styles: {
		css: componentCss,
		className: 'radioItem',
		publicClassNames: true
	},

	computed: {
		className: ({css, selected, styler}) => styler.append(selected && css.selected),
		slotBefore: ({css, iconPosition}) => iconPosition === 'before' ? <Icon size="small" className={`${css.icon} ${css.iconBefore}`}>circle</Icon> : null,
		slotAfter: ({css, iconPosition}) => iconPosition === 'after' ? <Icon size="small" className={`${css.icon} ${css.iconAfter}`}>circle</Icon> : null
	},

	render: ({children, css, ...rest}) => {
		delete rest.iconPosition;
		delete rest.selected;

		return (
			<SlotItem {...rest} css={css}>
				<div
					className={css.text}
				>
					{children}
				</div>
			</SlotItem>
		);
	}
});


const RadioItemDecorator = compose(
	Toggleable({toggleProp: 'onTap'}),
	Touchable,
	Spottable,
	Skinnable
);

const RadioItem = RadioItemDecorator(RadioItemBase);

export default RadioItem;
export {
	RadioItem
};
