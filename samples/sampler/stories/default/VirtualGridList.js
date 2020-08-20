import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList';

import ImageItem from '@enact/agate/ImageItem';
import VirtualList, {VirtualGridList} from '@enact/agate/VirtualList';

const
	prop = {
		scrollbarOption: ['auto', 'hidden', 'visible']
	},
	items = [],
	defaultDataSize = 100,
	longContent = 'Lorem ipsum dolor sit amet',
	shouldAddLongContent = ({index, modIndex}) => (
		index % modIndex === 0 ? ` ${longContent}` : ''
	),
	// eslint-disable-next-line enact/prop-types
	renderItem = ({index, ...rest}) => {
		const {text, src} = items[index];

		return (
			<ImageItem
				{...rest}
				src={src}
			>
				{text}
			</ImageItem>
		);
	};

const updateDataSize = (dataSize) => {
	const
		itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const
			count = (headingZeros + i).slice(-itemNumberDigits),
			text = `Item ${count}${shouldAddLongContent({index: i, modIndex: 2})}`,
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			src = `http://placehold.it/300x300/${color}/ffffff&text=Image ${i}`;

		items.push({text, src});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

const VirtualGridListConfig = mergeComponentMetadata('VirtualGridList', UiVirtualListBasic, VirtualList, VirtualGridList);

storiesOf('Agate', module)
	.add(
		'VirtualList.VirtualGridList',
		() => (
			<VirtualGridList
				dataSize={updateDataSize(number('dataSize', VirtualGridListConfig, defaultDataSize))}
				focusableScrollbar={boolean('focusableScrollbar', VirtualGridListConfig)}
				horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, VirtualGridListConfig)}
				itemRenderer={renderItem}
				itemSize={{
					minWidth: ri.scale(number('minWidth', VirtualGridListConfig, 180)),
					minHeight: ri.scale(number('minHeight', VirtualGridListConfig, 270))
				}}
				noScrollByWheel={boolean('noScrollByWheel', VirtualGridListConfig)}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				spacing={ri.scale(number('spacing', VirtualGridListConfig, 20))}
				spotlightDisabled={boolean('spotlightDisabled', VirtualGridListConfig, false)}
				verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, VirtualGridListConfig)}
			/>
		),
		{
			text: 'Basic usage of VirtualGridList'
		}
	);
