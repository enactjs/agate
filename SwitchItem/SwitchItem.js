/**
 * Provides Agate-ez-themed Item component and interactive toggle switch icon.
 *
 * @module agate-ez/SwitchItem
 * @exports SwitchItem
 */

import React from 'react';
import PropTypes from 'prop-types';

import kind from '@enact/core/kind';
import AgateSwitch from '../Switch';
import Icon from '../Icon';
import Skinnable from '../Skinnable';

import Spottable from '@enact/spotlight/Spottable';
import Toggleable from '@enact/ui/Toggleable';
import Touchable from '@enact/ui/Touchable';
import compose from 'ramda/src/compose';

import componentCss from './SwitchItem.less';

/**
 * Renders an `Item` with a radio-dot component. Useful to show a selected state on an Item.
 *
 * @class SwitchItem
 * @memberof agate-ez/SwitchItem
 * @extends agate/SwitchItem.SwitchItem
 * @ui
 * @public
 */


const SwitchItemBase = kind({
	name: 'SwitchItemBase',

	propTypes: /** @lends agate/Divider.DividerBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
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
		 * Customize the component used as the switch.
		 *
		 * @type {Element|Function|String}
		 * @default {@link agate/Switch.Switch}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),

		/**
		 * Customize the text displayed when the switch is "off".
		 *
		 * @type {String}
		 * @default 'off'
		 * @public
		 */
		offText: PropTypes.string,

		/**
		 * Customize the text displayed when the switch is "on".
		 *
		 * @type {String}
		 * @default 'on'
		 * @public
		 */
		onText: PropTypes.string,

		/**
		 * If true the switch will be selected.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool
	},

	defaultProps: {
		offText: 'off',
		onText: 'on',
		selected: false
	},

	styles: {
		css: componentCss,
		className: 'switchItem',
		publicClassNames: true
	},

	computed: {
		icon: ({css, icon}) => (icon ? <Icon small className={css.icon}>{icon}</Icon> : null)
	},

	render: ({children, css, icon, offText, onText, selected, ...rest}) => {

		return (
			<div {...rest} css={css}>
				{icon}
				<div
					className={css.text}
				>
					{children}
				</div>
				<div className={css.label}>
					{selected ? onText : offText}
				</div>
				<AgateSwitch selected={selected} className={css.switchIcon} />
			</div>
		);
	}
});


const SwitchItemDecorator = compose(
	Toggleable({toggleProp: 'onTap'}),
	Touchable,
	Spottable,
	Skinnable
);

const SwitchItem = SwitchItemDecorator(SwitchItemBase);

export default SwitchItem;
export {
	SwitchItem
};
