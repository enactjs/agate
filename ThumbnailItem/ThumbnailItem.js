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

import Item from '../Item';

import componentCss from './ThumbnailItem.module.less';

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
		/**
		 * The main content displayed with the thumbnail.
		 *
		 * @type {String}
		 * @public
		 */
		children: PropTypes.string,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `thumbnailItem` - The root component class
		 * * `content` - The content component class
		 * * `subContent` - The subContent component class
		 * * `roundThumbnail` - Applied when `roundThumbnail="true"`
		 * * `thumbnail` - The thumbnail component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The sub content displayed with the thumbnail.
		 *
		 * @type {String}
		 * @public
		 */
		label: PropTypes.string,

		/**
		 * String value used to determine which thumbnail will appear on a specific screenSize.
		 *
		 * @type {String}
		 * @public
		 */
		src: PropTypes.string,

		/**
		 * The thumbnail type.
		 *
		 * @type {('round'|'square')}
		 * @default 'square'
		 * @public
		 */
		type: PropTypes.oneOf(['round', 'square'])
	},

	defaultProps: {
		type: 'square'
	},

	styles: {
		css: componentCss,
		className: 'thumbnailItem',
		publicClassNames: true
	},

	computed: {
		className: ({type, styler}) => styler.append({
			roundThumbnail: type === 'round'
		})
	},

	render: ({css, children, label, src, ...rest}) => {
		return (
			<Item
				{...rest}
			>
				<slotBefore className={css.slotBefore}>
					<img
						className={css.thumbnail}
						src={src}
					/>
				</slotBefore>
				<div className={css.content}>
					{children}
				</div>
				<div className={css.subContent}>
					{label}
				</div>
			</Item>
		);
	}
});

/**
 * A stateless, unfocusable item that can display a thumbnail.
 *
 * @class ThumbnailItem
 * @memberof agate/ThumbnailItem
 * @extends agate/ThumbnailItem.ThumbnailItemBase
 * @ui
 * @public
 */

export default ThumbnailItemBase;
export {
	ThumbnailItemBase as ThumbnailItem,
	ThumbnailItemBase
};
