import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Input, {InputBase} from '@enact/agate/Input';
import Keypad from "../../../../Keypad";

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);
const ConfigPopup = mergeComponentMetadata('InputPopup');

const prop = {
	numericKind: ['auto', 'joined', 'separated', 'field'],
	popupType: ['fullscreen', 'overlay'],
	size: ['small', 'large'],
	type: ['text', 'password', 'number', 'passwordnumber']
};

storiesOf('Agate', module)
	.add(
		'Keypad',
		() => {
			// const props = {
			// 	// Actions
			// 	onBeforeChange: action('onBeforeChange'),
			// 	onChange: action('onChange'),
			// 	onClose: action('onClose'),
			// 	onComplete: action('onComplete'),
			// 	onOpenPopup: action('onOpenPopup'),
			//
			// 	// Knobs
			// 	type: select('type', prop.type, ConfigPopup),
			// 	popupType: select('popupType', prop.popupType, ConfigPopup),
			// 	size: select('size', prop.size, Config),
			// 	invalid: boolean('invalid', ConfigPopup),
			// 	invalidMessage: text('invalidMessage', ConfigPopup, 'This is a bad value'),
			// 	placeholder: text('placeholder', Config, 'placeholder string'),
			// 	subtitle: text('subtitle', ConfigPopup, 'Title Below Text'),
			// 	title: text('title', ConfigPopup, 'Title Text'),
			// 	disabled: boolean('disabled', Config),
			// 	'aria-label': text('aria-label', ConfigPopup, ''),
			// 	popupAriaLabel: text('popupAriaLabel', ConfigPopup, '')
			// };

			return (<div>
				<Keypad />
			</div>);
		},
		{
			info: {
				text: 'Basic usage of Input'
			}
		}
	);
