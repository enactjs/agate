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
import {cap} from '@enact/core/util';
import Spottable from '@enact/spotlight/Spottable';
import {ButtonBase as UiButtonBase, ButtonDecorator as UiButtonDecorator} from '@enact/ui/Button';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';

import {IconBase} from '../Icon';
// import {MarqueeDecorator} from '../Marquee';
import Skinnable from '../Skinnable';

import componentCss from './Button.module.less';

// Make a basic Icon in case we need it later. This cuts `Pure` out of icon for a small gain.
const Icon = Skinnable(IconBase);

/**
 * A button component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [Button]{@link agate/Button.Button}.
 *
 * @class ButtonBase
 * @memberof agate/Button
 * @extends ui/Button.ButtonBase
 * @ui
 * @public
 */
const ButtonBase = kind({
	name: 'Button',

	propTypes: /** @lends agate/Button.ButtonBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `button` - The root class name
		 * * `bg` - The background node of the button
		 * * `selected` - Applied to a `selected` button
		 * * `small` - Applied to a `small` button
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Provides a way to call special interface attention to this button. It will be "featured"
		 * in some way by the theme's visual rules.
		 *
		 * @type {Boolean}
		 * @public
		 */
		highlighted: PropTypes.bool,

		/**
		 * To create a collection of buttons that appear as one entity: buttons that butt up against
		 * each other. Specify where the button is in the arrangement: 'left', 'center', or 'right'.
		 * This prop is not recommended for use on a lonely button with no other buttons nearby.
		 * Not specifying this optional prop leaves the button behaving normally.
		 *
		 * @type {String}
		 * @public
		 */
		joinedPosition: PropTypes.oneOf(['left', 'center', 'right']),

		/**
		 * Provides a way to call special interface attention to this button. It will be "featured"
		 * in some way by the theme's visual rules.
		 *
		 * @type {Boolean}
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * Specify how this button will be used. Is it a standalone button, or is it in a grid of
		 * other related buttons.
		 *
		 * @type {String}
		 * @public
		 */
		type: PropTypes.oneOf(['grid', 'standard'])
	},

	defaultProps: {
		type: 'standard'
	},

	styles: {
		css: componentCss,
		publicClassNames: true
	},

	computed: {
		className: ({highlighted, joinedPosition, selected, type, styler}) => styler.append(
			type,
			(joinedPosition && 'joined' + cap(joinedPosition)),  // If `joinedPosition` is present, prepend the word "joined" to the variable, so the classes are clearer.
			{highlighted, selected}
		),
		minWidth: ({children}) => (!children)
	},

	render: ({css, ...rest}) => {
		delete rest.highlighted;
		delete rest.joinedPosition;
		delete rest.selected;
		delete rest.type;

		return (<UiButtonBase
			{...rest}
			css={css}
			iconComponent={Icon}
		/>);
	}
});

/**
 * Enforces a minimum width on the Button.
 *
 * *NOTE*: This property's default is `true` and must be explicitly set to `false` to allow
 * the button to shrink to fit its contents.
 *
 * @name minWidth
 * @memberof agate/Button.ButtonBase.prototype
 * @type {Boolean}
 * @default true
 * @public
 */


/**
 * Applies Agate specific behaviors to [Button]{@link agate/Button.ButtonBase} components.
 *
 * @hoc
 * @memberof agate/Button
 * @mixes i18n/Uppercase.Uppercase
 * @mixes agate/Marquee.MarqueeDecorator
 * @mixes ui/Button.ButtonDecorator
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ButtonDecorator = compose(
	Pure,
	// MarqueeDecorator({className: componentCss.marquee}),
	UiButtonDecorator,
	Spottable,
	Skinnable
);

/**
 * A button component, ready to use in Agate applications.
 *
 * Usage:
 * ```
 * <Button
 * 	backgroundOpacity="translucent"
 * 	color="blue"
 * >
 * 	Press me!
 * </Button>
 * ```
 *
 * @class Button
 * @memberof agate/Button
 * @extends agate/Button.ButtonBase
 * @mixes agate/Button.ButtonDecorator
 * @ui
 * @public
 */
const Button = ButtonDecorator(ButtonBase);

export default Button;
export {
	Button,
	ButtonBase,
	ButtonDecorator
};
