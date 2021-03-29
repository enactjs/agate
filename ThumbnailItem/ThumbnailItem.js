/* eslint-disable jsx-a11y/alt-text */
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
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';

import Image from '../Image';
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
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

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
		 * Applies `selected` className.
		 *
		 * @type {Boolean}
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * Nodes to be inserted before `children`.
		 *
		 * @type {Node}
		 * @public
		 */
		slotBefore: PropTypes.node,

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
		 * @type {('normal'|'styled')}
		 * @default 'normal'
		 * @public
		 */
		type: PropTypes.oneOf(['normal', 'styled'])
	},

	defaultProps: {
		type: 'normal'
	},

	styles: {
		css: componentCss,
		className: 'thumbnailItem',
		publicClassNames: true
	},

	computed: {
		className: ({type, selected, styler}) => styler.append(type, {selected})
	},

	render: ({css, children, src, slotBefore, ...rest}) => {
		return (
			<Item {...rest} css={css} size="small">
				<slotBefore>
					<Image
						className={css.thumbnail}
						src={src}
					/>
					{slotBefore}
				</slotBefore>
				<div className={css.content}>
					{children}
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
 * @mixes ui/Slottable.Slottable
 * @ui
 * @public
 */
const ThumbnailItem = Slottable({slots: ['img', 'slotBefore']}, ThumbnailItemBase);

export default ThumbnailItem;
export {
	ThumbnailItem,
	ThumbnailItemBase
};
