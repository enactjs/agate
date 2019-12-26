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
				onChange={action('onChange')}
				disabled={boolean('disabled', Config)}
				iconAfter={select('iconAfter', iconNames, Config)}
				iconBefore={select('iconBefore', iconNames, Config)}
				invalid={boolean('invalid', Config)}
				invalidMessage={text('invalidMessage', Config)}
				placeholder={text('placeholder', Config, 'Input text here')}
				size={select('size', ['small', 'large'], Config)}
				type={text('type', Config)}
				defaultValue=""
			/>
		),
		{
			text: 'The basic Input'
		}
	);
