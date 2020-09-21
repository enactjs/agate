import React from 'react';
import {storiesOf} from '@storybook/react';

import WindDirectionControl from '@enact/agate/WindDirectionControl';

WindDirectionControl.displayName = 'WindDirectionControl';

storiesOf('Agate', module)
	.add(
		'WindDirectionControl',
		() => {
			return (
				<div style={{marginTop: '40px'}}>
					<WindDirectionControl />
				</div>
			);
		},
		{
			text: 'The basic WindDirectionControl'
		}
	);
