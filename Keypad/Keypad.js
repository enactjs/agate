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

import {adaptEvent, forward, handle} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import Layout, {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import $L from '../internal/$L';
import Button from '../Button';
import Skinnable from '../Skinnable';

import css from './Keypad.module.less';

const KEY_LIST = [
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
	{icon: 'phone'},
	{icon: 'arrowuturn'}
];

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

	render: ({disabled, handleInputValue, ...rest}) => {
		return (
			<Layout {...rest} align="center end" className={css.keypad} inline wrap>
				{KEY_LIST.map((keyText, rowIndex) => {
					const {icon, text} = keyText;
					const isIcon = icon === 'arrowuturn' || icon === 'phone';

					let ariaLabel = text;
					if (icon === 'arrowuturn') {
						ariaLabel = $L('backspace');
					} else if (icon === 'phone') {
						ariaLabel = $L('call');
					}

					return (
						<Cell
							aria-label={ariaLabel}
							component={Key}
							disabled={disabled}
							key={`key${rowIndex}-${text}`}
							onKeyButtonClick={() => handleInputValue(isIcon ? icon : text)}
							shrink
							label={keyText.label}
							text={isIcon ? null : text}
						>
							{isIcon ? icon : null}
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
 * @class KeypadBehaviorDecorator
 * @memberof agate/Keypad
 * @hoc
 * @public
 */
const KeypadBehaviorDecorator = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'KeypadBehaviorDecorator';

		static propTypes = /** @lends agate/Keypad.KeypadBehaviorDecorator.prototype */ {
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
		};

		constructor (props) {
			super(props);

			this.state = {
				charIndex: 0,
				keypadInput: ''
			};
		}

		handleInputValue = (keyValue) => {
			const {charIndex, keypadInput} = this.state;
			let newKeypadInput = keypadInput;
			let newCharIndex;

			switch (keyValue) {
				case 'arrowuturn':
				case 'Backspace':
					newCharIndex = charIndex;
					newKeypadInput = newKeypadInput.substring(0, charIndex - 1) + newKeypadInput.substring(charIndex, newKeypadInput.length);
					newCharIndex = newCharIndex - 1;
					break;

				case 'ArrowLeft':
					if (charIndex >= 0) {
						newCharIndex = charIndex;
						newCharIndex = newCharIndex - 1;
					}
					break;

				case 'ArrowRight':
					newCharIndex = charIndex;
					newCharIndex = newCharIndex + 1;
					break;

				case 'Delete':
					newCharIndex = charIndex;
					newKeypadInput = newKeypadInput.substring(0, charIndex) + newKeypadInput.substring(charIndex + 1, newKeypadInput.length);
					newCharIndex = newCharIndex - 1;
					break;

				case 'ArrowUp':
				case 'ArrowDown':
					// do nothing;
					break;

				case 'phone':
					// method to call dialed number (keypadInput);

					newCharIndex = 0;
					newKeypadInput = '';
					break;

				default:
					newCharIndex = charIndex;
					newKeypadInput = newKeypadInput.substring(0, charIndex) + keyValue + newKeypadInput.substring(charIndex);
					newCharIndex = newCharIndex + 1;
					break;
			}

			if (keypadInput !== newKeypadInput) {
				this.props.onChange({value: newKeypadInput});
			}

			this.setState({
				charIndex: newCharIndex,
				keypadInput: newKeypadInput
			});
		};

		render () {
			return (
				<Wrapped {...this.props} handleInputValue={this.handleInputValue} />
			);
		}
	};
});

const KeypadDecorator = compose(
	KeypadBehaviorDecorator,
	Skinnable
);

const Keypad = KeypadDecorator(KeypadBase);

export default Keypad;
export {
	Keypad,
	KeypadBase
};
