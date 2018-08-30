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

import Spottable from '@enact/spotlight/Spottable';
import {ItemBase as AgateItemBase, ItemDecorator as UiItemDecorator} from '@enact/ui/Item';
import {MarqueeDecorator} from '@enact/moonstone/Marquee';
import Pure from '@enact/ui/internal/Pure';
import compose from 'ramda/src/compose';
import React from 'react';

import componentCss from './Item.less';
import Skinnable from '../Skinnable';

/**
 * A agate-ez-styled item.
 *
 * @class ItemBase
 * @memberof agate-ez/Item
 * @ui
 * @public
 */
const ItemBase = (props) => (
	<AgateItemBase
		{...props}
		css={componentCss}
	/>
);

/**
 * Agate specific item behaviors to apply to `Item`.
 *
 * @class ItemDecorator
 * @hoc
 * @memberof agate/Item
 * @mixes spotlight.Spottable
 * @mixes moonstone/Marquee.MarqueeDecorator
 * @mixes agate/Skinnable
 * @ui
 * @public
 */
const ItemDecorator = compose(
	Pure,
	UiItemDecorator,
	Spottable,
	MarqueeDecorator({invalidateProps: ['inline', 'autoHide']}),
	Skinnable
);

const Item = ItemDecorator(ItemBase);

export default Item;
export {
	Item,
	ItemBase
};
