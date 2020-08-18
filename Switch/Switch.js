/**
 * Provides an Agate-themed toggle switch component.
 *
 * @example
 * <Switch />
 *
 * @module agate/Switch
 * @exports Switch
 * @exports SwitchBase
 */

import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import Skinnable from '../Skinnable';
import Spottable from '@enact/spotlight/Spottable';
import Toggleable from '@enact/ui/Toggleable';

import Icon from '../Icon';
import {ToggleIconBase} from '../internal/ToggleIcon';

import componentCss from './Switch.module.less';

/**
 * Renders the base level DOM structure of the component.
 *
 * @class SwitchBase
 * @memberof agate/Switch
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
		onClick: PropTypes.func,
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

	render: ({css, onClick, ...rest}) => {
		delete rest.noAnimation;

		return (
			<ToggleIconBase
				{...rest}
				css={css}
				iconComponent={Icon}
				onToggle={onClick}
			/>
		);
	}
});

const SwitchDecorator = compose(
	Toggleable({toggleProp: 'onClick'}),
	Spottable,
	Skinnable
);

const Switch = SwitchDecorator(SwitchBase);

export default Switch;
export {
	Switch,
	SwitchBase
};
