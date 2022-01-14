import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Button} from '@enact/agate/Button';
import {Popup, PopupBase} from '@enact/agate/Popup';

Popup.displayName = 'Popup';
const Config = mergeComponentMetadata('Popup', PopupBase);

const prop = {
	buttons: {
		'no buttons': null,
		'1 button': <buttons>
			<Button>OK</Button>
		</buttons>,
		'2 buttons': <buttons>
			<Button>OK</Button>
			<Button>Cancel</Button>
		</buttons>
	}
};

export default {
	title: 'Agate/Popup',
	component: 'Popup'
};

export const _Popup = (args) => {
	const buttonsSelection = args['buttons'];
	const buttons = prop.buttons[buttonsSelection];

	return (
		<div>
			<Popup
				centered={args['centered']}
				closeButton={args['closeButton']}
				duration={args['duration']}
				noAnimation={args['noAnimation']}
				noAutoDismiss={args['noAutoDismiss']}
				onClose={action('onClose')}
				onHide={action('onHide')}
				onShow={action('onShow')}
				open={args['open']}
				position={args['position']}
				scrimType={args['scrimType']}
				spotlightRestrict={args['spotlightRestrict']}
				title={args['title']}
				type={args['type']}
			>
				<div>{args['children']}</div>
				{buttons}
			</Popup>
			Use CONTROLS to interact with Popup.
		</div>
	);
};

select('buttons', _Popup, ['no buttons', '1 button', '2 buttons'], Config, 'no');
boolean('centered', _Popup, Config);
boolean('closeButton', _Popup, Config);
select('duration', _Popup, ['short', 'medium', 'long'], Config);
boolean('noAnimation', _Popup, Config);
boolean('noAutoDismiss', _Popup, Config);
boolean('open', _Popup, Config);
select('position', _Popup, ['bottom', 'center', 'fullscreen', 'left', 'right', 'top'], Config);
select('scrimType', _Popup, ['none', 'translucent', 'transparent'], Config, 'translucent');
select('spotlightRestrict', _Popup, ['self-first', 'self-only'], Config, 'self-only');
text('title', _Popup, Config, 'Title');
select('type', _Popup, [null, 'fade', 'slide'], Config);
text('children', _Popup, Config, 'Hello Popup');

_Popup.storyName = 'Popup';
_Popup.parameters = {
	info: {
		text: 'Basic usage of Popup'
	}
};
