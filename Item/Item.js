/**
 * Provides Agate-ez-themed item components and behaviors. Useful for content in lists.
 *
 * @example
 * <Item>Hello Enact!</Item>
 *
 * @module agate-ez/Item
 * @exports Item
 * @exports ItemBase
 */

import {ItemBase as AgateItemBase, ItemDecorator} from '@enact/ui/Item';
import React from 'react';


import componentCss from './Item.less';

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

const Item = ItemDecorator(ItemBase);

export default Item;
export {
	Item,
	ItemBase
};
