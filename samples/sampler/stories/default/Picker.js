import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {PickerBase} from '@enact/agate/internal/Picker';
import Picker from '@enact/agate/Picker';

Picker.displayName = 'Picker';
const Config = mergeComponentMetadata('Picker', Picker, PickerBase);

export default {
	title: 'Agate/Picker',
	component: 'Picker'
};

export const _Picker = (args) => (
	<Picker
		aria-label={args['aria-label']}
		decrementAriaLabel={args['decrementAriaLabel']}
		disabled={args['disabled']}
		incrementAriaLabel={args['incrementAriaLabel']}
		noAnimation={args['noAnimation']}
		onChange={action('onChange')}
		orientation={args['orientation']}
		spotlightDisabled={args['spotlightDisabled']}
		wrap={args['wrap']}
	>
		{['LO', '16\xB0', '17\xB0', '18\xB0', '19\xB0', 'HI']}
	</Picker>
);

text('aria-label', _Picker, Config, '');
text('decrementAriaLabel', _Picker, Config, '');
boolean('disabled', _Picker, Config);
text('incrementAriaLabel', _Picker, Config, '');
boolean('noAnimation', _Picker, Config);
select('orientation', _Picker, ['vertical', 'horizontal'], Config);
boolean('spotlightDisabled', _Picker, Config);
boolean('wrap', _Picker, Config);

_Picker.storyname = 'Picker';
_Picker.parameters = {
	info: {
		text: 'Basic usage of Picker'
	}
};
