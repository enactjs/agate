import Item from '@enact/agate/Item';
import {VirtualList} from '@enact/agate/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';

const
	languages = [
		'한국어 - 한국',
		'English - United States',
		'Português - Brasil',
		'Português - Portugal',
		'Čeština - Česká republika',
		'Dansk - Danmark',
		'Deutsch - Deutschland',
		'Ελληνική γλώσσα - Ελλάδα',
		'Español - España',
		'Suomi - Suomi'
	],
	numOfItems = 100,
	fontSize = `${ri.scale(15)}px`,
	oneLineSize = ri.scale(30),
	lineHeight = `${oneLineSize}px`,
	spacing = 30;

const itemStyleDefault = {
	fontSize,
	lineHeight
};

const DifferenctHeightItem = ({index, items, style: itemStyleFromList, ...rest}) => {
	const {title: children, height} = items[index],
		itemStyle = {...itemStyleDefault, ...itemStyleFromList, height};

	return (
		<Item {...rest} style={itemStyle}>
			{children}
		</Item>
	);
};

DifferenctHeightItem.propTypes = {
	index: PropTypes.number,
	items: PropTypes.array
};

const VerticalDifferentHeightItemList = (props) => {
	const [items, setItems] = useState([]);
	const [itemSize, setItemSize] = useState([]);

	useEffect(() => {
		let position = 0, arrayItemSize = [], arrayItems = [];
		for (let i = 0; i < numOfItems; i++) {
			const
				numOfLines = Math.ceil(Math.random() * 6),
				height = numOfLines * oneLineSize;

			arrayItems.push({
				title: (`${('00' + i).slice(-3)} - ${position}px - ${languages[i % 10]}\n`).repeat(numOfLines),
				height
			});
			arrayItemSize.push(height);
			position += (height + spacing);
		}

		setItems(arrayItems);
		setItemSize(arrayItemSize);
	}, []);

	const renderItem = useCallback((renderProps) => {
		return <DifferenctHeightItem {...renderProps} />;
	}, []);

	return (
		<VirtualList
			{...props}
			childProps={{
				items: items
			}}
			dataSize={items.length}
			itemRenderer={renderItem}
			itemSize={{
				minSize: oneLineSize,
				size: itemSize
			}}
			scrollMode="native"
			spacing={spacing}
			style={{height: '300px', paddingRight: `${ri.scale(18)}px`}}
		/>
	);
};

export default VerticalDifferentHeightItemList;
