/**
 * Provides Agate-ez-themed item components and behaviors. Useful for content in lists.
 *
 * @example
 * <Item>Hello Enact!</Item>
 *
 * @module agate/Item
 * @exports Item
 * @exports ItemBase
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
import React from 'react';

import componentCss from './Item.module.less';
import Skinnable from '../Skinnable';

const ItemContent = kind({
	name: 'ItemContent',
	defaultProps: {
		labelPosition: 'below'
	},
	styles: {
		className: 'itemContent',
		css: componentCss
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
		const contentElement = (
			<Cell component={Marquee} className={css.content}>
				{content}
			</Cell>
		);

		if (!label) return contentElement;

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
 * A agate-ez-styled item.
 *
 * @class ItemBase
 * @memberof agate-ez/Item
 * @ui
 * @public
 */
const ItemBase = kind({
	name: 'Item',
	styles: {
		css: componentCss,
		publicClassNames: ['item']
	},
	computed: {
		className: ({selected, styler}) => styler.append({selected})
	},
	render: ({children, contentComponent, componentRef, css, label, labelPosition, slotAfter, slotBefore, ...rest}) => {
		return (
			<UiItemBase {...rest} css={css} align="center" component={Row} ref={componentRef}>
				{slotBefore ? (
					<Cell className={css.slotBefore} shrink>
						{slotBefore}
					</Cell>
				) : null}
				<ItemContent
					label={label}
					labelPosition={labelPosition}
					content={children}
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
 * Agate specific item behaviors to apply to `Item`.
 *
 * @class ItemDecorator
 * @hoc
 * @memberof agate/Item
 * @mixes spotlight.Spottable
 * @mixes ui/Marquee.MarqueeDecorator
 * @mixes agate/Skinnable
 * @ui
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

const Item = ItemDecorator(ItemBase);

export default Item;
export {
	Item,
	ItemBase,
	ItemDecorator
};
