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

import React from 'react';

import Icon from '../Icon';
import Item from '../Item';

// eslint-disable-next-line enact/prop-types
const LabeledItemBase = ({children, titleIcon, ...rest}) => (
	<Item {...rest}>
		{children}
		{titleIcon ? (
			<Icon size="small">{titleIcon}</Icon>
		) : null}
	</Item>
);

export default LabeledItemBase;
export {
	LabeledItemBase as LabeledItem,
	LabeledItemBase
};
