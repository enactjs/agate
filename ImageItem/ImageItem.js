import kind from '@enact/core/kind';
import {ImageItem as UiImageItem} from '@enact/ui/ImageItem';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import Spottable from '@enact/spotlight/Spottable';
import {MarqueeDecorator, MarqueeController} from '@enact/ui/Marquee';

import ImageBase from '../Image';
import Skinnable from '../Skinnable';

import componentCss from './ImageItem.module.less';

const MarqueeImageItem = MarqueeDecorator(UiImageItem);

const ImageItemBase = kind({
	name: 'ImageItem',

	propTypes: {
		children: PropTypes.node,

		css: PropTypes.object,

		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	},

	defaultProps: {
		orientation: 'vertical'
	},

	styles: {
		css: componentCss,
		publicClassNames: ['imageItem', 'caption']
	},

	render: ({css, children, src, ...rest}) => {

		return (
			children ?
				<MarqueeImageItem
					{...rest}
					css={css}
					alignment="center"
					imageComponent={ImageBase}
					children={children}
					src={src}
				/> :
				<UiImageItem
					{...rest}
					css={css}
					imageComponent={ImageBase}
					src={src}
				/>
		)
	}
});

const ImageItemDecorator = compose(
	MarqueeController({marqueeOnFocus: true}),
	Skinnable,
	Spottable
);

const ImageItem = ImageItemDecorator(ImageItemBase);

export default ImageItem;
export {
	ImageItem,
	ImageItemBase,
	ImageItemDecorator
}