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
 */

import {handle, forward, adaptEvent} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Layout, {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';

import $L from '../internal/$L';

import css from './Keypad.module.less';

const KEY_LIST = [
	{text: '1', subtext: ''},
	{text: '2', subtext: 'abc'},
	{text: '3', subtext: 'def'},
	{text: '4', subtext: 'ghi'},
	{text: '5', subtext: 'jkl'},
	{text: '6', subtext: 'mno'},
	{text: '7', subtext: 'pqrs'},
	{text: '8', subtext: 'tuv'},
	{text: '9', subtext: 'wxyz'},
	{text: '*', subtext: ''},
	{text: '0', subtext: ''},
	{text: '#', subtext: ''},
	{text: 'phone', subtext: ''},
	{text: 'arrowleftturn', subtext: ''}
];

/**
 * Renders an Agate-styled Key button.
 *
 * @class Key
 * @memberof agate/Keypad.Key
 * @public
 */
const Key = kind({
	name: 'Key',

	propTypes: {
		/**
		 * Called when this button is clicked. Includes the 'key' key in its event payload to let the clicker know what was clicked inside their callback.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onKeyButtonClick: PropTypes.func,

		/**
		 * Text displayed below the number/icon/symbol on the key.
		 *
		 * @type {String}
		 * @public
		 */
		subtext: PropTypes.string,

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

	computed: {
		textComponent: ({text}) => {
			return (text != null && text !== '') ? <span className={css.text}>{text}</span> : null;
		},
		subtextComponent: ({subtext}) => {
			return (subtext != null && subtext !== '') ? <span className={css.subtext}>{subtext}</span> : null;
		}
	},

	handlers: {
		onClick: handle(
			forward('onClick'),
			adaptEvent((ev, {children: key}) => ({key}), forward('onKeyButtonClick'))
		)
	},

	render: ({children, subtextComponent, textComponent, ...rest}) => {
		delete rest.onKeyButtonClick;
		return (
			<div className={css.keyContainer}>
				<Button
					{...rest}
					css={css}
					icon={children}
					size="large"
				>
					{textComponent}
					{subtextComponent}
				</Button>
			</div>
		);
	}
});

/**
 * The basic Layout of a Keypad component.
 *
 * @class KeypadBase
 * @memberof agate/Keypad.KeypadBase
 * @ui
 * @public
 */
const KeypadBase = kind({
	name: 'Key',

	propTypes: {
		/**
		 * Applies a disabled style and the control becomes non-interactive.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Called when a button is clicked. Includes the 'key' key in its event payload, updates the state and the input value accordingly.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		handleInputValue: PropTypes.func
	},

	styles: {
		css,
		className: 'keypad'
	},

	render: ({handleInputValue, disabled, ...rest}) => {
		return (
			<Layout {...rest} align="center end" className={css.keypad} inline wrap>
				{KEY_LIST.map((keyText, rowIndex) => {
					return (
						<Cell
							aria-label={keyText.text === 'arrowleftturn' ? $L('Back Space') : keyText.text}
							component={Key}
							disabled={disabled}
							key={`key${rowIndex}-${keyText.text}`}
							onKeyButtonClick={() => handleInputValue(keyText.text)}
							shrink
							subtext={keyText.subtext}
							text={keyText.text === 'arrowleftturn' || keyText.text === 'phone' ? null : keyText.text}
						>
							{keyText.text === 'arrowleftturn' || keyText.text === 'phone' ? keyText.text : null}
						</Cell>
					);
				})}
			</Layout>
		);
	}
});

/**
 * A Keypad component with an Input to display the outcome.
 *
 * @class Keypad
 * @memberof agate/Keypad
 * @extends agate/Keypad.KeypadBase
 * @mixes agate/Input
 * @ui
 * @public
 */
class Keypad extends React.Component {
	static propTypes = /** @lends agate/Keypad.prototype */ {
		/**
		 * Applies a disabled style and the control becomes non-interactive.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Called when a button is clicked. Includes the 'key' key in its event payload, updates the state and the input value accordingly.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		handleInputValue: PropTypes.func,

		/**
		 * Called when the input value is changed.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * The value of the input.
		 *
		 * @type {String}
		 * @public
		 */
		value: PropTypes.string
	}

	constructor (props) {
		super(props);

		this.state = {
			keypadInput: '',
			charIndex: 0
		};
	}

	handleInputValue = (keyValue) => {
		const {keypadInput, charIndex} = this.state;
		let newKeypadInput = keypadInput;
		let newCharIndex;

		switch (keyValue) {
			case 'arrowleftturn':
			case 'Backspace':
				newCharIndex = charIndex;
				newKeypadInput = newKeypadInput.substring(0, charIndex - 1) + newKeypadInput.substring(charIndex, newKeypadInput.length);
				newCharIndex = newCharIndex - 1;

				this.setState({
					charIndex: newCharIndex
				});
				break;

			case 'ArrowLeft':
				if (charIndex >= 0) {
					newCharIndex = charIndex;
					newCharIndex = newCharIndex - 1;

					this.setState({
						charIndex: newCharIndex
					});
				}
				break;

			case 'ArrowRight':
				newCharIndex = charIndex;
				newCharIndex = newCharIndex + 1;

				this.setState({
					charIndex: newCharIndex
				});
				break;

			case 'Delete':
				newCharIndex = charIndex;
				newKeypadInput = newKeypadInput.substring(0, charIndex) + newKeypadInput.substring(charIndex + 1, newKeypadInput.length);
				newCharIndex = newCharIndex - 1;

				this.setState({
					charIndex: newCharIndex
				});
				break;

			case 'ArrowUp':
			case 'ArrowDown':
				// do nothing;
				break;

			case 'phone':
				// method to call dialed number (keypadInput);
				break;

			default:
				newCharIndex = charIndex;
				newKeypadInput = newKeypadInput.substring(0, charIndex) + keyValue + newKeypadInput.substring(charIndex);
				newCharIndex = newCharIndex + 1;

				this.setState({
					charIndex: newCharIndex
				});
				break;
		}

		if (keypadInput !== newKeypadInput) {
			this.props.onChange({value: newKeypadInput});
		}

		this.setState({
			keypadInput: newKeypadInput
		});
	};

	render () {
		const {handleInputValue} = this;
		const {disabled} = this.props;

		return (
			<KeypadBase handleInputValue={handleInputValue} disabled={disabled} />
		);
	}
}

export default Keypad;
