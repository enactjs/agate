import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import ri from '@enact/ui/resolution';

import BodyText from '@enact/agate/BodyText';
import Button from '@enact/agate/Button';
import {ContextualPopupDecorator} from '@enact/agate/ContextualPopupDecorator';

const ContextualButtonWithoutArrow = ContextualPopupDecorator({noArrow: true}, Button);
ContextualButtonWithoutArrow.displayName = 'ContextualButtonWithoutArrow';

const Config = mergeComponentMetadata('ContextualPopupDecorator', Button, ContextualButtonWithoutArrow);

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

export const withoutAnArrow = () => (
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
);

withoutAnArrow.storyName = 'without an arrow';
withoutAnArrow.parameters = {
	info: {
		text: 'ContextualPopupDecorator without an arrow by setting {noArrow: true} in config'
	}
};
