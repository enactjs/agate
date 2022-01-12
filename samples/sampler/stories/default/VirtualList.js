import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList';
import Item from '@enact/agate/Item';
import VirtualList from '@enact/agate/VirtualList';

import css from './VirtualList.module.less';

const
	wrapOption = {
		false: false,
		true: true,
		'&quot;noAnimation&quot;': 'noAnimation'
	},
	prop = {
		scrollbarOption: ['auto', 'hidden', 'visible'],
		scrollModeOption: ['native', 'translate']
	},
	items = [],
	defaultDataSize = 1000,
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = (size) => ({index, ...rest}) => {
		const itemStyle = {
			height: ri.unit(size, 'rem')
		};

		return (
			<Item {...rest} className={index === items.length - 1 ? css.lastItem : css.item} style={itemStyle}>
				{items[index]}
			</Item>
		);
	};

const updateDataSize = (dataSize) => {
	const
		itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		items.push('Item ' + (headingZeros + i).slice(-itemNumberDigits));
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

VirtualList.displayName = 'VirtualList';
const VirtualListConfig = mergeComponentMetadata('VirtualList', UiVirtualListBasic, VirtualList);

export default {
	title: 'Agate/VirtualList',
	component: 'VirtualList'
};

export const _VirtualList = (args) => {
	return (
		<VirtualList
			className={css.virtualList}
			dataSize={updateDataSize(args['dataSize'])}
			focusableScrollbar={args['focusableScrollbar']}
			horizontalScrollbar={args['horizontalScrollbar']}
			itemRenderer={renderItem(ri.scale(args['itemSize']))}
			itemSize={ri.scale(args['itemSize'])}
			key={args['scrollMode']}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			scrollMode={args['scrollMode']}
			spacing={ri.scale(args['spacing'])}
			spotlightDisabled={args['spotlightDisabled']}
			verticalScrollbar={args['verticalScrollbar']}
			wrap={wrapOption[args['wrap']]}
		/>
	);
};
number('dataSize', _VirtualList, VirtualListConfig, defaultDataSize);
boolean('focusableScrollbar', _VirtualList, VirtualListConfig);
select('horizontalScrollbar', _VirtualList, prop.scrollbarOption, VirtualListConfig);
number('itemSize', _VirtualList, VirtualListConfig, 144);
select('scrollMode', _VirtualList, prop.scrollModeOption, VirtualListConfig);
number('spacing', _VirtualList, VirtualListConfig);
boolean('spotlightDisabled', _VirtualList, VirtualListConfig, false);
select('verticalScrollbar', _VirtualList, prop.scrollbarOption, VirtualListConfig);
select('wrap', _VirtualList, ['false', 'true', '"noAnimation"'], VirtualListConfig);
_VirtualList.storyName = 'VirtualList';
_VirtualList.parameters = {
	info: {
		text: 'Basic usage of VirtualList'
	},
	props: {
		noScroller: true
	}
};
