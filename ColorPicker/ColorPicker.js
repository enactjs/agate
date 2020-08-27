/**
 * Agate component to allow the user to choose a color.
 *
 * @example
 * <ColorPicker defaultValue="#ffcc00">{['#fff', '#999', '#000']}</ColorPicker>
 *
 * @module agate/ColorPicker
 * @exports ColorPicker
 * @exports ColorPickerBase
 * @exports ColorPickerDecorator
 */

import convert from 'color-convert';
import compose from 'ramda/src/compose';
import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import {adaptEvent, forward, handle} from '@enact/core/handle';
import {on, off} from '@enact/core/dispatcher';
import {Row, Cell} from '@enact/ui/Layout';
import Changeable from '@enact/ui/Changeable';
import Group from '@enact/ui/Group';
import PropTypes from 'prop-types';
import Pure from '@enact/ui/internal/Pure';
import React from 'react';
import ReactDOM from 'react-dom';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Toggleable from '@enact/ui/Toggleable';
import Transition from '@enact/ui/Transition';

import $L from '../internal/$L';
import Skinnable from '../Skinnable';
import Button from '../Button';
import Slider from '../Slider';
import SwatchButton from './SwatchButton';

import componentCss from './ColorPicker.module.less';

const ContainerDiv = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');

// helper function to convert color hex strings or kewords to hue, saturation, and lightness values
const convertToHSL = (value) => convert[value.charAt(0) === '#' ? 'hex' : 'keyword'].hsl(value);

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
		 * corresponding internal elements and states of this component.
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

		// TODO: position `palette` like `Tooltip`
		/**
		 * The animation direction of the `palette`.
		 *
		 * @type {String}
		 * @public
		 */
		direction: PropTypes.string,

		/**
		 * Determines whether the extended color controls (sliders) are visible
		 *
		 * @type {Boolean}
		 * @public
		 */
		extended: PropTypes.bool,

		/**
		 * Callback method with a payload containing the `color` that was just selected.
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * Callback method passed to the [SwatchButton]{@link agate/ColorPicker.SwatchButton} component with a payload containing the `value` that was just selected.
		 *
		 * @type {Function}
		 * @public
		 */
		onClick: PropTypes.func,

		/**
		 * Callback method with a payload containing the hue value of the selected `color`.
		 *
		 * @type {Function}
		 * @public
		 */
		onHueChanged: PropTypes.func,

		/**
		 * Callback method with a payload containing the lightness value of the selected `color`.
		 *
		 * @type {Function}
		 * @public
		 */
		onLightnessChanged: PropTypes.func,

		/**
		 * Callback method with a payload containing the saturation value of the selected `color`.
		 *
		 * @type {Function}
		 * @public
		 */
		onSaturationChanged: PropTypes.func,

		/**
		 * Callback method passed to the [Button]{@link agate/Button.Button} component as `onTap`. This is used to toggle the visibility of the H/S/L sliders.
		 *
		 * @type {Function}
		 * @public
		 */
		onToggleExtended: PropTypes.func,

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
		open: false,
		value: '#cccccc'
	},

	styles: {
		css: componentCss,
		className: 'colorPicker',
		publicClassNames: ['colorPicker', 'palette']
	},

	computed: {
		children: ({children}) => children || [],
		className: ({extended, styler}) => styler.append({extended}),
		sliderValues: ({value}) => ({hsl: convertToHSL(value)}),
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

	render: ({children, css, onChange, onClick, onHueChanged, onSaturationChanged, onLightnessChanged, onToggleExtended, open, sliderValues, transitionContainerClassname, transitionDirection, value, ...rest}) => {
		delete rest.extended;
		return (
			<div {...rest}>
				<SwatchButton color={value} onClick={onClick} />
				<Transition
					className={transitionContainerClassname}
					visible={open}
					direction={transitionDirection}
				>
					<ContainerDiv className={css.palette} spotlightDisabled={!open} spotlightRestrict="self-only">
						<Group
							childComponent={SwatchButton}
							childProp="color"
							className={css.group}
							itemProps={{size: 'small', className: css.swatch}}
							onSelect={onChange}
						>
							{children}
						</Group>
						<Button aria-label={$L('More')} icon="ellipsis" size="small" onTap={onToggleExtended} className={css.swatch} />
						<div className={css.sliders}>
							<Row align="center">
								<Cell aria-label={$L('Hue')} role="region">
									<label>{$L('Hue')}</label>
									<Slider aria-label={$L('Degree')} value={sliderValues.hsl[0]} min={0} max={360} onChange={onHueChanged} />
								</Cell>
								<Cell component="label" size="5ex">{sliderValues.hsl[0] + '˚'}</Cell>
							</Row>
							<Row align="center">
								<Cell aria-label={$L('Saturation')} role="region">
									<label>{$L('Saturation')}</label>
									<Slider aria-label={$L('Percent')} value={sliderValues.hsl[1]} min={0} max={100} onChange={onSaturationChanged} />
								</Cell>
								<Cell component="label" size="5ex">{sliderValues.hsl[1] + '%'}</Cell>
							</Row>
							<Row align="center">
								<Cell aria-label={$L('Lightness')} role="region">
									<label>{$L('Lightness')}</label>
									<Slider aria-label={$L('Percent')} value={sliderValues.hsl[2]} min={0} max={100} onChange={onLightnessChanged} />
								</Cell>
								<Cell component="label" size="5ex">{sliderValues.hsl[2] + '%'}</Cell>
							</Row>
						</div>
					</ContainerDiv>
				</Transition>
			</div>
		);
	}
});

