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
		 * * `switchItem` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Customize the component used as the switch.
		 *
		 * @type {Element|Function}
		 * @default {@link agate/Switch.Switch}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

		/**
		 * If true the switch will be selected.
		 *
		 * @type {Boolean}
		 * @default false {@link agate/Switch.Switch}
		 * @public
		 */
		selected: PropTypes.bool
	},

	defaultProps: {
		selected: false
	},

	styles: {
		css: componentCss,
		className: 'switchItem'
	},

	computed: {
		icon: ({css, icon}) => (icon ? <Icon small className={css.icon}>{icon}</Icon> : null)
	},

	render: ({children, css, icon, selected, ...rest}) => {

		return (
			<div {...rest} css={css}>
				{icon}
				<div
					className={css.text}
				>
					{children}
				</div>
				<div>
					{selected ? 'on' : 'off'}
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
