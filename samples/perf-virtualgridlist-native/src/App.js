import ImageItem from '@enact/agate/ImageItem';
import ThemeDecorator from '@enact/agate/ThemeDecorator';
import {VirtualGridList} from '@enact/agate/VirtualList';
import ri from '@enact/ui/resolution';
import {useCallback, useEffect, useRef} from 'react';

const items = [];

for (let i = 0; i < 1000; i++) {
	const count = ('00' + i).slice(-3);
	items.push({
		text: 'Item ' + count,
		subText: 'SubItem ' + count
	});
}

const VirtualGridListNativeSample = (props) => {
	const scrollToRef = useRef(null);

	useEffect(() => {
		scrollToRef.current({animate: false, focus: true, index: 19});
	}, []);

	const getScrollTo = useCallback((scrollTo) => {
		scrollToRef.current = scrollTo;
	}, []);

	const renderItem = useCallback(({index, ...rest}) => {
		return (
			<ImageItem
				{...rest}
				label={items[index].subText}
			>
				{items[index].text}
			</ImageItem>
		);
	}, []);

	return (
		<VirtualGridList
			{...props}
			cbScrollTo={getScrollTo}
			dataSize={items.length}
			itemRenderer={renderItem}
			itemSize={{minWidth: ri.scale(312), minHeight: ri.scale(300)}} // FHD: 312 x 300, UHD: 624 x 600
		/>
	);
};

export default ThemeDecorator(VirtualGridListNativeSample);
