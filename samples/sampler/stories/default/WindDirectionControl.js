import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';

import WindDirectionControl, {WindDirectionControlBase} from '@enact/agate/WindDirectionControl';

WindDirectionControl.displayName = 'WindDirectionControl';
const Config = mergeComponentMetadata('WindDirectionControl', WindDirectionControlBase, WindDirectionControl);

storiesOf('Agate', module)
	.add(
		'WindDirectionControl',
		() => {
			return (
				<WindDirectionControl
					disabled={boolean('disabled', Config)}
					onChange={action('onChange')}
				/>
			);
		},
		{
			text: 'The basic WindDirectionControl'
		}
	);
