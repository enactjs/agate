/**
 * Agate styled item with a label below.
 *
 * @example
 * <LabeledItem label="Label">Hello LabeledItem</LabeledItem>
 *
 * @module agate/LabeledItem
 * @exports LabeledItem
 * @deprecated
 */

import deprecate from '@enact/core/internal/deprecate';
import React from 'react';

import Icon from '../Icon';
import Item from '../Item';

/**
 * An item with a label.
 *
 * @class LabeledItem
 * @memberof agate/LabeledItem
 * @extends agate/Item.Item
 * @ui
 * @deprecated
 * @public
 */
const LabeledItemBase = deprecate(
	({children, titleIcon, ...rest}) => (
		<Item {...rest}>
			{children}
			{titleIcon ? (
				<Icon size="small">{titleIcon}</Icon>
			) : null}
		</Item>
	),
	{
		name: 'LabeledItem',
		replacedBy: 'Item'
	}
);

export default LabeledItemBase;
export {
	LabeledItemBase as LabeledItem,
	LabeledItemBase
};
