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
import Spottable from '@enact/spotlight/Spottable';
import Toggleable from '@enact/ui/Toggleable';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Icon from '../Icon';
import Skinnable from '../Skinnable';

import componentCss from './Switch.module.less';

/**
 * Renders the base level DOM structure of the component.
 *
 * @class SwitchBase
 * @memberof agate/Switch
 * @ui
 * @private
 */
const SwitchBase = kind({
	name: 'Switch',

	propTypes: /** @lends agate/Switch.SwitchBase.prototype */ {
		/**
		 * The icon displayed by the component.
		 *
		 * May be specified as either:
		 *
		 * * A string that represents an icon from the [iconList]{@link agate/Icon.Icon.iconList},
		 * * An HTML entity string, Unicode reference or hex value (in the form '0x...'),
		 * * A URL specifying path to an icon image, or
		 * * An object representing a resolution independent resource (See {@link ui/resolution})
		 *
		 * @see {@link agate/Icon.IconBase.children}
		 * @type {String|Object}
		 * @public
		 */
		children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Disables Switch and becomes non-interactive.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Disables animation.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Sets whether this control is in the 'on' or 'off' state. `true` for 'on', `false` for 'off'.
		 *
		 * @type {Boolean}
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * The current skin for this component.
		 *
		 * @type {String}
		 * @private
		 */
		skin: PropTypes.string
	},

	defaultProps: {
		noAnimation: false
	},

	styles: {
		css: componentCss,
		className: 'switch'
	},

	computed: {
		className: ({noAnimation, selected, styler}) => styler.append({
			animated: !noAnimation,
			selected
		}),
		children: ({children, skin}) => {
			if (children) return children;

			switch (skin) {
				case 'carbon': return 'squarelarge';
				default: return 'circle';
			}
		}
	},

	render: ({children, css, disabled, selected, ...rest}) => {
		delete rest.noAnimation;

		return (
			<div
				{...rest}
				aria-disabled={disabled}
				aria-pressed={selected}
				disabled={disabled}
				role="button"
			>
				<Icon className={css.icon}>
					{children}
				</Icon>
			</div>
		);
	}
});

/**
 * Adds interactive functionality to `Switch`.
 *
 * @class SwitchDecorator
 * @memberof agate/Switch
 * @mixes ui/Toggleable.Toggleable
 * @mixes ui/Touchable.Touchable
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Skinnable.Skinnable
 * @hoc
 * @public
 */
const SwitchDecorator = compose(
	Toggleable({toggleProp: 'onTap'}),
	Touchable,
	Spottable,
	Skinnable
);

/**
 * An Agate-styled component that looks like a toggle switch.
 *
 * `Switch` will manage its `selected` state via [Toggleable]{@link ui/Toggleable} unless set
 * directly.
 *
 * @class Switch
 * @memberof agate/Switch
 * @extends agate/Switch.SwitchBase
 * @mixes agate/Switch.SwitchDecorator
 * @ui
 * @public
 */
const Switch = SwitchDecorator(SwitchBase);

export default Switch;
export {
	Switch,
	SwitchBase,
	SwitchDecorator
};
