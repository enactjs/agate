/**
 * Agate styled ImageItem.
 *
 * @example
 * <ImageItem
 * 	src="https://dummyimage.com/64/e048e0/0011ff"
 * 	style={{height: 64, width: 64}}
 * />
 *
 * @module agate/ImageItem
 * @exports ImageItem
 * @exports ImageItemBase
 * @exports ImageItemDecorator
 */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {ImageItem as UiImageItem} from '@enact/ui/ImageItem';
import {MarqueeDecorator, MarqueeController} from '@enact/ui/Marquee';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import ImageBase from '../Image';
import Skinnable from '../Skinnable';

import componentCss from './ImageItem.module.less';

const MarqueeImageItem = MarqueeDecorator(UiImageItem);

/**
 * An Agate styled ImageItem.
 *
 * @class ImageItemBase
 * @memberof agate/ImageItem
 * @extends ui/ImageItem.ImageItem
 * @ui
 * @public
 */
const ImageItemBase = kind({
	name: 'ImageItem',

	propTypes: /** @lends agate/ImageItem.ImageItemBase.prototype */ {
		/**
		 * Sets the position for caption.
		 * This props is only valid when `orientation` is `vertical`.
		 *
		 * @type {('below'|'overlay')}
		 * @default 'below'
		 * @public
		 */
		captionPosition: PropTypes.oneOf(['below', 'overlay']),

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
		 * Disables the `ImageItem`.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

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
		src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		sizing: PropTypes.oneOf(['fit', 'fill', 'none']),
		skin: PropTypes.string
	},

	defaultProps: {
		orientation: 'vertical',
		captionPosition: 'below',
		sizing: 'fill'
	},

	styles: {
		css: componentCss,
		className: 'imageItem'
	},

	computed: {
		className: ({captionPosition, styler, sizing}) => styler.append({
			captionOverlay: captionPosition === 'overlay'

		},sizing),
		// sizing: ({sizing, orientation}) => orientation === 'horizontal' ? sizing : 'fill',
		imageComponentSizing: ({orientation, skin}) => orientation === 'horizontal' && skin === 'silicon' ? 'none' : 'fill'
	},

	render: ({captionPosition, children, css, disabled, imageComponentSizing, orientation, skin, src, sizing, ...rest}) => {
		const [Component, marqueeProps] = (children && (orientation === 'horizontal' || captionPosition === 'below')) ? [MarqueeImageItem, {
			alignment: skin === 'silicon' && orientation === 'horizontal' ? 'left' : 'center'
		}] : [UiImageItem, null];

		console.log(sizing)
		console.log(imageComponentSizing)

		return (
			<Component
				{...rest}
				{...marqueeProps}
				aria-disabled={disabled}
				css={css}
				disabled={disabled}
				imageComponent={<ImageBase sizing={imageComponentSizing}/>}
				orientation={orientation}
				src={src}
			>
				{children}
			</Component>
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
	Skinnable({prop: 'skin'}),
	Spottable
);

/**
 * An Agate styled ImageItem with built-in support for marqueed text, and Spotlight focus.
 *
 * @class ImageItem
 * @memberof agate/ImageItem
 * @extends agate/ImageItem.ImageItemBase
 * @mixes agate/ImageItem.ImageItemDecorator
 * @ui
 * @public
 */
const ImageItem = ImageItemDecorator(ImageItemBase);

export default ImageItem;
export {
	ImageItem,
	ImageItemBase,
	ImageItemDecorator
};
