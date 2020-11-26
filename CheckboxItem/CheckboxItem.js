/**
 * Agate styled item components with a toggleable checkbox.
 *
 * @example
 * <CheckboxItem onToggle={console.log}>
 * 	Item with a Checkbox
 * </CheckboxItem>
 *
 * @module agate/CheckboxItem
 * @exports CheckboxItem
 * @exports CheckboxItemBase
 * @exports CheckboxItemDecorator
 */

import kind from '@enact/core/kind';
import Pure from '@enact/ui/internal/Pure';
import Slottable from '@enact/ui/Slottable';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import {CheckboxBase} from '../Checkbox';
import {ItemBase, ItemDecorator} from '../Item';
import Skinnable from '../Skinnable';

import componentCss from './CheckboxItem.module.less';

const Item = ItemDecorator(ItemBase);

const Checkbox = Skinnable(CheckboxBase);
Checkbox.displayName = 'Checkbox';

/**
 * An item with a checkbox component, ready to use in Agate applications.
 *
 * `CheckboxItem` may be used to allow the user to select a single option or used as part of a
 * [Group]{@link ui/Group} when multiple [selections]{@link ui/Group.Group.select} are possible.
 *
 * Usage:
 * ```
 * <CheckboxItem
 *   defaultSelected={selected}
 *   onToggle={handleToggle}
 * >
 *   Item with a Checkbox
 * </CheckboxItem>
 * ```
 *
 * @class CheckboxItemBase
 * @memberof agate/CheckboxItem
 * @extends agate/Item.Item
 * @omit iconComponent
 * @ui
 * @public
 */
const CheckboxItemBase = kind({
	name: 'CheckboxItem',

	propTypes: /** @lends agate/CheckboxItem.CheckboxItemBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `checkboxItem` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The icon content.
		 *
		 * May be specified as either:
		 *
		 * * A string that represents an icon from the [iconList]{@link ui/Icon.Icon.iconList},
		 * * An HTML entity string, Unicode reference or hex value (in the form '0x...'),
		 * * A URL specifying path to an icon image, or
		 * * An object representing a resolution independent resource (See {@link ui/resolution})
		 *
		 * @type {String|Object}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Enables the "indeterminate" state.
		 *
		 * An indeterminate, mixed, or half-selected state is typically used in a hierarchy or group
		 * to represent that some, not all, children are selected.
		 *
		 * NOTE: This does not prevent updating the `selected` state. Applications must control this
		 * property directly.
		 *
		 * @type {Boolean}
		 * @public
		 */
		indeterminate: PropTypes.bool,

		/**
		 * The icon to be used in the `indeterminate` state.
		 *
		 * May be specified as either:
		 *
		 * * A string that represents an icon from the [iconList]{@link agate/Icon.Icon.iconList},
		 * * An HTML entity string, Unicode reference or hex value (in the form '0x...'),
		 * * A URL specifying path to an icon image, or
		 * * An object representing a resolution independent resource (See {@link ui/resolution})
		 *
		 * @type {String}
		 * @public
		 */
		indeterminateIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * If true the checkbox will be selected.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * Nodes to be inserted after the checkbox and before `children`.
		 *
		 * @type {Node}
		 * @public
		 */
		slotBefore: PropTypes.node
	},

	defaultProps: {
		icon: 'check'
	},

	styles: {
		css: componentCss,
		className: 'checkboxItem',
		publicClassNames: ['checkboxItem']
	},

	computed: {
		className: ({selected, styler}) => styler.append({selected})
	},

	render: ({children, css, icon, indeterminate, indeterminateIcon, selected, slotBefore, ...rest}) => (
		<Item
			role="checkbox"
			{...rest}
			aria-checked={selected}
			css={css}
			selected={selected}
		>
			<slotBefore>
				<Checkbox
					indeterminate={indeterminate}
					indeterminateIcon={indeterminateIcon}
					selected={selected}
				>
					{icon}
				</Checkbox>
				{slotBefore}
			</slotBefore>
			{children}
		</Item>
	)
});

/**
 * Applies Agate specific behaviors to [CheckboxItem]{@link agate/CheckboxItem.CheckboxItem} components.
 *
 * @hoc
 * @memberof agate/CheckboxItem
 * @mixes ui/Toggleable.Toggleable
 * @mixes spotlight/Slottable.Slottable
 * @public
 */
const CheckboxItemDecorator = compose(
	Toggleable({toggleProp: 'onClick'}),
	Slottable({slots: ['label', 'slotAfter', 'slotBefore']})
);

/**
 * An Agate-styled item with a checkbox component.
 *
 * `CheckboxItem` will manage its `selected` state via [Toggleable]{@link ui/Toggleable} unless set
 * directly.
 *
 * @class CheckboxItem
 * @memberof agate/CheckboxItem
 * @extends agate/CheckboxItem.CheckboxItemBase
 * @mixes agate/CheckboxItem.CheckboxItemDecorator
 * @ui
 * @public
 */
const CheckboxItem = Pure(
	CheckboxItemDecorator(
		CheckboxItemBase
	)
);

export default CheckboxItem;
export {
	CheckboxItem,
	CheckboxItemBase,
	CheckboxItemDecorator
};
