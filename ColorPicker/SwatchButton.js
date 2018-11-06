/**
 * Agate component to allow the user to choose a color.
 *
 * @example
 * <SwatchButton color="#ffcc00" onClick={handleClick} />
 *
 * @module agate/SwatchButton
 * @exports SwatchButton
 * @exports SwatchButtonBase
 * @exports SwatchButtonDecorator
 */

import kind from '@enact/core/kind';

import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import {ButtonBase, ButtonDecorator} from '../Button';
import Skinnable from '../Skinnable';

import componentCss from './SwatchButton.less';


/**
 * The color picker base component which sets-up the component's structure.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [SwatchButton]{@link agate/SwatchButton.SwatchButton}.
 *
 * @class SwatchButtonBase
 * @memberof agate/SwatchButton
 * @ui
 * @public
 */
const SwatchButtonBase = kind({
	name: 'SwatchButton',

	propTypes: /** @lends agate/SwatchButton.SwatchButtonBase.prototype */ {
		/**
		 * The color of the swatch. If the `color` prop is not set.
		 *
		 * The value should take the format of a HEX color. Ex: `#ffcc00` or `#3467af`
		 *
		 * @type {String}
		 * @public
		 */
		children: PropTypes.string,

		/**
		 * The color of the swatch.
		 *
		 * The value should take the format of a HEX color. Ex: `#ffcc00` or `#3467af`
		 *
		 * @type {String}
		 * @public
		 */
		color: PropTypes.string,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `colorPicker` - The root class name
		 * * `colorSwatch` - The node that displays the chosen color. The current value is applied
		 * 		as a background-color to this element.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Callback method with a payload containing the `value` that was just selected.
		 *
		 * @type {Function}
		 * @public
		 */
		onClick: PropTypes.func
	},

	styles: {
		css: componentCss,
		className: 'swatchButton',
		publicClassNames: ['swatchButton', 'colorSwatch']
	},

	handlers: {
		onClick: (ev, {children, color, onClick}) => {
			if (onClick) {
				onClick({color: color || children});
			}
		}
	},

	computed: {
		colorSwatchStyle: ({children, color}) => ({backgroundColor: color ? color : children})
	},

	render: ({colorSwatchStyle, css, ...rest}) => {
		return (
			<ButtonBase {...rest} css={css} minWidth={false}>
				<div className={css.colorSwatch} style={colorSwatchStyle} />
			</ButtonBase>
		);
	}
});

/**
 * Applies Agate specific behaviors to [SwatchButtonBase]{@link agate/SwatchButton.SwatchButtonBase}.
 *
 * @hoc
 * @memberof agate/SwatchButton
 * @mixes agate/Skinnable.Skinnable
 * @public
 */

const SwatchButtonDecorator = compose(
	ButtonDecorator,
	Skinnable
);

/**
 * A color picker component, ready to use in Agate applications.
 *
 * @class SwatchButton
 * @memberof agate/SwatchButton
 * @extends agate/SwatchButton.SwatchButtonBase
 * @mixes agate/Button.ButtonDecorator
 * @mixes ui/Changeable.Changeable
 * @mixes agate/Skinnable.Skinnable
 * @ui
 * @public
 */
const SwatchButton = SwatchButtonDecorator(SwatchButtonBase);

export default SwatchButton;
export {
	SwatchButton,
	SwatchButtonBase,
	SwatchButtonDecorator
};
