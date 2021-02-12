import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import ri from '@enact/ui/resolution';
import React from 'react';

import BodyText from '@enact/agate/BodyText';
import Button from '@enact/agate/Button';
import {ContextualPopupDecorator} from '@enact/agate/ContextualPopupDecorator';

const ContextualButton = ContextualPopupDecorator(Button);

const Config = mergeComponentMetadata('ContextualPopupDecorator', Button, ContextualButton);

// NOTE: Something about the HOC is inhibiting accessing its defaultProps, so we're adding them here
// manually. This can (should) be revisited later to find out why and a solution.
Config.defaultProps = {
	direction: 'below center',
	open: false,
	spotlightRestrict: 'self-first'
};

const renderPopup = () => (
	<div>{text('popup string', {groupId: 'Popup'}, 'Hello Contextual Popup')}</div>
);

export default {
	title: 'Agate/ContextualPopupDecorator',
	component: 'ContextualPopupDecorator'
};

export const _ContextualPopupDecorator = () => (
	<div style={{textAlign: 'center', marginTop: ri.scaleToRem(99)}}>
		<ContextualButton
			direction={select('direction', ['above', 'above center', 'above left', 'above right', 'below', 'below center', 'below left', 'below right', 'left middle', 'left top', 'left bottom', 'right middle', 'right top', 'right bottom'], Config)}
			noAutoDismiss={boolean('noAutoDismiss', Config)}
			onClose={action('onClose')}
			open={boolean('open', Config)}
			popupComponent={renderPopup}
			showCloseButton={boolean('showCloseButton', Config)}
			spotlightRestrict={select('spotlightRestrict', ['none', 'self-first', 'self-only'], Config)}
		>
			{text('button string', Config, 'Hello Contextual Button')}
		</ContextualButton>
		<BodyText centered>Use KNOBS to interact with the ContextualPopup.</BodyText>
	</div>
);

_ContextualPopupDecorator.storyName = 'ContextualPopupDecorator';
_ContextualPopupDecorator.parameters = {
	info: {
		text: 'Basic usage of ContextualPopupDecorator'
	}
};
