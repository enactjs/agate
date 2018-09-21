/**
 * Agate component to allow the user to choose a color.
 *
 * @example
 * <ColorPicker
 *   spacing="medium"
 * >
 *   A group of related components
 * </ColorPicker>
 *
 * @module agate/ColorPicker
 * @exports ColorPicker
 * @exports ColorPickerBase
 * @exports ColorPickerDecorator
 */

import kind from '@enact/core/kind';
import Changeable from '@enact/ui/Changeable';

import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import {ButtonBase, ButtonDecorator} from '../Button';
import Skinnable from '../Skinnable';

import componentCss from './ColorPicker.less';


/**
 * The color picker base component which sets-up the component's structure.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [ColorPicker]{@link agate/ColorPicker.ColorPicker}.
 *
 * @class ColorPickerBase
 * @memberof agate/ColorPicker
 * @ui
 * @public
 */
const ColorPickerBase = kind({
	name: 'ColorPicker',

	propTypes: /** @lends agate/ColorPicker.ColorPickerBase.prototype */ {
		css: PropTypes.object,
		onChange: PropTypes.func,
		value: PropTypes.string
	},

	styles: {
		css: componentCss,
		className: 'colorPicker',
		publicClassNames: ['colorPicker', 'colorSwatch']
	},

	handlers: {
		onChange: (ev, {onChange}) => {
			if (onChange) {
				onChange({value: ev.target.value});
			}
		}
	},

	computed: {
		colorSwatchStyle: ({value}) => ({backgroundColor: value})
	},

	render: ({colorSwatchStyle, css, onChange, value, ...rest}) => {
		return (
			<ButtonBase {...rest} css={css} minWidth={false}>
				<div className={css.colorSwatch} style={colorSwatchStyle} />
				<input type="color" defaultValue={value} onChange={onChange} className={css.colorInput} />
			</ButtonBase>
		);
	}
});

/**
 * Applies Agate specific behaviors to [ColorPickerBase]{@link agate/ColorPicker.ColorPickerBase}.
 *
 * @hoc
 * @memberof agate/ColorPicker
 * @mixes agate/Skinnable.Skinnable
 * @public
 */

const ColorPickerDecorator = compose(
	ButtonDecorator,
	Changeable,
	Skinnable
);

/**
 * A color picker component, ready to use in Agate applications.
 *
 * @class ColorPicker
 * @memberof agate/ColorPicker
 * @extends agate/ColorPicker.ColorPickerBase
 * @mixes agate/Button.ButtonDecorator
 * @mixes ui/Changeable.Changeable
 * @mixes agate/Skinnable.Skinnable
 * @ui
 * @public
 */
const ColorPicker = ColorPickerDecorator(ColorPickerBase);

export default ColorPicker;
export {
	ColorPicker,
	ColorPickerBase,
	ColorPickerDecorator
};
