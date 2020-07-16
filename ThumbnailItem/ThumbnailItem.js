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

import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import componentCss from './ThumbnailItem.module.less';
import Item from '../Item';


/**
 * A stateless, unfocusable item that can display a thumbnail.
 *
 * @class ThumbnailItemBase
 * @memberof agate/ThumbnailItem
 * @extends agate/Item.Item
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
			<Item
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
			</Item>
		);
	}
});

export default ThumbnailItemBase;
export {
	ThumbnailItemBase as ThumbnailItem,
	ThumbnailItemBase
};
