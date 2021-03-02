/**
 * An Agate-themed Labeled Icon component.
 *
 * @example
 * <LabeledIconButton icon="star">Hello Enact!</LabeledIconButton>
 *
 * @module agate/LabeledIconButton
 * @exports LabeledIconButton
 * @exports LabeledIconButtonBase
 * @exports LabeledIconButtonDecorator
 */

import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {ButtonDecorator as UiButtonDecorator} from '@enact/ui/Button';
import Pure from '@enact/ui/internal/Pure';
import {LabeledIconBase as UiLabeledIconBase, LabeledIconDecorator as UiLabeledIconDecorator} from '@enact/ui/LabeledIcon';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import {ButtonBase} from '../Button';
import Skinnable from '../Skinnable';
import TooltipDecorator from '../TooltipDecorator';

import componentCss from './LabeledIconButton.module.less';

const Button = Skinnable(ButtonBase);

/**
 * An icon button component with a label.
 *
 * @class LabeledIconButtonBase
 * @memberof agate/LabeledIconButton
 * @extends ui/LabeledIcon.LabeledIconBase
 * @ui
 * @public
 */
const LabeledIconButtonBase = kind({
	name: 'LabeledIconButton',

	propTypes: /** @lends agate/LabeledIconButton.LabeledIconButtonBase.prototype */ {
		/**
		 * The background opacity of this button.
		 *
		 * Valid values are:
		 * * `'opaque'`,
		 * * `'lightOpaque'`, and
		 * * `'transparent'`.
		 *
		 * @type {('opaque'|'lightOpaque'|'transparent')}
		 * @default 'opaque'
		 * @public
		 */
		backgroundOpacity: PropTypes.oneOf(['opaque', 'lightOpaque', 'transparent']),

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `labeledIconButton` - The root component class
		 * * `icon` - The icon component class
		 * * `label` - The label component class
		 * * `selected` - Applied to a `selected` button
		 * * `small` - Applied to a LabeledIconButton specifying a `size` of `'small'`
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Provides a way to call special interface attention to this button. It will be "featured"
		 * in some way by the theme's visual rules.  This property only has an effect when
		 * `backgroundOpacity` is "opaque".
		 *
		 * @type {Boolean}
		 * @public
		 */
		highlighted: PropTypes.bool,

		/**
		 * The icon displayed within the button.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

		/**
		 * The component used to render the `icon`.
		 *
		 * This will receive the `icon` prop as `children` and should handle it appropriately.It
		 * will also receive the `flip` and `size` props as set on the component.
		 *
		 * @type {Component}
		 */
		iconComponent: EnactPropTypes.component,

		/**
		 * True if button is an icon only button.
		 *
		 * @type {Boolean}
		 * @private
		 */
		iconOnly: PropTypes.bool,

		/**
		 * The position of the label in relation to the icon element.
		 *
		 * Allowed values include:
		 * * 'below' (default),
		 * * 'above',
		 * * 'left',
		 * * 'right',
		 * * 'before', and
		 * * 'after'.
		 *
		 * The 'before' and 'after' values automatically swap sides when in an RTL locale context.
		 *
		 * @type {('above'|'after'|'before'|'below'|'left'|'right')}
		 * @default 'below'
		 * @public
		 */
		labelPosition: PropTypes.oneOf(['above', 'after', 'before', 'below', 'left', 'right']),

		/**
		 * Applies the `pressed` CSS class.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		pressed: PropTypes.bool,

		/**
		 * Selects the component.
		 *
		 * Setting `selected` may be useful when the component represents a toggleable option. The
		 * visual effect may be customized using the
		 * [css]{@link agate/LabeledIconButton.LabeledIconButtonBase.css} prop.
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
		 * The amount of sprite "cells" in the src image.
		 *
		 * @type {Number}
		 * @public
		 */
		spriteCount: PropTypes.number
		// TODO: spriteCount prop bleeds!  Is this cruft?
	},

	styles: {
		css: componentCss,
		className: 'labeledIconButton',
		publicClassNames: true
	},

	computed: {
		className: ({labelPosition, size, styler}) => styler.append((labelPosition === 'above' || labelPosition === 'below') ? '' : size)
	},

	render: ({
		backgroundOpacity,
		css,
		icon,
		iconComponent,
		highlighted,
		pressed,
		selected,
		spriteCount,
		...rest
	}) => {
		delete rest.iconOnly;

		return UiLabeledIconBase.inline({
			role: 'button',
			...rest,
			icon: (
				<Button
					backgroundOpacity={backgroundOpacity}
					icon={icon}
					iconComponent={iconComponent}
					iconOnly
					highlighted={highlighted}
					pressed={pressed}
					selected={selected}
					spriteCount={spriteCount}
				/>
			),
			css
		});
	}
});

/**
 * Adds Agate specific behaviors to [LabeledIconButtonBase]{@link agate/LabeledIconButton.LabeledIconButtonBase}.
 *
 * @memberof agate/LabeledIconButton
 * @hoc
 * @mixes ui/Button.ButtonDecorator
 * @mixes ui/LabeledIcon.LabeledIconDecorator
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Skinnable.Skinnable
 * @mixes agate/TooltipDecorator.TooltipDecorator
 * @public
 */
const LabeledIconButtonDecorator = compose(
	Pure,
	UiButtonDecorator,
	UiLabeledIconDecorator,
	TooltipDecorator,
	Spottable,
	Skinnable
);

/**
 * An Agate-styled icon button component with a label.
 *
 * Usage:
 * ```
 * <LabeledIconButton icon="star" labelPosition="after">
 *   Favorite
 * </LabeledIconButton>
 * ```
 *
 * @class LabeledIconButton
 * @memberof agate/LabeledIconButton
 * @extends agate/LabeledIconButton.LabeledIconButtonBase
 * @mixes agate/LabeledIconButton.LabeledIconButtonDecorator
 * @ui
 * @public
 */
const LabeledIconButton = LabeledIconButtonDecorator(LabeledIconButtonBase);

export default LabeledIconButton;
export {
	LabeledIconButton,
	LabeledIconButtonBase,
	LabeledIconButtonDecorator
};
