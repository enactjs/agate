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

import ToggleIcon from '@enact/ui/ToggleIcon';
import Skinnable from '../Skinnable';

import compose from 'ramda/src/compose';

import componentCss from './Switch.less';

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
		noAnimation: PropTypes.bool
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
		})
	},

	render: ({children, css, ...rest}) => {
		delete rest.noAnimation;

		return (
			<ToggleIcon
				{...rest}
				css={css}
				iconComponent={Icon}
			>
				{children}
			</ToggleIcon>
		);
	}
});

const SwitchDecorator = compose(
	Skinnable
)

const Switch = SwitchDecorator(SwitchBase);

export default SwitchDecorator(SwitchBase);
export {
	Switch,
	SwitchBase,
	SwitchDecorator
};
