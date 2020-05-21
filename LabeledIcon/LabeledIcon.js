/**
 * An Agate-themed Labeled Icon component.
 *
 * @example
 * <LabeledIcon icon="star">Hello Enact!</LabeledIcon>
 *
 * @module agate/LabeledIcon
 * @exports LabeledIcon
 * @exports LabeledIconBase
 * @exports LabeledIconDecorator
 */

import kind from '@enact/core/kind';
import {LabeledIconBase as UiLabeledIconBase, LabeledIconDecorator as UiLabeledIconDecorator} from '@enact/ui/LabeledIcon';
import Pure from '@enact/ui/internal/Pure';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Skinnable from '../Skinnable';

import componentCss from './LabeledIcon.module.less';

/**
 * A basic LabeledIcon component structure without any behaviors applied to it.
 *
 * @class LabeledIconBase
 * @memberof agate/LabeledIcon
 * @extends ui/LabeledIcon.LabeledIcon
 * @ui
 * @public
 */
const LabeledIconBase = kind({
	name: 'LabeledIcon',

	propTypes: /** @lends agate/LabeledIcon.LabeledIconBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `labeledIcon` - The root class name
		 * * `label` - Applied to the label element
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object
	},

	styles: {
		css: componentCss,
		className: 'labeledIcon',
		publicClassNames: true
	},

	render: (props) => UiLabeledIconBase.inline({
		iconComponent: Icon,
		...props,
		css: props.css
	})
});

/**
 * Adds Agate specific behaviors to [LabeledIconBase]{@link agate/LabeledIcon.LabeledIconBase}.
 *
 * @hoc
 * @memberof agate/LabeledIcon
 * @mixes agate/LabeledIcon.UiLabeledIconDecorator
 * @mixes agate/Skinnable.Skinnable
 * @mixes ui/Pure.Pure
 * @public
 */
const LabeledIconDecorator = compose(
	UiLabeledIconDecorator, 
	Pure,
	Skinnable
);

/**
 * An Agate-styled icon component with a label.
 *
 * Usage:
 * ```
 * <LabeledIcon icon="star" labelPosition="after">
 *   Favorite
 * </LabeledIcon>
 * ```
 *
 * @class LabeledIcon
 * @memberof agate/LabeledIcon
 * @extends agate/LabeledIcon.LabeledIconBase
 * @mixes agate/LabeledIcon.LabeledIconDecorator
 * @ui
 * @public
 */
const LabeledIcon = LabeledIconDecorator(LabeledIconBase);

export default LabeledIcon;
export {
	LabeledIcon,
	LabeledIconBase,
	LabeledIconDecorator
};
