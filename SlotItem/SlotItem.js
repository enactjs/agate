import deprecate from '@enact/core/internal/deprecate';
import React from 'react';

import Item from '../Item';

const SlotItemBase = deprecate(
	(props) => (
		<Item {...props} />
	),
	{
		name: 'SlotItem',
		replacedBy: 'Item'
	}
);

export default SlotItemBase;
export {
	SlotItemBase as SlotItem,
	SlotItemBase
};
