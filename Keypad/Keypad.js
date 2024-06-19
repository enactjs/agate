/* eslint-disable react/jsx-no-bind */

/**
 * Provides Agate-themed keypad components and behaviors. Used to display a sequence of numbers and buttons, like a keyboard.
 *
 * @example
 * <Keypad />
 *
 * @module agate/Keypad
 * @exports Keypad
 * @exports KeypadBase
 * @exports KeypadDecorator
 */

import {adaptEvent, forward, handle} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import {SpotlightContainerDecorator} from '@enact/spotlight/SpotlightContainerDecorator';
import Layout, {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {Component} from 'react';

import $L from '../internal/$L';
import Button from '../Button';
import Skinnable from '../Skinnable';

import * as css from './Keypad.module.less';

const SpotlightContainerLayout = SpotlightContainerDecorator(
	{enterTo: 'default-element'},
	Layout
);

/**
 * Renders an Agate-styled Key button.
 *
 * @class Key
 * @memberof agate/Keypad
 * @ui
 * @public
 */
const Key = kind({
	name: 'Key',

	propTypes: /** @lends agate/Keypad.Key.prototype */ {
		/**
		 * The icon displayed on the key.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.string,

		/**
		 * Text displayed below the number/icon/symbol on the key.
		 *
		 * @type {String}
		 * @public
		 */
		label: PropTypes.string,

		/**
		 * Called when this button is clicked. Includes the 'key' key in its event payload to let the clicker know what was clicked inside their callback.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onKeyButtonClick: PropTypes.func,

		/**
		 * Text displayed in the center of the key.
		 *
		 * @type {String}
		 * @public
		 */
		text: PropTypes.string
	},

	styles: {
		css,
		className: 'key'
	},

	handlers: {
		onClick: handle(
			forward('onClick'),
			adaptEvent((ev, {children: key}) => ({key}), forward('onKeyButtonClick'))
		)
	},

	render: ({children, label, text, ...rest}) => {
		delete rest.onKeyButtonClick;

		return (
			<div className={css.keyContainer}>
				<Button
					{...rest}
					css={css}
					icon={children}
					marqueeDisabled
					minWidth={false}
					role={null}
					size="large"
				>
					{(text || text === 0) ? <span className={css.text}>{text}</span> : null}
					{(label || label === 0) ? <span className={css.label}>{label}</span> : null}
				</Button>
			</div>
		);
	}
});

/**
 * The basic Layout of a Keypad component.
 *
 * @class KeypadBase
 * @memberof agate/Keypad
 * @extends agate/Keypad.Key
 * @ui
 * @public
 */
const KeypadBase = kind({
	name: 'Keypad',

	propTypes: /** @lends agate/Keypad.KeypadBase.prototype */{
		/**
		 * Renders different icons depending on whether there is an active call or not.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		activeCall: PropTypes.bool,

		/**
		 * Applies a disabled style and the control becomes non-interactive.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Called when a button is clicked. Includes the 'key' key in its event payload and updates the state.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onKeyButtonClick: PropTypes.func,

		/**
		 * The current skin for this component.
		 *
		 * @type {String}
		 * @private
		 */
		skin: PropTypes.string,

		/**
		 * Disables 5-way spotlight from navigating into the component.
		 *
		 * @type {Boolean}
		 * @public
		 */
		spotlightDisabled: PropTypes.bool
	},

	styles: {
		css,
		className: 'keypad'
	},

	computed: {
		keys: ({activeCall, skin}) => {
			const callStatus = activeCall ? 'calldecline' : 'callaccept';
			const editStatus = activeCall ? 'keypad' : 'backspace';

			return [
				{text: '1'},
				{text: '2', label: 'abc'},
				{text: '3', label: 'def'},
				{text: '4', label: 'ghi'},
				{text: '5', label: 'jkl'},
				{text: '6', label: 'mno'},
				{text: '7', label: 'pqrs'},
				{text: '8', label: 'tuv'},
				{text: '9', label: 'wxyz'},
				{text: '*'},
				{text: '0'},
				{text: '#'},
				{icon: skin !== 'silicon' ? 'phone' : callStatus},
				{icon: skin !== 'silicon' ? 'arrowuturn' : editStatus}
			];
		}
	},

	render: ({disabled, keys, onKeyButtonClick, spotlightDisabled, ...rest}) => {
		delete rest.activeCall;

		return (
			<SpotlightContainerLayout {...rest} align="center end" className={css.keypad} inline spotlightDisabled={spotlightDisabled} wrap>
				{keys.map((keyText, rowIndex) => {
					const {icon, text} = keyText;

					let ariaLabel = text;
					if (icon === 'arrowuturn') {
						ariaLabel = $L('backspace');
					} else if (icon === 'phone') {
						ariaLabel = $L('call');
					}

					return (
						<Cell
							aria-label={ariaLabel}
							className={css[icon]}
							component={Key}
							disabled={disabled}
							key={`key${rowIndex}-${text}`}
							label={keyText.label}
							onKeyButtonClick={() => onKeyButtonClick(text || icon)}
							shrink
							text={icon ? null : text}
						>
							{icon ? icon : null}
						</Cell>
					);
				})}
			</SpotlightContainerLayout>
		);
	}
});

/**
 * A Keypad component with specific functionality.
 *
 * @class KeypadBehaviorDecorator
 * @hoc
 * @memberof agate/Keypad
 * @private
 */
const KeypadBehaviorDecorator = hoc((config, Wrapped) => {
	return class extends Component {
		static displayName = 'KeypadBehaviorDecorator';

		static propTypes = /** @lends agate/Keypad.KeypadBehaviorDecorator.prototype */ {
			/**
			 * Called when the value is changed.
			 *
			 * @type {Function}
			 * @param {Object} event
			 * @public
			 */
			onChange: PropTypes.func
		};

		constructor (props) {
			super(props);

			this.state = {
				charIndex: 0,
				keypadValue: ''
			};
		}

		handleKeypadValue = (keyValue) => {
			const {charIndex, keypadValue} = this.state;
			let newKeypadValue = keypadValue;
			let newCharIndex;

			switch (keyValue) {
				case 'arrowuturn':
				case 'backspace':
					newCharIndex = charIndex;
					newKeypadValue = newKeypadValue.substring(0, charIndex - 1) + newKeypadValue.substring(charIndex, newKeypadValue.length);
					if (newCharIndex !== 0) {
						newCharIndex = newCharIndex - 1;
					}
					break;

				case 'phone':
				case 'callaccept':
				case 'calldecline':
				case 'keypad':
					newCharIndex = 0;
					newKeypadValue = '';
					break;

				default:
					newCharIndex = charIndex;
					newKeypadValue = newKeypadValue.substring(0, charIndex) + keyValue + newKeypadValue.substring(charIndex);
					newCharIndex = newCharIndex + 1;
					break;
			}

			if (keypadValue !== newKeypadValue) {
				forward('onChange', {
					value: newKeypadValue
				}, this.props);
			}

			this.setState({
				charIndex: newCharIndex,
				keypadValue: newKeypadValue
			});
		};

		render () {
			return (
				<Wrapped {...this.props} onKeyButtonClick={this.handleKeypadValue} />
			);
		}
	};
});

/**
 * Applies Agate specific behaviors to {@link agate/Keypad.KeypadBase|KeypadBase}
 *
 * @hoc
 * @memberof agate/Keypad
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const KeypadDecorator = compose(
	KeypadBehaviorDecorator,
	Skinnable({prop: 'skin'})
);

/**
 * Provides Agate-themed keypad components and behaviors. Used to display a sequence of numbers and buttons, like a keyboard.
 *
 * @class Keypad
 * @memberof agate/Keypad
 * @extends agate/Keypad.KeypadBase
 * @public
 * @ui
 */
const Keypad = KeypadDecorator(KeypadBase);

export default Keypad;
export {
	Keypad,
	KeypadBase,
	KeypadDecorator
};
