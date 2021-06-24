import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
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

export const _Popup = () => {
	const buttonsSelection = select('buttons', ['no buttons', '1 button', '2 buttons'], Config, 'no');
	const buttons = prop.buttons[buttonsSelection];

	return (
		<div>
			<Popup
				centered={boolean('centered', Config)}
				closeButton={boolean('closeButton', Config)}
				duration={select('duration', ['short', 'medium', 'long'], Config)}
				noAnimation={boolean('noAnimation', Config)}
				noAutoDismiss={boolean('noAutoDismiss', Config)}
				onClose={action('onClose')}
				onHide={action('onHide')}
				onShow={action('onShow')}
				open={boolean('open', Config)}
				position={select('position', ['bottom', 'center', 'fullscreen', 'left', 'right', 'top'], Config)}
				scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config, 'translucent')}
				spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config, 'self-only')}
				title={text('title', Config, 'Title')}
				type={select('type', [null, 'fade', 'slide'], Config)}
			>
				<div>{text('children', Config, 'Hello Popup')}</div>
				{buttons}
			</Popup>
			Use KNOBS to interact with Popup.
		</div>
	);
};

_Popup.storyName = 'Popup';
_Popup.parameters = {
	info: {
		text: 'Basic usage of Popup'
	}
};
