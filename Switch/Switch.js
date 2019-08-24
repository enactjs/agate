/**
 * Provides a Agate-themed pill-shaped toggle switch component.
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
 * @class Switch
 * @memberof agate/Switch
 * @extends agate/ToggleIcon.ToggleIcon
 * @ui
 * @public
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
		children: 'circle',
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
			if (children !== 'circle') return children;
			switch (skin) {
				case 'carbon': return 'circle';
				default: return children;
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

const SwitchDecorator = compose(
	Toggleable({toggleProp: 'onClick'}),
	Skinnable({prop: 'skin'})
);

const Switch = SwitchDecorator(SwitchBase);

export default SwitchDecorator(SwitchBase);
export {
	Switch,
	SwitchBase,
	SwitchDecorator
};
