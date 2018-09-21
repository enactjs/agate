/**
 * Agate styled labeled divider components and behaviors
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

import Button from '../Button';
import Icon from '../Icon';
import Skinnable from '../Skinnable';

import componentCss from './ColorPicker.less';
import buttonCss from '../Button/Button.less';

const onColorChange = (ev) => {
	console.log({value: ev.target.value});
};

/**
 * A labeled divider component.
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
		/**
		 * The text for the label of the divider.
		 *
		 * A divider with no children (text content) will render simply as a horizontal line, with
		 * even spacing above and below.
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Add an optional icon to the divider. This accepts any value that [Icon]{@agate/Icon}
		 * supports.
		 *
		 * @type {String}
		 */
		icon: PropTypes.string,

		/**
		 * The size of the spacing around the divider.
		 *
		 * Allowed values include:
		 * * `'normal'` (default) - slightly larger than the standard component spacing.
		 * * `'small'` - same size as component spacing.
		 * * `'medium'` - 2x component.
		 * * `'large'` - 3x component.
		 * * `'none'` - no spacing at all. Neighboring elements will directly touch the divider.
		 *
		 * _Note:_ Spacing is separate from margin with regard to `margin-top`. It ensures a
		 * consistent distance from the bottom horizontal line. It's safe to use `margin-top` to add
		 * additional spacing above the divider.
		 *
		 * @type {String}
		 * @default 'normal'
		 * @public
		 */
		spacing: PropTypes.oneOf(['normal', 'small', 'medium', 'large', 'none']),

		/**
		 * Metadata indicating whether this divider is the start of a new "section" on the screen or
		 * just a heading/label of a sub-section.
		 *
		 * @type {Boolean}
		 */
		startSection: PropTypes.bool
	},

	// defaultProps: {
	// 	spacing: 'normal'
	// },

	styles: {
		css: {...buttonCss, ...componentCss},
		className: 'colorPicker',
		publicClassNames: ['colorPicker', 'icon', 'startSection']
	},

	computed: {
		className: ({spacing, startSection, styler}) => styler.append(spacing, {startSection}),
		colorDisplayStyle: ({value}) => ({color: 'green', backgroundColor: value}),
		icon: ({css, icon}) => (icon ? <Icon small className={css.icon}>{icon}</Icon> : null)
	},

	render: ({children, colorDisplayStyle, css, onChange, icon, value, ...rest}) => {
		delete rest.spacing;
		delete rest.startSection;
		console.log({value, colorDisplayStyle});

		return (
			<Button {...rest} css={css} minWidth={false}>
				<div className={css.colorDisplay} style={colorDisplayStyle} />
				<input type="color" defaultValue={value} onChange={onChange} className={css.colorInput} />
			</Button>
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
	Changeable,
	Skinnable
);

/**
 * A labeled divider component, ready to use in Agate applications.
 *
 * `ColorPicker` may be used as a header to group related components.
 *
 * Usage:
 * ```
 * <ColorPicker
 *   spacing="medium"
 * >
 *   Related Settings
 * </ColorPicker>
 * ```
 *
 * @class ColorPicker
 * @memberof agate/ColorPicker
 * @extends agate/ColorPicker.ColorPickerBase
 * @mixes agate/ColorPicker.ColorPickerDecorator
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
