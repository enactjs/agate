import Item from '../../../../Item';
import VirtualList from '../../../../VirtualList';
import React from 'react';
import ri from "@enact/ui/resolution";

// eslint-disable-next-line enact/prop-types, enact/display-name
const items = ['Item 000', 'Item 001', 'Item 002', 'Item 003', 'Item 004', 'Item 005', 'Item 006', 'Item 007', 'Item 008', 'Item 009'];
const renderItem = () => ({index, ...rest}) => {
	const itemStyle = {
		borderBottom: ri.unit(6, 'rem') + ' solid #202328',
		boxSizing: 'border-box',
		height: ri.unit(144, 'rem')
	};

	return (
		<Item {...rest} style={itemStyle}>
			{items[index]}
		</Item>
	);
};

const VirtualListTests = [
	<VirtualList dataSize={10} itemSize={ri.scale( 144)} itemRenderer={renderItem(ri.scale(144))} />
];
export default VirtualListTests;
