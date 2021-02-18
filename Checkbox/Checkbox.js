/**
 * Agate styled checkbox component.
 *
 * @example
 * <Checkbox onToggle={console.log} />
 *
 * @module agate/Checkbox
 * @exports Checkbox
 * @exports CheckboxBase
 * @private
 */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Toggleable from '@enact/ui/Toggleable';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Icon from '../Icon';
import Skinnable from '../Skinnable';

import componentCss from './Checkbox.module.less';

/**
 * A checkbox component, ready to use in Agate applications.
 *
 * `Checkbox` may be used independently to represent a toggleable state but is more commonly used as
 * part of [CheckboxItem]{@link agate/CheckboxItem}.
 *
 * Usage:
 * ```
 * <Checkbox selected />
 * ```
 *
 * @class CheckboxBase
 * @memberof agate/Checkbox
 * @extends agate/Icon.Icon
 * @ui
 * @public
 */
const CheckboxBase = kind({
	name: 'Checkbox',

	propTypes: /** @lends agate/Checkbox.CheckboxBase.prototype */ {
		/**
		 * The icon displayed when `selected`.
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
		 * @default	'check'
		 * @public
		 */
		children: PropTypes.string,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `checkbox` - The root class name
		 * * `selected` - Applied when the `selected` prop is true
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Disables Checkbox and becomes non-interactive.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Enables the "indeterminate" state.
		 *
		 * An indeterminate, mixed, or half-selected state is typically used in a hierarchy or group
		 * to represent that some, not all, children are selected.
		 *
		 * NOTE: This does not prevent updating the `selected` state. Applications must control this
		 * property directly.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		indeterminate: PropTypes.bool,

		/**
		 * The icon to be used in the `indeterminate` state.
		 *
		 * May be specified as either:
		 *
		 * * A string that represents an icon from the [iconList]{@link agate/Icon.Icon.iconList},
		 * * An HTML entity string, Unicode reference or hex value (in the form '0x...'),
		 * * A URL specifying path to an icon image, or
		 * * An object representing a resolution independent resource (See {@link ui/resolution})
		 *
		 * @type {String}
		 * @default 'minus'
		 * @public
		 */
		indeterminateIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Sets whether this control is in the 'on' or 'off' state. `true` for 'on', `false` for 'off'.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool
	},

	defaultProps: {
		children: 'check',
		indeterminateIcon: 'minus'
	},

	styles: {
		css: componentCss,
		className: 'checkbox',
		publicClassNames: true
	},

	computed: {
		className: ({indeterminate, selected, styler}) => styler.append({selected, indeterminate}),
		children: ({indeterminate, indeterminateIcon, children}) => (indeterminate ? indeterminateIcon : children)
	},

	render: ({children, css, disabled, selected, ...rest}) => {
		delete rest.indeterminate;
		delete rest.indeterminateIcon;

		return (
			<div
				{...rest}
				aria-checked={selected}
				aria-disabled={disabled}
				disabled={disabled}
				role="checkbox"
			>
				<div className={css.bg} />
				<Icon
					size="small"
					className={css.icon}
				>
					{children}
				</Icon>
			</div>
		);
	}
});

/**
 * Adds interactive functionality to `Checkbox`.
 *
 * @class CheckboxDecorator
 * @memberof agate/Checkbox
 * @mixes ui/Toggleable.Toggleable
 * @mixes ui/Touchable.Touchable
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Skinnable.Skinnable
 * @hoc
 * @public
 */
const CheckboxDecorator = compose(
	Toggleable({toggleProp: 'onClick'}),
	Touchable,
	Spottable,
	Skinnable
);

/**
 * An Agate-styled checkbox component.
 *
 * `Checkbox` will manage its `selected` state via [Toggleable]{@link ui/Toggleable} unless set
 * directly.
 *
 * @class Checkbox
 * @memberof agate/Checkbox
 * @extends agate/Checkbox.CheckboxBase
 * @mixes agate/Checkbox.CheckboxDecorator
 * @ui
 * @public
 */
const Checkbox = CheckboxDecorator(CheckboxBase);

export default Checkbox;
export {
	Checkbox,
	CheckboxBase,
	CheckboxDecorator
};
