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
import hoc from '@enact/core/hoc';
import Pure from '@enact/ui/internal/Pure';
import Spottable from '@enact/spotlight/Spottable';
import {SlotItem as SlotItemBase} from '@enact/ui/SlotItem';
import {ToggleItemBase, ToggleItemDecorator as UiToggleItemDecorator} from '@enact/ui/ToggleItem';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable/Skinnable';

import Checkbox from './Checkbox';
import componentCss from './CheckboxItem.module.less';

const SlotItem = kind({
	name: 'SlotItem',
	render: (props) => (
		<SlotItemBase {...props} component="div" />
	)
});

/**
 * Adds interactive functionality to `ToggleItemBase`.
 *
 * @class ToggleItemDecorator
 * @memberof agate/ToggleItem
 * @mixes ui/ToggleItem.ToggleItemDecorator
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Marquee.MarqueeDecorator
 * @mixes agate/Skinnable
 * @hoc
 * @public
 */
const ToggleItemDecorator = hoc((config, Wrapped) => {
	return compose(
		Pure,
		UiToggleItemDecorator,
		Spottable,
		Skinnable
	)(Wrapped);
});

/**
 * A Agate-styled item with built-in support for toggling and `Spotlight` focus.
 *
 * This is not intended to be used directly, but should be extended by a component that will
 * customize this component's appearance by supplying an `iconComponent` prop.
 *
 * @class ToggleItem
 * @memberof agate/ToggleItem
 * @extends agate/ToggleItem.ToggleItemBase
 * @mixes agate/ToggleItem.ToggleItemDecorator
 * @ui
 * @public
 */
const ToggleItem = ToggleItemDecorator(ToggleItemBase);

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

	render: (props) => (
		<ToggleItem
			data-webos-voice-intent="SelectCheckItem"
			{...props}
			role="checkbox"
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
