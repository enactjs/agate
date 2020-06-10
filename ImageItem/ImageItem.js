/**
 * Agate styled ImageItem.
 *
 * @module agate/ImageItem
 * @exports ImageItem
 * @exports ImageItemBase
 * @exports ImageItemDecorator
 */

import kind from '@enact/core/kind';
import {ImageItem as UiImageItem} from '@enact/ui/ImageItem';
import {MarqueeDecorator, MarqueeController} from '@enact/ui/Marquee';
import Spottable from '@enact/spotlight/Spottable';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import React from 'react';

import ImageBase from '../Image';
import Skinnable from '../Skinnable';

import componentCss from './ImageItem.module.less';

const MarqueeImageItem = MarqueeDecorator(UiImageItem);

/**
 * @class ImageItemBase
 * @extends ui/ImageItem.ImageItem
 * @memberof agate/ImageItem
 * @ui
 * @public
 */
const ImageItemBase = kind({
	name: 'ImageItem',

	propTypes: /** @lends agate/ImageItem.ImageItemBase.prototype */ {
		/**
		 * The caption displayed with the image.
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
		 * * `imageItem` - The root component class
		 * * `caption` - The caption component class
		 * * `horizontal` - Applied when `orientation="horizontal"`
		 * * `image` - The image component class
		 * * `vertical` - Applied when `orientation="vertical"`
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The layout orientation of the component.
		 *
		 * @type {('horizontal'|'vertical')}
		 * @default 'vertical'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * String value or Object of values used to determine which image will appear on a specific
		 * screenSize.
		 *
		 * @type {String|Object}
		 * @public
		 */
		src: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
	},

	defaultProps: {
		orientation: 'vertical'
	},

	styles: {
		css: componentCss,
		className: 'imageItem'
	},

	render: ({children, css, src, ...rest}) => {

		const [Component, marqueeProps] = children ? [MarqueeImageItem, {
			alignment: 'center',
			children
		}] : [UiImageItem, null];

		return (
			<Component
				{...rest}
				{...marqueeProps}
				css={css}
				imageComponent={ImageBase}
				src={src}
			/>
		);
	}
});

/**
 * Applies Agate specific behaviors to [ImageItemBase]{@link agate/ImageItem.ImageItemBase}
 *
 * @hoc
 * @memberof agate/ImageItem
 * @mixes ui/Marquee.MarqueeController
 * @mixes agate/Skinnable.Skinnable
 * @mixes spotlight/Spottable.Spottable
 * @public
 */
const ImageItemDecorator = compose(
	MarqueeController({marqueeOnFocus: true}),
	Skinnable,
	Spottable
);

/**
 * @class ImageItem
 * @memberof agate/ImageItem
 * @extends agate/ImageItem.ImageItemBase
 * @mixes agate/ImageItem.ImageItemDecorator
 * @public
 */
const ImageItem = ImageItemDecorator(ImageItemBase);

export default ImageItem;
export {
	ImageItem,
	ImageItemBase,
	ImageItemDecorator
};
