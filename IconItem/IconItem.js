/**
 * Agate styled item with an icon and a label below.
 *
 * @example
 * <IconItem icon="plus" label="Label">Hello IconItem</IconItem>
 *
 * @module agate/IconItem
 * @exports IconItem
 * @exports IconItemBase
 */

import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import Pure from '@enact/ui/internal/Pure';
import React from 'react';
import {Row, Cell} from '@enact/ui/Layout';
import Spottable from '@enact/spotlight/Spottable';
import Touchable from '@enact/ui/Touchable';

import Icon from '../Icon';
import {LabeledItemBase} from '../LabeledItem';
import Skinnable from '../Skinnable';

import componentCss from './IconItem.module.less';

/**
 * A focusable component that combines marquee-able text content with a synchronized
 * marquee-able text label.
 *
 * @class IconItemBase
 * @memberof agate/IconItem
 * @extends agate/Item.ItemBase
 * @mixes spotlight/Spottable.Spottable
 * @mixes ui/Touchable.Touchable
 * @mixes agate/Marquee.MarqueeController
 * @ui
 * @public
 */
const IconItemBase = kind({
	name: 'IconItem',

	propTypes: /** @lends agate/IconItem.IconItemBase.prototype */ {
		/**
		 * The node to be displayed as the main content of the item.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		children: PropTypes.node.isRequired,

		/**
		 * The icon to be displayed on the left.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.string.isRequired,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `labeledItem` - The root class name
		 * * `icon` - Applied to the icon
		 * * `label` - Applied to the label
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Applies a disabled style and the control becomes non-interactive.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The label to be displayed along with the text.
		 *
		 * @type {Node}
		 * @public
		 */
		label: PropTypes.node,

		/**
		 * Icon to be displayed next to the title text.
		 *
		 * @type {String|Object}
		 * @public
		 */
		titleIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
	},

	styles: {
		css: componentCss,
		className: 'iconItem',
		publicClassNames: ['iconItem', 'icon', 'label']
	},

	render: ({children, css, disabled, icon, label, titleIcon, ...rest}) => (
		<Row
			disabled={disabled}
			{...rest}
			align="center"
		>
			<Cell shrink component={Icon} className={css.icon}>{icon}</Cell>
			<Cell>
				<LabeledItemBase
					css={css}
					label={label}
					titleIcon={titleIcon}
				>
					{children}
				</LabeledItemBase>
			</Cell>
		</Row>
	)
});

const IconItemDecorator = compose(
	Spottable,
	Pure,
	Touchable,
	Skinnable
);

/**
 * A Agate styled labeled item with built-in support for marqueed text.
 *
 * @class IconItem
 * @memberof agate/IconItem
 * @extends agate/IconItem.IconItemBase
 * @ui
 * @public
 */
const IconItem = IconItemDecorator(IconItemBase);

export default IconItem;
export {IconItem, IconItemBase};
