/**
 * Provides Agate-themed Item component and interactive radio toggle icon.
 *
 * @example
 * <RadioItem>Item</RadioItem>
 *
 * @module agate/RadioItem
 * @exports RadioItem
 * @exports RadioItemBase
 * @exports RadioItemDecorator
 */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Toggleable from '@enact/ui/Toggleable';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Icon from '../Icon';
import Item from '../Item';
import Skinnable from '../Skinnable';

import componentCss from './RadioItem.module.less';

/**
 * Renders an `Item` with a radio-dot component. Useful to show a selected state on an Item.
 *
 * @class RadioItemBase
 * @memberof agate/RadioItem
 * @extends agate/Item.Item
 * @ui
 * @public
 */
const RadioItemBase = kind({
	name: 'RadioItemBase',

	propTypes: /** @lends agate/RadioItem.RadioItemBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `radioIcon` - Class name for the radio toggle icon
		 * * `radioItem` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The icon to display when selected.
		 *
		 * @type {String}
		 * @see {@link agate/Icon.Icon}
		 * @default 'circle'
		 */
		icon: PropTypes.string,

		/**
		 * Sets the RadioItem to its 'on' state.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool
	},

	defaultProps: {
		icon: 'circle',
		selected: false
	},

	styles: {
		css: componentCss,
		className: 'radioItem',
		publicClassNames: true
	},

	computed: {
		className: ({css, selected, styler}) => styler.append(selected && css.selected)
	},

	render: ({children, css, icon, selected, ...rest}) => {
		return (
			<Item
				aria-checked={selected}
				role="checkbox"
				{...rest}
				css={css}
			>
				<Icon slot="slotBefore" className={css.icon} size="small">{icon}</Icon>
				{children}
			</Item>
		);
	}
});

/**
 * Applies Agate specific behaviors to [RadioItem]{@link agate/RadioItem.RadioItem} components.
 *
 * @hoc
 * @memberof agate/RadioItem
 * @mixes ui/Toggleable.Toggleable
 * @mixes ui/Touchable.Touchable
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const RadioItemDecorator = compose(
	Toggleable({toggleProp: 'onTap'}),
	Touchable,
	Spottable,
	Skinnable
);

/**
 * An Agate-styled RadioItem.
 *
 * @class RadioItem
 * @memberof agate/RadioItem
 * @extends agate/RadioItem.RadioItemBase
 * @mixes agate/RadioItem.RadioItemDecorator
 * @ui
 * @public
 */
const RadioItem = RadioItemDecorator(RadioItemBase);

export default RadioItem;
export {
	RadioItem,
	RadioItemBase,
	RadioItemDecorator
};
