/* eslint-disable react/jsx-no-bind */

import CheckboxItem from '@enact/agate/CheckboxItem';
import Header from '@enact/agate/Header';
import Item from '@enact/agate/Item';
import {VirtualList} from '@enact/agate/VirtualList';
import ri from '@enact/ui/resolution';
import React from 'react';

const items = [];
// eslint-disable-next-line enact/prop-types, enact/display-name
const renderItem = ({index, ...rest}) => (
	<Item {...rest}>
		{items[index]}
	</Item>
);

for (let i = 0; i < 100; i++) {
	items.push('Item ' + ('00' + i).slice(-3));
}

const VirtualListView = () => {
	const [native, setNative] = React.useState(true);
	const [customAriaLabel, setCustomAriaLabel] = React.useState(false);
	const scrollMode = native ? 'native' : 'translate';

	const handleToggleScrollMode = () => setNative(!native);
	const handleChangeAriaLabelButton = () => setCustomAriaLabel(!customAriaLabel);

	return (
		<>
			<Header title="VirtualList">
				<CheckboxItem
					onToggle={handleChangeAriaLabelButton}
					selected={customAriaLabel}
					style={{width: '350px'}} // FIXME: If no width, then the text doesn't display.
				>
					Customizable aria-labels on ScrollThumbs
				</CheckboxItem>
				<CheckboxItem
					onClick={handleToggleScrollMode}
					selected={native}
					style={{width: '250px'}} // FIXME: If no width, then the text doesn't display.
				>
					Native
				</CheckboxItem>
			</Header>
			<VirtualList
				dataSize={items.length}
				focusableScrollbar
				itemRenderer={renderItem}
				itemSize={ri.scale(78)}
				scrollDownAriaLabel={customAriaLabel ? 'This is vertical scroll down aria label' : null}
				scrollMode={scrollMode}
				scrollUpAriaLabel={customAriaLabel ? 'This is horizontal scroll up aria label' : null}
				style={{height: 'calc(100% - 130px'}}
			/>
		</>
	);
};

export default VirtualListView;
