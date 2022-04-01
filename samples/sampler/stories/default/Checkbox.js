import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import Checkbox, {CheckboxBase} from '@enact/agate/Checkbox';

import {iconList} from './util/icons';

Checkbox.displayName = 'Checkbox';
const Config = mergeComponentMetadata('Checkbox', CheckboxBase, Checkbox);

export default {
	title: 'Agate/Checkbox',
	component: 'Checkbox'
};

export const _Checkbox = (args) => (
	<Checkbox
		disabled={args['disabled']}
		indeterminate={args['indeterminate']}
		indeterminateIcon={args['indeterminateIcon']}
		onToggle={action('onToggle')}
	>
		{args['children']}
	</Checkbox>
);

boolean('disabled', _Checkbox, Config);
boolean('indeterminate', _Checkbox, Config);
select('indeterminateIcon', _Checkbox, ['', ...iconList], Config);
select('children', _Checkbox, ['', ...iconList], Config);

_Checkbox.storyName = 'Checkbox';
_Checkbox.parameters = {
	info: {
		text: 'The basic Checkbox'
	}
};
