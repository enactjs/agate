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

	propTypes: /** @lends agate/ToggleButton.ToggleButtonBase.prototype */ {
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
		 * The icon to display before the text.
		 *
		 * @type {String}
		 * @see {@link agate/Icon.Icon}
		 */
		icon: PropTypes.string,

		/**
		 * Determines whether the button is currently in an "on" or "off" state.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * The size of the button.
		 *
		 * @type {('smallest'|'small'|'large'|'huge')}
		 * @default 'large'
		 * @public
		 */
		size: PropTypes.oneOf(['smallest', 'small', 'large', 'huge']),

		/**
		 * The current skin.
		 *
		 * @type {String}
		 * @public
		 */
		skin: PropTypes.string,

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
		 * The button type.
		 *
		 * Grid buttons are intended to be grouped with other related buttons.
		 *
		 * @type {('grid'|'standard')}
		 * @public
		 */
		type: PropTypes.oneOf(['grid', 'standard']),

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
		disabled: false,
		selected: false,
		size: 'large',
		toggleOffLabel: '',
		toggleOnLabel: '',
		underline: false
	},

	styles: {
		css,
		className: 'toggleButton',
		publicClassNames: true
	},

	computed: {
		className: ({selected, styler, underline}) => styler.append({selected, underline}),
		children: ({children, selected, toggleOnLabel, toggleOffLabel}) => {
			let c = children;
			if (selected && toggleOnLabel) {
				c = toggleOnLabel;
			} else if (!selected && toggleOffLabel) {
				c = toggleOffLabel;
			}
			return c;
		}
	},

	render: (props) => {
		delete props.underline;
		delete props.toggleOffLabel;
		delete props.toggleOnLabel;

		if (!props.icon && props.skin === 'silicon') {
			props.icon = 'circle';
		}


		return (
			<Button
				{...props}
				aria-pressed={props.selected}
				css={css}
			/>
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
 * @mixes ui/Toggleable.Toggleable
 * @mixes agate/Skinnable.Skinnable
 * @ui
 * @public
 */
const ToggleButton = Pure(
	Toggleable(
		{prop: 'selected', toggleProp: 'onTap'},
		Skinnable(
			{prop: 'skin'},
			ToggleButtonBase
		)
	)
);

export default ToggleButton;
export {
	ToggleButton,
	ToggleButtonBase
};
