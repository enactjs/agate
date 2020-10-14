import {action} from '@enact/storybook-utils/addons/actions';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import WindDirectionControl from '@enact/agate/WindDirectionControl';

WindDirectionControl.displayName = 'WindDirectionControl';

storiesOf('Agate', module)
	.add(
		'WindDirectionControl',
		() => {
			return (
				<div>
					<WindDirectionControl
						onChange={action('onChange')}
						style={{marginTop: ri.scaleToRem(40)}}
					/>
				</div>
			);
		},
		{
			text: 'The basic WindDirectionControl'
		}
	);
