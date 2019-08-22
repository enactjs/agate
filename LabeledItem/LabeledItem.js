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

import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import {MarqueeBase as Marquee, MarqueeController} from '@enact/ui/Marquee';
import PropTypes from 'prop-types';
import Pure from '@enact/ui/internal/Pure';
import React from 'react';
import Spottable from '@enact/spotlight/Spottable';
import {Row, Cell} from '@enact/ui/Layout';
import Touchable from '@enact/ui/Touchable';

import Icon from '../Icon';
import {ItemBase} from '../Item';
import Skinnable from '../Skinnable';

const Controller = MarqueeController(
	{marqueeOnFocus: true},
	Skinnable(
		ItemBase
	)
);

import componentCss from './LabeledItem.module.less';

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
		 * The position of label
		 *
		 * @type {Node}
		 * @public
		 */
		labelPosition: PropTypes.oneOf(['before', 'after']),

		/**
		 * Icon to be displayed next to the title text.
		 *
		 * @type {String|Object}
		 * @public
		 */
		titleIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
	},

	defaultProps: {
		labelPosition: 'after'
	},

	styles: {
		css: componentCss,
		className: 'labeledItem',
		publicClassNames: ['labeledItem', 'icon', 'labelBefore', 'labelAfter', 'text', 'title']
	},

	render: ({children, css, disabled, label, labelPosition, titleIcon, ...rest}) => (
		<Controller disabled={disabled} {...rest} css={css}>
			{(label != null && labelPosition === 'before') ? <Marquee disabled={disabled} className={css.labelBefore}>{label}</Marquee> : null}
			<Row className={css.text}>
				<Cell component={Marquee} disabled={disabled} className={css.title}>{children}</Cell>
				{(titleIcon != null) ? <Cell shrink component={Icon} small className={css.icon}>{titleIcon}</Cell> : null}
			</Row>
			{(label != null && labelPosition === 'after') ? <Marquee disabled={disabled} className={css.labelAfter}>{label}</Marquee> : null}
		</Controller>
	)
});

const LabeledItemDecorator = compose(
	Spottable,
	Pure,
	Touchable
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
