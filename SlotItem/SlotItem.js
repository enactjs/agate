import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {ItemDecorator as UiItemDecorator} from '@enact/ui/Item';
import {MarqueeDecorator} from '@enact/ui/Marquee';
import Pure from '@enact/ui/internal/Pure';
import UiSlotItem from '@enact/ui/SlotItem';
import compose from 'ramda/src/compose';
import React from 'react';

import {ItemBase} from '../Item';
import Skinnable from '../Skinnable';

import componentCss from './SlotItem.module.less';

const SlotItemBase = kind({
	name: 'SlotItem',

	render: (props) => {
		return (
			<UiSlotItem
				{...props}
				component={ItemBase}
				css={componentCss}
			/>
		);
	}
});

const SlotItemDecorator = compose(
	Pure,
	UiItemDecorator,
	Spottable,
	MarqueeDecorator({className: componentCss.content, invalidateProps: ['inline', 'autoHide']}),
	Skinnable
);

const SlotItem = SlotItemDecorator(SlotItemBase);

export default SlotItem;
export {
	SlotItem,
	SlotItemBase
};
