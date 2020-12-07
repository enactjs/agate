import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import BodyText from '@enact/agate/BodyText';
import Button from '@enact/agate/Button';
import FullscreenPopup, {FullscreenPopupBase} from '@enact/agate/FullscreenPopup';

const Config = mergeComponentMetadata('FullscreenPopup', FullscreenPopup, FullscreenPopupBase);
FullscreenPopup.displayName = 'FullscreenPopup';

storiesOf('Agate', module)
	.add(
		'FullscreenPopup',
		() => (
			<div>
				<FullscreenPopup
					direction={select('direction', ['up', 'right', 'down', 'left'], Config, 'down')}
					duration={select('duration', ['short', 'medium', 'long', '5000ms'], Config, 'short')}
					noAnimation={boolean('noAnimation', Config)}
					open={boolean('open', Config)}
					type={select('type', ['clip', 'fade', 'slide'], Config, 'slide')}
				>
					<BodyText>Hello FullscreenPopup</BodyText>
					<Button size="small">Click me</Button>
				</FullscreenPopup>
				<BodyText centered>Use KNOBS to interact with FullscreenPopup.</BodyText>
			</div>
		),
		{
			text: 'The basic FullscreenPopup'
		}
	);
