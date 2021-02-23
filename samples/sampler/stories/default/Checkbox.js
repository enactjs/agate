import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';

import Checkbox, {CheckboxBase} from '@enact/agate/Checkbox';

import {iconList} from './icons';

Checkbox.displayName = 'Checkbox';
const Config = mergeComponentMetadata('Checkbox', CheckboxBase, Checkbox);

export default {
	title: 'Agate/Checkbox',
	component: 'Checkbox'
};

export const _Checkbox = () => (
	<Checkbox
		disabled={boolean('disabled', Config)}
		indeterminate={boolean('indeterminate', Config)}
		indeterminateIcon={select('indeterminateIcon', ['', ...iconList], Config)}
		onToggle={action('onToggle')}
	>
		{select('children', ['', ...iconList], Config)}
	</Checkbox>
);

_Checkbox.storyName = 'Checkbox';
_Checkbox.parameters = {
	info: {
		text: 'The basic Checkbox'
	}
};
