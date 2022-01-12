import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text, select, range} from  '@enact/storybook-utils/addons/controls';
import Dropdown, {DropdownBase} from '@enact/agate/Dropdown';

Dropdown.displayName = 'Dropdown';
const Config = mergeComponentMetadata('Dropdown', Dropdown, DropdownBase);

export default {
	title: 'Agate/Dropdown',
	component: 'Dropdown'
};

export const _Dropdown = (args) => {
	const itemCount = args['items'];
	const items = (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);

	return (
		<Dropdown
			direction={args['direction']}
			disabled={args['disabled']}
			onClose={action('onClose')}
			onOpen={action('onOpen')}
			onSelect={action('onSelect')}
			title={args['title']}
			width={args['width']}
		>
			{items}
		</Dropdown>
	);
};
range('items', _Dropdown, Config, {range: true, min: 0, max: 50}, 5);
select('direction', _Dropdown, ['above', 'below'], Config);
boolean('disabled', _Dropdown, Config);
text('title', _Dropdown, Config, 'Please select');
select('width', _Dropdown, ['smallest', 'small', 'medium', 'large', 'x-large', 'huge'], Config);
_Dropdown.storyName = 'Dropdown';
_Dropdown.parameters = {
	info: {
		text: 'The basic Dropdown'
	}
};
