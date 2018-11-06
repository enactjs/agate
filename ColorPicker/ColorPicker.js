/**
 * Agate component to allow the user to choose a color.
 *
 * @example
 * <ColorPicker defaultValue="#ffcc00" onChange={handleChange}>{[#fff, #999, #000]}</ColorPicker>
 *
 * @module agate/ColorPicker
 * @exports ColorPicker
 * @exports ColorPickerBase
 * @exports ColorPickerDecorator
 */

import kind from '@enact/core/kind';
import Changeable from '@enact/ui/Changeable';
import Group from '@enact/ui/Group';
import Toggleable from '@enact/ui/Toggleable';
import Transition from '@enact/ui/Transition';

import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';
import SwatchButton from './SwatchButton';

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
		children: PropTypes.array,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `colorPicker` - The root class name
		 * * `palette` - The drawer that displays all the available options for color.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The animation direction of the `palette`.
		 * // TODO: position `palette` like `Tooltip`
		 *
		 * @type {Function}
		 * @public
		 */
		direction: PropTypes.string,

		/**
		 * Callback method with a payload containing the `color` that was just selected.
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * Opens ColorPicker with the contents visible.
		 *
		 * @type {Boolean}
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * The color value. Setting this directly will not allow interaction with the
		 * component. Use `defaultValue` to enable interactive use.
		 *
		 * The color should take the format of a HEX color. Ex: `#ffcc00` or `#3467af`
		 *
		 * @type {String}
		 * @see {@link ui/Changeable.Changeable}
		 * @public
		 */
		value: PropTypes.string
	},

	defaultProps: {
		direction: 'right',
		open: false
	},

	styles: {
		css: componentCss,
		className: 'colorPicker',
		publicClassNames: ['colorPicker', 'palette']
	},

	handlers: {
		onChange: (ev, {onChange}) => {
			if (onChange) {
				onChange({value: ev.data});
			}
		}
	},

	computed: {
		transitionContainerClassname: ({css, open, styler}) => styler.join(css.transitionContainer, (open ? css.openTransitionContainer : null)),
		transitionDirection: ({direction}) => {
			switch (direction) {
				case 'left':
					return 'right';
				case 'right':
					return 'left';
				case 'up':
					return 'down';
				case 'down':
					return 'up';
			}
		}
	},

	render: ({children, css, onChange, open, transitionContainerClassname, transitionDirection, value, ...rest}) => {
		return (
			<div {...rest}>
				<SwatchButton>{value}</SwatchButton>
				<Transition
					className={transitionContainerClassname}
					visible={open}
					direction={transitionDirection}
				>
					<div className={css.palette}>
						<Group
							className={css.group}
							childComponent={SwatchButton}
							itemProps={{small: true, className: css.swatch}}
							onSelect={onChange}
						>{children || []}</Group>
					</div>
				</Transition>
			</div>
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
	Toggleable({toggle: null, prop: 'open', toggleProp: 'onClick'}),
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
