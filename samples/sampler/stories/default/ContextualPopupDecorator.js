import {ContextualPopupDecorator} from '@enact/agate/ContextualPopupDecorator';
import BodyText from '@enact/agate/BodyText';
import Button from '@enact/agate/Button';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';

const ContextualButton = ContextualPopupDecorator(Button);
ContextualButton.displayName = 'ContextualButton';

const ContextualButtonWithoutArrow = ContextualPopupDecorator({noArrow: true}, Button);
ContextualButtonWithoutArrow.displayName = 'ContextualButtonWithoutArrow';

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

storiesOf('Agate', module)
	.add(
		'ContextualPopupDecorator',
		() => (
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
		),
		{
			info: {
				text: 'Basic usage of ContextualPopupDecorator'
			}
		}
	);

storiesOf('Agate QA.ContextualPopupDecorator', module)
	.add(
		'without an arrow',
		() => (
			<div style={{textAlign: 'center', marginTop: ri.scaleToRem(99)}}>
				<ContextualButtonWithoutArrow
					direction={select('direction', ['above', 'above center', 'above left', 'above right', 'below', 'below center', 'below left', 'below right', 'left middle', 'left top', 'left bottom', 'right middle', 'right top', 'right bottom'], Config)}
					noAutoDismiss={boolean('noAutoDismiss', Config)}
					offset={select('offset', ['none', 'overlap', 'small'], Config, 'small')}
					onClose={action('onClose')}
					open={boolean('open', Config)}
					popupComponent={renderPopup}
					showCloseButton={boolean('showCloseButton', Config)}
					spotlightRestrict={select('spotlightRestrict', ['none', 'self-first', 'self-only'], Config)}
				>
					{text('button string', Config, 'Hello Contextual Button')}
				</ContextualButtonWithoutArrow>
				<BodyText centered>Use KNOBS to interact with the ContextualPopup.</BodyText>
			</div>
		),
		{
			info: {
				text: 'ContextualPopupDecorator without an arrow by setting {noArrow: true} in config'
			}
		}
	);
