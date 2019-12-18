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
 */

import kind from '@enact/core/kind';
import {SlotItem as SlotItemBase} from '@enact/ui/SlotItem';
import {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import React from 'react';

import Checkbox from './Checkbox';
import ToggleItem from './ToggleItem';

import componentCss from './CheckboxItem.module.less';

const SlotItem = kind({
	name: 'SlotItem',
	render: (props) => (
		<SlotItemBase {...props} component="div" />
	)
});

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
 * @extends agate/ToggleItem.ToggleItem
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
		css: PropTypes.object
	},

	styles: {
		css: componentCss,
		className: 'checkboxItem',
		publicClassNames: ['checkboxItem']
	},

	computed: {
		children: ({children}) => <Cell align="center">{children}</Cell>
	},

	render: (props) => (
		<ToggleItem
			data-webos-voice-intent="SelectCheckItem"
			role="checkbox"
			{...props}
			component={SlotItem}
			css={props.css}
			iconComponent={Checkbox}
		/>
	)
});

export default CheckboxItemBase;
export {
	CheckboxItemBase as CheckboxItem,
	CheckboxItemBase
};
