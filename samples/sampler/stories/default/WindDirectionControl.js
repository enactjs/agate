import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/knobs';

import WindDirectionControl, {WindDirectionControlBase} from '@enact/agate/WindDirectionControl';

const Config = mergeComponentMetadata('WindDirectionControl', WindDirectionControlBase, WindDirectionControl);

export default {
	title: 'Agate/WindDirectionControl',
	component: 'WindDirectionControl'
};

export const _WindDirectionControl = () => (
	<WindDirectionControl
		disabled={boolean('disabled', Config)}
		onChange={action('onChange')}
	/>
);

_WindDirectionControl.storyName = 'WindDirectionControl';
_WindDirectionControl.parameters = {
	info: {
		text: 'The basic WindDirectionControl'
	}
};
