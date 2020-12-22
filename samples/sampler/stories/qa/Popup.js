import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/agate/Button';
import {Popup, PopupBase} from '@enact/agate/Popup';

const Config = mergeComponentMetadata('Popup', PopupBase);

storiesOf('Popup', module)
	.add(
		'with buttons',
		() => (
			<div>
				<Button>Button</Button>
				<Popup
					centered={boolean('centered', Config)}
					closeButton={boolean('closeButton', Config)}
					noAnimation={boolean('noAnimation', Config)}
					noAutoDismiss={boolean('noAutoDismiss', Config)}
					onClose={action('onClose')}
					onHide={action('onHide')}
					open={boolean('open', Config)}
					position={select('position', ['center', 'top'], Config)}
					scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config, 'translucent')}
					spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config, 'self-only')}
				>
					<div>{text('children', Config, 'Hello Popup')}</div>
					<buttons>
						<Button>NO</Button>
						<Button>YES</Button>
					</buttons>
				</Popup>
				Use KNOBS to interact with Popup.
			</div>
		)
	);
