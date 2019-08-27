/**
 * Provides Agate-ez-themed item components and behaviors. Useful for content in lists.
 *
 * @example
 * <Item>Hello Enact!</Item>
 *
 * @module agate/Item
 * @exports Item
 * @exports ItemBase
 */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {ItemBase as UiItemBase, ItemDecorator as UiItemDecorator} from '@enact/ui/Item';
import {MarqueeDecorator} from '@enact/ui/Marquee';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import componentCss from './Item.module.less';
import Skinnable from '../Skinnable';

/**
 * A agate-ez-styled item.
 *
 * @class ItemBase
 * @memberof agate-ez/Item
 * @ui
 * @public
 */
const ItemBase = kind({
	name: 'Item',

	propTypes: /** @lends moonstone/Item.ItemBase.prototype */ {
		/**
		 * Enable an outline style of of focus.
		 *
		 * @type {Object}
		 * @public
		 */
		outlineFocus: PropTypes.bool,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `item` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object
	},

	styles: {
		css: componentCss,
		publicClassNames: 'item'
	},

	computed: {
		className: ({outlineFocus, styler}) => styler.append({outlineFocus})
	},

	render: ({css, ...rest}) => {
		delete rest.outlineFocus;

		return (
			<UiItemBase
				data-webos-voice-intent="Select"
				{...rest}
				css={css}
			/>
		);
	}
});

/**
 * Agate specific item behaviors to apply to `Item`.
 *
 * @class ItemDecorator
 * @hoc
 * @memberof agate/Item
 * @mixes spotlight.Spottable
 * @mixes ui/Marquee.MarqueeDecorator
 * @mixes agate/Skinnable
 * @ui
 * @public
 */
const ItemDecorator = compose(
	Pure,
	UiItemDecorator,
	Spottable,
	MarqueeDecorator({className: componentCss.content, invalidateProps: ['inline', 'autoHide']}),
	Skinnable
);

const Item = ItemDecorator(ItemBase);

export default Item;
export {
	Item,
	ItemBase,
	ItemDecorator
};
