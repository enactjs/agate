/**
 * Provides Agate-themed Item component and interactive toggle switch icon.
 *
 * @example
 * <SwitchItem>Item</SwitchItem>
 *
 * @module agate/SwitchItem
 * @exports SwitchItem
 * @exports SwitchItemBase
 * @exports SwitchItemDecorator
 */

import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import handle, {forProp, forward} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Toggleable from '@enact/ui/Toggleable';

import Icon from '../Icon';
import Item from '../Item';
import Skinnable from '../Skinnable';
import {SwitchBase} from '../Switch';

import componentCss from './SwitchItem.module.less';

const Switch = Skinnable({prop: 'skin'}, SwitchBase);

/**
 * Renders an `Item` with a switch component.
 *
 * @class SwitchItemBase
 * @memberof agate/SwitchItem
 * @extends agate/Item.Item
 * @ui
 * @public
 */
const SwitchItemBase = kind({
	name: 'SwitchItemBase',

	propTypes: /** @lends agate/SwitchItem.SwitchItemBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `label` - Class name for the toggle icon label
		 * * `switchIcon` - Class name for the toggle icon
		 * * `switchItem` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Disables component and makes it non-interactive.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The icon to display before the text.
		 *
		 * @type {String|Object}
		 * @see {@link agate/Icon.Icon}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Sets the switch to the 'on' state.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * Customize the text displayed when the switch is "off".
		 *
		 * @type {String}
		 * @default 'off'
		 * @public
		 */
		switchOffLabel: PropTypes.string,

		/**
		 * Customize the text displayed when the switch is "on".
		 *
		 * @type {String}
		 * @default 'on'
		 * @public
		 */
		switchOnLabel: PropTypes.string
	},

	defaultProps: {
		disabled: false,
		selected: false,
		switchOffLabel: 'off',
		switchOnLabel: 'on'
	},

	styles: {
		css: componentCss,
		className: 'switchItem',
		publicClassNames: true
	},

	handlers: {
		onClick: handle(
			forProp('disabled', false),
			forward('onClick')
		)
	},

	computed: {
		className: ({selected, styler}) => styler.append({selected}),
		icon: ({css, icon}) => (icon ?
			<Icon size="small" slot="slotBefore" className={css.icon}>
				{icon}
			</Icon> :
			null
		)
	},

	render: ({children, css, icon, selected, switchOffLabel, switchOnLabel, ...rest}) => {

		return (
			<Item
				aria-pressed={selected}
				role="button"
				{...rest}
				css={css}
				label={selected ? switchOnLabel : switchOffLabel}
				labelPosition="after"
			>
				{icon}
				{children}
				<Switch
					className={css.switchIcon}
					selected={selected}
					slot="slotAfter"
				/>
			</Item>
		);
	}
});

/**
 * Applies Agate specific behaviors to {@link agate/SwitchItem.SwitchItemBase|SwitchItemBase} components.
 *
 * @hoc
 * @memberof agate/SwitchItem
 * @mixes ui/Toggleable.Toggleable
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const SwitchItemDecorator = compose(
	Toggleable({toggleProp: 'onClick'}),
	// Touchable,
	Spottable,
	Skinnable
);

/**
 * An Agate-styled item with a switch component.
 *
 * `SwitchItem` will manage its `selected` state via {@link ui/Toggleable|Toggleable} unless set
 * directly.
 *
 * @class SwitchItem
 * @memberof agate/SwitchItem
 * @extends agate/SwitchItem.SwitchItemBase
 * @mixes agate/SwitchItem.SwitchItemDecorator
 * @ui
 * @public
 */
const SwitchItem = SwitchItemDecorator(SwitchItemBase);

export default SwitchItem;
export {
	SwitchItem,
	SwitchItemBase,
	SwitchItemDecorator
};
