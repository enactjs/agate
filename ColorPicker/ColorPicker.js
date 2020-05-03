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
import {adaptEvent, forward, handle, oneOf} from '@enact/core/handle';
import {on, off} from '@enact/core/dispatcher';
import {Row, Cell} from '@enact/ui/Layout';
import Changeable from '@enact/ui/Changeable';
import Group from '@enact/ui/Group';
import PropTypes from 'prop-types';
import Pure from '@enact/ui/internal/Pure';
import React, {useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Toggleable from '@enact/ui/Toggleable';
import Transition from '@enact/ui/Transition';

import Skinnable from '../Skinnable';
import Button from '../Button';
import {Slider as AgateSlider} from '../Slider';
import SwatchButton from './SwatchButton';

import componentCss from './ColorPicker.module.less';

const ContainerDiv = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');

// TODO: mske these converters more robust with support for different types of adjustments
// helper function to convert HSL values to color hex strings
const convertToHex = ({h, s, l}) => (`#${convert.hsl.hex(h, s, l)}`);
// helper function to convert color hex strings or kewords to hue, saturation, and lightness values
const convertToHSL = (value) => (convert[value.charAt(0) === '#' ? 'hex' : 'keyword'].hsl(value));

function Slider ({adjustment: valueKey, onChange: onChangeValue, value: sliderValue, ...rest}) {
	const [value, setValue] = useState(sliderValue);

	// the `onChange` handler for user interaction
	const onChange = useCallback(
		(ev) => {
			setValue(ev.value);
			if (onChangeValue) {
				onChangeValue({
					adjustment: valueKey.charAt(0), // TODO: maybe also make this component have another prop to indicate what its value key should be to ensure no duplicates?
					value: ev.value
				});
			}
		},
		[onChangeValue, valueKey]
	);

	// update the slider value when it has been changed non-interactively
	useEffect(() => {
		onChange({value: sliderValue});
	}, [onChange, sliderValue]);

	return (
		<AgateSlider {...rest} onChange={onChange} value={value} />
	);

};

Slider.prototype.propTypes = {
	adjustment: PropTypes.string.isRequired,  // could limit this to ['hue', 'saturation', 'lightness'], but what if we want to allow other adjustments?
	onChange: PropTypes.func,
	value: PropTypes.number
};

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
		 * Callback method with a payload containing the `value` of a color `adjustment`.
		 *
		 * Example return value:
		 * {adjustment: 'h', value: 75} // hue value is 75
		 *
		 * @type {Function}
		 * @public
		 */
		onAdjustment: PropTypes.func,

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
		 * The value should take the format of HEX RGB or a CSS color keyword. Ex: `#db7093` or `palevioletred`
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
		onChange: handle(
			// If there is a `data` member in the event, this came from `Group`'s `onSelect` handler and
			// needs to be adapted for `ColorPicker`'s `onChange` handler.  If not, we can just forward it.
			oneOf(
				[
					(ev) => !!('data' in ev),
					adaptEvent(
						({data: value}) => ({value}),
						forward('onChange')
					)
				],
				[() => true, forward('onChange')]
			)
		),
		onAdjustment: handle(
			// forward an adapted event to `ColorPicker`'s`onChange` with the color built using the adjusted
			// h, s, or l value
			adaptEvent(
				({adjustment, value: sliderValue}, {value: currentColor}) => {
					const [h, s, l] = convertToHSL(currentColor);
					const value = convertToHex(Object.assign({h, s, l}, {[adjustment]: sliderValue}));

					return {value};
				},
				forward('onChange')
			),
			// forward original event to supplied `onAdjustment` handler
			forward('onAdjustment')
		)
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

	render: ({children, css, onAdjustment, onChange, onClick, onToggleExtended, open, sliderValues, transitionContainerClassname, transitionDirection, value, ...rest}) => {
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
						<Button icon="ellipsis" size="small" onTap={onToggleExtended} className={css.swatch} />
						<div className={css.sliders}>
							<Row align="center">
								<Cell>
									<label>{$L('Hue')}</label>
									<Slider adjustment="hue" min={0} max={360} onChange={onAdjustment} value={sliderValues.hsl[0]} />
								</Cell>
								<Cell component="label" size="5ex">{sliderValues.hsl[0] + '˚'}</Cell>
							</Row>
							<Row align="center">
								<Cell>
									<label>{$L('Saturation')}</label>
									<Slider adjustment="saturation" min={0} max={100} onChange={onAdjustment} value={sliderValues.hsl[1]} />
								</Cell>
								<Cell component="label" size="5ex">{sliderValues.hsl[1] + '%'}</Cell>
							</Row>
							<Row align="center">
								<Cell>
									<label>{$L('Lightness')}</label>
									<Slider adjustment="lightness" min={0} max={100} onChange={onAdjustment} value={sliderValues.hsl[2]} />
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
		static displayName = 'ColorPickerExtended'

		static propTypes = {
			defaultExtended: PropTypes.bool,
			onChange: PropTypes.func,
			open: PropTypes.bool,
			value: PropTypes.string
		}

		constructor (props) {
			super(props);
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
			const {open} = this.props;

			if (!prevProps.open && open) {
				on('click', this.handleClick);
			} else if (prevProps.open && !open) {
				off('click', this.handleClick);
			}
		}

		componentWillUnmount () {
			off('click', this.handleClick);
		}

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

		render () {
			const {...rest} = this.props;
			delete rest.defaultExtended;

			return (
				<Wrapped
					{...rest}
					extended={this.state.extended}
					onToggleExtended={this.handleToggleExtended}
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
