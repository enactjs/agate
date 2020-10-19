import Item from "../../../../Item";
import VirtualList from '../../../../VirtualList';
import React from 'react';

const items = [];
const renderItem = (size) => ({index, ...rest}) => {

	return (
		<Item {...rest}>
			{items[index]}
		</Item>
	);
};

const VirtualListTests = [
	<VirtualList dataSize={10} itemSize={144} itemRenderer={renderItem} />
];
export default VirtualListTests;