const ColorPickerExtended = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'ColorPickerExtended';

		static propTypes = {
			defaultExtended: PropTypes.bool,
			onChange: PropTypes.func,
			open: PropTypes.bool,
			value: PropTypes.string
		};

		constructor (props) {
			super(props);
			this.hsl = props.value ? convertToHSL(props.value) : [0, 0, 0];
			this.state = {
				extended: props.defaultExtended || false
			};
		}

		componentDidMount () {
			// TODO: change to using ref/forwardRef/something else?
			// eslint-disable-next-line react/no-find-dom-node
			this.node = ReactDOM.findDOMNode(this);

			if (this.props.open) {
				on('click', this.handleClick);
			}
		}

		componentDidUpdate (prevProps) {
			const {open, value} = this.props;
			if (prevProps.value !== value) {
				this.hsl = convertToHSL(value);
			}

			if (!prevProps.open && open) {
				on('click', this.handleClick);
			} else if (prevProps.open && !open) {
				off('click', this.handleClick);
			}
		}

		componentWillUnmount () {
			off('click', this.handleClick);
		}

		buildValue = ({h = this.hsl[0], s = this.hsl[1], l = this.hsl[2]} = {}) => (
			'#' + convert.hsl.hex(h, s, l)
		);

		clickedOutsidePalette = ({target}) => !this.node.contains(target);

		// This handler is meant to accommodate using `ColorPicker`'s `onChange` prop from
		// `Changeable` as the `onSelect` handler for its `Group` component that lists the set of
		// pre-defined color choices.  `onSelect` sends the chosen value in the `data` prop of its
		// event but `Changeable` expects `value`.  The slider handlers for hue, saturation, and
		// light values in `ColorPickerExtended` use this handler to update the `value` prop via
		// `onChange` as well.
		handleChange = handle(
			adaptEvent(
				({data: value}) => ({value}),
				forward('onChange')
			)
		).bindAs(this, 'handleChange');

		// If a click happened outside the component area (and children of us) dismiss the palette by forwarding the onClick from Toggleable.
		handleClick = handle(
			this.clickedOutsidePalette,
			forward('onClick')
		).bindAs(this, 'handleClick');

		handleToggleExtended = () => {
			this.setState(({extended}) => ({extended: !extended}));
		};

		handleSlider = (type) => ({value: sliderValue}) => {
			this.hsl[('hsl'.indexOf(type))] = sliderValue;
			const value = this.buildValue();
			this.handleChange({data: value});
		};

		render () {
			const {...rest} = this.props;
			delete rest.defaultExtended;

			return (
				<Wrapped
					{...rest}
					extended={this.state.extended}
					onChange={this.handleChange}
					onToggleExtended={this.handleToggleExtended}
					onHueChanged={this.handleSlider('h')}
					onSaturationChanged={this.handleSlider('s')}
					onLightnessChanged={this.handleSlider('l')}
				/>
			);
		}
	};
});

/**
 * Applies Agate specific behaviors to [ColorPickerBase]{@link agate/ColorPicker.ColorPickerBase}.
 *
 * @hoc
 * @memberof agate/ColorPicker
 * @mixes ui/Toggleable.Toggleable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ColorPickerDecorator = compose(
	Pure,
	Changeable,
	Toggleable({toggle: null, prop: 'open', toggleProp: 'onClick'}),
	ColorPickerExtended,
	Skinnable
);

/**
 * A color picker component, ready to use in Agate applications.
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
