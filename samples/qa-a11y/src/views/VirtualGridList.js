/* eslint-disable react/jsx-no-bind */

import CheckboxItem from '@enact/agate/CheckboxItem';
import Header from '@enact/agate/Header';
import ImageItem from '@enact/agate/ImageItem';
import {VirtualGridList} from '@enact/agate/VirtualList';
import ri from '@enact/ui/resolution';
import {useState} from 'react';

const items = [];

const svgGenerator = (width, height, bgColor, textColor, customText) => (
	`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
	`%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E` +
	`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
);

// eslint-disable-next-line enact/prop-types
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
			'hd': svgGenerator(200, 200, color, 'ffffff', `Image ${i}`),
			'fhd': svgGenerator(300, 300, color, 'ffffff', `Image ${i}`),
			'uhd': svgGenerator(600, 600, color, 'ffffff', `Image ${i}`)
		};

	items.push({caption, label, src});
}

const VirtualGridListView = () => {
	const [native, setNative] = useState(true);
	const [horizontal, setHorizontal] = useState(false);
	const [customAriaLabel, setCustomAriaLabel] = useState(false);
	const scrollMode = native ? 'native' : 'translate';

	const handleToggleScrollMode = () => setNative(!native);
	const handleToggleOrientation = () => setHorizontal(!horizontal);
	const handleChangeAriaLabelButton = () => setCustomAriaLabel(!customAriaLabel);

	return (
		<>
			<Header title="VirtualGridList">
				<CheckboxItem
					onToggle={handleChangeAriaLabelButton}
					selected={customAriaLabel}
					style={{width: '350px'}} // FIXME: If no width, then the text doesn't display.
				>
					Customizable aria-labels on ScrollThumbs
				</CheckboxItem>
				<CheckboxItem
					onToggle={handleToggleOrientation}
					selected={horizontal}
					style={{width: '300px'}} // FIXME: If no width, then the text doesn't display.
				>
					Horizontal
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
