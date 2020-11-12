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
// import Spottable from '@enact/spotlight/Spottable'; - doest not exist in Sandstone
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

// Imports for checkbox and item from Sandstone
import {CheckboxBase} from '../Checkbox';
// import {ItemBase, ItemDecorator} from '../Item';
// import Checkbox, {CheckboxBase} from '../Checkbox';
import Item, {ItemBase, ItemDecorator} from '../Item';
import Skinnable from '../Skinnable';

import componentCss from './CheckboxItem.module.less';

// Extra imports from Sandstone
import Pure from '@enact/ui/internal/Pure';
import Slottable from '@enact/ui/Slottable';

// Constants declaration from Sandstone
// const Item = ItemDecorator(ItemBase);

const Checkbox = Skinnable(CheckboxBase);
Checkbox.displayname = 'Checkbox';

/**
 * An item with a checkbox component, ready to use in Agate applications.
 *
 * `CheckboxItem` may be used to allow the user to select a single option or used as part of a
 * [Group]{@link ui/Group} when multiple [selections]{@link ui/Group.Group.select} are possible.
 *
 * Usage:
 * ```
 * <CheckboxItem
 * 	defaultSelected={selected}
 * 	onToggle={handleToggle}
 * >
 *  Item with a Checkbox
 * </CheckboxItem>
 * ```
 *
 * @class CheckboxItem
 * @memberof agate/CheckboxItem
 * @extends agate/Item.Item
 * @mixes agate/CheckboxItem.CheckboxItemDecorator
 * @omit iconComponent
 * @ui
 * @public
 */
const CheckboxItemBase = kind({
	name: 'CheckboxItem',

	propTypes: /** @lends agate/CheckboxItem.CheckboxItem.prototype */ {
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
		 * @default 'check'
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * If true the checkbox will be selected.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool,

		// Extra PropTypes from Sandstone
		indeterminate: PropTypes.bool,
		indeterminateIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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

	// Render function from Sandstone
	render: ({children, css, icon, indeterminate, indeterminateIcon, selected, slotBefore, ...rest}) => (
		<Item
			data-webos-voice-intent="SelectCheckItem"
			role="checkbox"
			{...rest}
			aria-checked={selected}
			css={css}
			selected={selected}
		>
			<slotBefore>
				<Checkbox
					// className={slotBefore ? css.checkbox : null}
					selected={selected}
					indeterminate={indeterminate}
					indeterminateIcon={indeterminateIcon}
				>
					{icon}
				</Checkbox>
				{slotBefore}
			</slotBefore>
			{children}
		</Item>
	)


	// render: ({children, css, icon, selected, ...rest}) => (
	// 	<Item
	// 		aria-checked={selected}
	// 		role="checkbox"
	// 		{...rest}
	// 		css={css}
	// 	>
	// 		<Checkbox selected={selected} slot="slotBefore">{icon}</Checkbox>
	// 		{children}
	// 	</Item>
	// )
});

/**
 * Applies Agate specific behaviors to [CheckboxItem]{@link agate/CheckboxItem.CheckboxItem} components.
 *
 * @hoc
 * @memberof agate/CheckboxItem
 * @mixes ui/Toggleable.Toggleable
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
// const CheckboxItemDecorator = compose(
// 	Toggleable({toggleProp: 'onClick'}),
// 	Spottable,
// 	Skinnable
// );

// CheckboxItemDecorator from Sandstone
const CheckboxItemDecorator = compose(
	Toggleable({toggleProp: 'onClick'}),
	Slottable({slots: ['label', 'slotAfter', 'slotBefore']})
);

// const CheckboxItem = CheckboxItemDecorator(CheckboxItemBase);

// CheckboxItem constant from Sandstone
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
