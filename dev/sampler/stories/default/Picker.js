import Picker, {PickerBase} from '@enact/agate/Picker';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {boolean} from '../../src/enact-knobs';
import {mergeComponentMetadata} from '../../src/utils';

const Config = mergeComponentMetadata('Picker', Picker);

storiesOf('Agate', module)
	.add(
		'Picker',
		() => (
			<div style={{padding: '0 20%'}}>
				<Picker
					disabled={boolean('disabled', Config)}
					onChange={action('onChange')}
				>
					{['LO', '16\xB0', '17\xB0', '18\xB0', '19\xB0', 'HI']}
				</Picker>
			</div>
		),
		{
			text: 'Basic usage of Picker'
		}
	);
