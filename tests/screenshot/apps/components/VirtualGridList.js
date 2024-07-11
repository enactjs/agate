import ri from '@enact/ui/resolution';

import ImageItem from '../../../../ImageItem';
import img from '../../images/600x600.png';
import {VirtualGridList} from '../../../../VirtualList';

import {withConfig} from './utils';

const items = [];
const defaultDataSize = 10;

const renderItem = ({index, ...rest}) => {
	const {caption, label, src} = items[index];

	return (
		<ImageItem
			{...rest}
			label={label}
			src={src}
		>
			{caption}
		</ImageItem>
	);
};

const updateDataSize = (dataSize) => {
	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const
			count = ('00' + i).slice(-3),
			caption = `Item ${count}`,
			label = `SubItem ${count}`,
			src = img;

		items.push({caption, label, src});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

const VirtualGridListTests = [
	// horizontal VGL with visible horizontalScrollbar
	<div>
		<VirtualGridList
			dataSize={items.length}
			direction="horizontal"
			horizontalScrollbar="visible"
			itemRenderer={renderItem}
			itemSize={{
				minWidth: ri.scale(180),
				minHeight: ri.scale(270)
			}}
			style={{height: ri.scale(300)}}
		/>
	</div>,
	// vertical VGL with visible verticalScrollbar
	<div>
		<VirtualGridList
			dataSize={items.length}
			direction="vertical"
			itemRenderer={renderItem}
			itemSize={{
				minWidth: ri.scale(180),
				minHeight: ri.scale(270)
			}}
			verticalScrollbar="visible"
		/>
	</div>,
	// horizontal VGL with hidden horizontalScrollbar
	<div>
		<VirtualGridList
			dataSize={items.length}
			direction="horizontal"
			horizontalScrollbar="hidden"
			itemRenderer={renderItem}
			itemSize={{
				minWidth: ri.scale(180),
				minHeight: ri.scale(270)
			}}
			style={{height: ri.scale(300)}}
		/>
	</div>,
	// vertical VGL with hidden verticalScrollbar
	<div>
		<VirtualGridList
			dataSize={items.length}
			direction="vertical"
			itemRenderer={renderItem}
			itemSize={{
				minWidth: ri.scale(180),
				minHeight: ri.scale(270)
			}}
			verticalScrollbar="hidden"
		/>
	</div>,
	// horizontal VGL with spacing
	<div>
		<VirtualGridList
			dataSize={items.length}
			direction="horizontal"
			itemRenderer={renderItem}
			itemSize={{
				minWidth: ri.scale(180),
				minHeight: ri.scale(270)
			}}
			spacing={ri.scale(60)}
			style={{height: ri.scale(300)}}
		/>
	</div>,
	// vertical VGL with spacing
	<div>
		<VirtualGridList
			dataSize={items.length}
			direction="vertical"
			itemRenderer={renderItem}
			itemSize={{
				minWidth: ri.scale(180),
				minHeight: ri.scale(270)
			}}
			spacing={ri.scale(60)}
		/>
	</div>,

	// RTL locale
	...withConfig({locale: 'ar-SA'}, [
		<div>
			<VirtualGridList
				dataSize={items.length}
				direction="horizontal"
				itemRenderer={renderItem}
				itemSize={{
					minWidth: ri.scale(180),
					minHeight: ri.scale(270)
				}}
				style={{height: ri.scale(300)}}
			/>
		</div>,
		<div>
			<VirtualGridList
				dataSize={items.length}
				direction="vertical"
				itemRenderer={renderItem}
				itemSize={{
					minWidth: ri.scale(180),
					minHeight: ri.scale(270)
				}}
			/>
		</div>
	])
];

export default VirtualGridListTests;
