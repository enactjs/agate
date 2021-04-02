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

import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Pure from '@enact/ui/internal/Pure';
import {ItemBase as UiItemBase, ItemDecorator as UiItemDecorator} from '@enact/ui/Item';
import {Cell, Layout, Row} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import {Marquee, MarqueeController} from '../Marquee';
import Skinnable from '../Skinnable';

import componentCss from './Item.module.less';

/**
 * Renders the Item content.
 *
 * @class ItemContent
 * @memberof agate/Item
 * @ui
 * @private
 */
const ItemContent = kind({
	name: 'ItemContent',

	propTypes: /** @lends agate/Item.ItemContent.prototype */ {
		/**
		 * Centers the content.
		 *
		 * @type {Boolean}
		 * @public
		 */
		centered: PropTypes.bool,

		/**
		 * Text displayed when passed as children.
		 *
		 * @type {*}
		 * @public
		 */
		content: PropTypes.any,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * `label` - The label class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Text displayed when passed in `label` prop.
		 *
		 * @type {*}
		 * @public
		 */
		label: PropTypes.any,

		/**
		 * The position of the label relative to the primary content, `content`.
		 *
		 * @type {('above'|'after'|'before'|'below')}
		 * @default 'below'
		 * @public
		 */
		labelPosition: PropTypes.oneOf(['above', 'after', 'before', 'below']),

		/**
		 * Determines what triggers the marquee to start its animation.
		 *
		 * @type {('focus'|'hover'|'render')}
		 * @public
		 */
		marqueeOn: PropTypes.oneOf(['focus', 'hover', 'render'])
	},

	defaultProps: {
		labelPosition: 'below'
	},

	styles: {
		className: 'itemContent',
		css: componentCss,
		publicClassNames: ['itemContent', 'label']
	},

	computed: {
		className: ({labelPosition, styler}) => styler.append({
			labelAbove: labelPosition === 'above',
			labelAfter: labelPosition === 'after',
			labelBefore: labelPosition === 'before',
			labelBelow: labelPosition === 'below'
		}),
		orientation: ({labelPosition}) => {
			return (labelPosition === 'above' || labelPosition === 'below') ? 'vertical' : 'horizontal';
		}
	},

	// eslint-disable-next-line enact/prop-types
	render: ({centered, content, css, marqueeOn, label, labelPosition, orientation, styler, ...rest}) => {

		if (!label) {
			return (
				<Cell {...rest} component={Marquee} className={styler.append(css.content)} marqueeOn={marqueeOn}>
					{content}
				</Cell>
			);
		} else {
			const verticalAlign = (labelPosition === 'before' || labelPosition === 'after') ? 'center' : 'unset';
			const contentAlign = centered ? 'center center' : `${verticalAlign} unset`;

			return (
				<Cell {...rest}>
					<Layout align={contentAlign} orientation={orientation}>
						<Cell component={Marquee} className={css.content} marqueeOn={marqueeOn} shrink={orientation === 'vertical' || centered}>
							{content}
						</Cell>
						<Cell component={Marquee} className={css.label} marqueeOn={marqueeOn} shrink>
							{label}
						</Cell>
					</Layout>
				</Cell>
			);
		}
	}
});

/**
 * Renders an Agate-styled Item without any behavior.
 *
 * @class ItemBase
 * @memberof agate/Item
 * @extends ui/Item.ItemBase
 * @ui
 * @public
 */
