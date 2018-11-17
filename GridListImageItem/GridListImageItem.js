/**
 * @module agate/GridListImageItem
 * @exports GridListImageItem
 */

import kind from '@enact/core/kind';
import {GridListImageItem as UiGridListImageItem} from '@enact/ui/GridListImageItem';
import {ImageBase as Image} from '@enact/ui/Image';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';

import componentCss from './GridListImageItem.less';

/**
 * @class GridListImageItemBase
 * @extends ui/GridListImageItem.GridListImageItem
 * @memberof agate/GridListImageItem
 * @ui
 * @public
 */
const GridListImageItemBase = kind({
	name: 'GridListImageItem',

	propTypes: /** @lends moonstone/GridListImageItem.GridListImageItemBase.prototype */ {
		aspectRatio: PropTypes.oneOf(['1:1', '4:3', '16:9']),

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
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

	defaultProps: {
		aspectRatio: '1:1'
	},

	styles: {
		css: componentCss,
		publicClassNames: ['gridListImageItem', 'image', 'caption', 'subCaption']
	},

	computed: {
		className: ({aspectRatio, styler}) => styler.append({
			fourThree: aspectRatio === '4:3',
			sixteenNine: aspectRatio === '16:9'
		})
	},

	render: ({css, ...rest}) => {
		delete rest.aspectRatio;

		return (
			<UiGridListImageItem
				{...rest}
				css={css}
				imageComponent={Image}
			/>
		);
	}
});

/**
 * @hoc
 * @memberof agate/GridListImageItem
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const GridListImageItemDecorator = compose(
	Skinnable
);

/**
 * @class GridListImageItem
 * @memberof agate/GridListImageItem
 * @extends agate/GridListIamgeItem.GridListImageItemBase
 * @mixes agate/GridListImageItem.GridListImageItemDecorator
 * @see agate/GridListImageItem.GridListImageItemBase
 * @ui
 * @public
 */
const GridListImageItem = GridListImageItemDecorator(GridListImageItemBase);

export default GridListImageItem;
export {
	GridListImageItem,
	GridListImageItemBase,
	GridListImageItemDecorator
};
