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
 * @agate
 * @public
 */
const ThumbnailItemBase = kind({
	name: 'ThumbnailItem',

	propTypes: /** @lends agate/ThumbnailItem.ThumbnailItemBase.prototype */ {
		content: PropTypes.string,
		css: PropTypes.object,
		src: PropTypes.string,
		subComponents: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
		subcontent: PropTypes.string
	},

	styles: {
		css: componentCss,
		className: 'thumbnailItem',
		publicClassNames: true
	},

	computed: {
		subComponents: ({content, subcontent, css, subComponents}) => {
			return (
				subComponents ? subComponents : <React.Fragment>
					{content ? (<div className={css.content}>{content}</div>) : null}
					{subcontent ? (<div className={css.subContent}>{subcontent}</div>) : null}
				</React.Fragment>
			);
		}
	},

	render: ({css, src, subComponents, ...rest}) => {
		return (
			<Item
				{...rest}
			>
				<slotBefore slot="slotBefore">
					<img
						className={css.thumbnail}
						src={src}
					/>
				</slotBefore>
				{subComponents}
			</Item>
		);
	}
});

export default ThumbnailItemBase;
export {
	ThumbnailItemBase as ThumbnailItem,
	ThumbnailItemBase
};
