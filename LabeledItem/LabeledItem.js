/**
 * Agate styled item with a label below.
 *
 * @example
 * <LabeledItem label="Label">Hello LabeledItem</LabeledItem>
 *
 * @module agate/LabeledItem
 * @exports LabeledItem
 * @exports LabeledItemBase
 */

import deprecate from '@enact/core/internal/deprecate';
import React from 'react';

import Icon from '../Icon';
import Item from '../Item';

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
