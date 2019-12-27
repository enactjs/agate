import Input, {InputBase} from '@enact/agate/Input';
import icons from './icons';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {boolean, select, text} from '../../src/enact-knobs';
import {mergeComponentMetadata} from '../../src/utils';

const iconNames = ['', ...icons];

const Config = mergeComponentMetadata('Input', InputBase, Input);
Input.displayName = 'Input';

storiesOf('Agate', module)
	.add(
		'Input',
		() => (
			<Input
				disabled={boolean('disabled', Config)}
				dismissOnEnter={boolean('dismissOnEnter', Config)}
				iconAfter={select('iconAfter', iconNames, Config)}
				iconBefore={select('iconBefore', iconNames, Config)}
				invalid={boolean('invalid', Config)}
				invalidMessage={text('invalidMessage', Config)}
				onBlur={action('onBlur')}
				onChange={action('onChange')}
				onFocus={action('onFocus')}
				placeholder={text('placeholder', Config, 'Input text here')}
				size={select('size', ['small', 'large'], Config)}
				type={text('type', Config)}
			/>
		),
		{
			text: 'The basic Input'
		}
	);
