import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Keypad from '@enact/agate/Keypad';

const Config = mergeComponentMetadata('Keypad', Keypad);

storiesOf('Agate', module)
	.add(
		'Keypad',
		() => {
			return (
				<Keypad
					disabled={boolean('disabled', Config)}
					onChange={action('onChange')}
				/>
			);
		},
		{
			info: {
				text: 'Basic usage of Keypad'
			}
		}
	);
