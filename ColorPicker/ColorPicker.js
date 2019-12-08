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

import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import {on, off} from '@enact/core/dispatcher';
import {forward, handle} from '@enact/core/handle';
import Group from '@enact/ui/Group';
import Toggleable from '@enact/ui/Toggleable';
import {Row, Cell} from '@enact/ui/Layout';
import Transition from '@enact/ui/Transition';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';

import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import ReactDOM from 'react-dom';
import convert from 'color-convert';

import Skinnable from '../Skinnable';
import Button from '../Button';
import Slider from '../Slider';
import SwatchButton from './SwatchButton';

import componentCss from './ColorPicker.module.less';

const ContainerDiv = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');

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
		 * Callback method passed to the [SwatchButton]{@link agate/SwatchButton.SwatchButton} component with a payload containing the `value` that was just selected.
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

	handlers: {
		onChange: (ev, {onChange}) => {
			if (onChange) {
				onChange({value: ev.data});
			}
		}
	},

	computed: {
		className: ({extended, styler}) => styler.append({extended}),
		sliderValues: ({value}) => {
			return {hsl: convert.hex.hsl(value)};
		},
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
				<SwatchButton onClick={onClick}>{value}</SwatchButton>
				<Transition
					className={transitionContainerClassname}
					visible={open}
					direction={transitionDirection}
				>
					<ContainerDiv className={css.palette} spotlightDisabled={!open} spotlightRestrict="self-only">
						<Group
							className={css.group}
							childComponent={SwatchButton}
							itemProps={{size: 'small', className: css.swatch}}
							onSelect={onChange}
						>{children || []}</Group>
						<Button icon="ellipsis" size="small" onTap={onToggleExtended} className={css.swatch} />
						<div className={css.sliders}>
							<Row align="center">
								<Cell>
									<label>Hue</label>
									<Slider value={sliderValues.hsl[0]} min={0} max={360} onChange={onHueChanged} />
								</Cell>
								<Cell component="label" size="5ex">{sliderValues.hsl[0] + '˚'}</Cell>
							</Row>
							<Row align="center">
								<Cell>
									<label>Saturation</label>
									<Slider value={sliderValues.hsl[1]} min={0} max={100} onChange={onSaturationChanged} />
								</Cell>
								<Cell component="label" size="5ex">{sliderValues.hsl[1] + '%'}</Cell>
							</Row>
							<Row align="center">
								<Cell>
									<label>Lightness</label>
									<Slider value={sliderValues.hsl[2]} min={0} max={100} onChange={onLightnessChanged} />
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
	return class extends React.PureComponent {
		static displayName = 'ColorPickerExtended'

		static propTypes = {
			defaultExtended: PropTypes.bool,
			onChange: PropTypes.func,
			open: PropTypes.bool,
			value: PropTypes.string
		}

		constructor (props) {
			super(props);
			this.hsl = convert.hex.hsl(props.value);
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
				this.hsl = convert.hex.hsl(value);
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
		)

		clickedOutsidePalette = ({target}) => !this.node.contains(target)

		handle = handle.bind(this);

		// If a click happened outside the component area (and children of us) dismiss the palette by forwarding the onClick from Toggleable.
		handleClick = this.handle(
			this.clickedOutsidePalette,
			forward('onClick')
		)

		handleToggleExtended = () => {
			this.setState(({extended}) => ({extended: !extended}));
		}

		handleSlider = (type) => ({value: sliderValue}) => {
			this.hsl[('hsl'.indexOf(type))] = sliderValue;
			const value = this.buildValue();
			// this.setState({value});

			if (this.props.onChange) {
				this.props.onChange({value});
			}
		}

		render () {
			const {...rest} = this.props;
			delete rest.defaultExtended;

			return (
				<Wrapped
					{...rest}
					extended={this.state.extended}
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
