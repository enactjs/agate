import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/controls';
import WindDirectionControl, {WindDirectionControlBase} from '@enact/agate/WindDirectionControl';

WindDirectionControl.displayName = 'WindDirectionControl';
const Config = mergeComponentMetadata('WindDirectionControl', WindDirectionControlBase, WindDirectionControl);

export default {
	title: 'Agate/WindDirectionControl',
	component: 'WindDirectionControl'
};

export const _WindDirectionControl = (args) => (
	<WindDirectionControl
		disabled={args['disabled']}
		onChange={action('onChange')}
	/>
);

boolean('disabled', _WindDirectionControl, Config);

_WindDirectionControl.storyName = 'WindDirectionControl';
_WindDirectionControl.parameters = {
	info: {
		text: 'The basic WindDirectionControl'
	}
};
