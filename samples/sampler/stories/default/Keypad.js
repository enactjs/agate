import {action} from '@enact/storybook-utils/addons/actions';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Keypad from '@enact/agate/Keypad';

storiesOf('Agate', module)
	.add(
		'Keypad',
		() => {
			return (
				<Keypad onChange={action('onChange')} />
			);
		},
		{
			info: {
				text: 'Basic usage of Keypad'
			}
		}
	);
