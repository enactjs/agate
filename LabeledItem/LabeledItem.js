/**
 * Agate styled item with a label below.
 *
 * @example
 * <LabeledItem label="Label">Hello LabeledItem</LabeledItem>
 *
 * @module agate/LabeledItem
 * @exports LabeledItem
 * @exports LabeledItemBase
 */

import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import Pure from '@enact/ui/internal/Pure';
import Touchable from '@enact/ui/Touchable';
import ComponentOverride from '@enact/ui/ComponentOverride';
import Spottable from '@enact/spotlight/Spottable';
import {Marquee, MarqueeController} from '@enact/moonstone/Marquee';

import Icon from '../Icon';
import {ItemBase} from '../Item';
import Skinnable from '../Skinnable';

const Controller = MarqueeController(
	{marqueeOnFocus: true},
	Touchable(
		Spottable(
			ItemBase
		)
	)
);

import componentCss from './LabeledItem.less';

/**
 * A focusable component that combines marquee-able text content with a synchronized
 * marquee-able text label.
 *
 * @class LabeledItemBase
 * @memberof agate/LabeledItem
 * @extends agate/Item.ItemBase
 * @mixes spotlight/Spottable.Spottable
 * @mixes ui/Touchable.Touchable
 * @mixes agate/Marquee.MarqueeController
 * @ui
 * @public
 */
const LabeledItemBase = kind({
	name: 'LabeledItem',

	propTypes: /** @lends agate/LabeledItem.LabeledItemBase.prototype */ {
		/**
		 * The node to be displayed as the main content of the item.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		children: PropTypes.node.isRequired,

		/**
		 * The node to be displayed on the left side of LabeledItem.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		componentBefore: PropTypes.node,

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
		className: 'labeledItem',
		publicClassNames: ['labeledItem', 'icon', 'label']
	},

	render: ({children, componentBefore, css, disabled, label, titleIcon, ...rest}) => (
		<Controller disabled={disabled} {...rest} css={css}>
			{componentBefore ? <ComponentOverride className={css.componentBefore} component={componentBefore} /> : null}
			<div>
				<div className={css.text}>
					<Marquee disabled={disabled} className={css.title}>{children}</Marquee>
					{(titleIcon != null) ? <Icon small className={css.icon}>{titleIcon}</Icon> : null}
				</div>
				{(label != null) ? <Marquee disabled={disabled} className={css.label}>{label}</Marquee> : null}
			</div>
		</Controller>
	)
});

const LabeledItemDecorator = compose(
	Pure,
	Skinnable
);

/**
 * A Agate styled labeled item with built-in support for marqueed text.
 *
 * @class LabeledItem
 * @memberof agate/LabeledItem
 * @extends agate/LabeledItem.LabeledItemBase
 * @ui
 * @public
 */
const LabeledItem = LabeledItemDecorator(LabeledItemBase);

export default LabeledItem;
export {LabeledItem, LabeledItemBase};
