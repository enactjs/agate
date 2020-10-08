/**
 * Provides an Agate-themed toggle switch component.
 *
 * @example
 * <Switch />
 *
 * @module agate/Switch
 * @exports Switch
 * @exports SwitchBase
 * @private
 */

import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../Icon';
import {ToggleIconBase} from '../internal/ToggleIcon';

import componentCss from './Switch.module.less';

/**
 * Renders the base level DOM structure of the component.
 *
 * @class Switch
 * @memberof agate/Switch
 * @ui
 * @private
 */
const SwitchBase = kind({
	name: 'Switch',

	propTypes: /** @lends agate/Switch.Switch.prototype */ {
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

	render: ({css, ...rest}) => {
		delete rest.noAnimation;

		return (
			<ToggleIconBase
				{...rest}
				css={css}
				iconComponent={Icon}
			/>
		);
	}
});

export default SwitchBase;
export {
	SwitchBase as Switch,
	SwitchBase
};
