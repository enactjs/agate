/*
 * Agate component to allow the user to choose a color.
 *
 * @example
 * <SwatchButton color="#ffcc00" onClick={handleClick} />
 */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {ButtonDecorator as UiButtonDecorator} from '@enact/ui/Button';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import {ButtonBase} from '../Button';
import Skinnable from '../Skinnable';

import componentCss from './SwatchButton.module.less';

/**
 * A swatch component which sets-up the component's structure.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [SwatchButton]{@link agate/ColorPicker.SwatchButton}.
 *
 * @class SwatchButtonBase
 * @memberof agate/ColorPicker
 * @extends agate/Button.ButtonBase
 * @ui
 * @public
 */
const SwatchButtonBase = kind({
	name: 'SwatchButton',

	propTypes: /** @lends agate/ColorPicker.SwatchButtonBase.prototype */ {
		/**
		 * The color of the swatch if the `color` prop is not set.
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
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `swatchButton` - The root class name
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
			<ButtonBase aria-label={colorSwatchStyle.backgroundColor} {...rest} css={css} iconOnly minWidth={false}>
				<div className={css.colorSwatch} style={colorSwatchStyle} />
			</ButtonBase>
		);
	}
});

/**
 * Applies Agate specific behaviors to [SwatchButtonBase]{@link agate/ColorPicker.SwatchButtonBase}.
 *
 * @hoc
 * @memberof agate/ColorPicker
 * @mixes ui/Button.ButtonDecorator
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Skinnable.Skinnable
 * @private
 */
const SwatchButtonDecorator = compose(
	Pure,
	UiButtonDecorator,
	Spottable,
	Skinnable
);

/**
 * A color picker swatch button component.
 *
 * @class SwatchButton
 * @memberof agate/ColorPicker
 * @extends agate/ColorPicker.SwatchButtonBase
 * @mixes agate/ColorPicker.SwatchButtonDecorator
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
