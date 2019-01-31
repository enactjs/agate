import {ItemBase, ItemDecorator} from '../Item';
import kind from '@enact/core/kind';
import React from 'react';
import {SlotItem} from '@enact/ui/SlotItem';

import componentCss from './ThumbnailItem.module.less';

const ThumbnailItemBase = kind({
	name: 'ThumbnailItem',

	styles: {
		css: componentCss,
		className: 'thumbnailItem',
		publicClassNames: true
	},

	render: ({children, css, src, ...rest}) => {
		return (
			<SlotItem
				component={ItemBase}
				{...rest}
			>
				<slotBefore>
					<img
						className={css.thumbnail}
						src={src}
					/>
				</slotBefore>
				<div className={css.content}>
					{children}
				</div>
			</SlotItem>
		);
	}
});

const ThumbnailItem = ItemDecorator(ThumbnailItemBase);

export default ThumbnailItem;
export {
	ThumbnailItem,
	ThumbnailItemBase
};
