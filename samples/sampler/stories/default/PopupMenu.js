import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import PopupMenu from '@enact/agate/PopupMenu';

const Config = mergeComponentMetadata('PopupMenu', PopupMenu);

storiesOf('Agate', module)
	.add(
		'PopupMenu',
		() => (
			<div>
				<PopupMenu
					closeButton={boolean('closeButton', Config)}
					noAnimation={boolean('noAnimation', Config)}
					noAutoDismiss={boolean('noAutoDismiss', Config)}
					onClose={action('onClose')}
					onHide={action('onHide')}
					open={boolean('open', Config)}
					orientation={select('orientation', ['horizontal'], Config, 'horizontal')}
					scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config, 'translucent')}
					spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config, 'self-only')}
					title={text('title', Config, 'Title')}
				>
					<div>{text('children', Config, 'Hello Popup')}</div>
				</PopupMenu>
				Use KNOBS to interact with PopupMenu.
			</div>
		),
		{
			text: 'Basic usage of PopupMenu'
		}
	);
