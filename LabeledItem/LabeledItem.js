/**
 * Agate styled item with a label below.
 *
 * @example
 * <LabeledItem label="Label">Hello LabeledItem</LabeledItem>
 *
 * @module agate/LabeledItem
 * @exports LabeledItem
 * @deprecated
 * @private
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
 * @private
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
		name: 'agate/LabeledItem',
		replacedBy: 'agate/Item',
		until: '2.0.0'
	}
);

export default LabeledItemBase;
export {
	LabeledItemBase as LabeledItem,
	LabeledItemBase
};
