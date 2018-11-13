import Item from '../Item';
import kind from '@enact/core/kind';
import React from 'react';
import {SlotItem} from '@enact/ui/SlotItem';

import componentCss from './ThumbnailItem.less';

const ThumbnailItem = kind({
	name: 'ThumbnailItem',
	styles: {
		css: componentCss,
		className: 'thumbnailItem',
		publicClassNames: true
	},
	render: ({children, css, src, ...rest}) => {
		return (
			<SlotItem
				component={Item}
				{...rest}
			>
				<slotBefore>
					<img
						className={css.thumbnail}
						src={src}
					/>
				</slotBefore>
				<div className={css.title}>
					{children}
				</div>
			</SlotItem>
		);
	}
});

export default ThumbnailItem;
export {ThumbnailItem};
