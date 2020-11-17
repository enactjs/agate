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

import Image from '@enact/agate/Image';
import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import {LabeledIconBase as UiLabeledIconBase, LabeledIconDecorator as UiLabeledIconDecorator} from '@enact/ui/LabeledIcon';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import {ButtonBase, ButtonDecorator} from '../Button';
import Skinnable from '../Skinnable';

import componentCss from './LabeledIconButton.module.less';

import profileA1 from './profileA1.png';
import profileA2 from './profileA2.png';
import profileA3 from './profileA3.png';
import profileA4 from './profileA4.png';
import profileB1 from './profileB1.png';
import profileB2 from './profileB2.png';
import profileB3 from './profileB3.png';
import profileB4 from './profileB4.png';
import profileC1 from './profileC1.png';
import profileC2 from './profileC2.png';
import profileC3 from './profileC3.png';
import profileC4 from './profileC4.png';

const Button = Skinnable(ButtonBase);

const src = {
	'hd':  'http://via.placeholder.com/200x200',
	'fhd': 'http://via.placeholder.com/300x300',
	'uhd': 'http://via.placeholder.com/600x600'
};

const profileIcons = {
	profileA1,
	profileA2,
	profileA3,
	profileA4,
	profileB1,
	profileB2,
	profileB3,
	profileB4,
	profileC1,
	profileC2,
	profileC3,
	profileC4
};

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

		// forwarded from Spottable
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
		let profileProps = null;

		if (typeof icon === 'string' && icon.slice(0, 7) === 'profile') {
			profileProps = {
				icon: '',
				iconComponent: (
					<Image
						sizing='fit'
						src={profileIcons[icon]}
						style={{
							width: '100%',
							height: '100%'
						}}
					/>
				),
				backgroundOpacity: 'transparent'
			};
		}

		return UiLabeledIconBase.inline({
			role: 'button',
			...rest,
			icon: (
				<Button
					backgroundOpacity={backgroundOpacity}
					icon={icon}
					iconComponent={iconComponent}
					highlighted={highlighted}
					pressed={pressed}
					selected={selected}
					spriteCount={spriteCount}
					{...profileProps}
				/>
			),
			css
		});
	}
});

/**
 * Adds Agate specific behaviors to [LabeledIconButtonBase]{@link agate/LabeledIconButton.LabeledIconButtonBase}.
 *
 * @hoc
 * @memberof agate/LabeledIconButton
 * @mixes ui/LabeledIcon.LabeledIconDecorator
 * @mixes agate/Button.ButtonDecorator
 * @public
 */
const LabeledIconButtonDecorator = compose(
	UiLabeledIconDecorator,
	ButtonDecorator
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
