import {boolean} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Switch from '@enact/agate/Switch';

const Config = mergeComponentMetadata('Switch', Switch);
Switch.displayName = 'Switch';

storiesOf('Agate', module)
	.add(
		'Switch',
		() => (
			<Switch
				disabled={boolean('disabled', Config)}
			/>
		),
		{
			text: 'Basic usage of Switch'
		}
	);
