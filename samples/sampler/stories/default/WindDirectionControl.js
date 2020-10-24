import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/knobs';
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
						disabled={boolean('disabled', Config)}
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
