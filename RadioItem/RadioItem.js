/**
 * Provides Agate-ez-themed Item component and interactive radio toggle icon.
 *
 * @module agate-ez/RadioItem
 * @exports RadioItem
 */

import React from 'react';
import PropTypes from 'prop-types';

import kind from '@enact/core/kind';
import Icon from '../Icon';
import Skinnable from '../Skinnable';

import Spottable from '@enact/spotlight/Spottable';
import Toggleable from '@enact/ui/Toggleable';
import Touchable from '@enact/ui/Touchable';
import compose from 'ramda/src/compose';

import componentCss from './RadioItem.less';

/**
 * Renders an `Item` with a radio-dot component. Useful to show a selected state on an Item.
 *
 * @class RadioItem
 * @memberof agate-ez/RadioItem
 * @extends agate/RadioItem.RadioItem
 * @ui
 * @public
 */


const RadioItemBase = kind({
	name: 'RadioItemBase',

	propTypes: /** @lends agate/Divider.DividerBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
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
		 * Customize the component used as the icon label.
		 *
		 * @type {Element|Function|String}
		 * @default {@link agate/Switch.Switch}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),

		/**
		 * Customize the component used as the radio toggle.
		 *
		 * @type {Element|Function|String}
		 * @default {@link agate/Switch.Switch}
		 * @public
		 */
		radioIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),

		/**
		 * If true the radio toggle will be selected.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool
	},

	defaultProps: {
		radioIcon: 'circle',
		selected: false
	},

	styles: {
		css: componentCss,
		className: 'radioItem',
		publicClassNames: true
	},

	computed: {
		className: ({css, selected, styler}) => styler.append(selected && css.selected),
		icon: ({css, icon}) => (icon ? <Icon small className={css.icon}>{icon}</Icon> : null)
	},

	render: ({children, css, icon, radioIcon, ...rest}) => {
		delete rest.selected;

		return (
			<div {...rest} css={css}>
				{icon}
				<div
					className={css.text}
				>
					{children}
				</div>
				<Icon className={css.radioIcon}>
					{radioIcon}
				</Icon>
			</div>
		);
	}
});


const RadioItemDecorator = compose(
	Toggleable({toggleProp: 'onTap'}),
	Touchable,
	Spottable,
	Skinnable
);

const RadioItem = RadioItemDecorator(RadioItemBase);

export default RadioItem;
export {
	RadioItem
};
