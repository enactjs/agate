/**
 * Provides an Agate-themed pill-shaped toggle switch component.
 *
 * @example
 * <Switch />
 *
 * @module agate/Switch
 * @exports Switch
 * @exports SwitchBase
 */

import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

import Toggleable from '@enact/ui/Toggleable';
import {ToggleIconBase} from '@enact/ui/ToggleIcon';
import Skinnable from '../Skinnable';

import compose from 'ramda/src/compose';

import componentCss from './Switch.module.less';

/**
 * Renders the base level DOM structure of the component.
 *
 * @class SwitchBase
 * @memberof agate/Switch
 * @extends ui/ToggleIcon.ToggleIconBase
 * @ui
 * @public
 */
const SwitchBase = kind({
	name: 'Switch',

	propTypes: /** @lends agate/Switch.SwitchBase.prototype */ {
		children: PropTypes.string,
		css: PropTypes.object,

		/**
		 * Disables animation.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,
		skin: PropTypes.string
	},

	defaultProps: {
		noAnimation: false
	},

	styles: {
		css: componentCss
	},

	computed: {
		className: ({noAnimation, styler}) => styler.append({
			animated: !noAnimation
		}),
		children: ({children, skin}) => {
			if (children) return children;

			switch (skin) {
				case 'carbon': return 'squarelarge';
				default: return 'circle';
			}
		}
	},

	render: ({children, css, ...rest}) => {
		delete rest.noAnimation;

		return (
			<ToggleIconBase
				{...rest}
				css={css}
				iconComponent={Icon}
			>
				{children}
			</ToggleIconBase>
		);
	}
});

/**
 * Agate specific item behaviors to apply to [Switch]{@link agate/Switch.SwitchBase}.
 *
 * @hoc
 * @memberof agate/Switch
 * @mixes ui/Toggleable.Toggleable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const SwitchDecorator = compose(
	Toggleable({toggleProp: 'onClick'}),
	Skinnable({prop: 'skin'})
);

/**
 * A switch component with Agate behaviors.
 *
 * @class Switch
 * @memberof agate/Switch
 * @extends agate/Switch.SwitchBase
 * @mixes agate/Switch.SwitchDecorator
 * @ui
 * @public
 */
const Switch = SwitchDecorator(SwitchBase);

export default SwitchDecorator(SwitchBase);
export {
	Switch,
	SwitchBase,
	SwitchDecorator
};
