import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ri from '@enact/ui/resolution';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList';
import ImageItem from '@enact/agate/ImageItem';
import {VirtualGridList} from '@enact/agate/VirtualList';

import {svgGenerator} from '../helper/svg';

const VirtualGridListConfig = mergeComponentMetadata('VirtualGridList', UiVirtualListBasic, VirtualGridList);

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
			src = svgGenerator(300, 300, color, 'ffffff', `Image ${i}`);

		items.push({text, src});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

export default {
	title: 'Agate/VirtualList.VirtualGridList',
	component: 'VirtualList.VirtualGridList'
};

export const _VirtualGridList = (args) => {
	return (
		<VirtualGridList
			dataSize={updateDataSize(args['dataSize'])}
			direction={args['direction']}
			focusableScrollbar={args['focusableScrollbar']}
			horizontalScrollbar={args['horizontalScrollBar']}
			itemRenderer={renderItem}
			itemSize={{
				minWidth: ri.scale(args['minWidth']),
				minHeight: ri.scale(args['minHeight'])
			}}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			spacing={ri.scale(args['spacing'])}
			spotlightDisabled={args['spotlightDisabled']}
			verticalScrollbar={args['verticalScrollBar']}
			wrap={wrapOption[args['wrap']]}
		/>
	);
};

number('dataSize', _VirtualGridList, VirtualGridListConfig, defaultDataSize);
select('direction', _VirtualGridList, prop.direction, VirtualGridListConfig);
boolean('focusableScrollbar', _VirtualGridList, VirtualGridListConfig);
select('horizontalScrollBar', _VirtualGridList, prop.scrollBarOption, VirtualGridListConfig);
number('minWidth', _VirtualGridList, VirtualGridListConfig, 180);
number('minHeight', _VirtualGridList, VirtualGridListConfig, 270);
number('spacing', _VirtualGridList, VirtualGridListConfig, 20);
boolean('spotlightDisabled', _VirtualGridList, VirtualGridListConfig, false);
select('verticalScrollBar', _VirtualGridList, prop.scrollBarOption, VirtualGridListConfig);
select('wrap', _VirtualGridList, ['false', 'true', '"noAnimation"'], VirtualGridListConfig);

_VirtualGridList.storyName = 'VirtualList.VirtualGridList';
_VirtualGridList.parameters = {
	info: {
		text: 'Basic usage of VirtualGridList'
	},
	props: {
		noScroller: true
	}
};
