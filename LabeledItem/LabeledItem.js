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
import Touchable from '@enact/ui/Touchable';
import {Cell, Row} from '@enact/ui/Layout';

import Icon from '../Icon';
import Skinnable from '../Skinnable';
import {SlotItemBase} from '../SlotItem';

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
		 * Icon to be displayed next to the title text.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.string]),

		/**
		 * The label to be displayed along with the text.
		 *
		 * @type {String}
		 * @public
		 */
		label: PropTypes.string,

		/**
		 * Inlines the label
		 *
		 * @type {Boolean}
		 * @public
		 */
		labelInline: PropTypes.bool,

		/**
		 * The position of label
		 *
		 * @type {('before'|'after')}
		 * @public
		 */
		labelPosition: PropTypes.oneOf(['after', 'before'])
	},

	defaultProps: {
		labelPosition: 'after'
	},

	styles: {
		css: componentCss,
		className: 'labeledItem',
		publicClassNames: ['labeledItem', 'icon', 'labelBefore', 'labelAfter', 'title']
	},

	computed: {
		className: ({labelInline, styler}) => styler.append({labelInline}),
		slotAfter: ({css, icon, label, labelInline, labelPosition}) => {
			return (
				<Row align="center center">
					{label && labelInline && labelPosition === 'after' ? (
						<Cell component={Marquee} className={css.labelAfter} shrink>{label}</Cell>
					) : null}
					{icon ? <Cell component={Icon} className={css.icon} size="small" shrink>{icon}</Cell> : null}
				</Row>
			);
		},
		slotBefore: ({css, label, labelInline, labelPosition}) => {
			return label && labelInline && labelPosition === 'before' ? (
				<Marquee className={css.labelBefore}>{label}</Marquee>
			) : null;
		}
	},

	render: ({children, css, label, labelInline, ...rest}) => {
		delete rest.icon;
		delete rest.label;
		delete rest.labelInline;
		delete rest.labelPosition;

		return (
			<Row {...rest} align="center center" component={SlotItemBase}>
				<Cell>
					<Marquee className={css.title}>{children}</Marquee>
					{label && !labelInline ? (
						<Marquee className={css.label}>{label}</Marquee>
					) : null}
				</Cell>
			</Row>
		);
	}
});

const LabeledItemDecorator = compose(
	Spottable,
	Pure,
	Touchable,
	MarqueeController({marqueeOnFocus: true}),
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
