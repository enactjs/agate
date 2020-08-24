import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import ri from '@enact/ui/resolution';
import {storiesOf} from '@storybook/react';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList';

import ImageItem from '@enact/agate/ImageItem';
import VirtualList, {VirtualGridList} from '@enact/agate/VirtualList';

const VirtualGridListConfig = mergeComponentMetadata('VirtualGridList', UiVirtualListBasic, VirtualGridList, VirtualList);

const
	wrapOption = {
		false: false,
		true: true,
		'&quot;noAnimation&quot;': 'noAnimation'
	},
	prop = {
		direction: {horizontal: 'horizontal', vertical: 'vertical'},
		scrollBarOption: ['auto', 'hidden', 'visible']
	},
	items = [],
	defaultDataSize = 1000,
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

storiesOf('Agate', module)
	.add(
		'VirtualList.VirtualGridList',
		() => {
			return (
				<VirtualGridList
					dataSize={updateDataSize(number('dataSize', VirtualGridListConfig, defaultDataSize))}
					direction={select('direction', prop.direction, VirtualGridListConfig)}
					focusableScrollbar={boolean('focusableScrollbar', VirtualGridListConfig)}
					horizontalScrollbar={select('horizontalScrollBar', prop.scrollBarOption, VirtualGridListConfig)}
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
					verticalScrollbar={select('verticalScrollBar', prop.scrollBarOption, VirtualGridListConfig)}
					wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], VirtualGridListConfig)]}
				/>
			);
		},
		{
			props: {
				noScroller: true
			},
			text: 'Basic usage of VirtualGridList'
		}
	);

