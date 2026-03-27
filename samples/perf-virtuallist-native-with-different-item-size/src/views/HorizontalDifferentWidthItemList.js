import Item from '@enact/agate/Item';
import {VirtualList} from '@enact/agate/VirtualList';
import {checkPropTypes} from '@enact/core/util';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';

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
	spacing = 30,
	paddingSize = ri.scale(24);

const itemStyleDefault = {
	height: '100%',
	fontSize,
	lineHeight,
	whiteSpace: 'pre'
};

const innerItemStyleDefault = {
	writingMode: 'vertical-rl'
};

const getArrayItems = () => {
	let position = 0, arrayItemSize = [], arrayItems = [];
	for (let i = 0; i < numOfItems; i++) {
		const
			numOfLines = Math.ceil(Math.random() * 6),
			width = numOfLines * oneLineSize + paddingSize;

		arrayItems.push({
			title: (`${('00' + i).slice(-3)} | ${position}px | ${languages[i % 10]}\n`).repeat(numOfLines),
			width
		});
		arrayItemSize.push(width);
		position += (width + spacing);
	}

	return {arrayItemSize, arrayItems};
};

const DifferentWidthItem = (props) => {
	checkPropTypes(DifferentWidthItem, props);
	const {index, items, style: itemStyleFromList, ...rest} = props;
	const
		{title: children, width} = items[index],
		itemStyle = {...itemStyleDefault, ...itemStyleFromList, width: width + 'px'};

	return (
		<Item {...rest} style={itemStyle}>
			<div style={innerItemStyleDefault}>
				{children}
			</div>
		</Item>
	);
};

DifferentWidthItem.propTypes = {
	index: PropTypes.number,
	items: PropTypes.array
};

const HorizontalDifferenctWidthItemList = (props) => {
	const [{arrayItems: items, arrayItemSize: itemSize}] = useState(() => getArrayItems());

	const renderItem = useCallback((renderProps) => {
		return <DifferentWidthItem {...renderProps} />;
	}, []);

	return (
		<VirtualList
			{...props}
			childProps={{
				items: items
			}}
			dataSize={items.length}
			direction="horizontal"
			itemRenderer={renderItem}
			itemSize={{
				minSize: oneLineSize,
				size: itemSize
			}}
			scrollMode="native"
			spacing={spacing}
			style={{height: '300px', paddingBottom: `${ri.scale(36)}px`}}
		/>
	);
};

export default HorizontalDifferentWidthItemList;
