import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import LabeledIconButton from '@enact/agate/LabeledIconButton';
import {PopupMenu, PopupMenuBase} from '@enact/agate/PopupMenu';

const Config = mergeComponentMetadata('PopupMenu', PopupMenuBase);

storiesOf('Agate', module)
	.add(
		'PopupMenu',
		() => (
			<div>
				<PopupMenu
					closeButton={boolean('closeButton', Config)}
					closeButtonLabel={text('closeButtonLabel', Config)}
					noAnimation={boolean('noAnimation', Config)}
					noAutoDismiss={boolean('noAutoDismiss', Config)}
					onClose={action('onClose')}
					onHide={action('onHide')}
					open={boolean('open', Config)}
					orientation={select('orientation', ['horizontal'], Config)}
					scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config, 'translucent')}
					spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config, 'self-only')}
					title={text('title', Config, 'Title')}
				>
					<LabeledIconButton
						inline
						icon="profileA1"
						size="huge"
						backgroundOpacity="lightOpaque"
					>User1</LabeledIconButton>
				</PopupMenu>
				Use KNOBS to interact with PopupMenu.
			</div>
		),
		{
			text: 'Basic usage of PopupMenu'
		}
	);
