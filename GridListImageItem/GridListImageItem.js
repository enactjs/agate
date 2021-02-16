/**
 * @module agate/GridListImageItem
 * @exports GridListImageItem
 * @exports GridListImageItemBase
 * @exports GridListImageItemDecorator
 * @deprecated Will be removed in 2.0.0. Use {@link agate/ImageItem} instead.
 * @private
 */

import kind from '@enact/core/kind';
import deprecate from '@enact/core/internal/deprecate';
import {memoize} from '@enact/core/util';
import {GridListImageItem as UiGridListImageItem} from '@enact/ui/GridListImageItem';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import {ImageBase} from '../Image';
import Icon from '../Icon';
import Skinnable from '../Skinnable';

import componentCss from './GridListImageItem.module.less';

const parseRatio = /^(\d+):(\d+)$/;
const calcAspectRatio = memoize(aspectRatio => {
	if (aspectRatio === 'square') return 1;
	if (aspectRatio === 'widescreen') return 16 / 9;
	if (typeof aspectRatio === 'number') return 1 / aspectRatio;

	const ratio = aspectRatio.match(parseRatio);
	if (ratio && ratio.length === 3) {
		return parseInt(ratio[2]) / parseInt(ratio[1]);
	}

	return 1;
});

/**
 * @class GridListImageItemBase
 * @memberof agate/GridListImageItem
 * @extends ui/GridListImageItem.GridListImageItem
 * @ui
 * @private
 */
const GridListImageItemBase = kind({
	name: 'GridListImageItem',

	propTypes: /** @lends agate/GridListImageItem.GridListImageItemBase.prototype */ {
		/**
		 * Determines the ratio of the image's width to its height.
		 *
		 * The value can either be specified as a number or as a string using the standard format:
		 * 'width:height'. The predefined values of `'square'` and `'widescreen'` may also be used
		 * for `'1:1'` or `'16:9'`, respectively.
		 *
		 * @type {Number|String}
		 * @public
		 */
		aspectRatio: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]),

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `image` - The image component class
		 * * `caption` - The caption component class
		 * * `subCaption` - The subCaption component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object
	},

	styles: {
		css: componentCss,
		publicClassNames: ['gridListImageItem', 'image', 'caption', 'subCaption']
	},

	computed: {
		style: ({aspectRatio, style}) => {
			if (!aspectRatio) return style;

			return {
				...style,
				'--agate-gridlistimageitem-aspect-ratio': calcAspectRatio(aspectRatio)
			};
		}
	},

	render: deprecate(({css, ...rest}) => {
		delete rest.aspectRatio;

		return (
			<UiGridListImageItem
				{...rest}
				css={css}
				iconComponent={Icon}
				imageComponent={ImageBase}
			/>
		);
	}, {
		name: 'agate/GridListImageItem',
		replacedBy: 'agate/ImageItem',
		until: '2.0.0'
	})
});

/**
 * @hoc
 * @memberof agate/GridListImageItem
 * @mixes agate/Skinnable.Skinnable
 * @private
 */
const GridListImageItemDecorator = compose(
	Skinnable
);

/**
 * @class GridListImageItem
 * @memberof agate/GridListImageItem
 * @extends agate/GridListImageItem.GridListImageItemBase
 * @mixes agate/GridListImageItem.GridListImageItemDecorator
 * @ui
 * @private
 */
const GridListImageItem = GridListImageItemDecorator(GridListImageItemBase);

export default GridListImageItem;
export {
	GridListImageItem,
	GridListImageItemBase,
	GridListImageItemDecorator
};
