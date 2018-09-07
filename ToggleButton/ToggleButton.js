/**
 * Agate styled button components and behaviors.
 *
 * @example
 * <Button small>Hello Enact!</Button>
 *
 * @module agate/Button
 * @exports Button
 * @exports ButtonBase
 * @exports ButtonDecorator
 */

import kind from '@enact/core/kind';
import Pure from '@enact/ui/internal/Pure';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';
// import {MarqueeDecorator} from '../Marquee';
import Skinnable from '../Skinnable';

import css from './ToggleButton.less';


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
		 * The background-color opacity of this button.
		 *
		 * * Values: `'translucent'`, `'lightTranslucent'`, `'transparent'`
		 *
		 * @type {String}
		 * @public
		 */
		backgroundOpacity: PropTypes.oneOf(['translucent', 'lightTranslucent', 'transparent']),

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
		 * Enforces a minimum width on the Button.
		 *
		 * *NOTE*: This property's default is `true` and must be explicitly set to `false` to allow
		 * the button to shrink to fit its contents.
		 *
		 * @type {Boolean}
		 * @default true
		 * @public
		 */
		minWidth: PropTypes.bool,

		/**
		 * Indicates the button is 'on'.
		 *
		 * @type {Boolean}
		 * @default false
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
		 * Shows toggle indicator.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		toggleIndicator: PropTypes.bool,

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
		type: PropTypes.oneOf(['standard', 'grid'])
	},

	defaultProps: {
		toggleIndicator: false,
		disabled: false,
		minWidth: true,
		selected: false,
		small: false,
		toggleOffLabel: '',
		toggleOnLabel: ''
	},

	styles: {
		css,
		className: 'toggleButton'
	},

	computed: {
		className: ({toggleIndicator, selected, small, styler}) => styler.append({toggleIndicator, selected, small}),
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

	render: ({selected, ...rest}) => {
		delete rest.toggleIndicator;
		delete rest.toggleOffLabel;
		delete rest.toggleOnLabel;

		return (
			<Button {...rest} css={css} aria-pressed={selected} selected={selected} />
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
 * @memberof moonstone/ToggleButton
 * @extends moonstone/ToggleButton.ToggleButtonBase
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
