/**
 * Agate styled item with a label below.
 *
 * @example
 * <LabeledItem label="Label">Hello LabeledItem</LabeledItem>
 *
 * @module agate/LabeledItem
 * @exports LabeledItem
 * @exports LabeledItemBase
 * @deprecated Will be removed in 2.0.0. Use {@link agate/Item} instead.
 * @private
 */

import deprecate from '@enact/core/internal/deprecate';

import Icon from '../Icon';
import Item from '../Item';

/**
 * An item with a label.
 *
 * @class LabeledItem
 * @memberof agate/LabeledItem
 * @extends agate/Item.Item
 * @ui
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