const ItemBase = kind({
	name: 'Item',

	propTypes: /** @lends agate/Item.ItemBase.prototype */ {
		/**
		 * Centers the slots and content.
		 *
		 * @type {Boolean}
		 * @public
		 */
		centered: PropTypes.bool,

		/**
		 * Called with a reference to the root component.
		 *
		 * @type {Function|Object}
		 * @public
		 */
		componentRef: EnactPropTypes.ref,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * `item` - The root class name
		 * `slotBefore` - The slot (container) preceding the text of this component
		 * `slotAfter` - The slot (container) following the text of this component
		 * `selected` - Applied to a `selected` button
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
		 * Applies inline styling to the item.
		 *
		 * @type {Boolean}
		 * @public
		 */
		inline: PropTypes.bool,

		/**
		 * The label to be displayed along with the text.
		 *
		 * @type {Node}
		 * @public
		 */
		label: PropTypes.node,

		/**
		 * The position of the label relative to the primary content, `children`.
		 *
		 * @type {('above'|'after'|'before'|'below')}
		 * @default 'below'
		 * @public
		 */
		labelPosition: PropTypes.oneOf(['above', 'after', 'before', 'below']),

		/**
		 * Determines what triggers the marquee to start its animation.
		 *
		 * @type {('focus'|'hover'|'render')}
		 * @public
		 */
		marqueeOn: PropTypes.oneOf(['focus', 'hover', 'render']),

		/**
		 * Applies a selected style to the component.
		 *
		 * @type {Boolean}
		 * @private
		 */
		selected: PropTypes.bool,

		/**
		 * The size of the item.
		 *
		 * @type {('small'|'large')}
		 * @default 'large'
		 * @public
		 */
		size: PropTypes.oneOf(['small', 'large']),

		/**
		 * Nodes to be inserted after `children`.
		 *
		 * For LTR locales, the nodes are inserted to the right of the primary content. For RTL
		 * locales, the nodes are inserted to the left. If nothing is specified, nothing, not even
		 * an empty container, is rendered in this place.
		 *
		 * @type {Node}
		 * @public
		 */
		slotAfter: PropTypes.node,

		/**
		 * Nodes to be inserted before `children` and `label`.
		 *
		 * For LTR locales, the nodes are inserted to the left of the primary content. For RTL
		 * locales, the nodes are inserted to the right. If nothing is specified, nothing, not even
		 * an empty container, is rendered in this place.
		 *
		 * @type {Node}
		 * @public
		 */
		slotBefore: PropTypes.node
	},

	defaultProps: {
		labelPosition: 'below',
		size: 'large'
	},

	styles: {
		css: componentCss,
		publicClassNames: ['item', 'itemContent', 'label', 'selected', 'slotAfter', 'slotBefore']
	},

	computed: {
		className: ({centered, label, selected, size, slotAfter, slotBefore, styler}) => styler.append(
			{
				hasLabel: label != null,
				selected,
				centered,
				slotAfter,
				slotBefore
			},
			size
		),
		label: ({label}) => (typeof label === 'number' ? label.toString() : label)
	},

	render: ({centered, children, componentRef, css, inline, label, labelPosition, marqueeOn, slotAfter, slotBefore, ...rest}) => {
		delete rest.size;

		return (
			<UiItemBase
				component={Row}
				align={centered ? 'center center' : 'center'}
				ref={componentRef}
				{...rest}
				inline={inline}
				css={css}
			>
				{slotBefore ? (
					<Cell className={css.slotBefore} shrink>
						{slotBefore}
					</Cell>
				) : null}
				<ItemContent
					centered={centered}
					content={children}
					css={css}
					label={label}
					labelPosition={labelPosition}
					marqueeOn={marqueeOn}
					shrink={inline}
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
 * @class ItemDecorator
 * @hoc
 * @memberof agate/Item
 * @mixes ui/Item.ItemDecorator
 * @mixes agate/Marquee.MarqueeController
 * @mixes ui/Slottable.Slottable
 * @mixes agate/Skinnable.Skinnable
 * @mixes spotlight/Spottable.Spottable
 * @public
 */
const ItemDecorator = compose(
	UiItemDecorator,
	Slottable({slots: ['label', 'slotAfter', 'slotBefore']}),
	Spottable,
	MarqueeController({marqueeOnFocus: true, invalidateProps: ['inline']}),
	Skinnable
);

/**
 * An item component with Agate behaviors applied.
 *
 * Usage:
 * ```
 * <Item>Item Content</Item>
 * ```
 *
 * @class Item
 * @memberof agate/Item
 * @extends agate/Item.ItemBase
 * @mixes agate/Item.ItemDecorator
 * @ui
 * @public
 */
const Item = Pure(ItemDecorator(ItemBase));

export default Item;
export {
	Item,
	ItemBase,
	ItemDecorator
};
