import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Input, {InputBase} from '@enact/agate/Input';

import icons from './icons';

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
			info: {
				text: 'Basic usage of Input'
			}
		}
	);
