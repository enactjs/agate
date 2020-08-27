import CheckboxItem from '@enact/agate/CheckboxItem';
import Header from '@enact/agate/Header';
import ImageItem from '@enact/agate/ImageItem';
import {VirtualGridList} from '@enact/agate/VirtualList';
import ri from '@enact/ui/resolution';
import React from 'react';

const items = [];
// eslint-disable-next-line enact/prop-types, enact/display-name
const renderItem = ({index, ...rest}) => {
	const {caption, label, src} = items[index];

	return (
		<ImageItem
			{...rest}
			src={src}
			label={label}
		>
			{caption}
		</ImageItem>
	);
};

for (let i = 0; i < 100; i++) {
	const
		count = ('00' + i).slice(-3),
		caption = `Item ${count}`,
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
		label = `SubItem ${count}`,
		src = {
			'hd': `http://placehold.it/200x200/${color}/ffffff&text=Image ${i}`,
			'fhd': `http://placehold.it/300x300/${color}/ffffff&text=Image ${i}`,
			'uhd': `http://placehold.it/600x600/${color}/ffffff&text=Image ${i}`
		};

	items.push({caption, label, src});
}

const VirtualGridListView = () => {
	const [native, setNative] = React.useState(true);
	const [horizontal, setHorizontal] = React.useState(false);
	const scrollMode = native ? 'native' : 'translate';

	const onToggleScrollMode = () => setNative(!native);
	const onToggleOrientation = () => setHorizontal(!horizontal);

	return (
		<>
			<Header title="VirtualGridList">
				<CheckboxItem
					onToggle={onToggleOrientation}
					selected={horizontal}
					style={{width: '300px'}} // FIXME: If no width, then the text doesn't display.
				>
					Horizontal
				</CheckboxItem>
				<CheckboxItem
					onToggle={onToggleScrollMode}
					selected={native}
					style={{width: '250px'}} // FIXME: If no width, then the text doesn't display.
				>
					Native
				</CheckboxItem>
			</Header>

			<VirtualGridList
				dataSize={items.length}
				direction={horizontal ? 'horizontal' : 'vertical'}
				itemRenderer={renderItem}
				itemSize={{
					minWidth: ri.scale(678), // 606px(size of expanded ImageItem) + 36px(for shadow) * 2
					minHeight: ri.scale(678) // 606px(size of expanded ImageItem) + 36px(for shadow) * 2
				}}
				scrollMode={scrollMode}
				style={{height: 'calc(100% - 130px'}}
			/>
		</>
	);
};

export default VirtualGridListView;
