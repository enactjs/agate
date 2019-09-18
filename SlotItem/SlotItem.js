import React from 'react';

import Item from '../Item';

// eslint-disable-next-line enact/prop-types
const SlotItemBase = (props) => (
	<Item {...props} />
);

export default SlotItemBase;
export {
	SlotItemBase as SlotItem,
	SlotItemBase
};
