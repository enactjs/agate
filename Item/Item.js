/**
 * Provides Agate-themed item components and behaviors. Useful for content in lists.
 *
 * @example
 * <Item>Hello Enact!</Item>
 *
 * @module agate/Item
 * @exports Item
 * @exports ItemBase
 * @exports ItemDecorator
 */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import ForwardRef from '@enact/ui/ForwardRef';
import Slottable from '@enact/ui/Slottable';
import {ItemBase as UiItemBase, ItemDecorator as UiItemDecorator} from '@enact/ui/Item';
import {Cell, Layout, Row} from '@enact/ui/Layout';
import {Marquee, MarqueeController} from '@enact/ui/Marquee';
import Pure from '@enact/ui/internal/Pure';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import React from 'react';

import componentCss from './Item.module.less';
import Skinnable from '../Skinnable';

const ItemContent = kind({
	name: 'ItemContent',
	propTypes: {
		content: PropTypes.any,
		css: PropTypes.object,
		label: PropTypes.any,
		labelPosition: PropTypes.any
	},
	defaultProps: {
		labelPosition: 'below'
	},
	styles: {
		className: 'itemContent',
		css: componentCss,
		publicClassNames: ['label']
	},
	computed: {
		className: ({label, labelPosition, styler}) => styler.append({
			hasLabel: Boolean(label),
			labelAbove: labelPosition === 'above',
			labelAfter: labelPosition === 'after',
			labelBefore: labelPosition === 'before',
			labelBelow: labelPosition === 'below'
		}),
		orientation: ({labelPosition}) => {
			return (labelPosition === 'above' || labelPosition === 'below') ? 'vertical' : 'horizontal';
		}
	},
	render: ({orientation, content, css, label, ...rest}) => {
		delete rest.labelPosition;

		// Due to flex-box sizing (used in Layout/Cell), in a vertical orientation with no height
		// specified, all of the cells should be set to `shrink` so their height is summed to define
		// the height of the entire Layout. Without this, a cell will collapse, causing unwanted overlap.
		const contentElement = (
			<Cell component={Marquee} className={css.content} shrink={(label != null && orientation === 'vertical')}>
				{content}
			</Cell>
		);

		if (label == null) return contentElement;

		return (
			<Cell {...rest}>
				<Layout orientation={orientation}>
					{contentElement}
					<Cell component={Marquee} className={css.label} shrink>
						{label}
					</Cell>
				</Layout>
			</Cell>
		);
	}
});

/**
 * Renders an Agate-styled Item without any behavior.
 *
 * @class ItemBase
 * @memberof agate/Item
 * @ui
 * @public
 */
const ItemBase = kind({
	name: 'Item',
	propTypes: /** @lends agate/Item.ItemBase.prototype */ {
		componentRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
		css: PropTypes.object,
		label: PropTypes.node,
		labelPosition: PropTypes.oneOf(['above', 'after', 'before', 'below']),
		selected: PropTypes.bool,
		slotAfter: PropTypes.node,
		slotBefore: PropTypes.node
	},
	styles: {
		css: componentCss,
		publicClassNames: ['item', 'label', 'slotAfter', 'slotBefore']
	},
	computed: {
		className: ({selected, styler}) => styler.append({selected})
	},
	render: ({children, componentRef, css, label, labelPosition, slotAfter, slotBefore, ...rest}) => {
		return (
			<UiItemBase {...rest} css={css} align="center" component={Row} ref={componentRef}>
				{slotBefore ? (
					<Cell className={css.slotBefore} shrink>
						{slotBefore}
					</Cell>
				) : null}
				<ItemContent
					content={children}
					css={css}
					label={label}
					labelPosition={labelPosition}
				/>
				{slotAfter ? (
					<Cell className={css.slotAfter} shrink>
						{slotAfter}
					</Cell>
				) : null}
			</UiItemBase>
		);
	}
});

/**
 * Agate specific behaviors to apply to [Item]{@link agate/Item.ItemBase}.
 *
 * @hoc
 * @memberof agate/Item
 * @mixes ui/Item.ItemDecorator
 * @mixes spotlight/Spottable.Spottable
 * @mixes ui/Marquee.MarqueeController
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ItemDecorator = compose(
	ForwardRef({prop: 'componentRef'}),
	Slottable({slots: ['label', 'slotAfter', 'slotBefore']}),
	Pure,
	UiItemDecorator,
	Spottable,
	MarqueeController({marqueeOnFocus: true}),
	Skinnable
);

/**
 * An item component with Agate behaviors applied.
 *
 * @class Item
 * @memberof agate/Item
 * @extends agate/Item.ItemBase
 * @mixes agate/Item.ItemDecorator
 * @ui
 * @public
 */
const Item = ItemDecorator(ItemBase);

export default Item;
export {
	Item,
	ItemBase,
	ItemDecorator
};
