/**
 * Provides an Agate-themed thumbnail item.
 *
 * @example
 * <ThumbnailItem src="https://dummyimage.com/64/e048e0/0011ff">An image!</ThumbnailItem>
 *
 * @module agate/ThumbnailItem
 * @exports ThumbnailItem
 * @exports ThumbnailItemBase
 */

import {ItemBase, ItemDecorator} from '../Item';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import {SlotItem} from '@enact/ui/SlotItem';

import componentCss from './ThumbnailItem.module.less';

/**
 * A stateless, unfocusable item that can display a thumbnail.
 *
 * @class ThumbnailItemBase
 * @memberof agate/ThumbnailItem
 * @extends ui/SlotItem.SlotItem
 * @ui
 * @public
 */
const ThumbnailItemBase = kind({
	name: 'ThumbnailItem',

	propTypes: /** @lends agate/ThumbnailItem.ThumbnailItemBase.prototype */ {
		css: PropTypes.object,
		src: PropTypes.string
	},

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

/**
 * An item that can display a thumbnail with Agate behaviors applied.
 *
 * @class ThumbnailItem
 * @memberof agate/ThumbnailItem
 * @extends agate/ThumbnailItem.ThumbnailItemBase
 * @mixes agate/Item.ItemDecorator
 * @ui
 * @public
 */
const ThumbnailItem = ItemDecorator(ThumbnailItemBase);

export default ThumbnailItem;
export {
	ThumbnailItem,
	ThumbnailItemBase
};
