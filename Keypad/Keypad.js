/* eslint-disable react/jsx-no-bind */

/*
 * A keypad used to display a sequence of numbers and buttons, like a keyboard.
 */

import {handle, forward, adaptEvent} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Layout, {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';
import Input from '../Input';

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

/*
 * A key used inside a Keypad Layout component.
 */
const Key = kind({
	name: 'Key',

	propTypes: {
		disabled: PropTypes.bool,
		// Event callback fired when this button is clicked. Includes the 'key' key in its event
		// payload to let the clicker know what was clicked inside their callback.
		onKeyButtonClick: PropTypes.func,
		subtext: PropTypes.string,
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

	render: ({children, textComponent, subtextComponent, ...rest}) => {
		delete rest.onKeyButtonClick;
		return (
			<div className={css.keyContainer}>
				<Button
					{...rest}
					size="large"
					css={css}
					icon={children}
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
 * @memberof agate/DateTimePicker
 * @ui
 * @public
 */
const KeypadBase = kind({
	name: 'Key',

	propTypes: {
		disabled: PropTypes.bool,
		handleInputValue: PropTypes.func
	},

	styles: {
		css,
		className: 'keypad'
	},

	render: ({handleInputValue, disabled, ...rest}) => {
		return (
			<Layout align="center end" wrap {...rest} inline className={css.keypad}>
				{KEY_LIST.map((keyText, rowIndex) => {
					return (
						<Cell
							aria-label={keyText.text === 'arrowleftturn' ? $L('Back Space') : keyText.text}
							shrink
							component={Key}
							disabled={disabled}
							key={`key${rowIndex}-${keyText.text}`}
							onKeyButtonClick={() => handleInputValue(keyText.text)}
							text={keyText.text === 'arrowleftturn' || keyText.text === 'phone' ? null : keyText.text}
							subtext={keyText.subtext}
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
		disabled: PropTypes.bool,
		handleInputValue: PropTypes.func,
		value: PropTypes.string
	}

	constructor (props) {
		super(props);
		this.state = {
			keypadInput: '',
			charIndex: 0
		};
	}

	getCharIndex = (e) => {
		this.setState({
			charIndex: e.target.selectionStart
		});
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

		this.setState({
			keypadInput: newKeypadInput
		});
	};

	render () {
		const {handleInputValue, getCharIndex} = this,
			{disabled} = this.props,
			{keypadInput} = this.state;

		return (
			<React.Fragment>
				<KeypadBase handleInputValue={handleInputValue} disabled={disabled} />
				<Input
					className={css.keypadInput}
					css={css}
					onClick={getCharIndex}
					onKeyDown={(e) => handleInputValue(e.key)}
					onKeyUp={getCharIndex}
					type="tel"
					value={keypadInput}
				/>
			</React.Fragment>
		);
	}
}

export default Keypad;
export {
	KeypadBase
};
