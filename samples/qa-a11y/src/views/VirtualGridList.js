/* eslint-disable react/jsx-no-bind */

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
	const [customAriaLabel, setCustomAriaLabel] = React.useState(false);
	const scrollMode = native ? 'native' : 'translate';

	const handleToggleScrollMode = () => setNative(!native);
	const handleToggleOrientation = () => setHorizontal(!horizontal);
	const handleChangeAriaLabelButton = () => setCustomAriaLabel(!customAriaLabel);

	return (
		<>
			<Header title="VirtualGridList">
				<CheckboxItem
					onToggle={handleToggleOrientation}
					selected={horizontal}
					style={{width: '300px'}} // FIXME: If no width, then the text doesn't display.
				>
					Horizontal
				</CheckboxItem>
				<CheckboxItem
					onToggle={handleChangeAriaLabelButton}
					selected={customAriaLabel}
					style={{width: '350px'}} // FIXME: If no width, then the text doesn't display.
				>
					Customizable aria-labels on ScrollThumbs
				</CheckboxItem>
				<CheckboxItem
					onToggle={handleToggleScrollMode}
					selected={native}
					style={{width: '250px'}} // FIXME: If no width, then the text doesn't display.
				>
					Native
				</CheckboxItem>
			</Header>

			<VirtualGridList
				dataSize={items.length}
				direction={horizontal ? 'horizontal' : 'vertical'}
				focusableScrollbar
				itemRenderer={renderItem}
				itemSize={{
					minWidth: ri.scale(339),
					minHeight: ri.scale(339)
				}}
				scrollDownAriaLabel={customAriaLabel ? 'This is vertical scroll down aria label' : null}
				scrollMode={scrollMode}
				scrollUpAriaLabel={customAriaLabel ? 'This is horizontal scroll up aria label' : null}
				style={{height: 'calc(100% - 130px'}}
			/>
		</>
	);
};

export default VirtualGridListView;
