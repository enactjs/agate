import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {Popup, PopupBase} from '@enact/agate/Popup';

const Config = mergeComponentMetadata('Popup', PopupBase);

storiesOf('Agate', module)
	.add(
		'Popup',
		() => (
			<div>
				<Popup
					centered={boolean('centered', Config)}
					closeButton={boolean('closeButton', Config)}
					duration={select('duration', ['short', 'medium', 'long'], Config)}
					noAnimation={boolean('noAnimation', Config)}
					noAutoDismiss={boolean('noAutoDismiss', Config)}
					onClose={action('onClose')}
					onHide={action('onHide')}
					open={boolean('open', Config)}
					position={select('position', ['bottom', 'center', 'fullscreen', 'left', 'right', 'top'], Config)}
					scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config, 'translucent')}
					spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config, 'self-only')}
					title={text('title', Config, 'Title')}
					type={select('type', ['fade', 'slide'], Config)}
				>
					<div>{text('children', Config, 'Hello Popup')}</div>
				</Popup>
				Use KNOBS to interact with Popup.
			</div>
		),
		{
			text: 'Basic usage of Popup'
		}
	);
