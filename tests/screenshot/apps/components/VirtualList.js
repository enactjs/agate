import Item from '../../../../Item';
import VirtualList from '../../../../VirtualList';
import React from 'react';

const items = [];
const renderItem = () => ({index}) => {
	return (
		<Item>
			{items[index]}
		</Item>
	);
};

const VirtualListTests = [
	<VirtualList dataSize={10} itemSize={144} itemRenderer={renderItem} />
];
export default VirtualListTests;
