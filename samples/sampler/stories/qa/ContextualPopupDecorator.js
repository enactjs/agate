import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import BodyText from '@enact/agate/BodyText';
import Button from '@enact/agate/Button';
import {ContextualPopupDecorator} from '@enact/agate/ContextualPopupDecorator';

const ContextualButtonWithoutArrow = ContextualPopupDecorator(
	{noArrow: true},
	Button
);
ContextualButtonWithoutArrow.displayName = 'ContextualButtonWithoutArrow';

const Config = mergeComponentMetadata(
	'ContextualPopupDecorator',
	Button,
	ContextualButtonWithoutArrow
);

// NOTE: Something about the HOC is inhibiting accessing its defaultProps, so we're adding them here
// manually. This can (should) be revisited later to find out why and a solution.
Config.defaultProps = {
	direction: 'below center',
	open: false,
	spotlightRestrict: 'self-first'
};

export default {
	title: 'Agate/ContextualPopupDecorator',
	component: 'ContextualPopupDecorator'
};
export const withoutAnArrow = (args) => {
	const renderPopup = () => <div>{args['popup string']}</div>;

	return (
		<div style={{textAlign: 'center', marginTop: ri.scaleToRem(99)}}>
			<ContextualButtonWithoutArrow
				direction={args['direction']}
				noAutoDismiss={args['noAutoDismiss']}
				offset={args['offset']}
				onClose={action('onClose')}
				open={args['open']}
				popupComponent={renderPopup}
				showCloseButton={args['showCloseButton']}
				spotlightRestrict={args['spotlightRestrict']}
			>
				{args['button string']}
			</ContextualButtonWithoutArrow>
			<BodyText centered>
				Use CONTROLS to interact with the ContextualPopup.
			</BodyText>
		</div>
	);
};
select(
	'direction',
	withoutAnArrow,
	[
		'above',
		'above center',
		'above left',
		'above right',
		'below',
		'below center',
		'below left',
		'below right',
		'left middle',
		'left top',
		'left bottom',
		'right middle',
		'right top',
		'right bottom'
	],
	Config
);
boolean('noAutoDismiss', withoutAnArrow, Config);
select('offset', withoutAnArrow, ['none', 'overlap', 'small'], Config, 'small');
boolean('open', withoutAnArrow, Config);
boolean('showCloseButton', withoutAnArrow, Config);
select(
	'spotlightRestrict',
	withoutAnArrow,
	['none', 'self-first', 'self-only'],
	Config
);
text('button string', withoutAnArrow, Config, 'Hello Contextual Button');
text(
	'popup string',
	withoutAnArrow,
	{groupId: 'Popup'},
	'Hello Contextual Popup'
);
withoutAnArrow.storyName = 'without an arrow';
withoutAnArrow.parameters = {
	info: {
		text:
      'ContextualPopupDecorator without an arrow by setting {noArrow: true} in config'
	}
};
