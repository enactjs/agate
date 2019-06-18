/**
 * Agate styled ToggleButton components and behaviors.
 *
 * @example
 * <ToggleButton underline>Hello Enact!</ToggleButton>
 *
 * @module agate/ToggleButton
 * @exports ToggleButton
 * @exports ToggleButtonBase
 */

import kind from '@enact/core/kind';
import Pure from '@enact/ui/internal/Pure';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';
import IconButton from '../IconButton';
import Skinnable from '../Skinnable';

import css from './ToggleButton.module.less';


/**
 * A stateless [Button]{@link agate/Button.Button} that can be toggled by changing its
 * `selected` property.
 *
 * @class ToggleButtonBase
 * @memberof agate/ToggleButton
 * @extends agate/Button.Button
 * @ui
 * @public
 */
const ToggleButtonBase = kind({
	name: 'ToggleButton',

	propTypes: /** @lends agate/Button.ButtonBase.prototype */ {
		/**
		 * The string to be displayed as the main content of the toggle button.
		 *
		 * If `toggleOffLabel` and/or `toggleOnLabel` are provided, they will be used for the
		 * respective states.
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Disables the button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Add an optional icon to the divider. This accepts any value that [Icon]{@agate/Icon}
		 * supports.
		 *
		 * @type {String}
		 */
		icon: PropTypes.string,

		/**
		 * Determines whether the button is currently in an "on" or "off" state.
		 *
		 * @type {Boolean}
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * Reduces the size of the button.
		 *
		 * The button will have a larger tap target than its apparent size to allow it to be clicked
		 * more easily.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		small: PropTypes.bool,

		/**
		 * Button text displayed in the 'off' state.
		 *
		 * If not specified, `children` will be used for 'off' button text.
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		toggleOffLabel: PropTypes.string,

		/**
		 * Button text displayed in the 'on' state.
		 *
		 * If not specified, `children` will be used for 'on' button text.
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		toggleOnLabel: PropTypes.string,

		/**
		 * The shape of the button where `standard` is pill-shaped and `grid` is rectangular.
		 *
		 * * Values: `'standard'`, `'grid'`
		 *
		 * @type {String}
		 * @public
		 */
		type: PropTypes.oneOf(['standard', 'grid']),

		/**
		 * Shows toggle indicator.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		underline: PropTypes.bool
	},

	defaultProps: {
		underline: false,
		disabled: false,
		minWidth: true,
		selected: false,
		small: false,
		toggleOffLabel: '',
		toggleOnLabel: ''
	},

	styles: {
		css,
		className: 'toggleButton',
		publicClassNames: true
	},

	computed: {
		className: ({selected, small, styler, underline}) => styler.append({selected, small, underline}),
		children: ({children, selected, toggleOnLabel, toggleOffLabel}) => {
			let c = children;
			if (selected && toggleOnLabel) {
				c = toggleOnLabel;
			} else if (!selected && toggleOffLabel) {
				c = toggleOffLabel;
			}
			return c;
		},
		iconToggleButton: ({children, toggleOnLabel, toggleOffLabel, icon}) => (!children && !toggleOnLabel && !toggleOffLabel && icon)
	},

	render: ({children, iconToggleButton, icon, selected, ...rest}) => {
		delete rest.underline;
		delete rest.toggleOffLabel;
		delete rest.toggleOnLabel;

		return iconToggleButton ? (
			<IconButton {...rest}  aria-pressed={selected} css={css} selected={selected}>{icon}</IconButton>
		) : (
			<Button {...rest} aria-pressed={selected} css={css} icon={icon} selected={selected}>{children}</Button>
		);
	}
});

/**
 * A toggleable button.
 *
 * By default, `ToggleButton` maintains the state of its `selected` property.
 * Supply the `defaultSelected` property to control its initial value. If you
 * wish to directly control updates to the component, supply a value to `selected` at creation time
 * and update it in response to `onToggle` events.
 *
 * @class ToggleButton
 * @memberof agate/ToggleButton
 * @extends agate/ToggleButton.ToggleButtonBase
 * @ui
 * @mixes ui/Toggleable
 * @public
 */
const ToggleButton = Pure(
	Toggleable(
		{prop: 'selected', toggleProp: 'onTap'},
		Skinnable(
			ToggleButtonBase
		)
	)
);

export default ToggleButton;
export {
	ToggleButton,
	ToggleButtonBase
};
