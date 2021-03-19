import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, text, select} from  '@enact/storybook-utils/addons/knobs';

import Dropdown, {DropdownBase} from '@enact/agate/Dropdown';

import css from './Dropdown.module.less';

Dropdown.displayName = 'Dropdown';
const Config = mergeComponentMetadata('Dropdown', Dropdown, DropdownBase);

export default {
	title: 'Agate/Dropdown',
	component: 'Dropdown'
};

export const _Dropdown = () => {
	const itemCount = number('items', Config, {range: true, min: 0, max: 50}, 5);
	const items = (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);

	return (
		<div className={css.parentContainer}>
			<Dropdown
				direction={select('direction', ['above', 'below'], Config)}
				disabled={boolean('disabled', Config)}
				onClose={action('onClose')}
				onOpen={action('onOpen')}
				onSelect={action('onSelect')}
				title={text('title', Config, 'Please select')}
				width={select('width', ['smallest', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
			>
				{items}
			</Dropdown>
		</div>
	);
};

_Dropdown.storyName = 'Dropdown';
_Dropdown.parameters = {
	info: {
		text: 'The basic Dropdown'
	}
};
