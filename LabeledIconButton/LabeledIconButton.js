import kind from '@enact/core/kind';
import UiLabeledIcon from '@enact/ui/LabeledIcon';
import PropTypes from 'prop-types';
import React from 'react';

import {ButtonBase, ButtonDecorator} from '../Button';
import Skinnable from '../Skinnable';

import componentCss from './LabeledIconButton.less';

const Button = Skinnable(ButtonBase);

/**
 * An icon button component with a label.
 *
 * @class LabeledIconButtonBase
 * @memberof agate/LabeledIconButton
 * @extends ui/LabeledIcon.LabeledIcon
 * @ui
 * @public
 */
const LabeledIconButtonBase = kind({
	name: 'LabeledIconButton',

	propTypes: /** @lends agate/LabeledIconButton.LabeledIconButtonBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `labeledIconButton` - The root component class
		 * * `icon` - The icon component class
		 * * `label` - The label component class
		 * * `selected` - Applied to a `selected` button
		 * * `small` - Applied to a `small` button
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The icon displayed within the button.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.string,

		/**
		 * Selects the component.
		 *
		 * Setting `selected` may be useful when the component represents a toggleable option. The
		 * visual effect may be customized using the
		 * [css]{@link agate/LabeledIconButton.LabeledIconButtonBase.css} prop.
		 */
		selected: PropTypes.bool
	},

	styles: {
		css: componentCss,
		className: 'labeledIconButton',
		publicClassNames: ['labeledIconButton', 'icon', 'label', 'selected', 'small']
	},

	render: ({css, icon, selected, ...rest}) => {
		return UiLabeledIcon.inline({
			...rest,
			icon: (
				<Button selected={selected} icon={icon} className={css.button} />
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
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const LabeledIconButtonDecorator = ButtonDecorator;

/**
 * A Agate-styled icon button component with a label.
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
